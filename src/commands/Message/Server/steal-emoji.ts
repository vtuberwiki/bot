import { Message } from 'discord.js';
import IClient from '../../../interfaces/IClient';
import IMessageCommand from '../../../interfaces/IMessageCommand';
import { parseEmoji } from '../../../core/tools';
import axios from 'axios';



export const command: IMessageCommand = {
    name: "steal-emoji",
    description: "Steal an emoji",
    usage: "<emoji> [name]",
    execute: async (message: Message, client: IClient, args: string[]) => {
        const emojis = args.join(" ").split(" ");

        for (const emoji of emojis) {
            const emojiRegex = /<?(a)?:?(\w{2,32}):(\d{17,19})>?/g;

            const emojiMatch = emoji.match(emojiRegex);

            if (!emojiRegex.test(emoji) || !emojiMatch) {
                return message.reply("Invalid emoji");
            }

            const emojiData = parseEmoji(emoji, true);

            if (!emojiData) {
                return message.reply("Invalid emoji");
            }

            const emojiBufferResolveable = await axios.get(emojiData.link as string, {
                responseType: "arraybuffer"
            });

            const newEmoji = await message.guild?.emojis.create({
                attachment: emojiBufferResolveable.data,
                name: emojiData.name
            });

            if (!newEmoji) {
                return message.reply("Failed to steal emoji");
            }

            message.reply(`${newEmoji} has been stolen`);
        }
    }
}

export default command;