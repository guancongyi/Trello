import {
    Model, Table, PrimaryKey, AutoIncrement, Column,
    AllowNull,
    DataType,
    CreatedAt,
    UpdatedAt,
    ForeignKey
} from 'sequelize-typescript';
import { User } from './User';
import { Board } from './Board';




@Table({
    tableName:'BoardList'
})
export class BoardList extends Model<BoardList>{
    @PrimaryKey
    @AutoIncrement
    @Column({
        type:DataType.INTEGER.UNSIGNED
    })
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
    @ForeignKey(()=>Board)
    boardId:number;

    @AllowNull(false)
    @Column({
        type:DataType.STRING(255),
        allowNull:false

    })
    name:string;

    @Column({
        type:DataType.FLOAT,
        allowNull:false,
        defaultValue:0

    })
    order:number;

    @CreatedAt
    createdAt:Date;

    @UpdatedAt
    updatedAt:Date;
}