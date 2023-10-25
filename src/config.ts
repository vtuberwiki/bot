import { GatewayIntentBits } from "discord.js";

import { IConfig, IActivity } from "./interfaces/IConfig";

const config: IConfig = {
    StaffPrefix: "!!",
    GreetingChannel: "1166212129389563906",
    GuildId: "1166212127044931718",
    StaffRole: "1166213537153167450",
    RulesChannel: "1166213837842813038",
    Intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildEmojisAndStickers, GatewayIntentBits.GuildMessages],
    github_url: "https://github.com/vtuberwiki/bot",
    startupActivity: "Starting up...",
    Activities: [
        {
            name: "⭐ me on github!",
        },
        {
            name: "Make sure to check out the rules!",
        }
    ] as IActivity[],
    SupportEmbedChance: {
        chanceToSend: 10,
        ranAmount: 300,
    },
}

export default config;