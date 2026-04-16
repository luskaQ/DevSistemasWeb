import { DataSource } from "typeorm";
import path from "node:path";
import Entrega from "@modules/entregas/typeorm/entities/Entrega";

export const AppDataSource = new DataSource({
    type:"postgres",
    host:"localhost",
    port:5433,
    username:"postgres",
    password:"docker",
    database:"api-entregas",
    synchronize:false,
    logging: true,
    entities: [Entrega],
    migrations: [path.join("src","shared", "typeorm", "migrations", "*.ts")]
});