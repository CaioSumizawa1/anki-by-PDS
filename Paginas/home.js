function mudarSlide(elementSelector, n) {
    var element = document.querySelector(elementSelector);
    var slides = element.querySelectorAll('.slides .slide');
    var currentIndex = Array.from(slides).findIndex(slide => slide.classList.contains('ativo'));
    var nextIndex = (currentIndex + n + slides.length) % slides.length;

    slides[currentIndex].classList.remove('ativo');
    slides[nextIndex].classList.add('ativo');
}

document.addEventListener('DOMContentLoaded', function () {
    var botaoAlfabeto = document.querySelector('.botao-alfabeto .botao-dificuldade');
    var botaoDificuldade = document.querySelector('.botao-dificuldade .botao-dificuldade');

    botaoAlfabeto.querySelector('.botao-anterior').addEventListener('click', function () {
        mudarSlide(botaoAlfabeto, -1);
    });

    botaoAlfabeto.querySelector('.botao-proximo').addEventListener('click', function () {
        mudarSlide(botaoAlfabeto, 1);
    });

    botaoDificuldade.querySelector('.botao-anterior').addEventListener('click', function () {
        mudarSlide(botaoDificuldade, -1);
    });

    botaoDificuldade.querySelector('.botao-proximo').addEventListener('click', function () {
        mudarSlide(botaoDificuldade, 1);
    });
});
