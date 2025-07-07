const chat = document.getElementById('chat-history');
const form = document.getElementById('prompt-form');
const input = document.getElementById('prompt');

form.onsubmit = async (e) => {
  e.preventDefault();
  const userMsg = input.value.trim();
  if (!userMsg) return;
  showMessage(userMsg, "user");
  input.value = "";
  input.focus();

  // Substitua pela sua URL ngrok se não for local
  const endpoint = "http://https://773a-2804-7f4-3d42-75f3-5010-445c-9aa8-70d.ngrok-free.app/conversar";

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pergunta: userMsg })
    });
    const data = await res.json();
    showMessage(data.resposta || "[sem resposta]", "bot");
    chat.scrollTop = chat.scrollHeight;
  } catch {
    showMessage("❌ Erro ao conectar com Luzia.Local", "bot");
  }
};

function showMessage(text, sender = "bot") {
  const div = document.createElement('div');
  div.className = "msg " + sender;
  div.innerHTML = `<strong>${sender === "user" ? "Você" : "Luzia"}:</strong> ${text}`;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}
