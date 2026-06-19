import { AppDataSource } from "@shared/typeorm/data-source";
import AppError from "@shared/errors/AppError";
import Entrega from "../typeorm/entities/Entrega";
import Motorista from "@modules/motoristas/typeorm/entities/Motorista";

interface IRequest {
    peso: number;
    motorista_id: string;
    veiculo: string
    erval: string;
    tipo: string;
}

export default class CreateEntregaService {
    public async execute({ peso, motorista_id, veiculo, erval, tipo }: IRequest): Promise<Entrega> {
        const entregaRepository = AppDataSource.getRepository(Entrega);
        const motoristaRepository = AppDataSource.getRepository(Motorista);
        //no caso de entregas, podem existir entregas "iguais" (com o mesmo  motorista, ervais e peso)
        const id = motorista_id
        const motorista = await motoristaRepository.findOne({ where: { id } })
        if(!motorista){
            throw new AppError("Could not find any driver with given id")
        }
        const entrega = entregaRepository.create({ peso, motorista, veiculo, erval, tipo });
        await entregaRepository.save(entrega);
        return entrega;
    }
}