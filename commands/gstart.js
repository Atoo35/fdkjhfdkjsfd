const Discord = require("discord.js");
const ms = require("ms");

module.exports.run = async (bot, message, args) => {

    if(!message.member.hasPermission("MANAGE_ROLES")) return;

    let helpEmbed = new Discord.MessageEmbed()
    .setTitle("Command: >gstart")
    .setColor("#821adb")
    .setDescription(`**Description:** Start a giveaway.\n**Usage:** \`>gstart [#channel] [host] [duration] [# of winners] [prize]\`\n**Example:**\n>gstart #giveaways @DaStormer 2d 1 Nitro Classic`);

    if(!args[0] || args[0].toLowerCase() == "help") return message.reply(helpEmbed);

    let errorEmbed = new Discord.MessageEmbed()
    .setColor("#6b0202")
    .setDescription(`:warning: Invalid Channel: "${args[0]}"`);

    if(!message.mentions.channels.first() || args[0] !== `<#${message.mentions.channels.first().id}>`) return message.reply(errorEmbed);

    let error1Embed = new Discord.MessageEmbed()
    .setColor("#6b0202")
    .setDescription(`:warning: Member Not Found: ${args[1]}`);

    let gHost = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[1]));

    if(!gHost) return message.reply(error1Embed);

    let error2Embed = new Discord.MessageEmbed()
    .setColor("#6b0202")
    .setDescription(`:warning: Mention duration, amount of winners, and prize!`);

    if(!args[2]) return message.reply(error2Embed);

    let error3Embed = new Discord.MessageEmbed()
    .setColor("#6b0202")
    .setDescription(`:warning: Invalid Duration: "${args[2]}"\n**Duration Variables:** m = minutes | h = hours | d = days`);

    let dVariables = ["1m", "2m", "3m", "4m", "5m", "6m", "7m", "8m", "9m", "30m", "1h", "2h", "3h", "4h", "5h", "6h", "7h", "8h", "9h", "10h", "11h", "12h", "15h", "1d", "2d", "3d", "4d", "5d", "6d", "7d", "8d", "9d"];
    if(!dVariables.some(dV => args[2].endsWith(dV))) return message.reply(error3Embed);

    let error4Embed = new Discord.MessageEmbed()
    .setColor("#6b0202")
    .setDescription(`:warning: Mention amount of winners and prize!`);

    if(!args[3]) return message.reply(error4Embed);

    let error5Embed = new Discord.MessageEmbed()
    .setColor("#6b0202")
    .setDescription(`:warning: Invalid Amount of Winners: "${args[3]}"\nMust be a valid number!`);

    if(isNaN(args[3]) || (parseInt(args[3]) <= 0)) return message.reply(error5Embed);

    let giveawayPrize = args.slice(4).join(" ");

    let error6Embed = new Discord.MessageEmbed()
    .setColor("#6b0202")
    .setDescription(`:warning: Mention the giveaway prize!`);

    if(!giveawayPrize) return message.reply(error6Embed);

    await bot.giveawaysManager.start(message.mentions.channels.first(), {
        time: ms(args[2]),
        prize: giveawayPrize,
        winnerCount: parseInt(args[3]),
        hostedBy: gHost.user,
        messages: {
            giveaway: `🎉🎉 **GIVEAWAY** 🎉🎉`,
            giveawayEnded: `🎉🎉 **GIVEAWAY ENDED** 🎉🎉`,
            timeRemaining: "Time remaining: **{duration}**",
            inviteToParticipate: "React with 🎉 to participate!",
            winMessage: `🎉 **Congratulations, {winners}!** You won the giveaway for: **{prize}**\n:arrow_right: DM ${gHost} to claim!`,
            embedFooter: "Giveaways",
            noWinner: "Giveaway cancelled, no valid participations.",
            hostedBy: "Hosted by: {user}",
            winners: `winner(s)`,
            endedAt: `Ended at`,
            units: {
                seconds: "seconds",
                minutes: "minutes",
                hours: "hours",
                days: "days",
                pluralS: false
            }
        }
    });

    let successEmbed = new Discord.MessageEmbed()
    .setColor("#39fa53")
    .setDescription(`<:dynoSuccess:529787808060014642> Giveaway started in ${message.mentions.channels.first()}`);

    if(message.channel.id !== message.mentions.channels.first().id) message.channel.send(successEmbed);

}

module.exports.help = {
    name: "gstart",
    aliases: [],
    category: "staff"
}