module.exports = (bot, WebhookPrivate, WebhookPublic, msg, member, channel, args) => {
    msg.channel.send(`${member.user} a rejoint le serveur.`).catch(console.error);
}