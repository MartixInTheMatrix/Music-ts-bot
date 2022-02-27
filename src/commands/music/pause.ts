import {
    Client
} from "../../structure/Client";
import {
    Player
} from "../../structure/Player";
import discord from "discord.js";

export async function run(Client: Client, interaction: any) {
    const member = interaction.guild?.members.cache.get(interaction.user.id)
    if (!member?.voice.channelId) {
        return interaction.reply({
            embeds: [Client.error('Vous devez etre dans un salon vocal pour effectuer cette commande !')]
        })
    }
    const voiceChannel = member?.voice.channel
    let player = Client.players.get(voiceChannel?.id as string)

    if (!player) {
        return interaction.reply({
            embeds: [Client.error('Aucune musique n\'est en cours !')]
        })
    }

    player.player.pause()
    const row = new discord.MessageActionRow()
        .addComponents(
            new discord.MessageButton()
            .setCustomId('replay')
            .setLabel('Rejouer')
            .setStyle('PRIMARY'),
        );
    return interaction.reply({
        content: 'Musique mise en pause !',
        components: [row]
    })

}

export default {
    name: 'pause',
    description: 'Met la musique sur pause',
}