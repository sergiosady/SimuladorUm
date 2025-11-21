const repassesGov = require('../data/dados-gov.json');

let listaOrgaosDeSucesso = [
  ...new Set(
    repassesGov.filter(elemento => elemento.status === "sucesso").map(elemento => elemento.orgao)
  )
];

let listaOrgaosPorFalha = [
  ...new Set(
    repassesGov.filter(elemento => elemento.status === 'falha').map(elemento => elemento.orgao)
  )
];

//RESUMO DE REPASSES VALIDOS
totalDeRepasses();
repassesBemSucedidos();
quantidaPorOrgaosComSucesso();
valorTotalEmRepassesValidos();
valorPorOrgaoSucesso();

function totalDeRepasses() {
  console.log(`Total de repasses processados: ${repassesGov.length}`);
}

function repassesBemSucedidos() {
  console.log(`Total de repasses bem sucedidos: ${repassesGov.filter(elemento => elemento.status === "sucesso").length}`);
}

function quantidaPorOrgaosComSucesso() {
  console.log('Por orgão:')
  for (i = 0; i < listaOrgaosDeSucesso.length; i++) {
    let total = repassesGov.filter(elemento => elemento.status === "sucesso" && elemento.orgao === listaOrgaosDeSucesso[i]).length;
    console.log(`${listaOrgaosDeSucesso[i]}: ${total}`)
  }
}

function valorTotalEmRepassesValidos() {
  console.log(`Valor total: R$ ${repassesGov.filter(elemento => elemento.status === "sucesso").reduce((acumulador, elemento) => acumulador + elemento.valor, 0).toFixed(2)}`);
}

function valorPorOrgaoSucesso() {
  console.log('Por orgão:')
  for (i = 0; i < listaOrgaosDeSucesso.length; i++) {
    console.log(`${listaOrgaosDeSucesso[i]}: R$ ${repassesGov.filter(elemento => elemento.orgao === listaOrgaosDeSucesso[i]).reduce((acumulador, elemento) => acumulador + elemento.valor, 0).toFixed(2)}`);
  }
}

//RESUMO DE FALHAS
repassesComFalha();
quantidadeDeFalhasPorOrgao();
totalFalhasComMotivo();
valorTotalEmFalhas();
valorFalhasPorOrgao();
valorFalhasComMotivo();

function repassesComFalha() {
  console.log(`Total de repasses com falha: ${repassesGov.filter(elemento => elemento.status === 'falha').length}`);
}

function quantidadeDeFalhasPorOrgao() {
  console.log('Por orgão:')
  for (i = 0; i < listaOrgaosPorFalha.length; i++) {
    let total = repassesGov.filter(elemento => elemento.status === 'falha' && elemento.orgao === listaOrgaosPorFalha[i]).length;
    console.log(`${listaOrgaosPorFalha[i]}: ${total}`)
  }
}

function totalFalhasComMotivo() {
  console.log(`Total de falhas com motivo: ${repassesGov.filter(elemento => elemento.motivo).length}`);
}

function valorTotalEmFalhas() {
  console.log(`Valor total em falhas: R$ ${repassesGov.filter(elemento => elemento.status === 'falha').reduce((acumulador, elemento) => acumulador + elemento.valor, 0).toFixed(2)}`);

}

function valorFalhasPorOrgao() {
  console.log('Por orgão:')
  for (i = 0; i < listaOrgaosPorFalha.length; i++) {
    console.log(`${listaOrgaosPorFalha[i]}: R$ ${repassesGov.filter(elemento => elemento.orgao === listaOrgaosPorFalha[i]).reduce((acumulador, elemento) => acumulador + elemento.valor, 0).toFixed(2)}`);
  }
}

function valorFalhasComMotivo() {
  console.log(`Valor total em falhas com motivo: R$ ${repassesGov.filter(elemento => elemento.motivo).reduce((acumulador, elemento) => acumulador + elemento.valor, 0).toFixed(2)}`);
}