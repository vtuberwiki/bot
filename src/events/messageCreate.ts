import { Events, Message } from "discord.js";
import IClient from "../interfaces/IClient";
import SupportEmbed from "../utils/SupportEmbed";
import config from "../config";

const supportServer = config.GuildId;
const staffRole = config.StaffRole;

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

        const supportHasEmbed = support.embeds;

        if (msg.content.startsWith(config.StaffPrefix)) {
            const server = client.guilds.cache.get(supportServer as string);
            const member = await server?.members.fetch(msg.author.id);
            if (!(member?.roles.cache.has(staffRole as string))) {
              return;
            }
      
            const args = msg.content.slice(config.StaffPrefix.length).trim().split(/ +/);
            const commandName = args.shift()?.toLowerCase();

      
            if (!commandName) {
              return;
            }
      
            const command = client.messageCommands.get(commandName);
      
      
            if (!command) {
              return;
            }
      
            try {
              await command.execute(msg, client, args);
            } catch (error) {
              console.error(error);
              await msg.reply(`Error: ${(error as Error).message}\n\`${JSON.stringify(error, null, 2)}\``);
            }
        }
        else {
            if (supportHasEmbed) {
                //@ts-ignore
                if (NO_MESSAGES.includes(msg.channel?.parentId)) return;
                await msg.channel.send({ ...support });
            }
        }
    }
}