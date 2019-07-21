const api = require('twitch-api-v5')
const Discord = require('discord.js')
let onStream = false


const truncate = function (str, length, ending) {
    if (length == null) {
        length = 100
    }
    if (ending == null) {
        ending = '...'
    }
    if (str.length > length) {
        return str.substring(0, length - ending.length) + ending
    } else {
        return str
    }
}
module.exports = class Twitch {
    constructor(client, channeling) {
        this.client = client
        this.api = api
        this.channel = channeling
    }

    async run() {
        this.api.clientID = this.client.config.TwitchAppID
        this.api.streams.channel({
            channelID: this.channel
        }, (err, res) => {
            if (err) {
                console.log(err)
            } else {
                let info
                if (res.stream === null) {
                    info = {
                        activity: 'offline'
                    }
                } else {
                    let stream = res.stream.channel
                    info = {
                        url: stream.url,
                        title: stream.status,
                        name: stream.display_name,
                        game: stream.game,
                        logo: stream.logo,
                        activity: 'online'
                    }

                    let info_d = JSON.stringify(info)
                    let info_j = JSON.parse(info_d)
                    if (info_j.activity === 'offline') {
                        onStream = false
                    } else if (info_j.activity === 'online') {
                        if (onStream === true) {} else {
                            const log = this.client.channels.find(x => x.id === this.client.config.IDWelcomeChannel)

                            const e = new Discord.RichEmbed()
                                .setAuthor(` 🎥 ${info_j.name} stream`, info_j.logo)
                                .setDescription(`Hey ${info_j.name} vient de démarrer un live sur Twitch. N'hésite pas à aller faire un tour pour faire un petit coucou 👋`)
                                .setThumbnail(info_j.logo)
                                .addField(`Jeu :`, `[${truncate(info_j.title, 20)}](${info_j.url})`, true)
                                .addField(`Catégorie : `, `${info_j.game}`, true)
                                .setColor(this.client.config.TwitchColor)
                            log.send(e)
                            onStream = true
                        }
                    }
                }
            }
        })
    }
}