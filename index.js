// ===== RENDER HTTP SERVER (ZORUNLU) =====
const http = require("http");

const PORT = process.env.PORT || 3000;
http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("MysticAI running");
}).listen(PORT, () => {
  console.log("HTTP server listening on", PORT);
});

// ===== MINEFLAYER =====
const mineflayer = require("mineflayer");

const HOST = "yapsavun.com";
const USERNAME = "MysticAI";
const PASSWORD = "123456789_tr";

let bot;

function startBot() {
  console.log("Bot başlatılıyor...");

  bot = mineflayer.createBot({
    host: HOST,
    username: USERNAME,
    version: false
  });

  bot.once("spawn", () => {
    console.log("Spawn oldu, login gönderiliyor...");

    setTimeout(() => {
      bot.chat(`/login ${PASSWORD}`);
      console.log("/login gönderildi");
    }, 800); // ÇOK KRİTİK
  });

  bot.on("message", (msg) => {
    console.log("[CHAT]", msg.toString());
  });

  bot.on("kicked", (reason) => {
    console.log("[BOT ATILDI]", reason);
  });

  bot.on("end", () => {
    console.log("Bağlantı koptu, 6 sn sonra yeniden bağlanılıyor...");
    setTimeout(startBot, 6000);
  });

  bot.on("error", (err) => {
    console.log("HATA:", err);
  });
}

// Node asla kapanmasın
process.on("uncaughtException", err => {
  console.log("UNCAUGHT:", err);
});
process.on("unhandledRejection", err => {
  console.log("REJECTION:", err);
});

startBot();
