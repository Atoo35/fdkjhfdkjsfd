const { prefix, token } = require("./config.json");
const Discord = require("discord.js");
const bot = new Discord.Client();
const Canvacord = require("canvacord");
const db = require("quick.db");
const xpCooldown = new Set();

bot.on('ready', () => {
    console.log("I am online.");
    xpCooldown.clear();
})

bot.on('message', async message => {

    if (message.author.bot)
        return;

    let user = message.mentions.users.first() || message.author;
    let level = db.get(`guild_${message.guild.id}_level_${user.id}`) || 0;
    let xp = db.get(`guild_${message.guild.id}_xp_${user.id}`) || 0;
    let gMembers = bot.guilds.cache.get(message.guild.id).members.cache.array();

    if (message.content.startsWith(prefix)) {//if message is command
        let args = message.content.substr(prefix.length).split(/ +/);
        let cmd = args.shift();

        if (cmd) {
	    if(!message.member.hasPermission("MANAGE_MESSAGES") && !message.channel.name.includes("commands")) return message.reply("use this in a commands channel!").then(msg => msg.delete({timeout:3500}));
            switch (cmd.toLowerCase()) {
                case 'rank': case 'lvl':

                    level = level.toString();

                    let xpNeeded = level * 500 + 500;

                    /*let every = db
                        .all()
                        .filter(i => i.ID.startsWith(`guild_${message.guild.id}_xptotal_`))
                        .sort((a, b) => b.data - a.data);*/

                    gMembers = gMembers.map(member => { return { id: member.id, xp: db.get(`guild_${message.guild.id}_xptotal_${member.id}`) } })
                    gMembers.sort((m1, m2) => m2.xp - m1.xp);

                    let rank = gMembers.map(m => m.id).indexOf(user.id) + 1;
                    rank = rank.toString();

                    let image = await Canvacord.rank({
                        username: user.username,
                        discrim: user.discriminator,
                        status: user.presence.status,
                        currentXP: xp.toString(),
                        neededXP: xpNeeded.toString(),
                        rank,
                        level,
                        avatarURL: user.displayAvatarURL({ format: "png" }),
                        color: "#e3ebef",
                        background: "https://media.discordapp.net/attachments/753695364019781673/753699360000180427/Finished_Rank_Card.png?width=1123&height=672"
                    });
                    return message.channel.send(new Discord.MessageAttachment(image, "rank.png"));

                case 'leaderboard': case 'lb':
                    if(!message.member.hasPermission("MANAGE_ROLES")) return;

                    gMembers = gMembers.map(member => { return { name: member.user.username, xp: db.get(`guild_${message.guild.id}_xptotal_${member.id}`) } })
                    gMembers.sort((m1, m2) => m2.xp - m1.xp);

                    let lbArray = gMembers.map((member, i) => {//its ugly but idk how else to do it since you wanted the emoji for first 3 ranks sorry but you can remove the if and keep the else code, if you dont need to make the user bold
                        if (member.name == message.author.username) {
                            if (i + 1 == 1)
                                return `:first_place: **${member.name}**\n\u2001Level: \`${getLevelFromXP(member.xp)}\`\n\u2001XP: \`${member.xp % 500}\``;
                            if (i + 1 == 2)
                                return `:second_place: **${member.name}**\n\u2001Level: \`${getLevelFromXP(member.xp)}\`\n\u2001XP: \`${member.xp % 500}\``;
                            if (i + 1 == 3)
                                return `:third_place: **${member.name}**\n\u2001Level: \`${getLevelFromXP(member.xp)}\`\n\u2001XP: \`${member.xp % 500}\``;
                        } else {
                            if (i + 1 == 1)
                                return `:first_place: ${member.name}\n\u2001Level: \`${getLevelFromXP(member.xp)}\`\n\u2001XP: \`${member.xp % 500}\``;
                            if (i + 1 == 2)
                                return `:second_place: ${member.name}\n\u2001Level: \`${getLevelFromXP(member.xp)}\`\n\u2001XP: \`${member.xp % 500}\``;
                            if (i + 1 == 3)
                                return `:third_place: ${member.name}\n\u2001Level: \`${getLevelFromXP(member.xp)}\`\n\u2001XP: \`${member.xp % 500}\``;

                            return `#${i + 1} ${member.name}\n\u2001Level: \`${getLevelFromXP(member.xp)}\`\n\u2001XP: \`${member.xp % 500}\``;
                        }
                    }).slice(0, 10);

                    let me = gMembers.findIndex(m => m.name == message.author.username);
                    me = me + 1 > 5 ? `\n\n**${me + 1}# ${gMembers[me].name}**\n\u2001Level: \`${getLevelFromXP(gMembers[me].xp)}\`\n\u2001XP: \`${gMembers[me].xp % 500}\`` : null;

                    const lbEmbed = new Discord.MessageEmbed()
                        .setAuthor(`Leaderboard`)
                        .setTitle(message.guild.name)
                        .setThumbnail(message.guild.iconURL())
                        .setDescription(`${lbArray.join('\n')}${me ? `${me}` : ``}`)
                        .setColor('RANDOM');

                    return message.channel.send(lbEmbed);

            /*    case 'setxp':
                    if (!args.length || isNaN(args[0]))
                        return message.channel.send('No value specified');

                    let newXP = parseInt(args[0])
                    let xpDiff1 = newXP - xp;
                    db.set(`guild_${message.guild.id}_xp_${user.id}`, newXP);
                    db.add(`guild_${message.guild.id}_xptotal_${user.id}`, xpDiff1)
                    return message.channel.send('XP set!'); */

                case 'setlvl':
                    if (!args.length || isNaN(args[0]))
                        return message.channel.send('No value specified')
                    let newLVL = parseInt(args[0]);
                    let xpDiff2 = (newLVL - level) * 500
                    db.set(`guild_${message.guild.id}_level_${user.id}`, newLVL);
                    db.add(`guild_${message.guild.id}_xptotal_${user.id}`, xpDiff2);
                    return message.channel.send('Level set!');
            }
        }
    } else {//if message isnt a command add xp
        xpFunc(message); //changed name because it was using xp variable instead of xp function
    }
});



function getLevelFromXP(xp) {
    return Math.floor(xp / 500);
}

function xpFunc(message) {
    if (message.content.startsWith(prefix))
        return;

    if (xpCooldown.has(message.author.id))
        return;
    xpCooldown.add(message.author.id);
    setTimeout(() => xpCooldown.delete(message.author.id), 4000);

    const randomNumber = Math.floor(Math.random() * 3) + 15;

    db.add(`guild_${message.guild.id}_xp_${message.author.id}`, randomNumber);
    db.add(`guild_${message.guild.id}_xptotal_${message.author.id}`, randomNumber);

    let level = db.get(`guild_${message.guild.id}_level_${message.author.id}`) || 1;
    let xp = db.get(`guild_${message.guild.id}_xp_${message.author.id}`);
    let xpNeeded = level * 500;

    if (xpNeeded < xp) {
        var newLevel = db.add(`guild_${message.guild.id}_level_${message.author.id}`, 1);
        db.subtract(`guild_${message.guild.id}_xp_${message.author.id}`, xpNeeded);

        message.channel.send(`Congratulations ${message.author}, you have leveled up to ${newLevel}!`);
        if (message.guild.roles.cache.some(r => r.name == `Level ${newLevel}`)) {
            message.member.roles.add(message.guild.roles.cache.find(role => role.name == `Level ${newLevel}`).id);
        }
    }
}

bot.login(token);