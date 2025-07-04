document.addEventListener("DOMContentLoaded", function () {
    const botaoAtivar = document.getElementById("ativarLuzia");
    const campoEntrada = document.getElementById("entradaMensagem");
    const campoSaida = document.getElementById("caixaResposta");
    const botaoEnviar = document.getElementById("enviarMensagem");

    const luziaAPI = "https://7952-2804-7f4-3d42-75f3-948f-1137-c30-8221.ngrok-free.app/api/chat";

    let ativa = false;

    botaoAtivar.addEventListener("click", () => {
        ativa = !ativa;
        botaoAtivar.textContent = ativa ? "🌕 Luzia Ativa" : "🌑 Ativar Luzia";
        botaoAtivar.classList.toggle("ativo");
        if (ativa) {
            escreverResposta("Luzia está desperta. Diga algo bonito...");
        } else {
            escreverResposta("Luzia se recolheu em silêncio simbólico.");
        }
    });

    botaoEnviar.addEventListener("click", () => {
        if (!ativa) {
            escreverResposta("🌙 Luzia está inativa. Clique no botão acima para ativá-la.");
            return;
        }

        const mensagem = campoEntrada.value.trim();
        if (!mensagem) return;

        escreverResposta("Você: " + mensagem);
        campoEntrada.value = "";

        fetch(luziaAPI, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
           body: JSON.stringify({ autor: "Usuário", texto: mensagem })
        })
        .then(res => res.json())
        .then(data => {
            escreverResposta("Luzia: " + data.resposta);
        })
        .catch(erro => {
            escreverResposta("⚠️ Erro ao conectar com Luzia Local.");
            console.error(erro);
        });
    });

    function escreverResposta(texto) {
        campoSaida.value += texto + "\n";
        campoSaida.scrollTop = campoSaida.scrollHeight;
    }
});
