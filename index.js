const Discord = require('discord.js');
const client = new Discord.Client()
const config = require('./config.json');
const fs = require('fs')

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

const { GiveawaysManager } = require("discord-giveaways");
const gmanager = new GiveawaysManager(client, {
  storage: "./giveaways.json",
  updateCountdownEvery: 10000,
  default: {
    botsCanWin: false,
    embedColor: "#29dff0",
    embedColorEnd: "#f50f48",
    reaction: "🎉"
  }
});
client.giveawaysManager = gmanager;

fs.readdir("./commands/", (err, files) => {

  if (err) console.log(err);
  let jsfile = files.filter(f => f.split(".").pop() === "js")
  if (jsfile.length <= 0) {
    console.log("Couldn't find commands.");
    return;
  }

  jsfile.forEach((f, i) => {
    let props = require(`./commands/${f}`);
    console.log(`${f} loaded!`);
    client.commands.set(props.help.name, props);
    if (props.help.aliases && Array.isArray(props.help.aliases)) props.help.aliases.forEach(alias => client.aliases.set(alias, props))
  });

});



client.on('ready', () => {
  client.user.setStatus("dnd")
  client.setInterval(() => {

    const statuses = [
      "BACON ARMY | >help",
      "The chat",
      "3 Discord servers..."
    ]

    const status = statuses[Math.floor(Math.random() * statuses.length)]
    client.user.setActivity(status, { type: "WATCHING" }) //// Select the type of status, PLAYING, WATCHING, etc.
  }, 100000)

  let BAServer = client.guilds.cache.get("244233087620218890");
  let mCountVC = client.channels.cache.get("745115469844840559");

  if (!mCountVC.name.endsWith(BAServer.memberCount)) mCountVC.setName("Member Count: " + BAServer.memberCount)

}, 300000);
console.log('I am online.')
// client.user.setActivity('BACON ARMY | >help', { type: 'WATCHING' })


client.on('message', async message => {

  if (message.content === '>stormerissuchanooblol123') {

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
    message.channel.send(embed);
  }

  if (message.content === '>noonewilleverknowthiscommandlmao') {
    const embed = new Discord.MessageEmbed()

      .setTitle('Help for the bot systems:')
      .setColor('RANDOM')
      .addField("QOTD's and Polls command", "With this system, staff members can create qotd's and polls through a simple command and you can answer them")
      .addField("Event System", "With this system, staff members can create game events which you may join.")
      .addField("Giveaways", "With this system, you can participate and possibly win in giveaways. So why not participate in them?")
    // Send the embed to the same channel as the message
    message.channel.send(embed);
  }

  //  const welcome = require('./welcome')

  let prefix = config.prefix;
  if (!message.content.startsWith(prefix)) return;
  let messageArray = message.content.split(/ +/);
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  let commandFile = client.commands.get(cmd.slice(prefix.length).toLowerCase());
  if (!commandFile) commandFile = client.aliases.get(cmd.slice(prefix.length).toLowerCase());

  if (commandFile) {

    if (!message.content.startsWith(prefix)) return;
    if (message.author.bot) return;

    if (commandFile.help.category == "fun" && !message.channel.name.includes("commands") && !message.member.hasPermission("ADMINISTRATOR")) return message.reply("use this in a commands channel").then(msg => msg.delete({ timeout: 3500 }));
    if (commandFile.help.category == "adminOnly2" && message.channel.name.includes("announcements") && !message.member.hasPermission("ADMINISTRATOR")) return message.reply("you can't use this in an announcements channel.").then(msg => msg.delete({ timeout: 3500 }));
    if (commandFile.help.category == "fun" && !["383059277759381504", "373893905243963394", "323982743908384768"].some(uID => uID == message.author.id)) return message.reply("use this in a commands channel").then(msg => msg.delete({ timeout: 3500 }));
    if (commandFile.help.category == "helpCommand" && message.channel.name.includes("commands")) return message.reply("use this in a commands channel.").then(msg => msg.delete({ timeout: 3500 }));
    if (commandFile.help.category == "translateOnly" && !message.channel.name.includes("commands") && !message.member.hasPermission("ADMINISTRATOR")) return message.reply("use this in a commands channel").then(msg => msg.delete({ timeout: 3500 }));
    if (commandFile.help.category.endsWith("pings") && message.member.roles.cache.some(r => ["614954517959540757", "332200529449189376"].includes(r.id)) && !message.member.hasPermission("MANAGE_MESSAGES") && !message.channel.name.includes("commands")) return message.reply("use this in a commands channel").then(msg => msg.delete({ timeout: 3500 }));


    commandFile.run(client, message, args).catch(err => {
      const errormessage = new Discord.MessageEmbed()
        .setTitle("Command Error")
        .setColor("#660808")
        .addField("Command", cmd.slice(prefix.length), true)
        .addField("Executed By", message.author.tag, true)
        .addField("Error Message", "```" + err + "```", false)
        .setTimestamp();

      message.channel.send("Oh no, an error has occurred!\nDeveloper Ping: <@!383059277759381504>", { embed: errormessage });
      console.log(err);
    });
  }
  // welcome(client)

});

client.on("raw", async event => {
  const eventName = event.t;
  if (eventName === "MESSAGE_REACTION_ADD" || eventName === "MESSAGE_REACTION_REMOVE") {
    if (event.d.message_id === "736787227509653594") {
      var reactionChannel = client.channels.cache.get(event.d.channel_id);
      if (reactionChannel.messages.cache.has(event.d.message_id)) return;
      else {
        reactionChannel.messages.fetch(event.d.message_id)
          .then(message => {
            var messageReaction = message.reactions.cache.get(event.d.emoji.name + ":" + event.d.emoji.id);
            var user = client.users.cache.get(event.d.user_id);
            if (eventName === "MESSAGE_REACTION_ADD") client.emit("messageReactionAdd", messageReaction, user);
            if (eventName === "MESSAGE_REACTION_REMOVE") client.emit("messageReactionRemove", messageReaction, user);
          });
      };
    };
  };
});

client.on("messageReactionAdd", async (messageReaction, user) => {
  var reactionmember = messageReaction.message.guild.members.cache.find(member => member.id === user.id);

  if (messageReaction.message.id == "736787227509653594") {
    if (messageReaction.emoji.name == "🎊") reactionmember.roles.add("736784391413563454")
    // Giveaway Pings role
    if (messageReaction.message.id == "736787227509653594") {
      if (messageReaction.emoji.name == "🎮") reactionmember.roles.add("736784289718337598")
      // Event Pings role
      if (messageReaction.message.id == "736787227509653594") {
        if (messageReaction.emoji.name == "️️⛏️") reactionmember.roles.add("736784353979531276")
        // Minecraft Pings role
      }
    }
  }
});

client.on("messageReactionRemove", async (messageReaction, user) => {
  var reactionmember = messageReaction.message.guild.members.cache.find(member => member.id === user.id);

  if (messageReaction.message.id == "736787227509653594") {
    if (messageReaction.emoji.name == "🎊") reactionmember.roles.remove("736784391413563454")
    // Giveaway Pings role
    if (messageReaction.message.id == "736787227509653594") {
      if (messageReaction.emoji.name == "🎮") reactionmember.roles.remove("736784289718337598")
      // Event Pings role
      if (messageReaction.message.id == "736787227509653594") {
        if (messageReaction.emoji.name == "️️⛏️") reactionmember.roles.remove("736784353979531276")
        // Minecraft Pings role
      }
    }
  }
})

client.login(config.token)
