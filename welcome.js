/* const Discord = require('discord.js');
const client = new Discord.Client();
const { token } = require('./config.json')

client.on('ready', () => {
    console.log("welcome.js working.")
    client.user.setStatus("dnd")

client.on('guildMemberAdd', member => {

    let DMembed = new Discord.MessageEmbed()
    .setDescription("Welcome to the server! Please check our server rules in <#494174807718363144> before chatting to avoid any consequences. Information such as how to obtain roles can also be found here: <#514890195552829442>. Need help with something? Head on over to <#652292571523055637> and create a [Support Ticket](https://www.youtube.com/watch?v=VXTl9a3-u8E&feature=youtu.be) and then a staff member will assist you. Last but not least, you can verify in <#418594311727349771>, just simply do `!!verify` and follow the bots instructions. All other information will be in the information channel as stated before. You may also recieve reaction roles from here: https://discordapp.com/channels/244233087620218890/514890195552829442/736787227509653594. Have a good day and have fun!\n\nSincerely,\nBACON ARMY Staff Team.")
    member.send(DMembed);

})
})

client.login(token) */