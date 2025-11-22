const repassesGov = require('../data/dados-gov.json'); // IMPORTANDO DADOS DOS.JSON E FAZENDO PARSE PARA TRANSFORMAR EM UMA ARRAY DE OBJETOS
const repassesGovTwist = require('../data/dados-gov-twist.json');

// ALUNO: SERGIO SADY MONTEIRO FERREIRA

// GERANDO LISTA DE ORGAOS PARA MOSTRAR VISUALMENTE (Sem duplicidade)
let listaDeOrgaosComSucesso = [
  ...new Set(
    repassesGov.filter(filtroStatus('sucesso')).map(elemento => elemento.orgao)
  )
];

let listaDeOrgaosComFalha = [
  ...new Set(
    repassesGov.filter(filtroStatus('falha')).map(elemento => elemento.orgao)
  )
];

// REQUISITOS HISTÓRIA 1 - Recebimento e Exibição de Dados do Governo
function totalDeRepasses() {
  console.log(`Total de repasses processados: ${repassesGov.length}`);
}

// REQUISITOS HISTÓRIA 2 - Análise de Transações por status
function repassesBemSucedidos() {
  console.log(`Total de repasses bem sucedidos: ${repassesGov.filter(filtroStatus('sucesso')).length}`);
}

// PERCORRE LISTA DE NOMES UNICOS E MOSTRA QUANTIDADE POR ORGÃO
function repassesPorOrgaosComSucesso() {
  console.log('Repasses bem sucedidos por orgão:')
  for (i = 0; i < listaDeOrgaosComSucesso.length; i++) {
    let total = repassesGov.filter(elemento => elemento.status === "sucesso" && elemento.orgao === listaDeOrgaosComSucesso[i]).length;
    console.log(`${listaDeOrgaosComSucesso[i]}: ${total}`)
  }
}

function valorTotalEmRepassesValidos() {
  console.log(`Valor total: R$ ${repassesGov.filter(elemento => elemento.status === "sucesso")
    // UTILIZANDO REDUCE PARA ACUMULAR VALOR
    .reduce((acumulador, elemento) => acumulador + elemento.valor, 0)
    .toFixed(2)}`);
}

function valorPorOrgaoSucesso() {
  console.log('Valor por orgão:')
  for (i = 0; i < listaDeOrgaosComSucesso.length; i++) {
    console.log(`${listaDeOrgaosComSucesso[i]}: R$ ${repassesGov.filter(elemento => elemento.orgao === listaDeOrgaosComSucesso[i])
      .reduce((acumulador, elemento) => acumulador + elemento.valor, 0)
      .toFixed(2)}`);
  }
}

function repassesComFalha() {
  console.log(`Total de repasses com falha: ${repassesGov.filter(elemento => elemento.status === 'falha').length}`);
}

function quantidadeDeFalhasPorOrgao() {
  console.log('Total de repasses por orgão:')
  for (i = 0; i < listaDeOrgaosComFalha.length; i++) {
    let total = repassesGov.filter(elemento => elemento.status === 'falha' && elemento.orgao === listaDeOrgaosComFalha[i]).length;
    console.log(`${listaDeOrgaosComFalha[i]}: ${total}`)
  }
}

function totalFalhasComMotivo() {
  console.log(`Total de falhas com motivo: ${repassesGov.filter(filtroMotivo()).length}`);
}

function valorTotalEmFalhas() {
  console.log(`Valor total em falhas: R$ ${repassesGov.filter(elemento => elemento.status === 'falha')
    .reduce((acumulador, elemento) => acumulador + elemento.valor, 0)
    .toFixed(2)}`);

}

function valorFalhasPorOrgao() {
  console.log('Por orgão:')
  for (i = 0; i < listaDeOrgaosComFalha.length; i++) {
    console.log(`${listaDeOrgaosComFalha[i]}: R$ ${repassesGov.filter(elemento => elemento.orgao === listaDeOrgaosComFalha[i])
      .reduce((acumulador, elemento) => acumulador + elemento.valor, 0)
      .toFixed(2)}`);
  }
}

function valorFalhasComMotivo() {
  console.log(`Valor total de falhas com motivo: R$ ${repassesGov.filter(elemento => elemento.motivo)
    .reduce((acumulador, elemento) => acumulador + elemento.valor, 0)
    .toFixed(2)}`);
}

// REQUISITOS HISTÓRIA 3 - Estatísticas de Repasses por critérios 
// ODENA ARRAY E PEGA RESULTADO
function repasseMaiorValor() {
  console.log("Repasse de maior valor:");
  console.table(ordenarCrescente('valor')[0]);
}

function repasseMenorValor() {
  console.log("Repasse de menor valor:");
  console.table(ordenarCrescente('valor')[ordenarCrescente('valor').length - 1]);
}

function diaComMaisRepasses() {
  console.log("Dia com mais repasses:");
  console.log(ordenarCrescente('data')[0].data);
}

function orgaoMaisRepasses() {
  console.log("Orgão com mais repasses:");
  console.log(ordenarCrescente('orgao')[0].orgao);
}

function maiorOrgaoPorSucesso() {
  console.log("Orgão com mais repasses com sucesso:");
  console.log(ordenarCrescente('valor').filter(filtroStatus('sucesso'))[0].orgao);
}

function maiorOrgaoPorFalha() {
  console.log("Orgão com mais repasses falhados:");
  console.log(ordenarCrescente('valor').filter(filtroStatus('falha'))[0].orgao);
}

function maiorRepasseComMotivo() {
  console.log("Motivo de falha com mais repasses:");
  console.log(ordenarCrescente('valor').filter(filtroMotivo)[0].motivo);
}

//REQUISITOS HISTÓRIA 4 PLOT TWIST - Apresentação Automática de Detalhes de Transações (Uso de lista repasseGovTwist)
function pesquisaPorOrgao(campoOrgao) {
  // FILTRANDO INFORMAÇÕES E GUARDANDO EM UMA ARRAY
  const listaDeOrgaoEscolhido = repassesGovTwist.filter(filtroOrgao(campoOrgao));
  const numeroRepasses = listaDeOrgaoEscolhido.length;
  const valorTotal = listaDeOrgaoEscolhido.reduce(reduceValorComAcumulador(), 0);
  const repassesValidos = listaDeOrgaoEscolhido.filter(filtroStatus('sucesso'));
  const repassesInvalidos = listaDeOrgaoEscolhido.filter(filtroStatus('falha'));
  const valorRepassesValidos = repassesValidos.reduce(reduceValorComAcumulador(), 0);
  const valorRepassesInvalidos = repassesInvalidos.reduce(reduceValorComAcumulador(), 0);

  // ADICIONANDO PROPRIEDADES E VALORES FILTRADOS PARA A ARRAY (Informações adicionais ex: total, sucesso)
  listaDeOrgaoEscolhido.push({ 'orgao': campoOrgao, 'repasses': numeroRepasses, 'sucesso': valorRepassesValidos, 'falha': valorRepassesInvalidos, 'total': valorTotal });
  console.log('Buscando informações sobre: ' + campoOrgao + '...');
  console.table(listaDeOrgaoEscolhido);
}

// REQUISITOS HISTÓRIA 5 - Tratamento de erros
function transacoesInvalidas() {
  // FILTRANDO INFORMACOES
  const listaDeInvalidos = repassesGovTwist.filter(elemento => elemento.status === 'falha' && (elemento.motivo === undefined));
  const valorTotal = listaDeInvalidos.reduce(reduceValorComAcumulador(), 0);
  const quantidadeRepasses = listaDeInvalidos.length;
  const valorInvalidos = listaDeInvalidos

  // INCREMEMTANDO À ARRAY
  listaDeInvalidos.push({ 'repasses': quantidadeRepasses, 'total': valorTotal });
  console.log('Buscando transações inválidas(Sem motivo)...');
  if (listaDeInvalidos.length > 0) {
    console.log('Tabela de transações inválidas:');
    console.table(listaDeInvalidos);
  } else {
    console.log("Nenhuma falha sem motivo encontrada. Lista livre de erros.");
  }
}

// REQUISITOS HISTÓRIA 6 -  Ajustes nas estatísticas
// FILTRANDO ARRAY ORIGINAL PARA UMA SEM TRANSAÇÕES INVÁLIDAS E SALVANDO EM UMA CONST
const repassesAjustados = repassesGovTwist.filter(elemento => !(elemento.status === 'falha' && elemento.motivo === undefined));
const repassesInvalidados = repassesGovTwist.filter(elemento => (elemento.status === 'falha' && elemento.motivo === undefined));

// FUNÇÃO RECEBE ORGÃO ESCOLHIDO COMO ARGUMENTO E RETORNA UMA TABELA COM TODAS AS INFORMAÇÕES
function resultadosValidos(campoOrgao) {
  console.log(`Quantidade de repasses: ${repassesGovTwist.length}`);
  console.log(`Quantidade de repasses ajustados(válidos): ${repassesAjustados.length}`);
  console.log('Transações inválidas removidas: ' + repassesInvalidados.length);

  // FILTRANDO INFORMAÇÕES E GUARDANDO EM UMA ARRAY
  const listaDeOrgaoEscolhido = repassesAjustados.filter(filtroOrgao(campoOrgao));
  const numeroRepasses = listaDeOrgaoEscolhido.length;
  const valorTotal = listaDeOrgaoEscolhido.reduce(reduceValorComAcumulador(), 0);
  const repassesValidos = listaDeOrgaoEscolhido.filter(filtroStatus('sucesso'));
  const repassesInvalidos = listaDeOrgaoEscolhido.filter(filtroStatus('falha'));
  const valorRepassesValidos = repassesValidos.reduce(reduceValorComAcumulador(), 0);
  const valorRepassesInvalidos = repassesInvalidos.reduce(reduceValorComAcumulador(), 0);

  // ADICIONANDO PROPRIEDADES E VALORES À ARRAY (Informações adicionais ex: total, sucesso, falha)
  listaDeOrgaoEscolhido.push({ 'orgao': campoOrgao, 'repasses': numeroRepasses, 'sucesso': valorRepassesValidos, 'falha': valorRepassesInvalidos, 'total': valorTotal });
  console.log('Buscando informações sobre: ' + campoOrgao + '...');

  // MOSTRANDO EM UMA TABELA DETALHADA
  console.table(listaDeOrgaoEscolhido);
}

// FUNÇÕES AUXILIARES

function filtroOrgao(campoOrgao) {
  return elemento => elemento.orgao === campoOrgao;
}

function ordenarCrescente(propriedade) {
  return repassesGov.sort((elementoA, elementoB) => elementoB[propriedade] - elementoA[propriedade]);
}

function filtroStatus(campoStatus) {
  return elemento => elemento.status === campoStatus;
}

function filtroMotivo() {
  return elemento => elemento.motivo;
}

function reduceValorComAcumulador() {
  return (acumulador, elemento) => acumulador + elemento.valor;
}

// ESTRUTURA VISUAL PARA RESULTADOS
function historiaUm() {
  console.log('===================================================================')
  console.log('* História de Usuário 1: Recebimento e Exibição de Dados do Governo');
  console.log('===================================================================')
  totalDeRepasses();
}

function historiaDois() {
  console.log('===================================================================')
  console.log('* História de Usuário 2: Análise de Transações por status');
  console.log('===================================================================')
  repassesBemSucedidos();
  console.log('-------------------------------------------------------------------')
  repassesPorOrgaosComSucesso();
  console.log('-------------------------------------------------------------------')
  valorTotalEmRepassesValidos();
  console.log('-------------------------------------------------------------------')
  valorPorOrgaoSucesso();
  console.log('-------------------------------------------------------------------')
  repassesComFalha();
  console.log('-------------------------------------------------------------------')
  quantidadeDeFalhasPorOrgao();
  console.log('-------------------------------------------------------------------')
  totalFalhasComMotivo();
  console.log('-------------------------------------------------------------------')
  valorTotalEmFalhas();
  console.log('-------------------------------------------------------------------')
  valorFalhasPorOrgao();
  console.log('-------------------------------------------------------------------')
  valorFalhasComMotivo();
}

function historiaTres() {
  console.log('===================================================================')
  console.log('* História de Usuário 3: Estatísticas de Repasses por critérios');
  console.log('===================================================================')
  repasseMaiorValor();
  console.log('-------------------------------------------------------------------')
  repasseMenorValor();
  console.log('-------------------------------------------------------------------')
  diaComMaisRepasses();
  console.log('-------------------------------------------------------------------')
  orgaoMaisRepasses();
  console.log('-------------------------------------------------------------------')
  maiorOrgaoPorSucesso();
  console.log('-------------------------------------------------------------------')
  maiorOrgaoPorFalha();
  console.log('-------------------------------------------------------------------')
  maiorRepasseComMotivo();
  console.log('-------------------------------------------------------------------')
}

function historiaQuatro(campoOrgao) {
  console.log('===================================================================')
  console.log('* História de Usuário 4: Apresentação Automática de Detalhes');
  console.log('===================================================================')
  pesquisaPorOrgao(campoOrgao);
}

function historiaCinco() {
  console.log('===================================================================')
  console.log('* História de Usuário 5: Tratamento de erros');
  console.log('===================================================================')
  transacoesInvalidas();
}

function historiaSeis(campoOrgao) {
  console.log('===================================================================')
  console.log('* História de Usuário 6: Ajustes nas estatísticas');
  console.log('===================================================================')
  resultadosValidos(campoOrgao);
}

//EXPORTANTO FUNÇÕES PARA EXECUÇÃO EM OUTRO ARQUIVO (simulando.js)
module.exports = {
  historiaUm,
  historiaDois,
  historiaTres,
  historiaQuatro,
  historiaCinco,
  historiaSeis
};