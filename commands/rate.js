const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {

        if (!message.member.hasPermission("ATTACH_FILES")) return message.reply("you cannot use this command.").then(message => message.delete({timeout: 3000}))
        let number = Math.floor(Math.random() * 101);
        if (!args[0]) {
            return message.reply("I rate you a **" + number + "/100.**")
        } else {
            let user = message.mentions.users.first();
            if (!user) {
                return message.reply("you need to include who you're tryna rate you ding dong.")
            }
            return message.reply("I rate " + user.username + " a **" + number + "/100.**")
        }
    }


module.exports.help = {
    name: "rate",
    aliases: [],
    category: "fun3",
}