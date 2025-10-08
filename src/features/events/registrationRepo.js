import { getDatabase } from "../../data/local/database/database.js"

const db = await getDatabase()

export const registrationRepo = 
{
    async addRegistration(userId, eventId, ticket_code)
    {
        const result = await db.execute(`insert into registration (userId, eventId, ticket_code) values (?, ?, ?)`, [userId, eventId, ticket_code])
        return result[0].affectedRows
    }
}