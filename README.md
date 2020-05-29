
[![Discord](https://img.shields.io/discord/367753345575944221?color=%237289DA&label=Nous%20rejoindre&logo=Discord&logoColor=white&style=for-the-badge)](https://thomasbnt.fr/discord)

[![GNU GPL v3.0](https://flat.badgen.net/github/license/thomasbnt/Bord-Pi)](LICENSE)
[![Maintainability](https://api.codeclimate.com/v1/badges/b0bf1aab3e4bfb75b16e/maintainability)](https://codeclimate.com/github/thomasbnt/Bord-Pi/maintainability)
[![Voir les Releases](https://flat.badgen.net/github/release/thomasbnt/Bord-Pi)](https://github.com/thomasbnt/Bord-Pi/releases)
![Date du dernier commit](https://flat.badgen.net/github/last-commit/thomasbnt/Bord-Pi)

____

## I Introduction

**Version NodeJS > 12**

*Propre, rapide, beau, simple d'utilisation et de modification.*

**Bord Pi** est un robot Discord qui fonctionne avec l'API Discord et Discord.js, paramétré en fonction du serveur Discord [**La Hype_**](https://thomasbnt.fr/discord) .

> ⚠ Toutes les configurations sont spécialement pour le serveur où se trouve ce robot (La Hype_). Si vous le testez, vous aurez sûrement des erreurs si vous n'avez pas modifié les ID des channels.

<img src="bordpi.png" alt="Logo Bord Pi" align="right" />

## II Les intégrations

- Le robot comporte un système de **rôles d'accès**, un exemple est donné sur `mrrobot.js` et sert à se procurer un rôle qui, par la suite vous débloque des accès a certains channels suivant votre configuration du serveur.

- Un **filtre contre les liens Discord**, vous pouvez bien évidemment lui ajouter l'ID du channel de publicité dans `IDAdsChannel`. Le robot ne fera rien dans ce channel en question.

- Un **système de logs** interne via Webhooks.

- Un **message de bienvenue personnalisé**, avec un système qui vérifie si le compte du nouvel arrivant est bien enregistré ou non en comparant si son avatar est par défaut, et si il se trouve que cette avatar est par defaut, il démontre comment s'en procurer un en renvoyant sur le support de Discord. 

- Besoin d'une aide particulière auprès d'un rôle? Dès que **le rôle est notifié**, le robot confirme que cela a bien été reçu et lui renvoie un message de rappel, par exemple de revoir la FAQ si jamais ça pourrait résoudre son soucis.

- Quelques commandes destiné pour l'équipe. Et certaines sont là pour débugger. 

- Et d'autres commandes peu utiles comme `avatar.js`, `uptime.js` ou encore `ping.js`.

Pas mal de changements sur le code, nottament le rangement des fichiers, des logs plus propre et un code plus net.
Quand au niveau de la sécurité du robot, il vérifie la plupart du temps s'il peut faire les actions qui voudrait faire, s'il ne peut pas, il passe sans râler. 

```js
if (msg.guild.member(bot.user).hasPermission("MANAGE_MESSAGES")) {
    msg.delete(msg.author).catch(e => console.log(bot.ls.warning, "Le robot n'a pas la permission de supprimer la commande faite par l'utilisateur."))
}
```

## III Contributions

Les contributions sont toujours les bienvenues ! Lisez les règles pour les contributions avant de pouvoir y participer.

Veuillez vous assurer que votre demande de pull request respecte les lignes directrices suivantes :

- Rechercher des suggestions précédentes avant d'en faire une nouvelle, afin d'éviter les doublons.
- Les fichiers README suggérés devraient être beau ou se démarquer d'une manière ou d'une autre.
- Faire une demande de pull request individuelle pour chaque suggestion.
- De nouvelles catégories ou des améliorations à la catégorisation existante sont les bienvenues.
- Gardez les descriptions courtes et simples, mais descriptives.
- Commencez la description avec une capitale et terminez par un arrêt/période complet.
- Vérifiez votre orthographe et votre grammaire.
- Assurez-vous que votre éditeur de texte est configuré pour supprimer les espaces de fin.

Merci pour vos suggestions !

## IV Les codes couleurs

| **Principaux**  | PrimaryColor | DangerColor | InfoColor | SuccessColor |  BlackColor | 
|---------|------------|----------|----------|----------|----------|
| **Code Hexadécimal** | `#E74C3C`   | `#B20000`  | `#6897BB`  | `#47b60f` | `#36393F` |

Pour les utiliser : `bot.config.PrimaryColor`, récupère la couleur primaire.

## V Informations complémentaires

L'image a été modifié par [Thomas Bnt](https://github.com/thomasbnt), veuillez donc à ne pas l'utiliser publiquement et/ou commercialement. 
Initialement, elle appartient à [Raspberry Pi](https://www.raspberrypi.org/trademark-rules/). 


