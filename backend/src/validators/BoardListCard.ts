import { IsNumberString, Min, IsNotEmpty, ValidateIf, MaxLength } from 'class-validator';
import {BoardListCard as BoardListCardModel} from '../models/BoardListCard'
import Boom from '@hapi/Boom';

export class GetCardsQuery{
    @IsNumberString({
        message:'BoardList ID cannot be empty and it has to be a number'
    })
    boardListId:number;
}


export class PostAddCardBody{
    @Min(1, {
        message:'boardListId cannot be empty and has to be number greater than 1'
    })
    boardListId:number;

    @IsNotEmpty({
        message:'Name cannot be empty.'
    })
    @MaxLength(255, {
        message:'Name cannot be longer than 255 characters.'
    })
    name:string;

    @ValidateIf(o=>o.description !== undefined)
    @MaxLength(2000, {
        message:'Description cannot be longer than 2000 characters.'
    })
    description:string;

}

export class PutUpdateCardBody{


    @ValidateIf(o=>o.boardListId !== undefined)
    @Min(1, {
        message:'BoardListId cannot be empty and it has to be a number greater than 1'
    })
    boardListId:number;

    @ValidateIf(o=>o.name !== undefined)
    @MaxLength(255, {
        message:'Name cannot be longer than 255 characters.'
    })
    name?:string;

    @ValidateIf(o=>o.description !== undefined)
    @MaxLength(2000, {
        message:'Description cannot be longer than 2000 characters.'
    })
    description:string;

    @ValidateIf(o=>o.order !== undefined)
    @IsNumberString({
        message:'Order has to be numbers.'
    })
    order?:number;

}

export async function getAndValidateBoardListCard(id:number, userId:number):Promise<BoardListCardModel>{
    let board = await BoardListCardModel.findByPk(id);
    if(!board){
        throw Boom.notFound('BoardList does not exists')
    }
    if (board.userId !== userId){
        throw Boom.forbidden('Not allow to get boardList')
    }
    return board;
}