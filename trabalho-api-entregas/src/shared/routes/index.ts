import entregaRouter from "@modules/entregas/routes/entrega.routes";
import sessionsRouter from "@modules/sessions/routes/sessions.routes";
import profileRouter from "@modules/users/routes/profile.routes";
import userRouter from "@modules/users/routes/user.routes";
import { Router } from "express";

const routes = Router();

routes.use('/entregas', entregaRouter);
routes.use('/users', userRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/profile', profileRouter);

routes.use()
routes.get('/', (request, response) => {
    response.json({ message: 'Hello dev' });
});

export default  routes;