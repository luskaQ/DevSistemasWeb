import { AppDataSource } from "@shared/typeorm/data-source";
import Entrega from "../typeorm/entities/Entrega";
import AppError from "@shared/errors/AppError";

interface IRequest{
    motorista : string;
}

export default class ListByMotoristaService{
    public async execute({motorista}:IRequest) : Promise<Entrega[]>{
        const entregaRepository = AppDataSource.getRepository(Entrega);
        const entregas = await entregaRepository.find({
            where : {motorista : motorista}
        })

        return entregas;
    }
}