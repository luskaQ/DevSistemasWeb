import entregaRouter from "@modules/entregas/routes/entrega.routes";
import { Router } from "express";

const routes = Router();

routes.use('/entregas', entregaRouter);
routes.get('/', (request, response) => {
    response.json({ message: 'Hello dev' });
});

export default routes;