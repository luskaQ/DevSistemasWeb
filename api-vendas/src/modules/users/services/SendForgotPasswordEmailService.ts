import AppError from "@shared/errors/AppError";
import { UserRepository } from "../typeorm/repositories/UsersRepository";
import UserTokensRepository from "../typeorm/repositories/UsersTokensRepository";
import EtherealMail from "@config/mail/EtherealMail";
import path from "node:path";

interface IRequest{
    email : string;
}

export default class SendForgotPasswordEmailService{
    public async execute({email}: IRequest) : Promise<void> {
        const userRepository = new UserRepository();
        const userTokensRepository = new UserTokensRepository();

        const user = await userRepository.findByEmail(email);
        if (!user){
            throw new AppError("User does not eixst");
        }

        const {token} = await userTokensRepository.generate(user.id);
        //console.log(token)
        const forgotPasswordTemplate = path.resolve(__dirname, '..', 'views', 'forgot_password.hbs')
        await EtherealMail.sendMail({
            to: {name: user.name, email: user.email},
            subject: "API VENDAS: Recuperação de senha",
            templateData: {
                file: forgotPasswordTemplate,
                variables: {
                    name: user.name,
                    link: `http://localhost:3333/reset_password?token=${token}`
                }
            }
        })

    }
}