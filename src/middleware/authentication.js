import jwt from "jsonwebtoken"

export const httpAuthenticate = (req, res, next) =>
{
    const token = req.cookies.token
    try{
        const payload = jwt.verify(token, "JWT_SECRET")
        req.user = {email: payload.email, name: payload.name, id: payload.id}
    }
    catch(e)
    {
        res.status(401).json({message: "invalid token"})
    }

    next()

}