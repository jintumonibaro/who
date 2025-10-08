import mysql from "mysql2"
import { createTables } from "./entities.js"

let db = null

export const getDatabase = async () =>
{
    if(!db)
    {   
        const pool = mysql.createPool({host:"localhost", user:"root", password:"1234", database:"deleteThis"})
        db =  pool.promise()
        await createTables(db)
    }
    return db 
}
