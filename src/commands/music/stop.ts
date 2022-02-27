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

    player.queue = []
    player.connection?.destroy()

    return interaction.reply({
        content: 'Musique stoppée !'
    })

}

export default {
    name: 'stop',
    description: 'Arrete la musique',
}