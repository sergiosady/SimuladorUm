const simulador = require('../logica/scripts.js'); // IMPORTANDO FUNÇÕES
const tempoDeEpera = 2000; // TEMPO DE DELAY

/*  ALUNO: SERGIO SADY MONTEIRO FERREIRA 

    BEM VINDO(A) AO MEU SIMULADOR, FAVOR EXECUTAR CÓDIGO POR AQUI.

    SIMULADOR NÍVEL UM */

simuladorNivelUm();                  // EXECUÇÃO DO SIMULADOR COM 2s DE DELAY ENTRE HISTÓRIAS

async function simuladorNivelUm() {  // FUNÇÃO ASSÍNCRONA PARA SIMULAR DELAY
    simulador.historiaUm();          // História de Usuário 1: Deverá exibir os dados dos repasses e a quantidade de repasses
    await delay(tempoDeEpera);

    simulador.historiaDois();        // História de Usuário 2: Análise de Transações por status
    await delay(tempoDeEpera);

    simulador.historiaTres();        // História de Usuário 3: Estatísticas de Repasses por critérios
    await delay(tempoDeEpera);

    simulador.historiaQuatro('MEC'); // História de Usuário 4: Apresentação Automática de Detalhes (PODE ALTERAR NOME DO ORGAO)
    await delay(tempoDeEpera);

    simulador.historiaCinco();       // História de Usuário 5: Tratamento de erros
    await delay(tempoDeEpera);

    simulador.historiaSeis('MEC');   // História de Usuário 6: Ajustes nas estatísticas (REMOVENDO TRANSAÇÕES INVÁLIDAS)
}

function delay(ms) {            //CRIANDO PROMISE DELAY
    return new Promise(resolve => setTimeout(resolve, ms));
}



