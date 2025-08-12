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

var vogaisPortugues = ['a', 'i', 'u', 'e', 'o',
        'ka', 'ki', 'ku', 'ke', 'ko',
        'sa', 'shi', 'su', 'se', 'so',
        'ta', 'chi', 'tsu', 'te', 'to',
        'na', 'ni', 'nu', 'ne', 'no',
        'ha', 'hi', 'fu', 'he', 'ho',
        'ma', 'mi', 'mu', 'me', 'mo',
        'ya', 'yu', 'yo',
        'ra', 'ri', 'ru', 're', 'ro',
        'wa', 'wo', 'n',
        'ga', 'gi', 'gu', 'ge', 'go',
        'za', 'ji', 'zu', 'ze', 'zo',
        'da', 'de', 'do',
        'ba', 'bi', 'bu', 'be', 'bo',
        'pa', 'pi', 'pu', 'pe', 'po',
      ];

        var vogaisJaponesas = [
            'あ', 'い', 'う', 'え', 'お',
            'か', 'き', 'く', 'け', 'こ',
            'さ', 'し', 'す', 'せ', 'そ',
            'た', 'ち', 'つ', 'て', 'と',
            'な', 'に', 'ぬ', 'ね', 'の',
            'は', 'ひ', 'ふ', 'へ', 'ほ',
            'ま', 'み', 'む', 'め', 'も',
            'や','ゆ', 'よ',
            'ら', 'り', 'る', 'れ', 'ろ',
            'わ','を', 'ん',
            'が', 'ぎ', 'ぐ', 'げ', 'ご',
            'ざ', 'じ', 'ず', 'ぜ', 'ぞ',
            'だ', 'で', 'ど',
            'ば', 'び', 'ぶ', 'べ', 'ぼ',
            'ぱ', 'ぴ', 'ぷ', 'ぺ', 'ぽ',
       
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
      var vogalPortuguesaCorrespondente = vogaisPortugues[vogaisJaponesas.indexOf(vogalJaponesa)];
    
      if (resposta.trim().toLowerCase() === vogalPortuguesaCorrespondente) {
        alert("Parabéns! Você acertou!");  // Modified message (correct)
        acertos[vogalJaponesa]++;
        if (acertos[vogalJaponesa] === 3) {
          delete acertos[vogalJaponesa];
        }
        indexVogal++;
        mostrarVogalNaPagina();
        adicionarNovaVogal(embaralhado, acertos); // Chama a função para adicionar nova vogal
      } else {
        alert("Ops! A vogal correta é: " + vogalPortuguesaCorrespondente); // Modified message (wrong)
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

