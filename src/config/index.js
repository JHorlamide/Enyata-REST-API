const Sequelize = require("sequelize");
const db_config = require('./config.json');
const config = require('./env.config')

let devDB = new Sequelize(db_config.development.database, db_config.development.username, db_config.development.password, {
    dialect: db_config.development.dialect,
    host: db_config.development.host,
    logging: false,
    define: {
        freezeTableName: true
    }
});

let prodDB = new Sequelize(db_config.production.database, db_config.production.username, db_config.production.password, {
    dialect: db_config.production.dialect,
    host: db_config.production.host,
    logging: false,
    define: {
        freezeTableName: true
    }
});

module.exports = config.environment === "development" ? devDB : prodDB