import {
    Model, Table, PrimaryKey, AutoIncrement, Column,
    AllowNull,
    DataType,
    CreatedAt,
    UpdatedAt,
    ForeignKey,
    HasMany
} from 'sequelize-typescript';
import { User } from './User';
import { Board } from './Board';
import { BoardList } from './BoardList';
import {CardAttachment} from "./CardAttachment";
import {Comment} from "./Comment";

@Table({
    tableName:'BoardListCard'
})
export class BoardListCard extends Model<BoardListCard>{
    @PrimaryKey
    @AutoIncrement
    @Column
    id:number;

    @Column({
        type:DataType.INTEGER.UNSIGNED,
        allowNull:false
    })
    @ForeignKey(()=>User)
    userId:number;

    @Column({
        type:DataType.INTEGER.UNSIGNED,
        allowNull:false
    })
    @ForeignKey(()=>BoardList)
    boardListId:number;

    @Column({
        type:DataType.STRING(255),
        allowNull:false

    })
    name:string;

    @Column({
        type:DataType.STRING(2000),
        allowNull:false,
        defaultValue: ''
    })
    description:string;

    @Column({
        type:DataType.FLOAT,
        allowNull:false,
        defaultValue:0

    })
    order:number;

    @HasMany(() => Comment)
    comments:Comment[];

    @HasMany(() => CardAttachment)
    attachments:CardAttachment[];

    @CreatedAt
    createdAt:Date;

    @UpdatedAt
    updatedAt:Date;
}