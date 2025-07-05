const luziaAPI = " https://5a5d-2804-7f4-3d42-75f3-1127-9100-65f5-4944.ngrok-free.app -> http://localhost:8000 ";

document.getElementById("enviar").addEventListener("click", async () => {
    const entrada = document.getElementById("entrada");
    const mensagem = entrada.value.trim();
    if (!mensagem) return;

    adicionarNaConversa("Você", mensagem);
    entrada.value = "⏳ Luzia está pensando...";

    try {
        const resposta = await fetch(luziaAPI, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                autor: "Usuário",
                texto: mensagem
            })
        });

        const dados = await resposta.json();
        adicionarNaConversa("Luzia", dados.resposta || "⚠️ Erro ao interpretar resposta.");
    } catch (erro) {
        console.error("Erro ao comunicar com Luzia.Local:", erro);
        adicionarNaConversa("Luzia", "❌ Erro de conexão com o servidor local.");
    }

    entrada.value = "";
});

function adicionarNaConversa(remetente, texto) {
    const conversa = document.getElementById("conversa");
    const p = document.createElement("p");
    p.innerHTML = `<strong>${remetente}:</strong> ${texto}`;
    conversa.appendChild(p);
    conversa.scrollTop = conversa.scrollHeight;
}
