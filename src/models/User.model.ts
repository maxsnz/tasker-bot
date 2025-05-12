import {
  Table,
  Column,
  Model,
  DataType,
  AutoIncrement,
  PrimaryKey,
} from "sequelize-typescript";
// import { DataTypes } from "sequelize";

@Table
export default class User extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column({
    primaryKey: true,
    type: DataType.INTEGER,
  })
  declare id: number;

  @Column({
    allowNull: false,
    type: DataType.STRING,
  })
  declare name: string;

  @Column({
    allowNull: false,
    type: DataType.DATE,
  })
  declare createdAt: Date;

  @Column({
    allowNull: false,
    type: DataType.DATE,
  })
  declare updatedAt: Date;
}
