import { AppDataSource } from "@shared/typeorm/data-source";
import Entrega from "../typeorm/entities/Entrega";
import AppError from "@shared/errors/AppError";

interface IRequest{
    veiculo : string;
}

export default class ListByVeiculoService{
    public async execute({veiculo}:IRequest) : Promise<Entrega[]>{
        const entregaRepository = AppDataSource.getRepository(Entrega);
        const entregas = await entregaRepository.find({
            where : {veiculo : veiculo}
        })

        return entregas;
    }
}