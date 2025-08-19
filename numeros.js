function adicionarNovaVogal(embaralhado, acertos) {
    var vogaisDisponiveis = Object.keys(acertos).filter(function(vogal) {
        return acertos[vogal] < 3;
    });
    if (vogaisDisponiveis.length > 0) {
        var novaVogal = vogaisDisponiveis[Math.floor(Math.random() * vogaisDisponiveis.length)];
        embaralhado.push(novaVogal);
        // Não é mais necessário embaralhar o array aqui
    } else {
        alert("Todas as vogais foram acertadas três vezes!");
    }
}

var vogaisPortugues = [  'ichi', 'ni', 'san', 'yon', 'go',
            'roku', 'nana', 'hachi', 'kyuu', 'juu',
            'hyaku', 'sen', 'man',
      
        ];

var emjapones = [  'いち', 'に', 'さん', 'し', 'ご',
            'ろく', 'なな', 'はち', 'きゅう', 'じゅう',
            'ひゃく', 'せん', 'まん',
        ]; 

var vogaisJaponesas = [ '一', '二', '三', '四', '伍',
        '六', '七', '八', '九', '十',
        '百', '千', '万',
           
        ];

var embaralhado = vogaisJaponesas.slice(0, 6).sort(() => Math.random() - 0.5); // Seleciona 6 vogais japonesas e embaralha apenas uma vez
var acertos = {};
vogaisJaponesas.forEach(function(vogal) {
    acertos[vogal] = 0;
});

var indexVogal = 0;
var container = document.querySelector('.container');

function mostrarVogalNaPagina() {
    if (indexVogal < embaralhado.length) {
        container.textContent = embaralhado[indexVogal];
    } else {
        container.textContent = "Fim do jogo!";
    }
}
function verificarResposta(resposta) {
    if (indexVogal < embaralhado.length) {
        var vogalJaponesa = embaralhado[indexVogal];
        var indice = vogaisJaponesas.indexOf(vogalJaponesa);
        var vogalPortuguesaCorrespondente = vogaisPortugues[indice];
        var vogalRomajiCorrespondente = emjapones[indice]; // Adicionado

        resposta = resposta.trim().toLowerCase();

        // Verifica tanto a versão em português quanto em romaji
        if (resposta === vogalPortuguesaCorrespondente || resposta === vogalRomajiCorrespondente) {
            alert("Parabéns! Você acertou!");
            acertos[vogalJaponesa]++;
            if (acertos[vogalJaponesa] === 3) {
                delete acertos[vogalJaponesa];
            }
            indexVogal++;
            mostrarVogalNaPagina();
            adicionarNovaVogal(embaralhado, acertos);
        } else {
            alert("Ops! A resposta correta é: " + vogalPortuguesaCorrespondente + " (em português) ou " + vogalRomajiCorrespondente + " (em romaji)");
        }
    }
}

mostrarVogalNaPagina();
var inputVogal = document.getElementById('inputVogal');
inputVogal.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        verificarResposta(inputVogal.value);
        inputVogal.value = '';
    }
});

