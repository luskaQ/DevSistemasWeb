import { AppDataSource } from "@shared/typeorm/data-source";
import Entrega from "../typeorm/entities/Entrega";
import AppError from "@shared/errors/AppError";

interface IRequest {
    id: string;
}

export default class ShowEntregaService {
    public async execute({ id }: IRequest): Promise<Entrega> {
        const entregaRepository = AppDataSource.getRepository(Entrega);
        const entrega = await entregaRepository.findOneBy({ id });
        if (!entrega) {
            throw new AppError('Entrega not found');
        }

        return entrega;
    }
}