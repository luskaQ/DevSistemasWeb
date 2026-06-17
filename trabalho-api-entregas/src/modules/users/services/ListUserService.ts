import User from "../typeorm/entities/User";
import { UserRepository } from "../typeorm/repositories/UsersRepository";

export default class ListUserService{
    public async execute(): Promise<User[]>{
        const userRepository = new UserRepository();
        return userRepository.findAll();
    }
}