import {
    Controller,
    Post,
    Body,
    Ctx
} from 'koa-ts-controllers'
import {Context} from 'koa';
import {RegisterBody, LoginBody} from '../validators/User';
import {User as UserModel} from '../models/User'
import Boom from '@hapi/Boom'
import crypto from 'crypto';
import jwt from 'jsonwebtoken'
import configs from '../configs'


@Controller('/user')
export class UserController{
    // register
    @Post('/register')
    async register(
        @Ctx() ctx:Context,
        @Body() body: RegisterBody
    ){
        let {name, password} = body;
        // check if user exists in database
        let user = await UserModel.findOne({
            where:{
                name
            }
        });

        if (user){
            throw Boom.conflict('register failed','username already exists');
        }

        let newUser = new UserModel({name, password});
        // newUser.name = name;
        // newUser.password = password;
        await newUser.save();
        ctx.status = 201;
        return {
            id:newUser.id,
            name:newUser.name,
            createdAt:newUser.createdAt
        }
    }

    @Post('/login')
    async login(
        @Ctx() ctx:Context,
        @Body() body: LoginBody
    ){
        let {name, password} = body;
        // check if user exists in database
        let user = await UserModel.findOne({
            where:{
                name
            }
        });

        if (!user){
            throw Boom.notFound('login failed', 'User does not exist' )
        }
        let md5 = crypto.createHash('md5');
        password = md5.update(password).digest('hex');
        if (password !== user.password){
            throw Boom.forbidden('login failed','check your password');
        }

        let userInfo = {
            id:user.id,
            name:user.name
        };

        // webtoken
        let token = jwt.sign(userInfo, configs.jwt.privateKey);
        ctx.set('authorization', token)
        return userInfo
    }
}