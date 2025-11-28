const repassesGov = require('../data/dados-gov.json');
const repassesGovTwist = require('../data/dados-gov-twist.json');

const listaDeOrgaosComSucesso = [         // REQUISITOS HISTÓRIAS 1 & 2
  ...new Set(
    repassesGov.filter(filtrarPorStatus('sucesso')).map(mapearOrgaos())
  )
];

const listaDeOrgaosComFalha = [
  ...new Set(
    repassesGov.filter(filtrarPorStatus('falha')).map(mapearOrgaos())
  )
];

function totalDeRepasses() {
  console.log(`Total de repasses processados: ${repassesGov.length}`);
  stringComVariosDigitos(66);
}

function repassesBemSucedidos() {
  console.log(`Total de repasses bem sucedidos: ${repassesGov.filter(filtrarPorStatus('sucesso')).length}`);
  stringComVariosDigitos(66);
}
//repassesComSucessoPorOrgao();
function repassesComSucessoPorOrgao() {
  console.log('Repasses bem sucedidos por orgão:\n');
  for (let i = 0; i < listaDeOrgaosComSucesso.length; i++) {
    let totalDeRepassesPorOrgao = repassesGov.filter(elemento => elemento.status === "sucesso" && elemento.orgao === listaDeOrgaosComSucesso[i]).length;
    console.log(`${listaDeOrgaosComSucesso[i]}: ${totalDeRepassesPorOrgao}`)
  }
  stringComVariosDigitos(66);
}
//valorTotalEmRepassesValidos();
function valorTotalEmRepassesValidos() {
  console.log(`Valor total: R$ ${repassesGov.filter(filtrarPorStatus('sucesso'))
    .reduce(reduceSomarValores(), 0).toFixed(2)}`);
  stringComVariosDigitos(66);
}
//valorPorOrgaoSucesso();
function valorPorOrgaoSucesso() {
  console.log('Valor por orgão com sucesso:\n')
  for (let i = 0; i < listaDeOrgaosComSucesso.length; i++) {
    console.log(`${listaDeOrgaosComSucesso[i]}: R$ ${repassesGov.filter(elemento => elemento.orgao === listaDeOrgaosComSucesso[i])
      .reduce(reduceSomarValores(), 0).toFixed(2)}`);
  }
  stringComVariosDigitos(66);
}
//repassesComFalha();
function repassesComFalha() {
  console.log(`Total de repasses com falha: ${repassesGov.filter(filtrarPorStatus('falha')).length}`);
  stringComVariosDigitos(66);
}
//quantidadeDeFalhasPorOrgao();
function quantidadeDeFalhasPorOrgao() {
  console.log('Repasses com falha por orgão:\n')
  for (let i = 0; i < listaDeOrgaosComFalha.length; i++) {
    let total = repassesGov.filter(elemento => elemento.status === 'falha' && elemento.orgao === listaDeOrgaosComFalha[i]).length;
    console.log(`${listaDeOrgaosComFalha[i]}: ${total}`)
  }
  stringComVariosDigitos(66);
}
//totalFalhasComMotivo();
function totalFalhasComMotivo() {
  console.log(`Total de falhas com motivo: ${repassesGov.filter(filtrarMotivos()).length}`);
  stringComVariosDigitos(66);
}
//valorTotalEmFalhas();
function valorTotalEmFalhas() {
  console.log(`Valor total em falhas: R$ ${repassesGov.filter(filtrarPorStatus('falha'))
    .reduce(reduceSomarValores(), 0).toFixed(2)}`);
  stringComVariosDigitos(66);
}
//valorEmFalhasPorOrgao();
function valorEmFalhasPorOrgao() {
  console.log('Valor em falhas por orgão:\n')
  for (let i = 0; i < listaDeOrgaosComFalha.length; i++) {
    console.log(`${listaDeOrgaosComFalha[i]}: R$ ${repassesGov.filter(elemento => elemento.orgao === listaDeOrgaosComFalha[i])
      .reduce(reduceSomarValores(), 0).toFixed(2)}`);
  }
  stringComVariosDigitos(66);
}
//valorEmFalhasComMotivo();
function valorEmFalhasComMotivo() {
  console.log(`Valor total em falhas com motivo: R$ ${repassesGov.filter(filtrarMotivos())
    .reduce(reduceSomarValores(), 0).toFixed(2)}`);
  stringComVariosDigitos(66);
}

function repasseMaiorValor() {            // REQUISITOS HISTÓRIA 3
  console.log("Repasse de maior valor:");
  console.table(ordenarDrescente('valor')[0]);
}

function repasseMenorValor() {
  console.log("Repasse de menor valor:");
  console.table(ordenarDrescente('valor')[ordenarDrescente('valor').length - 1]);
}

function diaComMaisRepasses() {
  console.log("Dia com mais repasses:");
  console.log(ordenarDrescente('valor')[0].data);
}

function orgaoMaisRepasses() {
  console.log("Orgão com mais repasses:");
  console.log(ordenarDrescente('valor')[0].orgao);
}

function maiorOrgaoPorSucesso() {
  console.log("Orgão com mais repasses com sucesso:");
  console.log(ordenarDrescente('valor').filter(filtrarPorStatus('sucesso'))[0].orgao);
}

function maiorOrgaoPorFalha() {
  console.log("Orgão com mais repasses falhados:");
  console.log(ordenarDrescente('valor').filter(filtrarPorStatus('falha'))[0].orgao);
}

function maiorRepasseComMotivo() {
  console.log("Motivo de falha com mais repasses:");
  console.log(ordenarDrescente('valor').filter(filtrarMotivos)[0].motivo);
}

function pesquisaPorOrgao(campoOrgao) {   //REQUISITOS HISTÓRIA 4 - PLOT TWIST (Uso de dados inválidos)
  const listaDeOrgaoEscolhido = repassesGovTwist.filter(filtrarOrgaoPorNome(campoOrgao));
  const numeroRepasses = listaDeOrgaoEscolhido.length;
  const valorTotal = listaDeOrgaoEscolhido.reduce(reduceSomarValores(), 0);
  const repassesValidos = listaDeOrgaoEscolhido.filter(filtrarPorStatus('sucesso'));
  const repassesInvalidos = listaDeOrgaoEscolhido.filter(filtrarPorStatus('falha'));
  const valorRepassesValidos = repassesValidos.reduce(reduceSomarValores(), 0);
  const valorRepassesInvalidos = repassesInvalidos.reduce(reduceSomarValores(), 0);

  listaDeOrgaoEscolhido.push({ 'orgao': campoOrgao, 'repasses': numeroRepasses, 'sucesso': valorRepassesValidos, 'falha': valorRepassesInvalidos, 'total': valorTotal });
  console.log(`Buscando informações sobre: ${campoOrgao}...`);
  console.table(listaDeOrgaoEscolhido);
}

function transacoesInvalidas() {          // REQUISITOS HISTÓRIA 5
  const listaDeInvalidos = repassesGovTwist.filter(elemento => elemento.status === 'falha' && (elemento.motivo === undefined));
  const valorTotal = listaDeInvalidos.reduce(reduceSomarValores(), 0);
  const quantidadeRepasses = listaDeInvalidos.length;
  const valorInvalidos = listaDeInvalidos

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
const repassesAjustados = repassesGovTwist.filter(elemento => !(elemento.status === 'falha' && elemento.motivo === undefined));
const repassesInvalidados = repassesGovTwist.filter(elemento => (elemento.status === 'falha' && elemento.motivo === undefined));

function resultadosValidos(campoOrgao) {
  console.log(`Quantidade de repasses: ${repassesGovTwist.length}`);
  console.log(`Quantidade de repasses ajustados(válidos): ${repassesAjustados.length}`);
  console.log('Transações inválidas removidas: ' + repassesInvalidados.length);

  const listaDeOrgaoEscolhido = repassesAjustados.filter(filtrarOrgaoPorNome(campoOrgao));
  const numeroRepasses = listaDeOrgaoEscolhido.length;
  const valorTotal = listaDeOrgaoEscolhido.reduce(reduceSomarValores(), 0);
  const repassesValidos = listaDeOrgaoEscolhido.filter(filtrarPorStatus('sucesso'));
  const repassesInvalidos = listaDeOrgaoEscolhido.filter(filtrarPorStatus('falha'));
  const valorRepassesValidos = repassesValidos.reduce(reduceSomarValores(), 0);
  const valorRepassesInvalidos = repassesInvalidos.reduce(reduceSomarValores(), 0);
 
  listaDeOrgaoEscolhido.push({ 'orgao': campoOrgao, 'repasses': numeroRepasses, 'sucesso': valorRepassesValidos, 'falha': valorRepassesInvalidos, 'total': valorTotal });
  console.log('Buscando informações sobre: ' + campoOrgao + '...');
  console.table(listaDeOrgaoEscolhido);
}

// FUNÇÕES AUXILIARES

function filtrarOrgaoPorNome(campoOrgao) {
  return elemento => elemento.orgao === campoOrgao;
}

function mapearOrgaos() {
  return elemento => elemento.orgao;
}

function ordenarDrescente(propriedade) {
  return [...repassesGov].sort((elementoA, elementoB) => elementoB[propriedade] - elementoA[propriedade]);
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

function stringComVariosIguais(vezes) {
  console.log('='.repeat(vezes));
}

function stringComVariosDigitos(vezes) {
  console.log('-'.repeat(vezes));
}

//ESTRUTURA DE HISTÓRIAS
function historiaUm() {
  stringComVariosIguais(66);
  console.log('* História de Usuário 1: Recebimento e Exibição de Dados do Governo');
  stringComVariosIguais(66);
  stringComVariosDigitos(66);
  totalDeRepasses();
}

function historiaDois() {
  stringComVariosIguais(66);
  console.log('* História de Usuário 2: Análise de Transações por status');
  stringComVariosIguais(66);
  stringComVariosDigitos(66);
  repassesBemSucedidos();
  repassesComSucessoPorOrgao();
  valorTotalEmRepassesValidos();
  valorPorOrgaoSucesso();
  repassesComFalha();
  quantidadeDeFalhasPorOrgao();
  totalFalhasComMotivo();
  valorTotalEmFalhas();
  valorEmFalhasPorOrgao();
  valorEmFalhasComMotivo();
}

function historiaTres() {
  stringComVariosIguais(66);
  console.log('* História de Usuário 3: Estatísticas de Repasses por critérios');
  stringComVariosIguais(66);
  stringComVariosDigitos(66);
  repasseMaiorValor();
  repasseMenorValor();
  diaComMaisRepasses();
  orgaoMaisRepasses();
  maiorOrgaoPorSucesso();
  maiorOrgaoPorFalha();
  maiorRepasseComMotivo();
}

function historiaQuatro(campoOrgao) {
  stringComVariosIguais(66);
  console.log('* História de Usuário 4: Apresentação Automática de Detalhes');
  stringComVariosIguais(66);
  stringComVariosDigitos(66);
  pesquisaPorOrgao(campoOrgao);
}

function historiaCinco() {
  stringComVariosIguais(66);
  console.log('* História de Usuário 5: Tratamento de erros');
  stringComVariosIguais(66);
  stringComVariosDigitos(66);
  transacoesInvalidas();
}

function historiaSeis(campoOrgao) {
  stringComVariosIguais(66);
  console.log('* História de Usuário 6: Ajustes nas estatísticas');
  stringComVariosIguais(66);
  stringComVariosDigitos(66);
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
