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
entregaRouter.post('/motoristas', celebrate({
    [Segments.BODY]: Joi.object({
        motorista: Joi.string().required(),
    }).options({ allowUnknown: false })
}), async (req, res, next) => {
    try {
        await entregaController.indexByMotorista(req, res, next);
    } catch (err) {
        next(err);
    }
});
entregaRouter.post('/veiculos', celebrate({
    [Segments.BODY]: Joi.object({
        veiculo: Joi.string().required(),
    }).options({ allowUnknown: false })
}), async (req, res, next) => {
    try {
        await entregaController.indexByVeiculo(req, res, next);
    } catch (err) {
        next(err);
    }
});
entregaRouter.post('/ervais', celebrate({
    [Segments.BODY]: Joi.object({
        erval: Joi.string().required(),
    }).options({ allowUnknown: false })
}), async (req, res, next) => {
    try {
        await entregaController.indexByErval(req, res, next);
    } catch (err) {
        next(err);
    }
});

entregaRouter.post('/pesos', celebrate({
    [Segments.BODY]: Joi.object({
        min: Joi.number().precision(2).required(),
        max: Joi.number().precision(2).required()
    }).options({allowUnknown:false})
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