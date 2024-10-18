const { Client, GatewayIntentBits, PermissionFlagsBits } = require('discord.js');
const AntiSpam = require('discord-anti-spam');
const express = require('express');
require('dotenv').config();

require('./keep_alive');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages
  ],
  partials: ['CHANNEL'],
});

const antiSpam = new AntiSpam({
  warnThreshold: 3,
  muteThreshold: 3,
  warnMessage: '⚠️ تم تحذيرك بسبب الإزعاج (Spam).',
  muteMessage: '🔇 تم إعطاؤك ميوت لمدة ساعة بسبب الإزعاج.',
  unMuteTime: 60,
  verbose: true,
  removeMessages: true,
  ignoredPermissions: [PermissionFlagsBits.Administrator],
});

client.once('ready', () => {
  console.log(`✅ Logged in as ${client.user.tag} - Bot is ready to work!`);
});

client.on('messageCreate', (message) => {
  antiSpam.message(message);
});

(async () => {
  try {
    await client.login(process.env.TOKEN);
    console.log('✅ Bot successfully logged in.');
  } catch (error) {
    console.error('❌ Error during bot login:', error);
  }
})();

const app = express();
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});

app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Bot Status</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
          }
          .container {
            text-align: center;
          }
          h1 {
            color: #333;
          }
          p {
            color: #555;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Bot 24H ON!</h1>
          <p>The bot is up and running, serving your community 24/7.</p>
        </div>
      </body>
    </html>
  `);
});

app.use((err, req, res, next) => {
  console.error('❌ Server error:', err);
  res.status(500).send('Internal Server Error');
});
