import productRouter from "@modules/products/routes/product.routes";
import sessionsRouter from "@modules/sessions/routes/sessions.routes";
import passwordRouter from "@modules/users/routes/password.routes";
import profileRouter from "@modules/users/routes/profile.routes";
import userRouter from "@modules/users/routes/user.routes";
import { Router } from "express";

const routes = Router();
routes.use('/products', productRouter);
routes.use('/users', userRouter);
routes.use('/sessions', sessionsRouter)
routes.use('/password', passwordRouter)
routes.use('/profile', profileRouter);
routes.get('/', (request, response) => {
    response.json({ message: 'Hello dev' });
});

export default routes;