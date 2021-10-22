const sequelize = require("../db");
const { DataTypes } = require("sequelize");

const User = sequelize.define("user", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING },
  role: { type: DataTypes.STRING, defaultValue: "ADMIN" },
});

const Project = sequelize.define("project", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, primaryKey: true },
  owner: { type: DataTypes.STRING, primaryKey: true },
  customer: { type: DataTypes.STRING, primaryKey: true },
  place: { type: DataTypes.STRING, primaryKey: true },
  timeline: { type: DataTypes.STRING, primaryKey: true },
  estimation: { type: DataTypes.INTEGER, primaryKey: true },
});

const Customer = sequelize.define("customer", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, primaryKey: true },
  payment_agreement: { type: DataTypes.STRING, primaryKey: true },
  discount: { type: DataTypes.INTEGER, primaryKey: true },
  access_to_projects: { type: DataTypes.STRING, primaryKey: true },
});

const Place = sequelize.define("place", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, primaryKey: true },
  addres: { type: DataTypes.STRING, primaryKey: true },
  price: { type: DataTypes.INTEGER, primaryKey: true },
  timeline: { type: DataTypes.STRING, primaryKey: true },
  status: { type: DataTypes.STRING, primaryKey: true },
});

const Estimation = sequelize.define("estimation", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  assets: { type: DataTypes.STRING, primaryKey: true },
  tooling: { type: DataTypes.STRING, primaryKey: true },
  work: { type: DataTypes.STRING, primaryKey: true },
});

module.exports = {
  User,
  Project,
  Customer,
  Place,
  Estimation,
};
