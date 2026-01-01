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

let loggingIn = false;

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

  bot.on("message", (msg) => {
    const text = msg.toString();
    console.log("[CHAT]", text);

    // SUNUCU LOGIN ISTEDIGINDE
    if (
      text.includes("/login") &&
      !loggingIn
    ) {
      loggingIn = true;

      console.log("Login algılandı, 2 sn sonra gönderiliyor...");

      setTimeout(() => {
        bot.chat(`/login ${PASSWORD}`);
        console.log("/login gönderildi");
      }, 2000);
    }
  });

  bot.on("kicked", (reason) => {
    console.log("[BOT ATILDI]", reason);
  });

  bot.on("end", () => {
    console.log("Bağlantı koptu, 5 sn sonra yeniden bağlanılıyor...");
    loggingIn = false;
    setTimeout(startBot, 5000);
  });

  bot.on("error", (err) => {
    console.log("HATA:", err);
  });
}

startBot();
