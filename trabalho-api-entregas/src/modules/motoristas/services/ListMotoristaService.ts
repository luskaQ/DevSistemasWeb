import { AppDataSource } from "@shared/typeorm/data-source";
import Motorista from "../typeorm/entities/Motorista";

export default class ListMotoristaService{
    public async execute() : Promise<Motorista[]>{
        const motoristaRepository = AppDataSource.getRepository(Motorista);
        return motoristaRepository.find();
    }
}