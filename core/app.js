const Discord = require('discord.js');
const colors = require('./consoleColors');
const config = require('./config') || 'ok';
const {oneLine, stripIndents} = require('common-tags');

const bot = new Discord.Client({
    autoReconnect: true
});

// ---------------------- Couleur par défaut ----------------------
const color = 10038562;

function updatePresence() {
    bot.user.setActivity(bot.guilds.reduce((mem, g) => mem += g.memberCount, 0) + " utilisateurs | /bord", {type: "WATCHING"})
}

process.on('error', e => {
    console.error(e);
});

 // ---------------------- Si erreur de promise ---------------------------
process.on('unhandledRejection', (r, p) => {
    console.promiseRejected(r, p);
});

  // ---------------------- Robot lancé sans erreur ----------------------
bot.on('ready', () => {
    updatePresence()
    console.info(stripIndents`
    Connecté en tant que ${bot.user.tag} avec le préfixe '${config.prefix}'

    Nombre d'utilisateurs totaux : ${bot.users.size}
    Nombre de channels : ${bot.channels.size}
    Nomre d'émojis totaux : ${bot.emojis.size
    }`);
});

bot.on("guildMemberAdd", (member) => {
    updatePresence()
    console.join(member);
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
   ChannelGeneral.send({ embed });
});

bot.on('guildMemberRemove', member => {
    updatePresence()
    console.leave(member);
});


// ---------------------- Messages ----------------------
bot.on('message', async msg => {
   try {
       if (msg.author.bot) return;

       const {prefix, webhook, Mr_Robot} = config;
       const hook = new Discord.WebhookClient(webhook.id, webhook.token);
       let isCmd;
       const antiSpam = new Discord.Collection();

       if (!msg.content.startsWith(prefix)) return;

       const cmd = msg.content.split('').splice(prefix.length).join('').split(' ')[0];
       let args = msg.content.split(' ').splice(1);


       /**
        *
        * @param {String} cmd - La commande exécutée (mrrobot ou thegate)
        * @param {Boolean} hasRole - Si il a le rôle
        * @returns {Promise<void>}
        *
        */
       const changeRole = async (cmd, hasRole) => {
           try {
               if (cmd === 'mrrobot') {
                   hasRole ? msg.member.roles.remove(Mr_Robot) : msg.member.roles.add(Mr_Robot);

                   const MrRobotEmbedRole = new Discord.MessageEmbed()
                       .setColor(7419530)
                       .setFooter(`Demandé par ${msg.author.tag}`)
                       .setAuthor(oneLine`Vous vous êtes bien ${hasRole ? 'retiré' : 'donné'}
                       le rôle ${msg.guild.roles.get(Mr_Robot).name}`, msg.author.displayAvatarURL());

                   await msg.channel.send(MrRobotEmbedRole);
               }

               //if (cmd === 'thegate') {
                   //hasRole ? msg.member.roles.remove(TheGate) : msg.member.roles.add(TheGate);

                  //const TheGateEmbedRole = new Discord.MessageEmbed()
                       //.setColor(2067276)
                       //.setFooter(`Demandé par ${msg.author.tag}`)
                        //.setAuthor(oneLine`Vous vous êtes bien ${hasRole ? 'retiré' : 'donné'}
                        //le rôle ${msg.guild.roles.get(TheGate).name}`, msg.author.displayAvatarURL());

                    //await msg.channel.send(TheGateEmbedRole);
                //}
           } catch (e) {
               console.error(e.message);
           }
       };

       switch(cmd) {
          // ---------------------- Commande bord ----------------------
           case 'bord':
               if (msg.channel.type !== 'text') break;

               const bordEmbed = new Discord.MessageEmbed()
                   .setTitle(`BORD Pi | Panel d'aide et d'information`)
                   .setColor(color)
                   //.setThumbnail(bot.user.displayAvatarURL())
                   .setDescription(oneLine`Un robot gérant et aidant les utilisateurs pour le serveur **La Hype_**.
                   Il est [Open Source](https://github.com/thomasbnt/Bord-Pi), toute personne peut participer au projet
                   et l'améliorer. Suivez simplement le protocole afin de le modifier.`)
                   .addField(`▪ ${prefix}mrrobot`,
                       `Vous **serez notifié** à chaque mise à jour du projet \`Mr. Robøt\``)
                    //.addField(`▪ ${prefix}thegate`,
                        //oneLine`Vous **aurez accès à la catégorie et vous serrez notifié pour le projet** \`The Gate\`.
                        //Vous pourrez donc suggérer une idée et suivre les mises à jour.`)
                   .addField(`Les liens utiles`,
                       oneLine`[Serveur Discord](https://discord.gg/9gcxwVY)
                       • [Me soutenir](https://www.patreon.com/thomasbnt)
                       • [Site web](https://thomasbnt.fr/)
                       • [Code Source](https://github.com/thomasbnt/Bord-Pi)`);

               await msg.channel.send(bordEmbed);
               console.cmd(cmd, msg.author.tag);
               break;
               // ---------------------- Commande ping ----------------------
                case 'ping':
                    if (msg.channel.type !== 'text') break;
                    if (!msg.member.hasPermission('MANAGE_MESSAGES')) break

                  const PingEmbed = new Discord.MessageEmbed()
                  .setColor(color)
                  .setAuthor(`Ping de ${Math.floor(bot.ping)} ms`, msg.author.displayAvatarURL())
                  console.cmd(cmd, msg.author.tag);

                    await msg.channel.send(PingEmbed);
                    break;
            // ---------------------- Commande uptime ----------------------
             case 'uptime':
                 if (msg.channel.type !== 'text') break;
                 if (!msg.member.hasPermission('MANAGE_MESSAGES')) break

               const UptimeEmbed = new Discord.MessageEmbed()
               .setColor(color)
               .setAuthor("En ligne depuis " + (Math.round(bot.uptime / (1000 * 60 * 60))) + 'h  ' + (Math.round(bot.uptime / (1000 * 60)) % 60) + 'min ' + (Math.round(bot.uptime / 1000) % 60) + 's', msg.author.displayAvatarURL())
                 console.cmd(cmd, msg.author.tag);

                 await msg.channel.send(UptimeEmbed);
                 break;
          // ---------------------- Commande mrrobot ----------------------
           case 'mrrobot':
               if (msg.channel.type !== 'text') break;

               await changeRole(cmd, msg.member.roles.has(Mr_Robot));
               console.cmd(cmd, msg.author.tag);
               break;
          // ---------------------- Commande thegate ----------------------
            //case 'thegate':
               // if (msg.channel.type !== 'text') break;

                //await changeRole(cmd, msg.member.roles.has(TheGate));
                //console.cmd(cmd, msg.author.tag);
                //break;
       }
   } catch (e) {
       console.error(e.message);
   }
});

bot.login(config.token)
    .catch(e => console.error(e.message));
