import { Model, DataTypes } from "sequelize";
import { database } from "../config/database";
import Address from "./Address";

export interface UserAttributes {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

export class User extends Model<UserAttributes> {
  [x: string]: any;
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: database,
    tableName: "User",
    timestamps: true,
  }
);

// Define the relationship
User.hasOne(Address, { foreignKey: "userId", as: "address" });
Address.belongsTo(User, { foreignKey: "userId", as: "user" });

export default User;
