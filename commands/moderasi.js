const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('moderasi')
        .setDescription('Moderation Management Menu'),
    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setTitle('🛡️ Ini Adalah Panel Moderator, Harap Di Gunakan Sebaik Mungkin!!')
            .setDescription('Jika ada trouble terhadap bot, silahkan hubungi developer bot ini.\n\nPilih tombol di bawah untuk mengakses perintah moderasi yang tersedia.')
            .setColor('#ff9900')
            .setTimestamp();

        const row1 = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('mod_announcement')
                    .setLabel('Announcement')
                    .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                    .setCustomId('mod_feedback')
                    .setLabel('Feedback')
                    .setStyle(ButtonStyle.Success),
                new ButtonBuilder()
                    .setCustomId('mod_rating')
                    .setLabel('Rating')
                    .setStyle(ButtonStyle.Success),
                new ButtonBuilder()
                    .setCustomId('mod_clearchat')
                    .setLabel('Clear Chat')
                    .setStyle(ButtonStyle.Danger),
            );

        await interaction.reply({ embeds: [embed], components: [row1] });
    },
};
