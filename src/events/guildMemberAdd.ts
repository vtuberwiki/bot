import { EmbedBuilder, Events, TextChannel } from "discord.js";
import config from "../config";
import IClient from "../interfaces/IClient";

const DEFUALT_MESSAGE = `Welcome to %guild %u!\nPlease read the rules in <#${config.RulesChannel}>. We are also [Open Source](https://github.com/vtuberwiki/bot)`;

module.exports = {
    name: Events.GuildMemberAdd,
    once: false,
    async execute(member: any, client: IClient) {
        const embed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle(`Welcome to the ${member.guild.name}!`)
            .setDescription(DEFUALT_MESSAGE.replace("%u", `<@${member.id}>`).replace("%guild", `<@${member.guild.id}>`));

        const channel = client.channels.cache.get(config.GreetingChannel) as TextChannel;

        if (channel) {
            channel.send({ embeds: [embed], content: `${member}` });
        }

        await member.roles.add("1166213210660159549");


    }
}