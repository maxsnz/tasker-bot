import {
  Table,
  Column,
  Model,
  DataType,
  BelongsTo,
  ForeignKey,
  AutoIncrement,
  PrimaryKey,
} from "sequelize-typescript";
import User from "./User.model";
// import { DataTypes } from "sequelize";

@Table
export default class Task extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column({
    primaryKey: true,
    type: DataType.INTEGER,
  })
  declare id: number;

  @ForeignKey(() => User)
  @Column({
    allowNull: false,
    type: DataType.NUMBER,
  })
  declare userId: number;

  @Column({
    allowNull: false,
    type: DataType.DATE,
  })
  declare date: Date;

  @Column({
    defaultValue: false,
    type: DataType.BOOLEAN,
  })
  declare isFinished: boolean;

  @Column({
    type: DataType.STRING,
  })
  declare text: string;

  @BelongsTo(() => User)
  user: User;
}
