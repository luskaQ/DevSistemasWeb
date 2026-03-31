import { DataSource } from "typeorm";
import path from "node:path";
import Product from "@modules/products/typeorm/entities/Product";

export const AppDataSource = new DataSource({
    type:"postgres",
    host:"localhost",
    port:5433,
    username:"postgres",
    password:"docker",
    database:"api-vendas",
    synchronize:false,
    logging: true,
    entities: [Product],
    migrations: [path.join("src","shared", "typeorm", "migrations", "*.ts")]
});