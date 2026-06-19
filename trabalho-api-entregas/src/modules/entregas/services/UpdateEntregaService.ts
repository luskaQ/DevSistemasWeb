import { AppDataSource } from "@shared/typeorm/data-source";
import AppError from "@shared/errors/AppError";
import Entrega from "../typeorm/entities/Entrega";
import Motorista from "@modules/motoristas/typeorm/entities/Motorista";

interface IRequest {
    id: string;
    peso: number;
    motorista_id: string;
    veiculo: string
    erval: string;
    tipo: string;
}

export default class UpdateEntregaService {
    public async execute({ id, peso, motorista_id, veiculo, erval, tipo }: IRequest): Promise<Entrega> {
        const entregaRepository = AppDataSource.getRepository(Entrega);
        const motoristaRepository = AppDataSource.getRepository(Motorista);
        const entrega = await entregaRepository.findOneBy({ id });
        if (!entrega) {
            throw new AppError("Entrega not found");
        }

        const motorista = await motoristaRepository.findOneBy({ id: motorista_id });
        if(!motorista){
            throw new AppError("Could not find driver with given id")
        }
        entrega.peso = peso;
        entrega.motorista = motorista;
        entrega.veiculo = veiculo;
        entrega.tipo = tipo;
        entrega.erval = erval;
        await entregaRepository.save(entrega);
        return entrega;
    }
}