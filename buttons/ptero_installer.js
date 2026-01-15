const { EmbedBuilder } = require('discord.js');

module.exports = {
    customId: 'ptero_installer',
    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setTitle('🚀 Pterodactyl Installer')
            .setDescription('Gunakan script berikut untuk menginstal Pterodactyl Panel & Wings secara otomatis:\n\n`bash <(curl -s https://pterodactyl-installer.se)`\n\nIkuti instruksi yang muncul di terminal server Anda.')
            .setColor('#00ff00')
            .setFooter({ text: 'Pastikan Anda menggunakan OS yang didukung (Ubuntu/Debian/CentOS)' });

        await interaction.reply({ embeds: [embed], ephemeral: true });
    },
};
