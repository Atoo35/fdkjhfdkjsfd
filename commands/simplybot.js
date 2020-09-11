const Discord = require("discord.js");

module.exports.run = async (client, message, args, prefix) => {
    if (!message.member.hasPermission("MANAGE_ROLES")) return message.reply("you cannot use this command.").then(message => message.delete({timeout: 3000}))
    message.channel.send("<@!421818401975959563> bot.")
   }

module.exports.help = {
    name: "bot",
    aliases: [],
    category: "lols"
}