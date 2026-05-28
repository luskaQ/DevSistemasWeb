import AppError from "@shared/errors/AppError";
import User from "../typeorm/entities/User";
import { UserRepository } from "../typeorm/repositories/UsersRepository";
import { hash } from "bcryptjs";

interface IRequest{
    name : string;
    email : string;
    pasword : string;
}

export default class CreateUserService{
    public async execute({name, email, pasword} : IRequest) : Promise<User>{
        const userRepository = new UserRepository();
        const emailExists = await userRepository.findByEmail(email);
        if(emailExists)
        {
            throw new AppError("Email address already used");
        }

        const hashedPassword = await hash(pasword, 8)

        const user = await userRepository.createUser({
            name,
            email,
            pasword : hashedPassword,
        });
        return user;
    }
}