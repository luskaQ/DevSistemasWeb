import { AppDataSource } from "@shared/typeorm/data-source";
import Entrega from "../typeorm/entities/Entrega";
import AppError from "@shared/errors/AppError";

interface IRequest {
    id: string;
}

export default class DeleteEntregaService {
    public async execute({ id }: IRequest): Promise<void> {
        const entregaRepository = AppDataSource.getRepository(Entrega);
        const entrega = await entregaRepository.findOneBy({ id });
        if (!entrega) {
            throw new AppError("Entrega not found");
        }
        await entregaRepository.remove(entrega);
    }
}