const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {
    
        if(!message.member.hasPermission("MANAGE_ROLES")) return message.reply("You cannot use this command.").then(msg => msg.delete({timeout: 3000}))
        message.delete()

        let exampleEmbed = new Discord.MessageEmbed()
        .setTitle("Command: >poll")
        .setColor("RANDOM")
        .setDescription("**Descripion:** Create a poll for a channel.\n**Usage:** `>poll [#channel name] [content]`\n**Example:**\n>poll #qotd-and-polls Would you like this feature added?")
       
        if (!args[0]) return message.reply(exampleEmbed)

        let pollChannel = message.mentions.channels.first();
        let pollDescription = args.slice(1).join(' ');
        

        let embedPoll = new Discord.MessageEmbed()
            .setAuthor('BACON ARMY Poll', message.author.avatarURL())
            .setTitle('Poll:')
            .setDescription(pollDescription)
            .setColor(Math.floor(Math.random() * 16777214) + 1)
            .setFooter('BACON ARMY', 'https://images-ext-1.discordapp.net/external/LU_tw2kbztGL6ecb7u2MwHCSeRyfTkJ-rB256P2dBkM/https/media.discordapp.net/attachments/598954537415475260/728706543368798248/latest.png')
            .setTimestamp()
            .addField('Poll made by:', message.author);

        pollChannel.send("@here", embedPoll).then(async msg => {
            await msg.react('👍').then(msg.react('👎'));
        });
    };

module.exports.help = {
    name: "poll",
    aliases: [],
    category: "commands"
}