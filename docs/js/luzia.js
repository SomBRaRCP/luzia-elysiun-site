const chatBox = document.getElementById("chat-box");
const input = document.getElementById("entrada");
const sendButton = document.getElementById("send-btn");

const servidorURL = "https://77a5-2804-7f4-3d42-75f3-5010-445c-9aa8-70d.ngrok-free.app/conversar";

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
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mensagem: texto }),
    });

    const dados = await resposta.json();
    adicionarMensagem("luzia", dados.resposta);
  } catch (erro) {
    adicionarMensagem("luzia", "⚠️ Erro ao se conectar com Luzia.Local.");
  }
}

sendButton.addEventListener("click", enviarMensagem);
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") enviarMensagem();
});
