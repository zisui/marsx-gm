import { Context, Next } from "koa"
import jwt from "jsonwebtoken"
import config from "../config"
import response from "../utils/response"
import User from "../entity/User"
import dataSource from "../db/mysql"
interface JwtData {
  id: number;
}
//token校验
async function authMiddleware(ctx: Context, next: Next) {
  const token = ctx.headers['authorization']
  if (!token) return response.error(ctx, {}, "token is null.", 401)
  try {
    const jwtData = jwt.verify(token, config.jwt.jwt_secret!) as JwtData
    if (!jwtData) return response.error(ctx, {}, "Token is invalid", 401)
    const userRepository = dataSource.getRepository(User);
    const user = await userRepository.findOneBy({ id: jwtData.id });
    if (!user) return response.error(ctx, {}, "User Is Null", 401);
    ctx.state.user = user
  } catch (error) {
    return response.error(ctx, {}, "Token has expired", 401);
  }
  await next()
}

export default authMiddleware