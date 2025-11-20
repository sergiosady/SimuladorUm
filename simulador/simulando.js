const simulador = require('../logica/scripts.js');

//HISTORIA DE USUÁRIO 1 - Deverá exibir os dados dos repasses e a quantidade de repasses
//simulador.gerarRelatorio({ 'orgao': 'Todos' }, 'filtrar');

//HISTORIA DE USUÁRIO 2
//simulador.gerarRelatorio({ 'status': 'sucesso'}, 'filtrar'); // critério (a)
simulador.gerarRelatorio({ 'orgao': 'todos', 'status': 'sucesso'}, 'listarUnicos');





