/**
 * Simple commande pour tirée un nombre entre 0 et 100
 */

const {MessageEmbed} = require("discord.js");

exports.run = (bot, WebhookPublic, msg) => {
    if (msg.channel.recipient) return

    if (msg.guild.member(bot.user).hasPermission("MANAGE_MESSAGES")) {
        msg.delete(msg.author).catch(e => console.log(bot.ls.info, "Optionnel : Le robot n'a pas la permission de supprimer la commande faite par l'utilisateur."));
    }

    let min = Math.ceil(1);
    let max = Math.floor(100);
    let roll = Math.floor(Math.random() * (max - min + 1)) + min;

    msg.channel.send(new MessageEmbed()
        .setColor(bot.config.PrimaryColor)
        .setDescription(`Vous avez tiré le numéro : ${roll}`)
    );
};
