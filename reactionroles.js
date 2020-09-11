const Discord = require("discord.js");
const client = new Discord.Client({partials: ["MESSAGE", "REACTION"]})
const { token } = require("./config.json")
// const PREFIX = ">"

client.on("ready", () => console.log("Active."))

client.on("message", async message => {

    let reactionEmbed = new Discord.MessageEmbed()
    .setTitle("Reaction role")
    .setColor("RED")
    .setTimestamp()
    .setDescription("If you don't want any QOTD and POTD pings, please react with the emoji below.")
    if(!message.member.hasPermission("ADMINISTRATOR")) return;
    if (message.content.startsWith("!reactionrole")) {
        const msg = await message.channel.send(reactionEmbed)
        msg.react("🔴")
        message.delete()
    }
})

client.on("messageReactionAdd", async (reaction, user) => {
    if (reaction.message.partial) await reaction.message.fetch()
    if (reaction.partial) await reaction.fetch()
    if (user.bot) return

    if (reaction.message.channel.id === "737039252382154864") {
        if (reaction.emoji.name === "🔴") await reaction.message.guild.members.cache.get(user.id).roles.add("728803692467322922")
    }
})

client.on("messageReactionRemove", async (reaction, user) => {
    if (reaction.message.partial) await reaction.message.fetch()
    if (reaction.partial) await reaction.fetch()
    if (user.bot) return

    if (reaction.message.channel.id === "737039252382154864") {
        if (reaction.emoji.name === "🔴") await reaction.message.guild.members.cache.get(user.id).roles.remove("728803692467322922")
    }
})

client.login(token)