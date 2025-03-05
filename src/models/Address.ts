import { Model, DataTypes } from "sequelize";
import { database } from "../config/database";

export class Address extends Model {
  public id!: string;
  public userId!: string;
  public street!: string;
  public city!: string;
  public state!: string;
  public zipCode!: string;

 public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Address.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    street: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    zipCode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: database,
    tableName: "addresses",
    timestamps: true,
  }
);

export default Address;
