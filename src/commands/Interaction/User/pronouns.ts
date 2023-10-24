import { SlashCommandBuilder, CommandInteraction } from "discord.js";
import ISlashCommand from "../../../interfaces/ISlashCommand";

export const command: ISlashCommand = {
    data: new SlashCommandBuilder()
        .setName("pronouns")
        .setDescription("Set your pronouns.")
        .addStringOption(option =>
            option.setName("pronouns")
                .setDescription("Your pronouns.")
                .setRequired(true)),
    async execute(interaction: CommandInteraction) {
        //@ts-ignore
        const pronouns = await interaction.options.getString("pronouns");

        //@ts-ignore
        const ogName = await (await interaction.guild?.members.fetch(interaction.user.id)).nickname;


        //@ts-ignore
        (await interaction.guild?.members.fetch(interaction.user.id)).setNickname(`${ogName} (${pronouns})`);

        await interaction.reply({
            content: `Your pronouns have been set to: ${pronouns}`,
            ephemeral: true
        })
    },
} as ISlashCommand;