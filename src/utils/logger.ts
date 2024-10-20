import { configure, getLogger } from "log4js";
configure({
    appenders: {
        cheese: { type: "file", filename: "logs/default.log" },
        access: { type: "file", filename: "logs/access.log" },
        error: { type: "file", filename: "logs/error.log" },
        mysql: { type: "file", filename: "logs/mysql.log" }
    },
    categories: {
        default: { appenders: ["cheese"], level: "info" },
        access: { appenders: ["access"], level: "info" },
        error: { appenders: ["error"], level: "error" },
        mysql: { appenders: ["mysql"], level: "info" }
    },
});
export const accessLogger = getLogger("access")
export const errorLogger = getLogger("error")
export const mysqlLogger = getLogger("mysql")
export default getLogger();