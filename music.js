const Discord = require('discord.js');
// const createBar = require("string-progressbar");
const { Client, Util } = require('discord.js');
const ytdl = require('ytdl-core');
const YouTube = require('simple-youtube-api');
const PREFIX = '>';
const { token } = require('./config.json');
const { GOOGLE_API_KEY } = require('./config.json');

const client = new Client({ disableEveryone: true })

const youtube = new YouTube(GOOGLE_API_KEY)

const queue = new Map()

client.on('ready', () => {
    console.log("music.js working.")
    client.user.setStatus("dnd")

client.on('message', async message => {
    if (message.author.bot) return
    if (!message.content.startsWith(PREFIX)) return

    const args = message.content.substring(PREFIX.LENGTH).split(" ")
    const searchString = args.slice(1).join(' ')
    const url = args[1] ? args[1].replace(/<(._)>/g, '$1') : ''
    const serverQueue = queue.get(message.guild.id)

    if (message.content.startsWith(`${PREFIX}play` && `${PREFIX}pl`)) {
        let searchingEmbed = new Discord.MessageEmbed()
        .setAuthor("Searching...")
        .setColor("RANDOM")
        .setDescription("Searching for your song.")

        let usecommandEmbed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setDescription("You cannot use this command.")

        let mustinVCEmbed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setDescription("You must be in the Music VC to play Music.")
        
        let search1Embed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setDescription("I don't have permission to join the Voice Chat. Check the channel permissions or ask an Administrator or Developer for help.")

        let search2Embed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setDescription("I don't have permissions to speak in this Voice Chat. Check the channel permissions or ask an Administrator or Developer for help.")

        let noResultsEmbed = new Discord.MessageEmbed()
        .setAuthor("No results")
        .setColor("RANDOM")
        .setDescription("I couldn't find any search results, sorry. Try something else.")

        let musicandcommandChannelOnly = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setDescription("Use this in a music channel")

        if (!message.channel.name.includes("music") &&  !message.member.hasPermission("MANAGE_MESSAGES")) return message.reply(musicandcommandChannelOnly).then(msg => msg.delete({ timeout: 3500 }));
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply(usecommandEmbed).then(msg => msg.delete({timeout: 3000}))
        const voiceChannel = message.member.voice.channel
        if (voiceChannel) message.channel.send(searchingEmbed)
        if (!voiceChannel) return message.channel.send(mustinVCEmbed)
        const permissions = voiceChannel.permissionsFor(message.client.user)
        if (!permissions.has('CONNECT')) return message.channel.send(search1Embed)
        if (!permissions.has('SPEAK')) return message.channel.send(search2Embed)
       
        try {
            var video = await youtube.getVideo(url)
        } catch {
            try {
                var videos = await youtube.searchVideos(searchString, 1)
                var video = await youtube.getVideoByID(videos[0].id)
            } catch {
                return message.channel.send(noResultsEmbed)
            }
        }

        const song = {
            id: video.id,
            title: Util.escapeMarkdown(video.title),
            url: `https://www.youtube.com/watch?v=${video.id}`
        }
        

        if (!serverQueue) {
            const queueConstruct = {
                textChannel: message.channel,
                voiceChannel: voiceChannel,
                connection: null,
                songs: [],
                volume: 5,
                playing: true
            }
            queue.set(message.guild.id, queueConstruct)

            queueConstruct.songs.push(song)

            try {
                var connection = await voiceChannel.join()
                queueConstruct.connection = connection
                play(message.guild, queueConstruct.songs[0])
            } catch (error) {
                console.log(`There was an error while trying to connect: ${error}`)

                let errorconnectEmbed = new Discord.MessageEmbed()
                .setAuthor("Error connecting")
                .setColor("RANDOM")
                .setDescription(`There was an error while trying to connect: ${error}`)
                queue.delete(message.guild.id)
                return message.channel.send(errorconnectEmbed)
            }
        } else {
            let serverQueueaddEmbed = new Discord.MessageEmbed()
            .setAuthor("New song added to queue")
            .setColor("RANDOM")
            .setDescription(`**${song.title}** has been added to the queue.`)
            serverQueue.songs.push(song)
            return message.channel.send(serverQueueaddEmbed)
        }
        return undefined
    } else if (message.content.startsWith(`${PREFIX}stop`)) {

        let cantEmbed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setDescription("You cannot use this command.")
        
        let stoppedEmbed = new Discord.MessageEmbed()
        .setAuthor("Music stopped")
        .setColor("RANDOM")
        .setDescription('I have stopped the song and left the VC!')

        let stopped1Embed = new Discord.MessageEmbed()
        .setAuthor("Music stopped")
        .setColor("RANDOM")
        .setDescription("You need to be in a voice channel in order to stop music.")

        let nothingPlayingEmbed = new Discord.MessageEmbed()
        .setAuthor("Nothing playing")
        .setColor("RANDOM")
        .setDescription("There is nothing playing!")

        let musicandcommandChannelOnly = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setDescription("Use this in a music channel")

        if (!message.channel.name.includes("music") &&  !message.member.hasPermission("MANAGE_MESSAGES")) return message.reply(musicandcommandChannelOnly).then(msg => msg.delete({ timeout: 3500 }));
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply(cantEmbed).then(msg => msg.delete({timeout: 3000}))
        if (message.member.voice.channel) message.channel.send(stoppedEmbed)
        if (!message.member.voice.channel) return message.channel.send(stopped1Embed)
        if (!serverQueue) return message.channel.send(nothingPlayingEmbed)
        serverQueue.songs = []
        serverQueue.connection.dispatcher.end()
        return undefined
    } else if (message.content.startsWith(`${PREFIX}skip` && `${PREFIX}fs`)) {

        let cant1Embed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setDescription("You cannot use this command.")

        let idkEmbed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setDescription("You need to be in a voice channel in order to skip songs.")

        let lolEmbed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setDescription("There is nothing playing right now.")

        let stop69Embed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setDescription("I have skipped the music.")

        let musicandcommandChannelOnly = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setDescription("Use this in a music channel")

        if (!message.channel.name.includes("music") &&  !message.member.hasPermission("MANAGE_MESSAGES")) return message.reply(musicandcommandChannelOnly).then(msg => msg.delete({ timeout: 3500 }));
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply(cant1Embed).then(msg => msg.delete({timeout: 3000}))
        if (!message.member.voice.channel) return message.channel.send(idkEmbed)
        if (!serverQueue) return message.channel.send(lolEmbed)
        serverQueue.connection.dispatcher.end()
        message.channel.send(stop69Embed)
        return undefined
    } else if (message.content.startsWith(`${PREFIX}volume` && `${PREFIX}v`)) {
        let volumeshowEmbed = new Discord.MessageEmbed()
        .setAuthor("Current volume:")
        .setColor("RANDOM")
        .setDescription(`The volume is now: **${serverQueue.volume}**`)

        let lmaoEmbed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setDescription("You cannot use this command.")

        let mustinVCembed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setDescription("You need to be in a voice channel to use this command.")

        let nothinPlaying = new Discord.MessageEmbed()
        .setAuthor("Nothing playing")
        .setColor("RANDOM")
        .setDescription("There is nothing playing.")

        let invalidVolume = new Discord.MessageEmbed()
        .setAuthor("Invalid volume")
        .setColor("RANDOM")
        .setDescription("Not a valid volume. Valid example: `>volume 5`.")

        let musicandcommandChannelOnly = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setDescription("Use this in a music channel")

        if (!args[1]) return message.channel.send(volumeshowEmbed)
        if (!message.channel.name.includes("music") &&  !message.member.hasPermission("MANAGE_MESSAGES")) return message.reply(musicandcommandChannelOnly).then(msg => msg.delete({ timeout: 3500 }));
       // if (!message.channel.name.includes("commands" && "music") &&  !message.member.hasPermission("ADMINISTRATOR")) return message.reply(musicandcommandChannelOnly).then(msg => msg.delete({ timeout: 3500 }));
        if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply(lmaoEmbed).then(msg => msg.delete({timeout: 3000}))
        if (!message.member.voice.channel) return message.channel.send(mustinVCembed)
        if (!serverQueue) return message.channel.send(nothinPlaying)
        if (!args[1]) return message.channel.send(volumeshowEmbed)
        if (isNaN(args[1])) return message.channel.send(invalidVolume)
        serverQueue.volume = args[1]
        serverQueue.connection.dispatcher.setVolumeLogarithmic(args[1] / 5)
        let volumeupEmbed = new Discord.MessageEmbed()
        .setAuthor("Volume change:")
        .setColor("RANDOM")
        .setDescription(`I've set the volume to **${args[1]}**`)
        message.channel.send(volumeupEmbed)
        return undefined
    } else if (message.content.startsWith(`${PREFIX}np` && `${PREFIX}nowplaying`)) {
        let lmaoEmbed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setDescription("You cannot use this command.")

        let nothinPlaying = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setDescription("There is nothing playing right now.")

        let musicandcommandChannelOnly = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setDescription("Use this in a music channel")

        if (!message.channel.name.includes("music") &&  !message.member.hasPermission("MANAGE_MESSAGES")) return message.reply(musicandcommandChannelOnly).then(msg => msg.delete({ timeout: 3500 }));
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply(lmaoEmbed).then(msg => msg.delete({timeout: 3000}))
        if (!serverQueue) return message.channel.send(nothinPlaying)
        let npEmbed = new Discord.MessageEmbed()
        .setAuthor("Current song:")
        .setColor("RANDOM")
        .setDescription(`Now Playing: **${serverQueue.songs[0].title}**`)
        message.channel.send(npEmbed)
        return undefined
    } else if (message.content.startsWith(`${PREFIX}queue` && `${PREFIX}que`)) {
        let lmaoEmbed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setDescription("You cannot use this command.")

        let nothinPlaying = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setDescription("There is nothing playing right now.")

        let musicandcommandChannelOnly = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setDescription("Use this in a music channel")

        if (!message.channel.name.includes("music") &&  !message.member.hasPermission("MANAGE_MESSAGES")) return message.reply(musicandcommandChannelOnly).then(msg => msg.delete({ timeout: 3500 }));
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply(lmaoEmbed).then(msg => msg.delete({timeout: 3000}))
        if (!serverQueue) return message.channel.send(nothinPlaying)
        let queueEmbed = new Discord.MessageEmbed()
        .setAuthor("Queue:")
        .setColor("RANDOM")
        .setDescription(`
        __**Song Queue:**__
        ${serverQueue.songs.map(song => `**-** ${song.title}`).join('\n')}
                
        **Now Playing:** ${serverQueue.songs[0].title}
                `, { split: true })
                message.channel.send(queueEmbed)
        return undefined
    } else if (message.content.startsWith(`${PREFIX}pause`)) {
        let nothingPlaying = new Discord.MessageEmbed()
        .setAuthor("What's playing right now?")
        .setColor("RANDOM")
        .setDescription("There is nothing playing.")

        let nothing1Playing = new Discord.MessageEmbed()
        .setAuthor("Hold on a second..")
        .setColor("RANDOM")
        .setDescription("No worries! Music is already paused.")

        let nothing2Playing = new Discord.MessageEmbed()
        .setAuthor("Music pausing")
        .setColor("RANDOM")
        .setDescription("I have now paused the music!")

        let lmaoEmbed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setDescription("You cannot use this command.")

        let mustinVCEmbed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setDescription("You need to be in a voice channel to pause music.")

        let musicandcommandChannelOnly = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setDescription("Use this in a music channel")

        if (!message.channel.name.includes("music") &&  !message.member.hasPermission("MANAGE_MESSAGES")) return message.reply(musicandcommandChannelOnly).then(msg => msg.delete({ timeout: 3500 }));
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply(lmaoEmbed).then(msg => msg.delete({timeout: 3000}))
        if (!message.member.voice.channel) return message.channel.send(mustinVCEmbed)
        if (!serverQueue) return message.channel.send(nothingPlaying)
        if (!serverQueue.playing) return message.channel.send(nothing1Playing)
        serverQueue.playing = false
        serverQueue.connection.dispatcher.pause()
        message.channel.send(nothing2Playing)
        return undefined
    } else if (message.content.startsWith(`${PREFIX}resume` && `${PREFIX}res`)) {
        let resumeEmbed = new Discord.MessageEmbed()
        .setAuthor("Oops!")
        .setColor("RANDOM")
        .setDescription("There is nothing playing right now.")

        let resume1Embed = new Discord.MessageEmbed()
        .setAuthor("Oops!")
        .setColor("RANDOM")
        .setDescription("No worries. There is already music playing.")

        let resume2Embed = new Discord.MessageEmbed()
        .setAuthor("Continuing")
        .setColor("RANDOM")
        .setDescription("I have now continued the music!")

        let lmaoEmbed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setDescription("You cannot use this command.")

        let mustinVCEmbed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setDescription("You need to be in a voice channel in order to continue playing music.")

        let musicandcommandChannelOnly = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setDescription("Use this in a music channel")

        if (!message.channel.name.includes("music") &&  !message.member.hasPermission("MANAGE_MESSAGES")) return message.reply(musicandcommandChannelOnly).then(msg => msg.delete({ timeout: 3500 }));
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply(lmaoEmbed).then(msg => msg.delete({timeout: 3000}))
        if (!message.member.voice.channel) return message.channel.send(mustinVCEmbed)
        if (!serverQueue) return message.channel.send(resumeEmbed)
        if (!serverQueue) return message.channel.send(resume1Embed)
        serverQueue.playing = true
        serverQueue.connection.dispatcher.resume()
        message.channel.send(resume2Embed)
        return undefined
    }
})

function play(guild, song) {
    const serverQueue = queue.get(guild.id)

    if (!song) {
        serverQueue.voiceChannel.leave()
        queue.delete(guild.id)
        return
    }

    const dispatcher = serverQueue.connection.play(ytdl(song.url))
        .on('finish', () => {
            serverQueue.songs.shift()
            play(guild, serverQueue.songs[0])
        })
        .on('error', error => {
            console.log(error)
        })
    dispatcher.setVolumeLogarithmic(serverQueue.volume / 5)

   // let user = message.mentions.users.first()

 let musicEmbed = new Discord.MessageEmbed()
.setAuthor("Now playing")
.setColor("RANDOM")
.setDescription(`**Song:** ${song.title}`)
// .addField("\u200b", new Date(seek * 1000).toISOString().substr(11, 8) + "[" + createBar((song.duration == 0 ? seek : song.duration), seek, 20)[0] + "]" + (song.duration == 0 ? " ◉ LIVE" : new Date(song.duration * 1000).toISOString().substr(11, 8)), false)
.setFooter("BACON ARMY", 'https://images-ext-2.discordapp.net/external/FfL7byb_1oHsRW6nyMdwJQtXSgT_WVrcE628njGajeA/https/images-ext-1.discordapp.net/external/LU_tw2kbztGL6ecb7u2MwHCSeRyfTkJ-rB256P2dBkM/https/media.discordapp.net/attachments/598954537415475260/728706543368798248/latest.png')

    serverQueue.textChannel.send(musicEmbed)
}})


client.login(token)