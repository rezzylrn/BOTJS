const { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js');

module.exports = {
    customId: 'mod_feedback',
    async execute(interaction) {
        const modal = new ModalBuilder()
            .setCustomId('modal_mod_feedback')
            .setTitle('Kirim Feedback');

        const feedbackInput = new TextInputBuilder()
            .setCustomId('feedback_text')
            .setLabel("Feedback Anda")
            .setStyle(TextInputStyle.Paragraph)
            .setRequired(true);

        modal.addComponents(new ActionRowBuilder().addComponents(feedbackInput));
        await interaction.showModal(modal);
    },
};
