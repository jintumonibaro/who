import mysql from "mysql2"
import { createTables } from "./entities.js"

let db = null

export const getDatabase = async () =>
{
    if(!db)
    {   
        const pool = mysql.createPool({
    host: process.env.MYSQLHOST ?? "localhost",
      user: process.env.MYSQLUSER ?? "root",
      password: process.env.MYSQLPASSWORD ?? "1234",
      database: process.env.MYSQLDATABASE ?? "deletethis",
      port: process.env.MYSQLPORT ?? 3306,  
        })
        db =  pool.promise()
        await createTables(db)
    }
    return db 
}
