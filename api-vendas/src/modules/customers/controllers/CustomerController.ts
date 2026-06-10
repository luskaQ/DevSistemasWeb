import { NextFunction, Request, Response } from "express";
import ListCustomerService from "../services/ListCustomerService";
import ShowCustomerService from "../services/ShowCustomerService";
import CreateCustomerService from "../services/CreateCustomerService";
import UpdateCustomerService from "../services/UpdateCustomerService";
import DeleteCustomerService from "../services/DeleteCustomerService";

export default class CustomerController {
    public async index(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const listCustomers = new ListCustomerService();
            const customers = await listCustomers.execute();
            return res.json(customers);
        } catch (err) {
            next(err);
            return res
        }
    }
    public async show(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const id = req.params.id as string;
            const showCustomer = new ShowCustomerService();
            const customer = await showCustomer.execute({ id });
            return res.json(customer);

        } catch (err) {
            next(err);
            return res;
        }
    }
    public async create(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const { name, email } = req.body;
            const createCustomer = new CreateCustomerService();
            const customer = await createCustomer.execute({ name, email });
            return res.json(customer);
        } catch (err) {
            next(err);
            return res;
        }
    }
    public async update(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const { name, email } = req.body;
            const id = req.params.id as string;
            const updateCustomer = new UpdateCustomerService();
            const customer = await updateCustomer.execute({ id, name, email });
            return res.json(customer);
        } catch (err) {
            next(err);
            return res;
        }
    }
    public async delete(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const id = req.params.id as string;
            const deleteCustomer = new DeleteCustomerService();
            const customer = await deleteCustomer.execute({ id});
            return res.json([]);
        } catch (err) {
            next(err);
            return res;
        }
    }

}