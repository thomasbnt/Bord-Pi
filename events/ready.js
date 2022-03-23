const CronJob = require("cron").CronJob;

const synchronizeSlashCommands = require("../modules/SyncCommands");

module.exports = {
  name: "ready",
  description: "Bot is ready",
  async execute(client) {
    console.log(`Connecté en tant que ${client.user.username}`);
    client.user.setActivity(`/bord`, { type: "WATCHING" });

    // Discord nettoie l'activité sans raison. Le setInterval est seulement pour le mettre à jour.
    new CronJob(
      "0 * */2 * * *",
      async () => {
        client.user.setActivity(`/bord`, {
          type: "WATCHING",
        });
      },
      null,
      true,
      "Europe/Paris"
    );

    // Créer / Supprimer / Modifier les commandes sur Discord si un changement est détecté
    await synchronizeSlashCommands(
      client,
      client.commands.map((c) => c.data),
      {
        debug: true,
        guildId: client.config.serverId,
      }
    );

    /*let Motd = ["ThisIsFlume", "Henry III", "👋", "🍣", "😎", "E Corpé", "Mee1 premier du nom", "Raspi, se sentir utile !", "💡 Je suis né(e) sur un Raspberry Pi !", "Dernière génération en route...", "Lorem Ipsum", "Loogé et coffré.", "Est-tu un 0 ou un 1?", "Le violet c'est beau", "🌧 > 🌞"]
        let ThisIsMotd = Motd[Math.floor(Math.random() * Motd.length)]

        WebhookPublic.send(new Discord.MessageEmbed()
            .setColor(bot.config.SuccessColor)
            .setAuthor("— Démarrage du robot !", bot.user.displayAvatarURL())
            .setFooter(ThisIsMotd)
            .setTimestamp(new Date())
        ).catch(e => console.error(e))*/
  },
};
