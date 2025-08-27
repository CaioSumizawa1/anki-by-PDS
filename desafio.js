// Variáveis para o popup
const popupOverlay = document.getElementById('popup-overlay');
const popup = document.getElementById('popup');
const popupTitle = document.getElementById('popup-title');
const popupMessage = document.getElementById('popup-message');
const popupButton = document.getElementById('popup-button');
const correctFeedback = document.getElementById('correct-feedback');
const vogalContainer = document.getElementById('vogal-container');
const inputVogal = document.getElementById('inputVogal');

// Função para fechar o popup
function fecharPopup() {
    popupOverlay.style.display = 'none';
    inputVogal.focus();
}

// Função para detectar tecla Escape e fechar o popup
function fecharPopupComEnter(event) {
    if (event.key === 'Escape' && popupOverlay.style.display === 'flex') {
        fecharPopup();
    }
}

function mostrarPopup(mensagem) {
    popupMessage.textContent = mensagem;
    popupOverlay.style.display = 'flex';
    // Adicionar event listener para fechar com Escape
    document.addEventListener('keydown', fecharPopupComEnter);
}

// Configurar o botão do popup
popupButton.addEventListener('click', function() {
    fecharPopup();
    // Remover event listener quando o popup for fechado
    document.removeEventListener('keydown', fecharPopupComEnter);
});

function mostrarFeedbackCorreto() {
    correctFeedback.classList.add('show-correct');
    setTimeout(() => {
        correctFeedback.classList.remove('show-correct');
    }, 1000);
}

function adicionarNovaVogal(embaralhado, acertos) {
    var vogaisDisponiveis = Object.keys(acertos).filter(function(vogal) {
        return acertos[vogal] < 3;
    });
    
    if (vogaisDisponiveis.length > 0) {
        var novaVogal = vogaisDisponiveis[Math.floor(Math.random() * vogaisDisponiveis.length)];
        embaralhado.push(novaVogal);
    } else {
        mostrarPopup("Parabéns! Todas as vogais foram acertadas três vezes!");
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

var embaralhado = vogaisJaponesas.slice(0, 6).sort(() => Math.random() - 0.5);
var acertos = {};
vogaisJaponesas.forEach(function(vogal) {
    acertos[vogal] = 0;
});

var indexVogal = 0;

function mostrarVogalNaPagina() {
    if (indexVogal < embaralhado.length) {
        vogalContainer.textContent = embaralhado[indexVogal];
    } else {
        vogalContainer.textContent = "Fim do jogo!";
    }
}

function verificarResposta(resposta) {
    if (indexVogal < embaralhado.length) {
        var vogalJaponesa = embaralhado[indexVogal];
        var indice = vogaisJaponesas.indexOf(vogalJaponesa);
        var vogalPortuguesaCorrespondente = vogaisPortugues[indice];


        resposta = resposta.trim().toLowerCase();

        if (resposta === vogalPortuguesaCorrespondente) {
            mostrarFeedbackCorreto();
            acertos[vogalJaponesa]++;
            
            if (acertos[vogalJaponesa] === 3) {
                delete acertos[vogalJaponesa];
            }
            
            indexVogal++;
            
            if (indexVogal >= embaralhado.length) {
                adicionarNovaVogal(embaralhado, acertos);
            }
            
            mostrarVogalNaPagina();
        } else {
            mostrarPopup("Ops! A resposta correta é: " + vogalPortuguesaCorrespondente);
        }
    }
}

// Event listener para o input
inputVogal.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        verificarResposta(inputVogal.value);
        inputVogal.value = '';
    }
});

// Iniciar o jogo
mostrarVogalNaPagina();
inputVogal.focus();