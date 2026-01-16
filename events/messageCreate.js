const { Collection } = require('discord.js');

// Map untuk menyimpan data pesan terakhir user
// Struktur: userId -> { content: string, count: number }
const messageLog = new Collection();

module.exports = {
    name: 'messageCreate',
    async execute(message) {
        if (message.author.bot || !message.guild) return;

        const userId = message.author.id;
        const content = message.content.toLowerCase();

        // --- Fitur Anti-Spam (Pesan Sama Berturut-turut) ---
        const userData = messageLog.get(userId);

        if (userData && userData.content === content) {
            userData.count += 1;
        } else {
            messageLog.set(userId, { content: content, count: 1 });
        }

        const updatedUserData = messageLog.get(userId);

        if (updatedUserData.count >= 5) {
            // Reset count setelah terdeteksi
            messageLog.delete(userId);

            // Cek apakah bot punya izin untuk timeout
            if (message.member.moderatable) {
                const duration = 15 * 60 * 1000; // 15 menit dalam milidetik
                try {
                    await message.member.timeout(duration, 'Spamming pesan yang sama 5 kali berturut-turut');
                    await message.channel.send(`🚫 ${message.author}, Anda telah di-mute selama 15 menit karena spamming.`);
                } catch (error) {
                    console.error('Gagal memberikan timeout:', error);
                }
            }
            return; // Hentikan eksekusi jika sudah kena spam
        }

        // --- Fitur Anti-Link ---
        const linkPattern = /(https?:\/\/[^\s]+)/g;
        if (linkPattern.test(message.content)) {
            if (!message.member.permissions.has('Administrator')) {
                await message.delete().catch(console.error);
                return message.channel.send(`${message.author}, dilarang mengirim link di sini!`).then(msg => {
                    setTimeout(() => msg.delete().catch(() => {}), 5000);
                });
            }
        }

        // --- Fitur Anti-Toxic ---
        const fs = require('fs');
        const path = require('path');
        const toxicPath = path.join(__dirname, '../data/toxicWords.json');
        
        if (fs.existsSync(toxicPath)) {
            const toxicWords = JSON.parse(fs.readFileSync(toxicPath, 'utf8'));
            if (toxicWords.some(word => content.includes(word))) {
                if (!message.member.permissions.has('Administrator')) {
                    await message.delete().catch(console.error);
                    return message.channel.send(`${message.author}, tolong jaga bahasa Anda!`).then(msg => {
                        setTimeout(() => msg.delete().catch(() => {}), 5000);
                    });
                }
            }
        }
    },
};