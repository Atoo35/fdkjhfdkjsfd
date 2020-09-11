// Made by Muhimur on 09/04/2020.

const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return;
    message.delete();

    let specifyEmbed = new Discord.MessageEmbed()
    .setTitle("Oops!")
    .setColor("RED")
    .setDescription("Please specify a rule number.")

    let rule1Embed = new Discord.MessageEmbed()
    .setTitle("Rule 1")
    .setColor("#FFCC00")
    .setDescription("Please use common sense and have self-control. This includes attention-seeking.")
    .setTimestamp()

    let rule2Embed = new Discord.MessageEmbed()
    .setTitle("Rule 2")
    .setColor("#FFCC00")
    .setDescription("All members are to be treated with respect. Offensive comments or harassment towards any member will not be tolerated.")
    .setTimestamp()

    let rule3Embed = new Discord.MessageEmbed()
    .setTitle("Rule 3")
    .setColor("#FFCC00")
    .setDescription("Spamming is not allowed in any channel. This includes messages, pictures, emojis, long chains, mass mentions, fake copy-pastes, etc.")
    .setTimestamp()

    let rule4Embed = new Discord.MessageEmbed()
    .setTitle("Rule 4")
    .setColor("#FFCC00")
    .setDescription("Use of profane language is prohibited. Do not attempt to bypass the filter.")
    .setTimestamp()

    let rule5Embed = new Discord.MessageEmbed()
    .setTitle("Rule 5")
    .setColor("#FFCC00")
    .setDescription("Any NSFW/gore content is forbidden.")
    .setTimestamp()

    let rule6Embed = new Discord.MessageEmbed()
    .setTitle("Rule 6")
    .setColor("#FFCC00")
    .setDescription("Discrimination against race, gender, color, religion, one's sexuality, etc. will not be tolerated. This includes referring to the Jewelry Store as \"Jew\" or \"Jew Store\".")
    .setTimestamp()

    let rule7Embed = new Discord.MessageEmbed()
    .setTitle("Rule 7")
    .setColor("#FFCC00")
    .setDescription("Unsolicited advertisements and self-promotion, such as a Discord server or any social media, are not allowed. This includes sending scams in member's DM's.")
    .setTimestamp()
     
    let rule8Embed = new Discord.MessageEmbed()
    .setTitle("Rule 8")
    .setColor("#FFCC00")
    .setDescription("Do not ask for or reveal a member's personal information publicly.")
    .setTimestamp()

    let rule9Embed = new Discord.MessageEmbed()
    .setTitle("Rule 9") 
    .setColor("#FFCC00")
    .setDescription("Channels should be used only for their designated purposes.")
    .setTimestamp()

    let rule10Embed = new Discord.MessageEmbed()
    .setTitle("Rule 10")
    .setColor("#FFCC00")
    .setDescription("Alternate accounts in this server are not permitted.")
    .setTimestamp()

    let rule11Embed = new Discord.MessageEmbed()
    .setTitle("Rule 11") 
    .setColor("#FFCC00")
    .setDescription("Do not repost images/videos more than 3 times a day.")
    .setTimestamp()

    let rule12Embed = new Discord.MessageEmbed()
    .setTitle("Rule 12")
    .setColor("#FFCC00")
    .setDescription("Custom statuses may not be NSFW or contain derogatory content.")
    .setTimestamp()

    let rule13Embed = new Discord.MessageEmbed()
    .setTitle("Rule 13")
    .setColor("#FFCC00")
    .setDescription("Uploading any executable file, such as .exe, .jar, .bat, etc. is not allowed. This includes distributing viruses, IP loggers, or any link/file intended to harm, access, steal information from, or otherwise tamper with people's devices will not be tolerated.")
    .setTimestamp()

    let rule14Embed = new Discord.MessageEmbed()
    .setTitle("Rule 14")
    .setColor("#FFCC00")
    .setDescription("Please use only English unless you are allowed to speak in another language by an online staff member.")
    .setTimestamp()

    let rule15Embed = new Discord.MessageEmbed()
    .setTitle("Rule 15")
    .setColor("#FFCC00")
    .setDescription("Although you may ping a Moderator for rule violations, for less severe situations, use \`?report @user/user ID reason\`.")
    .setTimestamp()

    let rule16Embed = new Discord.MessageEmbed()
    .setTitle("Rule 16")
    .setColor("#FFCC00")
    .setDescription("Any pinned messages containing guidelines in any channel are considered as subrules.")
    .setTimestamp()

    let rule17Embed = new Discord.MessageEmbed()
    .setTitle("Rule 17")
    .setColor("#FFCC00")
    .setDescription("Staff members hold final authority in all moderation cases. Failure to comply may result in removal from the server. If you think something is unfair, take it to MyUsernamesThis or an Administrator.")
    .setTimestamp()

    if(!args[0]) return message.reply(specifyEmbed).then(msg => msg.delete({timeout: 3000}));
    let user = message.mentions.users.first();

    if(!args[0] || args[0].toLowerCase() == "1" && (!user)) return message.channel.send(rule1Embed)
    if(!args[0] || args[0].toLowerCase() == "1" && (user)) return message.channel.send(user, rule1Embed)

    if(!args[0] || args[0].toLowerCase() == "2" && (!user)) return message.channel.send(rule2Embed)
    if(!args[0] || args[0].toLowerCase() == "2" && (user)) return message.channel.send(user, rule2Embed)

    if(!args[0] || args[0].toLowerCase() == "3" && (!user)) return message.channel.send(rule3Embed)
    if(!args[0] || args[0].toLowerCase() == "3" && (user)) return message.channel.send(user, rule3Embed)

    if(!args[0] || args[0].toLowerCase() == "4" && (!user)) return message.channel.send(rule4Embed)
    if(!args[0] || args[0].toLowerCase() == "4" && (user)) return message.channel.send(user, rule4Embed)

    if(!args[0] || args[0].toLowerCase() == "5" && (!user)) return message.channel.send(rule5Embed)
    if(!args[0] || args[0].toLowerCase() == "5" && (user)) return message.channel.send(user, rule5Embed)
    
    if(!args[0] || args[0].toLowerCase() == "6" && (!user)) return message.channel.send(rule6Embed)
    if(!args[0] || args[0].toLowerCase() == "6" && (user)) return message.channel.send(user, rule6Embed)
    
    if(!args[0] || args[0].toLowerCase() == "7" && (!user)) return message.channel.send(rule7Embed)
    if(!args[0] || args[0].toLowerCase() == "7" && (user)) return message.channel.send(user, rule7Embed)
    
    if(!args[0] || args[0].toLowerCase() == "8" && (!user)) return message.channel.send(rule8Embed)
    if(!args[0] || args[0].toLowerCase() == "8" && (user)) return message.channel.send(user, rule8Embed)
    
    if(!args[0] || args[0].toLowerCase() == "9" && (!user)) return message.channel.send(rule9Embed)
    if(!args[0] || args[0].toLowerCase() == "9" && (user)) return message.channel.send(user, rule9Embed)
    
    if(!args[0] || args[0].toLowerCase() == "10" && (!user)) return message.channel.send(rule10Embed)
    if(!args[0] || args[0].toLowerCase() == "10" && (user)) return message.channel.send(user, rule10Embed)
    
    if(!args[0] || args[0].toLowerCase() == "11" && (!user)) return message.channel.send(rule11Embed)
    if(!args[0] || args[0].toLowerCase() == "11" && (user)) return message.channel.send(user, rule11Embed)
    
    if(!args[0] || args[0].toLowerCase() == "12" && (!user)) return message.channel.send(rule12Embed)
    if(!args[0] || args[0].toLowerCase() == "12" && (user)) return message.channel.send(user, rule12Embed)
    
    if(!args[0] || args[0].toLowerCase() == "13" && (!user)) return message.channel.send(rule13Embed)
    if(!args[0] || args[0].toLowerCase() == "13" && (user)) return message.channel.send(user, rule13Embed)
    
    if(!args[0] || args[0].toLowerCase() == "14" && (!user)) return message.channel.send(rule14Embed)
    if(!args[0] || args[0].toLowerCase() == "14" && (user)) return message.channel.send(user, rule14Embed)
    
    if(!args[0] || args[0].toLowerCase() == "15" && (!user)) return message.channel.send(rule15Embed)
    if(!args[0] || args[0].toLowerCase() == "15" && (user)) return message.channel.send(user, rule15Embed)
    
    if(!args[0] || args[0].toLowerCase() == "16" && (!user)) return message.channel.send(rule16Embed)
    if(!args[0] || args[0].toLowerCase() == "16" && (user)) return message.channel.send(user, rule16Embed)
    
    if(!args[0] || args[0].toLowerCase() == "17" && (!user)) return message.channel.send(rule17Embed)
    if(!args[0] || args[0].toLowerCase() == "17" && (user)) return message.channel.send(user, rule17Embed)
}

module.exports.help = {
    name: "rule",
    aliases: [],
    category: "staffOnly"
}