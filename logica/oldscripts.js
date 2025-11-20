/*LOGICA ANTIGA, DECIDI REFAZER COM UMA LOGICA E 
ESCALABILIDADE MELHOR APÓS DIAS ITERANDO.

DEIXEI APENAS PARA FINS EDUCACIONAIS
*/
const repassesGov = require('../data/dados-gov.json');

totalDeRepasses();
repassesBemSucedidos();
quantidaOrgaosComSucesso();
valorTotalEmRepassesValidos();
valorPorOrgaoSucesso();

function totalDeRepasses() {
  console.log(`Total de repasses processados: ${repassesGov.length}`);
}

function repassesBemSucedidos() {
  return console.log(`Total de repasses bem sucedidos: ${repassesGov.filter(elemento => elemento.status === "sucesso").length}`);
}

function quantidaOrgaosComSucesso() {
  const orgaosDeSucesso = [
    ...new Set(
      repassesGov.filter(elemento => elemento.status === "sucesso").map(elemento => elemento.orgao)
    )
  ]
  for (i = 0; i < orgaosDeSucesso.length; i++) {
    let total = repassesGov.filter(elemento => elemento.status === "sucesso" && elemento.orgao === orgaosDeSucesso[i]).length;
    console.log(`${orgaosDeSucesso[i]}: ${total}`)
  }
}

function valorTotalEmRepassesValidos() {
  return console.log(`Valor Total: R$ ${repassesGov.filter(elemento => elemento.status === "sucesso").reduce((acumulador, elemento) => acumulador + elemento.valor, 0).toFixed(2)}`);
}

function valorPorOrgaoSucesso() {
  const orgaosDeSucesso = [
    ...new Set(
      repassesGov.filter(elemento => elemento.status === "sucesso").map(elemento => elemento.orgao)
    )
  ]
  for (i = 0; i < orgaosDeSucesso.length; i++) {
    console.log(`${orgaosDeSucesso[i]}: R$ ${repassesGov.filter(elemento => elemento.orgao === orgaosDeSucesso[i]).reduce((acumulador, elemento) => acumulador + elemento.valor, 0).toFixed(2)}`);
  }
}
