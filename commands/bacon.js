const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {

        if (!message.member.hasPermission("ATTACH_FILES")) return message.reply("you cannot use this command.").then(message => message.delete({timeout: 3000}))
        let number = Math.floor(Math.random() * 101);
        if (!args[0]) {
            return message.reply("I have gifted you **" + number + " bacon hairs!** :bacon::bacon:")
        } else {
            let user = message.mentions.users.first();
            if (!user) {
                return message.reply("you need to include who you wanna give bacon to you ding dong.")
            }
            return message.reply("I have gifted " + user.username + " **" +  number + " bacon hairs!** :bacon::bacon:")
        }
    }


module.exports.help = {
    name: "bacon",
    aliases: [],
    category: "misc"
}