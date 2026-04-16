import { AppDataSource } from "@shared/typeorm/data-source";
import Entrega from "../typeorm/entities/Entrega";
import AppError from "@shared/errors/AppError";

export default class ListEntregaService {
    public async execute(): Promise<Entrega[]> {
        const entregaRepository = AppDataSource.getRepository(Entrega);
        return entregaRepository.find();

    }
}