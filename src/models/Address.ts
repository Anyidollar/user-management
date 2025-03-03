import { Model, DataTypes } from "sequelize";
import { database } from "../config/database";

export class Address extends Model {
  id!: string;
  userId!: string;
  street!: string;
  city!: string;
  state!: string;
  zipCode!: string;
}

Address.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
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
