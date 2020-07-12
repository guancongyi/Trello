import {
    Controller,
    Ctx,
    Post,
    Get,
    Put,
    Delete,
    Flow,
    Params,
    Query,
    Body
} from "koa-ts-controllers"
import authorization from '../middlewares/authorization';
import {Context} from 'koa';
import {
    PostAddCardBody,
    GetCardsQuery,
    PutUpdateCardBody,
    getAndValidateBoardListCard
} from '../validators/BoardListCard'
import {
    getAndValidateBoardList
} from '../validators/BoardList'
import {BoardListCard as BoardListCardModel, BoardListCard} from '../models/BoardListCard'
import {Comment as CommentModel} from '../models/Comment'
import {CardAttachment as CardAttachmentModel} from '../models/CardAttachment'
import {Attachment as AttachmentModel} from '../models/Attachment'
import configs from '../configs'

@Controller('/card')
@Flow([authorization])
export class BoardListCardController{
    @Post('')
    public async addCard(
        @Ctx() ctx:Context,
        @Body() body: PostAddCardBody
    ){
        let {boardListId, name, description} = body;
        await getAndValidateBoardList(boardListId, ctx.userInfo.id);
        let boardListCard = new BoardListCardModel();
        boardListCard.userId = ctx.userInfo.id;
        boardListCard.boardListId = boardListId;
        boardListCard.name = name;
        boardListCard.description = boardListCard.description||'';
        await boardListCard.save();
        ctx.status = 201;
        return boardListCard;
    }

    @Get('')
    public async getCards(
        @Ctx() ctx:Context,
        @Query() query: GetCardsQuery
    ){
        let {boardListId} = query;
        await getAndValidateBoardList(boardListId, ctx.userInfo.id);
        let boardListCards = await BoardListCardModel.findAll({
            where:{
                boardListId
            },
            order: [['id','asc']],
            include:[
                {
                    model:CommentModel,
                    attributes:['id']
                },
                {
                    model:CardAttachmentModel,
                    include:[
                        {
                            model:AttachmentModel
                        }
                    ]
                    // attributes:[]
                }
            ]
        })

        let boardListCardData = boardListCards.map((card:BoardListCardModel) => {
            let coverPath = '';
            let attachments = card.attachments.map(attachment=>{
                let data = attachment.toJSON() as CardAttachmentModel & {path:string};
                data.path = configs.storage.prefix + '/'+ data.detail.name;
            
                if(data.isCover){
                    coverPath = data.path;
                }
                return data;
            })
            return {
                id: card.id,
                userId:card.userId,
                boardListId:card.boardListId,
                name:card.name,
                description:card.description,
                order:card.order,
                createdAt: card.createdAt,
                updatedAt:card.updatedAt,
                attachments:attachments,
                coverPath:coverPath,
                commentCount:card.comments.length
            }
        })
        return boardListCardData;
    }

    @Get('/:id(\\d+)')
    public async getCard(
        @Ctx() ctx:Context,
        @Params('id') id: number
    ){
        let boardListCard = await getAndValidateBoardListCard(id, ctx.userInfo.id)
        return boardListCard;
    }

    @Put('/:id(\\d+)')
    public async putCard(
        @Ctx() ctx:Context,
        @Params('id') id: number,
        @Body() body: PutUpdateCardBody
    ){
        let {boardListId, name, description, order} = body;
        let boardListCard = await getAndValidateBoardListCard(id, ctx.userInfo.id);
        boardListCard.boardListId = boardListId || boardListCard.boardListId;
        boardListCard.name = name || boardListCard.name;
        boardListCard.description = description || boardListCard.description;
        boardListCard.order = order || boardListCard.order;
        await boardListCard.save()
        ctx.status = 204
        return;
    }

    @Delete('/:id(\\d+)')
    public async deleteCard(
        @Ctx() ctx:Context,
        @Params('id') id: number
    ){
        let boardListCard = await getAndValidateBoardListCard(id, ctx.userInfo.id);
        await boardListCard.destroy();
        ctx.status = 204
        return;
    }
}