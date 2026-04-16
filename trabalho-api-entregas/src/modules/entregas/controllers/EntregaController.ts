import { NextFunction, Request, Response } from "express";
import CreateEntregaService from "../services/CreateEntregaService";
import UpdateEntregaService from "../services/UpdateEntregaService";
import DeleteEntregaService from "../services/DeleteEntregaService";
import ShowEntregaService from "../services/ShowEntregaService";
import ListEntregaService from "../services/ListEntregaService";
import ListByPesoService from "../services/ListByPesoService";

export default class EntregaController {
    public async index(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
        try {
            const listEntregas = new ListEntregaService();
            const entregas = await listEntregas.execute();

            return response.status(200).json(entregas);

        } catch (err) {
            next(err)
        }
    }

    public async indexByPeso(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
        try {
            const listEntregasPeso = new ListByPesoService();
            const min = Number(request.query.min); //get geralmente nao tem body, devemos usar o query (e tambem converter para number)
            const max = Number(request.query.max);
            const entregas = await listEntregasPeso.execute({ min, max });
            return response.status(200).json(entregas);

        } catch (err) {
            next(err)
        }
    }


    public async show(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
        try {
            const id = request.params.id as string;
            const showEntrega = new ShowEntregaService();

            const entrega = await showEntrega.execute({ id })
            return response.status(200).json(entrega);
        } catch (err) {
            next(err)
        }
    }

    public async create(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
        try {
            const { peso, motorista, veiculo, erval, tipo } = request.body;
            const createEntrega = new CreateEntregaService();
            const entrega = await createEntrega.execute({ peso, motorista, veiculo, erval, tipo });
            return response.status(201).json(entrega)
        } catch (err) {
            next(err)
        }
    }

    public async update(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
        try {
            const id = request.params.id as string;
            const { peso, motorista, veiculo, erval, tipo } = request.body;
            const updateEntrega = new UpdateEntregaService();
            const entrega = await updateEntrega.execute({ id, peso, motorista, veiculo, erval, tipo })
            return response.status(200).json(entrega)
        } catch (err) {
            next(err)
        }
    }

    public async delete(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
        try {
            const id = request.params.id as string;
            const deleteEntrega = new DeleteEntregaService();
            await deleteEntrega.execute({ id });
            return response.status(204).send()
        } catch (err) {
            next(err)
        }
    }
}