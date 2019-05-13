const Discord = require('discord.js')
exports.run = async (bot, WebhookPrivate, WebhookPublic, msg) => {
    if (msg.guild.member(bot.user).hasPermission("MANAGE_MESSAGES")) {
        msg.delete(msg.author).catch(e => console.log(bot.ls.warning, "Le robot n'a pas la permission de supprimer la commande faite par l'utilisateur."))
    }
    
    const emoji = ['1⃣', '2⃣', '3⃣', '4⃣', '5⃣', '6⃣', '7⃣', '8⃣', '9⃣', '🔟']
    const args = msg.content
        .slice(bot.config.prefix.length)
        .trim()
        .split(/ +/g)
    const command = args.shift().toLowerCase()
    const choice = msg.content
        .slice(bot.config.prefix.length + command.length) 
        .trim() 
        .split(/ *\/ */g)

    if (choice.length < 3) {
        const SurveyIfEmbed = new Discord.RichEmbed()
        msg.channel.send(
            SurveyIfEmbed
                .setColor(bot.config.PrimaryColor)
                .setTitle("Bord Pi — Créer un sondage")
                .setDescription("Créez vos propres sondages avec un maximum de 10 choix.")
                .setThumbnail(bot.user.displayAvatarURL)
                .addField("L'utilisation ", "**" + bot.config.prefix + "sd** [Votre question] **/** [Choix n°1] **/** [Choix n°2]")
        ).then(m => {
            setTimeout(() => {
                m.delete()
        }, 20000)})
    
    } else if (choice.length > 11) {
        const SurveyIfEmbed = new Discord.RichEmbed()
        msg.channel.send(
            SurveyIfEmbed
                .setColor(bot.config.DangerColor)
                .setFooter("Erreur — Vous ne pouvez pas mettre plus de 10 choix.")
        ).then(m => {
            setTimeout(() => {
                m.delete()
            }, 20000)
        })
    } else {
        const surveyMessage = []
        choice.forEach((e, index) => {
            if (index === 0) {
                surveyMessage.push(`**${e}** — de **${msg.author.username}**`) 
            } else {
                surveyMessage.push(`${emoji[index - 1]} : ${e}`) 
            }
        })
        msg.channel
            .send(surveyMessage.join('\n'))
            .then(m => reactEmoji(m, surveyMessage.length))
    }

    async function reactEmoji(msg, index) {
        index = index - 1 
        for (let i = 0; i < index; i++) {
            let emojiElement = emoji[i]
            await msg.react(emojiElement)
        }
    }

}