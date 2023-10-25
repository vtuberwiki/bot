import { Events, CommandInteraction, EmbedBuilder, ButtonBuilder, ButtonStyle } from "discord.js";
import IClient from "../interfaces/IClient";




module.exports = {
    name: Events.InteractionCreate,
    once: false,
    async execute(interaction: CommandInteraction, client: IClient) {
        if (!interaction.isChatInputCommand()) return;

        const command = client.commands.get(interaction.commandName);

        if (!command) return;

        async function ShowSupport() {
            const random = Math.floor(Math.random() * 300);

            const supportEmbed = new EmbedBuilder()
                .setTitle("Show us your support!")
                .setDescription(`Keeping all of our projects running is our top priority. However this costs a lot of money! We'd love if you could show us your support!`)
                .addFields(
                    { name: "Support us on Ko-fi", value: "https://ko-fi.com/unsignedint32", inline: true },
                    { name: "Support us on Throne", value: "https://throne.com/int32", inline: true },
                )
                .setTimestamp();

            if (random < 10) {
                return await interaction.channel?.send({
                    embeds: [supportEmbed],
                })
            }
        }

        try {
            await command.execute(interaction);
            await ShowSupport();
            console.log(`${interaction.user.tag} used command ${interaction.commandName} in guild ${interaction.guild?.name} (${interaction.guild?.id}) in the channel ${interaction.guild?.channels.cache.get(interaction.channel?.id as string)?.name} (${interaction.channel?.id})`);
        } catch (error) {
            console.error(`Error while executing command ${interaction.commandName}: ${error}`);
            await interaction.reply({ content: "There was an error while executing this command!", ephemeral: true });

        }
    }
}