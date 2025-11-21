//Recebendo dados do .JSON > Parse para Array > guardando em uma variável
const repassesGov = require('../data/dados-gov.json');



function gerarRelatorio(filtros, acao) {
  const dadosFiltrados = pesquisaComFiltros(filtros);

  console.log(`--- Relatório ---`);

  switch (acao) {
    case 'imprimir':
    case 'filtrar': //Imprime a lista filtrada
      console.log(`Itens encontrados: ${dadosFiltrados.length}`);
      return console.log(dadosFiltrados);

    case 'somarValor': //Calcula o valor total
      if (dadosFiltrados.length === 0) {
        return console.log('Nenhum repasse encontrado para calcular.');
      }

      const valorTotal = dadosFiltrados.reduce((total, repasse) => {
        return total + repasse.valor;
      }, 0);

      console.log(`Itens somados: ${dadosFiltrados.length}`);
      return console.log(`VALOR TOTAL REPASSADO: R$ ${valorTotal.toFixed(2)}`);

    case 'listarUnicos': // Lista os órgãos sem duplicidade
      const orgaosUnicos = [
        ...new Set(
          repassesGov.map(elemento => elemento.orgao)
        )
      ];
      console.log('Órgãos ÚNICOS encontrados no sistema:');
      return console.log(orgaosUnicos);
    
    default:
      console.log('Ação não reconhecida. Use: "imprimir", "somarValor" ou "listarUnicos".');
      return [];
  }
}

function pesquisaComFiltros(filtros) {
  let resultado = repassesGov;

  for (chave in filtros) {
    const valorFiltro = filtros[chave];
    switch (chave) {
      case 'orgao':
        if (valorFiltro !== 'Todos' || valorFiltro !== 'todos') {
          resultado = resultado.filter(filtroOrgao(valorFiltro));
        }
        break;

      case 'status':
        resultado = resultado.filter(filtroStatus(valorFiltro));
        break;

      case 'data':
        resultado = resultado.filter(filtroData(valorFiltro));
        break;

      case 'valor':
        resultado = resultado.filter(filtroValor(valorFiltro));
        break;

      case 'motivo':
        resultado = resultado.filter(filtroMotivo(valorFiltro));
        break;

      default:
        break;
    }
  }

  return resultado;
}

//FILTROS  PARA CADA TIPO DE VALOR DA PROPRIEDADE
function filtroValor(campoValor) {
  return (elemento) => elemento.valor === campoValor;
}

function filtroStatus(campoStatus) {
  return (elemento) => elemento.status === campoStatus;
}

function filtroOrgao(campoOrgao) {
  return (elemento) => elemento.orgao === campoOrgao;
}

function filtroData(campoData) {
  return (elemento) => elemento.data === campoData;
}

function filtroMotivo(campoMotivo) {
  return (elemento) => elemento.data === campoMotivo;
}

//EXPORTANDO FUNÇÕES PARA SIMULADOR
module.exports = {
  gerarRelatorio,
}

