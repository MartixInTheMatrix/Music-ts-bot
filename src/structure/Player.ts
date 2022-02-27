import discord from "discord.js"
import {
    createAudioPlayer,
    joinVoiceChannel,
    createAudioResource,
    VoiceConnection,
    AudioPlayer
} from '@discordjs/voice';
import ytdl from "ytdl-core"
import search from "yt-search"

export class Player {
    VoiceChannel: discord.VoiceChannel;
    textChannel: discord.TextChannel;
    isPlaying: boolean;
    radio: any;
    queue: string[]
    connection: VoiceConnection | undefined;
    player: AudioPlayer;

    constructor(channel: discord.VoiceChannel, textChannel: discord.TextChannel, radio?: string) {
        this.VoiceChannel = channel;
        this.textChannel = textChannel;
        this.isPlaying = true;
        this.radio = radio;
        this.queue = [];
        this.connection = undefined;
        this.player = createAudioPlayer();
    }

    async joinChannel(interaction: discord.Interaction) {
        this.connection = joinVoiceChannel({
            channelId: this.VoiceChannel.id,
            guildId: interaction.guild?.id as string,
            adapterCreator: interaction.guild?.voiceAdapterCreator as discord.InternalDiscordGatewayAdapterCreator
        })
    }

    async addSong(song: string) {
        const video = await this.findVideo(song)
        if (!video) {
            return "Musique inaccessible !"
        }
        this.queue.push(song)
        return "Musique ajoutée à la playlist !"
    }

    async playlist() {
        const video = await this.findVideo(this.queue[0])
        if (!video) {
            this.queue.shift()
            this.playlist()
            return
        }
        const stream = ytdl((video as search.VideoSearchResult).url, {
            filter: 'audioonly'
        });
        this.player.play(createAudioResource(stream))
        this.connection?.subscribe(this.player)
        this.textChannel.send({
            embeds: [
                new discord.MessageEmbed()
                .setColor('RANDOM')
                .setTitle(`${video?.title} - ${video?.author.name}`)
                .setDescription(`${video?.description} \n\n[Lien vers la video](${video.url})`)
                .setImage(video?.image as string)
            ]
        })
        setTimeout(() => {
            this.queue.shift()
            this.playlist()
            return video
        }, video.duration.seconds * 1000)
    }
    async findVideo(song: string) {
        const video = search(song)
        return ((await video).videos.length > 1)?(await video).videos[0] : null;
    }

    async playRadio(radio: string) {
        this.player.play(createAudioResource(radio))
        this.connection?.subscribe(this.player)
    }

}