import express, { Request, Response, NextFunction } from "express";
import { createServer } from "http";
import { Client } from "discord.js";
import bodyParser from "body-parser";
import FileLogger from "../core/fileLogger";
const fileLogger = new FileLogger();

import AdmZip from "adm-zip";
import fs from 'fs';

const app = express();
const server = createServer(app);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.enable('trust proxy');

app.use(async (req: Request, res: Response, next: NextFunction) => {

    const requestIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

    res.setHeader("X-Response-Time", process.hrtime().toString());
    res.setHeader("Access-Control-Allow-Methods", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Server", "VtuberWiki Discord Bot");
    res.setHeader("X-Powered-By", "VtuberWiki Discord Bot");

    console.log(`${requestIp} - ${req.method} ${req.url} - ${res.statusCode}`);

    next();
});


/**
 * Starts the webserver
 * @param client The discord client
 */
export default function webServer(client: Client) {

    app.get("/", (req: Request, res: Response) => {
        res.status(200).json({
            success: true,
            message: "Welcome to VtuberWiki Discord Bot"
        })
    })

    app.get("/logs", async (req: Request, res: Response) => {
        const logs = await fileLogger.GetLogs();

        var file = req.query.file as string;
        const useHtml = req.query.html as string;

        if (file) {
            file = file.replace(/%20/g, " ");
        }

        if (!file) {
            if (req.query.zip) {
                try {
                    const zip = new AdmZip();
                    const outputFile = `${new Date().getTime()}.zip`;
                    zip.addLocalFolder(process.cwd() + "/logs");
                    zip.writeZip(outputFile);
                    res.download(outputFile);
                    setTimeout(() => {
                        fs.unlinkSync(outputFile);
                    }, 4000)
                    return
                } catch (error) {
                    res.status(404).json({ success: false, message: (error as Error).message });
                }
            } else {
                res.status(200).json({ success: true, data: logs });
            }
            return;
        }

        if (!logs.includes(file as string)) {
            res.status(404).json({ success: false, message: "File not found" });
            return;
        }

        if (useHtml === "true") {
            res.setHeader("Content-Type", "text/html");
            const data = await fileLogger.ReadLog(file);

            let HTML = `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Log ${file}</title>
                <style>
                    body {
                        background-color: #333;
                        color: #fff;
                        font-family: Arial, sans-serif;
                        font-family: "Cascadia Code";
                    }
                </style>

                <link rel="stylesheet" href="https://storage.hylia.dev/fonts/CascadiaCode.ttf" />
            </head>
            <body>
                ${
                    data.length > 0 ? data.split("\n").map((log: string) => {
                        if (log.includes("LOG")) {
                            return `<p style="color: green;">${log}</p>`;
                        } else if (log.includes("WARN")) {
                            return `<p style="color: yellow;">${log}</p>`;
                        } else if (log.includes("ERROR")) {
                            return `<p style="color: red;">${log}</p>`;
                        } else {
                            return `<p>${log}</p>`
                        }
                    }).join("") : "<p>Log not found</p>"
                }

                <noscript>
                    <p>Please enable JavaScript to view the log.</p>
                </noscript>
            </body>
            `;

            res.status(200).send(HTML);
        } else {
            res.status(200).json({ success: true, data: await fileLogger.ReadLog(file) });
        }
    })


    server.listen(6789, "0.0.0.0", () => {
        console.log("Listening on http://localhost:6789");
    });
}
