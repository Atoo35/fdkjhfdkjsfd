const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {

        if(!message.member.hasPermission("MANAGE_ROLES")) return;
        message.delete()

        let exampleEmbed = new Discord.MessageEmbed()
        .setTitle("Command: >qotd")
            .setColor("RANDOM")
            .setDescription("**Description:** Create a QOTD for a channel.\n**Usage:** `>qotd [#channel name] [qotd content]`\n**Example:**\n>qotd #qotd-and-polls What is your favorite memory from school? Answer in #qotd-answers.")

        if (!args[0]) return message.reply(exampleEmbed)

        let qotdChannel = message.mentions.channels.first();
        let qotdDescription = args.slice(1).join(' ')
        

        let embedPoll = new Discord.MessageEmbed()
        .setAuthor('QOTD:', message.author.avatarURL())
        .setDescription(qotdDescription)
        .setColor(Math.floor(Math.random() * 16777214) + 1)
        .setFooter('BACON ARMY', 'https://images-ext-1.discordapp.net/external/LU_tw2kbztGL6ecb7u2MwHCSeRyfTkJ-rB256P2dBkM/https/media.discordapp.net/attachments/598954537415475260/728706543368798248/latest.png')
        .setTimestamp()        
        .addField('Made by:', message.author)

        qotdChannel.send("@here", embedPoll)
    
    }


module.exports.help = {
    name: "qotd",
    aliases: [],
    category: "commands"
}