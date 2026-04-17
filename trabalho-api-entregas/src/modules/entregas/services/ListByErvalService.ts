import { AppDataSource } from "@shared/typeorm/data-source";
import Entrega from "../typeorm/entities/Entrega";
import AppError from "@shared/errors/AppError";

interface IRequest{
    erval : string;
}

export default class ListByErvalService{
    public async execute({erval}:IRequest) : Promise<Entrega[]>{
        const entregaRepository = AppDataSource.getRepository(Entrega);
        const entregas = await entregaRepository.find({
            where : {erval : erval}
        })

        return entregas;
    }
}