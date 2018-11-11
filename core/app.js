const Discord = require('discord.js');
const config = require('./config.json');
const colors = require("colors");

cmdexe = 'Commande exécuté : '
const { prefix, webhookLogs, webhookPublic, Mr_Robot, TheGate, Liens, Musiques } = config;
const WebhookLogs = new Discord.WebhookClient(webhookLogs.id, webhookLogs.token);
const WebhookPublic = new Discord.WebhookClient(webhookPublic.id, webhookPublic.token)



const bot = new Discord.Client({
    autoReconnect: true
});

// -------------------------- Couleur par défaut --------------------------
const color = 10038562;

function updatePresence() {
    bot.user.setActivity(bot.guilds.reduce((mem, g) => mem += g.memberCount, 0) + " utilisateurs | /bord", {type: "WATCHING"})
}

// ---------------------- Core ----------------------
bot.on('ready', () => {
    updatePresence()
    console.info("Connecté en tant que ".bgMagenta + bot.user.tag.bgMagenta)
});

bot.on("guildMemberAdd", (member) => {
    updatePresence()
    const ChannelGeneral = member.guild.channels.find("name", "general");

      const embed = {
      "color": color,
      "fields": [
        {
          "name": "Bienvenue à " + member.user.username + " | Fiche d'aide",
          "value": "Veuillez lire les <#399600870804684803>.\nPour avoir de l'aide à propos de <@308655472452304896>, veuillez [revoir la FAQ](https://mrrobot.thomasbnt.fr/#FAQ) sur le site.\nSi vous ne trouvez pas la solution, demandez de l'aide dans <#432552194630352916> en **suivant le protocole dans les messages épinglés**.\nSi vous voulez être notifié à chaque mise à jour du robot et recevoir toutes les informations importantes, faites `/mrrobot`."
        }
      ]
    }
    ChannelGeneral.send({ embed })
            .then((msg) => {
            setTimeout(() => {
            msg.delete()
        }, 40000)
        return
    });
});

bot.on('guildMemberRemove', member => {
    updatePresence()
});


// ---------------------- Messages ----------------------
bot.on('message', (msg) => { 

       if (msg.author.bot) return

        // --- Commande bord | help ---
        if (msg.content === prefix + "bord") {
            if(msg.channel.recipient) return
            WebhookLogs.send("**" + prefix + "bord** - De ``" + msg.author.username + "#"+ msg.author.discriminator + "``");
            WebhookPublic.send("**" + prefix + "bord** - De ``" + msg.author.username + "#"+ msg.author.discriminator + "``");
            const embed = {
            "color": 10038562,
            "title": "BORD Pi | Panel d'aide.",
            "description": "Un robot gérant et aidant les utilisateurs pour le serveur **La Hype_**.\nIl est [Open Source](https://github.com/thomasbnt/Bord-Pi), toute personne peut participer au projet et l'améliorer. Suivez simplement le protocole afin de le modifier.",
            "thumbnail": {
            "url": bot.user.displayAvatarURL
            },
            "fields": [
            {
                "name": ":black_small_square: " + prefix + "mrrobot",
                "value": "Vous **serez notifié de chaque mise à jour** du projet <@308655472452304896>. ",
                "inline": false
            },
            // {
            //     "name": ":black_small_square: " + prefix + "liens",
            //     "value": "Vous aurez l'accès au **channel textuel liens**. Vous y trouverez de tas de liens d'articles à lire !",
            //     "inline": false
            // },
            // {
            //     "name": ":black_small_square: " + prefix + "musiques",
            //     "value": "Vous aurez l'accès au **channel textuel des musiques**. Vous y trouverez de tas de musiques à découvrir !",
            //     "inline": false
            // },
            {
                "name": "Les liens utiles",
                "value": "[Serveur Discord](https://discord.gg/9gcxwVY) • [Me soutenir](https://www.patreon.com/thomasbnt) • [Site web](https://thomasbnt.fr/) • [Code Source](https://github.com/thomasbnt/Bord-Pi)",
                "inline": false
            }
            ]
            };
            msg.channel.send({ embed });
                console.log(cmdexe + " bord ".yellow +  " de "  + msg.author.username + " #"+ msg.author.discriminator + "  (" + msg.author + ")")
                return
        };

        if(msg.content === prefix + 'mrrobot') {
            msg.delete()
            if(msg.member.roles.has(Mr_Robot)) {
                msg.member.removeRole(Mr_Robot).catch(console.error)
                msg.channel.send('Vous ne serrez plus notifié pour les mises à jour mineures de **Mr. Robøt**.')
                .then(m => { setTimeout(() => { m.delete() }, 5000) })
                WebhookLogs.send("Rôle **Mr_Robot [Accès]** supprimé pour " + msg.author)
                const embed = new Discord.RichEmbed()
                WebhookPublic.send(embed
                    .setColor(10038562)
                    .setDescription("Rôle **Mr_Robot [Accès]** supprimé pour "+ msg.author)
                    .setThumbnail(msg.author.displayAvatarURL)
                )
            } else {
                msg.member.addRole(Mr_Robot).catch(console.error)
                msg.channel.send('Vous serrez désormais notifié pour les mises à jour mineures de **Mr. Robøt**.')
                .then(m => { setTimeout(() => { m.delete() }, 5000) })
                WebhookLogs.send("Rôle **Mr_Robot [Accès]** ajouté pour " + msg.author)
                const embed = new Discord.RichEmbed()
                WebhookPublic.send(embed
                    .setColor(10038562)
                    .setDescription("Rôle **Mr_Robot [Accès]** ajouté pour "+ msg.author)
                    .setThumbnail(msg.author.displayAvatarURL)
                )
            }
          }

        //   if(msg.content === prefix + 'liens') {
        //     msg.delete()
        //     if(msg.member.roles.has(Liens)) {
        //         msg.member.removeRole(Liens).catch(console.error)
        //         msg.channel.send("Vous n'avez plus accès au **channel des liens**.")
        //         .then(m => { setTimeout(() => { m.delete() }, 5000) })
        //         WebhookLogs.send("Rôle **Liens [Accès]** supprimé pour " + msg.author)
        //         const embed = new Discord.RichEmbed()
        //         WebhookPublic.send(embed
        //             .setColor(10038562)
        //             .setDescription("Rôle **Liens [Accès]** supprimé pour "+ msg.author)
        //             .setThumbnail(msg.author.displayAvatarURL)
        //         )
        //     } else {
        //         msg.member.addRole(Liens).catch(console.error)
        //         msg.channel.send('Vous avez accès aux <#399602969810829312>, proposez des articles et des nouveautés à nous faire découvrir !')
        //         .then(m => { setTimeout(() => { m.delete() }, 5000) })
        //         WebhookLogs.send("Rôle **Liens [Accès]** ajouté pour " + msg.author)
        //         const embed = new Discord.RichEmbed()
        //         WebhookPublic.send(embed
        //             .setColor(10038562)
        //             .setDescription("Rôle **Liens [Accès]** ajouté pour "+ msg.author)
        //             .setThumbnail(msg.author.displayAvatarURL)
        //         )
        //     }
        //   }

        //   if(msg.content === prefix + 'musiques') {
        //     msg.delete()
        //     if(msg.member.roles.has(Musiques)) {
        //         msg.member.removeRole(Musiques).catch(console.error)
        //         msg.channel.send("Vous n'avez plus accès au **channel des musiques**.")
        //         .then(m => { setTimeout(() => { m.delete() }, 5000) })
        //         WebhookLogs.send("Rôle **Musiques [Accès]** supprimé pour " + msg.author)
        //         const embed = new Discord.RichEmbed()
        //         WebhookPublic.send(embed
        //             .setColor(10038562)
        //             .setDescription("Rôle **Musiques [Accès]** supprimé pour "+ msg.author)
        //             .setThumbnail(msg.author.displayAvatarURL)
        //         )
        //     } else {
        //         msg.member.addRole(Musiques).catch(console.error)
        //         msg.channel.send('Vous avez accès aux <#478578178672164874>, proposez vos musiques à nous faire écouter !')
        //         .then(m => { setTimeout(() => { m.delete() }, 5000) })
        //         WebhookLogs.send("Rôle **Musiques [Accès]** ajouté pour " + msg.author)
        //         const embed = new Discord.RichEmbed()
        //         WebhookPublic.send(embed
        //             .setColor(10038562)
        //             .setDescription("Rôle **Musiques [Accès]** ajouté pour "+ msg.author)
        //             .setThumbnail(msg.author.displayAvatarURL)
        //         )
        //     }
        //   }


       // --- Filtre contre les liens Discord ---
       if(msg.content.includes('discord.gg') || msg.content.includes('discordapp.com/invite')) {
            if(msg.member.hasPermission('MANAGE_MESSAGES')) return    
            msg.delete()
            console.log(msg.author.tag + " (" + msg.author + ") a fait une publicité Discord.")
            WebhookLogs.send(msg.author.tag + "(" + msg.author + ") a fait une publicité Discord.\nMessage : " + msg.content)
            WebhookPublic.send(msg.author.tag + "(" + msg.author + ") a fait une publicité Discord.\nMessage : " + msg.content)
            msg.reply(' merci de revoir les <#399600870804684803> . Les liens discord sont interdits.')
                .then(m => { setTimeout(() => { m.delete() }, 5000) })
       }


      

       // --- Commande uptime (réservé à ceux qui ont la permission de gérer les messages) ---
      if (msg.content === prefix + 'uptime'){
        if(msg.channel.recipient) return
            if(!msg.member.hasPermission('MANAGE_MESSAGES')) return
            const embed = {
            "author": {
                "name": "🔌 Uptime",
                "url": "https://thomasbnt.fr"
            },
            "description": (Math.round(bot.uptime / (1000 * 60 * 60))) + ' heure|s  ' + (Math.round(bot.uptime / (1000 * 60)) % 60) + ' minute|s ' + (Math.round(bot.uptime / 1000) % 60) + " seconde|s",
            "color": 10038562
            };
            msg.channel.send({ embed });
            console.log(cmdexe + " uptime ".magenta +  " de " + msg.author.username + " #"+ msg.author.discriminator + " (" + msg.author + ")")
            WebhookLogs.send("**"+ prefix + "uptime** - De ``" + msg.author.username + "#"+ msg.author.discriminator + "``")
            const UptimeEmbed = new Discord.RichEmbed()
            WebhookPublic.send(UptimeEmbed
                .setColor(10038562)
                .setDescription("**"+ prefix + "uptime** - De " + msg.author)
                .setThumbnail(msg.author.displayAvatarURL)
            )
        };

         // -------------------- Ping --------------------
        if (msg.content === prefix + 'ping') {
            msg.delete()
            if (!msg.member.hasPermission('MANAGE_MESSAGES')) return
            const embed = new Discord.RichEmbed()
            .setColor(10038562)
            .setAuthor(`Un ping de ${Math.floor(bot.ping)} ms !`)
            .setFooter(`Demandé par ${msg.author.username}` ,msg.author.avatarURL)
            msg.channel.send({embed})
            console.log(cmdexe + " ping ".magenta +  " de " + msg.author.username + " #"+ msg.author.discriminator + " (" + msg.author + ")")
            WebhookLogs.send("**"+ prefix + "ping** - De ``" + msg.author.username + "#"+ msg.author.discriminator + "``")
            const PingEmbed = new Discord.RichEmbed()
            WebhookPublic.send(PingEmbed
                .setColor(10038562)
                .setDescription("**"+ prefix + "ping** - De ``" + msg.author)
                .setThumbnail(msg.author.displayAvatarURL)
            )
        }

       if (msg.content.startsWith(prefix + "avatar")) {
        const embed = {
            "color": color,
            "thumbnail": {
                "url": msg.author.displayAvatarURL
                },
            "description":"Voici ton image de profil. Pour la voir, clique simplement dessus."
        }
        msg.channel.send({embed});
      };

});

bot.login(config.token)
    .catch(e => console.error(e.message));
