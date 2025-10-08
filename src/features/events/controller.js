import { eventRepo } from "./repo.js";
import { registrationRepo } from "./registrationRepo.js";
import { v4 as uuidV4 } from "uuid";
import QRCode from 'qrcode';
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

export const postRegisterEvent = async (req, res) =>
{
    const {eventId} = req.body
    const userId = req.user.id;
    const ticket_code = uuidV4()

    if(!eventId || !userId) return res.status(400).send()
    const registrations = await  registrationRepo.getAllRegistrations()
    console.log(registrations)
    const event = registrations.find(registration => registration.eventId == eventId && registration.userId == userId)
    if(event) return res.status(409).send()
    registrationRepo.addRegistration(userId, eventId, ticket_code)
    const qrDataURL = await QRCode.toDataURL(ticket_code);
    console.log(qrDataURL)
    res.status(200).json({ ticket_code, qr: qrDataURL });
}


export const getEvent = (req, res) =>
{
    const {eventId} = req.body

    res.status(200).send()
}