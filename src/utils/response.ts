import { Context } from "koa";
/**
 * 
 * @param ctx {Context}
 * @param data {} 返回数据
 * @param msg string 
 * @param code number
 */
function success(ctx: Context, data: any = {}, msg: string = 'success', code: number = 200) {
  ctx.status = 200
  ctx.body = { code, msg, data }
}

/**
 * 
 * @param ctx {Context}
 * @param data {} 返回数据
 * @param msg string 
 * @param code number
 */
function error(ctx: Context, data: any = {}, msg: string = 'error', code: number = 400) {
  ctx.status = 400
  ctx.body = { code, msg, data }
}

export default { success, error }