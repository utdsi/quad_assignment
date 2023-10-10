
const {sequelize} = require("../config/db.js")

const {DataTypes} = require("sequelize")

const User = sequelize.define('User', {
  user_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  user_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  user_email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  user_password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  user_image: DataTypes.STRING,
  total_orders: DataTypes.INTEGER,
  created_at: DataTypes.DATE,
  last_logged_in: DataTypes.DATE,
});

module.exports = User;
