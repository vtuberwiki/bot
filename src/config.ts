import { GatewayIntentBits } from "discord.js";

import IConfig from "./interfaces/IConfig";

const config: IConfig = {
    StaffPrefix: "!!",
    GreetingChannel: "1166212129389563906",
    RulesChannel: "1166213837842813038",
    Intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildEmojisAndStickers, GatewayIntentBits.GuildMessages],
    github_url: "https://github.com/vtuberwiki/bot",
}

export default config;