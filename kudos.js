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

  return [rest, currentOutput];                                          // Retorna o resto dos pontos e o array de saída
};

/* 
  Recebe: um int representando o número de pontos do usuário
  Retorna: um array contendo os kudos. Ex.: ['OK', 'GOOD'] 
*/
function getKudosForUser(points) {
  let rest = points;
  let output = [];

  for (let i = KUDOS_TO_POINTS.length - 1; i >= 0; i--) {                // Executa a conversão para todos os valores do array KUDOS_TO_POINTS
    [rest, output] = getSpecificKudo(                                    // Assim podem ser modificados os valores de cada Kudo e adicionar ou removê-los
      rest,                                                              // E o algoritmo continuará funcionando
      KUDOS_TO_POINTS[i].value,
      KUDOS_TO_POINTS[i].name,
      output,
    );                                                                   // Executa a fução getSpecificKudo()
  };

  return output;
}

// Créditos pela função: Carlos R. L. Rodrigues
//@ http://jsfromhell.com/string/extenso [rev. #3]
/* 
  Função levemente adaptada para incluir numeros de até 999 milhões (originalmente alcança numeros de até 63 digitos)
  Atua em cima de uma string numérica para convertê-la em numeros por extenso
*/
String.prototype.extenso = function(c){
	var ex = [
		["zero", "um", "dois", "três", "quatro", "cinco", "seis", "sete", "oito", "nove", "dez", "onze", "doze", "treze", "quatorze", "quinze", "dezesseis", "dezessete", "dezoito", "dezenove"],
		["dez", "vinte", "trinta", "quarenta", "cinquenta", "sessenta", "setenta", "oitenta", "noventa"],
		["cem", "cento", "duzentos", "trezentos", "quatrocentos", "quinhentos", "seiscentos", "setecentos", "oitocentos", "novecentos"],
		["mil", "milhão"]
	];
	var a, n, v, i, n = this.replace(c ? /[^,\d]/g : /\D/g, "").split(","), e = " e ", $ = "real", d = "centavo", sl;
	for(var f = n.length - 1, l, j = -1, r = [], s = [], t = ""; ++j <= f; s = []){
		j && (n[j] = (("." + n[j]) * 1).toFixed(2).slice(2));
		if(!(a = (v = n[j]).slice((l = v.length) % 3).match(/\d{3}/g), v = l % 3 ? [v.slice(0, l % 3)] : [], v = a ? v.concat(a) : v).length) continue;
		for(a = -1, l = v.length; ++a < l; t = ""){
			if(!(i = v[a] * 1)) continue;
			i % 100 < 20 && (t += ex[0][i % 100]) ||
			i % 100 + 1 && (t += ex[1][(i % 100 / 10 >> 0) - 1] + (i % 10 ? e + ex[0][i % 10] : ""));
			s.push((i < 100 ? t : !(i % 100) ? ex[2][i == 100 ? 0 : i / 100 >> 0] : (ex[2][i / 100 >> 0] + e + t)) +
			((t = l - a - 2) > -1 ? " " + (i > 1 && t > 0 ? ex[3][t].replace("ão", "ões") : ex[3][t]) : ""));
		}
		a = ((sl = s.length) > 1 ? (a = s.pop(), s.join(" ") + e + a) : s.join("") || ((!j && (n[j + 1] * 1 > 0) || r.length) ? "" : ex[0][0]));
		a && r.push(a + (c ? (" " + (v.join("") * 1 > 1 ? j ? d + "s" : (/0{6,}$/.test(n[0]) ? "de " : "") + $.replace("l", "is") : j ? d : $)) : ""));
	}
	return r.join(e);
}

/* 
  Recebe: Recebe um array contendo os nomes dos kudos de um usuário. Ex.: ['OK', 'GOOD']
  Retorna: a mensagem padrão com o valor em reais dos kudos por extenso. Ex.: Parabéns, você ganhou vinte e cinco reais
*/
function getKudosValueMessageForUser(points) {
  kudos = getKudosForUser(points);                                                  // Pega o array de kudos a partir dos pontos do usuario
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
  
  let mainString = "Você recebeu <valueReais> em retorno aos kudos <listItems>!"    // Cria uma string base a ser modificada
  
  let totalReaisString = String(totalReais).extenso("BRL");                         // Converte o valor em reais para o numero em extenso

  let arrayString = kudos.join(", ");                                               // Converte o array dos kudos do colaborador para uma string separada por ", "

  let outputString = mainString.replace(/<valueReais>/, totalReaisString);          // Monta a string a ser retornada
  outputString = outputString.replace(/<listItems>/, arrayString);

  return outputString;  
};

/* 
  Notas de desenvolvimento
  Durante a elaboração do código foram feitas algumas atribuições que poderiam ser removidas, mas facilitam a leitura e, assim, a compreensão durante futura manutenção.
  Além disso, seria possível desenvolver a função de conversão de valores numéricos para sua forma por extenso, mas em um cenário real este tipo de problema é facilmente 
  resolvido com bibliotecas e funções de terceiros.
*/

module.exports = {
  getKudosForUser,
  getKudosValueMessageForUser,
};
