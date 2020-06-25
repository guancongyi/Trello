import {IsNumberString,IsNotEmpty} from 'class-validator'
import Boom from '@hapi/Boom'
import { 
    Controller,
    Get,
    Post, 
    Params,
    Query,
    Header,
    Body,
    Ctx,
    Flow
} from "koa-ts-controllers";
import { Context } from 'koa';
import authorization from '../middlewares/authorization';

class GetUsersQuery{
    @IsNumberString()
    page:number;
}

class PostUserBody{
    @IsNotEmpty({
        message:'username cannot be empty'
    })
    name:string;
    @IsNotEmpty({
        message:'password cannot be empty'
    })
    password:string
    
}

@Controller('/test')
// @Flow([authorization])
class TestController{
    @Get('/hello')
    async hello(){
        // console.log(a.b)
        return 'Hello Test!';
    }

    // @Get('/user/:id(\\d+)')
    // async getUser(
    //     @Params() p:{id:number}
    // ){
    //     return 'current param: ' + p.id
    // }


    // @Get('/user')
    // async getUser2(
    //     @Query() q:{id:number}
    // ){
    //     return 'current param: ' + q.id
    // }

    @Post('/user')
    async postUser(
        @Ctx() ctx: Context,
        @Body() body: PostUserBody,
        @Header() h:any
    ){
        ctx.status = 201
        console.log(body);
        console.log(h);

        return 'current user info: ' + `${JSON.stringify(body)}`
    }

    // @Get('/users')
    // async getUsers(
    //     @Query() q:GetUsersQuery
    // ){
    //     // 业务逻辑错误 用户不存在 已被注册
    //     if (true){ // user name exists
    //         // throw Boom.notFound('register failed, username exists')

    //     }
    //     return `${JSON.stringify(q)}`
    // }

    @Get('/auth')
    @Flow([authorization])
    async auth(
        @Ctx() ctx:Context
    ){
        // ctx.userInfo
        return 'logined'
    }

    @Get('/noauth')
    async noauth(
        @Ctx() ctx:Context
    ){
        // ctx.userInfo
        return 'no need to login'
    }
}
