import {IsNotEmpty, MaxLength, ValidateIf }from 'class-validator';
import {Board as BoardModel} from '../models/Board';
import Boom from '@hapi/Boom';


export class PostAddBoardBody{
    @IsNotEmpty({
        message:'Board name cannot be empty'
    })
    @MaxLength(255,{
        message:"Name must less than 255 characters"
    })
    name:string

    
}

export class PutUpdateBoardBody{
    @ValidateIf(o=>o.name!==undefined)
    @MaxLength(255,{
        message:"Name must less than 255 characters"
    })
    name?:string
}

export async function getAndValidateBoard(id:number, userId:number):Promise<BoardModel>{
    let board = await BoardModel.findByPk(id);
    if(!board){
        throw Boom.notFound('Board does not exists')
    }
    if (board.userId !== userId){
        throw Boom.forbidden('Not allow to get board')
    }
    return board;
}