import { authRepo } from "./repo.js";
import jwt from "jsonwebtoken"
export const postSignup = async (req, res) =>
{
    const {name, email, password} = req.body;
    if(!name || !email || !password)
    {
        return res.status(400).send()
    }

    const users = await authRepo.getAllUsers()
    const existsUser = users.find(user => user.email == email)
    if(existsUser) return res.status(409).send()
    authRepo.insertUser({name, email, password})
    res.status(200).send()
}


export const postLogin = async (req, res) =>
{
    const {email, password} = req.body
    if(!email || !password)
    {
        return res.status(400).send()
    }
    const users = await authRepo.getAllUsers()
    const existsUser = users.find(user => user.email == email)
    if(!existsUser) return res.status(401).send()
    if(existsUser.password == password)
    {
        const token = jwt.sign({email: existsUser.email, name : existsUser.name, id: existsUser.id}, "JWT_SECRET", {expiresIn : "30d"})
        res.cookie("token", token, {expiresIn : 30*24*60*60*1000}).send()
    }else
    {
        res.status(401).send()
    }
}

export const postLogout = async (req, res) =>
{
    res.clearCookie('token')
    res.status(200).send()
}