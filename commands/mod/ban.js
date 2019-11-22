const Discord = require('discord.js')
exports.run = async (bot, WebhookPublic, msg, args) => {
    if(msg.guild.member(bot.user).hasPermission("MANAGE_MESSAGES")) {
        msg.delete(msg.author).catch (e => console.error("ℹ Optionnel : Le robot n'a pas la permission de supprimer la commande faite par l'utilisateur."))
    }
    if (!msg.member.hasPermission("BAN_MEMBERS"))
        return console.log(`ℹ L\'utilisateur ${msg.author.tag} (${msg.author.id}) a voulu bannir sur le serveur ${msg.guild.name} (${msg.guild.id}) mais n'a pas la permission nécessaire.`)
    if (!msg.guild.member(bot.user).hasPermission("BAN_MEMBERS"))
        return msg.channel.send("Le robot n'a pas la permission d'expulser.") && console.error("🙏 Err: Le robot n'a pas la permission de bannir.")
    const user = msg.mentions.users.first()
    if (user) {
        const member = msg.guild.member(user)
        let reason = args.slice(1).join(' ')

        if (member.id === bot.user.id)
            return msg.channel.send("Vous ne pensez tout de même pas que je vais me bannir?")
                .then((msg) => {
                    setTimeout(() => {
                        msg.delete()
                    }, 2500)
                })
        if (!member.kickable)
            return msg.channel.send(`Désolé mais vous ne pouvez pas exécuter cette commande parce que son rôle est plus élevé ou identique qu'au vôtre. Cela pourrait être aussi un simple soucis de permission.`)
                .then((msg) => {
                    setTimeout(() => {
                        msg.delete()
                    }, 7500)
                })

        if (!reason) reason = `Cette utilisateur a été banni manuellement du serveur par ${msg.author.tag} avec Bord Pi sans raison écrite.`
        if (member) {
            member.ban({
                days: 7,
                reason: reason,
            }).then(() => {
                console.log(bot.ls.info, `${msg.author} a banni ${user.tag} (ID: ${user.id}). \nMotif : ${reason}`)
                const BanConfirmedPublicEmbed = new Discord.RichEmbed()
                WebhookPublic.send(BanConfirmedPublicEmbed
                    .setColor(bot.config.SuccessColor)
                    .setDescription(`${msg.author} a banni ${user.tag} (ID: ${user.id})`)
                    .setFooter(`ID : ${msg.author.id}`, msg.author.avatarURL)
                )
                const ApprovedBanEmbed = new Discord.RichEmbed()
                msg.channel.send(
                    ApprovedBanEmbed
                        .setTitle(`Vous avez bien banni ${user.tag}`)
                        .setColor(bot.config.SuccessColor)
                        .setTimestamp(new Date())
                ).then((msg) => {
                    setTimeout(() => {
                        msg.delete()
                    }, 5000)
                })
            }).catch(err => {
                const UnableBanEmbed = new Discord.RichEmbed()
                msg.channel.send(
                    UnableBanEmbed
                        .setTitle("Impossible de bannir l'utilisateur voulu.")
                        .setColor(bot.config.DangerColor)
                ).then((msg) => {
                    setTimeout(() => {
                        msg.delete()
                    }, 4000)
                })
                console.log(`❌ Impossible de bannir ${user.tag} (${user.id}) sur le serveur ${msg.guild.name} (${msg.guild.id}) `);
            })
        } else {
            const UserNotOnServerForBanEmbed = new Discord.RichEmbed()
            msg.channel.send(
                UserNotOnServerForBanEmbed
                    .setTitle("L'utilisateur en question n'est pas sur le serveur.")
                    .setColor(bot.config.DangerColor)
            ).then((msg) => {
                setTimeout(() => {
                    msg.delete()
                }, 4000)
            })
        }
    } else {
        const NoMentionForBanEmbed = new Discord.RichEmbed()
        msg.channel.send(
            NoMentionForBanEmbed
                .setTitle("Veuillez mentionner l'utilisateur.")
                .setColor(bot.config.DangerColor)
        ).then((msg) => {
            setTimeout(() => {
                msg.delete()
            }, 4000)
        })
    }
}