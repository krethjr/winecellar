// const path = require('path')

module.exports = {
  port: process.env.PORT || 8081,
  db: {
    database: process.env.DB_NAME || "winecellar",
    username: process.env.DB_USER || "jim",
    password: process.env.DB_PASS || "fodder",
    options: {
      dialect: process.env.DIALECT || "mariadb",
      dialectOptions: {
        connectTimeout: 1000,
        timezone: "Etc/GMT-5",
        useUTC: false
      },
      host: process.env.HOST || "localhost",
      operatorAliases: false,
      charset: "utf8",
      collate: "utf8_general_ci"
    }
  },
  authentication: {
    jwtSecret: process.env.JWT_SECRET || "WZMhq3TJtDuMk3Ls"
  },
  imagesFolder: "@/images/"
};
