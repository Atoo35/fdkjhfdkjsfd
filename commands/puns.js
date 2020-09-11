const Discord = require('discord.js');
const punList = require('../puns.json');

module.exports.run = async (client, message, args) => {

    if(!message.member.hasPermission("ATTACH_FILES")) return message.reply("you cannot use this command.").then(msg => msg.delete({timeout: 3000}))
    let results = punList
    let result = Math.floor((Math.random() * results.length));
    const embed = new Discord.MessageEmbed()
    .setAuthor(`Oh, a pun?`, message.author.avatarURL())
    .setColor("RANDOM")
    .setThumbnail("https://media.discordapp.net/attachments/598954537415475260/750078000925769998/Make-Funny-Sales-Videos-S-1280x995.png?width=864&height=672")
    .addField(`Pun:`, results[result])
    message.channel.send(embed)
}

module.exports.help = {
    name: "pun",
    aliases: [],
    category: "misc"
}