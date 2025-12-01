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
