// Conversão de kudos para pontos
const KUDOS_TO_POINTS = [
  { name: 'OK', value: 5 },
  { name: 'NICE', value: 10 },
  { name: 'GOOD', value: 20 },
  { name: 'GREAT', value: 50 },
  { name: 'SUPER', value: 100 },
];

// Conversão de kudos para reais
const KUDOS_TO_REAL = [
  { name: 'OK', value: 2 },
  { name: 'NICE', value: 5 },
  { name: 'GOOD', value: 8 },
  { name: 'GREAT', value: 15 },
  { name: 'SUPER', value: 25 },
];

/* 
  Recebe: a quantidade de pontos que ainda devem ser convertidos, o valor em pontos do kudo a ser convertido, a string 
  referente a este kudo e o array de saída após conversão.
  Retorna: a quantidade de pontos que ainda precisam ser convertida para os kudos de menor valor e o novo array de saída.
*/
function getSpecificKudo(rest, ptsValue, kudoString, currentOutput) {
  let kudosAmount = Math.floor(rest / ptsValue);                         // Checa a quantidade de kudos deste tipo deverão ser adicionadas a saída
  rest -= (kudosAmount * ptsValue);                                      // Reduz a quantidade de pontos convertida dos pontos a serem convertidos
  for (let i = 0; i < kudosAmount; i++) {                                // Adiciona as strings do respectivo kudo ao array de saída
    currentOutput.push(kudoString)
  };

  return [currentOutput, rest];                                          // Retorna o resto dos pontos e o array de saída
};

/* 
  Recebe: um int representando o número de pontos do usuário
  Retorna: um array contendo (1) outro array com os kudos trocados e (2) o restante de pontos que o usuário ainda teria. Ex.: [['OK', 'GOOD'], 3]
  (foi assumido um caso mais realista que o desafio proposto, onde o usuário não precisaria ter uma quantidade específica de pontos para trocar)
*/
function getKudosForUser(points) {
  let rest = points;
  let output = [];

  for (let i = KUDOS_TO_POINTS.length - 1; i >= 0; i--) {                // Executa a conversão para todos os valores do array KUDOS_TO_POINTS
    [output, rest] = getSpecificKudo(                                    // Assim podem ser modificados os valores de cada Kudo e adicionar ou removê-los
      rest,                                                              // E o algoritmo continuará funcionando
      KUDOS_TO_POINTS[i].value,
      KUDOS_TO_POINTS[i].name,
      output,
    );                                                                   // Executa a fução getSpecificKudo()
  };

  return [output, rest];
}

/* 
  Recebe: um int 
  Retorna: uma string do número recebido por extenso
*/
function extenso(number){
  // Verifica se o numero é zero e retorna "zero" caso necessário
  if(number === 0){
    return 'zero'
  }

  // Define as strings pra unidades dezenas e centenas
  const unidades = ["um", "dois", "três", "quatro", "cinco", "seis", "sete", 
                  "oito", "nove", "dez", "onze", "doze", "treze", "quatorze", 
                  "quinze", "dezesseis", "dezessete", "dezoito", "dezenove"];

  const dezenas = ["vinte", "trinta", "quarenta", "cinquenta", 
                "sessenta", "setenta", "oitenta", "noventa"];

  const centenas = ["cento", "duzentos", "trezentos", "quatrocentos", "quinhentos",
                  "seiscentos", "setecentos", "oitocentos", "novecentos"];
  
  // Converte o numero para string com o objetivo de facilitar trabalhar com índices e o tamanho do numero
  let numString = number.toString();

  // Define a string de saída
  outputString = '';

  // 1000 <= numero
  // Se o numero for maior que mil, usa recursão para fazer a parte supereior a mil e depois continua o algoritmo para o resto do numero
  if (numString.length > 3) {
    outputString += extenso(Math.floor(number/1000)) + ' mil'
    numString = String(parseInt(numString)%1000);
    if(numString.length > 0 && parseInt(numString) !== 0){
      outputString += ' ';
    }
  }
  
  // numero < 20
  // Se o numero for menor que 20 apenas usa o array de unidades (que vai até 19)
  if (number < 20) {
    outputString += unidades[number - 1];
  }

  // 20 <= numero < 100
  // Se o numero for maior que 20 verifica se o final é 0. Se for apenas adiciona a dezena. Se não for adiciona a dezena e a unidade
  else if (numString.length === 2) {
    if(numString[1] === '0'){
      outputString += dezenas[numString[0] - 2];
    }
    else{
      outputString += dezenas[numString[0] - 2] + ' e ' + unidades[numString[1] - 1];
    }
  }
  
  // 100 <= numero <= 999
  // Se o numero for maior que 100 verificaa se a centena é "cem" ou "centos" e se é necessário adicionar a dezena e unidade (por recursão)
  if (numString.length == 3) {
    if (numString === '100'){
      outputString += "cem";
    }
    else if (numString[1] === '0' && numString[2] === '0'){
      outputString += centenas[numString[0] - 1];
    }
    else{
      outputString += centenas[numString[0] - 1] + ' e ' + extenso(parseInt(numString[1] + numString[2]));
    }
  }

  // Retorna a string montada
  return outputString;
}

/* 
  Recebe: Recebe um array contendo os nomes dos kudos de um usuário. Ex.: ['OK', 'GOOD']
  Retorna: a mensagem padrão com o valor em reais dos kudos por extenso. Ex.: Parabéns, você ganhou vinte e cinco reais
*/
function getKudosValueMessageForUser(points) {
  [kudos, rest] = getKudosForUser(points);                                          // Pega o array de kudos a partir dos pontos do usuario

  if(kudos.length === 0){
    return 'Você ainda não tem kudos suficientes para trocar'
  }
  let totalReais = 0;
  for (let i = KUDOS_TO_REAL.length - 1; i >= 0 ; i--) {                            // Percorre o array KUDOS_TO_REAL
    let currentKudo = KUDOS_TO_REAL[i];
    for (let j = 0; j < kudos.length; j++) {                                        // Percorre o array dos kudos que o colaborador tem
      let currentArrayItem = kudos[j];
      if(currentKudo.name === currentArrayItem){                                    // Quando o kudo do colaborador for igual ao do KUDOS_TO_REAL soma o valor em reais ao total a receber
        totalReais += currentKudo.value;
      };
    };
  };

  // Chama a função extenso() para converter o total de reais e o resto de pontos para extenso
  let totalReaisString = extenso(totalReais);
  let restString = extenso(rest);
  
  // Adiciona " real" ou " reais" dependendo se o o totalReaisString é "um"
  if(totalReaisString === "um"){
    totalReaisString += ' real';
  } else {
    totalReaisString += ' reais'
  }
  
  // Monta a string com os kudos
  let arrayString = kudos.join(", "); 

  // Retorna a string final
  return `Você recebeu ${totalReaisString} em retorno aos kudos ${arrayString} e lhe restam ${restString} pontos!`;
};

/* 
  Notas de desenvolvimento
  Foram realizadas algumas atribuições de variáveis desnecessárias para facilitar a leitura do código
  Além disso, a função de conversão para numero por extenso foi construída apenas por ser um desafio de programação. 
  Em um cenário real seria mais simples utilizar bibliotecas de terceiros.
*/

module.exports = {
  getKudosForUser,
  getKudosValueMessageForUser,
  getSpecificKudo,
  extenso,
};
