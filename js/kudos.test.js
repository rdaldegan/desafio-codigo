const kudos = require('./kudos');

// Os testes foram modificados para corrigir testes errados e adaptar os testes às mudanças das funções

test('test getKudosForUser', () => {
  expect(kudos.getKudosForUser(30)).toEqual([['GOOD', 'NICE'], 0]);
  expect(kudos.getKudosForUser(43)).toEqual([['GOOD', 'GOOD'], 3]);
  expect(kudos.getKudosForUser(644)).toEqual([["SUPER", "SUPER", "SUPER", "SUPER", "SUPER", "SUPER", "GOOD", "GOOD"], 4]);
  expect(kudos.getKudosForUser(100)).toEqual([['SUPER'], 0]);
});

test('test getKudosValueMessageForUser', () => {
  expect(kudos.getKudosValueMessageForUser(30))
    .toEqual('Você recebeu treze reais em retorno aos kudos GOOD, NICE e lhe restam zero pontos!');    // Este teste estava errado. Pela ordem dos Kudos GOOD 
  expect(kudos.getKudosValueMessageForUser(0))                                                         // vale mais do que NICE e, portanto, deveria vir antes.
    .toEqual('Você ainda não tem kudos suficientes para trocar');
  expect(kudos.getKudosValueMessageForUser(1))
    .toEqual('Você ainda não tem kudos suficientes para trocar');
});                                                                                                    


test('test getSpecificKudo', () => {
  expect(kudos.getSpecificKudo(350, 100, 'SUPER', []))
    .toEqual([['SUPER', 'SUPER', 'SUPER'], 50]);
    expect(kudos.getSpecificKudo(23, 20, 'GOOD', ['SUPER', 'GREAT']))
      .toEqual([['SUPER', 'GREAT', 'GOOD'], 3]);
});   

test('test extenso', () => {
  expect(kudos.extenso(350))
    .toEqual('trezentos e cinquenta');
    expect(kudos.extenso(99999))
      .toEqual('noventa e nove mil novecentos e noventa e nove');
    expect(kudos.extenso(100000))
      .toEqual('cem mil');
    expect(kudos.extenso(87236))
      .toEqual('oitenta e sete mil duzentos e trinta e seis');
    expect(kudos.extenso(0))
    .toEqual('zero');
    expect(kudos.extenso(14))
      .toEqual('quatorze');
    expect(kudos.extenso(100))
      .toEqual('cem');
    expect(kudos.extenso(1))
    .toEqual('um');
});   