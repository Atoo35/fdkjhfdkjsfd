const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {

        if(!message.member.hasPermission("MANAGE_ROLES")) return;
        message.delete()

        let exampleEmbed = new Discord.MessageEmbed()
        .setTitle("Command: >event")
        .setColor("RANDOM")
        .setDescription("**Description:** Command to create/host an event.\n**Usage:** `>event [#channel name] [event] [details]`\n**Example:**\n>event #event-announcements Playing Arsenal right now!, please join through the following link: [insert link here]")

        if(!args[0]) return message.reply(exampleEmbed)


        let eventChannel = message.mentions.channels.first();
        let eventDescription = args.slice(1).join(' ').split('| ')[0];
        let eventLink = args.slice(1).join(' ').split('| ')[1];

        let eventOnGoing = new Discord.MessageEmbed()
        .setAuthor('BACON ARMY Event', message.author.avatarURL())
        .setColor('#0dbc32')
        .setFooter('BACON ARMY', 'https://images-ext-1.discordapp.net/external/LU_tw2kbztGL6ecb7u2MwHCSeRyfTkJ-rB256P2dBkM/https/media.discordapp.net/attachments/598954537415475260/728706543368798248/latest.png')
        .setTimestamp()  
        .setDescription("**Current Event:** " + eventDescription + `\n\n**How to Participate:** ` + eventLink)    
        .addField('**Hosted by:**', message.author) 
        
        let msgEmbed = (eventOnGoing);
        return eventChannel.send("<@&736784289718337598>", eventOnGoing);
        
    }

    module.exports.help = {
        name: "event",
        aliases: [],
        category: "commands"
    }
