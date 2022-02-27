import { Client } from "../../structure/Client";
import discord from "discord.js";

export function run(Client: Client, interaction: discord.CommandInteraction){
    interaction.reply('help')
}

export default {
    name: 'help',
    description: 'help command'
}