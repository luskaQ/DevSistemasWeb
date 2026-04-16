import productRouter from "@modules/products/routes/product.routes";
import { Router } from "express";

const routes = Router();
routes.use('/products', productRouter);
routes.get('/', (request, response) => {
    response.json({ message: 'Hello dev' });
});

export default routes;