const Discord = require("discord.js");

exports.run = async (bot, WebhookPublic, msg) => {
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
  if (!msg.member.hasPermission("MANAGE_MESSAGES")) return;

  const m = await msg.channel.send("En attente..");

  m.edit(
    new Discord.MessageEmbed()
      .setColor(bot.config.PrimaryColor)
      .addField(
        "Latence du robot",
        `${m.createdTimestamp - msg.createdTimestamp} ms`,
        true
      )
      .addField(
        "Latence de l'API Discord",
        `${Math.floor(bot.ws.ping)} ms`,
        true
      )
  );

  console.log(
    bot.ls.info,
    bot.config.prefix +
      "ping " +
      " de " +
      msg.author.tag +
      " (" +
      msg.author.id +
      ")"
  );
};
