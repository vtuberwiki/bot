import { SlashCommandBuilder, CommandInteraction, EmbedBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ActionRowBuilder, Events } from "discord.js";
import ISlashCommand from "../../../interfaces/ISlashCommand";
import axios from "axios";
import { fDate, fNumber, fTime } from "developer-toolkit-utils";

export const command: ISlashCommand = {
    data: new SlashCommandBuilder()
        .setName("guides")
        .setDescription("View the guides from the VtuberWiki"),
    async execute(interaction: CommandInteraction) {

        const data = await (await axios.get("https://vtubers.wiki/api/guides.json")).data.data;

        const embed = new EmbedBuilder()
            .setTitle(`Guides from the VtuberWiki (${fNumber(data.length)})`)
            .setURL("https://www.vtubers.wiki/wiki/guides");

        let selectMenu = new StringSelectMenuBuilder()
            .setCustomId("guides-select")
            .setPlaceholder("Select a guide");

        for (const guide of data) {
            embed.addFields(
                {
                    name: guide.title,
                    value: guide.description
                }
            )
        }

        for (const guide of data) {
            selectMenu.addOptions(
                new StringSelectMenuOptionBuilder()
                    .setLabel(guide.title)
                    .setValue(guide.slug)
                    .setEmoji("🗒️")
                    .setDescription(guide.description)
            )
        }

        const row = new ActionRowBuilder()
            .addComponents(selectMenu);

        //@ts-ignore
        await interaction.reply({ embeds: [embed], components: [row], ephemeral: true });


        await interaction.client.on(Events.InteractionCreate, async (interaction) => {
            if (!interaction.isSelectMenu()) return;
            if (interaction.customId !== "guides-select") return;

            const guide = data.find((guide: { slug: string; }) => guide.slug === interaction.values[0]);
            if (!guide) return;

            const embed = new EmbedBuilder()
                .setTitle(guide.title)
                .setDescription(guide.body)
                .setURL(`https://vtubers.wiki/wiki/guides/${guide.slug}`)
                .setFooter({ text: `Created on ${fDate(new Date(guide.pubDate))} at ${fTime(new Date(guide.pubDate), true)}`, iconURL: "https://www.vtubers.wiki/images/logo.png" })

            await interaction.update({ embeds: [embed] });
        })

    },
} as ISlashCommand;