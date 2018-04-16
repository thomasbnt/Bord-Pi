const Discord = require('discord.js');
const bot = new Discord.Client({
  autoReconnect: true
});
const colors = require("colors");
const consola = require('consola')
const fs = require('fs')
const path = require('path')

// -- Charger les fichiers de configuration --
try {
    var config = JSON.parse(fs.readFileSync(path.join(__dirname, '.', 'config.json'), 'utf8'))
} catch (err) {
    if (err) throw Error("La configuration n'est pas accessible".red)
}


// ------------- Variables de config  ----------------
let prefix = config.prefix
let help = config.help
let token = config.token
let IdTheGate = config.IdTheGate
let IdMrRobot = config.IdMrRobot
let cmdexe = "Commande exécutée : ".red;
// ---------------------------------------------------
var hookArray1 = config.hookArray1
var hookArray2 = config.hookArray2
// ---------------------------------------------------
const hook = new Discord.WebhookClient(hookArray1, hookArray2);
var hookArray = [hookArray1,hookArray2];
// ---------------------------------------------------
let cache = {
  active_warning: false,
  user_cache: {}
}
let userCache = cache.user_cache
// ---------------------------------------------------
function checkDays(date) {
    let now = new Date();
    let diff = now.getTime() - date.getTime();
    let days = Math.floor(diff / 86400000);
    return days + (days == 1 ? " jour" : " jours");
  }

// ---------------------- Update Presence ----------------------

function updatePresence() {
    bot.user.setPresence({
            status: 'online',
            game : {
                name: prefix + "bord"
            }
    })
}

// ---------------------- READY ----------------------
bot.on('ready', () => {
    updatePresence()
    console.log("");
    consola.start("Connecté en tant que " + bot.user.username.red + " avec le prefix '" + prefix.red + "'");
    console.log("");
    consola.start("Nombres d'utilisateurs totaux :    ".magenta +  bot.guilds.reduce((mem, g) => mem += g.memberCount, 0));
    consola.start("Nombres de channels :              ".green + bot.channels.size);
    consola.start("Nombre d'émojis totaux :           ".cyan + bot.emojis.size);
    console.log("");

});

// ---------------------- Ajout/Suppressions d'un user dans un serveur ----------------------
bot.on("guildMemberAdd", (member) => {
    updatePresence()
	consola.info(`>_ ${member.user.username}#${member.user.discriminator} a rejoint le serveur`.green);
});

bot.on("guildMemberRemove", (member) => {
    updatePresence()
    consola.info(`>_ ${member.user.username}#${member.user.discriminator} a quitté le serveur`.red);
});


// ---------------------- COEUR DU ROBOT ----------------------

bot.on('message', (msg) => {

    // -- Si le message vient du bot alors passer --

    if (msg.author.bot) return;

   // --- Commande bord | help ---
    if (msg.content === prefix + "bord") {
        if(msg.channel.recipient) return
        hook.send("**" + prefix + "bord** - De ``" + msg.author.username + "#"+ msg.author.discriminator + "``");
        const embed = {
        "color": 10038562,
        "title": "BORD Pi | Panel d'aide.",
        "description": "Un robot gérant et aidant les utilisateurs pour le serveur **La Hype_**.\nIl est [Open Source](https://github.com/thomasbnt/Bord-Pi), toute personne peut participer au projet et l'améliorer. Suivez simplement le protocole afin de le modifier.",
        "thumbnail": {
          "url": bot.user.displayAvatarURL
        },
        "fields": [
          {
            "name": ":black_small_square: " + prefix + "mrrobot [on/off]",
            "value": "Vous **serez notifié de chaque mise à jour** du projet `Mr_Robot`. ",
            "inline": false
        },
          {
            "name": ":black_small_square: " + prefix + "thegate [on/off]",
            "value": "Vous **aurez accès à la catégorie** `The Gate`. Vous pourrez donc suggérer une idée et suivre les mises à jour.",
            "inline": false
          },
          {
              "name": "Les liens utiles",
              "value": "[Serveur Discord](https://discord.gg/9gcxwVY) • [Me soutenir](https://www.patreon.com/thomasbnt) • [Site web](https://mrrobot.thomasbnt.fr/) • [Code Source](https://github.com/thomasbnt/Bord-Pi)",
              "inline": false
          }
        ]
        };
        msg.channel.send({ embed });
            consola.info(cmdexe + " bord ".yellow +  " de "  + msg.author.username + " #"+ msg.author.discriminator + "  (" + msg.author + ")")
            return
    };

    // --- Commande  Ping  ---
    if (msg.content === prefix + "ping"){
        if(msg.channel.recipient) return
        if (!msg.member.hasPermission('MANAGE_MESSAGES')) return
        consola.info(cmdexe + " ping ".magenta +  " de "  + msg.author.username + " #"+ msg.author.discriminator + " (" + msg.author + ")")
        hook.send("**"+ prefix + "ping** - De ``" + msg.author.username + "#"+ msg.author.discriminator + "``");
        const embed = {
          "color": 10038562,
          "author": {
            "name": "Ping de " + Math.floor(bot.ping) + " ms !"
          },
            "footer": {
              "icon_url": msg.author.avatarURL,
              "text": "Demandé par " + msg.author.username
          }
        };
        msg.channel.send({ embed });
    };

    //--- Commande uptime ---
    if(msg.content === prefix + 'uptime'){
      if(msg.channel.recipient) return
      if (!msg.member.hasPermission('MANAGE_MESSAGES')) return
      const embed = {
        "color": 10038562,
        "author": {
          "name": "En ligne depuis " + (Math.round(bot.uptime / (1000 * 60 * 60))) + 'h  ' + (Math.round(bot.uptime / (1000 * 60)) % 60) + 'min ' + (Math.round(bot.uptime / 1000) % 60) + 's'
        },
          "footer": {
            "icon_url": msg.author.avatarURL,
            "text": "Demandé par " + msg.author.username
        }
      };
      msg.channel.send({ embed });
      consola.info(cmdexe + " uptime ".magenta +  " de "  + msg.author.username + " #"+ msg.author.discriminator + " (" + msg.author + ")")
      hook.send("**"+ prefix + "uptime** - De ``" + msg.author.username + "#"+ msg.author.discriminator + "``");
    }

    // -- The Gate Access --
    if (msg.content === prefix + "thegate on"){
        var RoleTheGate = msg.guild.roles.get(config.IdTheGate)
        if(msg.channel.recipient) return
        if (!msg.member.roles.has(RoleTheGate)){
          msg.member.addRole(RoleTheGate)
        }
        const embed = {
          "color": 2067276,
          "author": {
            "name": "Vous êtes désormais inscrit aux nouveautés de The Gate."
          },
            "footer": {
              "icon_url": msg.author.avatarURL,
              "text": "Demandé par " + msg.author.username
          }
        };
        msg.channel.send({ embed });
        consola.info(cmdexe + " thegate on".magenta +  " de "  + msg.author.username + " #"+ msg.author.discriminator + " (" + msg.author + ")")
        hook.send("**"+ prefix + "thegate on** - De ``" + msg.author.username + "#"+ msg.author.discriminator + "``");
    };

    if (msg.content === prefix + "thegate off"){
        var RoleTheGate = msg.guild.roles.get(config.IdTheGate)
        if(msg.channel.recipient) return
        if (!msg.member.roles.has(RoleTheGate)){
          msg.member.removeRole(RoleTheGate)
        }
        const embed = {
          "color": 2067276,
          "author": {
            "name": "Vous êtes désormais désinscrit aux nouveautés de The Gate."
          },
            "footer": {
              "icon_url": msg.author.avatarURL,
              "text": "Demandé par " + msg.author.username
          }
        };
        msg.channel.send({ embed });
        consola.info(cmdexe + " thegate off".magenta +  " de "  + msg.author.username + " #"+ msg.author.discriminator + " (" + msg.author + ")")
        hook.send("**"+ prefix + "thegate off** - De ``" + msg.author.username + "#"+ msg.author.discriminator + "``");
    };


    // -- Mr_Robot Access --
    if (msg.content === prefix + "mrrobot on"){
        var RoleMrRobot = msg.guild.roles.get(config.IdMrRobot)
        if(msg.channel.recipient) return
        if (!msg.member.roles.has(RoleMrRobot)){
          msg.member.addRole(RoleMrRobot)
        }
        const embed = {
          "color": 7419530,
          "author": {
            "name": "Vous êtes désormais inscrit aux nouveautés de Mr_Robot."
          },
            "footer": {
              "icon_url": msg.author.avatarURL,
              "text": "Demandé par " + msg.author.username
          }
        };
        msg.channel.send({ embed });
        consola.info(cmdexe + " mrrobot on".magenta +  " de "  + msg.author.username + " #"+ msg.author.discriminator + " (" + msg.author + ")")
        hook.send("**"+ prefix + "mrrobot on** - De ``" + msg.author.username + "#"+ msg.author.discriminator + "``");
    };

    if (msg.content === prefix + "mrrobot off"){
        var RoleMrRobot = msg.guild.roles.get(config.IdMrRobot)
        if(msg.channel.recipient) return
        if (!msg.member.roles.has(RoleMrRobot)){
          msg.member.removeRole(RoleMrRobot)
        }
        const embed = {
          "color": 7419530,
          "author": {
            "name": "Vous êtes désormais désinscrit aux nouveautés de Mr_Robot."
          },
            "footer": {
              "icon_url": msg.author.avatarURL,
              "text": "Demandé par " + msg.author.username
          }
        };
        msg.channel.send({ embed });
        consola.info(cmdexe + " mrrobot off".magenta +  " de "  + msg.author.username + " #"+ msg.author.discriminator + " (" + msg.author + ")")
        hook.send("**"+ prefix + "mrrobot off** - De ``" + msg.author.username + "#"+ msg.author.discriminator + "``");
    };


    // -- Met en cache les membres s'ils n'existent pas encore dans le cache --
    if (!(msg.author.id in userCache)) {
        userCache[msg.author.id] = {
            username: msg.author.username,
            identifier: msg.author.toString(),
            last_msg_timestamp: 0
        }
    }

    // ---- Anti spam ----
    if (msg.createdTimestamp - userCache[msg.author.id].last_msg_timestamp <= 200) {
        if(msg.channel.recipient) return
        if (msg.member.hasPermission('MANAGE_MESSAGES')) return
        if (!cache.active_warning) {
            consola.info("Rôle Muté".red +  " de "  + msg.author.username + " #"+ msg.author.discriminator + " (" + msg.author + ")")
            hook.send(":anger:  **Rôle Muté** - ``" + msg.author.username + " #"+ msg.author.discriminator + "``");
            var RoleMuté = msg.guild.roles.find("name","Muté")
            cache.active_warning = msg.member.addRole(RoleMuté)
              .catch(e  => consola.error('Erreur des permissions pour donner le rôle Muté.') + console.error(e))
              .then((msg) => {
                  setTimeout(() => {
                      cache.active_warning = false
                  }, 2000)
              });
        }
        return
    }

    // Updates last message timestamp for user
    userCache[msg.author.id].last_msg_timestamp = msg.createdTimestamp
});

bot.login(token);
