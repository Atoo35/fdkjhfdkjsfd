const Discord = require("discord.js");


module.exports.run = async (client, message, args) => {

    if (!message.channel.name.includes("commands")) return message.reply("use this in a commands channel.").then(msg => msg.delete({ timeout: 3500 }));

    let member = message.author

        const helpEmbed = new Discord.MessageEmbed()
            .setTitle("Command: >help")
            .setColor("RANDOM")
            .setDescription("**Description:** Commands for help.\n**Usage:** `>help [commands/systems]`\n**Example:**\n>help commands")

            const embed = new Discord.MessageEmbed()
            .setTitle('Commands:')
            .setColor('RANDOM')
            .addField(">ping", "Shows the bots response time and API Latency.")
            .addField(">q+p", "Lets you create qotd's and polls.")
            .addField(">qotd", "Lets you make a qotd.")
            .addField(">event", "Lets you create an event.")
            .addField(">poll", "Create a poll.")
            .addField(">dog", "Generates a dog image from reddit.")
            .addField(">cat", "Generates a cat image from reddit.")
            .addField(">animal", "Generates a picture of any sort of animal from reddit.")
            .addField(">botinfo", "Shows information on the bot.")
            .addField(">weather", "Shows you the temperature of specified place.")
            .addField(">covid [all/country]", "Shows the COVID-19 stats for specified countries.")
            .addField(">rule [rule number]", "Used for staff purposes to show others certain rules.")
            .addField(">fortune", "Generates a random fortune cookie response.")
            .addField(">rate", "Rates you a random number out of 100.")
            .addField(">advice", "Generates random advice.")

      const embed2 = new Discord.MessageEmbed()

      .setTitle('Help for the bot systems:')
      .setColor('RANDOM')
      .addField("Automatic live membercount on a VC", "With this, you can see how many people are in the server by looking at a voice chat. Pretty cool, right?")
      .addField("QOTD's and Polls command", "With this system, staff members can create qotd's and polls through a simple command and you can answer them")
      .addField("Event System", "With this system, staff members can create game events which you may join.")
      .addField("Giveaways", "With this system, you can participate and possibly win in giveaways. So why not participate in them?")

        if(!args[0]) return message.reply(helpEmbed)

        if(!args[0] || args[0].toLowerCase() == "commands")
        return message.reply("check your DM's for a list of commands that I've sent you.").then(msg => msg.delete({timeout: 3000})).then(member.send(embed));

        if(!args[0] || args[0].toLowerCase() == "systems")
        return  message.reply("check your DM's for a list of information on the bot systems.").then(msg => msg.delete({timeout: 3000})).then(member.send(embed2));


}

module.exports.help = {
    name: "help",
    aliases: [],
    category: "helpCommand"
}