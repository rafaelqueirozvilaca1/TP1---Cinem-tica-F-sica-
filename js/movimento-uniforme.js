let inputEl = document.querySelectorAll('input');

let inputs = {
    velocidadeEl: inputEl[0],
    posicaoFinalEl: inputEl[1], 
    posicaoInicialEl: inputEl[2], 
    tempoEl: inputEl[3] 
}

let selectEl = document.querySelector ('select');
selectEl.addEventListener ('change', alternaDisabled);

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

function calcularVelocidade (deslocamentoFinal, deslocamentoInicial, tempo) {
    return `<p> Velocidade média = (Posição Final - Posição Inicial) / tempo </p>
            <p> Velocidade média = (${deslocamentoFinal} - ${deslocamentoInicial}) / ${tempo} </p>
            <p> Velocidade média = ${(deslocamentoFinal - deslocamentoInicial) / tempo}  m/s. </p>`;
}

function calcularPosicaoInicial (deslocamentoFinal, velocidade, tempo) {
    return `<p> Posição inicial = Posição Final - (Velocidade * tempo) </p>
            <p> Posição inicial = ${deslocamentoFinal} - (${velocidade} * ${tempo}) </p>
            <p> Posição inicial = ${deslocamentoFinal - (velocidade * tempo)} metros </p>`;
}

function calcularPosicaoFinal (deslocamentoInicial, velocidade, tempo) {
    return `<p> Posição Final = Posição Inicial - (Velocidade * tempo) </p>
            <p> Posição Final = ${deslocamentoInicial} + (${velocidade} * ${tempo}) </p>
            <p> Posição Final = ${deslocamentoInicial + (velocidade * tempo)} metros </p>`;
}

function calcularTempo (deslocamentoFinal, deslocamentoInicial, velocidade) {
    return `<p> Tempo = Posição Final - Posição Inicial / velocidade. </p>
            <p> Tempo = ${deslocamentoFinal} - ${deslocamentoInicial} / ${velocidade} </p>
            <p> Tempo = ${deslocamentoFinal - deslocamentoInicial / velocidade} segundos </p>`;
}

function verificarTempoPositivo (tempo) {
    if (tempo < 0) { 
        alert('Informe um tempo acima de zero!!!');
        return false;
    }
    return true;
}

function retornarAlertaCampoNaoPreenchido () {
    alert ('Preencha com dados numéricos todos os campos de entrada.');
}

let resolucaoEl = document.querySelector ('#resolucao');

function resolverEquacoesDoMovimentoUniforme () {
    let opcaoSelecionada = selectEl.value;

    switch (opcaoSelecionada) {

        case 'velocidade':
            if (!inputs.posicaoFinalEl.value || !inputs.posicaoInicialEl.value || !inputs.tempoEl.value) {
                retornarAlertaCampoNaoPreenchido ();
            } 
            else if (verificarTempoPositivo (inputs.tempoEl.value)) {
                resolucaoEl.innerHTML = calcularVelocidade(inputs.posicaoFinalEl.value, inputs.posicaoInicialEl.value, inputs.tempoEl.value);
            }
            break;

        case 'posicao-final':
            if (!inputs.posicaoInicialEl.value || !inputs.tempoEl.value || !inputs.velocidadeEl.value) {
                retornarAlertaCampoNaoPreenchido ();
            }
            else if (verificarTempoPositivo (inputs.tempoEl.value)) {
                resolucaoEl.innerHTML = calcularPosicaoFinal(inputs.posicaoFinalEl.value, inputs.velocidadeEl.value, inputs.tempoEl.value);
            }
            break;

        case 'posicao-inicial':
            if (!inputs.posicaoFinalEl.value || !inputs.tempoEl.value || !inputs.velocidadeEl.value) {
                retornarAlertaCampoNaoPreenchido ();
            } 
            else if (verificarTempoPositivo (inputs.tempoEl.value)) {
                resolucaoEl.innerHTML = calcularPosicaoInicial(inputs.posicaoFinalEl.value, inputs.velocidadeEl.value, inputs.tempoEl.value);
            }    
            break;

        case 'tempo':
            if (!inputs.posicaoFinalEl.value || !inputs.posicaoInicialEl.value || !inputs.velocidadeEl.value) {
                retornarAlertaCampoNaoPreenchido ();
            }
            else {
                resolucaoEl.innerHTML = calcularTempo(inputs.posicaoFinalEl.value, inputs.posicaoInicialEl.value, inputs.velocidadeEl.value);
            }
    }
}

let botaoResolverEquacaoEl = document.querySelector ('#resolver-equacao');
botaoResolverEquacaoEl.addEventListener ('click', resolverEquacoesDoMovimentoUniforme);