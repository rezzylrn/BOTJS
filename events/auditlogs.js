const { EmbedBuilder, Events } = require('discord.js');

module.exports = [
    {
        name: Events.MessageDelete,
        async execute(message) {
            if (message.author?.bot) return;
            const logChannel = message.guild.channels.cache.get(process.env.AUDIT_LOG_CHANNEL_ID);
            if (!logChannel) return;

            const embed = new EmbedBuilder()
                .setTitle('🗑️ Pesan Dihapus')
                .setColor('#ff0000')
                .addFields(
                    { name: 'Penulis', value: `${message.author?.tag || 'Unknown'}`, inline: true },
                    { name: 'Channel', value: `${message.channel}`, inline: true },
                    { name: 'Konten', value: message.content || '*Tidak ada teks (mungkin gambar/embed)*' }
                )
                .setTimestamp();

            logChannel.send({ embeds: [embed] });
        }
    },
    {
        name: Events.MessageUpdate,
        async execute(oldMessage, newMessage) {
            if (oldMessage.author?.bot) return;
            if (oldMessage.content === newMessage.content) return;
            const logChannel = oldMessage.guild.channels.cache.get(process.env.AUDIT_LOG_CHANNEL_ID);
            if (!logChannel) return;

            const embed = new EmbedBuilder()
                .setTitle('📝 Pesan Diedit')
                .setColor('#ffff00')
                .addFields(
                    { name: 'Penulis', value: `${oldMessage.author?.tag}`, inline: true },
                    { name: 'Channel', value: `${oldMessage.channel}`, inline: true },
                    { name: 'Sebelum', value: oldMessage.content || '*Kosong*' },
                    { name: 'Sesudah', value: newMessage.content || '*Kosong*' }
                )
                .setTimestamp();

            logChannel.send({ embeds: [embed] });
        }
    },
    {
        name: Events.GuildMemberAdd,
        async execute(member) {
            const logChannel = member.guild.channels.cache.get(process.env.CHANNEL_LOGS_LEAVE_ID);
            if (!logChannel) return;

            const embed = new EmbedBuilder()
                .setTitle('📥 Member Bergabung')
                .setColor('#00ff00')
                .setDescription(`${member.user.tag} telah bergabung ke server.`)
                .setThumbnail(member.user.displayAvatarURL())
                .addFields({ name: 'ID User', value: member.id })
                .setTimestamp();

            logChannel.send({ embeds: [embed] });
        }
    },
    {
        name: Events.GuildMemberRemove,
        async execute(member) {
            const logChannel = member.guild.channels.cache.get(process.env.CHANNEL_LOGS_JOIN_ID);
            if (!logChannel) return;

            const embed = new EmbedBuilder()
                .setTitle('📤 Member Keluar')
                .setColor('#ff4500')
                .setDescription(`${member.user.tag} telah meninggalkan server.`)
                .setThumbnail(member.user.displayAvatarURL())
                .addFields({ name: 'ID User', value: member.id })
                .setTimestamp();

            logChannel.send({ embeds: [embed] });
        }
    }
];