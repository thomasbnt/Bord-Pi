const api = require('twitch-api-v5')
const Discord = require('discord.js')
let onStream = false

module.exports = class Twitch {
    constructor(client, channel) {
        this.client = client
        this.api = api
        this.channel = channel
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
                    };
                } else {
                    let stream = res.stream.channel
                    info = {
                        url: stream.url,
                        title: stream.status,
                        name: stream.display_name,
                        game: stream.game,
                        logo: stream.logo,
                        activity: 'online'
                    };

                    let info_d = JSON.stringify(info)
                    let info_j = JSON.parse(info_d)
                    if (info_j.activity === 'offline') {
                        onStream = false
                    } else if (info_j.activity === 'online') {
                        if (onStream === true) {} else {
                            const log = this.client.channels.find(x => x.id === bot.config.IDWelcomeChannel)
                                .setAuthor(` 🎥 ${info_j.name} stream :`, info_j.logo)
                                .setDescription(`Hey ${info_j.name} vient de démarrer un live sur Twitch. N'hésite pas à aller faire un tour pour faire un petit coucou 👋`)
                                .setThumbnail(info_j.logo)
                                .addField(`${info_j.title}: `, `:space_invader: [Lien du Live](${info_j.url})`, true)
                                .addField(`:video_game: Jeu : `, `${info_j.game}`, true)
                                .setColor(bot.config.TwitchColor)
                            log.send(e)
                            onStream = true
                        };
                    };
                };
            };
        });


    }
}