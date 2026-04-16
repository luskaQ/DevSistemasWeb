import { AppDataSource } from "@shared/typeorm/data-source";
import AppError from "@shared/errors/AppError";
import Entrega from "../typeorm/entities/Entrega";

interface IRequest {
    id: string;
    peso: number;
    motorista: string;
    veiculo: string
    erval: string;
    tipo: string;
}

export default class UpdateEntregaService {
    public async execute({ id, peso, motorista, veiculo, erval, tipo }: IRequest): Promise<Entrega> {
        const entregaRepository = AppDataSource.getRepository(Entrega);
        const entrega = await entregaRepository.findOneBy({ id });
        if (!entrega) {
            throw new AppError("Entrega not found");
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