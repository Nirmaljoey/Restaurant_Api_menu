const { Sequelize } = require("sequelize");
require("dotenv").config();

// Extract instance name if defined (e.g. "localhost\\AST")
let host = process.env.DB_SERVER;
let instanceName = undefined;

if (host.includes("\\")) {
  const parts = host.split("\\");
  host = parts[0];
  instanceName = parts[1];
}

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: host,
    dialect: "mssql",
    dialectOptions: {
      options: {
        instanceName: instanceName,
        encrypt: false,
        trustServerCertificate: true
      }
    },
    logging: false
  }
);

module.exports = sequelize;
