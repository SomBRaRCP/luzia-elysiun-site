// js/luzia.js

// Função para enviar mensagem para Luzia via servidor local
async function enviarMensagem() {
  const entrada = document.getElementById("entradaTexto").value;
  if (!entrada.trim()) return;

  adicionarNaTela("Você", entrada);
  document.getElementById("entradaTexto").value = "";

  try {
    const resposta = await fetch("http://localhost:8000/perguntar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ pergunta: entrada }),
    });

    const dados = await resposta.json();
    adicionarNaTela("Luzia", dados.resposta);
  } catch (erro) {
    adicionarNaTela("Luzia", "⚠️ Não consegui me conectar ao servidor local.");
    console.error("Erro na conexão:", erro);
  }
}

// Adiciona mensagem no chat visual
function adicionarNaTela(autor, texto) {
  const area = document.getElementById("areaDialogo");
  const linha = document.createElement("div");
  linha.className = "mensagem";
  linha.innerHTML = `<strong>${autor}:</strong> ${texto}`;
  area.appendChild(linha);
  area.scrollTop = area.scrollHeight;
}

// Enviar com Enter
window.addEventListener("DOMContentLoaded", () => {
  const campo = document.getElementById("entradaTexto");
  campo.addEventListener("keypress", function (e) {
    if (e.key === "Enter") enviarMensagem();
  });

  document.getElementById("botaoEnviar").addEventListener("click", enviarMensagem);
});
