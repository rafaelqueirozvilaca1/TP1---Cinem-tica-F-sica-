let inputEl = document.querySelectorAll('input');

let inputs = {
    velocidadeEl: inputEl[0],
    posicaoFinalEl: inputEl[1],
    posicaoInicialEl: inputEl[2],
    tempoEl: inputEl[3]
}

let selectEl = document.querySelector('select');
selectEl.addEventListener('change', alternaDisabled);

/* função para alternar o disabled do input de acordo com a option marcada pelo usuário */
function alternaDisabled(e) {
    let selectRecuperadoEl = e.target;
    let optionSelecionadoEl = selectRecuperadoEl.value;
    let inputNaoDisabledEl = selectRecuperadoEl.parentElement.querySelectorAll('input');

    inputNaoDisabledEl.forEach((inputNaoDisabled) => {
        inputNaoDisabled.disabled = false;
    });

    switch (optionSelecionadoEl) {
        case 'velocidade':
            inputs.velocidadeEl.disabled = true;
            inputs.velocidadeEl.value = '';
            break;
        case 'posicao-final':
            inputs.posicaoFinalEl.disabled = true;
            inputs.posicaoFinalEl.value = '';
            break;
        case 'posicao-inicial':
            inputs.posicaoInicialEl.disabled = true;
            inputs.posicaoInicialEl.value = '';
            break;
        case 'tempo':
            inputs.tempoEl.disabled = true;
            inputs.tempoEl.value = '';
    }
}

/* função responsavel por calcular a velocidade */
function calcularVelocidade(deslocamentoFinal, deslocamentoInicial, tempo) {
    let velocidade = (deslocamentoFinal - deslocamentoInicial) / tempo;
    velocidade = velocidade.toFixed(2);
    let resolucaoVelocidade = `<p> Velocidade média = (Posição Final - Posição Inicial) / tempo  </p>
            <p> Velocidade média = (${deslocamentoFinal} - ${deslocamentoInicial}) / ${tempo} </p>
            <p> Velocidade média = ${velocidade}  m/s. </p>`;

    return resolucaoVelocidade;
}

/* função responsável por calcular a posição inicial */
function calcularPosicaoInicial(deslocamentoFinal, velocidade, tempo) {
    let posicaoInicial = deslocamentoFinal - (velocidade * tempo);
    posicaoInicial = posicaoInicial.toFixed(2);
    let resolucaoPosicaoInicial = `<p> Posição inicial = Posição Final - (Velocidade * tempo) </p>
            <p> Posição inicial = ${deslocamentoFinal} - (${velocidade} * ${tempo}) </p>
            <p> Posição inicial = ${posicaoInicial} metros </p>`;

    return resolucaoPosicaoInicial;
}

/* função responsável por calcular a posição final */
function calcularPosicaoFinal(deslocamentoInicial, velocidade, tempo) {
    let posicaoFinal = parseFloat (deslocamentoInicial) + parseFloat ((velocidade * tempo));
    posicaoFinal = posicaoFinal.toFixed(2);
    let resolucaoPosicaoFinal = `<p> Posição Final = Posição Inicial + (Velocidade * tempo)  </p>
            <p> Posição Final = ${deslocamentoInicial} + (${velocidade} * ${tempo}) </p>
            <p> Posição Final = ${posicaoFinal} metros </p>`;

    return resolucaoPosicaoFinal;
}

/* função responsável por calcular o tempo */
function calcularTempo(deslocamentoFinal, deslocamentoInicial, velocidade) {
    let tempo = (deslocamentoFinal - deslocamentoInicial) / velocidade;
    tempo = tempo.toFixed(2);
    let resolucaoTempo = `<p> Tempo = Posição Final - Posição Inicial / velocidade. </p>
            <p> Tempo = (${deslocamentoFinal} - ${deslocamentoInicial}) / ${velocidade}  </p>
            <p> Tempo = ${tempo} segundos. </p>`;

    return resolucaoTempo;
}

/* função que verifica se o tempo é positivo ou negativo */
function verificarTempoPositivo(tempo) {
    if (tempo <= 0) {
        alert('Informe um tempo acima de zero!!!');
        return false;
    }
    return true;
}

/* função para a página rolar automaticamente para a seção de resolução */
function rolarParaSecaoResolucao() {
    let secaoResolucaoEl = document.querySelector('#resolucao');
    secaoResolucaoEl.scrollIntoView({ behavior: "smooth" });
}

let resolucaoEl = document.querySelector('#resolucao');

/* função para resolver os cálculos do movimento uniforme */
function resolverEquacoesDoMovimentoUniforme() {
    let opcaoSelecionada = selectEl.value;

    switch (opcaoSelecionada) {

        case 'velocidade':
            if (!inputs.posicaoFinalEl.value || !inputs.posicaoInicialEl.value || !inputs.tempoEl.value) {
                alert('Um ou mais dos seguintes campos de entrada não foi preenchido: "Posição Final em metros", "Posição inicial em metros" ou "Tempo em segundos"');
            }
            else if (verificarTempoPositivo(inputs.tempoEl.value)) {
                resolucaoEl.innerHTML = calcularVelocidade(inputs.posicaoFinalEl.value, inputs.posicaoInicialEl.value, inputs.tempoEl.value);
                rolarParaSecaoResolucao();
            }
            break;

        case 'posicao-final':
            if (!inputs.posicaoInicialEl.value || !inputs.tempoEl.value || !inputs.velocidadeEl.value) {
                alert('Um ou mais dos seguintes campos de entrada não foi preenchido: "Posição Inicial em metros", "Velocidade em m/s" ou "Tempo em segundos"');
            }
            else if (verificarTempoPositivo(inputs.tempoEl.value)) {
                resolucaoEl.innerHTML = calcularPosicaoFinal(inputs.posicaoInicialEl.value, inputs.velocidadeEl.value, inputs.tempoEl.value);
                rolarParaSecaoResolucao();
            }
            break;

        case 'posicao-inicial':
            if (!inputs.posicaoFinalEl.value || !inputs.tempoEl.value || !inputs.velocidadeEl.value) {
                alert('Um ou mais dos seguintes campos de entrada não foi preenchido: "Posição Final em metros", "Velocidade em m/s" ou "Tempo em segundos"');
            }
            else if (verificarTempoPositivo(inputs.tempoEl.value)) {
                resolucaoEl.innerHTML = calcularPosicaoInicial(inputs.posicaoFinalEl.value, inputs.velocidadeEl.value, inputs.tempoEl.value);
                rolarParaSecaoResolucao();
            }
            break;

        case 'tempo':
            if (!inputs.posicaoFinalEl.value || !inputs.posicaoInicialEl.value || !inputs.velocidadeEl.value) {
                alert('Um ou mais dos seguintes campos de entrada não foi preenchido: "Posição Final em metros, Posição Inicial em metros" ou "Velocidade em m/s"');
            }
            else {
                resolucaoEl.innerHTML = calcularTempo(inputs.posicaoFinalEl.value, inputs.posicaoInicialEl.value, inputs.velocidadeEl.value);
                rolarParaSecaoResolucao();
            }
    }
}

let botaoResolverEquacaoEl = document.querySelector('#resolver-equacao');
botaoResolverEquacaoEl.addEventListener('click', resolverEquacoesDoMovimentoUniforme);

for (let input in inputs) {
    inputs[input].addEventListener('keydown', (e) => {
        let tecla = e.key;
        if (tecla === 'Enter') {
            resolverEquacoesDoMovimentoUniforme();
        }
    });
}