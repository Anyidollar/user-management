import { Model, DataTypes } from "sequelize";
import { database } from "../config/database";
import User from "./User";

export interface PostAttributes {
  id: string;
  title: string;
  body: string;
  userId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Post extends Model<PostAttributes> implements PostAttributes {
  public id!: string;
  public title!: string;
  public body!: string;
  public userId!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Post.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
      onDelete: "CASCADE",
    },
  },
  {
    sequelize: database,
    tableName: "Posts",
    timestamps: true,
  }
);

export default Post;
