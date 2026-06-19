import { AppDataSource } from "@shared/typeorm/data-source";
import Entrega from "../typeorm/entities/Entrega";
import AppError from "@shared/errors/AppError";
import Motorista from "@modules/motoristas/typeorm/entities/Motorista";

interface IRequest {
    motorista_id: string;
}

export default class ListByMotoristaService {
    public async execute({ motorista_id }: IRequest): Promise<Entrega[]> {
        const entregaRepository = AppDataSource.getRepository(Entrega);
        const motoristaRepository = AppDataSource.getRepository(Motorista);

        const motoristaExists = await motoristaRepository.findOneBy({ id: motorista_id });
        if (!motoristaExists) {
            throw new AppError("Motorista not found");
        }

        const entregas = await entregaRepository.find({
            where: {
                motorista: { id: motorista_id }
            },
            relations: ['motorista']
        });

        return entregas;
    }
}