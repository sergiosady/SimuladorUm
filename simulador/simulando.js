import { historiaUm, historiaDois, historiaTres, historiaQuatro, historiaCinco, historiaSeis } from '../logica/scripts.js';

simuladorNivelUm();                  

async function simuladorNivelUm() {  
    historiaUm();         
    await delay(tempoDeEpera);

    historiaDois();        
    await delay(tempoDeEpera); 

    historiaTres();       
    await delay(tempoDeEpera);

    historiaQuatro('MEC');       //É possível escolher o nome do órgão, ex: Polícia Civil, Corpo de Bombeiros
    await delay(tempoDeEpera);

    historiaCinco();      
    await delay(tempoDeEpera);

    historiaSeis('MEC');   
}

var tempoDeEpera = 2000;

function delay(ms) { 
    return new Promise(resolve => setTimeout(resolve, ms));
}

/* RESULTADO ESPERADO DA EXECUÇÃO:

===================================================================
* História de Usuário 1: Recebimento e Exibição de Dados do Governo
===================================================================
Total de repasses processados: 93
===================================================================
* História de Usuário 2: Análise de Transações por status
===================================================================
Total de repasses bem sucedidos: 56
-------------------------------------------------------------------
Repasses bem sucedidos por orgão:
Polícia Civil: 7
Polícia Militar: 7
Corpo de Bombeiros: 6
Receita Federal: 6
Defesa Civil: 6
Detran: 6
Ibama: 6
Anvisa: 6
Cetesb: 6
-------------------------------------------------------------------
Valor total: R$ 337300.00
-------------------------------------------------------------------
Valor por orgão:
Polícia Civil: R$ 38200.00
Polícia Militar: R$ 33600.00
Corpo de Bombeiros: R$ 43500.00
Receita Federal: R$ 49500.00
Defesa Civil: R$ 25500.00
Detran: R$ 31500.00
Ibama: R$ 34500.00
Anvisa: R$ 37500.00
Cetesb: R$ 43500.00
-------------------------------------------------------------------
Total de repasses com falha: 37
-------------------------------------------------------------------
Total de repasses por orgão:
Polícia Rodoviária Federal: 7
Guarda Municipal: 6
Ministério Público: 6
Polícia Federal: 6
Inmetro: 6
Susep: 6
-------------------------------------------------------------------
Total de falhas com motivo: 37
-------------------------------------------------------------------
Valor total em falhas: R$ 231600.00
-------------------------------------------------------------------
Por orgão:
Polícia Rodoviária Federal: R$ 44100.00
Guarda Municipal: R$ 22500.00
Ministério Público: R$ 55500.00
Polícia Federal: R$ 40500.00
Inmetro: R$ 19500.00
Susep: R$ 49500.00
-------------------------------------------------------------------
Valor total de falhas com motivo: R$ 231600.00
===================================================================
* História de Usuário 3: Estatísticas de Repasses por critérios
===================================================================
Repasse de maior valor:
┌─────────┬──────────────────────────┐
│ (index) │ Values                   │
├─────────┼──────────────────────────┤
│ orgao   │ 'Ministério Público'     │
│ data    │ '20/01/2024'             │
│ valor   │ 9500                     │
│ status  │ 'falha'                  │
│ motivo  │ 'Recursos insuficientes' │
└─────────┴──────────────────────────┘
-------------------------------------------------------------------
Repasse de menor valor:
┌─────────┬────────────────────┐
│ (index) │ Values             │
├─────────┼────────────────────┤
│ orgao   │ 'Inmetro'          │
│ data    │ '13/01/2024'       │
│ valor   │ 3000               │
│ status  │ 'falha'            │
│ motivo  │ 'Dados incorretos' │
└─────────┴────────────────────┘
-------------------------------------------------------------------
Dia com mais repasses:
20/01/2024
-------------------------------------------------------------------
Orgão com mais repasses:
Ministério Público
-------------------------------------------------------------------
Orgão com mais repasses com sucesso:
Receita Federal
-------------------------------------------------------------------
Orgão com mais repasses falhados:
Ministério Público
-------------------------------------------------------------------
Motivo de falha com mais repasses:
Recursos insuficientes
-------------------------------------------------------------------
===================================================================
* História de Usuário 4: Apresentação Automática de Detalhes
===================================================================
Buscando informações sobre: MEC...
┌─────────┬───────┬──────────────┬───────┬───────────┬──────────────────┬──────────┬─────────┬───────┬───────┐
│ (index) │ orgao │ data         │ valor │ status    │ motivo           │ repasses │ sucesso │ falha │ total │
├─────────┼───────┼──────────────┼───────┼───────────┼──────────────────┼──────────┼─────────┼───────┼───────┤
│ 0       │ 'MEC' │ '01/01/2024' │ 500   │ 'sucesso' │                  │          │         │       │       │
│ 1       │ 'MEC' │ '05/01/2024' │ 1000  │ 'sucesso' │                  │          │         │       │       │
│ 2       │ 'MEC' │ '17/01/2024' │ 800   │ 'falha'   │ 'falta de verba' │          │         │       │       │
│ 3       │ 'MEC' │ '22/01/2024' │ 1100  │ 'falha'   │                  │          │         │       │       │
│ 4       │ 'MEC' │              │       │           │                  │ 4        │ 1500    │ 1900  │ 3400  │
└─────────┴───────┴──────────────┴───────┴───────────┴──────────────────┴──────────┴─────────┴───────┴───────┘
===================================================================
* História de Usuário 5: Tratamento de erros
===================================================================
Buscando transações inválidas(Sem motivo)...
Tabela de transações inválidas:
┌─────────┬───────┬──────────────┬───────┬─────────┬──────────┬───────┐
│ (index) │ orgao │ data         │ valor │ status  │ repasses │ total │
├─────────┼───────┼──────────────┼───────┼─────────┼──────────┼───────┤
│ 0       │ 'MEC' │ '22/01/2024' │ 1100  │ 'falha' │          │       │
│ 1       │       │              │       │         │ 1        │ 1100  │
└─────────┴───────┴──────────────┴───────┴─────────┴──────────┴───────┘
===================================================================
* História de Usuário 6: Ajustes nas estatísticas
===================================================================
Quantidade de repasses: 103
Quantidade de repasses ajustados(válidos): 102
Transações inválidas removidas: 1
Buscando informações sobre: MEC...
┌─────────┬───────┬──────────────┬───────┬───────────┬──────────────────┬──────────┬─────────┬───────┬───────┐
│ (index) │ orgao │ data         │ valor │ status    │ motivo           │ repasses │ sucesso │ falha │ total │
├─────────┼───────┼──────────────┼───────┼───────────┼──────────────────┼──────────┼─────────┼───────┼───────┤
│ 0       │ 'MEC' │ '01/01/2024' │ 500   │ 'sucesso' │                  │          │         │       │       │
│ 1       │ 'MEC' │ '05/01/2024' │ 1000  │ 'sucesso' │                  │          │         │       │       │
│ 2       │ 'MEC' │ '17/01/2024' │ 800   │ 'falha'   │ 'falta de verba' │          │         │       │       │
│ 3       │ 'MEC' │              │       │           │                  │ 3        │ 1500    │ 800   │ 2300  │
└─────────┴───────┴──────────────┴───────┴───────────┴──────────────────┴──────────┴─────────┴───────┴───────┘

*/