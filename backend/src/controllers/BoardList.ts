import {
    Controller,
    Get,
    Put,
    Post,
    Params,
    Query,
    Body,
    Delete,
    Flow,
    Ctx
} from 'koa-ts-controllers'
import authorization from '../middlewares/authorization';
import {Context} from 'koa';
import {PostAddListBody,GetListsQuery,PutUpdateListBody, getAndValidateBoardList} from '../validators/BoardList'
import { getAndValidateBoard }from '../validators/Board'
import { BoardList as BoardListModel } from '../models/BoardList'

@Controller('/list')
@Flow([authorization])
export class BoardListController{
    // create list
    @Post('')
    public async addList(
        @Ctx() ctx: Context,
        @Body() body: PostAddListBody
    ){
        let {boardId, name} = body;
        await getAndValidateBoard(boardId, ctx.userInfo.id);
        
        let maxOrderBoardList = await BoardListModel.findOne({
            where:{
                boardId
            },
            order:[['order', 'desc']]
        })

        // console.log(maxOrderBoardList)
        let boardList = new BoardListModel();
        boardList.userId = ctx.userInfo.id;
        boardList.boardId = boardId;
        boardList.name = name;
        boardList.order = maxOrderBoardList?maxOrderBoardList.order+65535:65535;
        await boardList.save();
        ctx.status = 201;
        return boardList;

    }

    // get lists from current user current board
    @Get('')
    public async getLists(
        @Ctx() ctx:Context,
        @Query() query: GetListsQuery
    ){
        let {boardId} = query;
        await getAndValidateBoard(boardId, ctx.userInfo.id);
        let boardList = await BoardListModel.findAll({
            where:{
                boardId
            },
            order:[['order','asc']]
        })
        return boardList;

    }

    // get specific list
    @Get('/:id(\\d+)')
    public async getList(
        @Ctx() ctx:Context,
        @Params('id') id:number
    ){
        let boardList = await getAndValidateBoardList(id, ctx.userInfo.id)
        return boardList;
    }

    // update list
    @Put('/:id(\\d+)')
    public async updateList(
        @Ctx() ctx:Context,
        @Params('id') id:number,
        @Body() body: PutUpdateListBody
    ){
        let {name, order, boardId} = body;
        
        let boardList = await getAndValidateBoardList(id, ctx.userInfo.id)
        // console.log(name,id, boardId, boardList.order)
        boardList.boardId = boardId || boardList.boardId;
        boardList.order = order || boardList.order;
        boardList.name = name || boardList.name;
        await boardList.save();
        ctx.status = 204;
        return;
    }

    // get specific list
    @Put('/:id(\\d+)')
    public async deleteList(
        @Ctx() ctx:Context,
        @Params('id') id:number
    ){
        let boardList = await getAndValidateBoardList(id, ctx.userInfo.id)
        boardList.destroy();
        ctx.status = 204;
    }

}