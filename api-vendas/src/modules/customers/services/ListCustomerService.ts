import Customer from "../typeorm/entities/Customer";
import CustomersRepository from "../typeorm/repositories/CustomersRepository";

export default class ListCustomerService{
    public async execute() : Promise<Customer[]>{
        const customersRepository = new CustomersRepository();

        const customers = await customersRepository.findAll();

        return customers;
    }
}