import AppError from "@shared/errors/AppError";
import Customer from "../typeorm/entities/Customer";
import CustomersRepository from "../typeorm/repositories/CustomersRepository";

interface IRequest {
    name: string;
    email: string;
}

export default class CreateCustomerService {
    public async execute({ name, email }: IRequest): Promise<Customer> {
        const customersRepository = new CustomersRepository();
        const emailExists = await customersRepository.findByEmail(email);
        if (emailExists) {
            throw new AppError("Email already in use");
        }
        const customer = await customersRepository.createCustomer({ name, email });

        return customer;
    }
}