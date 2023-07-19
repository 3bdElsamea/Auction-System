const fs = require('fs');
require('dotenv').config();

module.exports = {
    development: {
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        port: 5432,
        logging:false,
        dialect: process.env.DB_DIALECT,
    },
    test: {
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        port: 5432,
        dialect: process.env.DB_DIALECT,
        dialectOptions: {
            bigNumberStrings: true
        }
    },
    production: {
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        port: 5432,
        dialect: process.env.DB_DIALECT,
        /*dialectOptions: {
            bigNumberStrings: true,
            ssl: {
                ca: fs.readFileSync(__dirname + '/mysql-ca-main.crt')
            }
        }*/
    }
};