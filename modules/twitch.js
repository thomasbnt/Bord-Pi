const api = require('twitch-api-v5');
const Discord = require('discord.js');
let onStream = false;

module.exports = class Twitch {
    constructor(client) {
        this.client = client;
        this.api = api;
    }

    async run() {
        this.api.clientID = this.client.config.twitchID;
        this.api.streams.channel({
            channelID: '115622131'
        }, (err, res) => {
            if (err) {
                console.log(err);
            } else {
                let info;
                if (res.stream === null) {
                    info = {
                        activity: 'offline'
                    };
                } else {
                    let stream = res.stream.channel;
                    info = {
                        url: stream.url,
                        title: stream.status,
                        name: stream.display_name,
                        game: stream.game,
                        logo: stream.logo,
                        activity: 'online'
                    };

                    let info_d = JSON.stringify(info);
                    let info_j = JSON.parse(info_d);
                    if (info_j.activity === 'offline') {
                        onStream = false;
                    } else if (info_j.activity === 'online') {
                        if (onStream === true) {} else {
                            const log = this.client.channels.find(x => x.name === 'general');
                            const e = new Discord.RichEmbed()
                                .setAuthor(` 🎥 ${info_j.name} stream :`, info_j.logo)
                                .setDescription(`Hey ${info_j.name} is stream, go talk with him and say hello.`)
                                .setThumbnail(info._jlogo)
                                .addField(`${info_j.title}: `, `:space_invader:[Link of stream](${info_j.url})`, true)
                                .addField(`:video_game: Game : `, `${info_j.game}`, true)

                                .setColor('#3498DB')
                            log.send(e);
                            onStream = true;
                        };
                    };
                };
            };
        });


    }
}