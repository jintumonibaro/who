import { getDatabase } from "../../data/local/database/database.js";
const db = await getDatabase()
export const authRepo = {
    async getAllUsers()
    {
        const users = await db.execute(`select * from users`) 
        return users[0]
    },
    async insertUser(user)
    {
        const result = await db.execute(`insert into users (name, email, password) values (?, ?, ?)`, [user.name, user.email, user.password])
        return result[0].affectedRows
    }
}