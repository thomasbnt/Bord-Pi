[![Discord](https://img.shields.io/discord/367753345575944221?color=%237289DA&label=Nous%20rejoindre&logo=Discord&logoColor=white?&style=for-the-badge)](https://thomasbnt.dev/discord)
[![Voir les Releases](https://img.shields.io/github/v/release/thomasbnt/Bord-Pi?color=6897BB&include_prereleases?&style=for-the-badge)](https://github.com/thomasbnt/Bord-Pi/releases)
![GitHub last commit](https://img.shields.io/github/last-commit/thomasbnt/bord-Pi?&style=for-the-badge)
[![Depfu](https://img.shields.io/depfu/dependencies/github/thomasbnt/Bord-Pi?style=for-the-badge)](https://depfu.com/github/thomasbnt/Bord-Pi?project_id=37111)

---

## Introduction

<img src="bordpi.png" alt="Logo Bord Pi" align="right" />

> [!NOTE]
> Vérifiez que votre **Version NodeJS** est supérieure à **16.6.0**.

_Propre, rapide, beau, simple d'utilisation et de modification._

**Bord Pi** est un robot Discord qui fonctionne avec l'API Discord et le package Discord.js, paramétré en fonction du serveur Discord du [**Coin du Cappu'**](https://thomasbnt.dev/discord). Il est néanmoins accessible et facilement possible à le paramétrer à votre façon pour votre propre serveur.

> [!IMPORTANT]
> Toutes les configurations sont spécialement pour le serveur où se trouve ce robot. Si vous le testez, vous aurez sûrement des erreurs si vous n'avez pas modifié les ID des salons.

Merci aux Sponsors pour votre soutien ! Si vous aussi, vous voulez aider au développement de plusieurs projets comme celui-ci, n'hésitez pas [à faire une donation](#faire-une-donation).

![GitHub Sponsors](https://cdn.jsdelivr.net/gh/thomasbnt/sponsors/sponsors.svg)

## Nouveautés

La **version 3** de Bord Pi ajoute la dernière fonctionnalité de Discord : les **Slash Commands**.
Plus aucun préfixe n'est nécessaire pour les commandes.

- [x] Slash Commands
- [x] Logs

## Les intégrations

- Un module permettant de changer **la bannière du serveur tous les jours avec une image Unsplash**.¹
- Un **filtre contre les liens Discord**, vous pouvez bien évidemment lui ajouter l'ID du channel de publicité
  dans `IDAdsChannel`. Le robot ne fera rien dans ce channel en question.
- Un **système de logs** interne via Webhooks.
- Un **message de bienvenue personnalisé**.

Pas mal de changements sur le code, notamment le rangement des fichiers, des logs plus propre et un code plus net. Quant au niveau de la sécurité du robot, il vérifie la plupart du temps s'il peut faire les actions qui voudrait faire, s'il ne peut pas, il passe sans râler.

¹. Si le serveur a la fonctionnalité de bannière, et que le module est activé et correctement configurée, le robot changera la bannière tous les jours à 2h du matin.

## Les permissions

Le robot doit avoir les **Intents privilégié** suivant :

- [x] Server members
- [x] Message content

> [!IMPORTANT]
> Sans ces intents, le robot ne fonctionnera pas.
> Quand vous l'ajouterez sur votre propre serveur, n'oubliez pas de le mettre en privé et de lui donner les permissions
> suivantes :

Scopes :

- [x] bot
- [x] applications.commands

Permissions bot :

- [x] Manage server
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

## Comment le faire fonctionner

1. Assurez-vous d'avoir la version de **NodeJS** supérieure à **16.9.0**.
2. Installez les dépendances avec un coup de `npm install` ou `yarn add`.
3. Copiez le fichier `config.exemple.json` en `config.json`.
4. Remplissez les configurations dans `config.json`.
5. Vous pouvez désormais allumer votre robot avec `npm run start`.

## Les Logs

Vous avez la possibilité d'activer les logs pour avoir un suivi des arrivées et départs des membres.
Pour l'activer, vous devez renseigner deux informations dans `config.json` :

| value                 | default | type    | description                                |
| --------------------- | ------- | ------- | ------------------------------------------ |
| WebhookLogs.activated | true    | boolean | Activer ou désactiver les logs             |
| WebhookLogs.id        | null    | string  | L'ID du channel où les logs seront envoyés |
| WebhookLogs.token     | null    | string  | Le token du webhook pour les logs          |

Si vous l'activez, veillez donc à bien remplir les informations demandées pour que les logs fonctionnent correctement.

## Les modules complémentaires

### Module Unsplash

Vous avez la possibilité d'activer le module Unsplash pour avoir une bannière de serveur qui change tous les jours suivant le thème que vous avez choisi.

Pour cela, il vous suffit de mettre `true` dans `optionalModules.unsplash.activate` dans le fichier [config.json](./config.exemple.json).

#### Obtenir ma Access Key de Unsplash (UnsplashAccessKey)

Afin de communiquer avec l'API Unsplash, vous devez créer un compte sur [Unsplash](https://unsplash.com).

1. Rendez-vous sur [votre dashboard](https://unsplash.com/oauth/applications) et créez une nouvelle application.
2. Remplissez les informations demandées.
3. Une fois l'application créée, vous aurez accès à votre **Access Key**.
4. Copiez-la et collez-la dans `config.json` dans `optionalModules.unsplash.unsplashAccessKey`.
5. Vous pouvez désormais allumer votre robot, il changera la bannière tous les jours à 2h du matin comme indiqué dans [`ready.js`](./events/ready.js).

#### Les paramètres

Tous les paramètres sont respectivement dans `config.json` dans `optionalModules.unsplash`.

| value                 | default           | type    | Exemple                  | description                                                                                                                                                  |
| --------------------- | ----------------- | ------- | ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| activate              | true              | boolean |                          | Activer ou désactiver le module de changement de bannière Unsplash                                                                                           |
| unsplashAccessKey     | null              | string  |                          | La clé d'accès à l'API Unsplash                                                                                                                              |
| optionalQuery         | `"nature clouds"` | string  | `"rustic gaming"`        | Le thème de recherche pour les images Unsplash                                                                                                               |
| optionalUsername      | null              | string  | `"thomasbnt"`            | Permet de récupérer les images seulement à partir d'un profil Unsplash                                                                                       |
| optionalCollectionsID | null              | Array   | `["520359", "10437765"]` | Permet de récupérer les images seulement à partir d'une ou plusieurs collection(s) Unsplash (cela désactive le filtre `optionalQuery` et `optionalUsername`) |

## Contributions

Les contributions sont toujours les bienvenues ! Lisez les règles pour les contributions avant de pouvoir y participer.

Veuillez vous assurer que votre demande de pull request respecte les lignes directrices suivantes :

- Rechercher des suggestions précédentes avant d'en faire une nouvelle, afin d'éviter les doublons.
- Les fichiers README suggérés devraient être beau ou se démarquer d'une manière ou d'une autre.
- Faire une demande de pull request individuelle pour chaque suggestion.
- De nouvelles catégories ou des améliorations à la catégorisation existante sont les bienvenues.
- Gardez de courtes descriptions simples, mais descriptives.
- Commencez la description avec une capitale et terminez par un arrêt/période complet.
- Vérifiez votre orthographe et votre grammaire.
- Assurez-vous que votre éditeur de texte est configuré pour supprimer les espaces de fin.

Merci pour vos suggestions !

## Les codes couleurs

| **Principaux**       | PrimaryColor | DangerColor | InfoColor | SuccessColor | BlackColor |
| -------------------- | ------------ | ----------- | --------- | ------------ | ---------- |
| **Code Hexadécimal** | `#E74C3C`    | `#B20000`   | `#6897BB` | `#47b60f`    | `#36393F`  |

Pour les utiliser : `config.colors.PrimaryColor`, récupère la couleur primaire.

## Licence

**Bord Pi** est sous licence [GNU GPL 3](/LICENSE). Veuillez la respecter.
Si vous reprenez le code, merci de me créditer dans la bio du robot avec le lien de ce dépôt public.
Merci à ceux qui le feront. ❤️

## Informations complémentaires

L'image a été modifiée par [Thomas Bnt](https://github.com/thomasbnt), veillez donc à ne pas l'utiliser publiquement et/ou commercialement. Initialement, l'image appartient à [Raspberry Pi](https://www.raspberrypi.org/trademark-rules/).

- 📣 Suis-moi sur [Twitter](https://twitter.com/Thomasbnt_)
- 🔗 Passe un tour sur [mon site web](https://thomasbnt.dev) !

## Faire une donation

[![GitHub Sponsors](https://img.shields.io/badge/GitHub%20Sponsor-%23EA54AE.svg?&style=for-the-badge&logo=github-sponsors&logoColor=white)](https://github.com/sponsors/thomasbnt) [![Support me on Buy Me a Coffee](https://img.shields.io/badge/Supporte%20moi-sur%20Buy%20Me%20a%20Coffee-%23FFDD00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=white)](https://www.buymeacoffee.com/thomasbnt?via=thomasbnt)
