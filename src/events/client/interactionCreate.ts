import {
	Client
} from "../../structure/Client";
import discord from "discord.js";
import {
	Player
} from "../../structure/Player";

export default async (Client: Client, interaction: discord.Interaction) => {

	if (interaction.isCommand()) {
		console.log('yo')
		const command = Client.commands.get(interaction.commandName)

		if (!command) return;

		try {
			command.run(Client, interaction);
		} catch (error) {
			console.error(error);
			return interaction.reply({
				content: 'Il y a eu une erreur !',
				ephemeral: true
			});
		}
	} else if (interaction.isSelectMenu()) {
		if (interaction.customId === 'radio') {
			const member = interaction.guild?.members.cache.get(interaction.user.id)
			if (!member?.voice.channelId) {
				return interaction.reply({
					embeds: [Client.error('Vous devez etre dans un salon vocal pour effectuer cette commande !')]
				})
			}
			const voiceChannel = member?.voice.channel
			let player = Client.players.get(voiceChannel?.id as string)

			if (!player) {
				player = new Player(voiceChannel as discord.VoiceChannel, interaction.channel as discord.TextChannel)
				Client.players.set(voiceChannel?.id as string, player)
			}
			player.joinChannel(interaction)
			player.playRadio(interaction.values[0])
			return interaction.reply(`La radio a bien été lancée !`)
		}
	} else if (interaction.isButton()) {
		if (interaction.customId === 'replay') {
			const member = interaction.guild?.members.cache.get(interaction.user.id)
			if (!member?.voice.channelId) {
				return interaction.reply({
					embeds: [Client.error('Vous devez etre dans un salon vocal pour effectuer cette commande !')]
				})
			}
			const voiceChannel = member?.voice.channel
			let player = Client.players.get(voiceChannel?.id as string)

			if (!player) {
				player = new Player(voiceChannel as discord.VoiceChannel, interaction.channel as discord.TextChannel)
				Client.players.set(voiceChannel?.id as string, player)
			}
			player.player.unpause()
			return interaction.reply({
				content: 'La musique continue !'
			})

		}
	}
}