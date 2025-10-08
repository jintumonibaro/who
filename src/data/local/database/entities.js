export const createTables  = async (db) =>
{
    const queries = [
        `CREATE TABLE IF NOT EXISTS users(id int auto_increment primary key, 
        name varchar(100),
        email varchar(100),
        password varchar(100),
        create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)`,
    `CREATE TABLE IF NOT EXISTS events(id int auto_increment primary key, organizer_Id int, title varchar(100),description varchar(100) ,event_date timestamp, 
    foreign key (organizer_Id) references users(id))`,
`CREATE TABLE IF NOT EXISTS registration (id int primary key auto_increment, userId int, eventId int, ticket_code varchar(128),
    foreign key (userId) references users(id), foreign key (eventId) references events(id))`]

    for(const q of queries)
    {
        await db.query(q)
    }
}

