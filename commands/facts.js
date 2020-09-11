const Discord = require('discord.js');
const factsList = require('../facts.json');

module.exports.run = async (client, message, args) => {

    if(!message.member.hasPermission("CHANGE_NICKNAME")) return message.reply("you cannot use this command.").then(msg => msg.delete({timeout: 3000}))
    let results = factsList
    let result = Math.floor((Math.random() * results.length));
    const embed = new Discord.MessageEmbed()
    .setAuthor(`Fun Fact`, message.author.avatarURL())
    .setColor("RANDOM")
    .setThumbnail("https://cdn.discordapp.com/attachments/598954537415475260/752086537562357890/appicon-512.png")
    .addField(`Random fact:`, results[result])
    message.channel.send(embed)
}

module.exports.help = {
    name: "facts",
    aliases: [],
    category: "misc"
}