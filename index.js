const { Client, GatewayIntentBits } = require("discord.js"); // discord.js v14
require('dotenv').config(); // .env dosyasını okuyacak

// Tokenları array olarak tanımlıyoruz
const tokens = [
  process.env.TOKEN_1,
  
];

const express = require('express');
const app = express();
const port = 3000; // Portu 3000 olarak ayarlayın

app.get('/', (req, res) => {
  res.sendStatus(200); // 200 OK yanıtı döndür
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`); // Port numarasını konsola yazdır
});


// Her token için ayrı bir bot başlatıyoruz
tokens.forEach((token, index) => {
  const client = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent,
    ],
  });

  client.once("ready", () => {
    console.log(`Bot ${index + 1} - ${client.user.tag} olarak giriş yapıldı!`);
    client.user.setActivity(`Bot ${index + 1} aktif`, { type: "WATCHING" });
  });

  client.login(token).catch(err => {
    console.error(`Bot ${index + 1} giriş yaparken bir hata oluştu:`, err);
  });
});
