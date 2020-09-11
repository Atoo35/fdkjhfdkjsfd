const Discord = require('discord.js');
const fortuneCookies = require('../fortune-cookie.json');

module.exports.run = async (client, message, args) => {

    if(!message.member.hasPermission("ATTACH_FILES")) return message.reply("you cannot use this command.").then(msg => msg.delete({timeout: 3000}))
    let results = fortuneCookies
    let result = Math.floor((Math.random() * results.length));
    const embed = new Discord.MessageEmbed()
    .setAuthor(`Fortune Cookie`, message.author.avatarURL())
    .setColor("RANDOM")
    .setThumbnail("https://cdn.discordapp.com/attachments/598954537415475260/749022415241216010/game-fortune-cookie-1.png")
    .addField(`What your fortune says:`, results[result])
    message.channel.send(embed)
}

module.exports.help = {
    name: "fortune",
    aliases: [],
    category: "misc"
}