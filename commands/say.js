const Discord = require('discord.js');
 

module.exports.run = async (client, message, args) => {
if(!message.member.hasPermission("ADMINISTRATOR") && message.author.id !== "373893905243963394") return;
 let msg;
 let textChannel = message.mentions.channels.first()
 message.delete()
 
 if(textChannel) {
     msg = args.slice(1).join(" ");
     textChannel.send(msg)
 } else {
     msg = args.join(" ");
     message.channel.send(msg)
 }
}

module.exports.help = {
    name: "say",
    aliases: [],
    category: "adminOnly2"
}