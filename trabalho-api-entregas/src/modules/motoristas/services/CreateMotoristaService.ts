import { AppDataSource } from "@shared/typeorm/data-source";
import Motorista from "../typeorm/entities/Motorista";
import AppError from "@shared/errors/AppError";

interface IRequest {
    nome: string;
    numCT: string;
    telefone: string;
    email: string;
    cnh: string;
}

export default class CreateMotoristaService {
    public async execute({ nome, numCT, telefone, email, cnh }: IRequest): Promise<Motorista> {
        const motoristaRepository = AppDataSource.getRepository(Motorista);
        const emailExists = await motoristaRepository.findOne({ where: { email } });
        const telefoneExists = await motoristaRepository.findOne({ where: { telefone } });
        const cnhExists = await motoristaRepository.findOne({ where: { cnh } });
        const numCtExists = await motoristaRepository.findOne({ where: { numCT } });

        if (emailExists) {
            throw new AppError("Email already in use");
        }

        if (telefoneExists) {
            throw new AppError("Telephone number already in use");
        }
        if (cnhExists) {
            throw new AppError("Drivers license already in use");
        }
        if (numCtExists) {
            throw new AppError("Workers number already in use");
        }

        const motorista = motoristaRepository.create({ nome, numCT, telefone, email, cnh });
        await motoristaRepository.save(motorista);
        return motorista;
    }
}