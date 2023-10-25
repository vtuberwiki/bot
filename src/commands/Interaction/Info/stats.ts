import { SlashCommandBuilder, CommandInteraction, EmbedBuilder } from "discord.js";
import ISlashCommand from "../../../interfaces/ISlashCommand";
import os from "os";


function GetComputerSpecs() {
    function FormatMemory(memory: number) {
        const units = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
        let i = 0;
        while (memory >= 1024 && i < units.length - 1) {
            memory /= 1024;
            i++;
        }
        return `${memory.toFixed(2)} ${units[i]}`;
    }

    function GetCPUs() {
       let cpus = os.cpus();
       console.log(cpus);
       return cpus.map((cpu) => {
           return cpu.model;
       })
    }

    

    const memory = Math.round(process.memoryUsage().heapUsed / 1024 / 1024);
    const cpus = GetCPUs();
    

    return {
        memory: FormatMemory(memory),
        cpus
    }
}

function NormlizeText(text: any) {
    // Replace all the _ with spaces
    const _ = text.toString().replace(/_/g, " ");
    return _.replace(/\s+/g, " ");
}

function GetData() {
    const data = {
        Node_Version: process.version,
        Discordjs_Version: require("discord.js").version,
        os: `${os.platform()} ${os.release()}`,
        arch: process.arch,
        platform: process.platform,
        pid: process.pid.toString(),
    };

    return data;
}

export const command: ISlashCommand = {
    data: new SlashCommandBuilder()
        .setName("stats")
        .setDescription("View the stats for the server"),
    async execute(interaction: CommandInteraction) {

        try {
            const embed = new EmbedBuilder()
                .setTitle("Server Stats")
                .setDescription(`Here are the stats for \`::LOCAL@PORTZERO::\``);

            const data = GetData();
            const computerSpecs = GetComputerSpecs();

            for (const [key, value] of Object.entries(data)) {
                embed.addFields({ name: NormlizeText(key), value: value });
            }

            embed.addFields({
                name: "Memory",
                value: `${computerSpecs.memory}`,
            });

            embed.addFields({
                name: "CPUs",
                value: `${computerSpecs.cpus.join(", ")}`,
            })


            await interaction.reply({ embeds: [embed], ephemeral: true });
        } catch (error) {
            console.log(error);
        }

    },
} as ISlashCommand;