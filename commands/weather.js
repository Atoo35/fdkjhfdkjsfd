const Discord = require("discord.js");
const weather = require("weather-js");

module.exports.run = async (client, message, args) => {
    if(!message.member.hasPermission("CHANGE_NICKNAME")) return message.reply("you cannot use this command.").then(msg => msg.delete({timeout: 3000}))
   weather.find({search: args.join(" "), degreeType: "F"}, function (error, result) {
       // if(error) return message.channel.send(error);
       if(!args[0]) return message.reply("please specify an actual location.")

       if(result === undefined || result.length === 0) return message.channel.send("Invalid location. Define a location.");

       var current = result[0].current;
       var location = result[0].location;

       const weatherInfo = new Discord.MessageEmbed()
       // .setDescription(`Weather Type: ${current.skytext}`)
       .setAuthor(`Weather forecast for: ${current.observationpoint}`, message.author.avatarURL())
       .setThumbnail(current.imageUrl)
       .setColor("RANDOM")
       .setTimestamp()
       .addField("Weather Type:", `${current.skytext}`)
       .addField("Timezone:", `UTC${location.timezone}`, true)
       .addField("Degree Type:", "Farenheit", true)
       .addField("Temperature:", `${current.temperature}°`, true)
       .addField("Wind:", current.winddisplay, true)
       .addField("Feels like:", `${current.feelslike}°`, true)
       .addField("Humidity:", `${current.humidity}%`, true)

       message.channel.send(weatherInfo)
   }) 
}

module.exports.help = {
    name: "weather",
    aliases: [],
    category: "fun1"
} 