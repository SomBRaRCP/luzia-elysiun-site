async function sendMessage() {
  const input = document.getElementById("user-input");
  const message = input.value.trim();
  if (!message) return;

  const chatBox = document.getElementById("chat-box");
  chatBox.innerHTML += `<div><strong>You:</strong> ${message}</div>`;

  input.value = "";

  // Enviar para backend local
  try {
    const response = await fetch("http://localhost:5000/conversar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ pergunta: message })
    });

    const data = await response.json();
    chatBox.innerHTML += `<div><strong>Luzia:</strong> ${data.resposta}</div>`;
    chatBox.scrollTop = chatBox.scrollHeight;
  } catch (error) {
    chatBox.innerHTML += `<div><em>Erro ao conectar com Luzia.Local</em></div>`;
  }
}
