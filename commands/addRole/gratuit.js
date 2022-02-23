const Discord = require('discord.js')

exports.run = async (bot, WebhookPublic, msg) => {
  if (msg.guild.member(bot.user).hasPermission('MANAGE_MESSAGES')) {
    msg.delete(msg.author).catch(e => console.log(bot.ls.info, "Optionnel : Le robot n'a pas la permission de supprimer la commande faite par l'utilisateur."))
  }

  if (msg.member.roles.cache.has(bot.config.IDRoles.notif_jeux_gratuits)) {
    msg.member.roles.remove(bot.config.IDRoles.notif_jeux_gratuits).catch(bot.ls.error, console.error)
    msg.channel.send('Vous ne serrez plus notifié dès qu\'un jeu gratuit sera disponible.')
      .then(m => { setTimeout(() => { m.delete() }, 20000) })

    console.log(bot.ls.info, bot.config.prefix + msg.guild.roles.cache.get(bot.config.IDRoles.notif_jeux_gratuits).name + ' de ' + msg.author.tag + ' (' + msg.author.id + ')')

    WebhookPublic.send(new Discord.MessageEmbed()
      .setColor(msg.guild.roles.cache.get(bot.config.IDRoles.notif_jeux_gratuits).hexColor)
      .setDescription(`Rôle **${msg.guild.roles.cache.get(bot.config.IDRoles.notif_jeux_gratuits).name}** supprimé pour  ${msg.author}.\nIl y a désormais ${(msg.guild.roles.cache.get(bot.config.IDRoles.notif_jeux_gratuits).members).size - 1} membres qui possède ce rôle.`)
      .setFooter('ID : ' + msg.author.id, msg.author.avatarURL())
    )
  } else {
    msg.member.roles.add(bot.config.IDRoles.notif_jeux_gratuits).catch(console.error)
    msg.channel.send(`Vous serrez désormais **notifié** dès qu'un jeu gratuit sortira !\nVous êtes ${(msg.guild.roles.cache.get(bot.config.IDRoles.notif_jeux_gratuits).members).size + 1} membres qui possède ce rôle.`)
      .then(m => { setTimeout(() => { m.delete() }, 20000) })

    console.log(bot.ls.info, bot.config.prefix + msg.guild.roles.cache.get(bot.config.IDRoles.notif_jeux_gratuits).name + ' de ' + msg.author.tag + ' (' + msg.author.id + ')')

    WebhookPublic.send(new Discord.MessageEmbed()
      .setColor(msg.guild.roles.cache.get(bot.config.IDRoles.notif_jeux_gratuits).hexColor)
      .setDescription(`Rôle **${msg.guild.roles.cache.get(bot.config.IDRoles.notif_jeux_gratuits).name}** ajouté pour  ${msg.author}.\nIl y a désormais ${(msg.guild.roles.cache.get(bot.config.IDRoles.notif_jeux_gratuits).members).size + 1} membres qui possède ce rôle.`)
      .setFooter('ID : ' + msg.author.id, msg.author.avatarURL())
    )
  }
}
