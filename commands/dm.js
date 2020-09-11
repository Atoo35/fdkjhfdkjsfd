const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
    if(!message.member.hasPermission("MANAGE_ROLES") && message.author.id !== "373893905243963394") return;
    message.delete()
    let user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if(!user) return message.reply("you gave an invalid user/user ID.")
    if(!args.slice(1).join(" ")) return message.reply("specify your message.")
    user.user.send(args.slice(1).join(" "))
    message.reply("DM sent!").then(message => message.delete({timeout: 2000}))
    try {
}catch(e){
    message.reply("I was unable to DM this user.")
}
}

module.exports.help = {
    name: "dm",
    aliases: [],
    category: "dms"
}
