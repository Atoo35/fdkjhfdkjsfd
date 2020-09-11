const Discord = require("discord.js");

module.exports.run = async (client, message, args, prefix) => {
   
    message.reply('Calculating Ping...').then((resultMessage) => {
       const ping = resultMessage.createdTimestamp - message.createdTimestamp
       resultMessage.edit(`:ping_pong: Pong!\n**Bot Latency:** \`${ping}ms\` | **API Latency:** \`${client.ws.ping}ms\``)
   })
}

module.exports.help = {
    name: "ping",
    aliases: [],
    category: "pings"
}