const Discord = require('discord.js');
const util = require('util');

module.exports.run = async (client, message, args) => {
    if(!["383059277759381504", "373893905243963394", "323982743908384768", "176121339499773953"].some(uID => uID == message.author.id)) return;

    let code = args.join(" ")
    if(!code) return message.reply("provide some code to run.");

    let output; 

    try {
        output = await eval(code);
    } catch(err) {
        return message.channel.send(`\`\`\`${err}\`\`\``);
    };

    if (typeof output != "string") output = util.inspect(output);

    message.channel.send(`\`\`\`${output}\`\`\``);
}

module.exports.help = {
    name: "eval",
    aliases: [],
    category: "ownerOnly"
}