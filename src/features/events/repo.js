import { getDatabase } from "../../data/local/database/database.js";
const db = await getDatabase()


export const eventRepo = {
    async addEvent(userId, date, title, description)
    {
        const result =  await db.execute(`INSERT INTO events (organizer_Id, event_date, title, description) values(?, ?, ?, ?)`, [userId, date, title, description])
        return result[0].affectedRows
    },

    async getAllEvents()
    {
        const result =  await db.execute(`SELECT * FROM events`)
        return result[0]
    }
}