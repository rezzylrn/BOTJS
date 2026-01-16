const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('moderatormenu')
        .setDescription('Menampilkan seluruh daftar fitur dan perintah yang bisa di akses oleh moderator only!'),
    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setTitle('📚 Bot Store - Moderator Akses')
            .setDescription('Berikut adalah daftar perintah yang bisa di akses oleh moderator:')
            .setColor('#5865F2')
            .setThumbnail(interaction.client.user.displayAvatarURL())
            .addFields(
                { 
                    name: '🎮 Pterodactyl Management', 
                    value: '`/moderator (subcommand)`:\n• `announcement`: Kirim pengumuman\n• `clearchat`: Hapus pesan\n• `kick` / `ban` / `mute`: Moderasi member\n• `addrole`: Tambah role ke member' 
                }
            )
            .setFooter({ text: `Diminta oleh ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL() })
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    },
};