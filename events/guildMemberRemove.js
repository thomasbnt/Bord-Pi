const Discord = require('discord.js')
module.exports = async (bot, WebhookPublic, member) => {
    bot.updatePresence()
    const guild = member.guild

    console.log(bot.ls.info, `📤  — ${member.user.tag} (${member.user.id}) a quitté ${guild.name}`)

    WebhookPublic.send(new Discord.RichEmbed()
        .setColor(bot.config.BlackColor)
        .setAuthor(`📤 — ${member.user.tag} nous a quitté`, member.user.avatarURL)
        .setFooter(`Bord Piesque — ID : ${member.user.id}`)
        .setTimestamp(new Date())
    ).catch(e => console.error(e))
}
