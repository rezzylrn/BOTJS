const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits, ChannelType } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("moderator")
        .setDescription("Kumpulan perintah moderasi dan utilitas")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator) // Default permission
        .addSubcommand(sub =>
            sub.setName("announcement")
                .setDescription("Kirim pengumuman ke channel tertentu")
                .addChannelOption(opt => opt.setName("channel").setDescription("Channel tujuan").setRequired(true).addChannelTypes(ChannelType.GuildText))
                .addStringOption(opt => opt.setName("pesan").setDescription("Isi pengumuman").setRequired(true)))
        .addSubcommand(sub =>
            sub.setName("cc")
                .setDescription("Hapus pesan dalam jumlah banyak")
                .addIntegerOption(opt => opt.setName("jumlah").setDescription("Jumlah pesan (1-100)").setRequired(true).setMinValue(1).setMaxValue(100)))
        .addSubcommand(sub =>
            sub.setName("kick")
                .setDescription("Kick member dari server")
                .addUserOption(opt => opt.setName("target").setDescription("Member yang akan di-kick").setRequired(true))
                .addStringOption(opt => opt.setName("alasan").setDescription("Alasan kick")))
        .addSubcommand(sub =>
            sub.setName("ban")
                .setDescription("Ban member dari server")
                .addUserOption(opt => opt.setName("target").setDescription("Member yang akan di-ban").setRequired(true))
                .addStringOption(opt => opt.setName("alasan").setDescription("Alasan ban")))
        .addSubcommand(sub =>
            sub.setName("mute")
                .setDescription("Mute member (Timeout)")
                .addUserOption(opt => opt.setName("target").setDescription("Member yang akan di-mute").setRequired(true))
                .addIntegerOption(opt => opt.setName("durasi").setDescription("Durasi dalam menit").setRequired(true)))
        .addSubcommand(sub =>
            sub.setName("addrole")
                .setDescription("Tambah role ke member")
                .addUserOption(opt => opt.setName("target").setDescription("Member tujuan").setRequired(true))
                .addRoleOption(opt => opt.setName("role").setDescription("Role yang akan diberikan").setRequired(true)))
        .addSubcommand(sub =>
            sub.setName("createchannel")
                .setDescription("Buat channel text baru")
                .addStringOption(opt => opt.setName("nama").setDescription("Nama channel").setRequired(true))
                .addChannelOption(opt => opt.setName("category").setDescription("Kategori channel").addChannelTypes(ChannelType.GuildCategory)))
        .addSubcommand(sub =>
            sub.setName("createcategory")
                .setDescription("Buat kategori baru")
                .addStringOption(opt => opt.setName("nama").setDescription("Nama kategori").setRequired(true)))
        .addSubcommand(sub =>
            sub.setName("rating")
                .setDescription("Berikan rating untuk store")
                .addIntegerOption(opt => opt.setName("bintang").setDescription("Jumlah bintang (1-5)").setRequired(true).setMinValue(1).setMaxValue(5))
                .addStringOption(opt => opt.setName("ulasan").setDescription("Ulasan Anda"))),

    async execute(interaction) {
        const subcommand = interaction.options.getSubcommand();

        if (subcommand === 'rating') {
            const bintang = interaction.options.getInteger('bintang');
            const ulasan = interaction.options.getString('ulasan') || 'Tidak ada ulasan';
            const stars = '⭐'.repeat(bintang);
            const embed = new EmbedBuilder()
                .setTitle('🌟 Rating Baru')
                .addFields(
                    { name: 'Rating', value: stars },
                    { name: 'Ulasan', value: ulasan }
                )
                .setAuthor({ name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL() })
                .setColor('#ffa500')
                .setTimestamp();
            // You might want to send this to a specific log channel
            await interaction.channel.send({ embeds: [embed] });
            return interaction.reply({ content: 'Terima kasih atas rating Anda!', ephemeral: true });
        }

        // All other commands require Admin permissions
        if (!interaction.member.permissions.has(PermissionFlagsBits.Administrator)) {
            return interaction.reply({ content: 'Anda tidak memiliki izin untuk menggunakan perintah ini!', ephemeral: true });
        }

        switch (subcommand) {
            case 'moderatormenu': {
                await interaction.reply({ content: `test ombak barudak!!` });
                break;
            }
            case 'announcement': {
                const channel = interaction.options.getChannel('channel');
                const pesan = interaction.options.getString('pesan');
                const embed = new EmbedBuilder()
                    .setTitle('📢 PENGUMUMAN')
                    .setDescription(pesan)
                    .setColor('#ff0000')
                    .setTimestamp()
                    .setFooter({ text: `Oleh: ${interaction.user.tag}` });
                await channel.send({ embeds: [embed] });
                await interaction.reply({ content: 'Pengumuman berhasil dikirim!', ephemeral: true });
                break;
            }
            case 'clearchat': {
                const jumlah = interaction.options.getInteger('jumlah');
                await interaction.channel.bulkDelete(jumlah, true);
                await interaction.reply({ content: `Berhasil menghapus ${jumlah} pesan.`, ephemeral: true });
                break;
            }
            case 'kick': {
                const target = interaction.options.getMember('target');
                const alasan = interaction.options.getString('alasan') || 'Tidak ada alasan';
                await target.kick(alasan);
                await interaction.reply({ content: `✅ **${target.user.tag}** telah di-kick. Alasan: ${alasan}` });
                break;
            }
            case 'ban': {
                const target = interaction.options.getMember('target');
                const alasan = interaction.options.getString('alasan') || 'Tidak ada alasan';
                await target.ban({ reason: alasan });
                await interaction.reply({ content: `✅ **${target.user.tag}** telah di-ban. Alasan: ${alasan}` });
                break;
            }
            case 'mute': {
                const target = interaction.options.getMember('target');
                const durasi = interaction.options.getInteger('durasi');
                await target.timeout(durasi * 60 * 1000);
                await interaction.reply({ content: `✅ **${target.user.tag}** telah di-mute selama ${durasi} menit.` });
                break;
            }
            case 'addrole': {
                const target = interaction.options.getMember('target');
                const role = interaction.options.getRole('role');
                await target.roles.add(role);
                await interaction.reply({ content: `✅ Role **${role.name}** telah diberikan kepada **${target.user.tag}**.` });
                break;
            }
            case 'createchannel': {
                const nama = interaction.options.getString('nama');
                const category = interaction.options.getChannel('category');
                const channel = await interaction.guild.channels.create({
                    name: nama,
                    type: ChannelType.GuildText,
                    parent: category ? category.id : null
                });
                await interaction.reply({ content: `✅ Channel **${channel.name}** berhasil dibuat!` });
                break;
            }
            case 'createcategory': {
                const nama = interaction.options.getString('nama');
                const category = await interaction.guild.channels.create({
                    name: nama,
                    type: ChannelType.GuildCategory
                });
                await interaction.reply({ content: `✅ Kategori **${category.name}** berhasil dibuat!` });
                break;
            }
        }
    },
};
