import {
    Controller,
    Post,
    Body,
    Get,
    Put,
    Delete,
    Flow,
    Params,
    Ctx
} from 'koa-ts-controllers'
import {Context} from 'koa';
import authorization from "../middlewares/authorization"
import {Board as BoardModel} from '../models/Board';
import {PostAddBoardBody, PutUpdateBoardBody, getAndValidateBoard} from '../validators/Board';


@Controller('/board')
@Flow([authorization])
export class BoardController{

    // add board
    @Post('')
    public async addBoard(
        @Ctx() ctx:Context,
        @Body() body: PostAddBoardBody
    ){
        let {name} = body;
        let board = new BoardModel();
        board.name = name;
        board.userId = ctx.userInfo.id;
        await board.save();
        ctx.status = 201;
        return board
    }

    // get current user's boards
    @Get('')
    public async getBoards(
        @Ctx() ctx:Context
    ){
        let where = {
            userId:ctx.userInfo.id
        };

        let boards = await BoardModel.findAll({where});
        return boards
    }

    // get one of the boards' detail
    @Get('/:id(\\d+)')
    public async getBoard(
        @Ctx() ctx:Context,
        @Params('id') id:number
    ){
        let board = await getAndValidateBoard(id, ctx.userInfo.id);
        return board;
    }

    // update one of the boards
    @Put('/:id(\\d+)')
    public async updateBoard(
        @Ctx() ctx:Context,
        @Params('id') id:number,
        @Body() body: PutUpdateBoardBody
        
    ){
        let board = await getAndValidateBoard(id, ctx.userInfo.id);

        board.name = body.name || board.name
        await board.save()
        ctx.status = 204;
        
    }

    // delete one of the boards
    @Delete('/:id(\\d+)')
    public async deleteBoard(
        @Ctx() ctx:Context,
        @Params('id') id:number
    ){
        let board = await getAndValidateBoard(id, ctx.userInfo.id);

        await board.destroy();
        ctx.status = 204

    }

}


