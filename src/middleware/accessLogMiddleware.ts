import { Context, Next } from "koa";
import { accessLogger } from "../utils/logger";

// 获取 ip信息
function getIp(req: Object | any) {
    let ip = req.headers['x-real-ip'] || req.headers['x-forwarded-for'] || req.connection.remoteAddres || req.socket.remoteAddress || '';
    if (ip.split(',').length > 0) {
        ip = ip.split(',')[0];
    }
    return ip;
};
//访问记录
function accessLogMiddleware(ctx: Context, next: Next) {
    const logStr = `path:${ctx.path} | method:${ctx.method} | ip:${getIp(ctx.req)} | ua:${ctx.header["user-agent"]} | query:${JSON.stringify(ctx.request.query)} | body:${JSON.stringify(ctx.request.body)}`
    accessLogger.info(logStr)
    return next()
}

export default accessLogMiddleware
