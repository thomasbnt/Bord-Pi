const Discord = require('discord.js')
const config = require('../config.json')
const w = new Discord.WebhookClient({
    id: config.WebhookLogs.id,
    token: config.WebhookLogs.token
})

class BordPiHelper {
    // -------------------- Webhook des Logs --------------------
    logs(member, action) {
        const LogEmbed = new Discord.MessageEmbed()
            .setColor(config.colors.InfoColor)
            .setAuthor({
                name: member.user.tag,
                iconURL: member.user.avatarURL({
                    format: 'gif',
                    dynamic: true,
                    size: 1024
                }),
                url: `https://whois.mrrobot.app/${member.id}`
            })
        w.send({embeds: [LogEmbed]}).catch(console.error)
    }

    logsinoutserver(member, status, color_embed) {
        const LogsJoinEmbed = new Discord.MessageEmbed()
            .setColor(color_embed)
            .setAuthor({
                name: `${member.username} nous a ${status}`,
                iconURL: member.avatarURL({
                    format: 'gif',
                    dynamic: true,
                    size: 1024
                }),
                url: `https://whois.mrrobot.app/${member.id}`
            })
            .addField("Création", `<t:${this.IsoStringToTimeStamp(member.createdTimestamp)}>`, true)
            .addField(`Identifiant`, `\`${member.id}\``, true)
            .setThumbnail(member.displayAvatarURL())
            .setTimestamp(new Date()
            )
        w.send({embeds: [LogsJoinEmbed]}).catch(console.error)
    }
    IsoStringToTimeStamp(value) {
        const d = new Date(value)
        return Math.floor(d / 1000)
    }
}

module
    .exports = new BordPiHelper
