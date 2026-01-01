// ==== HTTP SERVER (Render için zorunlu) ====
const http = require("http");
const PORT = process.env.PORT || 3000;

http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("MysticAI bot is running");
}).listen(PORT, () => {
  console.log("HTTP server running on port", PORT);
});

// ==== MINEFLAYER BOT ====
const mineflayer = require("mineflayer");

const HOST = "yapsavun.com";
const USERNAME = "MysticAI";
const PASSWORD = "123456789_tr";

function startBot() {
  console.log("Bot başlatılıyor...");

  const bot = mineflayer.createBot({
    host: HOST,
    username: USERNAME,
    version: false
  });

  bot.on("login", () => {
    console.log("Sunucuya bağlanıldı");
  });

  bot.on("spawn", () => {
    console.log("Spawn oldu, /login bekleniyor...");

    setTimeout(() => {
      slowType(bot, `/login ${PASSWORD}`, 150);
    }, 2500);
  });

  bot.on("message", (msg) => {
    console.log("[CHAT]", msg.toString());
  });

  bot.on("kicked", (reason) => {
    console.log("[BOT ATILDI]", reason);
  });

  bot.on("end", () => {
    console.log("Bağlantı koptu, 5 sn sonra yeniden bağlanılıyor...");
    setTimeout(startBot, 5000);
  });

  bot.on("error", (err) => {
    console.log("HATA:", err);
  });
}

// Harf harf yazma (insan gibi)
function slowType(bot, text, delay) {
  let i = 0;
  const interval = setInterval(() => {
    if (i >= text.length) {
      clearInterval(interval);
      return;
    }
    bot.chat(text[i]);
    i++;
  }, delay);
}

startBot();
