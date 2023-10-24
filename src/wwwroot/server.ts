import express, { Request, Response, NextFunction } from "express";
import { createServer } from "http";
import { Client } from "discord.js";
import IClient from "../interfaces/IClient";
import bodyParser from "body-parser";
import fetch from "node-fetch";

const app = express();
const server = createServer(app);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req: Request, res: Response, next: NextFunction) => {
    res.setHeader("X-Response-Time", process.hrtime().toString());
    res.setHeader("Access-Control-Allow-Methods", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Server", "VtuberWiki Discord Bot");
    res.setHeader("X-Powered-By", "VtuberWiki Discord Bot");
    res.status(200).send("OK");
})

export default function webServer(client: Client) {
    server.listen(process.env.PORT || 8080, () => {
        console.log(`listening on *:${process.env.PORT || 8080}`);
    });
}
