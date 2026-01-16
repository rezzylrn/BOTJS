const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('allmenu')
        .setDescription('Menampilkan seluruh daftar fitur dan perintah bot'),
    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setTitle('📚 Bot Store - All Menu')
            .setDescription('Berikut adalah daftar lengkap fitur dan perintah yang tersedia di bot ini:')
            .setColor('#5865F2')
            .setThumbnail(interaction.client.user.displayAvatarURL())
            .addFields(
                { 
                    name: '🎮 Pterodactyl Management', 
                    value: 'Gunakan `/ptero` untuk membuka menu tombol:\n• Ptero Installer\n• Create Panel\n• Add/Delete User\n• Add/Delete Server' 
                },
                { 
                    name: '🛡️ Moderation Commands', 
                    value: 'Gunakan `/mod [subcommand]`:\n• `announcement`: Kirim pengumuman\n• `clearchat`: Hapus pesan\n• `kick` / `ban` / `mute`: Moderasi member\n• `addrole`: Tambah role ke member' 
                },
                { 
                    name: '🛠️ Utility Commands', 
                    value: 'Gunakan `/mod [subcommand]`:\n• `createchannel`: Buat channel baru\n• `createcategory`: Buat kategori baru\n• `feedback`: Kirim masukan\n• `rating`: Berikan ulasan bintang' 
                },
                { 
                    name: '🔒 Security Features', 
                    value: '• **Anti-Link**: Menghapus link otomatis (Non-Admin)\n• **Anti-Toxic**: Menghapus kata kasar otomatis \n•** Anti-Spam**: Mencegah spam pesan berulang\n• **Auto-Moderation**: Atur filter kata kunci khusus\n• **Audit Logs**: Catat aktivitas penting server' 
                }
            )
            .setFooter({ text: `Diminta oleh ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL() })
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    },
};