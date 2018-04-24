const date = require('./formatTime')();
const chalk = require('chalk');

Object.defineProperties(console, {
    error: {
        value: (errMessage = '') => {
            return console.log(chalk`{hex('#9F0514') ❌ ${date} Erreur : ${errMessage}}`);
            },
        writable: true
    },
    info: {
        value: (logMessage = '') => {
            return console.log(chalk`{hex('#123456') ❕ ${date} Info : ${logMessage}}`);
        },
        writable: true
    },
    success: {
        value: (successMessage = '') => {
            return console.log(chalk`{hex('#007300') ✔️ ${date} Validé : ${successMessage}}`);
        },
        writable: true
    },
    warn: {
        value: (warnMessage = '') => {
            return console.log(chalk`{hex('#F36400') ⚠ ${date} Attention : ${warnMessage}}`);
        },
        writable: true
    },
    cmd: {
        value: (cmd, auteur) => {
            return console.log(
                chalk`{hex('#AD1457') ⚙ ${date} Commande exécutée : ${cmd} par} {hex('#2406A5') ${auteur}}`
            );
        },
        writable: true
    },
    join: {
        value: (member = '') => {
            return console.log(chalk`{hex('#179F3C') >_ ${date} ${member.user.tag} vient de rejoindre le serveur}`);
        },
        writable: true
    },
    leave: {
        value: (member = '') => {
            return console.log(chalk`{hex('#CC0909') >_ ${date} ${member.user.tag} vient de quitter le serveur}`);
        }
    },
    promiseRejected: {
        value: (r, p = '') => {
            return console.log(chalk`{bgHex('#13C176') hex('#960B12') ❌ Promesse rejetée ❌ ${r} à l'endroit ${r}}`)
        },
        writable: true
    }
});