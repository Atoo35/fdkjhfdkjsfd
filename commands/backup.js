const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
    if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply("you cannot use this command.").then(message => message.delete({timeout: 3000}))
    
    // if(!args[0]) return message.reply("Please specify if you would like to turn backup moderation on or off.")
    if(!args[0] || args[0].toLowerCase() == "enable") return message.reply("**Backup moderation has been enabled.**")
    
    if(!args[0] || args[0].toLowerCase() == "disable") return message.reply("**Backup moderation has been disabled.**")
   }

module.exports.help = {
    name: "backup",
    aliases: [],
    category: "backupModeration"
}