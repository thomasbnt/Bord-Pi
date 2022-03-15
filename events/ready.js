module.exports = {
    name: 'ready',
    description: 'Bot is ready',
    execute(client) {
        console.log(`Connecté en tant que ${client.user.username}`)
        client.user.setActivity(`/roles`, { type: "WATCHING" })

        // Discord nettoie l'activité sans raison. Le setInterval est seulement pour le mettre à jour.
        function Activity() {
            client.user.setActivity(`/roles`, {
                type: "WATCHING"
            })
        }

        setInterval(Activity, 1200000)

        /*let Motd = ["ThisIsFlume", "Henry III", "👋", "🍣", "😎", "E Corpé", "Mee1 premier du nom", "Raspi, se sentir utile !", "💡 Je suis né(e) sur un Raspberry Pi !", "Dernière génération en route...", "Lorem Ipsum", "Loogé et coffré.", "Est-tu un 0 ou un 1?", "Le violet c'est beau", "🌧 > 🌞"]
        let ThisIsMotd = Motd[Math.floor(Math.random() * Motd.length)]

        WebhookPublic.send(new Discord.MessageEmbed()
            .setColor(bot.config.SuccessColor)
            .setAuthor("— Démarrage du robot !", bot.user.displayAvatarURL())
            .setFooter(ThisIsMotd)
            .setTimestamp(new Date())
        ).catch(e => console.error(e))*/
    }
}
