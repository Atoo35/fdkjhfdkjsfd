const Discord = require("discord.js");
const dadjokeResults = require("../dadjokes.json")

module.exports.run = async (client, message, args) => {
    if(!message.member.hasPermission("ATTACH_FILES")) return;
    let results = dadjokeResults
    let result = Math.floor((Math.random() * results.length));

    const dadjokeEmbed = new Discord.MessageEmbed()
    .setAuthor("Dad joke?", message.author.avatarURL())
    .setColor("RANDOM")
    .addField("Dad joke:", results[result])

    message.channel.send(dadjokeEmbed)

}

module.exports.help = {
    name: "dadjoke",
    aliases: [],
    category: "misc"
}