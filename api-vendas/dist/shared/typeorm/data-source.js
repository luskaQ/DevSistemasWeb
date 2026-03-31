"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const node_path_1 = __importDefault(require("node:path"));
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: "localhost",
    port: 5433,
    username: "postgres",
    password: "docker",
    database: "api-vendas",
    synchronize: false,
    logging: true,
    entities: [],
    migrations: [node_path_1.default.join("src", "shared", "typeorm", "migrations", "migrations", "*.ts")]
});
