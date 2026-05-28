import { Repository } from "typeorm";
import User from "../entities/User";
import { AppDataSource } from "@shared/typeorm/data-source";

export class UserRepository{
    private ormRepository: Repository<User>;

    constructor(){
        this.ormRepository = AppDataSource.getRepository(User);
    }

    public async findAll() : Promise<User[]>{
        return this.ormRepository.find();
    }

    public async findByName(name : string): Promise<User | null>{
        return this.ormRepository.findOne({where: {name}});
    }
    public async findById(id : string): Promise<User | null>{
        return this.ormRepository.findOne({where: {id}});
    }
    public async findByEmail(email : string): Promise<User | null>{
        return this.ormRepository.findOne({where: {email}});
    }
    public async createUser(userdata : Partial<User>) : Promise<User>{
        const user = this.ormRepository.create(userdata);
        await this.ormRepository.save(user);
        return user;

    }

    public async save(user: User): Promise<User>{
        return await this.ormRepository.save(user);
    }
}