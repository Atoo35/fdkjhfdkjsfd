const Discord = require("discord.js");
const ms = require("ms");

module.exports.run = async (bot, message, args) => {

    if(!message.member.hasPermission("MANAGE_ROLES")) return;
    
    let helpEmbed = new Discord.MessageEmbed()
    .setTitle("Command: >greroll")
    .setColor("#821adb")
    .setDescription(`**Description:** Reroll a giveaway for a new winner.\n**Usage:** \`>greroll [giveaway msg ID]\``);

    if(!args[0] || args[0].toLowerCase() == "help") return message.reply(helpEmbed);

    let errorEmbed = new Discord.MessageEmbed()
    .setColor("#6b0202")
    .setDescription(`:warning: No giveaway found with ID: "${args[0]}"`);

    let thegiveaway = bot.giveawaysManager.giveaways.find((g) => g.messageID === args[0]);
    if(!thegiveaway) return message.reply(errorEmbed);

    let error2Embed = new Discord.MessageEmbed()
    .setColor("#6b0202")
    .setDescription(`:warning: This giveaway has not ended yet!`);

    let error3Embed = new Discord.MessageEmbed()
    .setColor("#6b0202")
    .setDescription(`:warning: An error has occurred, unable to reroll giveaway.`);

    bot.giveawaysManager.reroll(args[0], {
        messages: {
            congrat: `:tada: **Congratulations, {winners}!** You won the giveaway reroll for: **${thegiveaway.prize}**\n:arrow_right: DM ${thegiveaway.hostedBy} to claim!`
        }
    }).then(() => {
        message.delete();
        message.reply(":warning:").then(msg => msg.delete({timeout: 2500}));
    }).catch((err) => {
        if(err.startsWith(`Giveaway with message ID ${thegiveaway.messageID} is not ended.`)){
            return message.reply(error2Embed);
        }else{
            return message.reply(error3Embed);
        }
    });

}

module.exports.help = {
    name: "greroll",
    aliases: [],
    category: "staff"
}