require('dotenv').config();
import Koa from 'koa';
// @ts-ignore
import cors from '@koa/cors';
import bodyParser from "koa-bodyparser";
import accessLogMiddleware from './middleware/accessLogMiddleware';
import { glob } from 'glob';
import path from 'path';
import { koaSwagger } from "koa2-swagger-ui";
import swagger from './utils/swagger'
import dataSource from "./db/mysql";

const app = new Koa()

//中间件
app
  .use(cors()) // 跨域
  .use(bodyParser()) // 请求体解析
  .use(accessLogMiddleware) // 访问日志 

// swagger配置
app
  .use(swagger.routes())
  .use(swagger.allowedMethods())
  .use(koaSwagger({
    routePrefix: '/swagger', // 接口文档访问地址
    swaggerOptions: {
      url: '/swagger.json', //生成json的访问路径
    },
  }))

//路由
glob.sync(path.join(__dirname, './routers/*.{ts,js}'))
  .forEach(async (router_n: string) => {
    const router = await import(router_n)
    app.use(router.default.routes()).use(router.default.allowedMethods())
  })

const startServer = async () => {
  try {
    await dataSource.initialize(); // 初始化数据库连接
    console.log('Connected to MYSQL');
    // 启动服务
    app.listen(process.env.SERVER_PORT || 3000, () => {
      console.log(`Server running on port ${process.env.SERVER_PORT || 3000}`, process.env.NODE_ENV);
    });
  } catch (error) {
    console.error('TypeORM connection error: ', error);
  }
};

startServer();