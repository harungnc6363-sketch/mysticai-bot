const mineflayer = require("mineflayer");

const HOST = "yapsavun.com";
const USERNAME = "MysticAI";
const PASSWORD = "123456789_tr";

function startBot() {
  const bot = mineflayer.createBot({
    host: HOST,
    username: USERNAME,
    version: false
  });

  bot.on("login", () => {
    console.log("Sunucuya bağlanıldı");
  });

  bot.on("message", (msg) => {
    console.log("[CHAT]", msg.toString());
  });

  bot.on("spawn", () => {
    console.log("Spawn oldu, login bekleniyor...");

    setTimeout(() => {
      slowType(bot, `/login ${PASSWORD}`, 150);
    }, 2500);
  });

  bot.on("kicked", (reason) => {
    console.log("[BOT ATILDI]", reason);
  });

  bot.on("end", () => {
    console.log("Bağlantı koptu, yeniden başlatılıyor...");
    setTimeout(startBot, 5000);
  });
}

// Harf harf yazma fonksiyonu
function slowType(bot, text, delay) {
  let i = 0;
  const interval = setInterval(() => {
    if (i >= text.length) {
      clearInterval(interval);
      bot.chat(""); // enter
      return;
    }
    bot.chat(text[i]);
    i++;
  }, delay);
}

startBot();
