import { Repository } from "typeorm";
import Product from "../entities/Product";
import { AppDataSource } from "@shared/typeorm/data-source";

export default class ProductRepository{
    private ormRepository: Repository<Product>;

    constructor(){
        this.ormRepository = AppDataSource.getRepository(Product)
    }

    public async findByName(name : string): Promise<Product | null> //todos metodos de bd são assincronos, pos esperam uma resposta do bd
    {
        const product = await this.ormRepository.findOne({
            where: {name}
        });
        return product;
    }
}