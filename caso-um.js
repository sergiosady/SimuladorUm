const dadosGovJSON = `[
  {"orgao":"Polícia Civil","data":"01/01/2024","valor":5500.00,"status":"sucesso"},
  {"orgao":"Polícia Rodoviária Federal","data":"02/01/2024","valor":6000.00,"status":"falha","motivo":"Problemas técnicos"},
  {"orgao":"Polícia Militar","data":"03/01/2024","valor":4500.00,"status":"sucesso"},
  {"orgao":"Corpo de Bombeiros","data":"04/01/2024","valor":7000.00,"status":"sucesso"},
  {"orgao":"Guarda Municipal","data":"05/01/2024","valor":3500.00,"status":"falha","motivo":"Documentação incompleta"},
  {"orgao":"Receita Federal","data":"06/01/2024","valor":8000.00,"status":"sucesso"},
  {"orgao":"Ministério Público","data":"07/01/2024","valor":9000.00,"status":"falha","motivo":"Erro no sistema"},
  {"orgao":"Defesa Civil","data":"08/01/2024","valor":4000.00,"status":"sucesso"},
  {"orgao":"Detran","data":"09/01/2024","valor":5000.00,"status":"sucesso"},
  {"orgao":"Polícia Federal","data":"10/01/2024","valor":6500.00,"status":"falha","motivo":"Falta de recursos"},
  {"orgao":"Ibama","data":"11/01/2024","valor":5500.00,"status":"sucesso"},
  {"orgao":"Anvisa","data":"12/01/2024","valor":6000.00,"status":"sucesso"},
  {"orgao":"Inmetro","data":"13/01/2024","valor":3000.00,"status":"falha","motivo":"Dados incorretos"},
  {"orgao":"Cetesb","data":"14/01/2024","valor":7000.00,"status":"sucesso"},
  {"orgao":"Susep","data":"15/01/2024","valor":8000.00,"status":"falha","motivo":"Problemas técnicos"},
  {"orgao":"Polícia Civil","data":"16/01/2024","valor":5200.00,"status":"sucesso"},
  {"orgao":"Polícia Rodoviária Federal","data":"17/01/2024","valor":6100.00,"status":"falha","motivo":"Erro humano"},
  {"orgao":"Polícia Militar","data":"18/01/2024","valor":4600.00,"status":"sucesso"},
  {"orgao":"Corpo de Bombeiros","data":"19/01/2024","valor":7100.00,"status":"sucesso"},
  {"orgao":"Guarda Municipal","data":"20/01/2024","valor":3600.00,"status":"falha","motivo":"Sistema fora do ar"},
  {"orgao":"Receita Federal","data":"21/01/2024","valor":8100.00,"status":"sucesso"},
  {"orgao":"Ministério Público","data":"22/01/2024","valor":9100.00,"status":"falha","motivo":"Recursos insuficientes"},
  {"orgao":"Defesa Civil","data":"23/01/2024","valor":4100.00,"status":"sucesso"},
  {"orgao":"Detran","data":"24/01/2024","valor":5100.00,"status":"sucesso"},
  {"orgao":"Polícia Federal","data":"25/01/2024","valor":6600.00,"status":"falha","motivo":"Problemas técnicos"},
  {"orgao":"Ibama","data":"26/01/2024","valor":5600.00,"status":"sucesso"},
  {"orgao":"Anvisa","data":"27/01/2024","valor":6100.00,"status":"sucesso"},
  {"orgao":"Inmetro","data":"28/01/2024","valor":3100.00,"status":"falha","motivo":"Dados incorretos"},
  {"orgao":"Cetesb","data":"29/01/2024","valor":7100.00,"status":"sucesso"},
  {"orgao":"Susep","data":"30/01/2024","valor":8100.00,"status":"falha","motivo":"Problemas técnicos"},
  {"orgao":"Polícia Civil","data":"31/01/2024","valor":5300.00,"status":"sucesso"}
]`;

//Transformar o JSON em Object/Array
const dadosGovObj = JSON.parse(dadosGovJSON);
console.log(dadosGovObj);