const Discord = require('discord.js')
module.exports = async (bot, WebhookPublic, member) => {
    bot.updatePresence()
    const guild = member.guild

    console.log(bot.ls.info, `📤  — ${member.user.tag} (${member.user.id}) a quitté ${guild.name}`)

    WebhookPublic.send(new Discord.RichEmbed()
        .setColor(bot.config.InfoColor)
        .setAuthor("📤 — Membre ayant quitté", bot.user.displayAvatarURL)
        .setThumbnail(member.user.avatarURL)
        .addField("Nom", member.user.tag, true)
        .addField("Identitifation (ID)", "<@" + member.user.id + "> ", true)
        .setFooter("Bord Piesque")
        .setTimestamp(new Date())
    ).catch(e => console.error(e))
}
