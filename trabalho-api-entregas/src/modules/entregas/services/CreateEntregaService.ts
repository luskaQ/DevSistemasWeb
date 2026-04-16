import { AppDataSource } from "@shared/typeorm/data-source";
import AppError from "@shared/errors/AppError";
import Entrega from "../typeorm/entities/Entrega";

interface IRequest{
    peso : number;
    motorista : string;
    veiculo : string
    erval : string;
    tipo : string;
}

export default class CreateEntregaService{
    public async execute({peso, motorista, veiculo, erval, tipo}:IRequest): Promise<Entrega>{
        const entregaRepository = AppDataSource.getRepository(Entrega);
        //no caso de entregas, podem existir entregas "iguais" (com o mesmo  motorista, ervais e peso)
        const entrega = entregaRepository.create({peso, motorista, veiculo, erval, tipo});
        await entregaRepository.save(entrega);
        return entrega;
    }
}