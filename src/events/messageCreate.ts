import { Events, Message } from "discord.js";
import IClient from "../interfaces/IClient";
import SupportEmbed from "../utils/SupportEmbed";

const NO_MESSAGES = [
    "1166212129389563904",
    "1166214538044112896",
    "1166214972263637053"
];


module.exports = {
    name: Events.MessageCreate,
    once: false,
    async execute(msg: Message, client: IClient) {
        if (msg.author.bot) return;
        if (msg.author.id === client.user?.id) return;
        if (!msg.guild || !msg.channel) return;

        console.log(`${msg.author.tag} sent (${msg.content}) in guild ${msg.guild?.name} (${msg.guild?.id}) in the channel ${msg.guild?.channels.cache.get(msg.channelId as string)?.name} (${msg.channelId})`);

        const support = SupportEmbed();

        if (support) {
            //@ts-ignore
            if (NO_MESSAGES.includes(msg.channel?.parentId)) return;
            await msg.channel.send({ ...support });
        }
    }
}