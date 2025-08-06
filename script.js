const elementos = {
    caixaPerguntas: document.querySelector(".caixa-perguntas"),
    caixaAlternativas: document.querySelector(".caixa-alternativas"),
    caixaResultado: document.querySelector(".caixa-resultado"),
    textoResultado: document.querySelector(".texto-resultado"),
    botaoContinuar: document.querySelector(".botao-acao")
};

const perguntas = [
    {
        id: 1,
        enunciado: "No primeiro dia de aula, você derruba seus livros no corredor. Um colega que você nunca notou antes para ajudar a pegar tudo. Quando seus olhos se encontram, você sente algo diferente. O que faz?",
        alternativas: [
            {
                texto: "Agradecer rapidamente e sair, envergonhado(a)",
                consequencia: "Você vai embora, mas não para de pensar naquele sorriso caloroso.",
                pontos: {coragem: -1, conexao: 1}
            },
            {
                texto: "Puxar conversa e perguntar o nome dele(a)",
                consequencia: "Ele(a) se apresenta como Alex e parece interessado(a) em continuar a conversa.",
                pontos: {coragem: 2, conexao: 2}
            }
        ]
    },
    {
        id: 2,
        enunciado: "Na semana seguinte, você vê Alex sozinho(a) na biblioteca. Ele(a) parece estar estudando para a mesma prova que você. O que faz?",
        alternativas: [
            {
                texto: "Sentar-se discretamente em outra mesa e apenas observar",
                consequencia: "Alex não nota sua presença, mas você admira sua concentração.",
                pontos: {coragem: 0, conexao: 0}
            },
            {
                texto: "Aproximar-se e perguntar se podem estudar juntos",
                consequencia: "Alex sorri e faz espaço para você. Vocês passam a tarde estudando e rindo de piadas bobas.",
                pontos: {coragem: 1, conexao: 3}
            }
        ]
    },
    {
        id: 3,
        enunciado: "Alex te manda uma mensagem perguntando se você quer ir ao cinema no sábado. Como responde?",
        alternativas: [
            {
                texto: "Dizer que está ocupado(a) mas talvez outra hora",
                consequencia: "Alex entende, mas você percebe um tom de decepção na resposta.",
                pontos: {coragem: -1, conexao: -1}
            },
            {
                texto: "Aceitar animado(a) e sugerir um filme que ambos gostam",
                consequencia: "A empolgação de Alex é contagiante e vocês combinam todos os detalhes.",
                pontos: {coragem: 2, conexao: 2}
            }
        ]
    },
    {
        id: 4,
        enunciado: "No cinema, durante uma cena emocionante, você percebe que Alex está com a mão muito próxima da sua. O que faz?",
        alternativas: [
            {
                texto: "Ficar imóvel, sem coragem de tomar uma atitude",
                consequencia: "O momento passa e vocês continuam amigos, mas você se pergunta 'e se...'",
                pontos: {coragem: -2, conexao: 0}
            },
            {
                texto: "Tomar coragem e segurar a mão dele(a)",
                consequencia: "Alex entrelaça os dedos com os seus e seu coração parece querer sair do peito.",
                pontos: {coragem: 3, conexao: 3}
            }
        ]
    },
    {
        id: 5,
        enunciado: "Na saída do cinema, sob as luzes das estrelas, Alex fica olhando para você com um sorriso especial. O que faz?",
        alternativas: [
            {
                texto: "Fazer uma piada para quebrar o clima",
                consequencia: "Alex ri, mas o momento mágico se dissipa. Talvez outra hora...",
                pontos: {coragem: -1, conexao: -1}
            },
            {
                texto: "Manter o contato visual e se inclinar lentamente",
                consequencia: "Seus lábios se encontram em um beijo doce e perfeito, como nos melhores filmes.",
                pontos: {coragem: 4, conexao: 4}
            }
        ]
    }
];

let perguntaAtual = 0;
let pontos = {coragem: 0, conexao: 0};

function mostraPergunta() {
    elementos.caixaAlternativas.innerHTML = '';
    elementos.caixaResultado.style.display = 'none';
    
    const pergunta = perguntas[perguntaAtual];
    elementos.caixaPerguntas.textContent = pergunta.enunciado;
    
    pergunta.alternativas.forEach((alternativa, index) => {
        const botao = document.createElement("button");
        botao.className = "botao-alternativa";
        botao.textContent = alternativa.texto;
        botao.addEventListener("click", () => selecionaAlternativa(index));
        elementos.caixaAlternativas.appendChild(botao);
    });
}

function selecionaAlternativa(index) {
    const alternativa = perguntas[perguntaAtual].alternativas[index];
    
    // Atualiza pontos
    pontos.coragem += alternativa.pontos.coragem;
    pontos.conexao += alternativa.pontos.conexao;
    
    // Mostra consequência
    elementos.textoResultado.textContent = alternativa.consequencia;
    elementos.caixaResultado.style.display = 'block';
    elementos.caixaPerguntas.style.display = 'none';
    elementos.caixaAlternativas.style.display = 'none';
}

elementos.botaoContinuar.addEventListener("click", () => {
    perguntaAtual++;
    if (perguntaAtual < perguntas.length) {
        elementos.caixaPerguntas.style.display = 'block';
        elementos.caixaAlternativas.style.display = 'block';
        elementos.caixaResultado.style.display = 'none';
        mostraPergunta();
    } else {
        // Final do jogo - resultado romântico
        let resultadoFinal = "";
        if (pontos.conexao >= 10 && pontos.coragem >= 8) {
            resultadoFinal = "Parabéns! Você e Alex estão oficialmente namorando! Seu romance é doce e cheio de momentos especiais.";
        } else if (pontos.conexao >= 6) {
            resultadoFinal = "Vocês desenvolvem uma bela amizade, mas ambos sabem que há algo mais... quem sabe no futuro?";
        } else {
            resultadoFinal = "Alex continua sendo um colega legal, mas as oportunidades passaram. Talvez na próxima vez você arrisque mais!";
        }
        elementos.textoResultado.textContent = `${resultadoFinal}\n\nPontuação final: Coragem ${pontos.coragem}, Conexão ${pontos.conexao}`;
    }
});

// Inicia o jogo
mostraPergunta();