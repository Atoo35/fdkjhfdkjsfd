const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
    if(!message.member.hasPermission("ADMINISTRATOR") && message.author.id !== "373893905243963394") return;

    const memberamountInternal = message.guild.memberCount;
    message.channel.send(`A total of ${memberamountInternal} members in **${message.guild.name}**.`)
}

module.exports.help = {
    name: "membercount",
    aliases: [],
    category: "adminOnly"
}