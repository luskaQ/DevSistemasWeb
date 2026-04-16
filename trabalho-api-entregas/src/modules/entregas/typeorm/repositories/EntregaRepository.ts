import { Between, Repository } from "typeorm";
import Entrega from "../entities/Entrega";
import { AppDataSource } from "@shared/typeorm/data-source";


interface IRequest {
    min: number;
    max: number;
}


export default class EntregaRepository {
    private ormRepository: Repository<Entrega>;

    constructor() {
        this.ormRepository = AppDataSource.getRepository(Entrega);
    }

    public async findByIntervaloPeso({min, max}: IRequest): Promise<Entrega[]> {
        return this.ormRepository.find({
            where: { peso: Between(min, max) }
        });
    }
}

