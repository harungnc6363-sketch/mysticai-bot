const mineflayer = require("mineflayer");
const axios = require("axios");

const GROQ_API_KEY = "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";

const bot = mineflayer.createBot({
  host: "yapsavun.com",
  username: "MysticAI",
  version: false
});

// Yavaş yazma fonksiyonu
function slowChat(text, delay = 150) {
  let i = 0;
  const interval = setInterval(() => {
    bot.chat(text[i]);
    i++;
    if (i >= text.length) clearInterval(interval);
  }, delay);
}

// Chat dinleme
bot.on("messagestr", async (msg) => {
  console.log("[CHAT]", msg);

  if (msg.toLowerCase().includes("zaten kayıtlısınız")) {
    slowChat("/login 123456789_tr");
  }

  if (!msg.startsWith("&ai ")) return;

  const question = msg.replace("&ai ", "");
  await answerAI(question);
});

// AI cevap
async function answerAI(question) {
  try {
    // Wikipedia
    let wikiText = "Bilgi bulunamadı.";
    try {
      const wiki = await axios.get(
        "https://tr.wikipedia.org/api/rest_v1/page/summary/" +
          encodeURIComponent(question)
      );
      wikiText = wiki.data.extract || wikiText;
    } catch {}

    // Groq
    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama3-8b-8192",
        messages: [
          {
            role: "system",
            content:
              "En fazla 4 cümleyle, kısa, net ve doğru cevap ver."
          },
          {
            role: "user",
            content: wikiText + "\n\nSoru: " + question
          }
        ]
      },
      {
        headers: {
          Authorization: `Bearer ${GROQ_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    bot.chat(response.data.choices[0].message.content);
  } catch (err) {
    console.log("AI HATASI:", err.message);
  }
}

// Düşme sebebi
bot.on("kicked", (reason) => {
  console.log("[BOT ATILDI]", reason);
});

// Tekrar bağlanma
bot.on("end", () => {
  console.log("Bağlantı koptu, yeniden başlatılıyor...");
  setTimeout(() => process.exit(1), 3000);
});
