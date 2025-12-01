const repassesGov = require('../data/dados-gov.json');
const repassesGovTwist = require('../data/dados-gov-twist.json');
const repassesValidados = repassesGovTwist.filter(elemento => !(elemento.status === 'falha' && elemento.motivo === undefined)); //H6
const repassesInvalidados = repassesGovTwist.filter(elemento => (elemento.status === 'falha' && elemento.motivo === undefined));

function totalDeRepasses(repassesDoGoverno) {              //H 1 & 2
  console.log(`Total de repasses processados: ${repassesDoGoverno.length}`);
  stringDeRepeticao('-', 66);
}

function quantidadeRepassesPorStatus(repassesDoGoverno, status) {
  if (status === 'sucesso') {
    console.log(`Total de repasses bem sucedidos: ${repassesDoGoverno.filter(filtrarPorStatus(status)).length}`);
    stringDeRepeticao('-', 66);
  } else {
    console.log(`Total de repasses com falha: ${repassesDoGoverno.filter(filtrarPorStatus(status)).length}`);
    stringDeRepeticao('-', 66);
  }
}

function repassesPorStatusCadaOrgao(repassesDoGoverno, status) {
  const orgaosUnicos = listarOrgaosUnicosPorStatus(repassesDoGoverno, status);
  if (status === 'sucesso') {
    console.log('Repasses bem sucedidos por órgão:\n');
    for (let i = 0; i < orgaosUnicos.length; i++) {
      let totalDeRepassesPorOrgao = repassesDoGoverno.filter(elemento => elemento.status === status && elemento.orgao === orgaosUnicos[i]).length;
      console.log(`${orgaosUnicos[i]}: ${totalDeRepassesPorOrgao}`);
    }
    stringDeRepeticao('-', 66)
  } else {
    console.log('Repasses com falha por órgão:\n');
    for (let i = 0; i < orgaosUnicos.length; i++) {
      let totalDeRepassesPorOrgao = repassesDoGoverno.filter(elemento => elemento.status === status && elemento.orgao === orgaosUnicos[i]).length;
      console.log(`${orgaosUnicos[i]}: ${totalDeRepassesPorOrgao}`);
    }
    stringDeRepeticao('-', 66)
  }
}

function valorTotalDeRepassesPorStatus(repassesDoGoverno, status) {
  if (status === 'sucesso') {
    console.log(`Valor total em repasses com sucesso: R$ ${repassesDoGoverno.filter(filtrarPorStatus(status))
      .reduce(reduceSomarValores(), 0).toFixed(2)}`);
    stringDeRepeticao('-', 66);
  } else {
    console.log(`Valor total em falhas: R$ ${repassesDoGoverno.filter(filtrarPorStatus('falha'))
      .reduce(reduceSomarValores(), 0).toFixed(2)}`);
    stringDeRepeticao('-', 66);
  }
}

function valorTotalCadaOrgaoPorStatus(repassesDoGoverno, status) {
  const orgaosUnicos = listarOrgaosUnicosPorStatus(repassesDoGoverno, status);
  if (status === 'sucesso') {
    console.log('Valor por órgão com sucesso:\n')
    for (let i = 0; i < orgaosUnicos.length; i++) {
      console.log(`${orgaosUnicos[i]}: R$ ${repassesDoGoverno
        .filter(elemento => elemento.orgao === orgaosUnicos[i] && elemento.status === status)
        .reduce(reduceSomarValores(), 0).toFixed(2)}`);
    }
    stringDeRepeticao('-', 66);
  } else {
    console.log('Valor total de repasses com falha por órgão:\n')
    for (let i = 0; i < orgaosUnicos.length; i++) {
      console.log(`${orgaosUnicos[i]}: R$ ${repassesDoGoverno
        .filter(elemento => elemento.orgao === orgaosUnicos[i] && elemento.status === 'falha')
        .reduce(reduceSomarValores(), 0).toFixed(2)}`);
    }
    stringDeRepeticao('-', 66);
  }
}

function totalFalhasComMotivo(repassesDoGoverno) {
  console.log(`Quantidade total de repasses com falha por motivo: ${repassesDoGoverno.filter(elemento => elemento.status === 'falha' && elemento.motivo).length}`);
  stringDeRepeticao('-', 66);
}

function valorTotalPorCadaMotivo(repassesDoGoverno) {
  const motivosUnicos = listarMotivosUnicos(repassesDoGoverno);
  console.log('Valor total por cada motivo de falha:\n');
  for (let i = 0; i < motivosUnicos.length; i++) {
    console.log(`${motivosUnicos[i]}: R$ ${repassesDoGoverno
      .filter(elemento => elemento.motivo === motivosUnicos[i])
      .reduce(reduceSomarValores(), 0).toFixed(2)}`);
  }
  stringDeRepeticao('-', 66);
}

function repasseMaiorValor(repassesDoGoverno) {            //H3
  console.log("Repasse de maior valor:");
  console.table(ordenarDrescente(repassesDoGoverno, 'valor')[0]);
  stringDeRepeticao('-', 66);
}

function repasseMenorValor(repassesDoGoverno) {
  console.log("Repasse de menor valor:");
  const valorOrdenado = ordenarDrescente(repassesDoGoverno, 'valor');
  console.table(valorOrdenado[valorOrdenado.length - 1]);
  stringDeRepeticao('-', 66);
}

function diaComMaisRepasses(repassesDoGoverno) {
  console.log("Dia(s) com mais repasses:\n");
  const listaDeDatas = filtrarDatasUnicas(repassesDoGoverno);
  let maiorQuantidade = 0;
  let diasComMais = [];

  for (let i = 0; i < listaDeDatas.length; i++) {
    let totalDeRepassesPorDia = repassesDoGoverno.filter(elemento => elemento.data === listaDeDatas[i]).length;
    if (totalDeRepassesPorDia > maiorQuantidade) {
      maiorQuantidade = totalDeRepassesPorDia;
      diasComMais = [listaDeDatas[i]];
    } else if (totalDeRepassesPorDia === maiorQuantidade) {
      diasComMais.push(listaDeDatas[i]);
    }
  }

  for (let j = 0; j < diasComMais.length; j++) {
    console.log(`${diasComMais[j]}: ${maiorQuantidade}`);
  }
  stringDeRepeticao('-', 66);
}

function orgaoMaisRepasses(repassesDoGoverno) {
  console.log("Órgão(s) com mais repasses:\n");
  const listaDeOrgaos = listarOrgaosUnicos(repassesDoGoverno);
  let maiorQuantidade = 0;
  let orgaoComMais = [];

  for (let i = 0; i < listaDeOrgaos.length; i++) {
    let totalDeRepassesPorOrgao = repassesDoGoverno.filter(elemento => elemento.orgao === listaDeOrgaos[i]).length;
    if (totalDeRepassesPorOrgao > maiorQuantidade) {
      maiorQuantidade = totalDeRepassesPorOrgao;
      orgaoComMais = [listaDeOrgaos[i]];
    } else if (totalDeRepassesPorOrgao === maiorQuantidade) {
      orgaoComMais.push(listaDeOrgaos[i]);
    }
  }

  for (let j = 0; j < orgaoComMais.length; j++) {
    console.log(`${orgaoComMais[j]}: ${maiorQuantidade}`);
  }
  stringDeRepeticao('-', 66);
}

function maiorOrgaoPorSucesso(repassesDoGoverno) {
  console.log("Órgão(s) com mais repasses bem sucedidos:\n");
  const listaDeOrgaos = listarOrgaosUnicosPorStatus(repassesDoGoverno, 'sucesso');
  let maiorQuantidade = 0;
  let orgaosComMais = [];

  for (let i = 0; i < listaDeOrgaos.length; i++) {
    let totalDeRepassesPorOrgao = repassesDoGoverno.filter(elemento => elemento.orgao === listaDeOrgaos[i] && elemento.status === 'sucesso').length;
    if (totalDeRepassesPorOrgao > maiorQuantidade) {
      maiorQuantidade = totalDeRepassesPorOrgao;
      orgaosComMais = [listaDeOrgaos[i]];
    } else if (totalDeRepassesPorOrgao === maiorQuantidade) {
      orgaosComMais.push(listaDeOrgaos[i]);
    }
  }

  for (let j = 0; j < orgaosComMais.length; j++) {
    console.log(`${orgaosComMais[j]}: ${maiorQuantidade}`);
  }
  stringDeRepeticao('-', 66);
}

function maiorOrgaoPorFalha(repassesDoGoverno) {
  console.log("Órgão(s) com mais repasses falhados:\n");
  const listaDeOrgaos = listarOrgaosUnicosPorStatus(repassesDoGoverno, 'falha');
  let maiorQuantidade = 0;
  let orgaosComMais = [];

  for (let i = 0; i < listaDeOrgaos.length; i++) {
    let totalDeRepassesPorOrgao = repassesDoGoverno.filter(elemento => elemento.orgao === listaDeOrgaos[i] && elemento.status === 'falha').length;
    if (totalDeRepassesPorOrgao > maiorQuantidade) {
      maiorQuantidade = totalDeRepassesPorOrgao;
      orgaosComMais = [listaDeOrgaos[i]];
    } else if (totalDeRepassesPorOrgao === maiorQuantidade) {
      orgaosComMais.push(listaDeOrgaos[i]);
    }
  }

  for (let j = 0; j < orgaosComMais.length; j++) {
    console.log(`${orgaosComMais[j]}: ${maiorQuantidade}`);
  }
  stringDeRepeticao('-', 66);
}

function quantidadeFalhasPorMotivo(repassesDoGoverno) {
  console.log("Motivo(s) de falha com mais repasses:\n");
  const motivosUnicos = listarMotivosUnicos(repassesDoGoverno);
  let maiorQuantidade = 0;
  let motivosComMais = [];

  for (let i = 0; i < motivosUnicos.length; i++) {
    const motivo = motivosUnicos[i];
    let total = repassesDoGoverno.filter(elemento => elemento.motivo === motivo).length;

    if (total > maiorQuantidade) {
      maiorQuantidade = total;
      motivosComMais = [motivo];
    } else if (total === maiorQuantidade) {
      motivosComMais.push(motivo);
    }
  }

  for (let k = 0; k < motivosComMais.length; k++) {
    console.log(`${motivosComMais[k]}: ${maiorQuantidade}`);
  }
  stringDeRepeticao('-', 66);
}

function pesquisaAutomaticaPorOrgao(repassesDoGoverno, campoOrgao) {   //H4 - PLOT TWIST (Uso de dados inválidos)
  const listaDeOrgaoEscolhido = repassesDoGoverno.filter(filtrarOrgaoPorNome(campoOrgao));
  const numeroRepasses = listaDeOrgaoEscolhido.length;
  const valorTotal = listaDeOrgaoEscolhido.reduce(reduceSomarValores(), 0);
  const repassesComSucesso = listaDeOrgaoEscolhido.filter(filtrarPorStatus('sucesso'));
  const repassesComFalha = listaDeOrgaoEscolhido.filter(filtrarPorStatus('falha'));
  const valorEmRepassesDeSucesso = repassesComSucesso.reduce(reduceSomarValores(), 0);
  const valorEmRepassesComFalha = repassesComFalha.reduce(reduceSomarValores(), 0);
  const tabelaResumo = [...listaDeOrgaoEscolhido];

  tabelaResumo.push({ 'orgao': 'RESUMO', 'repasses': numeroRepasses, 'sucesso': valorEmRepassesDeSucesso, 'falha': valorEmRepassesComFalha, 'total': valorTotal });
  console.log(`Buscando informações sobre: ${campoOrgao}...`);
  console.table(tabelaResumo);
}

function transacoesInvalidas(repassesDoGoverno) {          //H5
  const listaDeInvalidos = repassesDoGoverno.filter(elemento => elemento.status === 'falha' && (elemento.motivo === undefined));
  const valorTotal = listaDeInvalidos.reduce(reduceSomarValores(), 0);
  const quantidadeRepasses = listaDeInvalidos.length;

  console.log('Buscando transações inválidas(Sem motivo)...');
  if (listaDeInvalidos.length > 0) {
    listaDeInvalidos.push({ 'repasses': quantidadeRepasses, 'total': valorTotal });
    console.log('Tabela de transações inválidas:');
    console.table(listaDeInvalidos);
  } else {
    console.log("Nenhuma falha sem motivo encontrada. Lista livre de erros.");
  }
}

function resultadosValidos(campoOrgao) {                   //H6
  console.log(`Quantidade de repasses: ${repassesGovTwist.length} `);
  stringDeRepeticao('-', 66);
  console.log(`Quantidade de repasses válidos: ${repassesValidados.length} `);
  stringDeRepeticao('-', 66);
  console.log('Transações inválidas removidas: ' + repassesInvalidados.length);
  stringDeRepeticao('-', 66);
  quantidadeRepassesPorStatus(repassesValidados, 'sucesso');
  repassesPorStatusCadaOrgao(repassesValidados, 'sucesso');
  valorTotalDeRepassesPorStatus(repassesValidados, 'sucesso');
  valorTotalCadaOrgaoPorStatus(repassesValidados, 'sucesso');
  quantidadeRepassesPorStatus(repassesValidados, 'falha');
  totalFalhasComMotivo(repassesValidados);
  valorTotalDeRepassesPorStatus(repassesValidados, 'falha');
  valorTotalCadaOrgaoPorStatus(repassesValidados, 'falha');
  valorTotalPorCadaMotivo(repassesValidados);
  repasseMaiorValor(repassesValidados);
  repasseMenorValor(repassesValidados);
  diaComMaisRepasses(repassesValidados);
  orgaoMaisRepasses(repassesValidados);
  maiorOrgaoPorSucesso(repassesValidados);
  maiorOrgaoPorFalha(repassesValidados);
  quantidadeFalhasPorMotivo(repassesValidados);
  pesquisaAutomaticaPorOrgao(repassesValidados, campoOrgao);
  transacoesInvalidas(repassesValidados);
}

//FUNÇÕES AUXILIARES
function filtrarDatasUnicas(repassesDoGoverno) {
  return [
    ...new Set(
      repassesDoGoverno.map(elemento => elemento.data)
    )
  ]
}

function listarOrgaosUnicos(repassesDoGoverno) {
  return [
    ...new Set(
      repassesDoGoverno.map(elemento => elemento.orgao)
    )
  ]
}
function listarOrgaosUnicosPorStatus(repassesDoGoverno, status) {
  return [
    ...new Set(
      repassesDoGoverno.filter(filtrarPorStatus(status)).map(elemento => elemento.orgao)
    )
  ];
}

function listarMotivosUnicos(repassesDoGoverno) {
  return [
    ...new Set(
      repassesDoGoverno.filter(elemento => elemento.status === 'falha' && elemento.motivo).map(elemento => elemento.motivo)
    )
  ]
}

function filtrarOrgaoPorNome(campoOrgao) {
  return elemento => elemento.orgao === campoOrgao;
}

function ordenarDrescente(repassesDoGoverno, propriedade) {
  return [...repassesDoGoverno].sort((elementoA, elementoB) => elementoB[propriedade] - elementoA[propriedade]);
}

function filtrarPorStatus(campoStatus) {
  return elemento => elemento.status === campoStatus;
}

function reduceSomarValores() {
  return (acumulador, elemento) => acumulador + elemento.valor;
}

function stringDeRepeticao(char, vezes) {
  console.log(char.repeat(vezes));
}

//ESTRUTURA VISUAL DAS HISTÓRIAS
function historiaUm() {
  stringDeRepeticao('=', 66);
  console.log('* História de Usuário 1: Recebimento e Exibição de Dados do Governo');
  stringDeRepeticao('=', 66);
  stringDeRepeticao('-', 66);
  totalDeRepasses(repassesGov);
}

function historiaDois() {
  stringDeRepeticao('=', 66);
  console.log('* História de Usuário 2: Análise de Transações Por Status');
  stringDeRepeticao('=', 66);
  stringDeRepeticao('-', 66);
  quantidadeRepassesPorStatus(repassesGov, 'sucesso');
  repassesPorStatusCadaOrgao(repassesGov, 'sucesso');
  valorTotalDeRepassesPorStatus(repassesGov, 'sucesso');
  valorTotalCadaOrgaoPorStatus(repassesGov, 'sucesso');
  quantidadeRepassesPorStatus(repassesGov, 'falha');
  repassesPorStatusCadaOrgao(repassesGov, 'falha');
  totalFalhasComMotivo(repassesGov);
  valorTotalDeRepassesPorStatus(repassesGov, 'falha');
  valorTotalCadaOrgaoPorStatus(repassesGov, 'falha');
  valorTotalPorCadaMotivo(repassesGov);
}

function historiaTres() {
  stringDeRepeticao('=', 66);
  console.log('* História de Usuário 3: Estatísticas de Repasses Por Critérios');
  stringDeRepeticao('=', 66);
  stringDeRepeticao('-', 66);
  repasseMaiorValor(repassesGov);
  repasseMenorValor(repassesGov);
  diaComMaisRepasses(repassesGov);
  orgaoMaisRepasses(repassesGov);
  maiorOrgaoPorSucesso(repassesGov);
  maiorOrgaoPorFalha(repassesGov);
  quantidadeFalhasPorMotivo(repassesGov);
}

function historiaQuatro(campoOrgao) {
  stringDeRepeticao('=', 66);
  console.log('* História de Usuário 4: Apresentação Automática De Detalhes');
  stringDeRepeticao('=', 66);
  stringDeRepeticao('-', 66);
  pesquisaAutomaticaPorOrgao(repassesGovTwist, campoOrgao);
}

function historiaCinco() {
  stringDeRepeticao('=', 66);
  console.log('* História de Usuário 5: Tratamento De Erros');
  stringDeRepeticao('=', 66);
  stringDeRepeticao('-', 66);
  transacoesInvalidas(repassesGovTwist);
}

function historiaSeis(campoOrgao) {
  stringDeRepeticao('=', 66);
  console.log('* História de Usuário 6: Ajustes Nas Estatísticas');
  stringDeRepeticao('=', 66);
  stringDeRepeticao('-', 66);
  resultadosValidos(campoOrgao);
}

module.exports = {
  historiaUm,
  historiaDois,
  historiaTres,
  historiaQuatro,
  historiaCinco,
  historiaSeis
};
