const Discord = require('discord.js');
const adviceList = require('../advice-list.json');

module.exports.run = async (client, message, args) => {

    if(!message.member.hasPermission("ATTACH_FILES")) return message.reply("you cannot use this command.").then(msg => msg.delete({timeout: 3000}))
    let results = adviceList
    let result = Math.floor((Math.random() * results.length));
    const embed = new Discord.MessageEmbed()
    .setAuthor(`Advice...`, message.author.avatarURL())
    .setColor("RANDOM")
    .setThumbnail("https://media.discordapp.net/attachments/737039252382154864/749851360832389211/qgJb7mj_.png")
    .addField(`Advice to you:`, results[result])
    message.channel.send(embed)
}

module.exports.help = {
    name: "advice",
    aliases: [],
    category: "misc"
}