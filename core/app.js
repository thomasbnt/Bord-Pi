const Discord = require('discord.js');
const colors = require('./consoleColors');
const config = require('./config') || 'ok';
const {oneLine, stripIndents} = require('common-tags');

const bot = new Discord.Client({
    autoReconnect: true
});

process.on('error', e => {
    console.error(e);
});

/*
Si erreur de promise
 */
process.on('unhandledRejection', (r, p) => {
    console.promiseRejected(r, p);
});

/*
Bot lancé sans erreur
 */
bot.on('ready', () => {
    console.success(`${bot.user.tag} lancé `);
});

bot.on('guildMemberAdd', member => {
    console.join(member);
});

bot.on('guildMemberRemove', member => {
    console.leave(member);
});

bot.on('message', async msg => {
   try {
       if (msg.author.bot) return;

       const {prefix, webhook, TheGate, Mr_Robot} = config;
       const hook = new Discord.WebhookClient(webhook.id, webhook.token);
       let isCmd;
       const antiSpam = new Discord.Collection();

       const cmd = msg.content.split('').splice(prefix.length).join('').split(' ')[0];
       let args = msg.content.split(' ').splice(1);

       const color = 10038562;

       /**
        *
        * @param {String} cmd - La commande exécutée (mrrobot ou thegate)
        * @param {Boolean} hasRole - Si il a le rôle
        * @returns {Promise<void>}
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

               if (cmd === 'thegate') {
                   hasRole ? msg.member.roles.remove(TheGate) : msg.member.roles.add(TheGate);

                   const TheGateEmbedRole = new Discord.MessageEmbed()
                       .setColor(2067276)
                       .setFooter(`Demandé par ${msg.author.tag}`)
                       .setAuthor(oneLine`Vous vous êtes bien ${hasRole ? 'retiré' : 'donné'}
                       le rôle ${msg.guild.roles.get(TheGate).name}`, msg.author.displayAvatarURL());

                   await msg.channel.send(TheGateEmbedRole);
               }
           } catch (e) {
               console.error(e.message);
           }
       };

       switch(cmd) {
           //Commande bord
           case 'bord':
               if (msg.channel.type !== 'text') break;

               //Création de l'embed
               const bordEmbed = new Discord.MessageEmbed()
                   .setTitle(`BORD Pi`)
                   .setColor(color)
                   .setThumbnail(bot.user.displayAvatarURL())
                   .setDescription(oneLine`Un robot gérant et aidant les utilisateurs pour le serveur **La Hype_**.
                   Il est [Open Source](https://github.com/thomasbnt/Bord-Pi), toute personne peut participer au projet
                   et l'améliorer. Suivez simplement le protocole afin de le modifier`)
                   .addField(`▪ ${prefix}mrrobot`,
                       `Vous **serez notifié** à chaque mise à jour du projet \`Mr_Robot.\``)
                   .addField(`▪ ${prefix}thegate`,
                       oneLine`Vous **aurez accès à la catégorie** \`The Gate\`.
                       Vous pourrez donc suggérer une idée et suivre les mises à jour.`)
                   .addField(`Les liens utiles`,
                       oneLine`[Serveur Discord](https://discord.gg/9gcxwVY)
                       • [Me soutenir](https://www.patreon.com/thomasbnt)
                       • [Site web](https://mrrobot.thomasbnt.fr/)
                       • [Code Source](https://github.com/thomasbnt/Bord-Pi)`);

               await msg.channel.send(bordEmbed);
               break;

           case 'mrrobot':
               if (msg.channel.type !== 'text') break;

               await changeRole(cmd, msg.member.roles.has(Mr_Robot));
               break;

           case 'thegate':
               if (msg.channel.type !== 'text') break;

               await changeRole(cmd, msg.member.roles.has(TheGate));
               break;
       }
   } catch (e) {
       console.error(e.message);
   }
});

bot.login(config.token)
    .catch(e => console.error(e.message));