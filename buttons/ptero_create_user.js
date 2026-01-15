const { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js');

module.exports = {
    customId: 'ptero_create_user',
    async execute(interaction) {
        const modal = new ModalBuilder()
            .setCustomId('modal_ptero_create_user')
            .setTitle('Create Pterodactyl User');

        const usernameInput = new TextInputBuilder()
            .setCustomId('username')
            .setLabel("Username")
            .setStyle(TextInputStyle.Short)
            .setRequired(true);

        const emailInput = new TextInputBuilder()
            .setCustomId('email')
            .setLabel("Email Address")
            .setStyle(TextInputStyle.Short)
            .setRequired(true);

        const firstNameInput = new TextInputBuilder()
            .setCustomId('first_name')
            .setLabel("First Name")
            .setStyle(TextInputStyle.Short)
            .setRequired(true);

        const lastNameInput = new TextInputBuilder()
            .setCustomId('last_name')
            .setLabel("Last Name")
            .setStyle(TextInputStyle.Short)
            .setRequired(true);

        modal.addComponents(
            new ActionRowBuilder().addComponents(usernameInput),
            new ActionRowBuilder().addComponents(emailInput),
            new ActionRowBuilder().addComponents(firstNameInput),
            new ActionRowBuilder().addComponents(lastNameInput)
        );

        await interaction.showModal(modal);
    },
};
