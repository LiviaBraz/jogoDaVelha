var jogador, vencedor = null;
var jogadorSelecionado = document.getElementById('jogador-selecionado');
var vencedorSelecionado = document.getElementById('vencedor-selecionado');
var modoJogo;

mudarJogador('X');

function iniciarJogo(modo) {
    modoJogo = modo;

    if (modo === 'multiplayer') {
        document.getElementById('modoJogo').style.display = 'none';
        document.getElementById('jogoDaVelha').style.display = 'block';
    } else if (modo === 'computador') {
        document.getElementById('modoJogo').style.display = 'none';
        document.getElementById('jogoDaVelha').style.display = 'block';
        jogadaComputador();
    }
}


function escolherQuadrado(id) {
    if (vencedor !== null || (jogador !== 'X' && jogador !== 'O')) {
        return;
    }

    var quadrado = document.getElementById(id);
    if (quadrado.innerHTML !== '-') {
        return;
    }

    quadrado.innerHTML = jogador;
    quadrado.style.color = '#000';

    if (jogador === 'X') {
        mudarJogador('O');
        if (modoJogo === 'computador') {
            jogadaComputador();
        }
    } else {
        mudarJogador('X');
    }

    checaVencedor();
}

function jogadaComputador() {
    if (jogador === 'O') {
        // Lógica para o computador (jogada aleatória)
        var quadradosVazios = [];

        for (var i = 1; i <= 9; i++) {
            var quadrado = document.getElementById(i);
            if (quadrado.innerHTML === '-') {
                quadradosVazios.push(quadrado);
            }
        }

        setTimeout(function() {

            var posAleatoria = Math.floor(Math.random() * quadradosVazios.length);
            var quadradoEscolhido = quadradosVazios[posAleatoria];
            quadradoEscolhido.innerHTML = 'O';
            quadradoEscolhido.style.color = '#000';

            mudarJogador('X');
            checaVencedor();
        },2000)
    }
}

function mudarJogador(valor) {
    jogador = valor;
    jogadorSelecionado.innerHTML = jogador;
}

function checaVencedor() {
    const sequencias = [
        [1, 2, 3], [4, 5, 6], [7, 8, 9],
        [1, 4, 7], [2, 5, 8], [3, 6, 9],
        [1, 5, 9], [3, 5, 7]
    ];

    for (const sequencia of sequencias) {
        const [a, b, c] = sequencia.map(num => document.getElementById(num));

        if (checaSequencia(a, b, c)) {
            mudaCorQuadrado(a, b, c);
            mudarVencedor(a);

            // Adicione uma mensagem para anunciar o vencedor
            if (a.innerHTML === 'X') {
                alert("Jogador X venceu!");
            } else {
                alert("Jogador O venceu!");
            }

            return;
        }
    }

    // Se não houver vencedor e todos os quadrados estiverem preenchidos, é um empate
    if (todosQuadradosPreenchidos()) {
        alert("Empate!");
    }
}

function todosQuadradosPreenchidos() {
    for (let i = 1; i <= 9; i++) {
        if (document.getElementById(i).innerHTML === '-') {
            return false;
        }
    }
    return true;
}

function mudarVencedor(quadrado) {
    vencedor = quadrado.innerHTML;
    vencedorSelecionado.innerHTML = vencedor;
}

function mudaCorQuadrado(quadrado1, quadrado2, quadrado3) {
    quadrado1.style.background = '#0f0';
    quadrado2.style.background = '#0f0';
    quadrado3.style.background = '#0f0';
}

function checaSequencia(quadrado1, quadrado2, quadrado3) {
    return quadrado1.innerHTML !== '-' &&
        quadrado1.innerHTML === quadrado2.innerHTML &&
        quadrado2.innerHTML === quadrado3.innerHTML;
}

function reiniciar()
{
    vencedor = null;
    vencedorSelecionado.innerHTML = '';

    for (var i = 1; i <= 9; i++) {
        var quadrado = document.getElementById(i);
        quadrado.style.background = '#1ab3b3';
        quadrado.style.color = '#eee';
        quadrado.innerHTML = '-';
    }

    mudarJogador('X');
}