const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ptero')
        .setDescription('Pterodactyl Management Menu'),
    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setTitle('🎮 Pterodactyl Management')
            .setDescription('Silakan pilih aksi yang ingin Anda lakukan di bawah ini:')
            .setColor('#0099ff')
            .setTimestamp();

        const row1 = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('ptero_create_user')
                    .setLabel('Add User')
                    .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                    .setCustomId('ptero_delete_user')
                    .setLabel('Delete User')
                    .setStyle(ButtonStyle.Danger),
                new ButtonBuilder()
                    .setCustomId('ptero_create_server')
                    .setLabel('Add Server')
                    .setStyle(ButtonStyle.Success),
                new ButtonBuilder()
                    .setCustomId('ptero_delete_server')
                    .setLabel('Delete Server')
                    .setStyle(ButtonStyle.Danger),
            );

        const row2 = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('ptero_installer')
                    .setLabel('Ptero Installer')
                    .setStyle(ButtonStyle.Secondary),
                new ButtonBuilder()
                    .setCustomId('ptero_create_panel')
                    .setLabel('Create Panel')
                    .setStyle(ButtonStyle.Secondary),
            );

        await interaction.reply({ embeds: [embed], components: [row1, row2] });
    },
};
