const Discord = require("discord.js");

exports.run = (bot, WebhookPublic, msg) => {
  if (msg.channel.recipient) return;
  if (msg.guild.member(bot.user).hasPermission("MANAGE_MESSAGES")) {
    msg
      .delete(msg.author)
      .catch((e) =>
        console.log(
          bot.ls.warning,
          "Le robot n'a pas la permission de supprimer la commande faite par l'utilisateur."
        )
      );
  }

  msg.channel.send(
    new Discord.MessageEmbed()
      .setColor(bot.config.PrimaryColor)
      .setDescription(
        `Vous ne savez pas vraiment utiliser Discord et ses fonctionnalités du chat? Nous utilisons du markdown pour mettre **en valeur nos textes**.\n
        Si __vous voulez savoir__ comment ça marche, [lisez cette article de Discord](https://support.discordapp.com/hc/fr/articles/210298617-Bases-de-la-mise-en-forme-de-texte-Markdown-mise-en-forme-du-chat-gras-italique-soulign%C3%A9-).`
      )
      .setThumbnail(
        "https://discordapp.com/assets/2c21aeda16de354ba5334551a883b481.png"
      )
  );

  console.log(
    bot.ls.info,
    bot.config.prefix +
      "markdown " +
      " de " +
      msg.author.tag +
      " (" +
      msg.author.id +
      ")"
  );
};
