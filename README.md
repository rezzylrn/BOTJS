
## Fitur Utama 

### 🎮 Hosting Control
- **Ptero Installer**: Script instalasi otomatis Pterodactyl.
- **Ptero Controller**:Control and create server(samp and botjs).

### 🔒 Keamanan
- **Anti-Link**: Menghapus link otomatis (kecuali admin).
- **Anti-Toxic**: Menghapus kata-kata kasar otomatis.
- **Track-Audit**: Menampilkan aktivitas semua member yang ada.
## Cara Instalasi

1. Clone atau download folder ini.
2. Buka terminal di direktori bot.
3. Jalankan `npm install`.
4. Rename `.env.example` menjadi `.env` dan isi data yang diperlukan:
   - `DISCORD_TOKEN`: Token bot Discord Anda.
   - `CLIENT_ID`: ID bot Discord Anda.
   - `GUILD_ID`: ID server Discord Anda.
   - `PTERO_URL`: URL Panel Pterodactyl Anda (contoh: `https://panel.example.com`).
   - `PTERO_API_KEY`: Application API Key dari Pterodactyl.
5. Jalankan bot dengan perintah `node index.js`.

## Perintah Slash
- `/allmenu`: menampilkan semua command dan guide pemakaian bot.
- `/modatormenu`: Kumpulan perintah moderator/admin (berbasis Command).

## Catatan
Pastikan bot memiliki izin (Permissions) yang cukup di server Discord Anda, seperti `Manage Messages`, `Manage Channels`, `Manage Roles`, `Kick Members`, dan `Ban Members`.
#
