import {
    Model, Table, PrimaryKey, AutoIncrement, Column,
    AllowNull,
    DataType,
    CreatedAt,
    UpdatedAt,
    ForeignKey
} from 'sequelize-typescript';
import { User } from './User';



@Table({
    tableName:'board'
})
export class Board extends Model<Board>{
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

    @AllowNull(false)
    @Column({
        type:DataType.STRING(255),
        allowNull:false

    })
    name:string;

    @CreatedAt
    createdAt:Date;

    @UpdatedAt
    updatedAt:Date;
}