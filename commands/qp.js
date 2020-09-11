const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {

        if(!message.member.hasPermission("MANAGE_ROLES")) return message.reply("You cannot use this command.").then(msg => msg.delete({timeout: 3000}))
        message.delete()
 
        let exampleEmbed = new Discord.MessageEmbed()
        .setTitle("Command: >q+p")
        .setColor("RANDOM")
        .setDescription("**Descripion:** Create a qotd and potd for a channel.\n**Usage:** `>q+p [#channel name] [qotd content], [potd content]`\n**Example:**\n>q+p #qotd-and-polls How was your day today?, Dogs or Cats?\n:dog2: = Dogs\n:cat: = Cats")

        if(!args[0]) return message.reply(exampleEmbed)

        let qotdChannel = message.mentions.channels.first();
        let qotdDescription = args.slice(1).join(' ').split('| ')[0];
        let potdContent = args.slice(1).join(' ').split('| ')[1];
        

        let embedPoll = new Discord.MessageEmbed()
        .setAuthor('QOTD/POTD', message.author.avatarURL())
        .setDescription("**QOTD:** " + qotdDescription + `\n\n**POTD:** ` + potdContent)
        .setColor(Math.floor(Math.random() * 16777214) + 1)
        .setFooter('BACON ARMY', 'https://images-ext-1.discordapp.net/external/LU_tw2kbztGL6ecb7u2MwHCSeRyfTkJ-rB256P2dBkM/https/media.discordapp.net/attachments/598954537415475260/728706543368798248/latest.png')
        .setTimestamp()        
        .addField('Made by:', message.author)

        qotdChannel.send("@here", embedPoll).then(msg => {
            const eachLine = potdContent.split('\n');
            
            for(const line of eachLine){
                
                if(line.includes('=')){
                    
                    let emojis = line.split('=')[0].trim();
                    msg.react(emojis);
                    
                };
                
            };
        });
    }

    module.exports.help = {
        name: "q+p",
        aliases: [],
        category: "commands"
    }