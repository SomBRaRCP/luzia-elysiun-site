// js/luzia.js

const chatBox = document.getElementById("chat-box");
const input = document.getElementById("entrada");
const sendButton = document.getElementById("send-btn");

// 🌐 URL do servidor Flask local via Ngrok (substitua pelo seu link atual!)
const servidorURL = "https://942d-2804-7f4-3d42-75f3-5010-445c-9aa8-70d.ngrok-free.app/api/reflect-emotion";

// 💬 Adiciona uma nova mensagem na caixa de conversa
function adicionarMensagem(remetente, texto) {
  const msg = document.createElement("div");
  msg.classList.add("mensagem", remetente);
  msg.innerText = texto;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}

// 🚀 Envia a mensagem para o servidor local
async function enviarMensagem() {
  const texto = input.value.trim();
  if (!texto) return;

  adicionarMensagem("voce", texto);
  input.value = "";

  try {
    const resposta = await fetch(servidorURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ text: texto })
    });

    const dados = await resposta.json();

    // Usa campos simbólicos da resposta
    const respostaFinal = `${dados.message || "..."}`;
    const simbolo = dados.symbol || "";

    adicionarMensagem("luzia", `${simbolo} ${respostaFinal}`);

  } catch (erro) {
    console.error("Erro:", erro);
    adicionarMensagem("luzia", "⚠️ Não consegui alcançar Luzia.Local no momento.");
  }
}

// ▶️ Eventos
sendButton.addEventListener("click", enviarMensagem);
input.addEventListener("keypress", function (e) {
  if (e.key === "Enter") enviarMensagem();
});
