import {
	Client
} from "../../structure/Client";
import discord from "discord.js";

export async function run(Client: Client, interaction: any) {
	const row = new discord.MessageActionRow()
		.addComponents(
			new discord.MessageSelectMenu()
			.setCustomId('radio')
			.setPlaceholder('Choisissez votre radio')
			.addOptions([{
					label: 'France info',
					value: 'https://www.radio-en-ligne.fr/france-info',
				},
				{
					label: 'France inter',
					value: 'https://www.radio-en-ligne.fr/france-inter',
				},
			]),
		);

	await interaction.reply({
		components: [row]
	});
}

export default {
	name: 'radio',
	description: 'Met la radio',
}