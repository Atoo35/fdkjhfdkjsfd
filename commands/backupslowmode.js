const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    if(!message.member.hasPermission("ADMINISTRATOR") && message.author.id !== "373893905243963394") return;
    let slowmodeTime = message.content.split(" ").slice(1).join(" ")
    if(!slowmodeTime) return;

    let slowmodeEmbed = new Discord.MessageEmbed()
    .setAuthor(`Slowmode`, message.author.avatarURL())
    .setColor("RANDOM")
    .setDescription(`Set the slowmode to ${slowmodeTime}.`)

    message.channel.setRateLimitPerUser(slowmodeTime)
    message.channel.send(slowmodeEmbed)
    
}

module.exports.help = {
    name: "slowmode",
    aliases: ["sm"],
    category: "adminOnly"
}