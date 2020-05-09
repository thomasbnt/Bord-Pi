const Discord = require('discord.js')

module.exports = async (bot, WebhookPublic, msg) => {

  if (msg.author.bot) return
  if (msg.author.id === bot.user.id) return
  if (msg.channel.recipient) return

  // -------------------- Customs Réactions --------------------

  /*if (msg.content.includes("archi") || msg.content.includes("archimede") || msg.content.includes("archimède")) {
    msg.react(':archimede:572954869699313694').catch(e => console.error(bot.ls.error, e))
  }*/
  
  if (msg.content.includes("devto") ||  msg.content.includes("dev.to")) {
    msg.react(':devto:618474751093899324').catch(e => console.error(bot.ls.error, e))
  }

  // -------------------- Notification auprès du @Support --------------------

  if (msg.content.includes("<@&" + bot.config.IDRoleSupport + ">")) {
    
    if (msg.member.hasPermission('MANAGE_MESSAGES')) return
    const ThisIsFessage = (msg.guild.channels.cache.find(x => x.id === bot.config.IDChannelSupport))
    if (ThisIsFessage) {

      msg.channel.send(new Discord.MessageEmbed()
        .setColor(bot.config.PrimaryColor)
        .setDescription("Bonjour, un membre du support va vous répondre d'ici peu dans <#432552194630352916>")
        .setFooter("Merci de ne pas oublier de lire la FAQ sur le site web de Mr. Robøt.")
      )

      console.log(bot.ls.info, "Nouveau message pour le Support en provenance de " + msg.author.tag + " (" + msg.author.id + ")")

      WebhookPublic.send(new Discord.MessageEmbed()
        .setColor(bot.config.PrimaryColor)
        .setDescription("Nouveau message pour le Support en provenance de " + msg.author)
        .setFooter("ID : " + msg.author.id, msg.author.avatarURL())
      ).catch(e => console.error(e))
    } else {
      console.log(bot.ls.error, "Pour que cette fonctionnalité de notification @Support soit 100% opérationnelle, veuillez modifier le .find(x => x.id === \"Ici l'ID du channel\") ")
    }
  }

  // -------------------- Filtre contre les liens Discord --------------------

  if (msg.content.includes('discord.gg') || msg.content.includes('discordapp.com/invite') || msg.content.includes('discord.me')) {
    
    if (msg.member.hasPermission('MANAGE_MESSAGES')) return
    if (msg.member.roles.cache.has(bot.config.IDRoleSupport)) return
    if (msg.channel.id === bot.config.IDAdsChannel) return
    if (msg.guild.member(bot.user).hasPermission("MANAGE_MESSAGES")) { msg.delete(msg.author).catch(e => console.error(bot.ls.error, "Le robot n'a pas la permission de supprimer le message de l'utilisateur.")) }
    

    msg.channel.send(`<@${msg.author.id}> hop hop hop !`, new Discord.MessageEmbed()
      .setColor(bot.config.DangerColor)
      .setDescription(`Merci de revoir les <#399600870804684803>. Les invitations ne sont autorisé que par validation d'un des membres de l'équipe.`)
    ).then(m => { setTimeout(() => { m.delete() }, 20000) })

    
    console.log(bot.ls.info, `${msg.author.tag} (${msg.author.id}) a fait une publicité Discord dans le channel ${msg.channel.name} (${msg.channel.id}).\n> ${msg.content}`)
   
    WebhookPublic.send(new Discord.MessageEmbed()
      .setColor(bot.config.DangerColor)
      .setDescription(`<@${msg.author.id}> a fait une publicité Discord dans le channel <#${msg.channel.id}>.\n\n> ${msg.content}`)
      .setFooter("ID : " + msg.author.id, msg.author.avatarURL())
    )
  }

  if (msg.content.includes("développeur certifié") || msg.content.includes("developpeur certifie")) {

    WebhookPublic.send(new Discord.MessageEmbed()
        .setColor(bot.config.PrimaryColor)
        .setDescription(`Nouvelle demande pour devenir **dev' certifié** de la part de **<@${msg.author.id}>**\n> ${msg.content}`)
        .setFooter("Nouvelle requête Dev' Certifié — ID : " + msg.author.id, msg.author.avatarURL())
    )
    console.log(bot.ls.info, `Nouvelle demande pour devenir **dev' certifié** de la part de **<@${msg.author.id}>**\n> ${msg.content}`)
  }

  if (msg.content.indexOf(bot.config.prefix) !== 0) return

  const args = msg.content.slice(bot.config.prefix.length).trim().split(/ +/g)
  const command = args.shift().toLowerCase()
  const cmd = bot.commands.get(command)  

  if (!cmd) return
  cmd.run(bot, WebhookPublic, msg, args)
  
}
