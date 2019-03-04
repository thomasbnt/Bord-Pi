const Discord = require('discord.js');
const config = require('./config.json');
const colors = require("colors");

cmdexe = 'Commande exécuté : ';
const { prefix, webhookLogs, webhookPublic, Mr_Robot, TheGate, Liens, Musiques, Feed, LoupsGarous, ChannelMessagedeBienvenue, Muted } = config;
const WebhookLogs = new Discord.WebhookClient(webhookLogs.id, webhookLogs.token);
const WebhookPublic = new Discord.WebhookClient(webhookPublic.id, webhookPublic.token);



const bot = new Discord.Client({
    autoReconnect: true
});

// -- Gestion du cache --
let cache = {
    active_warning: false,
    user_cache: {}
}
let userCache = cache.user_cache
// -- Couleur par défaut --
const color = 10038562;

function updatePresence() {
    bot.user.setActivity(bot.guilds.reduce((mem, g) => mem += g.memberCount, 0) + " utilisateurs | /bord", {type: "WATCHING"})
}

// ---------------------- Core ----------------------
bot.on('ready', () => {
    updatePresence()
    console.info("Connecté en tant que ".bgMagenta + bot.user.tag.bgMagenta)
});

bot.on("guildMemberAdd", (member, msg) => {
    updatePresence()
    const guild = member.guild;
    console.log(`📥 ${member.user.username}#${member.user.discriminator} (${member.user.id}) a rejoint ${guild.name}`.green);
    const ChannelGeneral = member.guild.channels.find(x => x.id === ChannelMessagedeBienvenue);

      const embed = {
      "color": color,
      "fields": [
        {
          "name": "Bienvenue à " + member.user.username + " | Fiche d'aide",
          "value": "On vous souhaite la bienvenue sur **" + guild.name + "** ! Lisez les <#399600870804684803> avant tout.\n\nPour avoir de l'aide à propos de <@308655472452304896>, veuillez [revoir la FAQ](https://mrrobot.thomasbnt.fr/?utm_source=Discord&utm_term=discord%2Cbordpi_bvn&utm_content=Bordpi_bvn#faq) si ce n'est pas encore fait, elle se trouve sur le site web. Si vous ne trouvez pas la solution, demandez de l'aide dans <#432552194630352916> en suivant le protocole dans les messages épinglés. Si vous voulez être notifié de chaque mise à jour, faites `/mrrobot`.\n\nVous avez la possibilité d'avoir des rôles d'accès, pour plus d'information, la commande `/bord` est disponible."
        }
      ]
    }
    ChannelGeneral.send({ embed })
            .then((msg) => {
            setTimeout(() => {
                if(msg.guild.member(bot.user).hasPermission("MANAGE_MESSAGES")){msg.delete(msg.author).catch (e => console.error("ℹ Optionnel : Le robot n'a pas la permission de supprimer la commande faite par l'utilisateur."))}; 
        }, 60000)
        return
    });
});

bot.on("guildMemberRemove", (member) => {
    updatePresence()
    const guild = member.guild;
    console.log(`📤 ${member.user.username}#${member.user.discriminator} (${member.user.id}) a quitté ${guild.name}`.red);
});


// ---------------------- Messages ----------------------
bot.on('message', (msg) => { 

       if (msg.author.bot) return;
       if(msg.channel.recipient) return;

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
            {
                "name": ":black_small_square: " + prefix + "thegate",
                "value": "Vous aurez accès à la **catégorie du projet The Gate** et vous serez notifié de chaque mise à jour.",
                "inline": false
            },
            {
                "name": ":black_small_square: " + prefix + "liens",
                "value": "Vous aurez accès au **channel textuel liens**. Vous y trouverez de tas de liens d'articles à lire !",
                "inline": false
            },
            {
                "name": ":black_small_square: " + prefix + "musiques",
                "value": "Vous aurez accès au **channel textuel des musiques**. Vous y trouverez de tas de musiques à découvrir !",
                "inline": false
            },
            {
                "name": ":black_small_square: " + prefix + "feed",
                "value": "Vous aurez accès au **channel textuel des flux RSS**.",
                "inline": false
            },
            {
                "name": ":black_small_square: " + prefix + "lg",
                "value": "Vous aurez accès à **la partie dédié au jeu LoupsGarous.fr**. Vous serrez donc notifié à chaque événement et futures parties afin que vous puissez jouer avec nous le tout en __vocal__.",
                "inline": false
            },
            {
                "name": "Les liens utiles",
                "value": "[Serveur Discord](https://discord.gg/9gcxwVY) • [Me soutenir](https://www.patreon.com/thomasbnt) • [Site web](https://www.thomasbnt.fr/?utm_source=link_embed_footer_bordpi?utm_medium=discordapp) • [Code Source](https://github.com/thomasbnt/Bord-Pi)",
                "inline": false
            }
            ]
            };
            msg.channel.send({ embed });
                console.log(cmdexe + " bord ".yellow +  " de "  + msg.author.username + " #"+ msg.author.discriminator + "  (" + msg.author + ")")
                return
        };

        if(msg.content === prefix + 'mrrobot') {
            if(msg.guild.member(bot.user).hasPermission("MANAGE_MESSAGES")){msg.delete(msg.author).catch (e => console.error("ℹ Optionnel : Le robot n'a pas la permission de supprimer la commande faite par l'utilisateur."))}; 
            if(msg.member.roles.has(Mr_Robot)) {
                msg.member.removeRole(Mr_Robot).catch(console.error)
                msg.channel.send('Vous ne serrez plus notifié pour les mises à jour mineures de **Mr. Robøt**.')
                .then(m => { setTimeout(() => { m.delete() }, 10000) })
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
                .then(m => { setTimeout(() => { m.delete() }, 10000) })
                WebhookLogs.send("Rôle **Mr_Robot [Accès]** ajouté pour " + msg.author)
                const embed = new Discord.RichEmbed()
                WebhookPublic.send(embed
                    .setColor(10038562)
                    .setDescription("Rôle **Mr_Robot [Accès]** ajouté pour "+ msg.author)
                    .setThumbnail(msg.author.displayAvatarURL)
                )
            }
        };

        if(msg.content === prefix + 'liens') {
            if(msg.guild.member(bot.user).hasPermission("MANAGE_MESSAGES")){msg.delete(msg.author).catch (e => console.error("ℹ Optionnel : Le robot n'a pas la permission de supprimer la commande faite par l'utilisateur."))}; 
            if(msg.member.roles.has(Liens)) {
                msg.member.removeRole(Liens).catch(console.error)
                msg.channel.send("Vous n'avez plus accès au **channel des liens**.")
                .then(m => { setTimeout(() => { m.delete() }, 10000) })
                WebhookLogs.send("Rôle **Liens [Accès]** supprimé pour " + msg.author)
                const embed = new Discord.RichEmbed()
                WebhookPublic.send(embed
                    .setColor(10038562)
                    .setDescription("Rôle **Liens [Accès]** supprimé pour "+ msg.author)
                    .setThumbnail(msg.author.displayAvatarURL)
                )
            } else {
                msg.member.addRole(Liens).catch(console.error)
                msg.channel.send('Vous avez accès aux <#399602969810829312>, proposez des articles et des nouveautés à nous faire découvrir !')
                .then(m => { setTimeout(() => { m.delete() }, 10000) })
                WebhookLogs.send("Rôle **Liens [Accès]** ajouté pour " + msg.author)
                const embed = new Discord.RichEmbed()
                WebhookPublic.send(embed
                    .setColor(10038562)
                    .setDescription("Rôle **Liens [Accès]** ajouté pour "+ msg.author)
                    .setThumbnail(msg.author.displayAvatarURL)
                )
            }
        };

        if(msg.content === prefix + 'musiques') {
            if(msg.guild.member(bot.user).hasPermission("MANAGE_MESSAGES")){msg.delete(msg.author).catch (e => console.error("ℹ Optionnel : Le robot n'a pas la permission de supprimer la commande faite par l'utilisateur."))}; 
            if(msg.member.roles.has(Musiques)) {
                msg.member.removeRole(Musiques).catch(console.error)
                msg.channel.send("Vous n'avez plus accès au **channel des musiques**.")
                .then(m => { setTimeout(() => { m.delete() }, 10000) })
                WebhookLogs.send("Rôle **Musiques [Accès]** supprimé pour " + msg.author)
                const embed = new Discord.RichEmbed()
                WebhookPublic.send(embed
                    .setColor(10038562)
                    .setDescription("Rôle **Musiques [Accès]** supprimé pour "+ msg.author)
                    .setThumbnail(msg.author.displayAvatarURL)
                )
            } else {
                msg.member.addRole(Musiques).catch(console.error)
                msg.channel.send('Vous avez accès aux <#478578178672164874>, proposez vos musiques à nous faire écouter !')
                .then(m => { setTimeout(() => { m.delete() }, 10000) })
                WebhookLogs.send("Rôle **Musiques [Accès]** ajouté pour " + msg.author)
                const embed = new Discord.RichEmbed()
                WebhookPublic.send(embed
                    .setColor(10038562)
                    .setDescription("Rôle **Musiques [Accès]** ajouté pour "+ msg.author)
                    .setThumbnail(msg.author.displayAvatarURL)
                )
            }
        };

        if(msg.content === prefix + 'thegate') {
            if(msg.guild.member(bot.user).hasPermission("MANAGE_MESSAGES")){msg.delete(msg.author).catch (e => console.error("ℹ Optionnel : Le robot n'a pas la permission de supprimer la commande faite par l'utilisateur."))}; 
            if(msg.member.roles.has(TheGate)) {
                msg.member.removeRole(TheGate).catch(console.error)
                msg.channel.send("Vous n'avez plus accès à la **catégorie de The Gate**.")
                .then(m => { setTimeout(() => { m.delete() }, 10000) })
                WebhookLogs.send("Rôle **The Gate [Accès]** supprimé pour " + msg.author)
                const embed = new Discord.RichEmbed()
                WebhookPublic.send(embed
                    .setColor(10038562)
                    .setDescription("Rôle **The Gate [Accès]** supprimé pour "+ msg.author)
                    .setThumbnail(msg.author.displayAvatarURL)
                )
            } else {
                msg.member.addRole(TheGate).catch(console.error)
                msg.channel.send('Vous avez accès à <#416001338929971201> ainsi que <#416001389605683200>, proposez vos suggestions pour améliorer le projet.')
                .then(m => { setTimeout(() => { m.delete() }, 10000) })
                WebhookLogs.send("Rôle **The Gate [Accès]** ajouté pour " + msg.author)
                const embed = new Discord.RichEmbed()
                WebhookPublic.send(embed
                    .setColor(10038562)
                    .setDescription("Rôle **The Gate [Accès]** ajouté pour "+ msg.author)
                    .setThumbnail(msg.author.displayAvatarURL)
                )
            }
        };
        if(msg.content === prefix + 'feed') {
            if(msg.guild.member(bot.user).hasPermission("MANAGE_MESSAGES")){msg.delete(msg.author).catch (e => console.error("ℹ Optionnel : Le robot n'a pas la permission de supprimer la commande faite par l'utilisateur."))}; 
            if(msg.member.roles.has(Feed)) {
                msg.member.removeRole(Feed).catch(console.error)
                msg.channel.send("Vous n'avez plus accès au channel des **flux RSS**.")
                .then(m => { setTimeout(() => { m.delete() }, 10000) })
                WebhookLogs.send("Rôle **Feed [Accès]** supprimé pour " + msg.author)
                const embed = new Discord.RichEmbed()
                WebhookPublic.send(embed
                    .setColor(10038562)
                    .setDescription("Rôle **Feed [Accès]** supprimé pour "+ msg.author)
                    .setThumbnail(msg.author.displayAvatarURL)
                )
            } else {
                msg.member.addRole(Feed).catch(console.error)
                msg.channel.send("Vous avez accès au channel des **flux RSS** qui se trouve dans <#527127902819581967>")
                .then(m => { setTimeout(() => { m.delete() }, 10000) })
                WebhookLogs.send("Rôle **Feed [Accès]** ajouté pour " + msg.author)
                const embed = new Discord.RichEmbed()
                WebhookPublic.send(embed
                    .setColor(10038562)
                    .setDescription("Rôle **Feed [Accès]** ajouté pour "+ msg.author)
                    .setThumbnail(msg.author.displayAvatarURL)
                )
            }
        };

        if(msg.content === prefix + 'lg') {
            if(msg.guild.member(bot.user).hasPermission("MANAGE_MESSAGES")){msg.delete(msg.author).catch (e => console.error("ℹ Optionnel : Le robot n'a pas la permission de supprimer la commande faite par l'utilisateur."))};
            if(msg.member.roles.has(LoupsGarous)) {
                msg.member.removeRole(LoupsGarous).catch(console.error)
                msg.channel.send("Vous n'avez plus accès au **channel du village**.")
                    .then(m => { setTimeout(() => { m.delete() }, 10000) })
                WebhookLogs.send("Rôle **🐺** supprimé pour " + msg.author)
                const embed = new Discord.RichEmbed()
                WebhookPublic.send(embed
                    .setColor(10038562)
                    .setDescription("Rôle **🐺** supprimé pour "+ msg.author)
                    .setThumbnail(msg.author.displayAvatarURL)
                )
            } else {
                msg.member.addRole(LoupsGarous).catch(console.error)
                msg.channel.send('Vous avez accès au channel vocal de ~~la meute~~ du village, soyez vigilants !')
                    .then(m => { setTimeout(() => { m.delete() }, 10000) })
                WebhookLogs.send("Rôle **🐺** ajouté pour " + msg.author)
                const embed = new Discord.RichEmbed()
                WebhookPublic.send(embed
                    .setColor(10038562)
                    .setDescription("Rôle **🐺** ajouté pour "+ msg.author)
                    .setThumbnail(msg.author.displayAvatarURL)
                )
            }
        };

        // -- Mise en cache des membres --
        if (!(msg.author.id in userCache)) {
            userCache[msg.author.id] = {
                username: msg.author.username,
                identifier: msg.author.toString(),
                last_msg_timestamp: 0
            }
        };

        // --- Filtre contre les liens Discord ---
        if(msg.content.includes('discord.gg') || msg.content.includes('discordapp.com/invite') || msg.content.includes('discord.me')) {
            if(msg.member.hasPermission('MANAGE_MESSAGES')) return    
            if(msg.guild.member(bot.user).hasPermission("MANAGE_MESSAGES")){msg.delete(msg.author).catch (e => console.error("ℹ Optionnel : Le robot n'a pas la permission de supprimer la commande faite par l'utilisateur."))}; 
            console.log(msg.author.tag + " (" + msg.author + ") a fait une publicité Discord.")
            WebhookLogs.send(":x:" + msg.author.tag + "(" + msg.author + ") a fait une publicité Discord.\nMessage : " + msg.content)
            WebhookPublic.send(":x:" + msg.author.tag + "(" + msg.author + ") a fait une publicité Discord.\nMessage : " + msg.content)
            msg.reply(' merci de revoir les <#399600870804684803> . Les liens discord sont interdits.')
                .then(m => { setTimeout(() => { m.delete() }, 10000) })
        };
        // ---- Anti spam ----
        if (msg.createdTimestamp - userCache[msg.author.id].last_msg_timestamp <= 190) {
            if (msg.member.hasPermission('MANAGE_MESSAGES')) return
            if (!cache.active_warning) {
                console.log("✖ Rôle Muté".red +  " de "  + msg.author.username + " #"+ msg.author.discriminator + " (" + msg.author + ")")
                WebhookLogs.send(":x:" + msg.author.tag + " (" + msg.author + ") a été muté suite à un spam.")
                WebhookPublic.send(":x:" + msg.author.tag + " (" + msg.author + ") a été muté suite à un spam.")
                msg.reply("le spam, c'est mal !")
                const RoleMuted = msg.guild.roles.find(x => x.id === Muted)
                cache.active_warning = msg.member.addRole(RoleMuted)
                .catch(e  => console.error('Erreur des permissions pour donner le rôle Muté.') + console.error(e))
                .then((msg) => {
                    setTimeout(() => {
                        cache.active_warning = false
                    }, 2000)
                });
            }
            return
        };

        // --- Commande uptime (réservé à ceux qui ont la permission de gérer les messages) ---
        if (msg.content === prefix + 'uptime'){
            if(msg.channel.recipient) return
            if(!msg.member.hasPermission('MANAGE_MESSAGES')) return
            const embed = {
            "author": {
                "name": "🔌 Uptime",
                "url": "https://www.thomasbnt.fr"
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

       // --- Commande ping (réservé à ceux qui ont la permission de gérer les messages) ---
       if (msg.content === prefix + 'ping') {
            if(msg.guild.member(bot.user).hasPermission("MANAGE_MESSAGES")){msg.delete(msg.author).catch (e => console.error("ℹ Optionnel : Le robot n'a pas la permission de supprimer la commande faite par l'utilisateur."))}; 
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
        };

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
        
        userCache[msg.author.id].last_msg_timestamp = msg.createdTimestamp

});

bot.login(config.token)
    .catch(e => console.error(e.message));
