const repassesGov = require('../data/dados-gov.json');      //Recebendo dados em JSON, transformando em Array JS(parse) E guardando em uma variável


const orgaosComSucesso = [
  ...new Set(
    repassesGov.filter(elemento => elemento.status === "sucesso").map(elemento => elemento.orgao)
  )
];

function totalDeRepasses() {
  console.log(`Total de repasses processados: ${repassesGov.length}`);
};

function repassesBemSucedidos() {
  return console.log(`Total de repasses bem sucedidos: ${repassesGov.filter(elemento => elemento.status === "sucesso").length}`);
}

function quantidaOrgaosComSucesso(orgaosComSucesso, repassesGov) {
  for (i = 0; i < orgaosComSucesso.length; i++) {
    let total = repassesGov.filter(elemento => elemento.status === "sucesso" && elemento.orgao === orgaosComSucesso[i]).length;
    console.log(`${orgaosComSucesso[i]}: ${total}`)
  }
};

function valorTotalRepassesValidos() {
  return console.log(`Valor Total: R$ ${repassesGov.filter(elemento => elemento.status === "sucesso").reduce((acumulador, elemento) => acumulador + elemento.valor, 0)}`);
}

function valorPorOrgaoSucesso() {
  for (i = 0; i < orgaosComSucesso.length; i++) {
    console.log(`${orgaosComSucesso[i]}: R$ ${repassesGov.filter(elemento => elemento.orgao === orgaosComSucesso[i]).reduce((acumulador, elemento) => acumulador + elemento.valor, 0)}`);
  }
}

function resumoRepassesBemSucedidos() {
  repassesBemSucedidos();
  quantidaOrgaosComSucesso(orgaosComSucesso, repassesGov);
  valorTotalRepassesValidos();
  valorPorOrgaoSucesso()
};

module.exports = {
  totalDeRepasses,
  resumoRepassesBemSucedidos,
};
