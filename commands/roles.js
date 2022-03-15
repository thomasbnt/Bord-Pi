const { SlashCommandBuilder } = require('@discordjs/builders')
const { MessageEmbed, MessageActionRow, MessageSelectMenu } = require('discord.js')
const config = require('../config.json')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('roles')
        .setDescription('Obtenir des rôles sur ce serveur'),
    async execute(interaction, client) {
        const RolesSelect = new MessageActionRow()
            .addComponents(
                new MessageSelectMenu()
                    .setCustomId('select')
                    .setPlaceholder('Aucun rôle selectionné')
                    .setMinValues(1)
                    .addOptions([
                        {
                            label: `Rôle ${config.IDRoles.dev}`,
                            description: 'Vous êtes un développeur ? Take that !',
                            value: config.IDRoles.dev,
                        },
                        {
                            label: 'You can select me too',
                            description: 'This is also a description',
                            value: 'second_option',
                        },
                        {
                            label: 'I am also an option',
                            description: 'This is a description as well',
                            value: 'third_option',
                        },
                    ]),
            )

        await interaction.reply({
            content: "Vous pouvez obtenir plusieurs rôles, selectionnez-les dans le menu ci-dessous",
            components: [RolesSelect],
            ephemeral: true
        })
    }
}
