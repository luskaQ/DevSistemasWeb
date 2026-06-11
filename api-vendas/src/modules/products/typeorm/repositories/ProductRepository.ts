import { In, Repository } from "typeorm";
import Product from "../entities/Product";
import { AppDataSource } from "@shared/typeorm/data-source";


interface IFindProducts{
    id : string;
}

export default class ProductRepository{
    private ormRepository: Repository<Product>;

    constructor(){
        this.ormRepository = AppDataSource.getRepository(Product)
    }

    public async find() : Promise<Product[]> {
        return this.ormRepository.find({
            relations : {
                orders_products : true
            }
        });
    }


    public async findByName(name : string): Promise<Product | null> //todos metodos de bd são assincronos, pos esperam uma resposta do bd
    {
        const product = await this.ormRepository.findOne({
            where: {name}
        });
        return product;
    }

    public async findAllById(products : IFindProducts[]) : Promise<Product[]>{
        const productIds = products.map((p) => p.id);
        const existsProducts = await this.ormRepository.find({
            where: {
                id: In(productIds)
            }
        });
        return existsProducts;
    }

    public async save(products : Product[]) : Promise<Product[]>{
        return await this.ormRepository.save(products);
    }

}