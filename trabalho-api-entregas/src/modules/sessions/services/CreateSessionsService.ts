import User from "@modules/users/typeorm/entities/User";
import { UserRepository } from "@modules/users/typeorm/repositories/UsersRepository";
import AppError from "@shared/errors/AppError";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import authConfig from "@config/auth"
import auth from "@config/auth";
interface IRequest {
    email: string;
    password: string;
}

interface IReponse {
    user: User;
    token: string;
}

export default class CreateSessionsService {
    public async execute({ email, password }: IRequest): Promise<IReponse>{
        const userRepository = new UserRepository();
        const user = await userRepository.findByEmail(email);
        if (!user) {
            throw new AppError("Incorrect email/password", 401);
        }

        const passwordConfirmed = await compare(password, user.password);
        if (!passwordConfirmed) {
            throw new AppError("Incorrect email/password", 401);
        }
        const token = sign({}, authConfig.jwt.secret, {
            subject: user.id,
            expiresIn: '1d',
        });

        return {user, token};
    }
}