import http from "http"
import { app } from "./app.js"
const server = http.createServer(app)

server.listen(5000, () =>{console.log("server is listening in port 5000")})
    