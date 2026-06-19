import { Router } from "express";
import MotoristaController from "../controllers/MotoristaController";
import isAuthenticated from "@shared/http/middlewares/isAuthenticated";
import Joi from "joi";
import { celebrate, Segments } from "celebrate";


const motoristaRouter = Router();
const motoristaController = new MotoristaController();

motoristaRouter.use(isAuthenticated);

motoristaRouter.get('/', async (req, res, next) => {
    try {
        await motoristaController.index(req, res, next);
    } catch (err) {
        next(err);
    }
});

motoristaRouter.get('/:id', celebrate({
    [Segments.PARAMS]: {
        id: Joi.string().uuid().required()
    }
}),
    async (req, res, next) => {
        try {
            await motoristaController.show(req, res, next);
        } catch (err) {
            next(err);
        }
    }
);

motoristaRouter.post('/', celebrate({
    [Segments.BODY]: {
        nome: Joi.string().required(),
        numCT: Joi.string().required(),
        telefone: Joi.string().required(),
        email: Joi.string().email().required(),
        cnh: Joi.string().required()
    }
}),
    async (req, res, next) => {
        try {
            await motoristaController.create(req, res, next);
        } catch (err) {
            next(err);
        }
    }
);

motoristaRouter.put('/:id', celebrate({
    [Segments.PARAMS]: {
        id: Joi.string().uuid().required()
    },
    [Segments.BODY]: {
        nome: Joi.string(),
        numCT: Joi.string(),
        telefone: Joi.string(),
        email: Joi.string().email(),
        cnh: Joi.string()
    }
}),
    async (req, res, next) => {
        try {
            await motoristaController.update(req, res, next);
        } catch (err) {
            next(err);
        }
    }
);

motoristaRouter.delete('/:id', celebrate({
    [Segments.PARAMS]: {
        id: Joi.string().uuid().required()
    }
}),
    async (req, res, next) => {
        try {
            await motoristaController.delete(req, res, next);
        } catch (err) {
            next(err);
        }
    }
);

export default motoristaRouter;