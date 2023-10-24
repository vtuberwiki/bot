import { Events, CommandInteraction, Client } from "discord.js";
import IClient from "../interfaces/IClient";


module.exports = {
    name: Events.InteractionCreate,
    once: false,
    async execute(interaction: CommandInteraction, client: IClient) {
        if (!interaction.isChatInputCommand()) return;

        const command = client.commands.get(interaction.commandName);

        if (!command) return;

        try {
            await command.execute(interaction);
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: "There was an error while executing this command!", ephemeral: true });
        }
    }
}