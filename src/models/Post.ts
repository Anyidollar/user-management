import { Model, DataTypes } from "sequelize";
import { database } from "../config/database";

export class Post extends Model {
  id!: string;
  userId!: string;
  title!: string;
  body!: string;
}

Post.init(
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
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    body: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: database,
    tableName: "posts",
    timestamps: true,
  }
);

export default Post;
