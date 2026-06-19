import { AppDataSource } from "@shared/typeorm/data-source";
import Motorista from "../typeorm/entities/Motorista";
import AppError from "@shared/errors/AppError";

interface IRequest {
    id: string;
    nome: string;
    numCT: string;
    telefone: string;
    email: string;
    cnh: string;
}

export default class UpdateMotoristaService {
    public async execute({ id, nome, numCT, telefone, email, cnh }: IRequest): Promise<Motorista> {
        const motoristaRepository = AppDataSource.getRepository(Motorista);


        const motorista = await motoristaRepository.findOneBy({ id });
        if (!motorista) {
            throw new AppError("Motorista not found");
        }

        const emailExists = await motoristaRepository.findOne({ where: { email } });
        if (emailExists && emailExists.id !== id) {
            throw new AppError("Email already in use");
        }

        const telefoneExists = await motoristaRepository.findOne({ where: { telefone } });
        if (telefoneExists && telefoneExists.id !== id) {
            throw new AppError("Telephone number already in use");
        }

        const cnhExists = await motoristaRepository.findOne({ where: { cnh } });
        if (cnhExists && cnhExists.id !== id) {
            throw new AppError("Drivers license already in use");
        }

        const numCtExists = await motoristaRepository.findOne({ where: { numCT } });
        if (numCtExists && numCtExists.id !== id) {
            throw new AppError("Workers number already in use");
        }

        motorista.nome = nome;
        motorista.email = email;
        motorista.numCT = numCT;
        motorista.cnh = cnh;
        motorista.telefone = telefone;

        await motoristaRepository.save(motorista);

        return motorista;
    }
}