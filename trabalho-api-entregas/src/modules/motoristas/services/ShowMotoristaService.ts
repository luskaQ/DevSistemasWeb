import { AppDataSource } from "@shared/typeorm/data-source";
import Motorista from "../typeorm/entities/Motorista";
import AppError from "@shared/errors/AppError";

interface IRequest {
    id: string;
}


export default class ShowMotoristaService {
    public async execute({ id }: IRequest): Promise<Motorista> {
        const motoristaRepository = AppDataSource.getRepository(Motorista);
        const motorista = await motoristaRepository.findOneBy({ id })
        if (!motorista) {
            throw new AppError("Entrega not found")
        }

        return motorista;
    }
}