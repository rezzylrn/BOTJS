const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('panelfeedback')
        .setDescription('Menampilkan panel agar user dapat memberikan feedback atau masukan.'),
    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setTitle('Panel Feedback Menu')
            .setDescription('Berikut adalah pilihan jika Anda ingin memberikan feedback atau masukan. Silakan pilih opsi yang sesuai.')
            .setColor('#5865F2')
            .setThumbnail(interaction.client.user.displayAvatarURL())
            .addFields(
                { 
                    name: 'Feedback Button', 
                    value: 'Gunakan tombol feedback untuk mengirimkan masukan atau saran. Kami sangat menghargai setiap feedback yang diberikan.' 
                },
                { 
                    name: 'Kritik dan saran', 
                    value: 'Kami sangat terbuka terhadap kritik dan saran dari custumer kami.' 
                }
            )
            .setFooter({ text: `Diminta oleh ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL() })
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    },
};