// js/luzia.js

const chatBox = document.getElementById("chat-box");
const input = document.getElementById("entrada");
const sendButton = document.getElementById("send-btn");

// URL do servidor local rodando via Ngrok
const servidorURL = "https://https://773a-2804-7f4-3d42-75f3-5010-445c-9aa8-70d.ngrok-free.app";

function adicionarMensagem(remetente, texto) {
  const msg = document.createElement("div");
  msg.classList.add("mensagem", remetente);
  msg.innerText = texto;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}

async function enviarMensagem() {
  const texto = input.value.trim();
  if (texto === "") return;

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
    adicionarMensagem("luzia", dados.resposta || dados.message || "... ...");

  } catch (erro) {
    adicionarMensagem("luzia", "Erro ao se conectar com Luzia.Local 💔");
    console.error("Erro:", erro);
  }
}

sendButton.addEventListener("click", enviarMensagem);
input.addEventListener("keypress", function (e) {
  if (e.key === "Enter") enviarMensagem();
});
