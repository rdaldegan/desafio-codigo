const kudos = require('./kudos');

// Os testes foram modificados para corrigir testes errados e adaptar os testes às mudanças das funções

test('test getKudosForUser', () => {
  expect(kudos.getKudosForUser(30)).toEqual([['GOOD', 'NICE'], 0]);
  expect(kudos.getKudosForUser(43)).toEqual([['GOOD', 'GOOD'], 3]);
  expect(kudos.getKudosForUser(100)).toEqual([['SUPER'], 0]);
});

test('test getKudosValueMessageForUser', () => {
  expect(kudos.getKudosValueMessageForUser(30))
    .toEqual('Você recebeu treze reais em retorno aos kudos GOOD, NICE e lhe restam zero pontos!');    // Este teste estava errado. Pela ordem dos Kudos GOOD 
});                                                                                                    // vale mais do que NICE e, portanto, deveria vir antes.
