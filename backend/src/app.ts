import configs from './configs';
import Koa,{Context,Next} from 'koa';
import KoaRouter from 'koa-router'
import {bootstrapControllers} from 'koa-ts-controllers';
import path from 'path';
import KoaBodyParser from 'koa-bodyparser';
import Boom from '@hapi/Boom';
import {Sequelize} from 'sequelize-typescript';
import jwt from 'jsonwebtoken'



(async ()=>{
    const app = new Koa()
    const router = new KoaRouter()

    // connect database
    const db = new Sequelize({
        ...configs.database,
        models:[__dirname + '/models/**/*']
    });

    app.use(async (ctx:Context, next:Next)=>{
        let token = ctx.headers['authorization'];
        if (token){
            ctx.userInfo = jwt.verify(token, configs.jwt.privateKey) as UserInfo
        }
        await next();
    })

    // register router
    await bootstrapControllers(app, {
        router,
        basePath:'/api',
        versions:[1],
        controllers:[
            path.resolve(__dirname, 'controllers/**/*')
        ],
        errorHandler: async (err:any, ctx:Context)=>{
            let status = 500;
            let body:any = {
                statusCode: status,
                error:"internal server error",
                message:"An internal error occurred"
            }
            if (err.output){
                status = err.output.statusCode;
                body = {...err.output.payload};
                if(err.data){
                    body.errorDetails = err.data;
                }
            }
            
            ctx.status = status;
            ctx.body = body;
        }
    });

    // router.all('*', async ctx=>{
    //     // throw Boom.notFound('Page does not exist');
    // })
    app.use(KoaBodyParser())
    app.use(router.routes())
    app.listen(configs.server.port, configs.server.host,()=>{
        console.log(`Server started at http//${configs.server.host}:${configs.server.port}`)
    })

})();
