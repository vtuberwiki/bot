import { EmbedBuilder } from "discord.js";
import config from "../config";

/**
 * Support Embed
 * @returns object
 */
export default function SupportEmbed() {
    const random = Math.floor(Math.random() * config.SupportEmbedChance.ranAmount);

    const supportEmbed = new EmbedBuilder()
        .setTitle("Show us your support!")
        .setDescription(`Keeping all of our projects running is our top priority. However this costs a lot of money! We'd love if you could show us your support!`)
        .addFields(
            { name: "Support us on Ko-fi", value: "https://ko-fi.com/unsignedint32", inline: true },
            { name: "Support us on Throne", value: "https://throne.com/int32", inline: true },
        )
        .setTimestamp();

    if (random < config.SupportEmbedChance.chanceToSend) {
        return {
            embeds: [supportEmbed],
        }
    } else {
        return {};
    }
}