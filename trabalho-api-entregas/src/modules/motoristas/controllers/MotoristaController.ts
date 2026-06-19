import { NextFunction, Request, Response } from "express";
import ListMotoristaService from "../services/ListMotoristaService";
import ShowMotoristaService from "../services/ShowMotoristaService";
import CreateMotoristaService from "../services/CreateMotoristaService";
import UpdateMotoristaService from "../services/UpdateMotoristaService";
import DeleteMotoristaService from "../services/DeleteMotoristaService";

export default class MotoristaController {
    public async index(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
        try {
            const listMotoristas = new ListMotoristaService();
            const motoristas = await listMotoristas.execute();

            return response.status(200).json(motoristas);
        } catch (err) {
            next(err)
        }
    }
    public async show(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
        try {
            const showMotorista = new ShowMotoristaService();
            const id = request.params.id as string

            const motorista = await showMotorista.execute({ id });

            return response.status(200).json(motorista);
        } catch (err) {
            next(err)
        }
    }
    public async create(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
        try {
            const createMotorista = new CreateMotoristaService();
            const { nome, numCT, telefone, email, cnh } = request.body;
            const motorista = await createMotorista.execute({ nome, numCT, telefone, email, cnh });
            return response.status(201).json(motorista);
        } catch (err) {
            next(err)
        }
    }
    public async update(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
        try {
            const id = request.params.id as string;
            const updateMotorista = new UpdateMotoristaService();
            const { nome, numCT, telefone, email, cnh } = request.body;
            const motorista = await updateMotorista.execute({ id, nome, numCT, telefone, email, cnh });
            return response.status(200).json(motorista);
        } catch (err) {
            next(err)
        }
    }
    public async delete(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
        try {
            const deleteMotorista = new DeleteMotoristaService();
            const id = request.params.id as string

            const motorista = await deleteMotorista.execute({ id });

            return response.status(204).json(motorista);
        } catch (err) {
            next(err)
        }
    }
}