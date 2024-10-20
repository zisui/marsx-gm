import path from 'path';
import swaggerJSDoc from 'swagger-jsdoc';
import Router from 'koa-router'
const router = new Router()

const swaggerDefinition = {
  Swagger: "2.0",
  info: {
    title: 'apk-server', // Title (required)
    version: '1.0.0', // Version (required)
    description: '', // Description (optional)
    license: {
      "name": "",
      "url": ""
    }
  },
  // host: `http://${ip.address()}:${Config.server.port}`, // Host (optional)
  host: `localhost:${process.env.SERVER_PORT}`, // Host (optional)
  basePath: '/', // Base path (optional)
  produces: ['application/json'],
  schemes: ['http'],
  securityDefinitions: {
    Authorization: {
      type: 'apiKey',
      name: 'Authorization',
      in: 'header',
      description: ''
    }
  },
  security: [
    {
      Authorization: [] // 全局应用 Authorization
    }
  ]
}

const swaggerSpec = swaggerJSDoc({
  swaggerDefinition,
  apis: [path.join(__dirname, '../routers/*.{ts,js}')] // 写有注解的router的存放地址，通过读取路由文件的注释生成json文档
})

// 通过路由获取生成的注解文件
router.get('/swagger.json', async function (ctx) {
  ctx.set('Content-Type', 'application/json');
  ctx.body = swaggerSpec;
})
export default router