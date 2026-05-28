import AppError from "@shared/errors/AppError";
import { UserRepository } from "../typeorm/repositories/UsersRepository";
import UserTokensRepository from "../typeorm/repositories/UsersTokensRepository";
import { addHours, isAfter } from "date-fns";
import { hash } from "bcryptjs";

interface IRequest {
    token: string;
    pasword: string;
}

export default class ResetPasswordService {
    public async execute({ token, pasword }: IRequest): Promise<void> {
        const userRepository = new UserRepository();
        const userTokensRepository = new UserTokensRepository();

        const userToken = await userTokensRepository.findByToken(token);

        if(!userToken){
            throw new AppError("User token does not exist");
        }

        const user = await userRepository.findById(userToken.user_id);
        if(!user){
            throw new AppError("User does not exists");
        }

        const tokenCreatedAt = userToken.created_at;
        const compareDate = addHours(tokenCreatedAt, 2);

        if(isAfter(Date.now(), compareDate)){
            throw new AppError("token expired");
        }

        user.pasword = await hash(pasword, 8);
        await userRepository.save(user)
    }
}