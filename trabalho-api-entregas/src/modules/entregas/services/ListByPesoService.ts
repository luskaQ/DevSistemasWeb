import AppError from "@shared/errors/AppError";
import Entrega from "../typeorm/entities/Entrega";
import EntregaRepository from "../typeorm/repositories/EntregaRepository";

interface IRequest {
    min: number;
    max: number;
}

export default class ListByPesoService {
    async execute({min, max}:IRequest): Promise<Entrega[]> {
        const entregaRepository = new EntregaRepository();
        const entregas = await entregaRepository.findByIntervaloPeso({min, max});

        if (!entregas.length) {
            throw new AppError('No entregas in this weight range');
        }

        return entregas;
    }
}