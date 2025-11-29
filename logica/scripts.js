const repassesGov = require('../data/dados-gov.json');
const repassesGovTwist = require('../data/dados-gov-twist.json');
const repassesValidados = repassesGovTwist.filter(elemento => !(elemento.status === 'falha' && elemento.motivo === undefined));
const repassesInvalidados = repassesGovTwist.filter(elemento => (elemento.status === 'falha' && elemento.motivo === undefined));

function totalDeRepasses(repassesDoGoverno) {              // REQUISITOS HISTÓRIAS 1 & 2
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

function repassesComSucessoPorOrgao(repassesDoGoverno) {
  console.log('Repasses bem sucedidos por órgão:\n');
  for (let i = 0; i < listarOrgaosUnicosPorStatus(repassesDoGoverno, 'sucesso').length; i++) {
    let totalDeRepassesPorOrgao = repassesDoGoverno.filter(elemento => elemento.status === 'sucesso' && elemento.orgao === listarOrgaosUnicosPorStatus(repassesDoGoverno, 'sucesso')[i]).length;
    console.log(`${listarOrgaosUnicosPorStatus(repassesDoGoverno, 'sucesso')[i]}: ${totalDeRepassesPorOrgao}`);
  }
  stringDeRepeticao('-', 66)
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

function valorTotalPorOrgaoStatus(repassesDoGoverno, status) {
  if (status === 'sucesso') {
    console.log('Valor por órgão com sucesso:\n')
    for (let i = 0; i < listarOrgaosUnicosPorStatus(repassesDoGoverno, status).length; i++) {
      console.log(`${listarOrgaosUnicosPorStatus(repassesDoGoverno, status)[i]}: R$ ${repassesDoGoverno.filter(elemento => elemento.orgao === listarOrgaosUnicosPorStatus(repassesDoGoverno, status)[i])
        .reduce(reduceSomarValores(), 0).toFixed(2)}`);
    }
    stringDeRepeticao('-', 66);
  } else {
    console.log('Valor total de repasses com falha por órgão:\n')
    for (let i = 0; i < listarOrgaosUnicosPorStatus(repassesDoGoverno, 'falha').length; i++) {
      console.log(`${listarOrgaosUnicosPorStatus(repassesDoGoverno, 'falha')[i]}: R$ ${repassesDoGoverno.filter(elemento => elemento.orgao === listarOrgaosUnicosPorStatus(repassesDoGoverno, status)[i])
        .reduce(reduceSomarValores(), 0).toFixed(2)}`);
    }
    stringDeRepeticao('-', 66);
  }
}

function quantidadeDeFalhasPorOrgao(repassesDoGoverno) {
  console.log('Repasses com falha por órgão:\n')
  for (let i = 0; i < listarOrgaosUnicosPorStatus(repassesDoGoverno, 'falha').length; i++) {
    let total = repassesDoGoverno.filter(elemento => elemento.status === 'falha' && elemento.orgao === listarOrgaosUnicosPorStatus(repassesDoGoverno, 'falha')[i]).length;
    console.log(`${listarOrgaosUnicosPorStatus(repassesDoGoverno, 'falha')[i]}: ${total}`)
  }
  stringDeRepeticao('-', 66);
}

function totalFalhasComMotivo(repassesDoGoverno) {
  console.log(`Quantidade total de repasses com falha por motivo: ${repassesDoGoverno.filter(filtrarMotivos()).length}`);
  stringDeRepeticao('-', 66);
}

function valorEmFalhasComMotivo(repassesDoGoverno) {
  console.log(`Valor total em falhas com motivo: R$ ${repassesDoGoverno.filter(filtrarMotivos())
    .reduce(reduceSomarValores(), 0).toFixed(2)}`);
  stringDeRepeticao('-', 66);
}

function repasseMaiorValor(repassesDoGoverno) {            // REQUISITOS HISTÓRIA 3
  console.log("Repasse de maior valor:");
  console.table(ordenarDrescente(repassesDoGoverno, 'valor')[0]);
}

function repasseMenorValor(repassesDoGoverno) {
  console.log("Repasse de menor valor:");
  console.table(ordenarDrescente(repassesDoGoverno, 'valor')[ordenarDrescente('valor').length - 1]);
}

function diaComMaisRepasses(repassesDoGoverno) {
  console.log("Dia com mais repasses:");
  console.log(ordenarDrescente(repassesDoGoverno, 'valor')[0].data);
}

function orgaoMaisRepasses(repassesDoGoverno) {
  console.log("Órgão com mais repasses:");
  console.log(ordenarDrescente(repassesDoGoverno, 'valor')[0].orgao);
}

function maiorOrgaoPorSucesso(repassesDoGoverno) {
  console.log("Órgão com mais repasses com sucesso:");
  console.log(ordenarDrescente(repassesDoGoverno, 'valor').filter(filtrarPorStatus('sucesso'))[0].orgao);
}

function maiorOrgaoPorFalha(repassesDoGoverno) {
  console.log("Orgão com mais repasses falhados:");
  console.log(ordenarDrescente(repassesDoGoverno, 'valor').filter(filtrarPorStatus('falha'))[0].orgao);
}

function maiorRepasseComMotivo(repassesDoGoverno) {
  console.log("Motivo de falha com mais repasses:");
  console.log(ordenarDrescente(repassesDoGoverno, 'valor').filter(filtrarMotivos)[0].motivo);
}

function pesquisaAutomaticaPorOrgao(repassesDoGoverno, campoOrgao) {   //REQUISITOS HISTÓRIA 4 - PLOT TWIST (Uso de dados inválidos)
  const listaDeOrgaoEscolhido = repassesDoGoverno.filter(filtrarOrgaoPorNome(campoOrgao));
  const numeroRepasses = listaDeOrgaoEscolhido.length;
  const valorTotal = listaDeOrgaoEscolhido.reduce(reduceSomarValores(), 0);
  const repassesComSucesso = listaDeOrgaoEscolhido.filter(filtrarPorStatus('sucesso'));
  const repassesComFalha = listaDeOrgaoEscolhido.filter(filtrarPorStatus('falha'));
  const valorEmRepassesDeSucesso = repassesComSucesso.reduce(reduceSomarValores(), 0);
  const valorEmRepassesComFalha = repassesComFalha.reduce(reduceSomarValores(), 0);

  listaDeOrgaoEscolhido.push({ 'orgao': campoOrgao, 'repasses': numeroRepasses, 'sucesso': valorEmRepassesDeSucesso, 'falha': valorEmRepassesComFalha, 'total': valorTotal });
  console.log(`Buscando informações sobre: ${campoOrgao}...`);
  console.table(listaDeOrgaoEscolhido);
}

function transacoesInvalidas() {          // REQUISITOS HISTÓRIA 5
  const listaDeInvalidos = repassesGovTwist.filter(elemento => elemento.status === 'falha' && (elemento.motivo === undefined));
  const valorTotal = listaDeInvalidos.reduce(reduceSomarValores(), 0);
  const quantidadeRepasses = listaDeInvalidos.length;

  listaDeInvalidos.push({ 'repasses': quantidadeRepasses, 'total': valorTotal });
  console.log('Buscando transações inválidas(Sem motivo)...');
  if (listaDeInvalidos.length > 0) {
    console.log('Tabela de transações inválidas:');
    console.table(listaDeInvalidos);
  } else {
    console.log("Nenhuma falha sem motivo encontrada. Lista livre de erros.");
  }
}

// REQUISITOS HISTÓRIA 6
resultadosValidos('MEC')
function resultadosValidos(campoOrgao) {
  console.log(`Quantidade de repasses: ${repassesGovTwist.length}`);
  stringDeRepeticao('-', 66);
  console.log(`Quantidade de repasses válidos: ${repassesValidados.length}`);
  stringDeRepeticao('-', 66);
  console.log('Transações inválidas removidas: ' + repassesInvalidados.length);
  stringDeRepeticao('-', 66);
  quantidadeRepassesPorStatus(repassesValidados, 'sucesso');
  repassesComSucessoPorOrgao(repassesValidados);
  valorTotalDeRepassesPorStatus(repassesValidados, 'sucesso');
  valorTotalPorOrgaoStatus(repassesValidados, 'sucesso');
  quantidadeRepassesPorStatus(repassesValidados, 'falha');
  totalFalhasComMotivo(repassesValidados);
  valorTotalDeRepassesPorStatus(repassesValidados, 'falha');
  valorTotalPorOrgaoStatus(repassesValidados, 'falha');
  valorEmFalhasComMotivo(repassesValidados);
}

// FUNÇÕES AUXILIARES
function listarOrgaosUnicosPorStatus(repassesDoGoverno, status) {
  return listaDeOrgaosComSucesso = [
    ...new Set(
      repassesDoGoverno.filter(filtrarPorStatus(status)).map(mapearOrgaos())
    )
  ];
}

function filtrarOrgaoPorNome(campoOrgao) {
  return elemento => elemento.orgao === campoOrgao;
}

function mapearOrgaos() {
  return elemento => elemento.orgao;
}

function ordenarDrescente(repassesDoGoverno, propriedade) {
  return [...repassesDoGoverno].sort((elementoA, elementoB) => elementoB[propriedade] - elementoA[propriedade]);
}

function filtrarPorStatus(campoStatus) {
  return elemento => elemento.status === campoStatus;
}

function filtrarMotivos() {
  return elemento => elemento.motivo;
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
  repassesComSucessoPorOrgao(repassesGov);
  valorTotalDeRepassesPorStatus(repassesGov, 'sucesso');
  valorTotalPorOrgaoStatus(repassesGov, 'sucesso');
  quantidadeRepassesPorStatus(repassesGov, 'falha');
  quantidadeDeFalhasPorOrgao(repassesGov);
  totalFalhasComMotivo(repassesGov);
  valorTotalDeRepassesPorStatus(repassesGov, 'falha');
  valorTotalPorOrgaoStatus(repassesGov, 'falha');
  valorEmFalhasComMotivo(repassesGov);
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
  maiorRepasseComMotivo(repassesGov);
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
  transacoesInvalidas();
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
