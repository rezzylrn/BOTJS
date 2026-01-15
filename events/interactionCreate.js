const pteroClient = require('../utils/pteroClient');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'interactionCreate',
    async execute(interaction) {
        if (interaction.isModalSubmit()) {
            if (interaction.customId === 'modal_ptero_create_user') {
                const username = interaction.fields.getTextInputValue('username');
                const email = interaction.fields.getTextInputValue('email');
                const first_name = interaction.fields.getTextInputValue('first_name');
                const last_name = interaction.fields.getTextInputValue('last_name');

                try {
                    await interaction.deferReply({ ephemeral: true });
                    const user = await pteroClient.createUser({
                        username,
                        email,
                        first_name,
                        last_name,
                    });

                    const embed = new EmbedBuilder()
                        .setTitle('✅ User Created')
                        .setDescription(`User **${username}** berhasil dibuat!`)
                        .addFields(
                            { name: 'ID', value: `${user.attributes.id}`, inline: true },
                            { name: 'Email', value: email, inline: true }
                        )
                        .setColor('#00ff00');

                    await interaction.editReply({ embeds: [embed] });
                } catch (error) {
                    console.error(error);
                    await interaction.editReply({ content: 'Gagal membuat user. Pastikan API Key benar dan data valid.' });
                }
            } else if (interaction.customId === 'modal_ptero_delete_user') {
                const userId = interaction.fields.getTextInputValue('user_id');

                try {
                    await interaction.deferReply({ ephemeral: true });
                    await pteroClient.deleteUser(userId);

                    await interaction.editReply({ content: `✅ User dengan ID **${userId}** berhasil dihapus!` });
                } catch (error) {
                    console.error(error);
                    await interaction.editReply({ content: 'Gagal menghapus user. Pastikan ID benar.' });
                }
            }
        }
    },
};
