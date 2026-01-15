const { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js');

module.exports = {
    customId: 'ptero_delete_user',
    async execute(interaction) {
        const modal = new ModalBuilder()
            .setCustomId('modal_ptero_delete_user')
            .setTitle('Delete Pterodactyl User');

        const userIdInput = new TextInputBuilder()
            .setCustomId('user_id')
            .setLabel("User ID (Pterodactyl ID)")
            .setStyle(TextInputStyle.Short)
            .setRequired(true);

        modal.addComponents(new ActionRowBuilder().addComponents(userIdInput));
        await interaction.showModal(modal);
    },
};
