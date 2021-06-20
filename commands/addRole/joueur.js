const {MessageEmbed} = require('discord.js')

exports.run = async (bot, WebhookPublic, msg) => {

    if (msg.guild.member(bot.user).hasPermission("MANAGE_MESSAGES")) {
        msg.delete(msg.author).catch(e => console.log(bot.ls.info, "Optionnel : Le robot n'a pas la permission de supprimer la commande faite par l'utilisateur."));
    }

    if (msg.member.roles.cache.has(bot.config.IDRoles.joueur)) {
        msg.member.roles.remove(bot.config.IDRoles.joueur).catch(bot.ls.error, console.error);
        msg.channel.send(`Vous n'avez plus le rôle joueur.`)
            .then(m => {
                setTimeout(() => {
                    m.delete();
                }, 20000);
            })

        console.log(bot.ls.info, bot.config.prefix + msg.guild.roles.cache.get(bot.config.IDRoles.joueur).name + " de " + msg.author.tag + " (" + msg.author.id + ")");

        WebhookPublic.send(new MessageEmbed()
            .setColor(msg.guild.roles.cache.get(bot.config.IDRoles.joueur).hexColor)
            .setDescription(`Rôle **${msg.guild.roles.cache.get(bot.config.IDRoles.joueur).name}** supprimé pour  ${msg.author}.\nIl y a désormais ${(msg.guild.roles.cache.get(bot.config.IDRoles.joueur).members).size - 1} membres qui possède ce rôle.`)
            .setFooter("ID : " + msg.author.id, msg.author.avatarURL())
        );

    } else {
        msg.member.roles.add(bot.config.IDRoles.joueur).catch(console.error);
        msg.channel.send(`Vous avez désormais le rôle joueur.\nVous êtes ${(msg.guild.roles.cache.get(bot.config.IDRoles.joueur).members).size + 1} membres qui possède ce rôle.`)
            .then(m => {
                setTimeout(() => {
                    m.delete();
                }, 20000);
            })

        console.log(bot.ls.info, bot.config.prefix + msg.guild.roles.cache.get(bot.config.IDRoles.joueur).name + " de " + msg.author.tag + " (" + msg.author.id + ")");

        WebhookPublic.send(new MessageEmbed()
            .setColor(msg.guild.roles.cache.get(bot.config.IDRoles.joueur).hexColor)
            .setDescription(`Rôle **${msg.guild.roles.cache.get(bot.config.IDRoles.joueur).name}** ajouté pour  ${msg.author}.\nIl y a désormais ${(msg.guild.roles.cache.get(bot.config.IDRoles.joueur).members).size + 1} membres qui possède ce rôle.`)
            .setFooter("ID : " + msg.author.id, msg.author.avatarURL())
        );
    }
    ;
};