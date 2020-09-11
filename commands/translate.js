// Muhimur was here give me credits btw and give me free robux

const Discord = require("discord.js");
const translate = require('@vitalets/google-translate-api');

module.exports.run = async (client, message, args) => {
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return;

        const msg = await message.channel.send("Translating...")
        if (!args[1]) return message.channel.send("You have to specify what you want to translate")
        translate(args.slice(1).join(" "), { to: args[0] }).then(translation => { 
            const translateEmbed = new Discord.MessageEmbed()
                .setColor("GREEN")
                .addField("Input", `\`\`\`${args.slice(1).join(" ")}\`\`\``)
                .addField("Output", `\`\`\`${translation.text}\`\`\``);
            msg.edit("", { embed: translateEmbed })
        }).catch(e => { 
            console.log(e);
            msg.edit("Unsupported language")
        })
    }
    
    module.exports.help = {
        name: "translate",
        aliases: [],
        category: "translateOnly" 
        
    }