let movimentos = [];

function abrirAba(nome) {
    document.querySelectorAll('.aba').forEach(aba => {
        aba.classList.remove('ativa');
    });

    document.querySelectorAll('.abas button').forEach(botao => {
        botao.classList.remove('ativo');
    });

    document.getElementById(nome).classList.add('ativa');

    event.target.classList.add('ativo');

    atualizarResumo();
}

function salvarEntrada(event) {
    event.preventDefault();

    movimentos.push({
        tipo: 'E',
        data: document.getElementById('entradaData').value,
        descricao: document.getElementById('entradaDescricao').value,
        categoria: document.getElementById('entradaCategoria').value,
        forma: document.getElementById('entradaForma').value,
        valor: parseFloat(document.getElementById('entradaValor').value || 0),
        observacao: document.getElementById('entradaObservacao').value
    });

    event.target.reset();
    atualizarResumo();

    alert('Entrada salva com sucesso!');
}

function salvarSaida(event) {
    event.preventDefault();

    movimentos.push({
        tipo: 'S',
        data: document.getElementById('saidaData').value,
        descricao: document.getElementById('saidaDescricao').value,
        categoria: document.getElementById('saidaTipo').value,
        forma: document.getElementById('saidaForma').value,
        valor: parseFloat(document.getElementById('saidaValor').value || 0),
        observacao: document.getElementById('saidaObservacao').value
    });

    event.target.reset();
    atualizarResumo();

    alert('Saída salva com sucesso!');
}

function atualizarResumo() {
    let entradas = movimentos
        .filter(m => m.tipo === 'E')
        .reduce((total, m) => total + m.valor, 0);

    let saidas = movimentos
        .filter(m => m.tipo === 'S')
        .reduce((total, m) => total + m.valor, 0);

    let lucro = entradas - saidas;
    let margem = entradas > 0 ? (lucro / entradas) * 100 : 0;

    document.getElementById('totalEntradas').innerText = formatarMoeda(entradas);
    document.getElementById('totalSaidas').innerText = formatarMoeda(saidas);
    document.getElementById('lucroLiquido').innerText = formatarMoeda(lucro);
    document.getElementById('saldoAtual').innerText = formatarMoeda(lucro);

    document.getElementById('calcEntradas').innerText = formatarMoeda(entradas);
    document.getElementById('calcSaidas').innerText = formatarMoeda(saidas);
    document.getElementById('calcLucro').innerText = formatarMoeda(lucro);
    document.getElementById('calcMargem').innerText = margem.toFixed(2) + '%';

    gerarGrafico(entradas, saidas, lucro);
}

function formatarMoeda(valor) {
    return valor.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });
}

let grafico = null;

function gerarGrafico(entradas, saidas, lucro) {
    const ctx = document.getElementById('graficoFinanceiro');

    if (!ctx) {
        return;
    }

    if (grafico) {
        grafico.destroy();
    }

    grafico = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Entradas', 'Saídas', 'Lucro'],
            datasets: [{
                label: 'Resumo Financeiro',
                data: [entradas, saidas, lucro]
            }]
        }
    });
}