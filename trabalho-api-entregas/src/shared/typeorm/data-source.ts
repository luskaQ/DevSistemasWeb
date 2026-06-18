import { DataSource } from "typeorm";
import path from "node:path";
import Entrega from "@modules/entregas/typeorm/entities/Entrega";
import User from "@modules/users/typeorm/entities/User";
import UserToken from "@modules/users/typeorm/entities/UserToken";

export const AppDataSource = new DataSource({
    type:"postgres",
    host:"localhost",
    port:5433,
    username:"postgres",
    password:"docker",
    database:"api-entregas",
    synchronize:false,
    logging: true,
    entities: [Entrega, User, UserToken],
    migrations: [path.join("src","shared", "typeorm", "migrations", "*.ts")]
});