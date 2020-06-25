import { IsNumberString, Min, IsNotEmpty, ValidateIf, IsNumber} from 'class-validator';
import Boom from '@hapi/Boom';
import {BoardList as BoardListModel} from '../models/BoardList';


export class PostAddListBody{
    @Min(1, {
        message: 'Board ID cannot be Null and has to be a number'
    })
    boardId: number;
    @IsNotEmpty({
        message: 'Board Name cannot be null'
    })
    name:string;
}

export class GetListsQuery{
    @IsNumberString({
        message: 'Board ID cannot be Null and has to be a number'

    })
    boardId: number;
}

export class PutUpdateListBody{
    @ValidateIf(o=>o.boardId !== undefined)
    @Min(1, {
        message: 'Board ID cannot be Null and has to be a number'
    })
    boardId: number;

    @ValidateIf(o=>o.name !== undefined)
    @IsNotEmpty({
        message: 'Board Name cannot be null'
    })
    name:string;

    @ValidateIf(o=>o.order !== undefined)
    @IsNumber({},{
        message: 'order ',
    })
    order:number;
}

export async function getAndValidateBoardList(id:number, userId:number):Promise<BoardModel>{
    let board = await BoardListModel.findByPk(id);
    if(!board){
        throw Boom.notFound('BoardList does not exists')
    }
    if (board.userId !== userId){
        throw Boom.forbidden('Not allow to get boardList')
    }
    return board;
}