let inputEl = document.querySelectorAll('input');

let inputs = {
    velocidadeEl: inputEl[0],
    posicaoFinalEl: inputEl[1],
    posicaoInicialEl: inputEl[2],
    tempoEl: inputEl[3]
}

let selectEl = document.querySelector('select');
selectEl.addEventListener('change', alternaDisabled);

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

function calcularVelocidade(deslocamentoFinal, deslocamentoInicial, tempo) {
    let velocidade = (deslocamentoFinal - deslocamentoInicial) / tempo;
    return `<p> Velocidade média = (Posição Final - Posição Inicial) / tempo <br> </p>
            <p> Velocidade média = (${deslocamentoFinal} - ${deslocamentoInicial}) / ${tempo} </p>
            <p> Velocidade média = ${velocidade.toFixed(2)}  m/s. </p>`;
}

function calcularPosicaoInicial(deslocamentoFinal, velocidade, tempo) {
    let posicaoInicial = deslocamentoFinal - (velocidade * tempo);
    return `<p> Posição inicial = Posição Final - (Velocidade * tempo) <br> </p>
            <p> Posição inicial = ${deslocamentoFinal} - (${velocidade} * ${tempo}) <br> </p>
            <p> Posição inicial = ${posicaoInicial.toFixed(2)} metros <br> </p>`;
}

function calcularPosicaoFinal(deslocamentoInicial, velocidade, tempo) {
    let posicaoFinal = deslocamentoInicial + (velocidade * tempo);
    return `<p> Posição Final = Posição Inicial + (Velocidade * tempo) <br> </p>
            <p> Posição Final = ${deslocamentoInicial} + (${velocidade} * ${tempo}) <br> </p>
            <p> Posição Final = ${posicaoFinal.toFixed(2)} metros <br> </p>`;
}

function calcularTempo(deslocamentoFinal, deslocamentoInicial, velocidade) {
    let tempo = deslocamentoFinal - deslocamentoInicial / velocidade;
    return `<p> Tempo = Posição Final - Posição Inicial / velocidade. <br></p>
            <p> Tempo = ${deslocamentoFinal} - ${deslocamentoInicial} / ${velocidade} <br> </p>
            <p> Tempo = ${tempo.toFixed(2)} segundos <br> </p>`;
}

function verificarTempoPositivo(tempo) {
    if (tempo < 0) {
        alert('Informe um tempo acima de zero!!!');
        return false;
    }
    return true;
}

function retornarAlertaCampoNaoPreenchido() {
    alert('Preencha com dados numéricos todos os campos de entrada.');
}

let resolucaoEl = document.querySelector('#resolucao');

function resolverEquacoesDoMovimentoUniforme() {
    let opcaoSelecionada = selectEl.value;

    switch (opcaoSelecionada) {

        case 'velocidade':
            if (!inputs.posicaoFinalEl.value || !inputs.posicaoInicialEl.value || !inputs.tempoEl.value) {
                retornarAlertaCampoNaoPreenchido();
            }
            else if (verificarTempoPositivo(inputs.tempoEl.value)) {
                resolucaoEl.innerHTML = calcularVelocidade(inputs.posicaoFinalEl.value, inputs.posicaoInicialEl.value, inputs.tempoEl.value);
            }
            break;

        case 'posicao-final':
            if (!inputs.posicaoInicialEl.value || !inputs.tempoEl.value || !inputs.velocidadeEl.value) {
                retornarAlertaCampoNaoPreenchido();
            }
            else if (verificarTempoPositivo(inputs.tempoEl.value)) {
                resolucaoEl.innerHTML = calcularPosicaoFinal(inputs.posicaoFinalEl.value, inputs.velocidadeEl.value, inputs.tempoEl.value);
            }
            break;

        case 'posicao-inicial':
            if (!inputs.posicaoFinalEl.value || !inputs.tempoEl.value || !inputs.velocidadeEl.value) {
                retornarAlertaCampoNaoPreenchido();
            }
            else if (verificarTempoPositivo(inputs.tempoEl.value)) {
                resolucaoEl.innerHTML = calcularPosicaoInicial(inputs.posicaoFinalEl.value, inputs.velocidadeEl.value, inputs.tempoEl.value);
            }
            break;

        case 'tempo':
            if (!inputs.posicaoFinalEl.value || !inputs.posicaoInicialEl.value || !inputs.velocidadeEl.value) {
                retornarAlertaCampoNaoPreenchido();
            }
            else {
                resolucaoEl.innerHTML = calcularTempo(inputs.posicaoFinalEl.value, inputs.posicaoInicialEl.value, inputs.velocidadeEl.value);
            }
    }
}

let botaoResolverEquacaoEl = document.querySelector('#resolver-equacao');
botaoResolverEquacaoEl.addEventListener('click', resolverEquacoesDoMovimentoUniforme);

for (let input in inputs) {
    inputs[input].addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            resolverEquacoesDoMovimentoUniforme();
        }
    });
}