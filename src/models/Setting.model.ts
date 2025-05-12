import { Table, Column, Model, DataType } from "sequelize-typescript";

@Table
export default class Setting extends Model {
  @Column({
    allowNull: false,
    primaryKey: true,
    type: DataType.STRING,
  })
  declare id: string;

  @Column({
    type: DataType.STRING,
  })
  declare value: string;

  static getById: (id: string) => Promise<string>;

  static setById: (id: string, value: string) => Promise<void>;
}

Setting.getById = async (id: string) => {
  const result = await Setting.findAll({ where: [{ id }] });
  if (result.length === 0) {
    return "";
  }
  return result[0].value;
};

Setting.setById = async (id: string, value: string) => {
  const setting = await Setting.findOne({ where: [{ id }] });
  if (setting) {
    setting.value = value;
    await setting.save();
  }
};
