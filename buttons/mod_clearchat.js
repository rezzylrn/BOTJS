const { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js');

module.exports = {
    customId: 'mod_clearchat',
    async execute(interaction) {
        const modal = new ModalBuilder()
            .setCustomId('modal_mod_clearchat')
            .setTitle('Clear Chat');

        const amountInput = new TextInputBuilder()
            .setCustomId('amount')
            .setLabel("Jumlah pesan (1-100)")
            .setStyle(TextInputStyle.Short)
            .setRequired(true);

        modal.addComponents(new ActionRowBuilder().addComponents(amountInput));
        await interaction.showModal(modal);
    },
};
