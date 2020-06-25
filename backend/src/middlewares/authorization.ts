import { Context, Next } from "koa";
import Boom from '@hapi/Boom'

export default async function authorization(
    ctx:Context,
    next:Next
){
    if(!ctx.userInfo || ctx.userInfo.id<1){
        throw Boom.unauthorized('Not authorized, login first');

    }
    await next();
}