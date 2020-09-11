const Discord = require('discord.js');
const fetch = require('node-fetch');

module.exports.run = async (client, message, args) => {
    if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply("You cannot use this command.").then(msg => msg.delete({timeout: 3000}))
    let countries = args.join(" ");

    const noArgs = new Discord.MessageEmbed()
    .setTitle("Missing arguments")
    .setColor("RANDOM")
    .setDescription("You are missing some arguments. (Example: `?covid Canada`)")
    .setTimestamp()

    if(!args[0]) return message.channel.send(noArgs);

    if(args[0] === "all"){
        fetch(`https://covid19.mathdro.id/api`)
        .then(response => response.json())
        .then(data => {
            let confirmed = data.confirmed.value.toLocaleString()
            let recovered = data.recovered.value.toLocaleString()
            let deaths = data.deaths.value.toLocaleString()


            const embed = new Discord.MessageEmbed()
            .setTitle(`Worldwide COVID-19 Stats`)
            .setColor("RANDOM")
            .setThumbnail("https://media.discordapp.net/attachments/239446877953720321/691020838379716698/unknown.png")
            .setTimestamp()
            .addField("Confirmed Cases:", confirmed)
            .addField("Recovered:", recovered)
            .addField("Deaths:", deaths)
            
            message.channel.send(embed)
        })
    } else {
        fetch(`https://covid19.mathdro.id/api/countries/${countries}`)
        .then(response => response.json())
        .then(data => {
            let confirmed = data.confirmed.value.toLocaleString()
            let recovered = data.recovered.value.toLocaleString()
            let deaths = data.deaths.value.toLocaleString()


            const embed = new Discord.MessageEmbed()
            .setTitle(`COVID-19 Stats for **${countries}**`)
            .setColor("RANDOM")
            .setThumbnail("https://media.discordapp.net/attachments/239446877953720321/691020838379716698/unknown.png")
            .setTimestamp()
            .addField("Confirmed Cases:", confirmed)
            .addField("Recovered:", recovered)
            .addField("Deaths:", deaths)
            
            message.channel.send(embed)
        }).catch(e => {
            return message.channel.send("You provided an invalid country. Please state a valid country.")
        })
    }
}

module.exports.help = {
    name: "covidoldcommand",
    aliases: [],
    category: "funny"
}