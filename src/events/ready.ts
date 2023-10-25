import { Events, ActivityType } from "discord.js";
import webServer from "../wwwroot/server";
import { StartWatching } from "../core/Watcher";
import FileLogger from "../core/fileLogger";
import { SelfUpdate } from "../services/Github";
import config from "../config";


module.exports = {
    name: Events.ClientReady,
    once: true,
    async execute(client: any) {
        if (process.env.environment != 'development')  {
            const fileLogger = new FileLogger();
            fileLogger.startLogging();

            await SelfUpdate(true);
        }
        console.clear();
        client.user.setActivity({ type: ActivityType.Custom, name: config.startupActivity });
        console.log(`Logged in as ${client.user.tag}`);

        setInterval(() => {
            const random = config.Activities[Math.floor(Math.random() * config.Activities.length)];
            client.user.setActivity({ type: ActivityType.Custom, name: random.name });
        }, 5000)

        
        webServer(client);

        await StartWatching();
    }
}