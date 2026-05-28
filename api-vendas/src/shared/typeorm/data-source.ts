import { DataSource } from "typeorm";
import path from "node:path";
import Product from "@modules/products/typeorm/entities/Product";
import User from "@modules/users/typeorm/entities/User";
import UserToken from "@modules/users/typeorm/entities/UserToken";

export const AppDataSource = new DataSource({
    type:"postgres",
    host:"localhost",
    port:5432,
    username:"postgres",
    password:"docker",
    database:"api-vendas",
    synchronize:false,
    logging: true,
    entities: [Product, User, UserToken],
    migrations: [path.join("src","shared", "typeorm", "migrations", "*.ts")]
});