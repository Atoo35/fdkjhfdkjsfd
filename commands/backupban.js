const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {

  if(!message.member.hasPermission("MANAGE_MESSAGES") && message.author.id !== "373893905243963394") return;
  if (!message.guild) return;

    const user = message.mentions.users.first();

    if (user) {
    
      const member = message.guild.member(user);

      if (member) {
        member
          .ban({
            reason: 'They were bad!',
          })
          .then(() => {
            
            message.reply(`Successfully banned ${user.tag}`);
          })
          .catch(err => {
            
            message.reply('I was unable to ban the member');
            console.error(err);
          });
      } else {
        message.reply("That user isn't in this guild!");
      }
    } else {
      message.reply("You didn't mention the user to ban!");
    }
  }

module.exports.help = {
    name: "ban",
    aliases: [],
    category: "staffOnly"
}