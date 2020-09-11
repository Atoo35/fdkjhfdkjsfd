module.exports.run = async (client, message, args) => {
    if(!message.member.roles.cache.some(r=>["Level 50", "Staff", "HotBot Team", "Staff Advisors"].includes(r.name))) return;
    let user = message.mentions.users.first();
    if(!user) return message.channel.send("https://cdn.discordapp.com/attachments/332199818917183490/750220479654133780/video0.mp4")
    
    if(user)
    return message.channel.send(`https://cdn.discordapp.com/attachments/332199818917183490/750220479654133780/video0.mp4 ${user}`)

}


module.exports.help = {
    name: "distraction",
    aliases: [],
    category: "misc"
}