import { DataSource } from "typeorm";
// 迁移文件 运行此文件时需要使用环境变量
require('dotenv').config();

const isProduction = process.env.NODE_ENV === 'production';
const extension = isProduction ? 'js' : 'ts';

const dataSource = new DataSource({
    type: "mysql",
    host: process.env.MYSQL_HOST,
    port: Number(process.env.MYSQL_PORT),
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    logging: process.env.MYSQL_LOG === "true",
    synchronize: !isProduction,  // 生产环境不要使用 synchronize
    connectorPackage: "mysql2",
    entities: [`${isProduction ? "" : "src/"}entity/*.${extension}`], // 实体文件路径
    migrations: [`${isProduction ? "" : "src/"}migration/*.${extension}`], // 数据库迁移文件路径
    subscribers: [`${isProduction ? "" : "src/"}subscriber/*.${extension}`], // 事件订阅者文件路径
    extra: {
        connectionLimit: 30,
        connectTimeout: 10000
    }
});
export default dataSource