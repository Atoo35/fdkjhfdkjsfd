const Discord = require("discord.js");
const randomPuppy = require("random-puppy");

   module.exports.run = async (client, message, args) => {
    if(!message.member.hasPermission("CHANGE_NICKNAME")) return;
        const subReddits = ["dogs"];
        const random = subReddits[Math.floor(Math.random() * subReddits.length)]

        const img = await randomPuppy(random);
        const embed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setImage(img)
        .setTitle(`From /r/${random}`)
        .setURL(`https://reddit.com/r/${random}`)

        message.channel.send(embed)
    }

    module.exports.help = {
        name: "dog",
        aliases: [],
        category: "fun"
    }