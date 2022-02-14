
module.exports = {
    name: 'guildMemberRemove',
    description: 'Guild Member Remove',
    execute(member) {
        const guild = member.guild

        console.log(`📤  — ${member.user.tag} (${member.user.id}) a quitté ${guild.name}`)

        /*  WebhookPublic.send(new Discord.MessageEmbed()
              .setColor(bot.config.BlackColor)
              .setAuthor(`📤 — ${member.user.username} nous a quitté`, member.user.avatarURL)
              .setFooter(`ID : ${member.user.id}`)
              .setTimestamp(new Date())
          ).catch(e => console.error(e))*/
    }
}
