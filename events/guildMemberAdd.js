const Discord = require("discord.js");
const moment = require("moment");
moment.locale("FR");

module.exports = (bot, WebhookPublic, member) => {
  function checkDays(date) {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / 86400000);
    return days + (days === 1 ? " jour" : " jours");
  }
  const guild = member.guild;
  const ChannelGeneral = member.guild.channels.cache.find(
    (x) => x.id === bot.config.IDWelcomeChannel
  );

  ChannelGeneral.send(
    new Discord.MessageEmbed()
      .setColor(bot.config.PrimaryColor)
      .addField(
        "🍃 Bienvenue à " + member.user.username + " — Fiche d'aide",
        "On vous souhaite la bienvenue sur **" +
          guild.name +
          "** ! Lisez les <#399600870804684803> avant tout.",
        true
      )
      .setFooter("Ce message va s'autodétruire dans une minute")
  ).then((msg) => {
    setTimeout(() => {
      if (msg.guild.member(bot.user).hasPermission("MANAGE_MESSAGES")) {
        msg
          .delete(msg.author)
          .catch((e) =>
            console.log(
              bot.ls.warning,
              "Optionnel : Le robot n'a pas la permission de supprimer la commande faite par l'utilisateur."
            )
          );
      }
    }, 60000);
  });

  if (member.user.avatarURL === member.user.defaultAvatarURL) {
    ChannelGeneral.send(
      new Discord.MessageEmbed()
        .setColor(bot.config.InfoColor)
        .setAuthor(
          member.user.username + " pensez à mettre une image de profil !",
          bot.user.displayAvatarURL(),
          "https://support.discordapp.com/hc/fr/articles/204156688-Comment-modifier-mon-avatar-"
        )
        .setFooter("Cliquez au dessus pour voir comment faire.")
    ).then((msg) => {
      setTimeout(() => {
        if (msg.guild.member(bot.user).hasPermission("MANAGE_MESSAGES")) {
          msg
            .delete(msg.author)
            .catch((e) =>
              console.log(
                bot.ls.warning,
                "Optionnel : Le robot n'a pas la permission de supprimer la commande faite par l'utilisateur."
              )
            );
        }
      }, 60000);
    });
  }

  console.log(
    bot.ls.info,
    `📥  — ${member.user.tag} (${member.user.id}) a rejoint ${guild.name}`
  );

  WebhookPublic.send(
    new Discord.MessageEmbed()
      .setColor(bot.config.BlackColor)
      .setAuthor(
        `📥 — ${member.user.username} nous a rejoint`,
        member.user.avatarURL()
      )
      .addField(
        "Création",
        moment(member.user.createdTimestamp).format("ll"),
        true
      )
      .addField("Jour(s)", checkDays(member.user.createdAt), true)
      .setDescription(`Concernant ${member.user}`)
      .setThumbnail(member.user.displayAvatarURL())
      .setFooter(`ID : ${member.user.id}`)
      .setTimestamp(new Date())
  ).catch((e) => console.error(e));
};
