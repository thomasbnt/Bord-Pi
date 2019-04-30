module.exports = (bot, WebhookPrivate, WebhookPublic, msg, args) => {
  console.log(bot.ls.success,"Connecté en tant que " + bot.user.username)
  bot.updatePresence()
}
