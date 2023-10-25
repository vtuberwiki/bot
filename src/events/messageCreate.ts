import { Events, Message } from "discord.js";
import IClient from "../interfaces/IClient";


module.exports = {
    name: Events.MessageCreate,
    once: false,
    async execute(msg: Message, client: IClient) {
        if (msg.author.bot) return;
        if (msg.author.id === client.user?.id) return;

        console.log(`${msg.author.tag} sent (${msg.content}) in guild ${msg.guild?.name} (${msg.guild?.id}) in the channel ${msg.guild?.channels.cache.get(msg.channelId as string)?.name} (${msg.channelId})`);
    }
}