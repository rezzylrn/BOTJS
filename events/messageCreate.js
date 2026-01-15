module.exports = {
    name: 'messageCreate',
    async execute(message) {
        if (message.author.bot) return;

        // Anti-Link
        const linkPattern = /(https?:\/\/[^\s]+)/g;
        if (linkPattern.test(message.content)) {
            // Kecualikan jika user memiliki role admin (opsional)
            if (!message.member.permissions.has('Administrator')) {
                await message.delete();
                return message.channel.send(`${message.author}, dilarang mengirim link di sini!`).then(msg => {
                    setTimeout(() => msg.delete(), 5000);
                });
            }
        }

        // Anti-Toxic
        const toxicWords = ['anjing', 'babi', 'bangsat', 'tolol', 'goblok', 'kontol', 'memek']; // Tambahkan kata-kata lain
        const content = message.content.toLowerCase();
        if (toxicWords.some(word => content.includes(word))) {
            await message.delete();
            return message.channel.send(`${message.author}, tolong jaga bahasa Anda!`).then(msg => {
                setTimeout(() => msg.delete(), 5000);
            });
        }
    },
};
