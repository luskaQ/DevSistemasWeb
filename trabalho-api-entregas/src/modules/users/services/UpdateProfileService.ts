import { AppDataSource } from "@shared/typeorm/data-source";
import User from "../typeorm/entities/User";
import AppError from "@shared/errors/AppError";
import { compare, hash } from "bcryptjs";

interface IRequest{
    user_id : string;
    name: string;
    email : string;
    password? : string;
    old_password?: string;
}

export default class UpdateProfileService{
    public async execute({
        user_id,
        name,
        email,
        password,
        old_password
    }: IRequest) : Promise<User>{
        const userRepository = AppDataSource.getRepository(User);

        const user = await userRepository.findOne({where: {id : user_id}});
        if(!user){
            throw new AppError("User not found");
        }

        const userUpdateEmail = await userRepository.findOne({where : {email}});

        if(userUpdateEmail && userUpdateEmail.id !== user_id){
            throw new AppError("There is already one user with this email!");
        }

        if(password && !old_password){
            throw new AppError("Old password is required!");
        }

        if(password && old_password){
            const checkOldpassword = await compare(old_password, user.password);
            if(!checkOldpassword){
                throw new AppError("Old password does not match!");
            }

            user.password = await hash(password, 8);
        }

        user.name = name;
        user.email = email;

        await userRepository.save(user)

        return user;
    }
}