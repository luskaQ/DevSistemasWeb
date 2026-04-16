import { Router } from "express";
import EntregaController from "../controllers/EntregaController";
import { celebrate, Joi, Segments } from "celebrate";


const entregaRouter = Router();
const entregaController = new EntregaController();


entregaRouter.get('/', async (req, res, next) => {
    try {
        await entregaController.index(req, res, next);
    } catch (err) {
        next(err);
    }
});

entregaRouter.get('/peso/', celebrate({
    [Segments.QUERY]: {
        min: Joi.number().precision(2).required(),
        max: Joi.number().precision(2).required()
    }
}), async (req, res, next) => {
    try {
        await entregaController.indexByPeso(req, res, next);
    } catch (err) {
        next(err);
    }
})

entregaRouter.get('/:id', celebrate({ [Segments.PARAMS]: { id: Joi.string().uuid().required() } }), async (req, res, next) => {
    try {
        await entregaController.show(req, res, next);
    } catch (err) {
        next(err);
    }
});

entregaRouter.post('/', celebrate({
    [Segments.BODY]: {
        peso: Joi.number().precision(2).min(0).required(),
        motorista: Joi.string().required(),
        veiculo: Joi.string().required(),
        erval: Joi.string().required(),
        tipo: Joi.string().required(),
    }
}), async (req, res, next) => {
    try {
        await entregaController.create(req, res, next);
    } catch (err) {
        next(err);
    }
});

entregaRouter.put('/:id', celebrate({
    [Segments.PARAMS]: { id: Joi.string().uuid().required() },
    [Segments.BODY]: {
        peso: Joi.number().precision(2).min(0).required(),
        motorista: Joi.string().required(),
        veiculo: Joi.string().required(),
        erval: Joi.string().required(),
        tipo: Joi.string().required(),
    }
}), async (req, res, next) => {
    try {
        await entregaController.update(req, res, next);
    } catch (err) {
        next(err);
    }
});

entregaRouter.delete('/:id', celebrate({ [Segments.PARAMS]: { id: Joi.string().uuid().required() } }), async (req, res, next) => {
    try {
        await entregaController.delete(req, res, next);
    } catch (err) {
        next(err);
    }
});

export default entregaRouter;