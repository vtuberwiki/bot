import { Events, ActivityType } from "discord.js";
import webServer from "../wwwroot/server";


module.exports = {
    name: Events.ClientReady,
    once: true,
    async execute(client: any) {
        console.clear();
        console.log(`Logged in as ${client.user.tag}`);

        client.user.setActivity("Vtuber Wiki", { type: ActivityType.Watching });

        
        webServer(client);
    }
}