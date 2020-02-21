const Discord = require('discord.js')
module.exports = (bot, WebhookPublic, member, newMember, oldMember) => {

    if (newMember.user.presence.type  == null) {  console.log(newMember.user.presence.type) }

    if(newMember.presence.game.name === 'Spotify') {
        bot.channels.get('477843080616083470').send(`${newMember.user.username} is now listening on Spotify`)
    }

    if (newMember.user.presence.type === 0) {
        console.log(`${newMember.user.username} is now playing`)
    }
    if (newMember.user.presence.type === 1) {
        console.log(`${newMember.user.username} is now in Stream`)
    }
    if (newMember.user.presence.game.type === 2) {
        console.log(`${newMember.user.username} is now listening on Spotify`)
    }
    if (newMember.user.presence.game.type === 3) {
        console.log(`${newMember.user.username} is now watching`)
    }




}