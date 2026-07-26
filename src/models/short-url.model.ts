import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db/sequelize";

export interface ShortUrlAttributes {
  id: number;
  originalUrl: string;
  shortUrl: string;
  nbClicks: number;
  createdAt?: Date;
  updatedAt?: Date;
}

type ShortUrlCreationAttributes = {
  originalUrl: string;
  shortUrl: string;
};

class ShortUrl
  extends Model<ShortUrlAttributes, ShortUrlCreationAttributes>
  implements ShortUrlAttributes
{
  declare id: number;
  declare originalUrl: string;
  declare shortUrl: string;
  declare nbClicks: number;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

ShortUrl.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    originalUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    shortUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    nbClicks: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    tableName: "short_urls",
    timestamps: true,
    underscored: true,
  }
);

export default ShortUrl;
