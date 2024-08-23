const {partials,Client, GatewayIntentBits,PermissionFlagsBits} = require("discord.js");
require('dotenv').config();
const keep_alive = require('./keep_alive.js')

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
      partials: ['CHANNEL'],
});
const AntiSpam = require("discord-anti-spam");
const antiSpam = new AntiSpam({
  warnThreshold: 3, 
  muteTreshold: 3, 
  warnMessage: "تم تحذيرك بسبب الاسبام",
  muteMessage: "تم اعطائك ميوت لمدة ساعة", 
  unMuteTime: 60,
  verbose: true,
  removeMessages: true,
    ignoredPermissions: [PermissionFlagsBits.Administrator],

});

client.on("ready", () => console.log(`Logged in as ${client.user.tag}.`));

client.on("messageCreate", (message) => antiSpam.message(message));

client.login(process.env.token);

const express = require("express")
const app = express();

app.listen(() => console.log("I'm Ready To Work..! 24H"));
app.get('/', (req, res) => {
  res.send(`
  <body>
  <center><h1>Bot 24H ON!</h1></center
  </body>`)
});
