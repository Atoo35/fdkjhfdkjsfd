const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    if(!message.member.hasPermission("ADMINISTRATOR") && !["383059277759381504", "373893905243963394", "323982743908384768"].some(uID => uID == message.author.id)) return message.reply("Admins and Devs only.").then(msg => msg.delete({timeout: 3000}))

    let purgeEmbed = new Discord.MessageEmbed()
    .setTitle("Command: >purge")
    .setColor("RANDOM")
    .setDescription("**Description:** Purges messages. Minimum: `2` | Maximum: `10`.\n**Usage:** `>purge [# of messages]`\n**Example:** >purge 5\n**Note:** *For admins and bot devs only.*")

    const deleteCount = parseInt(args[0], 10);
    if (!deleteCount || deleteCount < 2 || deleteCount > 20) return message.reply(purgeEmbed)

    message.channel.bulkDelete(deleteCount).catch(error => message.reply(`I was unable to delete those messages because of ${error}`));
}

module.exports.help = {
    name: "purge",
    aliases: [],
    category: "adminOnly"
}