const { Discord, version, MessageEmbed } = require("discord.js");

module.exports.run = async (client, message, args) => {



        let totalSeconds = (client.uptime / 1000);
        let days = Math.floor(totalSeconds / 86400);
        let hours = Math.floor(totalSeconds / 3600);
        totalSeconds %= 3600;
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = Math.round(totalSeconds % 60);
        let uptime = `${days} days, ${hours} hours, ${minutes} minutes, and ${seconds} seconds`;
        let inline = true
        let botembed = new MessageEmbed()

        .setTitle('Bot Information')
        .setAuthor(client.user.username, client.user.displayAvatarURL())
        .setColor('GREEN')
        .setTimestamp()
        .setThumbnail(client.user.displayAvatarURL())
        .setDescription('This bot is dedicated to the BACON ARMY Discord Server. This is also a private custom bot dedicated to this server only. This bot is used for stuff like events, qotds, polls, giveaways, music and more, so basically a utilities bot. If you find any issues or bugs, please contact one of us.')
        .addField("Bot Name:", `${client.user.username}`, inline)
        .addField("Bot Library:", `discord.js ${version}`, inline)
        .addField("Prefix:", ">", inline)
        .addField("Bot Team", "**Bot Developer: **Muhimur\n**Co-Developers: **DaStormer, TotallyNotNero, Prosome\n**Project Advisors:** Mark, Canadixn", inline)
        .addField("Created on:", client.user.createdAt)
        .addField("Last restart:", uptime)
        .setFooter(`BACON ARMY`, 'https://images-ext-2.discordapp.net/external/FfL7byb_1oHsRW6nyMdwJQtXSgT_WVrcE628njGajeA/https/images-ext-1.discordapp.net/external/LU_tw2kbztGL6ecb7u2MwHCSeRyfTkJ-rB256P2dBkM/https/media.discordapp.net/attachments/598954537415475260/728706543368798248/latest.png')
        message.channel.send(botembed);
}


    module.exports.help = {
        name: "botinfo",
        aliases: [],
        category: "general"
    }
