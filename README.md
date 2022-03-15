
[![Discord](https://img.shields.io/discord/367753345575944221?color=%237289DA&label=Nous%20rejoindre&logo=Discord&logoColor=white&style=for-the-badge)](https://thomasbnt.dev/discord)

[![GNU GPL v3.0](https://flat.badgen.net/github/license/thomasbnt/Bord-Pi)](LICENSE)
[![Voir les Releases](https://img.shields.io/github/v/release/thomasbnt/Bord-Pi?color=6897BB&include_prereleases&style=for-the-badge)](https://github.com/thomasbnt/Bord-Pi/releases)
![GitHub last commit](https://img.shields.io/github/last-commit/thomasbnt/bord-Pi?style=for-the-badge)
____

## I Introduction

> ⚠ Cette branche est en cours de développement. Vous pouvez y contribuer en forkant le projet et en faisant un Pull Request.

Vous y trouverez la **[TODOLIST](/TODOLIST.md)**

> ⚠ Vérifiez que votre **Version NodeJS** est supérieure à **16**.

*Propre, rapide, beau, simple d'utilisation et de modification.*

**Bord Pi** est un robot Discord qui fonctionne avec l'API Discord et Discord.js, paramétré en fonction du serveur Discord de [**Thomas Bnt**](https://thomasbnt.dev/discord). Il est néanmoins accessible et facilement possible à le paramétrer à votre façon pour votre propre serveur.

> ⚠ Toutes les configurations sont spécialement pour le serveur où se trouve ce robot. Si vous le testez, vous aurez sûrement des erreurs si vous n'avez pas modifié les ID des salons.

<img src="bordpi.png" alt="Logo Bord Pi" align="right" />

## II Nouveautés (février 2022)

La **version 3** de Bord Pi ajoute la dernière fonctionnalité de Discord : les **Slash Commands**.
Plus aucun préfixe n'est nécessaire pour les commandes.

- [x] Slash Commands
- [x] Commandes de base
- [x] Commandes de moderation
- [x] Logs

## III Les intégrations

- Le robot comporte un système de **rôles d'accès**, un exemple est donné sur `dev.js` et sert à se procurer un rôle qui, par la suite vous débloque des accès a certains channels suivant votre configuration du serveur.
- Un **filtre contre les liens Discord**, vous pouvez bien évidemment lui ajouter l'ID du channel de publicité dans `IDAdsChannel`. Le robot ne fera rien dans ce channel en question.
- Un **système de logs** interne via Webhooks.
- Un **message de bienvenue personnalisé**.
- Besoin d'une aide particulière auprès d'un rôle ? Dès que **le rôle est notifié**, le robot confirme que cela a bien été reçu et lui renvoie un message de rappel, par exemple de revoir la FAQ si jamais ça pourrait résoudre son soucis.

Pas mal de changements sur le code, notamment le rangement des fichiers, des logs plus propre et un code plus net.
Quant au niveau de la sécurité du robot, il vérifie la plupart du temps s'il peut faire les actions qui voudrait faire, s'il ne peut pas, il passe sans râler. 

```js
if (msg.guild.member(bot.user).hasPermission("MANAGE_MESSAGES")) {
    msg.delete(msg.author).catch(e => console.log(bot.ls.warning, "Le robot n'a pas la permission de supprimer la commande faite par l'utilisateur."))
}
```

## IV Les permissions

Le robot doit avoir les **Intents privilégié** suivant :

- [x] Server members
- [x] Message content

Sans ces intents, le robot ne fonctionnera pas.
Quand vous l'ajouterez sur votre propre serveur, n'oubliez pas de le mettre en privé et de lui donner les permissions suivantes :

- [x] Manage Roles
- [x] Kick members
- [x] Ban members
- [x] Read Messages/View Channels
- [x] Moderate Members
- [x] Send Messages
- [x] Manage Messages
- [x] Embed links
- [x] Attach files
- [x] Read message history
- [x] Add reactions

## V Comment le faire fonctionner

1. Assurez-vous d'avoir la version de **NodeJS** supérieure à **16.6.0**.
2. Installez les dépendences avec un coup de `npm install` ou `yarn add`.
3. Copiez le fichier `config.exemple.json` en `config.json`.
4. Remplissez les configurations dans `config.json`.
5. Enregistrez vos Apps Commandes _aka_ Slash commands sur votre serveur avec `npm run deploy`.
6. Vous pouvez désormais allumer votre robot avec `npm run start`.

## VI Contributions

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

## VII Les codes couleurs

| **Principaux**  | PrimaryColor | DangerColor | InfoColor | SuccessColor |  BlackColor | 
|---------|------------|----------|----------|----------|----------|
| **Code Hexadécimal** | `#E74C3C`   | `#B20000`  | `#6897BB`  | `#47b60f` | `#36393F` |

Pour les utiliser : `bot.config.PrimaryColor`, récupère la couleur primaire.

## VII Informations complémentaires

L'image a été modifiée par [Thomas Bnt](https://github.com/thomasbnt), veuillez donc à ne pas l'utiliser publiquement et/ou commercialement. 
Initialement, elle appartient à [Raspberry Pi](https://www.raspberrypi.org/trademark-rules/). 


