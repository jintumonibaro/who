import { eventRepo } from "./repo.js";



export const postEvent = (req, res) =>
{
    const {title, eventDate, description} = req.body
    if(!title || !eventDate || !description)
    {
        return res.status(400).send()
    }

    const date = new Date(eventDate);

    const sqlDate = date.getFullYear() + '-' +
    String(date.getMonth() + 1).padStart(2, '0') + '-' +
    String(date.getDate()).padStart(2, '0') + ' ' +
    String(date.getHours()).padStart(2, '0') + ':' +
    String(date.getMinutes()).padStart(2, '0') + ':' +
    String(date.getSeconds()).padStart(2, '0');

    eventRepo.addEvent(req.user.id, sqlDate, title, description)
    res.status(201).send()
}

export const getEvents = async (req, res) =>
{
    const events = await eventRepo.getAllEvents()
    res.json(events)
}