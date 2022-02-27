import {
    Client
} from "../../structure/Client";
import {
    Player
} from "../../structure/Player";
import discord from "discord.js";
import search from "yt-search"

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
        player = new Player(voiceChannel as discord.VoiceChannel, interaction.channel)
        Client.players.set(voiceChannel?.id as string, player)
    }
    player.joinChannel(interaction)
    const song = ["https://", "youtube"].includes(interaction.options._hoistedOptions[0].value)?interaction.options._hoistedOptions[0].value : (await player.findVideo(interaction.options._hoistedOptions[0].value) as search.VideoSearchResult)?.url
    let result = await player.addSong(song)

    if (player.queue.length == 1) {
        interaction.reply({
            content: '_ _'
        })
        return player.playlist()
    }

    return interaction.reply({
        content: result
    })

}

export default {
    name: 'play',
    description: 'joue de la musique dans un salon vocal',
    options: [{
        type: 'STRING',
        name: 'musique',
        description: 'Veuillez entrer le lien vers la musique'
    }]
}