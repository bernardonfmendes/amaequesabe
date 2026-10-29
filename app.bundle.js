/* data.js — ingredientes, supermercados e receitas iniciais.
   Preços "src": preço da embalagem de origem (srcQty) por cadeia, recolhido em
   ativos.pt (cabaz alimentar, preços online de referência, 17 out 2026) para
   Continente, Pingo Doce e Auchan. Lidl e Mercadona não têm dados recolhidos: usam a média
   até o utilizador escrever os preços.
   Preços "est": estimativas da app, por embalagem, editáveis na app. */

var STORES = [
  {id:'ref',        nome:'Média de referência', curto:'Média'},
  {id:'continente', nome:'Continente',          curto:'Continente'},
  {id:'pingodoce',  nome:'Pingo Doce',          curto:'Pingo Doce'},
  {id:'auchan',     nome:'Auchan',              curto:'Auchan'},
  {id:'lidl',       nome:'Lidl (preços manuais)',      curto:'Lidl'},
  {id:'mercadona',  nome:'Mercadona (preços manuais)', curto:'Mercadona'}
];

var CATS = [
  {id:'hort',  nome:'Frutas e legumes'},
  {id:'talho', nome:'Talho e peixaria'},
  {id:'charc', nome:'Charcutaria e frios'},
  {id:'lact',  nome:'Ovos, leite e queijo'},
  {id:'pao',   nome:'Pão'},
  {id:'merc',  nome:'Mercearia'},
  {id:'cong',  nome:'Congelados'},
  {id:'temp',  nome:'Temperos e despensa'}
];

var RECIPE_CATS = [
  {id:'carne',  nome:'Carne'},
  {id:'peixe',  nome:'Peixe'},
  {id:'veg',    nome:'Vegetariana'},
  {id:'sopa',   nome:'Sopas'},
  {id:'peq',    nome:'Pequeno-almoço'}
];

/* u: unidade base (g, ml ou un). pack: tamanho da embalagem a que o preço se refere.
   step: menor quantidade que se compra (produtos vendidos ao peso); omitido = embalagem inteira. */
var ING = [
  /* com preços recolhidos por cadeia */
  {id:'arroz',      nome:'Arroz agulha',            cat:'merc', u:'g',  pack:1000, srcQty:2000,
   src:{continente:2.16, pingodoce:2.30, auchan:1.57}},
  {id:'esparguete', nome:'Esparguete',              cat:'merc', u:'g',  pack:500,  srcQty:2000,
   src:{continente:1.98, pingodoce:1.98, auchan:1.98}},
  {id:'azeite',     nome:'Azeite virgem extra',     cat:'temp', u:'ml', pack:1000, srcQty:1000, pantry:true,
   src:{continente:6.12, pingodoce:4.78, auchan:5.19}},
  {id:'leite',      nome:'Leite UHT meio-gordo',    cat:'lact', u:'ml', pack:1000, srcQty:6000,
   src:{continente:5.34, pingodoce:5.10, auchan:5.10}},
  {id:'ovos',       nome:'Ovos M',                  cat:'lact', u:'un', pack:12,   srcQty:12,
   src:{continente:2.86, pingodoce:2.99, auchan:4.59}},
  {id:'peitofrango',nome:'Peito de frango',         cat:'talho',u:'g',  pack:500,step:100,  srcQty:1000,
   src:{continente:6.49, pingodoce:6.59, auchan:7.79}},
  {id:'carnepicada',nome:'Carne de vaca picada',    cat:'talho',u:'g',  pack:500,step:250,  srcQty:500,
   src:{continente:7.09, pingodoce:8.72, auchan:7.99}},
  {id:'pescada',    nome:'Pescada',                 cat:'talho',u:'g',  pack:800,step:200,  srcQty:800,
   src:{continente:8.79, pingodoce:8.88, auchan:5.72}},
  {id:'batata',     nome:'Batata',                  cat:'hort', u:'g',  pack:1000,step:500, srcQty:2000,
   src:{continente:2.24, pingodoce:2.28, auchan:2.26}},
  {id:'cebola',     nome:'Cebola',                  cat:'hort', u:'g',  pack:1000,step:500, srcQty:1000,
   src:{continente:0.99, pingodoce:2.39, auchan:1.19}},
  {id:'cenoura',    nome:'Cenoura',                 cat:'hort', u:'g',  pack:1000,step:500, srcQty:1000,
   src:{continente:0.89, pingodoce:2.18, auchan:2.18}},
  {id:'tomate',     nome:'Tomate redondo',          cat:'hort', u:'g',  pack:1000,step:100, srcQty:1000,
   src:{continente:1.69, pingodoce:2.24, auchan:2.24}},
  {id:'banana',     nome:'Banana',                  cat:'hort', u:'g',  pack:1000,step:100, srcQty:1000,
   src:{continente:1.19, pingodoce:1.17, auchan:1.17}},
  {id:'maca',       nome:'Maçã Gala',               cat:'hort', u:'g',  pack:1000,step:100, srcQty:1000,
   src:{continente:1.89, pingodoce:1.66, auchan:4.11}},
  {id:'pao',        nome:'Pão de forma',            cat:'pao',  u:'g',  pack:700,  srcQty:700,
   src:{continente:1.27, pingodoce:1.27, auchan:1.99}},
  {id:'manteiga',   nome:'Manteiga com sal',        cat:'lact', u:'g',  pack:250,  srcQty:250,
   src:{continente:2.19, pingodoce:2.19, auchan:2.09}},
  {id:'atum',       nome:'Atum ao natural (lata)',  cat:'merc', u:'g',  pack:120,  srcQty:480,
   src:{continente:3.42, pingodoce:4.23, auchan:5.16}},
  {id:'feijao',     nome:'Feijão seco',             cat:'merc', u:'g',  pack:500,  srcQty:500,
   src:{continente:0.94, pingodoce:1.50, auchan:0.96}},
  {id:'grao',       nome:'Grão-de-bico seco',       cat:'merc', u:'g',  pack:500,  srcQty:500,
   src:{continente:0.89, pingodoce:0.90, auchan:0.98}},

  /* estimativas (preço por embalagem) */
  {id:'alho',       nome:'Dente de alho',           cat:'hort', u:'un', pack:20,   est:0.99},
  {id:'limao',      nome:'Limão',                   cat:'hort', u:'un', pack:1,    est:0.30},
  {id:'salsa',      nome:'Salsa (molho)',           cat:'hort', u:'un', pack:1,    est:0.69},
  {id:'alface',     nome:'Alface',                  cat:'hort', u:'un', pack:1,    srcQty:2,
   src:{continente:2.58, pingodoce:2.38, auchan:2.48}},
  {id:'espinafres', nome:'Espinafres',              cat:'hort', u:'g',  pack:250,  est:1.39},
  {id:'brocolos',   nome:'Brócolos',                cat:'hort', u:'g',  pack:500,  est:1.49},
  {id:'couve',      nome:'Couve',                   cat:'hort', u:'g',  pack:1000,step:250, est:1.69},
  {id:'abobora',    nome:'Abóbora',                 cat:'hort', u:'g',  pack:1000,step:250, est:1.29},
  {id:'coxas',      nome:'Coxas e sobrecoxas de frango', cat:'talho', u:'g', pack:1000,step:250, est:3.29},
  {id:'febras',     nome:'Febras de porco',         cat:'talho',u:'g',  pack:500,step:100,  est:3.99},
  {id:'chourico',   nome:'Chouriço de carne',       cat:'charc',u:'g',  pack:200,  est:1.99},
  {id:'bacalhau',   nome:'Bacalhau salgado',        cat:'talho',u:'g',  pack:1000,step:100, est:15.90},
  {id:'natas',      nome:'Natas para culinária',    cat:'lact', u:'ml', pack:200,  est:0.85},
  {id:'queijo',     nome:'Queijo ralado',           cat:'lact', u:'g',  pack:200,  est:1.79},
  {id:'aveia',      nome:'Flocos de aveia',         cat:'merc', u:'g',  pack:500,  est:1.09},
  {id:'lentilhas',  nome:'Lentilhas secas',         cat:'merc', u:'g',  pack:500,  est:1.29},
  {id:'pelado',     nome:'Polpa de tomate',         cat:'merc', u:'g',  pack:400,  srcQty:800,
   src:{continente:1.51, pingodoce:1.58, auchan:1.51}},
  {id:'ervilhas',   nome:'Ervilhas congeladas',     cat:'cong', u:'g',  pack:450,  srcQty:750,
   src:{continente:1.11, pingodoce:1.12, auchan:1.12}},
  {id:'sal',        nome:'Sal fino',                cat:'temp', u:'g',  pack:1000, srcQty:1000, pantry:true,
   src:{continente:0.45, pingodoce:0.44, auchan:0.45}},
  {id:'pimentao',   nome:'Pimentão doce',           cat:'temp', u:'g',  pack:40,   est:1.19, pantry:true},
  {id:'louro',      nome:'Louro',                   cat:'temp', u:'g',  pack:10,   est:0.89, pantry:true},
  {id:'caldo',      nome:'Cubo de caldo',           cat:'temp', u:'un', pack:12,   est:1.09, pantry:true}
];

/* ing: [id do ingrediente, quantidade em unidade base, para "doses" doses] */
var RECIPES = [
  {id:'r-arroz-frango', nome:'Arroz de frango com legumes', cat:'carne', tempo:50, doses:4,
   ing:[['peitofrango',500],['arroz',300],['cebola',150],['alho',3],['tomate',200],['cenoura',150],['ervilhas',100],['azeite',30],['caldo',1],['sal',5]],
   passos:[
     'Corta o frango em cubos e tempera com sal. Pica a cebola, o alho e o tomate e rala a cenoura.',
     'Numa panela larga, refoga a cebola e o alho no azeite. Junta o frango e deixa dourar 5 minutos.',
     'Acrescenta o tomate e a cenoura, mexe e deixa cozinhar 5 minutos.',
     'Junta o arroz, as ervilhas e água quente com o cubo de caldo dissolvido (cerca de 2,5 vezes o volume do arroz).',
     'Cozinha em lume brando 15 a 18 minutos, até o arroz ficar malandrinho. Deixa repousar 5 minutos.'
   ]},
  {id:'r-bolonhesa', nome:'Esparguete à bolonhesa com cenoura', cat:'carne', tempo:45, doses:4,
   ing:[['esparguete',320],['carnepicada',300],['cenoura',150],['cebola',150],['alho',2],['pelado',400],['azeite',25],['queijo',30],['sal',3]],
   passos:[
     'Refoga a cebola e o alho picados no azeite. Junta a cenoura ralada e a carne picada e mexe até ficar solta.',
     'Acrescenta a polpa de tomate, sal e um pouco de água. Deixa apurar em lume brando 25 minutos.',
     'Coze o esparguete em água com sal, pelo tempo indicado na embalagem.',
     'Serve o esparguete com o molho e o queijo ralado por cima.'
   ]},
  {id:'r-bacalhau', nome:'Bacalhau com natas', cat:'peixe', tempo:70, doses:4,
   ing:[['bacalhau',320],['batata',800],['cebola',250],['natas',400],['leite',200],['manteiga',30],['azeite',30],['queijo',50]],
   passos:[
     'Demolha o bacalhau durante 24 a 48 horas, mudando a água algumas vezes. Escorre e desfaz em lascas, sem peles nem espinhas.',
     'Corta as batatas em palitos finos, tempera com um fio de azeite e assa a 220 °C durante 30 minutos.',
     'Refoga a cebola em fatias finas no azeite e na manteiga. Junta o bacalhau e mexe 3 minutos.',
     'Adiciona as natas e o leite e deixa engrossar 5 minutos. Mistura as batatas.',
     'Passa para um tabuleiro, polvilha com queijo ralado e gratina a 200 °C até dourar.'
   ]},
  {id:'r-omelete', nome:'Omelete de espinafres com batata cozida', cat:'veg', tempo:30, doses:4,
   ing:[['ovos',8],['espinafres',250],['batata',800],['cebola',100],['azeite',20],['sal',4]],
   passos:[
     'Coze as batatas aos pedaços em água com sal, cerca de 20 minutos.',
     'Refoga a cebola picada no azeite e junta os espinafres até murcharem.',
     'Bate os ovos com sal, mistura os espinafres e deita numa frigideira antiaderente.',
     'Cozinha em lume médio-baixo, vira quando firmar e serve com as batatas.'
   ]},
  {id:'r-sopa', nome:'Sopa de legumes com feijão e pão', cat:'sopa', tempo:50, doses:4,
   ing:[['batata',400],['cenoura',200],['abobora',300],['couve',200],['cebola',100],['alho',1],['feijao',150],['azeite',25],['pao',160],['sal',4]],
   passos:[
     'Deixa o feijão de molho de um dia para o outro. Escorre e coze em água nova 45 a 60 minutos.',
     'Corta a batata, a cenoura e a abóbora em cubos e a couve em tiras finas. Pica a cebola e o alho.',
     'Junta os legumes e o feijão a um litro e meio de água com sal e azeite. Coze 25 minutos.',
     'Tritura a gosto, ou deixa em pedaços, e serve com o pão.'
   ]},
  {id:'r-salada-feijao', nome:'Salada de feijão com atum e ovo', cat:'peixe', tempo:30, doses:4,
   ing:[['feijao',250],['atum',240],['ovos',4],['cebola',80],['salsa',1],['azeite',30],['limao',1],['sal',2]],
   passos:[
     'Deixa o feijão de molho de véspera e coze em água sem sal cerca de 60 minutos. Escorre e deixa arrefecer.',
     'Coze os ovos 10 minutos, arrefece e corta em quartos.',
     'Mistura o feijão com a cebola picada, a salsa, o atum escorrido, o azeite, o sumo de limão e sal.',
     'Serve com os ovos por cima.'
   ]},
  {id:'r-frango-forno', nome:'Frango no forno com batatas', cat:'carne', tempo:75, doses:4,
   ing:[['coxas',1000],['batata',1000],['cebola',200],['alho',3],['pimentao',5],['azeite',40],['limao',1],['sal',6]],
   passos:[
     'Tempera o frango com sal, alho picado, pimentão doce, sumo de limão e metade do azeite. Deixa marinar 30 minutos.',
     'Corta as batatas em gomos e a cebola em meias-luas. Dispõe num tabuleiro com o resto do azeite.',
     'Põe o frango por cima e assa a 200 °C durante 55 a 60 minutos, virando os gomos a meio.'
   ]},
  {id:'r-pescada', nome:'Pescada com batata e brócolos', cat:'peixe', tempo:35, doses:4,
   ing:[['pescada',600],['batata',800],['brocolos',500],['azeite',30],['alho',2],['limao',1],['sal',4]],
   passos:[
     'Cozinha as batatas em água com sal durante 20 minutos.',
     'Tempera a pescada com sal, limão e alho picado. Cozinha numa frigideira com um fio de azeite, 3 a 4 minutos de cada lado.',
     'Coze os brócolos a vapor ou em água a ferver 5 minutos.',
     'Serve tudo com o resto do azeite por cima.'
   ]},
  {id:'r-grao', nome:'Grão-de-bico com espinafres e ovo', cat:'veg', tempo:45, doses:4,
   ing:[['grao',300],['espinafres',250],['cebola',120],['alho',2],['ovos',4],['pimentao',3],['azeite',30],['sal',3]],
   passos:[
     'Deixa o grão de molho de um dia para o outro e coze cerca de 50 minutos em água nova, até ficar macio.',
     'Refoga a cebola e o alho no azeite com o pimentão doce. Junta o grão escorrido e os espinafres.',
     'Deixa cozinhar 5 minutos, abre quatro covas e parte um ovo em cada. Tapa e deixa cozer até a clara firmar.'
   ]},
  {id:'r-massa-atum', nome:'Massa com atum e tomate', cat:'peixe', tempo:25, doses:4,
   ing:[['esparguete',320],['atum',240],['pelado',400],['cebola',100],['alho',2],['azeite',20],['sal',3]],
   passos:[
     'Refoga a cebola e o alho no azeite. Junta a polpa de tomate e deixa apurar 15 minutos.',
     'Coze o esparguete em água com sal.',
     'Junta o atum escorrido ao molho, mistura a massa e serve de imediato.'
   ]},
  {id:'r-arroz-tomate', nome:'Arroz de tomate com ovo estrelado', cat:'veg', tempo:30, doses:4,
   ing:[['arroz',300],['pelado',400],['cebola',120],['alho',2],['ovos',8],['azeite',30],['caldo',1],['sal',3]],
   passos:[
     'Refoga a cebola e o alho picados no azeite. Junta a polpa de tomate e deixa cozinhar 8 minutos.',
     'Acrescenta o arroz, água quente com o cubo de caldo dissolvido (cerca de 2 vezes o volume do arroz) e sal.',
     'Cozinha 15 minutos em lume brando.',
     'Faz os ovos estrelados e serve por cima.'
   ]},
  {id:'r-febras', nome:'Febras de porco com arroz e salada', cat:'carne', tempo:35, doses:4,
   ing:[['febras',600],['arroz',280],['alface',1],['tomate',300],['alho',2],['azeite',30],['sal',4]],
   passos:[
     'Tempera as febras com sal e alho picado e deixa descansar 15 minutos.',
     'Coze o arroz em água com sal.',
     'Grelha as febras numa frigideira bem quente, 3 a 4 minutos de cada lado, com um fio de azeite.',
     'Faz uma salada com a alface, o tomate, sal e azeite e serve tudo junto.'
   ]},
  {id:'r-lentilhas', nome:'Lentilhas com chouriço', cat:'carne', tempo:45, doses:4,
   ing:[['lentilhas',300],['chourico',200],['cebola',150],['cenoura',150],['alho',2],['louro',1],['azeite',20],['sal',3]],
   passos:[
     'Refoga a cebola, o alho, a cenoura aos cubos e o louro no azeite.',
     'Junta o chouriço às rodelas e as lentilhas lavadas. Cobre com água.',
     'Cozinha em lume brando 30 a 35 minutos, até as lentilhas ficarem macias. Acerta o sal.'
   ]},
  {id:'r-papas', nome:'Papas de aveia com banana', cat:'peq', tempo:10, doses:4,
   ing:[['aveia',160],['leite',800],['banana',400]],
   passos:[
     'Aquece o leite numa panela. Junta a aveia e mexe em lume brando 5 minutos, até engrossar.',
     'Serve com a banana às rodelas.'
   ]},
  {id:'r-torradas', nome:'Torradas com ovo mexido', cat:'peq', tempo:10, doses:4,
   ing:[['pao',200],['ovos',6],['manteiga',20],['sal',1]],
   passos:[
     'Bate os ovos com sal. Cozinha em lume brando com metade da manteiga, mexendo, até ficarem cremosos.',
     'Torra o pão, barra com o resto da manteiga e serve com os ovos.'
   ]},
  {id:'r-pao-maca', nome:'Pão com manteiga e maçã', cat:'peq', tempo:5, doses:4,
   ing:[['pao',200],['manteiga',40],['maca',500]],
   passos:[
     'Barra o pão com a manteiga e serve com a maçã às fatias.'
   ]}
];
/* data_more.js — mais ingredientes e receitas. Carrega depois de data.js.
   Preços "src": recolhidos em ativos.pt (17 out 2026), para Continente, Pingo Doce e Auchan.
   Preços "est": estimativas da app por embalagem, editáveis na app. */

ING = ING.concat([
  /* preços recolhidos */
  {id:'farinha',  nome:'Farinha de trigo',      cat:'merc', u:'g',  pack:1000, srcQty:1000, pantry:true, src:{continente:0.59, pingodoce:0.59, auchan:0.85}},
  {id:'acucar',   nome:'Açúcar branco',         cat:'merc', u:'g',  pack:1000, srcQty:1000, pantry:true, src:{continente:0.84, pingodoce:0.89, auchan:1.09}},
  {id:'oleo',     nome:'Óleo alimentar',        cat:'temp', u:'ml', pack:1000, srcQty:1000, pantry:true, src:{continente:1.95, pingodoce:1.55, auchan:1.55}},
  {id:'iogurte',  nome:'Iogurte natural',       cat:'lact', u:'g',  pack:500,  srcQty:1000, src:{continente:1.39, pingodoce:1.39, auchan:1.39}},
  {id:'flamengo', nome:'Queijo flamengo fatiado', cat:'lact', u:'g', pack:200, srcQty:400,  src:{continente:2.76, pingodoce:2.85, auchan:2.85}},
  {id:'fiambre',  nome:'Fiambre da perna',      cat:'charc',u:'g',  pack:200,  srcQty:200,  src:{continente:1.79, pingodoce:1.59, auchan:3.63}},
  {id:'lombo',    nome:'Lombo de porco',        cat:'talho',u:'g',  pack:1000, step:250, srcQty:1000, src:{continente:5.29, pingodoce:5.29, auchan:5.29}},
  {id:'laranja',  nome:'Laranja',               cat:'hort', u:'g',  pack:1000, step:250, srcQty:1000, src:{continente:1.33, pingodoce:1.66, auchan:1.66}},
  {id:'carcaca',  nome:'Carcaça',               cat:'pao',  u:'un', pack:6,    srcQty:6,    src:{continente:1.20, pingodoce:0.99, auchan:0.99}},
  {id:'cereais',  nome:'Flocos de cereais',     cat:'merc', u:'g',  pack:500,  srcQty:500,  src:{continente:0.80, pingodoce:1.20, auchan:0.72}},

  /* estimativas */
  {id:'bacon',    nome:'Bacon fatiado',         cat:'charc',u:'g',  pack:150,  est:1.99},
  {id:'salsichas',nome:'Salsichas frescas',     cat:'talho',u:'g',  pack:500,  step:250, est:3.49},
  {id:'bife',     nome:'Bife de vaca',          cat:'talho',u:'g',  pack:1000, step:100, est:17.90},
  {id:'lombovaca',nome:'Lombo de vaca',         cat:'talho',u:'g',  pack:1000, step:100, est:26.90},
  {id:'vaca',     nome:'Carne de vaca para guisar', cat:'talho', u:'g', pack:1000, step:250, est:11.90},
  {id:'borrego',  nome:'Borrego',               cat:'talho',u:'g',  pack:1000, step:250, est:13.90},
  {id:'figado',   nome:'Fígado de porco',       cat:'talho',u:'g',  pack:500,  step:250, est:3.49},
  {id:'salmao',   nome:'Salmão (postas)',       cat:'talho',u:'g',  pack:1000, step:100, est:15.90},
  {id:'dourada',  nome:'Dourada',               cat:'talho',u:'g',  pack:1000, step:200, est:10.90},
  {id:'polvo',    nome:'Polvo',                 cat:'talho',u:'g',  pack:1000, step:250, est:16.90},
  {id:'camarao',  nome:'Camarão',               cat:'talho',u:'g',  pack:500,  step:100, est:8.99},
  {id:'lulas',    nome:'Lulas',                 cat:'talho',u:'g',  pack:1000, step:250, est:11.90},
  {id:'mexilhao', nome:'Mexilhão',              cat:'talho',u:'g',  pack:1000, step:500, est:3.90},
  {id:'ameijoas', nome:'Amêijoas',              cat:'talho',u:'g',  pack:500,  step:250, est:6.99},
  {id:'carapau',  nome:'Carapau',               cat:'talho',u:'g',  pack:1000, step:250, est:4.90},
  {id:'sardinha', nome:'Sardinha fresca',       cat:'talho',u:'g',  pack:1000, step:250, est:6.50},
  {id:'cogumelos',nome:'Cogumelos',             cat:'hort', u:'g',  pack:250,  est:1.59},
  {id:'courgete', nome:'Curgete',               cat:'hort', u:'g',  pack:1000, step:250, est:1.79},
  {id:'beringela',nome:'Beringela',             cat:'hort', u:'g',  pack:1000, step:250, est:2.19},
  {id:'pimento',  nome:'Pimento',               cat:'hort', u:'g',  pack:1000, step:250, est:2.89},
  {id:'pepino',   nome:'Pepino',                cat:'hort', u:'un', pack:1,    est:0.69},
  {id:'feijaoverde',nome:'Feijão-verde',        cat:'hort', u:'g',  pack:500,  step:250, est:1.69},
  {id:'abacate',  nome:'Abacate',               cat:'hort', u:'un', pack:1,    est:1.29},
  {id:'coentros', nome:'Coentros (molho)',      cat:'hort', u:'un', pack:1,    est:0.69},
  {id:'milho',    nome:'Milho doce (lata)',     cat:'merc', u:'g',  pack:300,  est:0.89},
  {id:'azeitonas',nome:'Azeitonas',             cat:'merc', u:'g',  pack:200,  est:1.19},
  {id:'batatapalha',nome:'Batata palha',        cat:'merc', u:'g',  pack:190,  est:1.69},
  {id:'massa',    nome:'Massa (fusilli, penne)',cat:'merc', u:'g',  pack:500,  est:0.55},
  {id:'lasanha',  nome:'Massa de lasanha',      cat:'merc', u:'g',  pack:500,  est:1.29},
  {id:'leitecoco',nome:'Leite de coco',         cat:'merc', u:'ml', pack:400,  est:1.49},
  {id:'panoralado',nome:'Pão ralado',           cat:'merc', u:'g',  pack:500,  est:0.99, pantry:true},
  {id:'massafolhada',nome:'Massa folhada',      cat:'lact', u:'un', pack:1,    est:1.79},
  {id:'mozzarella',nome:'Mozzarella',           cat:'lact', u:'g',  pack:250,  est:1.99},
  {id:'tortilhas',nome:'Tortilhas de trigo',    cat:'pao',  u:'un', pack:8,    est:1.79},
  {id:'paohamb',  nome:'Pão de hambúrguer',     cat:'pao',  u:'un', pack:4,    est:1.49},
  {id:'basepizza',nome:'Base de pizza',         cat:'pao',  u:'un', pack:2,    est:1.99},
  {id:'vinhobranco',nome:'Vinho branco',        cat:'temp', u:'ml', pack:750,  est:2.49},
  {id:'vinagre',  nome:'Vinagre',               cat:'temp', u:'ml', pack:500,  est:0.79, pantry:true},
  {id:'cerveja',  nome:'Cerveja',               cat:'merc', u:'ml', pack:330,  est:0.79},
  {id:'caril',    nome:'Caril em pó',           cat:'temp', u:'g',  pack:40,   est:1.29, pantry:true}
]);

RECIPES = RECIPES.concat([

  /* ---------- sopas ---------- */
  {id:'r-caldo-verde', nome:'Caldo verde', cat:'sopa', tempo:40, doses:4,
   ing:[['batata',600],['couve',200],['cebola',100],['alho',2],['chourico',100],['azeite',30],['sal',5]],
   passos:['Coze a batata, a cebola e o alho em 1,2 litros de água com sal, cerca de 20 minutos.','Tritura tudo até ficar um creme.','Corta a couve em tiras muito finas e junta ao caldo. Deixa ferver 5 minutos.','Serve com rodelas de chouriço e um fio de azeite.']},
  {id:'r-creme-cenoura', nome:'Creme de cenoura', cat:'sopa', tempo:35, doses:4,
   ing:[['cenoura',500],['batata',200],['cebola',100],['alho',1],['azeite',25],['sal',4]],
   passos:['Refoga a cebola e o alho no azeite.','Junta a cenoura e a batata em cubos, cobre com 1 litro de água e sal.','Coze 25 minutos e tritura até ficar liso.']},
  {id:'r-creme-abobora', nome:'Creme de abóbora', cat:'sopa', tempo:35, doses:4,
   ing:[['abobora',700],['batata',200],['cebola',100],['alho',1],['azeite',25],['sal',4]],
   passos:['Refoga a cebola e o alho no azeite.','Junta a abóbora e a batata em cubos, água até cobrir e sal.','Coze 25 minutos e tritura. Acerta a textura com um pouco de água.']},
  {id:'r-canja', nome:'Canja de galinha', cat:'sopa', tempo:50, doses:4,
   ing:[['coxas',500],['arroz',100],['cenoura',100],['cebola',80],['limao',1],['sal',5]],
   passos:['Coze o frango com a cebola e a cenoura em 1,5 litros de água com sal, durante 30 minutos.','Tira o frango, desfia a carne e reserva.','Junta o arroz ao caldo e coze 15 minutos.','Devolve o frango à panela e serve com sumo de limão.']},
  {id:'r-sopa-grao', nome:'Sopa de grão com espinafres', cat:'sopa', tempo:50, doses:4,
   ing:[['grao',200],['espinafres',200],['batata',200],['cebola',100],['alho',2],['azeite',25],['sal',4]],
   passos:['Deixa o grão de molho de véspera e coze em água nova 45 minutos.','Refoga a cebola e o alho no azeite, junta a batata aos cubos, o grão e 1 litro de água.','Coze 15 minutos, junta os espinafres e deixa mais 3 minutos.']},
  {id:'r-gaspacho', nome:'Gaspacho', cat:'sopa', tempo:15, doses:4,
   ing:[['tomate',800],['pepino',1],['pimento',150],['pao',60],['alho',1],['azeite',40],['vinagre',20],['sal',4]],
   passos:['Tritura o tomate, o pepino, o pimento, o alho e o pão molhado.','Junta o azeite, o vinagre e sal, e mistura bem.','Serve bem frio.']},
  {id:'r-sopa-lentilhas', nome:'Sopa de lentilhas com cenoura', cat:'sopa', tempo:45, doses:4,
   ing:[['lentilhas',200],['cenoura',200],['cebola',100],['alho',2],['batata',150],['azeite',20],['louro',1],['sal',4]],
   passos:['Refoga a cebola e o alho no azeite com o louro.','Junta a cenoura e a batata em cubos, as lentilhas lavadas e 1,2 litros de água.','Coze 30 minutos e acerta o sal.']},
  {id:'r-sopa-tomate', nome:'Sopa de tomate com ovo escalfado', cat:'sopa', tempo:30, doses:4,
   ing:[['pelado',400],['cebola',100],['alho',2],['pao',100],['ovos',4],['coentros',1],['azeite',25],['sal',3]],
   passos:['Refoga a cebola e o alho no azeite. Junta a polpa de tomate e 800 ml de água e coze 15 minutos.','Junta o pão aos pedaços e mexe até se desfazer.','Escalfa os ovos na sopa a ferver, 3 minutos, e serve com coentros.']},

  /* ---------- carne ---------- */
  {id:'r-feijoada', nome:'Feijoada à portuguesa', cat:'carne', tempo:90, doses:4,
   ing:[['feijao',300],['chourico',150],['febras',300],['cenoura',150],['cebola',150],['couve',200],['pelado',200],['alho',2],['louro',1],['azeite',20],['sal',4]],
   passos:['Deixa o feijão de molho de véspera e coze em água nova 45 minutos.','Refoga a cebola e o alho no azeite. Junta as febras aos cubos, o chouriço e o louro.','Acrescenta a polpa de tomate, a cenoura aos cubos, o feijão e água até cobrir.','Coze 30 minutos, junta a couve em tiras e deixa mais 10 minutos.']},
  {id:'r-carbonara', nome:'Esparguete à carbonara', cat:'carne', tempo:25, doses:4,
   ing:[['esparguete',320],['bacon',150],['ovos',5],['queijo',50],['alho',1],['sal',2]],
   passos:['Coze o esparguete em água com sal.','Frita o bacon aos pedaços com o alho, sem azeite, até ficar tostado.','Bate os ovos com o queijo ralado.','Mistura a massa escorrida com o bacon, fora do lume, e junta os ovos mexendo depressa para ficar cremoso.']},
  {id:'r-massa-salsichas', nome:'Massa com salsichas, tomate e feijão', cat:'carne', tempo:35, doses:4,
   ing:[['massa',320],['salsichas',350],['pelado',400],['cebola',100],['alho',2],['queijo',30],['feijao',150],['azeite',20],['sal',3]],
   passos:['Deixa o feijão de molho de véspera e coze 45 a 60 minutos (ou usa feijão cozido).','Tira a pele às salsichas e desfaz a carne.','Refoga a cebola e o alho no azeite e junta as salsichas até dourarem.','Acrescenta a polpa de tomate e o feijão e cozinha 15 minutos.','Mistura a massa cozida e serve com queijo ralado.']},
  {id:'r-hamburguer', nome:'Hambúrguer caseiro com batatas assadas', cat:'carne', tempo:50, doses:4,
   ing:[['carnepicada',400],['paohamb',4],['ovos',1],['cebola',60],['flamengo',40],['batata',800],['alface',1],['tomate',200],['azeite',30],['sal',5]],
   passos:['Corta a batata em gomos, tempera com azeite e sal e assa a 220 °C durante 35 minutos.','Mistura a carne com o ovo, a cebola picada e sal. Molda quatro hambúrgueres.','Grelha 4 a 5 minutos de cada lado e põe o queijo no fim.','Monta nos pães com alface e tomate.']},
  {id:'r-frango-estufado', nome:'Coxas de frango estufadas com batata', cat:'carne', tempo:60, doses:4,
   ing:[['coxas',1000],['batata',600],['cebola',150],['alho',3],['pelado',200],['pimentao',4],['louro',1],['azeite',25],['sal',5]],
   passos:['Tempera o frango com sal, alho picado e pimentão doce.','Dá cor ao frango no azeite e retira. Na mesma panela refoga a cebola.','Junta a polpa de tomate, o louro, o frango e um copo de água. Tapa e cozinha 20 minutos.','Acrescenta a batata aos cubos e cozinha mais 25 minutos.']},
  {id:'r-bifanas', nome:'Bifanas no pão com salada', cat:'carne', tempo:40, doses:4,
   ing:[['lombo',500],['carcaca',4],['alho',4],['pimentao',3],['vinhobranco',100],['louro',1],['alface',1],['tomate',200],['azeite',20],['sal',4]],
   passos:['Corta o lombo em fatias finas e deixa a marinar com alho, pimentão, vinho, louro e sal durante 30 minutos.','Aquece o azeite e cozinha as fatias 3 a 4 minutos de cada lado com um pouco da marinada.','Serve nas carcaças com salada de alface e tomate.']},
  {id:'r-strogonoff', nome:'Strogonoff de frango com arroz', cat:'carne', tempo:40, doses:4,
   ing:[['peitofrango',500],['cogumelos',250],['cebola',100],['natas',200],['pelado',100],['pimentao',3],['arroz',280],['azeite',20],['sal',4]],
   passos:['Corta o frango em tiras e tempera com sal e pimentão doce.','Dourar o frango no azeite. Junta a cebola e os cogumelos às fatias.','Acrescenta a polpa de tomate e as natas e cozinha 8 minutos.','Serve com arroz branco.']},
  {id:'r-almondegas', nome:'Almôndegas com arroz de tomate', cat:'carne', tempo:50, doses:4,
   ing:[['carnepicada',400],['ovos',1],['pao',60],['cebola',100],['alho',2],['pelado',400],['arroz',280],['salsa',1],['azeite',30],['sal',5]],
   passos:['Mistura a carne com o ovo, o pão molhado e esmagado, metade da cebola, alho picado, salsa e sal. Molda bolinhas.','Refoga o resto da cebola no azeite e junta a polpa de tomate.','Põe as almôndegas no molho e cozinha 15 minutos.','Junta o arroz e água quente (2 vezes o volume do arroz) e cozinha mais 15 minutos.']},
  {id:'r-caril-frango', nome:'Caril de frango com arroz', cat:'carne', tempo:40, doses:4,
   ing:[['peitofrango',500],['cebola',120],['alho',2],['caril',8],['leitecoco',400],['arroz',280],['azeite',20],['sal',4]],
   passos:['Refoga a cebola e o alho no azeite. Junta o caril e mexe 1 minuto.','Acrescenta o frango aos cubos e dá-lhe cor.','Junta o leite de coco e cozinha em lume brando 15 minutos.','Serve com arroz branco.']},
  {id:'r-chili', nome:'Chili com carne e arroz', cat:'carne', tempo:50, doses:4,
   ing:[['carnepicada',300],['feijao',200],['milho',150],['pelado',400],['cebola',120],['alho',2],['pimento',150],['arroz',250],['azeite',20],['pimentao',3],['sal',4]],
   passos:['Deixa o feijão de molho de véspera e coze 45 minutos.','Refoga a cebola, o alho e o pimento. Junta a carne e mexe até ficar solta.','Acrescenta a polpa de tomate, o pimentão doce, o feijão e o milho. Cozinha 20 minutos.','Serve com arroz branco.']},
  {id:'r-wraps-frango', nome:'Wraps de frango com iogurte', cat:'carne', tempo:25, doses:4,
   ing:[['tortilhas',8],['peitofrango',400],['alface',1],['tomate',200],['iogurte',125],['flamengo',80],['pimentao',2],['azeite',15],['sal',3]],
   passos:['Corta o frango em tiras, tempera com sal e pimentão e salteia no azeite 6 a 7 minutos.','Aquece as tortilhas.','Recheia com frango, alface, tomate, queijo e iogurte e enrola.']},
  {id:'r-lasanha', nome:'Lasanha de carne', cat:'carne', tempo:80, doses:4,
   ing:[['lasanha',250],['carnepicada',400],['pelado',400],['cebola',120],['alho',2],['leite',500],['manteiga',40],['farinha',40],['queijo',80],['azeite',20],['sal',5]],
   passos:['Faz o molho de carne: refoga a cebola e o alho, junta a carne e depois a polpa de tomate. Cozinha 20 minutos.','Faz o molho branco: derrete a manteiga, mexe a farinha, junta o leite aos poucos e deixa engrossar.','Num tabuleiro, alterna molho de carne, folhas de lasanha e molho branco.','Cobre com queijo ralado e leva ao forno a 190 °C durante 30 minutos.']},
  {id:'r-panados', nome:'Panados de frango com arroz de cenoura', cat:'carne', tempo:45, doses:4,
   ing:[['peitofrango',500],['ovos',2],['panoralado',100],['farinha',40],['oleo',150],['arroz',280],['cenoura',150],['cebola',80],['alface',1],['limao',1],['azeite',20],['sal',5]],
   passos:['Corta o peito de frango em bifes finos e tempera com sal.','Passa por farinha, ovo batido e pão ralado.','Frita em óleo quente até dourar, 3 minutos de cada lado, e escorre em papel.','Faz o arroz refogando a cebola e a cenoura ralada no azeite, juntando o arroz e água quente.','Serve com salada de alface e limão.']},
  {id:'r-vaca-guisada', nome:'Carne de vaca guisada com batata', cat:'carne', tempo:110, doses:4,
   ing:[['vaca',600],['batata',700],['cenoura',150],['cebola',200],['alho',3],['pelado',200],['vinhobranco',100],['louro',1],['azeite',30],['sal',5]],
   passos:['Tempera a carne aos cubos com sal e alho.','Refoga a cebola no azeite, junta a carne e deixa dourar.','Acrescenta a polpa de tomate, o vinho, o louro e água até cobrir. Tapa e cozinha 60 minutos.','Junta a cenoura e a batata e cozinha mais 30 minutos.']},
  {id:'r-iscas', nome:'Iscas de fígado com batata cozida', cat:'carne', tempo:45, doses:4,
   ing:[['figado',500],['batata',800],['alho',4],['vinhobranco',100],['vinagre',20],['louro',1],['salsa',1],['azeite',30],['sal',4]],
   passos:['Corta o fígado em tiras finas e deixa marinar 1 hora com alho, vinho, vinagre, louro e sal.','Coze as batatas em água com sal.','Frita o fígado em lume forte no azeite 3 a 4 minutos, com um pouco da marinada.','Serve com as batatas e salsa picada.']},
  {id:'r-lombo-assado', nome:'Lombo de porco assado com batatas', cat:'carne', tempo:90, doses:4,
   ing:[['lombo',800],['batata',900],['cebola',200],['alho',4],['pimentao',6],['vinhobranco',150],['louro',1],['azeite',40],['sal',6]],
   passos:['Tempera o lombo com sal, alho picado e pimentão doce, e deixa marinar com o vinho 1 hora.','Põe num tabuleiro com a cebola em meias-luas, o louro, o azeite e as batatas aos gomos.','Assa a 200 °C durante 60 a 70 minutos, regando a meio.']},
  {id:'r-francesinha', nome:'Francesinha caseira', cat:'carne', tempo:60, doses:4,
   ing:[['pao',280],['febras',300],['salsichas',200],['fiambre',100],['flamengo',160],['ovos',4],['cerveja',330],['pelado',200],['natas',100],['batata',800],['oleo',200],['sal',4]],
   passos:['Grelha as febras e as salsichas. Frita as batatas em óleo quente.','Faz o molho: leva a cerveja e a polpa de tomate a ferver 10 minutos e junta as natas.','Monta sobre pão: febra, salsicha, fiambre, outra fatia de pão e queijo por cima.','Gratina no forno até derreter o queijo, cobre com o molho e termina com um ovo estrelado.']},
  {id:'r-cozido', nome:'Cozido à portuguesa (simples)', cat:'carne', tempo:120, doses:4,
   ing:[['vaca',500],['coxas',500],['chourico',200],['batata',800],['cenoura',300],['couve',400],['grao',200],['arroz',200],['sal',6]],
   passos:['Deixa o grão de molho de véspera.','Coze a vaca em água com sal durante 1 hora. Junta o frango, o chouriço e o grão.','Passados 30 minutos, acrescenta a cenoura e a batata. Nos últimos 15 minutos junta a couve.','Coze o arroz no caldo e serve tudo em travessas.']},
  {id:'r-bife-ovo', nome:'Bife com ovo a cavalo', cat:'carne', tempo:35, doses:4,
   ing:[['bife',500],['ovos',4],['batata',800],['oleo',250],['alho',2],['manteiga',20],['alface',1],['sal',5]],
   passos:['Corta a batata em palitos e frita em óleo quente até ficar dourada.','Tempera os bifes com sal e alho e grelha 2 a 3 minutos de cada lado com a manteiga.','Frita os ovos e põe um sobre cada bife.','Serve com as batatas e alface.']},
  {id:'r-lombo-vaca', nome:'Lombo de vaca grelhado com legumes', cat:'carne', tempo:40, doses:4,
   ing:[['lombovaca',600],['batata',700],['courgete',300],['cogumelos',250],['manteiga',30],['alho',2],['azeite',30],['sal',5]],
   passos:['Tira a carne do frigorífico 30 minutos antes e tempera com sal.','Assa as batatas aos gomos com azeite a 220 °C durante 30 minutos.','Grelha o lombo em lume forte 3 minutos de cada lado com manteiga e alho. Deixa repousar 5 minutos.','Salteia a curgete e os cogumelos e serve tudo junto.']},
  {id:'r-borrego', nome:'Borrego assado com batatas', cat:'carne', tempo:120, doses:4,
   ing:[['borrego',1200],['batata',1000],['cebola',200],['alho',4],['vinhobranco',150],['azeite',50],['louro',1],['pimentao',5],['sal',6]],
   passos:['Tempera o borrego com sal, alho, pimentão e vinho e deixa marinar de um dia para o outro.','Põe num tabuleiro com a cebola, o louro e o azeite.','Assa a 180 °C durante 1 hora e 15 minutos.','Junta as batatas aos gomos e assa mais 40 minutos.']},
  {id:'r-arroz-chourico', nome:'Arroz de chouriço com ovo estrelado', cat:'carne', tempo:40, doses:4,
   ing:[['arroz',300],['chourico',200],['cebola',120],['alho',2],['ovos',4],['louro',1],['azeite',20],['sal',3]],
   passos:['Refoga a cebola, o alho e o louro no azeite. Junta o chouriço às rodelas.','Acrescenta o arroz e água quente (2 vezes o volume do arroz) com sal.','Cozinha 15 minutos em lume brando e leva ao forno 5 minutos para tostar.','Serve com um ovo estrelado por pessoa.']},
  {id:'r-pizza-fiambre', nome:'Pizza caseira de frango, fiambre e cogumelos', cat:'carne', tempo:30, doses:4,
   ing:[['basepizza',2],['pelado',200],['mozzarella',250],['fiambre',100],['cogumelos',150],['peitofrango',250],['azeite',15],['sal',2]],
   passos:['Corta o frango em tiras e salteia com sal e um fio de azeite até ficar cozinhado.','Tempera a polpa de tomate com sal e um fio de azeite e espalha sobre as bases.','Cobre com mozzarella, frango, fiambre aos pedaços e cogumelos às fatias.','Leva ao forno a 220 °C durante 12 a 15 minutos.']},
  {id:'r-tosta-salada', nome:'Tostas mistas com ovo e salada', cat:'carne', tempo:15, doses:4,
   ing:[['pao',200],['fiambre',100],['flamengo',120],['manteiga',30],['alface',1],['tomate',200],['ovos',6]],
   passos:['Barra o pão com manteiga e recheia com fiambre e queijo.','Grelha as tostas numa frigideira ou sanduicheira até o queijo derreter.','Estrela os ovos na mesma frigideira e põe um por cima de cada tosta.','Serve com salada de alface e tomate.']},
  {id:'r-frango-ervilhas', nome:'Frango guisado com ervilhas', cat:'carne', tempo:65, doses:4,
   ing:[['coxas',800],['ervilhas',300],['cenoura',150],['batata',500],['cebola',120],['pelado',200],['louro',1],['azeite',25],['sal',4]],
   passos:['Refoga a cebola no azeite e junta o frango temperado com sal até dourar.','Acrescenta a polpa de tomate, o louro, a cenoura aos cubos e água até quase cobrir. Cozinha 25 minutos.','Junta a batata aos cubos e as ervilhas e cozinha mais 20 minutos.']},
  {id:'r-moussaka', nome:'Moussaka de beringela', cat:'carne', tempo:80, doses:4,
   ing:[['beringela',600],['carnepicada',300],['batata',400],['pelado',400],['cebola',120],['alho',2],['leite',400],['manteiga',30],['farinha',30],['queijo',60],['azeite',40],['sal',4]],
   passos:['Corta a beringela e a batata em rodelas e assa com azeite a 200 °C durante 20 minutos.','Refoga a cebola e o alho, junta a carne e a polpa de tomate e cozinha 15 minutos.','Faz molho branco com a manteiga, a farinha e o leite.','Monta em camadas, cobre com o molho branco e o queijo e gratina 25 minutos a 190 °C.']},
  {id:'r-porco-alentejana', nome:'Porco à alentejana', cat:'carne', tempo:60, doses:4,
   ing:[['lombo',600],['ameijoas',500],['batata',800],['cebola',150],['alho',4],['pimentao',5],['vinhobranco',100],['oleo',200],['coentros',1],['louro',1],['sal',5]],
   passos:['Marina o lombo aos cubos com alho, pimentão, vinho, louro e sal durante 1 hora.','Frita as batatas aos cubos em óleo quente e reserva.','Salteia a carne com a cebola até dourar.','Junta as amêijoas bem lavadas, tapa até abrirem e mistura as batatas e os coentros.']},

  /* ---------- peixe e marisco ---------- */
  {id:'r-bacalhau-bras', nome:'Bacalhau à Brás', cat:'peixe', tempo:40, doses:4,
   ing:[['bacalhau',320],['batatapalha',190],['ovos',6],['cebola',250],['alho',2],['azeitonas',40],['salsa',1],['azeite',40]],
   passos:['Demolha o bacalhau 24 a 48 horas e desfaz em lascas.','Refoga a cebola em tiras finas e o alho no azeite. Junta o bacalhau e mexe 5 minutos.','Acrescenta a batata palha e, fora do lume, os ovos batidos, mexendo até ficarem cremosos.','Serve com azeitonas e salsa.']},
  {id:'r-bacalhau-gomes', nome:'Bacalhau à Gomes de Sá', cat:'peixe', tempo:70, doses:4,
   ing:[['bacalhau',320],['batata',800],['cebola',300],['ovos',3],['azeitonas',60],['alho',2],['salsa',1],['azeite',60]],
   passos:['Demolha o bacalhau, coze e desfaz em lascas. Coze as batatas em rodelas.','Refoga a cebola e o alho no azeite até ficarem macios.','Monta num tabuleiro: batata, cebola, bacalhau e mais cebola.','Leva ao forno a 200 °C durante 20 minutos e serve com ovo cozido, azeitonas e salsa.']},
  {id:'r-bacalhau-lagareiro', nome:'Bacalhau à lagareiro', cat:'peixe', tempo:75, doses:4,
   ing:[['bacalhau',480],['batata',1000],['alho',6],['azeite',120],['cebola',100],['salsa',1]],
   passos:['Demolha as postas de bacalhau e coze as batatas pequenas com casca.','Põe o bacalhau num tabuleiro com cebola, alho laminado e metade do azeite.','Assa a 220 °C durante 20 minutos.','Junta as batatas esmurradas e o resto do azeite e assa mais 15 minutos. Serve com salsa.']},
  {id:'r-bacalhau-grao', nome:'Salada de bacalhau com grão', cat:'peixe', tempo:30, doses:4,
   ing:[['bacalhau',240],['grao',250],['ovos',4],['cebola',100],['coentros',1],['alho',1],['azeite',40],['vinagre',10],['sal',1]],
   passos:['Deixa o grão de molho de véspera e coze 50 minutos.','Demolha o bacalhau, coze 5 minutos e desfaz em lascas. Coze os ovos 10 minutos.','Mistura o grão, o bacalhau, a cebola em rodelas, o alho picado, os coentros, o azeite e o vinagre.','Serve com os ovos cortados.']},
  {id:'r-pataniscas', nome:'Pataniscas de bacalhau com arroz de feijão', cat:'peixe', tempo:60, doses:4,
   ing:[['bacalhau',200],['farinha',120],['ovos',2],['cebola',100],['salsa',1],['oleo',250],['arroz',250],['feijao',150],['pelado',100],['alho',2],['azeite',20],['sal',3]],
   passos:['Demolha o bacalhau e desfaz em lascas. Mistura com a farinha, os ovos, a cebola e a salsa picadas e um pouco de água fria até ficar uma massa mole.','Frita colheradas em óleo quente até dourarem.','Faz o arroz de feijão: refoga alho no azeite, junta a polpa de tomate, o feijão cozido, o arroz e água quente. Cozinha 15 minutos.']},
  {id:'r-sardinhas', nome:'Sardinhas assadas com batata e pimentos', cat:'peixe', tempo:45, doses:4,
   ing:[['sardinha',1000],['batata',800],['pimento',300],['cebola',100],['limao',1],['azeite',30],['sal',6]],
   passos:['Coze as batatas com casca em água com sal.','Assa os pimentos a 220 °C durante 25 minutos, tira a pele e corta em tiras com cebola, sal e azeite.','Tempera as sardinhas com sal e grelha ou assa 4 a 5 minutos de cada lado.','Serve com limão.']},
  {id:'r-carapau-frito', nome:'Carapau frito com arroz de tomate', cat:'peixe', tempo:45, doses:4,
   ing:[['carapau',800],['farinha',50],['oleo',250],['arroz',280],['pelado',300],['cebola',100],['alho',2],['limao',1],['azeite',20],['sal',5]],
   passos:['Tempera o carapau com sal e limão e passa por farinha.','Faz o arroz: refoga a cebola e o alho, junta a polpa de tomate, o arroz e água quente. Cozinha 15 minutos.','Frita o peixe em óleo quente, 3 minutos de cada lado, e serve com o arroz.']},
  {id:'r-polvo-lagareiro', nome:'Polvo à lagareiro', cat:'peixe', tempo:100, doses:4,
   ing:[['polvo',1200],['batata',1000],['alho',6],['azeite',120],['cebola',100],['coentros',1],['sal',4]],
   passos:['Coze o polvo, sem água, tapado com a cebola, cerca de 50 minutos. Deixa arrefecer no próprio caldo.','Coze as batatas pequenas com casca e esmurra-as.','Leva polvo e batatas ao forno com o alho laminado e o azeite, a 220 °C durante 20 minutos.','Serve com coentros.']},
  {id:'r-arroz-polvo', nome:'Arroz de polvo', cat:'peixe', tempo:75, doses:4,
   ing:[['polvo',600],['arroz',300],['cebola',150],['alho',3],['pelado',300],['vinhobranco',100],['coentros',1],['louro',1],['azeite',40],['sal',4]],
   passos:['Coze o polvo 45 minutos, corta em pedaços e guarda a água da cozedura.','Refoga a cebola e o alho no azeite com o louro. Junta a polpa de tomate e o vinho.','Acrescenta o polvo, o arroz e a água da cozedura quente (2 vezes o volume do arroz).','Cozinha 15 minutos e serve com coentros.']},
  {id:'r-arroz-marisco', nome:'Arroz de marisco', cat:'peixe', tempo:60, doses:4,
   ing:[['camarao',300],['mexilhao',500],['ameijoas',300],['arroz',300],['pelado',400],['cebola',150],['alho',3],['vinhobranco',100],['coentros',1],['azeite',40],['sal',4]],
   passos:['Abre o mexilhão e as amêijoas numa panela com vinho e retira. Guarda o caldo.','Refoga a cebola e o alho no azeite, junta a polpa de tomate e o camarão.','Acrescenta o arroz e o caldo quente (2 vezes o volume do arroz). Cozinha 15 minutos.','Junta o mexilhão e as amêijoas e serve com coentros.']},
  {id:'r-camarao-alho', nome:'Camarão com alho e arroz branco', cat:'peixe', tempo:25, doses:4,
   ing:[['camarao',500],['alho',6],['azeite',60],['limao',1],['coentros',1],['arroz',300],['manteiga',20],['sal',4]],
   passos:['Coze o arroz em água com sal e uma noz de manteiga.','Aquece o azeite com o alho laminado, junta o camarão e salteia 3 minutos.','Termina com sumo de limão e coentros e serve com o arroz.']},
  {id:'r-salmao', nome:'Salmão grelhado com batata e brócolos', cat:'peixe', tempo:35, doses:4,
   ing:[['salmao',600],['batata',800],['brocolos',500],['limao',1],['azeite',30],['alho',2],['sal',4]],
   passos:['Coze as batatas em água com sal.','Tempera o salmão com sal e limão e grelha 4 a 5 minutos de cada lado.','Coze os brócolos 5 minutos e salteia com alho no azeite.','Serve tudo junto.']},
  {id:'r-dourada', nome:'Dourada no forno com batata e legumes', cat:'peixe', tempo:60, doses:4,
   ing:[['dourada',1200],['batata',800],['courgete',300],['limao',1],['azeite',40],['alho',2],['sal',5]],
   passos:['Limpa as douradas e tempera com sal, limão e alho.','Põe num tabuleiro com a batata em rodelas e a curgete, regadas com azeite.','Assa a 200 °C durante 35 a 40 minutos.']},
  {id:'r-lulas', nome:'Lulas grelhadas com batata e salada', cat:'peixe', tempo:40, doses:4,
   ing:[['lulas',700],['batata',800],['alface',1],['tomate',200],['alho',3],['limao',1],['azeite',40],['sal',5]],
   passos:['Coze as batatas com casca em água com sal.','Tempera as lulas com alho picado, sal e limão e grelha em lume forte 2 a 3 minutos de cada lado.','Serve com as batatas, salada de alface e tomate e um fio de azeite.']},
  {id:'r-pescada-cozida', nome:'Pescada cozida com todos', cat:'peixe', tempo:45, doses:4,
   ing:[['pescada',600],['batata',800],['cenoura',300],['couve',300],['ovos',4],['alho',2],['azeite',40],['sal',5]],
   passos:['Coze a batata, a cenoura, a couve e os ovos em água com sal.','Coze a pescada nessa água, 8 a 10 minutos.','Aquece o azeite com o alho laminado.','Serve tudo e rega com o azeite de alho.']},
  {id:'r-filetes', nome:'Filetes de pescada com arroz de tomate', cat:'peixe', tempo:45, doses:4,
   ing:[['pescada',600],['ovos',2],['farinha',60],['panoralado',60],['oleo',200],['arroz',280],['pelado',300],['cebola',100],['alho',2],['limao',1],['azeite',20],['sal',5]],
   passos:['Tempera a pescada com sal e limão. Passa por farinha, ovo batido e pão ralado.','Faz o arroz de tomate refogando a cebola e o alho, juntando a polpa de tomate, o arroz e água quente.','Frita os filetes em óleo quente até dourarem.']},
  {id:'r-salada-grao-atum', nome:'Salada de grão com atum', cat:'peixe', tempo:20, doses:4,
   ing:[['grao',300],['atum',240],['tomate',200],['cebola',80],['pepino',1],['coentros',1],['azeite',30],['vinagre',10],['sal',2]],
   passos:['Deixa o grão de molho de véspera e coze 50 minutos. Deixa arrefecer.','Mistura com tomate, pepino e cebola picados, o atum e os coentros.','Tempera com azeite, vinagre e sal.']},
  {id:'r-salada-massa-atum', nome:'Salada de massa com atum e milho', cat:'peixe', tempo:25, doses:4,
   ing:[['massa',280],['atum',240],['milho',150],['tomate',200],['ovos',3],['azeite',25],['vinagre',10],['sal',2]],
   passos:['Coze a massa e os ovos. Escorre e deixa arrefecer.','Mistura com o atum, o milho, o tomate em cubos e os ovos em quartos.','Tempera com azeite, vinagre e sal.']},
  {id:'r-mexilhao', nome:'Mexilhão à Bulhão Pato com pão', cat:'peixe', tempo:25, doses:4,
   ing:[['mexilhao',1500],['alho',6],['azeite',50],['vinhobranco',100],['coentros',2],['limao',2],['pao',160]],
   passos:['Lava bem o mexilhão.','Aquece o azeite com o alho laminado, junta o vinho e o mexilhão e tapa até abrir, cerca de 5 minutos.','Termina com coentros e limão e serve com pão.']},
  {id:'r-esparguete-ameijoas', nome:'Esparguete com amêijoas e camarão', cat:'peixe', tempo:30, doses:4,
   ing:[['esparguete',320],['ameijoas',500],['alho',4],['vinhobranco',100],['coentros',1],['limao',1],['camarao',300],['azeite',40],['sal',2]],
   passos:['Deixa as amêijoas em água com sal durante 1 hora e lava.','Aquece o azeite com o alho, junta o camarão descascado e salteia 2 minutos.','Junta o vinho e as amêijoas e tapa até abrirem.','Mistura o esparguete cozido e termina com coentros e limão.']},

  /* ---------- vegetariano ---------- */
  {id:'r-tortilha', nome:'Tortilha de batata e cebola', cat:'veg', tempo:40, doses:4,
   ing:[['ovos',8],['batata',600],['cebola',200],['azeite',60],['alface',1],['tomate',200],['sal',4]],
   passos:['Corta a batata em rodelas finas e a cebola em tiras. Cozinha em azeite em lume brando 15 minutos.','Mistura com os ovos batidos e sal.','Cozinha na frigideira 5 minutos de cada lado, virando com um prato.','Serve com salada.']},
  {id:'r-courgete-ovos', nome:'Curgete salteada com ovos', cat:'veg', tempo:25, doses:4,
   ing:[['courgete',800],['ovos',8],['cebola',100],['alho',2],['queijo',40],['azeite',30],['sal',4]],
   passos:['Salteia a cebola e o alho no azeite. Junta a curgete em meias-luas até ficar macia.','Parte os ovos por cima, mexe e deixa cozinhar.','Serve com queijo ralado.']},
  {id:'r-ratatouille', nome:'Ratatouille com ovo e grão', cat:'veg', tempo:50, doses:4,
   ing:[['courgete',300],['beringela',300],['pimento',200],['tomate',400],['cebola',120],['alho',2],['ovos',8],['grao',100],['azeite',40],['sal',4]],
   passos:['Deixa o grão de molho de véspera e coze 50 minutos (ou usa grão cozido).','Corta todos os legumes em cubos.','Refoga a cebola e o alho no azeite, junta os restantes legumes e cozinha 30 minutos, tapado.','Junta o grão, faz covas, parte os ovos (2 por pessoa) e deixa cozer até a clara firmar.']},
  {id:'r-caril-grao', nome:'Caril de grão com espinafres e arroz', cat:'veg', tempo:45, doses:4,
   ing:[['grao',300],['espinafres',250],['leitecoco',400],['cebola',120],['alho',2],['caril',8],['arroz',250],['azeite',20],['sal',4]],
   passos:['Deixa o grão de molho de véspera e coze 50 minutos.','Refoga a cebola e o alho, junta o caril e depois o leite de coco e o grão. Cozinha 10 minutos.','Junta os espinafres e deixa murchar.','Serve com arroz branco.']},
  {id:'r-hamb-grao', nome:'Hambúrgueres de grão com salada', cat:'veg', tempo:45, doses:4,
   ing:[['grao',400],['ovos',1],['cebola',80],['farinha',60],['coentros',1],['oleo',60],['carcaca',4],['alface',1],['tomate',200],['pimentao',2],['sal',3]],
   passos:['Coze o grão (ou usa grão cozido) e esmaga grosseiramente.','Mistura com o ovo, a cebola e os coentros picados, a farinha, o pimentão e sal. Molda quatro hambúrgueres.','Frita em óleo 4 minutos de cada lado.','Serve nas carcaças com alface e tomate.']},
  {id:'r-risotto', nome:'Risotto de frango e cogumelos', cat:'carne', tempo:40, doses:4,
   ing:[['arroz',300],['cogumelos',400],['cebola',100],['alho',2],['vinhobranco',100],['manteiga',30],['queijo',60],['peitofrango',300],['caldo',2],['azeite',20],['sal',2]],
   passos:['Corta o frango em cubos e salteia no azeite até dourar. Reserva.','Salteia os cogumelos e reserva.','Refoga a cebola e o alho, junta o arroz e o vinho.','Vai juntando caldo quente (2 cubos em 1 litro de água), concha a concha, durante 18 minutos.','Mistura o frango, os cogumelos, a manteiga e o queijo.']},
  {id:'r-massa-cogumelos', nome:'Massa cremosa de frango e cogumelos', cat:'carne', tempo:25, doses:4,
   ing:[['massa',320],['cogumelos',400],['natas',200],['cebola',80],['alho',2],['queijo',40],['peitofrango',300],['azeite',20],['sal',3]],
   passos:['Coze a massa em água com sal.','Salteia o frango em cubos no azeite até dourar. Reserva.','Salteia a cebola, o alho e os cogumelos.','Junta o frango e as natas e deixa engrossar 3 minutos.','Mistura com a massa e serve com queijo ralado.']},
  {id:'r-lasanha-legumes', nome:'Lasanha de legumes e lentilhas', cat:'veg', tempo:75, doses:4,
   ing:[['lasanha',250],['courgete',400],['cenoura',150],['cogumelos',200],['pelado',400],['mozzarella',250],['leite',500],['manteiga',40],['farinha',40],['cebola',100],['lentilhas',200],['azeite',25],['sal',4]],
   passos:['Coze as lentilhas 25 a 30 minutos e escorre.','Salteia a cebola, a curgete, a cenoura e os cogumelos em cubos. Junta a polpa de tomate e as lentilhas e cozinha 15 minutos.','Faz molho branco com manteiga, farinha e leite.','Monta camadas de legumes com lentilhas, folhas de lasanha e molho branco.','Cobre com mozzarella e leva ao forno a 190 °C durante 30 minutos.']},
  {id:'r-wrap-grao', nome:'Wraps de grão com legumes', cat:'veg', tempo:20, doses:4,
   ing:[['tortilhas',8],['grao',300],['alface',1],['tomate',200],['pepino',1],['iogurte',125],['limao',1],['pimentao',2],['azeite',20],['sal',2]],
   passos:['Coze o grão (ou usa grão cozido) e salteia com azeite, pimentão e sal.','Mistura o iogurte com sumo de limão.','Recheia as tortilhas com grão, alface, tomate e pepino e junta o molho.']},
  {id:'r-quiche', nome:'Quiche de atum e espinafres', cat:'peixe', tempo:55, doses:4,
   ing:[['massafolhada',1],['ovos',6],['natas',200],['espinafres',250],['cebola',80],['queijo',80],['atum',120],['azeite',10],['sal',3]],
   passos:['Forra uma forma com a massa e fura o fundo.','Salteia a cebola e os espinafres no azeite.','Mistura os ovos, as natas, o queijo, o atum escorrido e sal e junta os espinafres.','Despeja na massa e leva ao forno a 190 °C durante 35 minutos.']},
  {id:'r-acorda', nome:'Açorda de alho com ovo escalfado', cat:'veg', tempo:20, doses:4,
   ing:[['pao',300],['alho',4],['coentros',2],['ovos',8],['azeite',50],['sal',4]],
   passos:['Pisa o alho com sal e os coentros e junta o azeite.','Põe o pão aos pedaços numa terrina e cobre com 800 ml de água a ferver.','Tapa 5 minutos, junta o alho e mexe.','Escalfa os ovos na água a ferver e serve por cima.']},
  {id:'r-arroz-legumes', nome:'Arroz de legumes com ovo', cat:'veg', tempo:35, doses:4,
   ing:[['arroz',300],['cenoura',150],['courgete',200],['pimento',150],['ervilhas',150],['cebola',100],['alho',2],['ovos',8],['caldo',1],['azeite',25],['sal',3]],
   passos:['Refoga a cebola e o alho no azeite. Junta a cenoura, a curgete e o pimento em cubos.','Acrescenta o arroz, as ervilhas e água quente com o cubo de caldo (2 vezes o volume do arroz).','Cozinha 15 minutos e deixa repousar 5.','Serve com 2 ovos por pessoa, estrelados ou escalfados.']},
  {id:'r-aglio-olio', nome:'Esparguete aglio e olio com ovo', cat:'veg', tempo:20, doses:4,
   ing:[['esparguete',320],['alho',6],['azeite',60],['ovos',8],['salsa',1],['sal',3]],
   passos:['Coze o esparguete em água com sal.','Aquece o azeite com o alho laminado em lume brando, sem deixar queimar.','Mistura a massa com o azeite de alho e um pouco da água da cozedura.','Serve com ovos estrelados e salsa.']},
  {id:'r-pizza-veg', nome:'Pizza caseira de atum e legumes', cat:'peixe', tempo:30, doses:4,
   ing:[['basepizza',2],['pelado',200],['mozzarella',250],['cogumelos',150],['pimento',150],['cebola',60],['atum',240],['azeite',15],['sal',2]],
   passos:['Espalha a polpa de tomate temperada sobre as bases.','Cobre com mozzarella, atum escorrido, cogumelos, pimento e cebola às fatias.','Leva ao forno a 220 °C durante 12 a 15 minutos.']},
  {id:'r-feijao-verde', nome:'Feijão-verde com ovo e batata', cat:'veg', tempo:35, doses:4,
   ing:[['feijaoverde',500],['batata',500],['ovos',8],['cebola',80],['alho',2],['azeite',30],['sal',4]],
   passos:['Coze o feijão-verde e a batata em água com sal.','Refoga a cebola e o alho no azeite e junta o feijão e a batata escorridos.','Serve com ovo cozido ou estrelado.']},
  {id:'r-massa-courgete', nome:'Massa com curgete e frango', cat:'carne', tempo:25, doses:4,
   ing:[['massa',320],['courgete',500],['alho',2],['queijo',60],['peitofrango',300],['azeite',30],['sal',3]],
   passos:['Coze a massa em água com sal.','Salteia o frango em cubos no azeite até dourar. Reserva.','Salteia o alho e a curgete aos cubos até ficar macia.','Junta o frango e mistura com a massa e o queijo ralado.']},
  {id:'r-arroz-feijao', nome:'Arroz de feijão com couve', cat:'veg', tempo:40, doses:4,
   ing:[['arroz',300],['feijao',250],['pelado',200],['cebola',120],['alho',2],['couve',150],['louro',1],['azeite',25],['sal',3]],
   passos:['Deixa o feijão de molho de véspera e coze 45 minutos.','Refoga a cebola, o alho e o louro, junta a polpa de tomate e a couve em tiras.','Acrescenta o feijão, o arroz e água quente (2 vezes o volume do arroz). Cozinha 15 minutos.']},

  /* ---------- pequeno-almoço ---------- */
  {id:'r-panq-banana', nome:'Panquecas de banana e aveia', cat:'peq', tempo:15, doses:4,
   ing:[['banana',300],['ovos',3],['aveia',100],['leite',100],['manteiga',15]],
   passos:['Esmaga a banana e mistura com os ovos, a aveia e o leite.','Cozinha colheradas numa frigideira com um pouco de manteiga, 2 minutos de cada lado.']},
  {id:'r-iogurte-aveia', nome:'Iogurte com aveia e fruta', cat:'peq', tempo:5, doses:4,
   ing:[['iogurte',500],['aveia',100],['maca',300],['banana',200]],
   passos:['Divide o iogurte por taças e junta a fruta aos pedaços.','Termina com a aveia por cima.']},
  {id:'r-tosta-queijo', nome:'Tosta de queijo e fiambre', cat:'peq', tempo:10, doses:4,
   ing:[['pao',200],['fiambre',100],['flamengo',120],['manteiga',20]],
   passos:['Barra o pão com manteiga e recheia com fiambre e queijo.','Grelha até o queijo derreter.']},
  {id:'r-panq-americanas', nome:'Panquecas americanas', cat:'peq', tempo:20, doses:4,
   ing:[['farinha',200],['leite',300],['ovos',2],['acucar',30],['manteiga',30],['banana',200]],
   passos:['Mistura a farinha, o açúcar, os ovos, o leite e metade da manteiga derretida.','Cozinha conchas de massa na frigideira untada, até fazer bolhas, e vira.','Serve com banana às rodelas.']},
  {id:'r-cereais', nome:'Cereais com leite e banana', cat:'peq', tempo:5, doses:4,
   ing:[['cereais',160],['leite',800],['banana',300]],
   passos:['Põe os cereais em taças, junta o leite frio e a banana às rodelas.']},
  {id:'r-tosta-abacate', nome:'Tosta de abacate e ovo', cat:'peq', tempo:15, doses:4,
   ing:[['pao',200],['abacate',2],['ovos',4],['limao',1],['azeite',10],['sal',2]],
   passos:['Esmaga o abacate com limão, azeite e sal.','Torra o pão e barra com o abacate.','Termina com um ovo estrelado ou cozido.']},
  {id:'r-omelete-queijo', nome:'Omelete de queijo com pão', cat:'peq', tempo:10, doses:4,
   ing:[['ovos',6],['flamengo',100],['pao',200],['manteiga',15],['sal',2]],
   passos:['Bate os ovos com sal.','Cozinha na frigideira com manteiga, junta o queijo e dobra.','Serve com pão.']},
  {id:'r-laranja-torradas', nome:'Sumo de laranja com torradas', cat:'peq', tempo:10, doses:4,
   ing:[['laranja',1000],['pao',200],['manteiga',30]],
   passos:['Espreme as laranjas.','Torra o pão e serve com manteiga.']},
  {id:'r-papas-maca', nome:'Papas de aveia com maçã', cat:'peq', tempo:10, doses:4,
   ing:[['aveia',160],['leite',800],['maca',300],['acucar',20]],
   passos:['Aquece o leite com a aveia em lume brando 5 minutos, até engrossar.','Serve com maçã às fatias e açúcar a gosto.']}
]);
/* nutri.js — nutrição: proteína por ingrediente, grupos alimentares e regras de refeição (sem DOM).
   Os valores são médios e aproximados (tabelas de composição de alimentos, como o INSA/TCA e a USDA),
   para o alimento como se compra e como entra na receita (cru, com osso ou casca quando é o caso).
   Servem para comparar pratos e apanhar faltas evidentes, não para dietas clínicas. */

/* grupos: ave (carne branca), verm (carne vermelha), proc (charcutaria), peixe (peixe e marisco),
   ovo, leg (leguminosas), lac (lacticínios), veg (hortícolas), fruta, cer (cereais, massa, pão),
   tub (batata), gord (gorduras e molhos), out (condimentos e restante) */
var GROUPS = {
  ave:   {nome: 'Carne branca',      fonte: true},
  verm:  {nome: 'Carne vermelha',    fonte: true},
  proc:  {nome: 'Charcutaria',       fonte: true},
  peixe: {nome: 'Peixe e marisco',   fonte: true},
  ovo:   {nome: 'Ovos',              fonte: true},
  leg:   {nome: 'Leguminosas',       fonte: true},
  lac:   {nome: 'Lacticínios',       fonte: false},
  veg:   {nome: 'Hortícolas',        fonte: false},
  fruta: {nome: 'Fruta',             fonte: false},
  cer:   {nome: 'Cereais e massa',   fonte: false},
  tub:   {nome: 'Batata',            fonte: false},
  gord:  {nome: 'Gorduras',          fonte: false},
  out:   {nome: 'Outros',            fonte: false}
};

/* id: [grupo, proteína em g por 100 g ou 100 ml (ou por unidade, nos ingredientes em "un"), gramas por unidade nos hortícolas em "un"] */
var NUT = {
  arroz: ['cer', 7], esparguete: ['cer', 12.5], massa: ['cer', 12.5], lasanha: ['cer', 12.5],
  azeite: ['gord', 0], leite: ['lac', 3.3], ovos: ['ovo', 6.5],
  peitofrango: ['ave', 22], carnepicada: ['verm', 18], pescada: ['peixe', 17],
  batata: ['tub', 2], cebola: ['veg', 1.1], cenoura: ['veg', 0.9], tomate: ['veg', 0.9],
  banana: ['fruta', 1], maca: ['fruta', 0.3], pao: ['cer', 8.5], manteiga: ['gord', 0.8],
  atum: ['peixe', 25], feijao: ['leg', 21], grao: ['leg', 19], lentilhas: ['leg', 24],
  alho: ['out', 0.25], limao: ['out', 0.5], salsa: ['out', 1], alface: ['veg', 3.5, 250],
  espinafres: ['veg', 2.9], brocolos: ['veg', 2.8], couve: ['veg', 3], abobora: ['veg', 1],
  coxas: ['ave', 15], febras: ['verm', 20], chourico: ['proc', 20], bacalhau: ['peixe', 60],
  natas: ['gord', 2.2], queijo: ['lac', 25], aveia: ['cer', 13], pelado: ['veg', 1],
  ervilhas: ['veg', 5.5], sal: ['out', 0], pimentao: ['out', 14], louro: ['out', 0], caldo: ['out', 0.5],
  farinha: ['cer', 10], acucar: ['out', 0], oleo: ['gord', 0], iogurte: ['lac', 4],
  flamengo: ['lac', 26], fiambre: ['proc', 17], lombo: ['verm', 21], laranja: ['fruta', 0.9],
  carcaca: ['cer', 4.5], cereais: ['cer', 8], bacon: ['proc', 14], salsichas: ['proc', 12],
  bife: ['verm', 21], lombovaca: ['verm', 21], vaca: ['verm', 20], borrego: ['verm', 12],
  figado: ['verm', 20], salmao: ['peixe', 20], dourada: ['peixe', 9], polvo: ['peixe', 12],
  camarao: ['peixe', 12], lulas: ['peixe', 15], mexilhao: ['peixe', 4], ameijoas: ['peixe', 3],
  carapau: ['peixe', 10], sardinha: ['peixe', 12], cogumelos: ['veg', 3], courgete: ['veg', 1.2],
  beringela: ['veg', 1], pimento: ['veg', 1], pepino: ['veg', 2, 250], feijaoverde: ['veg', 1.8],
  abacate: ['fruta', 3], coentros: ['out', 1], milho: ['cer', 3], azeitonas: ['gord', 1],
  batatapalha: ['out', 6], leitecoco: ['gord', 2.3], panoralado: ['cer', 12],
  massafolhada: ['cer', 16], mozzarella: ['lac', 20], tortilhas: ['cer', 4], paohamb: ['cer', 5],
  basepizza: ['cer', 13], vinhobranco: ['out', 0], vinagre: ['out', 0], cerveja: ['out', 0.4], caril: ['out', 12]
};

/* tipos para ingredientes criados pelo utilizador: grupo e proteína (g por 100 g) por defeito */
var NUT_TIPOS = [
  {id: 'out',   nome: 'Outro / não sei',       p: 0},
  {id: 'ave',   nome: 'Carne branca (frango, peru)', p: 21},
  {id: 'verm',  nome: 'Carne vermelha',        p: 20},
  {id: 'proc',  nome: 'Charcutaria',           p: 17},
  {id: 'peixe', nome: 'Peixe ou marisco',      p: 18},
  {id: 'ovo',   nome: 'Ovos',                  p: 6.5},
  {id: 'leg',   nome: 'Leguminosas',           p: 21},
  {id: 'lac',   nome: 'Lacticínios',           p: 10},
  {id: 'veg',   nome: 'Hortícola',             p: 2},
  {id: 'fruta', nome: 'Fruta',                 p: 0.8},
  {id: 'cer',   nome: 'Cereal, massa ou pão',  p: 10},
  {id: 'tub',   nome: 'Batata',                p: 2},
  {id: 'gord',  nome: 'Gordura ou molho',      p: 1}
];

/* limiares da app (por dose) */
var PROT_MIN = 15;     /* abaixo disto o prato não conta como prato principal */
var PROT_BOM = 20;     /* a partir daqui é uma boa dose de proteína */
var PROT_SRC = 12;     /* mínimo de proteína que tem de vir de carne, peixe, ovos ou leguminosas */
var VEG_MIN = 100;     /* g de hortícolas por dose abaixo dos quais se sugere juntar salada ou legumes */

function nutOf(ing){
  if (!ing) return ['out', 0];
  var n = NUT[ing.id];
  if (n) return n;
  if (ing.nut) return [ing.nut.g || 'out', Number(ing.nut.p) || 0, ing.nut.ug];
  return ['out', 0];
}

/* proteína (g) e hortícolas (g) de uma quantidade de ingrediente */
function ingProt(ing, qty){
  var n = nutOf(ing);
  return ing.u === 'un' ? n[1] * qty : n[1] * qty / 100;
}
function ingVegG(ing, qty){
  var n = nutOf(ing);
  if (n[0] !== 'veg') return 0;
  return ing.u === 'un' ? (n[2] || 150) * qty : qty;
}

/* análise nutricional de uma receita, por dose */
function recipeNutri(rec){
  var n = rec.doses || 1, prot = 0, src = 0, veg = 0, by = {}, grams = {};
  (rec.ing || []).forEach(function(p){
    var ing = IMAP[p[0]];
    if (!ing) return;
    var g = nutOf(ing)[0], pr = ingProt(ing, p[1]) / n;
    prot += pr;
    by[g] = (by[g] || 0) + pr;
    if (GROUPS[g] && GROUPS[g].fonte) src += pr;
    veg += ingVegG(ing, p[1]) / n;
  });
  /* grupo de onde vem mais proteína "de fonte" */
  var main = null;
  Object.keys(by).forEach(function(g){
    if (GROUPS[g] && GROUPS[g].fonte && by[g] >= 3 && (!main || by[g] > by[main])) main = g;
  });
  var fontes = Object.keys(by).filter(function(g){ return GROUPS[g] && GROUPS[g].fonte && by[g] >= 3; })
    .sort(function(a, b){ return by[b] - by[a]; });
  var procOnly = fontes.length > 0 && fontes.every(function(g){ return g === 'proc'; });
  return {prot: prot, src: src, veg: veg, by: by, main: main, fontes: fontes, procOnly: procOnly};
}

/* nível de proteína de um prato: 0 = sem proteína, 1 = pouca, 2 = boa */
function protLevel(nu){
  if (nu.src < PROT_SRC || nu.prot < PROT_MIN) return 0;
  return nu.prot >= PROT_BOM ? 2 : 1;
}
/* um prato principal tem de ter proteína a sério; sopas e pequenos-almoços não são pratos principais */
function isMainDish(rec){ return rec.cat !== 'sopa' && rec.cat !== 'peq'; }
function hasProtein(rec){ return protLevel(recipeNutri(rec)) > 0; }
/* legacy.js — assinatura (ingredientes) das receitas da app antes de serem corrigidas por razões de nutrição.
   Serve para atualizar só as cópias que o utilizador não alterou. */
var LEGACY_ING = { "r-bolonhesa": "[[\"esparguete\",320],[\"carnepicada\",250],[\"cenoura\",150],[\"cebola\",150],[\"alho\",2],[\"pelado\",400],[\"azeite\",25],[\"queijo\",30],[\"sal\",3]]",
  "r-sopa": "[[\"batata\",400],[\"cenoura\",200],[\"abobora\",300],[\"couve\",200],[\"cebola\",100],[\"alho\",1],[\"feijao\",150],[\"azeite\",25],[\"pao\",160],[\"sal\",4]]",
  "r-arroz-tomate": "[[\"arroz\",300],[\"pelado\",400],[\"cebola\",120],[\"alho\",2],[\"ovos\",4],[\"azeite\",30],[\"caldo\",1],[\"sal\",3]]",
  "r-carbonara": "[[\"esparguete\",320],[\"bacon\",150],[\"ovos\",3],[\"queijo\",50],[\"alho\",1],[\"sal\",2]]",
  "r-massa-salsichas": "[[\"massa\",320],[\"salsichas\",350],[\"pelado\",400],[\"cebola\",100],[\"alho\",2],[\"azeite\",20],[\"queijo\",30],[\"sal\",3]]",
  "r-arroz-chourico": "[[\"arroz\",300],[\"chourico\",200],[\"cebola\",120],[\"alho\",2],[\"louro\",1],[\"azeite\",20],[\"sal\",3]]",
  "r-pizza-fiambre": "[[\"basepizza\",2],[\"pelado\",200],[\"mozzarella\",250],[\"fiambre\",100],[\"cogumelos\",150],[\"azeite\",15],[\"sal\",2]]",
  "r-tosta-salada": "[[\"pao\",200],[\"fiambre\",100],[\"flamengo\",120],[\"manteiga\",30],[\"alface\",1],[\"tomate\",200]]",
  "r-esparguete-ameijoas": "[[\"esparguete\",320],[\"ameijoas\",500],[\"alho\",4],[\"azeite\",40],[\"vinhobranco\",100],[\"coentros\",1],[\"limao\",1],[\"sal\",2]]",
  "r-tortilha": "[[\"ovos\",6],[\"batata\",600],[\"cebola\",200],[\"azeite\",60],[\"alface\",1],[\"tomate\",200],[\"sal\",4]]",
  "r-courgete-ovos": "[[\"courgete\",800],[\"ovos\",6],[\"cebola\",100],[\"alho\",2],[\"queijo\",40],[\"azeite\",30],[\"sal\",4]]",
  "r-ratatouille": "[[\"courgete\",300],[\"beringela\",300],[\"pimento\",200],[\"tomate\",400],[\"cebola\",120],[\"alho\",2],[\"ovos\",4],[\"azeite\",40],[\"sal\",4]]",
  "r-risotto": "[[\"arroz\",300],[\"cogumelos\",400],[\"cebola\",100],[\"alho\",2],[\"vinhobranco\",100],[\"caldo\",2],[\"manteiga\",30],[\"queijo\",60],[\"azeite\",20],[\"sal\",2]]",
  "r-massa-cogumelos": "[[\"massa\",320],[\"cogumelos\",400],[\"natas\",200],[\"cebola\",80],[\"alho\",2],[\"queijo\",40],[\"azeite\",20],[\"sal\",3]]",
  "r-lasanha-legumes": "[[\"lasanha\",250],[\"courgete\",400],[\"cenoura\",150],[\"cogumelos\",200],[\"pelado\",400],[\"mozzarella\",250],[\"leite\",500],[\"manteiga\",40],[\"farinha\",40],[\"cebola\",100],[\"azeite\",25],[\"sal\",4]]",
  "r-wrap-grao": "[[\"tortilhas\",8],[\"grao\",250],[\"alface\",1],[\"tomate\",200],[\"pepino\",1],[\"iogurte\",125],[\"limao\",1],[\"pimentao\",2],[\"azeite\",20],[\"sal\",2]]",
  "r-quiche": "[[\"massafolhada\",1],[\"ovos\",4],[\"natas\",200],[\"espinafres\",250],[\"cebola\",80],[\"queijo\",80],[\"azeite\",10],[\"sal\",3]]",
  "r-acorda": "[[\"pao\",300],[\"alho\",4],[\"coentros\",2],[\"ovos\",4],[\"azeite\",50],[\"sal\",4]]",
  "r-arroz-legumes": "[[\"arroz\",300],[\"cenoura\",150],[\"courgete\",200],[\"pimento\",150],[\"ervilhas\",150],[\"cebola\",100],[\"alho\",2],[\"caldo\",1],[\"azeite\",25],[\"sal\",3]]",
  "r-aglio-olio": "[[\"esparguete\",320],[\"alho\",6],[\"azeite\",60],[\"ovos\",4],[\"salsa\",1],[\"sal\",3]]",
  "r-pizza-veg": "[[\"basepizza\",2],[\"pelado\",200],[\"mozzarella\",250],[\"cogumelos\",150],[\"pimento\",150],[\"cebola\",60],[\"azeite\",15],[\"sal\",2]]",
  "r-feijao-verde": "[[\"feijaoverde\",500],[\"batata\",500],[\"ovos\",4],[\"cebola\",80],[\"alho\",2],[\"azeite\",30],[\"sal\",4]]",
  "r-massa-courgete": "[[\"massa\",320],[\"courgete\",500],[\"alho\",2],[\"queijo\",60],[\"azeite\",30],[\"sal\",3]]",
  "r-bacalhau": "[[\"bacalhau\",400],[\"batata\",800],[\"cebola\",250],[\"natas\",400],[\"leite\",200],[\"manteiga\",30],[\"azeite\",30],[\"queijo\",50]]",
  "r-bacalhau-bras": "[[\"bacalhau\",400],[\"batatapalha\",190],[\"ovos\",6],[\"cebola\",250],[\"alho\",2],[\"azeitonas\",40],[\"salsa\",1],[\"azeite\",40]]",
  "r-bacalhau-gomes": "[[\"bacalhau\",400],[\"batata\",800],[\"cebola\",300],[\"ovos\",3],[\"azeitonas\",60],[\"alho\",2],[\"salsa\",1],[\"azeite\",60]]",
  "r-bacalhau-lagareiro": "[[\"bacalhau\",800],[\"batata\",1000],[\"alho\",6],[\"azeite\",120],[\"cebola\",100],[\"salsa\",1]]",
  "r-bacalhau-grao": "[[\"bacalhau\",300],[\"grao\",250],[\"ovos\",4],[\"cebola\",100],[\"coentros\",1],[\"alho\",1],[\"azeite\",40],[\"vinagre\",10],[\"sal\",1]]",
  "r-pataniscas": "[[\"bacalhau\",250],[\"farinha\",120],[\"ovos\",2],[\"cebola\",100],[\"salsa\",1],[\"oleo\",250],[\"arroz\",250],[\"feijao\",150],[\"pelado\",100],[\"alho\",2],[\"azeite\",20],[\"sal\",3]]" };
/* core.js — cálculo de preços, doses, planeador e lista de compras (sem DOM). */

var MESES = ['jan','fev','mar','abr','mai','jun','jul','ago','set','out','nov','dez'];
var DAYS = [
  {id:'seg', nome:'Segunda'}, {id:'ter', nome:'Terça'}, {id:'qua', nome:'Quarta'},
  {id:'qui', nome:'Quinta'},  {id:'sex', nome:'Sexta'}, {id:'sab', nome:'Sábado'},
  {id:'dom', nome:'Domingo'}
];
var SLOTS = [
  {id:'peq',    nome:'Pequeno-almoço', curto:'Peq. almoço'},
  {id:'almoco', nome:'Almoço',         curto:'Almoço'},
  {id:'jantar', nome:'Jantar',         curto:'Jantar'}
];
var LS_KEY = 'budgetchef.v1';

function clone(o){ return JSON.parse(JSON.stringify(o)); }
function round2(x){ return Math.round(x * 100) / 100; }
function median(a){
  var s = a.slice().sort(function(x, y){ return x - y; });
  var m = Math.floor(s.length / 2);
  return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2;
}
function norm(s){
  return String(s == null ? '' : s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').trim();
}

/* ---------- formatação ---------- */
function eur(x){
  var v = Math.round(x * 100) / 100;
  if (Object.is(v, -0)) v = 0;
  return v.toFixed(2).replace('.', ',') + ' €';
}
function fmtNum(n, dec){
  var f = Math.pow(10, dec);
  return String(Math.round(n * f) / f).replace('.', ',');
}
function fmtQty(n, u){
  if (u === 'g')  return n >= 1000 ? fmtNum(n / 1000, 2) + ' kg' : Math.max(1, Math.round(n)) + ' g';
  if (u === 'ml') return n >= 1000 ? fmtNum(n / 1000, 2) + ' l'  : Math.max(1, Math.round(n)) + ' ml';
  return fmtNum(Math.round(n * 2) / 2, 1) + ' un';
}

/* ---------- livro de preços ---------- */
/* BOOK[loja][ingrediente] = preço da embalagem (loja) e BOOK.ref = mediana das cadeias. */
var BOOK = (function(){
  var book = {};
  STORES.forEach(function(s){ book[s.id] = {}; });
  ING.forEach(function(i){
    if (!i.src) return;
    var k = i.pack / i.srcQty, vals = [];
    Object.keys(i.src).forEach(function(sid){
      var p = i.src[sid] * k;
      book[sid][i.id] = round2(p);
      vals.push(p);
    });
    book.ref[i.id] = round2(median(vals));
  });
  return book;
})();

var IMAP = {};
function rebuildIngIndex(st){
  Object.keys(IMAP).forEach(function(k){ delete IMAP[k]; });
  ING.forEach(function(i){ IMAP[i.id] = i; });
  ((st && st.customIngs) || []).forEach(function(i){ IMAP[i.id] = i; });
}
function allIngs(st){ return ING.concat((st && st.customIngs) || []); }

/* preço da embalagem de um ingrediente numa loja, e de onde vem */
function packPrice(ing, storeId, st){
  var P = (st && st.prices) || {};
  var own = P[storeId] && P[storeId][ing.id];
  if (own != null) return {v: own, src: 'manual'};
  if (storeId !== 'ref' && BOOK[storeId] && BOOK[storeId][ing.id] != null) return {v: BOOK[storeId][ing.id], src: 'loja'};
  var r = P.ref && P.ref[ing.id];
  if (r != null) return {v: r, src: storeId === 'ref' ? 'manual' : 'media'};
  if (BOOK.ref[ing.id] != null) return {v: BOOK.ref[ing.id], src: storeId === 'ref' ? 'mediana' : 'media'};
  return {v: ing.est || 0, src: ing.custom ? 'manual' : 'est'};
}
function hasStorePrice(ing, storeId, st){
  var P = (st && st.prices) || {};
  return (P[storeId] && P[storeId][ing.id] != null) || (BOOK[storeId] && BOOK[storeId][ing.id] != null);
}
function storeHasData(storeId, st){
  if (storeId === 'ref') return true;
  if (Object.keys(BOOK[storeId] || {}).length) return true;
  var p = st && st.prices && st.prices[storeId];
  return !!(p && Object.keys(p).length);
}

/* ---------- receitas ---------- */
function recById(st, id){
  for (var i = 0; i < st.recipes.length; i++) if (st.recipes[i].id === id) return st.recipes[i];
  return null;
}
function recipeCalc(rec, st, storeId, people){
  var n = people || rec.doses;
  var f = n / rec.doses, total = 0, lines = [];
  rec.ing.forEach(function(pair){
    var ing = IMAP[pair[0]];
    if (!ing) return;
    var qty = pair[1] * f;
    var cost = qty * packPrice(ing, storeId, st).v / ing.pack;
    total += cost;
    lines.push({ing: ing, qty: qty, cost: cost});
  });
  return {lines: lines, total: total, perDose: total / n};
}

/* ---------- planeador ---------- */
function activeSlots(st){ return SLOTS.filter(function(s){ return st.slots[s.id]; }); }
function planKey(d, s){ return d + '-' + s; }
/* pequeno-almoço só leva receitas de pequeno-almoço; almoço e jantar levam as restantes,
   salvo se a receita estiver marcada "só almoço" ou "só jantar" (campo refeicao) */
/* nível de preço por dose, com os preços da loja escolhida: € até 1,60, €€ até 3,00, €€€ acima */
var TIER_MAX = [1.6, 3.0];
var TIERS = [
  {n: 1, sym: '\u20ac',           nome: 'Low cost'},
  {n: 2, sym: '\u20ac\u20ac',     nome: 'Médio'},
  {n: 3, sym: '\u20ac\u20ac\u20ac', nome: 'Caro'}
];
function tierOf(perDose){ return perDose < TIER_MAX[0] ? 1 : (perDose < TIER_MAX[1] ? 2 : 3); }
function tierHtml(n){
  return '<span class="tier" aria-label="' + TIERS[n - 1].nome + '"><b>' + TIERS[n - 1].sym + '</b><i>' + TIERS[2].sym.slice(n) + '</i></span>';
}
/* ids das receitas que vinham com a primeira versão da app */
var BUILTIN_V1 = ['r-arroz-frango','r-bolonhesa','r-bacalhau','r-omelete','r-sopa','r-salada-feijao','r-frango-forno','r-pescada','r-grao','r-massa-atum','r-arroz-tomate','r-febras','r-lentilhas','r-papas','r-torradas','r-pao-maca'];

/* um prato de almoço ou jantar tem de ter proteína a sério (carne, peixe, ovos ou leguminosas) e a sopa
   nunca é o prato principal: entra à parte, como entrada */
function slotAccepts(slotId, rec){
  if (slotId === 'peq') return rec.cat === 'peq';
  if (!isMainDish(rec)) return false;
  var r = rec.refeicao || 'ambos';
  if (r !== 'ambos' && r !== slotId) return false;
  return hasProtein(rec);
}
function soupAccepts(rec){ return rec.cat === 'sopa'; }
function soupOn(st, slotId){ return slotId !== 'peq' && !!(st.soup && st.soup[slotId]); }
function soupKey(d, s){ return d + '-' + s + '-sopa'; }

/* tudo o que está planeado nas refeições ativas: pratos e sopas */
function planEntries(st){
  var out = [], slots = activeSlots(st);
  DAYS.forEach(function(d){
    slots.forEach(function(s){
      var id = st.plan[planKey(d.id, s.id)], rec = id ? recById(st, id) : null;
      if (rec) out.push({day: d.id, slot: s.id, soup: false, rec: rec});
      if (soupOn(st, s.id)){
        var sid = st.plan[soupKey(d.id, s.id)], sr = sid ? recById(st, sid) : null;
        if (sr) out.push({day: d.id, slot: s.id, soup: true, rec: sr});
      }
    });
  });
  return out;
}
/* quantas vezes cada receita aparece nas refeições ativas da semana */
function planCounts(st){
  var c = {};
  planEntries(st).forEach(function(e){ c[e.rec.id] = (c[e.rec.id] || 0) + 1; });
  return c;
}

function planSummary(st){
  var slots = activeSlots(st), cost = 0, count = 0, perDay = {};
  DAYS.forEach(function(d){ perDay[d.id] = 0; });
  planEntries(st).forEach(function(e){
    var c = recipeCalc(e.rec, st, st.store, st.people).total;
    cost += c; perDay[e.day] += c;
    if (!e.soup) count++;
  });
  return {cost: cost, count: count, total: DAYS.length * slots.length, perDay: perDay,
          perDoseAvg: count ? cost / (count * st.people) : 0};
}
/* a semana só gera lista depois de aceite: guarda-se uma assinatura do planeador no momento da aceitação;
   qualquer mudança (refeição, sopa, pessoas, receita) faz a assinatura deixar de bater */
function weekSig(st){
  return JSON.stringify({p: st.people, e: planEntries(st).map(function(e){
    return [e.day, e.slot, e.soup, e.rec.id, e.rec.doses, e.rec.ing];
  })});
}
function weekAccepted(st){
  return planEntries(st).length > 0 && !!st.acceptedSig && st.acceptedSig === weekSig(st);
}
function budgetPerDose(st){
  var n = DAYS.length * activeSlots(st).length * st.people;
  return n ? st.budget / n : 0;
}

/* critério das refeições: a sopa é entrada à parte; a semana evita carne vermelha (máx. 2)
   e charcutaria (máx. 1), em linha com a Roda dos Alimentos e o Prato Saudável */
var WEEK_LIMIT = {verm: 2, proc: 1};
function mainGroup(rec){
  var nu = recipeNutri(rec);
  return nu.main || nu.fontes[0] || 'out';
}
/* preenche as refeições vazias (pratos e sopas) com receitas que cabem no orçamento restante */
function suggestWeek(st, rng){
  rng = rng || Math.random;
  var slots = activeSlots(st), keys = [];
  DAYS.forEach(function(d){
    slots.forEach(function(s){
      keys.push({s: s.id, k: planKey(d.id, s.id), soup: false});
      if (soupOn(st, s.id)) keys.push({s: s.id, k: soupKey(d.id, s.id), soup: true});
    });
  });
  var plan = {}, counts = {}, groups = {}, spent = 0;
  Object.keys(st.plan).forEach(function(k){ plan[k] = st.plan[k]; });
  keys.forEach(function(x){
    var r = plan[x.k] ? recById(st, plan[x.k]) : null;
    if (!r) return;
    counts[r.id] = (counts[r.id] || 0) + 1;
    if (!x.soup){ var g0 = mainGroup(r); groups[g0] = (groups[g0] || 0) + 1; }
    spent += recipeCalc(r, st, st.store, st.people).total;
  });
  var empty = keys.filter(function(x){ return !(plan[x.k] && recById(st, plan[x.k])); });
  var left = empty.length, prevCat = null;
  empty.forEach(function(x){
    var tierSet = false;
    var pool = st.recipes.filter(function(r){ return x.soup ? soupAccepts(r) : slotAccepts(x.s, r); });
    if (!pool.length){ left--; return; }
    if (st.tier === 1 || st.tier === 2 || st.tier === 3){
      var inTier = pool.filter(function(r){ return tierOf(recipeCalc(r, st, st.store, st.people).perDose) === st.tier; });
      if (inTier.length) pool = inTier;
      tierSet = inTier.length > 0;
    }
    var cap = (st.budget - spent) / left;
    var scored = pool.map(function(r){ return {r: r, c: recipeCalc(r, st, st.store, st.people).total}; });
    var ok = scored.filter(function(o){ return o.c <= cap * 1.2 && (counts[o.r.id] || 0) < 2; });
    if (!ok.length && tierSet) ok = scored.filter(function(o){ return (counts[o.r.id] || 0) < 2; });
    if (!ok.length) ok = scored.slice().sort(function(a, b){ return a.c - b.c; }).slice(0, 3);
    if (!x.soup){
      var lim = ok.filter(function(o){ var g = mainGroup(o.r), L = WEEK_LIMIT[g]; return !(L && (groups[g] || 0) >= L); });
      if (lim.length) ok = lim;
    }
    var min = Math.min.apply(null, ok.map(function(o){ return counts[o.r.id] || 0; }));
    var least = ok.filter(function(o){ return (counts[o.r.id] || 0) === min; });
    var other = least.filter(function(o){ return o.r.cat !== prevCat; });
    if (other.length) least = other;
    var pick = least[Math.floor(rng() * least.length)];
    plan[x.k] = pick.r.id;
    counts[pick.r.id] = (counts[pick.r.id] || 0) + 1;
    if (!x.soup){ var g1 = mainGroup(pick.r); groups[g1] = (groups[g1] || 0) + 1; prevCat = pick.r.cat; }
    spent += pick.c; left--;
  });
  return plan;
}

/* ---------- lista de compras ---------- */
/* junta as quantidades da semana e arredonda para cima: embalagens inteiras,
   ou o menor peso que se vende, nos produtos vendidos ao peso */
function shoppingList(st, storeId){
  storeId = storeId || st.store;
  var need = {};
  planEntries(st).forEach(function(e){
    var f = st.people / e.rec.doses;
    e.rec.ing.forEach(function(p){
      if (IMAP[p[0]]) need[p[0]] = (need[p[0]] || 0) + p[1] * f;
    });
  });
  var items = [], buy = 0, foodCost = 0, leftover = 0;
  Object.keys(need).forEach(function(id){
    var ing = IMAP[id], price = packPrice(ing, storeId, st);
    var step = ing.step || ing.pack;
    var units = Math.max(1, Math.ceil(need[id] / step - 1e-9));
    var qty = units * step;                      /* quantidade comprada, em unidade base */
    var cost = qty * price.v / ing.pack;
    var eat = need[id] * price.v / ing.pack;
    var have = st.shop.have[id] !== undefined ? !!st.shop.have[id] : !!ing.pantry;
    foodCost += eat;
    if (!have){ buy += cost; leftover += cost - eat; }
    items.push({ing: ing, need: need[id], units: units, qty: qty, loose: !!(ing.step && ing.step < ing.pack),
                cost: cost, eat: eat, left: qty - need[id], have: have, bought: !!st.shop.bought[id], price: price});
  });
  var extras = (st.shop.extras || []).reduce(function(a, e){ return a + (e.preco || 0); }, 0);
  return {items: items, buy: buy, extras: extras, foodCost: foodCost, leftover: leftover};
}

/* ---------- leitura de etiquetas (sem DOM) ---------- */
/* preços em euros do texto da etiqueta; ignora os preços por kg/l (são o preço por unidade, não o da embalagem).
   Devolve candidatos sem repetir, com os que têm € primeiro. */
function parseShelfPrices(text){
  var seen = {}, out = [], lines = String(text || '').split(/\n/);
  lines.forEach(function(line){
    var r = /(\d{1,3})[,.](\d{2})/g, m;
    while ((m = r.exec(line))){
      var v = parseFloat(m[1] + '.' + m[2]);
      var after = line.slice(m.index + m[0].length, m.index + m[0].length + 10);
      if (v <= 0 || v >= 1000 || /^\s*(€)?\s*\/\s*(kg|l|g|ml|un)/i.test(after) || /\/\s*(kg|l)\b/i.test(after)) continue;
      var eur = /€|eur/i.test(line);
      if (!seen[v]){ seen[v] = true; out.push({v: v, eur: eur}); }
    }
  });
  out.sort(function(a, b){ return (b.eur - a.eur) || 0; });
  return out.map(function(o){ return o.v; });
}
/* nome provável: a linha mais longa com letras, sem preços nem palavras de etiqueta */
function guessProductName(text){
  var lines = String(text || '').split(/\n/).map(function(s){ return s.trim(); }).filter(function(s){
    return s.length >= 4 && /[A-Za-zÀ-ÿ]{3,}/.test(s) && !/\d[,.]\d{2}/.test(s) &&
      !/€|\/\s*kg|\/\s*l\b|pre[çc]o|pvp|iva|ean|c[óo]d|refer/i.test(s);
  });
  lines.sort(function(a, b){ return b.length - a.length; });
  return lines[0] || '';
}
/* "500 g", "1,5 l", "6 un" -> {q, u} na unidade base da app (g, ml ou un) */
function parseQuantity(s){
  var m = /(\d+(?:[.,]\d+)?)\s*(kg|g|l|ml|cl|un)\b/i.exec(String(s || ''));
  if (!m) return null;
  var q = parseFloat(m[1].replace(',', '.')), unit = m[2].toLowerCase();
  if (unit === 'kg') return {q: q * 1000, u: 'g'};
  if (unit === 'g') return {q: q, u: 'g'};
  if (unit === 'l') return {q: q * 1000, u: 'ml'};
  if (unit === 'cl') return {q: q * 10, u: 'ml'};
  if (unit === 'ml') return {q: q, u: 'ml'};
  return {q: q, u: 'un'};
}
/* ingrediente que mais palavras partilha com o nome lido */
function matchIngredient(name, st){
  var words = norm(name).split(/[^a-z0-9]+/).filter(function(w){ return w.length >= 3; });
  if (!words.length) return null;
  var best = null, bestN = 0;
  allIngs(st).forEach(function(i){
    var iw = norm(i.nome).split(/[^a-z0-9]+/).filter(function(w){ return w.length >= 3; });
    var n = iw.filter(function(w){ return words.indexOf(w) >= 0; }).length;
    if (n > bestN){ bestN = n; best = i; }
  });
  return best;
}
/* preço da embalagem da app a partir do preço e tamanho do produto lido na etiqueta */
function packPriceFromShelf(price, productQty, ing){
  return productQty > 0 ? round2(price * ing.pack / productQty) : null;
}

/* ---------- estado ---------- */
function samplePlan(){
  var m = {
    seg: ['r-arroz-tomate', 'r-bolonhesa'], ter: ['r-lentilhas', 'r-omelete'],
    qua: ['r-arroz-frango', 'r-grao'], qui: ['r-massa-atum', 'r-frango-forno'],
    sex: ['r-febras', 'r-salada-feijao'], sab: ['r-pescada', 'r-tortilha'], dom: ['r-bacalhau', 'r-caril-grao']
  }, sp = {
    seg: ['r-creme-abobora', 'r-sopa'], ter: ['r-sopa-lentilhas', 'r-caldo-verde'], qua: ['r-gaspacho', 'r-canja'],
    qui: ['r-sopa-grao', 'r-creme-cenoura'], sex: ['r-sopa-tomate', 'r-sopa'], sab: ['r-canja', 'r-caldo-verde'],
    dom: ['r-sopa-lentilhas', 'r-sopa-tomate']
  }, P = {};
  Object.keys(m).forEach(function(d){
    P[planKey(d, 'almoco')] = m[d][0]; P[planKey(d, 'jantar')] = m[d][1];
    P[soupKey(d, 'almoco')] = sp[d][0]; P[soupKey(d, 'jantar')] = sp[d][1];
  });
  return P;
}
function defaultState(){
  return {
    v: 1, people: 2, budget: 40, store: 'ref', tier: 'all', builtinsSeen: RECIPES.map(function(r){ return r.id; }),
    slots: {peq: false, almoco: true, jantar: true},
    soup: {almoco: true, jantar: true},
    plan: samplePlan(), example: true, acceptedSig: null, eanMap: {},
    recipes: clone(RECIPES), customIngs: [], prices: {},
    shop: {have: {}, bought: {}, extras: []},
    savedAt: 0
  };
}
function normalizeState(s){
  var d = defaultState();
  if (!s || typeof s !== 'object') return d;
  var o = {};
  o.v = 1;
  o.people = Math.min(12, Math.max(1, Math.round(Number(s.people) || d.people)));
  o.budget = Number(s.budget) >= 0 ? Number(s.budget) : d.budget;
  o.store = STORES.some(function(x){ return x.id === s.store; }) ? s.store : 'ref';
  o.slots = {peq: !!(s.slots && s.slots.peq), almoco: !(s.slots && s.slots.almoco === false), jantar: !(s.slots && s.slots.jantar === false)};
  if (!o.slots.peq && !o.slots.almoco && !o.slots.jantar) o.slots.almoco = true;
  o.soup = {almoco: !(s.soup && s.soup.almoco === false), jantar: !(s.soup && s.soup.jantar === false)};
  o.plan = (s.plan && typeof s.plan === 'object') ? s.plan : {};
  o.example = !!s.example;
  o.acceptedSig = typeof s.acceptedSig === 'string' ? s.acceptedSig : null;
  o.eanMap = (s.eanMap && typeof s.eanMap === 'object') ? s.eanMap : {};
  o.recipes = Array.isArray(s.recipes) ? s.recipes : d.recipes;
  /* receitas da app que ainda não foram editadas passam para a versão corrigida (proteína) */
  o.recipes = o.recipes.map(function(r){
    var nb = null;
    RECIPES.forEach(function(x){ if (x.id === r.id) nb = x; });
    return (nb && typeof LEGACY_ING !== 'undefined' && LEGACY_ING[r.id] === JSON.stringify(r.ing)) ? clone(nb) : r;
  });
  /* receitas da app que o utilizador ainda não viu entram uma vez; as que apagou não voltam */
  var seen = Array.isArray(s.builtinsSeen) ? s.builtinsSeen : (Array.isArray(s.recipes) ? BUILTIN_V1.slice() : RECIPES.map(function(r){ return r.id; }));
  var have = {};
  o.recipes.forEach(function(r){ have[r.id] = true; });
  RECIPES.forEach(function(r){
    if (seen.indexOf(r.id) < 0 && !have[r.id]) o.recipes.push(clone(r));
  });
  o.builtinsSeen = RECIPES.map(function(r){ return r.id; });
  o.tier = (s.tier === 1 || s.tier === 2 || s.tier === 3) ? s.tier : 'all';
  o.customIngs = Array.isArray(s.customIngs) ? s.customIngs : [];
  o.prices = (s.prices && typeof s.prices === 'object') ? s.prices : {};
  var sh = s.shop || {};
  o.shop = {have: sh.have || {}, bought: sh.bought || {}, extras: Array.isArray(sh.extras) ? sh.extras : []};
  o.savedAt = Number(s.savedAt) || 0;
  /* uma sopa que ficou num prato principal passa para a sua linha */
  Object.keys(o.plan).forEach(function(k){
    var parts = k.split('-'), rr = recById(o, o.plan[k]);
    if (parts.length !== 2 || parts[1] === 'peq' || !rr || rr.cat !== 'sopa') return;
    var sk = soupKey(parts[0], parts[1]);
    if (!o.plan[sk]){ o.plan[sk] = o.plan[k]; delete o.plan[k]; }
  });
  return o;
}

/* ---------- faturas (PDF com texto): leitura das linhas ---------- */
var INV_STORES = [
  {re: /PINGO\s*DOCE/i, id: 'pingodoce'}, {re: /CONTINENTE/i, id: 'continente'}, {re: /AUCHAN/i, id: 'auchan'},
  {re: /\bLIDL\b/i, id: 'lidl'}, {re: /MERCADONA/i, id: 'mercadona'}
];
function invoiceStore(text){
  for (var i = 0; i < INV_STORES.length; i++) if (INV_STORES[i].re.test(text)) return INV_STORES[i].id;
  return null;
}
function invNum(s){ return Number(String(s).replace(/\./g, '').replace(',', '.')); }

/* lê as linhas de artigos de uma fatura (texto extraído do PDF).
   Devolve: loja, artigos {nome, total (preço de tabela da linha), unit (preço unitário ou por kg), peso (true se vendido a peso), qtd, desconto}
   e os totais que vêm na fatura, para verificar a leitura. */
function parseInvoice(text){
  var store = invoiceStore(text), lines = String(text || '').split(/\r?\n/).map(function(l){ return l.trim(); }).filter(Boolean);
  var start = 0;
  for (var k = 0; k < lines.length; k++){
    if (/Artigos$|DESCRI[CÇ][AÃ]O\s+VALOR/i.test(lines[k])){ start = k + 1; break; }
  }
  var items = [], pending = null, last = null, ended = false, paidTotal = null, regularTotal = null;
  var reQtyLine = /^(\d+)\s*X\s*(\d+,\d{2})\s+(\d+,\d{2})$/i;
  for (var i = start; i < lines.length && !ended; i++){
    var l = lines[i], m;
    if ((m = /^TOTAL\s+A\s+PAGAR\s+(-?[\d.]+,\d{2})/i.exec(l))){ paidTotal = invNum(m[1]); ended = true; break; }
    if ((m = /^TOTAL\s+(-?[\d.]+,\d{2})\s*$/i.exec(l))){ regularTotal = invNum(m[1]); ended = true; break; }
    if (/^TOTAL/i.test(l)){ ended = true; break; }
    if (/(POUPAN|DESCONTO)/i.test(l)){            /* descontos: já estão descontados no preço da linha */
      var dv = /(-?\d+,\d{2})\)?\s*$/.exec(l);
      if (last && dv) last.desconto += Math.abs(invNum(dv[1]));
      continue;
    }
    if (/ACUMULA/i.test(l)) continue;             /* pontos de cartão: não são desconto no preço */
    if (pending && (m = reQtyLine.exec(l))){
      pending.qtd = Number(m[1]); pending.unit = invNum(m[2]); pending.total = invNum(m[3]);
      items.push(pending); last = pending; pending = null; continue;
    }
    if ((m = /^([A-Z])\s+(.+?)\s+(\d+,\d{3})\s*X\s*(\d+,\d{2})\s+(\d+,\d{2})$/.exec(l))){      /* Pingo Doce, a peso */
      last = {nome: m[2], total: invNum(m[5]), unit: invNum(m[4]), peso: true, qtd: invNum(m[3]), desconto: 0};
      items.push(last); continue;
    }
    if ((m = /^([A-Z])\s+(.+?)\s+(\d+)\s*X\s*(\d+,\d{2})\s+(\d+,\d{2})$/.exec(l))){           /* Pingo Doce, unidades */
      last = {nome: m[2], total: invNum(m[5]), unit: invNum(m[4]), peso: false, qtd: Number(m[3]), desconto: 0};
      items.push(last); continue;
    }
    if ((m = /^(?:[A-Z]|\((?:A|B|C)\))\s+(.+?)\s+(-?\d+,\d{2})$/.exec(l))){                   /* linha com preço */
      last = {nome: m[1], total: invNum(m[2]), unit: invNum(m[2]), peso: false, qtd: 1, desconto: 0};
      items.push(last); continue;
    }
    if ((m = /^\((?:A|B|C)\)\s+(.+?)$/.exec(l))){                                             /* nome com quantidade na linha seguinte */
      if (pending) items.push(pending);
      pending = {nome: m[1], total: null, unit: null, peso: false, qtd: 1, desconto: 0};
      continue;
    }
  }
  if (pending) items.push(pending);
  /* o Continente mostra o preço já descontado: o preço de tabela é a linha + descontos */
  items.forEach(function(it){
    it.nome = it.nome.replace(/\s+/g, ' ').trim();
    if (store === 'continente' && it.total != null && it.desconto){
      it.total = Math.round((it.total + it.desconto) * 100) / 100;
      if (it.qtd > 1) it.unit = Math.round(it.total / it.qtd * 100) / 100;
    }
    it.pago = it.total == null ? null : Math.round((it.total - it.desconto) * 100) / 100;
  });
  var soma = items.reduce(function(a, it){ return a + (it.total || 0); }, 0);
  var somaPaga = items.reduce(function(a, it){ return a + (it.pago || 0); }, 0);
  var ref = regularTotal != null ? regularTotal : paidTotal;
  var base = regularTotal != null ? soma : somaPaga;
  var check = ref == null ? null : Math.abs(base - ref) < 0.02;
  return {store: store, items: items, paidTotal: paidTotal, regularTotal: regularTotal,
          soma: Math.round(soma * 100) / 100, somaPaga: Math.round(somaPaga * 100) / 100, check: check};
}

/* tamanho da embalagem indicado no nome do produto: "250G", "1KG", "500ML", "24U" → {qtd, un} em g, ml ou unidades */
function invoiceSize(nome){
  var re = /(\d+(?:[.,]\d+)?)\s*(KG|G|ML|CL|LT|L|UN|U)(?![A-Za-z])/gi, m, last = null;
  while ((m = re.exec(nome))) last = m;
  if (!last) return null;
  var q = Number(last[1].replace(',', '.')), u = last[2].toUpperCase();
  if (u === 'KG') return {qtd: q * 1000, un: 'g'};
  if (u === 'G') return {qtd: q, un: 'g'};
  if (u === 'L' || u === 'LT') return {qtd: q * 1000, un: 'ml'};
  if (u === 'CL') return {qtd: q * 10, un: 'ml'};
  if (u === 'ML') return {qtd: q, un: 'ml'};
  return {qtd: q, un: 'un'};
}

/* preço da embalagem da app (ing.pack) a partir de uma linha da fatura. null = não dá para calcular sozinho */
function packPriceFromInvoice(item, ing){
  if (!item || item.unit == null || !ing) return null;
  if (ing.u === 'un'){
    if (item.peso) return null;
    var su = invoiceSize(item.nome);
    if (su && su.un === 'un') return round2(item.unit * ing.pack / su.qtd);
    if (su) return null;
    return round2(item.unit * ing.pack);           /* sem tamanho no nome: assume uma unidade por linha */
  }
  if (item.peso) return round2(item.unit * ing.pack / 1000);   /* preço por kg (ou por litro) */
  var s = invoiceSize(item.nome);
  if (!s || s.un !== ing.u) return null;
  return round2(item.unit * ing.pack / s.qtd);
}

/* palavras genéricas que não bastam para associar um produto a um ingrediente (cor, tipo de carne, etc.) */
var MATCH_GENERIC = ['verde','branco','branca','preto','preta','natural','fresco','fresca','carne','frango','porco','vaca','peixe','pao','massa','sumo','pure','misto','mini','grande','pequeno','classico','tradicional','extra','bio'];
/* sugestão de ingrediente para uma linha da fatura: só se houver pelo menos uma palavra específica em comum */
function matchInvoiceIngredient(nome, st){
  var words = norm(nome).split(/[^a-z0-9]+/).filter(function(w){ return w.length >= 3; });
  var best = null, bestN = 0;
  allIngs(st).forEach(function(i){
    var iw = norm(i.nome).split(/[^a-z0-9]+/).filter(function(w){ return w.length >= 3; });
    var common = iw.filter(function(w){ return words.indexOf(w) >= 0 && MATCH_GENERIC.indexOf(w) < 0; });
    if (common.length > bestN){ bestN = common.length; best = i; }
  });
  return bestN > 0 ? best : null;
}

/* texto de um PDF (pdf.js): as linhas são reconstruídas pela posição vertical do texto */
function textItemsToLines(items){
  var its = items.filter(function(i){ return i.str && i.str.trim(); }).map(function(i){
    return {s: i.str, x: i.transform[4], y: i.transform[5], w: i.width || 0, h: Math.abs(i.height || i.transform[3] || 8)};
  });
  its.sort(function(a, b){ return (b.y - a.y) || (a.x - b.x); });
  var lines = [], cur = null;
  its.forEach(function(it){
    if (!cur || Math.abs(it.y - cur.y) > it.h * 0.5){ cur = {y: it.y, items: []}; lines.push(cur); }
    cur.items.push(it);
  });
  return lines.map(function(ln){
    ln.items.sort(function(a, b){ return a.x - b.x; });
    var out = '', prevEnd = null;
    ln.items.forEach(function(it){
      if (prevEnd !== null && it.x - prevEnd > it.h * 0.2) out += ' ';
      out += it.s; prevEnd = it.x + it.w;
    });
    return out.replace(/\s+/g, ' ').trim();
  }).join('\n');
}
function pdfToText(lib, data){
  return lib.getDocument({data: data}).promise.then(function(doc){
    var n = 0;
    return Array.from({length: doc.numPages}, function(_, k){ return k + 1; }).reduce(function(acc, p){
      return acc.then(function(out){
        return doc.getPage(p).then(function(pg){ return pg.getTextContent(); })
          .then(function(c){ return out + '\n' + textItemsToLines(c.items); });
      });
    }, Promise.resolve(''));
  });
}

/* quantidade comprada numa linha da fatura, na unidade base (g, ml ou un) */
function invBase(qtd, qu){
  var q = Number(qtd) || 0;
  if (qu === 'kg') return {q: q * 1000, un: 'g'};
  if (qu === 'g')  return {q: q, un: 'g'};
  if (qu === 'l')  return {q: q * 1000, un: 'ml'};
  if (qu === 'ml') return {q: q, un: 'ml'};
  return {q: q, un: 'un'};
}
/* preço por unidade base (por un, g ou ml) */
function invPerUnit(total, qtd, qu){
  var b = invBase(qtd, qu);
  return (total == null || !(b.q > 0)) ? null : total / b.q;
}
/* preço da embalagem do ingrediente a partir do que foi comprado; null se as unidades não coincidirem */
function invPackPrice(total, qtd, qu, ing){
  if (!ing || total == null) return null;
  var b = invBase(qtd, qu);
  if (!(b.q > 0) || b.un !== ing.u) return null;
  return round2(total / b.q * ing.pack);
}
/* quantidade e unidade por defeito, a partir do nome e do peso da linha */
function invDefaultQty(it){
  var s = invoiceSize(it.nome);
  if (s){
    var k = (!it.peso && it.qtd > 0) ? it.qtd : 1;
    return {qtd: s.qtd * k, qu: s.un === 'un' ? 'un' : s.un};
  }
  if (it.peso) return {qtd: it.qtd, qu: 'kg'};
  return {qtd: (it.qtd > 0 ? it.qtd : 1), qu: 'un'};
}
/* nome para um ingrediente novo: sem o tamanho e com a primeira letra maiúscula */
function invCleanName(nome){
  var s = String(nome).replace(/\s*\d+(?:[.,]\d+)?\s*(KG|G|ML|CL|LT|L|UN|U)(?![A-Za-z])/gi, '').replace(/\s+/g, ' ').trim().toLowerCase();
  return s.charAt(0).toUpperCase() + s.slice(1);
}

/* usa as linhas da IA no mesmo formato da leitura básica, e confere com os totais da fatura */
function aplicaIA(r0, ia){
  var items = ia.linhas.map(function(l){
    return {nome: String(l.nome || '').trim(), total: Number(l.precoLinha) || 0, desconto: 0,
            peso: l.unidade === 'kg', qtd: Number(l.quantidade) || 1, qu: l.unidade || 'un', unit: null, qtdLinha: 1, pago: null};
  }).filter(function(it){ return it.nome && it.total > 0; });
  var soma = Math.round(items.reduce(function(a, it){ return a + it.total; }, 0) * 100) / 100;
  var refs = [r0.regularTotal, r0.paidTotal].filter(function(v){ return v != null; });
  var check = refs.length ? refs.some(function(v){ return Math.abs(v - soma) < 0.02; }) : null;
  return {store: invoiceStore(String(ia.loja || '')) || r0.store, items: items, paidTotal: r0.paidTotal,
          regularTotal: r0.regularTotal, soma: soma, somaPaga: soma, check: check};
}
/* app.js — interface de A Mãe é que Sabe. Usa data.js e core.js. */
(function(){
'use strict';

var S = normalizeState(loadLocal());
rebuildIngIndex(S);

var VIEW = 'semana';
var UI = {rq: '', rc: 'all', rt: 'all', rfit: false, pq: '', sug: false, pk: {q: '', cat: 'all', t: 'all', fit: false}};
var SH = null;          /* folha aberta: {type, ...} */
var ED = null;          /* rascunho do editor de receitas */
var NI = null;          /* rascunho de novo ingrediente */
var SC = null;          /* leitura de etiqueta: {step, busy, ...} */
var ZXING_URL = 'https://unpkg.com/@zxing/library@0.21.3/umd/index.min.js';
var TESS_URL = 'https://cdnjs.cloudflare.com/ajax/libs/tesseract.js/5.1.1/tesseract.min.js';
var lastFocus = null, toastTimer = null;
var SB = null, SESSION = null, LOGIN = {email: '', sent: false}, AUTH_READY = false;
var FAT = null;     /* leitura de fatura em curso: {step, busy, store, items, msg, check, ...} */
var REMOTE = {ready: false, busy: false, dirty: false, timer: null, pending: false, ch: null, base: 0, note: '', wantToast: false};

function $(s, r){ return (r || document).querySelector(s); }
function $$(s, r){ return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
function esc(s){
  return String(s == null ? '' : s).replace(/[&<>"']/g, function(c){
    return {'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'}[c];
  });
}
function num2(x){ return (Math.round(x * 100) / 100).toFixed(2).replace('.', ','); }
function plural(n, one, many){ return n === 1 ? one : many; }

/* ---------- guardar e sincronizar (Supabase: uma casa, login com email e palavra-passe) ---------- */
var BACKUP_KEY = 'budgetchef.backup', UNSYNC_KEY = 'budgetchef.unsynced';
var PENDING_REMOTE = null;          /* alteração da casa recebida enquanto um campo estava ativo */
var PASS_RECOVERY = false;          /* veio do link "esqueci-me da palavra-passe" */

function loadLocal(){
  try { var raw = localStorage.getItem(LS_KEY); if (raw) return JSON.parse(raw); } catch (e) {}
  return null;
}
function saveLocal(){
  try { localStorage.setItem(LS_KEY, JSON.stringify(S)); } catch (e) {}
}
/* "não enviado": há alterações neste dispositivo que ainda não chegaram ao Supabase */
function isUnsynced(){ try { return localStorage.getItem(UNSYNC_KEY) === '1'; } catch (e) { return false; } }
function markUnsynced(v){ try { if (v) localStorage.setItem(UNSYNC_KEY, '1'); else localStorage.removeItem(UNSYNC_KEY); } catch (e) {} }
function backupLocal(){
  try { localStorage.setItem(BACKUP_KEY, JSON.stringify({at: Date.now(), state: S})); } catch (e) {}
}
/* cada alteração fica guardada neste dispositivo e marcada como "por guardar";
   e segue para a casa automaticamente (scheduleAutoSave) */
function persist(){
  S.savedAt = Date.now();
  saveLocal();
  markUnsynced(true);
  renderSync();
  scheduleAutoSave();
}
/* gravação automática: meio segundo depois da última alteração, sem botões */
var AUTOSAVE_TIMER = null;
function scheduleAutoSave(){
  if (!SESSION || !REMOTE.ready) return;      /* sem ligação: fica por enviar e sai quando a ligação voltar */
  clearTimeout(AUTOSAVE_TIMER);
  AUTOSAVE_TIMER = setTimeout(function(){ AUTOSAVE_TIMER = null; pushSafe(); }, 500);
}
function setSync(mode, txt){
  REMOTE.note = txt || '';
  renderSync();
}
function renderSync(){
  var el = $('#sync');
  if (!el) return;
  var sheetBtn = '<button type="button" class="linkbtn" data-act="login-open">' + (SESSION ? 'Casa e dados' : 'Partilhar com a casa') + '</button>';
  var note = REMOTE.note ? '<br><span>' + esc(REMOTE.note) + '</span>' : '';
  if (!SB || !SESSION){
    el.innerHTML = sheetBtn + note;
    return;
  }
  var status;
  if (!REMOTE.ready) status = '<span>' + esc(REMOTE.note || 'A ligar…') + '</span>';
  else if (REMOTE.note && REMOTE.note.indexOf('Sem ligação') === 0) status = '<span>' + esc(REMOTE.note) + '</span>';
  else if (isUnsynced()) status = '<span>A guardar…</span>';
  else status = '<span>Guardado na casa</span>';
  el.innerHTML = status + ' <button type="button" class="linkbtn" data-act="casa-atualizar">Atualizar</button><br>' + sheetBtn;
}
/* botão Atualizar: lê a casa e aplica a versão mais recente (só se não houver alterações por guardar) */
function refreshCasa(){
  if (!SESSION){ openSheet({type: 'login'}); return; }
  if (isUnsynced()){ toast('Ainda estou a enviar as tuas alterações. Tenta daqui a uns segundos.'); return; }
  SB.from('casa').select('state,saved_at').eq('id', 'casa').maybeSingle().then(function(res){
    if (res.error) throw res.error;
    var row = res.data;
    if (!row || !row.state){ toast('A casa ainda não tem dados guardados.'); return; }
    if ((row.saved_at || 0) > (S.savedAt || 0)){
      applyRemote(row.state, row.saved_at);
      toast('Atualizado com a versão da casa.');
    } else {
      toast('Já tens a versão mais recente.');
    }
  }).catch(function(err){ toast(syncErr(err)); });
}
/* envia para a casa, mas primeiro verifica se a casa tem uma versão mais recente:
   se tiver, não a sobrescreve (as alterações deste dispositivo ficam numa cópia de segurança) */
function pushSafe(){
  if (!SESSION || !REMOTE.ready) return;
  if (REMOTE.busy){ REMOTE.dirty = true; return; }
  SB.from('casa').select('state,saved_at').eq('id', 'casa').maybeSingle().then(function(res){
    if (res.error) throw res.error;
    var row = res.data;
    if (row && row.state && (row.saved_at || 0) > (REMOTE.base || 0)){
      backupLocal();
      markUnsynced(false);
      applyRemote(row.state, row.saved_at);
      toast('A casa tinha alterações mais recentes. As tuas ficaram numa cópia de segurança (Casa e dados).');
      return;
    }
    pushRemote();
  }).catch(function(err){ setSync('local', syncErr(err)); });
}
function pushRemote(){
  if (!REMOTE.ready || !SESSION) return;
  if (REMOTE.busy){ REMOTE.dirty = true; return; }
  REMOTE.busy = true;
  var at = S.savedAt || Date.now();
  var row = {id: 'casa', state: clone(S), saved_at: at, updated_by: SESSION.user.email};
  SB.from('casa').upsert(row).then(function(res){
    if (res.error){ setSync('local', syncErr(res.error)); return; }
    REMOTE.base = Math.max(REMOTE.base || 0, at);
    if (S.savedAt === at) markUnsynced(false);   /* se houve edições entretanto, continuam marcadas */
    setSync('cloud', 'Guardado na casa');
  }).catch(function(err){ setSync('local', syncErr(err)); })
  .then(function(){
    REMOTE.busy = false;
    if (REMOTE.dirty){ REMOTE.dirty = false; pushSafe(); }
  });
}
function applyRemote(state, savedAt){
  var el = document.activeElement;
  if (el && /^(INPUT|SELECT|TEXTAREA)$/.test(el.tagName)){ PENDING_REMOTE = {state: state, savedAt: savedAt}; return; }
  S = normalizeState(clone(state));
  S.savedAt = savedAt;
  REMOTE.base = savedAt;
  rebuildIngIndex(S);
  saveLocal();
  render();
}
/* a casa tem uma versão mais recente: se este dispositivo tinha alterações por enviar, guarda-as primeiro */
function reconcile(row){
  var localAt = S.savedAt || 0, remoteAt = row ? (row.saved_at || 0) : 0;
  if (!row || !row.state){ pushRemote(); return; }
  if (remoteAt > localAt){
    if (isUnsynced()){
      backupLocal();
      toast('Havia alterações neste dispositivo que ainda não tinham sido enviadas. Ficaram numa cópia de segurança.');
    }
    markUnsynced(false);
    applyRemote(row.state, remoteAt);
  } else if (localAt > remoteAt){
    pushRemote();
  }
}
function pullRemote(){
  return SB.from('casa').select('state,saved_at').eq('id', 'casa').maybeSingle().then(function(res){
    if (res.error) throw res.error;
    reconcile(res.data);
  });
}
function subscribeRemote(){
  if (REMOTE.ch) return;
  REMOTE.ch = SB.channel('casa-live').on('postgres_changes',
    {event: '*', schema: 'public', table: 'casa', filter: 'id=eq.casa'},
    function(p){
      var row = p.new;
      if (!row || !row.state || REMOTE.busy || REMOTE.timer) return;
      if (row.updated_by === (SESSION && SESSION.user.email) && row.saved_at === S.savedAt) return;
      if ((row.saved_at || 0) > (S.savedAt || 0)){
        if (isUnsynced()) return;           /* há alterações locais a caminho: a gravação verifica a casa antes de enviar */
        applyRemote(row.state, row.saved_at);
      }
    }).subscribe();
}
function startSync(){
  if (REMOTE.starting || REMOTE.ready) return;
  REMOTE.starting = true;
  setSync('off', 'A ligar…');
  pullRemote().then(function(){
    REMOTE.ready = true; REMOTE.starting = false;
    REMOTE.base = Math.max(REMOTE.base || 0, S.savedAt || 0);
    setSync('cloud');
    subscribeRemote();
    if (isUnsynced()) pushSafe();
    if (SH && SH.type === 'login') renderSheet(false);
  }).catch(function(err){
    REMOTE.starting = false; REMOTE.ready = false;
    setSync('local', syncErr(err));
  });
}
function stopSync(){
  REMOTE.ready = false; REMOTE.starting = false;
  if (REMOTE.ch && SB){ SB.removeChannel(REMOTE.ch); REMOTE.ch = null; }
}
function initRemote(){
  var cfg = window.BC_CONFIG || {};
  if (!window.supabase || !cfg.SUPABASE_URL || /COLOCA/.test(cfg.SUPABASE_URL)){ AUTH_READY = true; setSync('local'); render(); return; }
  SB = window.supabase.createClient(cfg.SUPABASE_URL, cfg.SUPABASE_ANON_KEY, {auth: {persistSession: true, detectSessionInUrl: true}});
  SB.auth.onAuthStateChange(function(ev, s){
    if (ev === 'PASSWORD_RECOVERY'){ PASS_RECOVERY = true; SESSION = s || null; AUTH_READY = true; render(); return; }
    var was = SESSION;
    SESSION = s || null;
    AUTH_READY = true;
    if (SESSION && !was) startSync();
    if (!SESSION){ stopSync(); setSync('local'); }
    if (!!was !== !!SESSION) render();
    if (SH && SH.type === 'login') renderSheet(false);
  });
  SB.auth.getSession().then(function(r){
    SESSION = r.data.session || null;
    AUTH_READY = true;
    if (SESSION) startSync(); else setSync('local');
    render();
  }, function(){ AUTH_READY = true; setSync('local'); render(); });
}
/* motivo legível de uma falha de sincronização (para o utilizador perceber o que fazer) */
function syncErr(err){
  var m = (err && (err.message || err.details || err.hint)) || '';
  var code = (err && err.code) || '';
  if (code === '42501' || /row-level security|permission denied/i.test(m)) return 'Esta conta não está na lista da casa (allowed_emails).';
  if (code === 'PGRST205' || /relation .* does not exist|could not find the table/i.test(m)) return 'A base de dados ainda não tem as tabelas. Falta correr supabase-schema.sql.';
  if (/invalid api key|jwt|apikey/i.test(m)) return 'A chave do Supabase em config.js não está correta.';
  if (/failed to fetch|networkerror|load failed|network/i.test(m)) return 'Sem ligação à internet ou ao Supabase. Guardado neste dispositivo.';
  return 'Erro do Supabase: ' + (m || 'sem detalhe') + '. Guardado neste dispositivo.';
}
/* mensagens de erro do Supabase, em português */
function authError(err){
  var m = (err && err.message) || '';
  if (/invalid login/i.test(m)) return 'Email ou palavra-passe incorretos.';
  if (/rate limit|too many/i.test(m)) return 'Muitas tentativas. Espera uns minutos.';
  if (/password/i.test(m) && /6|short|weak/i.test(m)) return 'A palavra-passe tem de ter pelo menos 6 caracteres.';
  return 'Não consegui concluir. Tenta outra vez.';
}
function signIn(){
  var em = (LOGIN.email || '').trim(), pw = LOGIN.pass || '';
  if (!SB){ toast('A ligação à casa não está configurada.'); return; }
  if (!/^\S+@\S+\.\S+$/.test(em)){ toast('Escreve um email válido.'); return; }
  if (!pw){ toast('Escreve a palavra-passe.'); return; }
  LOGIN.msg = 'A entrar…'; refreshLogin();
  SB.auth.signInWithPassword({email: em, password: pw}).then(function(r){
    LOGIN.pass = ''; LOGIN.msg = '';
    if (r.error){ LOGIN.msg = authError(r.error); refreshLogin(); return; }
    toast('Entraste na casa.');
  });
}
function resetPassword(){
  var em = (LOGIN.email || '').trim();
  if (!SB){ toast('A ligação à casa não está configurada.'); return; }
  if (!/^\S+@\S+\.\S+$/.test(em)){ toast('Escreve o email primeiro.'); return; }
  SB.auth.resetPasswordForEmail(em, {redirectTo: location.href.split('#')[0]}).then(function(){
    LOGIN.msg = 'Se o email estiver autorizado, recebes um link para definir a palavra-passe.';
    refreshLogin();
  });
}
function setNewPassword(){
  var pw = LOGIN.novaPass || '';
  if (pw.length < 6){ toast('A palavra-passe tem de ter pelo menos 6 caracteres.'); return; }
  SB.auth.updateUser({password: pw}).then(function(r){
    if (r.error){ toast(authError(r.error)); return; }
    LOGIN.novaPass = ''; PASS_RECOVERY = false;
    toast('Palavra-passe definida.');
    closeSheet(); render();
  });
}
function logout(){
  if (!SB) return;
  SB.auth.signOut().then(function(){
    SESSION = null; stopSync(); setSync('local');
    refreshLogin(); toast('Saíste da casa.');
  });
}
/* cópia de segurança: exportar o estado deste dispositivo, importar um ficheiro, restaurar a cópia local */
function exportData(){
  var blob = new Blob([JSON.stringify({app: 'A Mãe é que Sabe', exportado: new Date().toISOString(), state: S}, null, 2)], {type: 'application/json'});
  var a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'a-mae-que-sabe-' + new Date().toISOString().slice(0, 10) + '.json';
  document.body.appendChild(a); a.click();
  setTimeout(function(){ URL.revokeObjectURL(a.href); a.remove(); }, 1000);
}
function importData(file){
  if (!file) return;
  file.text().then(function(txt){
    var j = JSON.parse(txt), st = j && j.state ? j.state : j;
    if (!st || !Array.isArray(st.recipes)) throw new Error('formato');
    S = normalizeState(clone(st)); rebuildIngIndex(S);
    persist(); closeSheet(); render();
    toast('Dados importados e enviados para a casa.');
  }).catch(function(){ toast('Este ficheiro não é uma cópia válida da app.'); });
}
function restoreBackup(){
  var raw; try { raw = localStorage.getItem(BACKUP_KEY); } catch (e) {}
  if (!raw){ toast('Não há cópia de segurança neste dispositivo.'); return; }
  var b = JSON.parse(raw);
  S = normalizeState(clone(b.state)); rebuildIngIndex(S);
  persist(); closeSheet(); render();
  toast('Cópia de segurança restaurada.');
}

/* ---------- datas ---------- */
function weekDates(){
  var t = new Date(), dow = (t.getDay() + 6) % 7;
  var add = dow >= 5 ? 7 - dow : -dow, out = [];
  for (var i = 0; i < 7; i++) out.push(new Date(t.getFullYear(), t.getMonth(), t.getDate() + add + i));
  return out;
}
function weekLabel(){
  var w = weekDates(), a = w[0], b = w[6];
  return a.getDate() + (a.getMonth() !== b.getMonth() ? ' ' + MESES[a.getMonth()] : '') + ' – ' + b.getDate() + ' ' + MESES[b.getMonth()];
}

/* ---------- auxiliares de apresentação ---------- */
function storeObj(id){
  for (var i = 0; i < STORES.length; i++) if (STORES[i].id === (id || S.store)) return STORES[i];
  return STORES[0];
}
function catName(id){
  for (var i = 0; i < RECIPE_CATS.length; i++) if (RECIPE_CATS[i].id === id) return RECIPE_CATS[i].nome;
  return '';
}
function fitState(perDose){
  var cap = budgetPerDose(S);
  if (cap <= 0) return 'bad';
  return perDose <= cap + 1e-9 ? 'ok' : 'warn';
}
function sticker(perDose){
  return '<span class="sticker">' + num2(perDose) + '<small>€/dose</small></span>';
}
function dayName(id){ for (var i = 0; i < DAYS.length; i++) if (DAYS[i].id === id) return DAYS[i].nome; return ''; }
function slotName(id){ for (var i = 0; i < SLOTS.length; i++) if (SLOTS[i].id === id) return SLOTS[i].nome; return ''; }
function unitPriceLabel(ing, packPriceV){
  var per = packPriceV / ing.pack;
  if (ing.u === 'g')  return eur(per * 1000) + '/kg';
  if (ing.u === 'ml') return eur(per * 1000) + '/l';
  return eur(per) + '/un';
}
function toast(msg){
  var t = $('#toast');
  t.textContent = msg; t.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(function(){ t.hidden = true; }, 2600);
}

function tierChips(act, cur){
  var h = '<div class="chips" role="group" aria-label="Nível de preço">';
  h += '<button type="button" class="chip" data-act="' + act + '" data-v="all" aria-pressed="' + (String(cur) === 'all') + '">Todos os preços</button>';
  TIERS.forEach(function(t){
    h += '<button type="button" class="chip" data-act="' + act + '" data-v="' + t.n + '" aria-pressed="' + (String(cur) === String(t.n)) + '"><span class="mono">' + t.sym + '</span> ' + t.nome + '</button>';
  });
  return h + '</div>';
}

/* ---------- vista: Semana ---------- */
function mealRow(d, s, kind){
  var soup = kind === 'sopa', key = soup ? soupKey(d.id, s.id) : planKey(d.id, s.id);
  var rid = S.plan[key], rec = rid ? recById(S, rid) : null;
  var label = soup ? 'Sopa de entrada' : s.curto, who = d.nome + ', ' + label;
  var h = '<div class="meal' + (soup ? ' is-soup' : '') + '"><button type="button" class="meal-main' + (rec ? '' : ' is-empty') + '" data-act="pick" data-day="' + d.id + '" data-slot="' + s.id + '" data-kind="' + kind + '" aria-label="' + (rec ? 'Mudar receita: ' + esc(rec.nome) : 'Escolher receita') + ' (' + esc(who) + ')">' +
       '<span class="meal-t"><span class="slot-l">' + label + '</span>';
  if (rec){
    var c = recipeCalc(rec, S, S.store, S.people);
    h += '<span class="meal-n">' + esc(rec.nome) + '</span></span>' + sticker(c.perDose) + '<span class="chev" aria-hidden="true">&rsaquo;</span></button>' +
         '<button type="button" class="linkbtn" data-act="open-recipe" data-id="' + esc(rec.id) + '" aria-label="Ver receita: ' + esc(rec.nome) + '">Ver receita</button>' +
         '<button type="button" class="x" data-act="unplan" data-key="' + key + '" aria-label="Remover ' + esc(rec.nome) + '">&times;</button>';
  } else {
    h += '<span class="meal-n empty-n">' + (soup ? 'Escolher sopa' : 'Escolher receita') + '</span></span><span class="chev" aria-hidden="true">&rsaquo;</span></button>';
  }
  return h + '</div>';
}

function viewSemana(){
  var sm = planSummary(S), cap = budgetPerDose(S), diff = S.budget - sm.cost;
  var pct = S.budget > 0 ? Math.min(100, Math.round(sm.cost / S.budget * 100)) : (sm.cost > 0 ? 100 : 0);
  var state = diff < -0.005 ? 'bad' : (S.budget > 0 && sm.cost > S.budget * 0.9 ? 'warn' : 'ok');
  var dates = weekDates(), slots = activeSlots(S), h = '';

  h += '<div class="vh"><h1 class="h2">Semana</h1><span class="muted mono">' + weekLabel() + '</span></div>';
  if (S.example){
    h += '<div class="banner" role="note"><span>Esta é uma semana de exemplo. Muda as refeições ou limpa a semana para começares do zero.</span>' +
         '<button type="button" class="btn ghost sm" data-act="dismiss-example">Entendi</button></div>';
  }
  h += '<div class="stack">';
  h += '<section class="card sum" aria-label="Custo da semana">' +
       '<div class="eyebrow">Food cost da semana</div>' +
       '<div style="margin-top:8px"><span class="big">' + eur(sm.cost) + '</span><span class="of">de ' + eur(S.budget) + '</span></div>' +
       '<div class="bar ' + state + '" role="img" aria-label="' + pct + '% do orçamento"><i style="width:' + pct + '%"></i></div>';
  if (sm.count === 0){
    h += '<div class="verdict">Ainda sem refeições planeadas.</div>';
  } else if (diff < -0.005){
    h += '<div class="verdict bad">Excede o orçamento em ' + eur(-diff) + '.</div>';
  } else {
    h += '<div class="verdict ' + state + '">Sobram ' + eur(diff) + ' do orçamento.</div>';
  }
  h += '<div class="stats">' +
       '<div class="stat"><div class="k">Refeições</div><div class="v">' + sm.count + '/' + sm.total + '</div></div>' +
       '<div class="stat"><div class="k">Custo médio/<wbr>dose</div><div class="v">' + eur(sm.perDoseAvg) + '</div></div>' +
       '<div class="stat"><div class="k">Orçamento/<wbr>dose</div><div class="v">' + eur(cap) + '</div></div>' +
       '</div></section>';

  h += '<div class="row wrap"><span class="lbl" style="margin:0">Refeições</span>';
  SLOTS.forEach(function(s){
    h += '<button type="button" class="chip" data-act="slot" data-slot="' + s.id + '" aria-pressed="' + !!S.slots[s.id] + '">' + s.nome + '</button>';
  });
  h += '</div>';
  if (slots.some(function(s){ return s.id !== 'peq'; })){
    h += '<div class="row wrap"><span class="lbl" style="margin:0">Sopa de entrada</span>';
    slots.forEach(function(s){
      if (s.id !== 'peq') h += '<button type="button" class="chip" data-act="soup-toggle" data-slot="' + s.id + '" aria-pressed="' + !!S.soup[s.id] + '">' + s.curto + '</button>';
    });
    h += '</div>';
  }
  h += '<div class="stack" style="gap:6px"><span class="lbl" style="margin:0">Sugerir receitas</span>' + tierChips('tier-set', S.tier) + '</div>';
  h += '<div class="row wrap"><button type="button" class="btn pri" data-act="suggest">' +
       (UI.sug ? 'Toca outra vez para refazer a semana' : (sm.total && sm.count >= sm.total ? 'Refazer semana' : 'Sugerir semana')) + '</button>' +
       '<button type="button" class="btn" data-act="ai-plan"' + (IA_PLAN.busy ? ' disabled' : '') + '>' + (IA_PLAN.busy ? 'A IA está a planear…' : (IA_PLAN.confirmar ? 'Toca outra vez para refazer com IA' : 'Planear com IA')) + '</button>' +
       '<button type="button" class="btn" data-act="clear-week">Limpar semana</button></div>' +
       (IA_PLAN.nota ? '<p class="note">IA: ' + esc(IA_PLAN.nota) + '</p>' : '');
  var acc = weekAccepted(S);
  if (planEntries(S).length){
    h += acc ? '<div class="verdict ok" style="margin-bottom:12px">Semana aceite · a lista de compras está pronta.</div>'
             : '<div class="banner" role="note"><span>Semana por aceitar. Vê as refeições e aceita-a para gerar a lista de compras.</span><button type="button" class="btn pri sm" data-act="accept-week">Aceitar semana</button></div>';
  }
  h += '<p class="note">Toca numa refeição para escolher ou mudar a receita.</p>';

  DAYS.forEach(function(d, i){
    h += '<section class="card day"><div class="day-h"><h3>' + d.nome + '</h3><span class="dt">' + dates[i].getDate() + ' ' + MESES[dates[i].getMonth()] + '</span>' +
         '<span class="dc">' + (sm.perDay[d.id] > 0 ? eur(sm.perDay[d.id]) : '') + '</span></div>';
    slots.forEach(function(s){
      if (soupOn(S, s.id)) h += mealRow(d, s, 'sopa');
      h += mealRow(d, s, 'main');
    });
    h += '</section>';
  });
  h += '</div>';
  return h;
}

/* ---------- vista: Receitas ---------- */
function filteredRecipes(){
  var q = norm(UI.rq), cap = budgetPerDose(S);
  return S.recipes.filter(function(r){
    if (UI.rc !== 'all' && r.cat !== UI.rc) return false;
    if (q && norm(r.nome).indexOf(q) < 0) return false;
    return true;
  }).map(function(r){
    return {r: r, c: recipeCalc(r, S, S.store, S.people)};
  }).filter(function(o){
    return (!UI.rfit || o.c.perDose <= cap + 1e-9) && (UI.rt === 'all' || tierOf(o.c.perDose) === Number(UI.rt));
  }).sort(function(a, b){ return a.c.perDose - b.c.perDose; });
}
function recipeCards(){
  var rows = filteredRecipes(), rep = idsRepetidos();
  if (!rows.length) return '<div class="empty"><p>Nenhuma receita com estes filtros.</p></div>';
  return rows.map(function(o){
    var r = o.r, st = fitState(o.c.perDose);
    return '<button type="button" class="rcard" data-act="open-recipe" data-id="' + esc(r.id) + '">' +
      '<span class="rc-t"><span class="rc-name">' + esc(r.nome) + '</span>' +
      '<span class="rc-meta">' + tierHtml(tierOf(o.c.perDose)) + ' · ' + catName(r.cat) + ' · ' + r.tempo + ' min · ~' + Math.round(recipeNutri(r).prot) + ' g prot. · ' + eur(o.c.total) + ' para ' + S.people + '</span>' +
      (rep[r.id] ? '<span class="rc-meta"><b>Repetida</b> · abre a receita para apagar esta cópia</span>' : '') +
      '<span class="rc-fit"><i class="dot ' + st + '"></i>' + (st === 'ok' ? 'Cabe no orçamento por dose' : 'Acima da média do orçamento') + '</span></span>' +
      sticker(o.c.perDose) + '</button>';
  }).join('');
}
function viewReceitas(){
  var h = '<div class="vh"><h1 class="h2">Receitas</h1><button type="button" class="btn pri sm" data-act="new-recipe">Nova receita</button></div>';
  h += '<div class="stack"><input id="rSearch" class="inp" type="search" placeholder="Procurar receita" aria-label="Procurar receita" value="' + esc(UI.rq) + '">';
  h += '<div class="row wrap"><button type="button" class="btn sm" data-act="ai-recipe-open">Sugerir receita com IA</button></div>';
  h += '<div class="chips" role="group" aria-label="Filtros">';
  [{id: 'all', nome: 'Todas'}].concat(RECIPE_CATS).forEach(function(c){
    h += '<button type="button" class="chip" data-act="rc-cat" data-v="' + c.id + '" aria-pressed="' + (UI.rc === c.id) + '">' + c.nome + '</button>';
  });
  h += '<button type="button" class="chip" data-act="rc-fit" aria-pressed="' + UI.rfit + '">Cabem no orçamento</button></div>';
  h += tierChips('rt-set', UI.rt);
  h += '<p class="note">' + S.recipes.length + ' receitas · por custo por dose, para ' + S.people + ' ' + plural(S.people, 'pessoa', 'pessoas') + ' · preços: ' + esc(storeObj().curto) +
       '<br>€ até ' + num2(TIER_MAX[0]) + ' · €€ até ' + num2(TIER_MAX[1]) + ' · €€€ acima, por dose</p>';
  h += '<div class="list" id="rList">' + recipeCards() + '</div></div>';
  return h;
}

/* ---------- vista: Lista de compras ---------- */
function liRow(it){
  var u = it.ing.u, id = esc(it.ing.id);
  var buy = it.loose ? fmtQty(it.qty, u) : it.units + ' × ' + fmtQty(it.ing.pack, u);
  var sub = 'precisas ' + fmtQty(it.need, u) + ' · comprar ' + buy + (it.left >= (u === 'un' ? 0.5 : 1) ? ' · sobra ' + fmtQty(it.left, u) : '');
  var h = '<div class="li' + (it.bought && !it.have ? ' done' : '') + (it.have ? ' dim' : '') + '">';
  if (it.have) h += '<span></span>';
  else h += '<input type="checkbox" id="bc-' + id + '" data-act="bought" data-id="' + id + '"' + (it.bought ? ' checked' : '') + ' aria-label="Comprado: ' + esc(it.ing.nome) + '">';
  h += '<span><label class="li-name"' + (it.have ? '' : ' for="bc-' + id + '"') + '>' + esc(it.ing.nome) + '</label>' +
       '<span class="li-sub">' + sub + '</span>' +
       '<button type="button" class="linkbtn" data-act="have" data-id="' + id + '">' + (it.have ? 'Preciso de comprar' : 'Já tenho em casa') + '</button></span>' +
       '<span class="li-price">' + (it.have ? '—' : eur(it.cost)) + '</span></div>';
  return h;
}
function listText(sl){
  var lines = ['Lista de compras · ' + weekLabel() + ' · ' + storeObj().curto];
  CATS.forEach(function(c){
    var its = sl.items.filter(function(i){ return !i.have && i.ing.cat === c.id; })
      .sort(function(a, b){ return a.ing.nome.localeCompare(b.ing.nome, 'pt'); });
    if (!its.length) return;
    lines.push('', c.nome);
    its.forEach(function(i){
      var q = i.loose ? fmtQty(i.qty, i.ing.u) : i.units + ' × ' + fmtQty(i.ing.pack, i.ing.u);
      lines.push('- ' + i.ing.nome + ': ' + q + ' (' + eur(i.cost) + ')');
    });
  });
  if (S.shop.extras.length){
    lines.push('', 'Outros itens');
    S.shop.extras.forEach(function(e){ lines.push('- ' + e.nome + (e.preco ? ' (' + eur(e.preco) + ')' : '')); });
  }
  lines.push('', 'Total: ' + eur(sl.buy + sl.extras));
  return lines.join('\n');
}
function viewLista(){
  var h = '<div class="vh"><h1 class="h2">Lista de compras</h1><span class="muted mono">' + weekLabel() + '</span></div>';
  if (!weekAccepted(S)){
    var n = planEntries(S).length;
    h += '<div class="card empty"><p>' + (n ? 'A lista de compras só se gera depois de aceitares a semana. Vê as refeições e, se estiverem bem, aceita.' : 'A lista nasce das refeições da semana. Planeia algumas refeições para ver o que comprar.') + '</p>' +
         (n ? '<button type="button" class="btn pri" data-act="accept-week">Aceitar semana</button>' : '<button type="button" class="btn pri" data-act="go-semana">Ir para a Semana</button>') + '</div>';
    return h;
  }
  var sl = shoppingList(S, S.store);
  if (!sl.items.length && !S.shop.extras.length){
    h += '<div class="card empty"><p>A lista nasce das refeições da semana. Planeia algumas refeições para ver o que comprar.</p>' +
         '<button type="button" class="btn pri" data-act="go-semana">Ir para a Semana</button></div>';
    return h;
  }
  var pay = sl.buy + sl.extras, over = pay - S.budget;
  var pct = S.budget > 0 ? Math.min(100, Math.round(pay / S.budget * 100)) : 100;
  var state = over > 0.005 ? 'bad' : (pay > S.budget * 0.9 ? 'warn' : 'ok');
  var toBuy = sl.items.filter(function(i){ return !i.have; });
  var done = toBuy.filter(function(i){ return i.bought; }).length;

  h += '<div class="stack">';
  h += '<section class="card sum" aria-label="Total da compra"><div class="eyebrow">A pagar · ' + esc(storeObj().curto) + '</div>' +
       '<div style="margin-top:8px"><span class="big">' + eur(pay) + '</span><span class="of">de ' + eur(S.budget) + '</span></div>' +
       '<div class="bar ' + state + '" role="img" aria-label="' + pct + '% do orçamento"><i style="width:' + pct + '%"></i></div>';
  if (over > 0.005){
    h += '<div class="verdict ' + (sl.leftover >= over ? 'warn' : 'bad') + '">Pagas ' + eur(over) + ' acima do orçamento' +
         (sl.leftover > 0 ? ', mas ' + eur(sl.leftover) + ' ficam em casa para as próximas semanas.' : '.') + '</div>';
  } else {
    h += '<div class="verdict ok">Dentro do orçamento semanal.</div>';
  }
  h += '<div class="stats">' +
       '<div class="stat"><div class="k">Food cost</div><div class="v">' + eur(sl.foodCost) + '</div></div>' +
       '<div class="stat"><div class="k">Fica em casa</div><div class="v">' + eur(sl.leftover) + '</div></div>' +
       '<div class="stat"><div class="k">Comprados</div><div class="v">' + done + '/' + toBuy.length + '</div></div></div></section>';
  if (S.store !== 'ref' && !storeHasData(S.store, S)){
    h += '<div class="banner" role="note"><span>Ainda sem preços de ' + esc(storeObj().curto) + '. Estes valores usam a média de Continente, Pingo Doce e Auchan. Escreve os preços da loja na secção Preços.</span>' +
         '<button type="button" class="btn ghost sm" data-act="tab" data-tab="precos">Preços</button></div>';
  }
  h += '<p class="note">Compras-se a embalagem inteira (ou o peso mínimo nos produtos vendidos ao peso), por isso paga-se mais do que se consome. O que sobra serve nas semanas seguintes.</p>';

  CATS.forEach(function(c){
    var its = toBuy.filter(function(i){ return i.ing.cat === c.id; })
      .sort(function(a, b){ return a.ing.nome.localeCompare(b.ing.nome, 'pt'); });
    if (!its.length) return;
    h += '<div><div class="sect">' + c.nome + '</div><div class="card" style="padding-top:4px;padding-bottom:4px">' + its.map(liRow).join('') + '</div></div>';
  });

  /* itens avulsos */
  h += '<div><div class="sect">Outros itens</div><div class="card">';
  S.shop.extras.forEach(function(e){
    h += '<div class="li' + (e.bought ? ' done' : '') + '"><input type="checkbox" id="ex-' + esc(e.id) + '" data-act="ex-bought" data-id="' + esc(e.id) + '"' + (e.bought ? ' checked' : '') + ' aria-label="Comprado: ' + esc(e.nome) + '">' +
         '<label class="li-name" for="ex-' + esc(e.id) + '">' + esc(e.nome) + '</label>' +
         '<span class="row"><span class="li-price">' + (e.preco ? eur(e.preco) : '') + '</span><button type="button" class="x" data-act="ex-del" data-id="' + esc(e.id) + '" aria-label="Remover ' + esc(e.nome) + '">&times;</button></span></div>';
  });
  h += '<div class="two" style="grid-template-columns:minmax(0,1fr) 96px auto;margin-top:' + (S.shop.extras.length ? '10px' : '0') + '">' +
       '<input id="exName" class="inp" placeholder="Ex.: detergente" aria-label="Nome do item">' +
       '<input id="exPrice" class="inp" type="number" step="0.01" min="0" inputmode="decimal" placeholder="€" aria-label="Preço do item">' +
       '<button type="button" class="btn" data-act="ex-add">Juntar</button></div></div></div>';

  var haveIts = sl.items.filter(function(i){ return i.have; })
    .sort(function(a, b){ return a.ing.nome.localeCompare(b.ing.nome, 'pt'); });
  if (haveIts.length){
    h += '<div><div class="sect">Já tenho em casa</div><div class="card" style="padding-top:4px;padding-bottom:4px">' + haveIts.map(liRow).join('') + '</div></div>';
  }

  /* comparar supermercados */
  var cmp = STORES.filter(function(s){ return s.id !== 'ref' && storeHasData(s.id, S); }).map(function(s){
    var t = shoppingList(S, s.id);
    var cov = toBuy.filter(function(i){ return hasStorePrice(i.ing, s.id, S); }).length;
    return {s: s, t: t.buy + t.extras, cov: cov};
  });
  if (cmp.length > 1 && toBuy.length){
    var min = Math.min.apply(null, cmp.map(function(c){ return c.t; }));
    h += '<div><div class="sect">Esta lista noutro supermercado</div><div class="card" style="padding-top:4px;padding-bottom:4px">';
    cmp.forEach(function(c){
      var d = c.t - pay, cur = c.s.id === S.store;
      h += '<button type="button" class="cmp' + (cur ? ' cur' : '') + '" data-act="cmp-store" data-id="' + c.s.id + '">' +
           '<span><strong>' + esc(c.s.curto) + '</strong>' + (c.t <= min + 1e-9 ? '<span class="best">Mais barato</span>' : '') +
           '<span class="sub" style="display:block">' + c.cov + ' de ' + toBuy.length + ' artigos com preço desta loja</span></span>' +
           '<span class="amt">' + eur(c.t) + '<span class="sub" style="display:block">' + (cur ? 'atual' : (d >= 0 ? '+' : '−') + eur(Math.abs(d))) + '</span></span></button>';
    });
    h += '</div><p class="note" style="margin-top:8px">Os artigos sem preço de uma loja usam a média, por isso a diferença pode estar subestimada. Toca numa loja para a usares.</p></div>';
  }

  h += '<div class="row wrap"><button type="button" class="btn pri" data-act="copy-list">Copiar lista</button>' +
       '<button type="button" class="btn" data-act="reset-bought">Desmarcar tudo</button></div>';
  h += '</div>';
  return h;
}

/* ---------- vista: Preços ---------- */
var SRC_LABEL = {manual: 'manual', loja: 'loja', media: 'média', mediana: 'mediana', est: 'estimativa'};
function priceRows(){
  var q = norm(UI.pq), out = '', any = false;
  CATS.forEach(function(c){
    var its = allIngs(S).filter(function(i){ return i.cat === c.id && (!q || norm(i.nome).indexOf(q) >= 0); })
      .sort(function(a, b){ return a.nome.localeCompare(b.nome, 'pt'); });
    if (!its.length) return;
    any = true;
    out += '<div><div class="sect">' + c.nome + '</div><div class="card" style="padding-top:4px;padding-bottom:4px">';
    its.forEach(function(i){
      var p = packPrice(i, S.store, S), cls = p.src === 'manual' ? ' man' : (p.src === 'est' ? ' est' : '');
      out += '<div class="prow"><div><span class="pn">' + esc(i.nome) + '</span><span class="src' + cls + '">' + SRC_LABEL[p.src] + '</span>' +
             '<div class="ps">' + fmtQty(i.pack, i.u) + ' · ' + unitPriceLabel(i, p.v) +
             (p.src === 'manual' && !i.custom ? ' · <button type="button" class="linkbtn" data-act="price-reset" data-id="' + esc(i.id) + '">repor</button>' : '') +
             (i.custom ? ' · <button type="button" class="linkbtn" data-act="ing-del" data-id="' + esc(i.id) + '">apagar</button>' : '') + '</div></div>' +
             '<span class="pedit"><button type="button" class="btn pri sm pguard" data-act="price-save" data-id="' + esc(i.id) + '" hidden>Guardar</button></span><input class="inp pinput" type="number" step="0.01" min="0" inputmode="decimal" data-id="' + esc(i.id) + '" value="' + p.v.toFixed(2) + '" aria-label="Preço de ' + esc(i.nome) + ' em euros por ' + fmtQty(i.pack, i.u) + '"></div>';
    });
    out += '</div></div>';
  });
  return any ? out : '<div class="empty"><p>Nenhum ingrediente encontrado.</p></div>';
}
function viewPrecos(){
  var st = storeObj(), note;
  if (S.store === 'ref') note = 'Média de referência: mediana de Continente, Pingo Doce e Auchan, recolhida a 17 de outubro de 2026. Os ingredientes marcados como estimativa ainda não têm preço recolhido.';
  else if (storeHasData(S.store, S) && Object.keys(BOOK[S.store] || {}).length) note = 'Preços de ' + st.curto + ' recolhidos a 17 de outubro de 2026 nos ingredientes com dados. Os restantes usam a média.';
  else note = 'Ainda não tenho preços recolhidos de ' + st.curto + ', por isso mostro a média de Continente, Pingo Doce e Auchan. Escreve os preços que vês na loja e passam a valer só para ' + st.curto + '.';
  var h = '<div class="vh"><h1 class="h2">Preços</h1><div class="row"><button type="button" class="btn pri sm" data-act="scan-open">Ler etiqueta</button><button type="button" class="btn sm" data-act="fat-open">Ler fatura</button><button type="button" class="btn sm" data-act="new-ing">Novo ingrediente</button></div></div>';
  h += '<div class="stack"><p class="note">Preço por embalagem em <strong>' + esc(st.curto) + '</strong>. ' + note +
       ' <a href="https://www.ativos.pt/cabaz-alimentar/produtos" target="_blank" rel="noopener noreferrer">Ver fonte</a>. Escreve um valor para o corrigires.</p>';
  h += '<input id="pSearch" class="inp" type="search" placeholder="Procurar ingrediente" aria-label="Procurar ingrediente" value="' + esc(UI.pq) + '">';
  h += '<details class="card"><summary>Importar preços (colar lista)</summary>' +
       '<p class="note" style="margin-bottom:8px">Uma linha por ingrediente, com o nome e o preço da embalagem indicada, separados por ponto e vírgula.</p>' +
       '<textarea id="impText" class="inp" rows="5" placeholder="Arroz agulha; 1,19&#10;Ovos M; 2,99"></textarea>' +
       '<button type="button" class="btn pri block" style="margin-top:10px" data-act="imp-apply">Aplicar a ' + esc(st.curto) + '</button></details>';
  h += '<div id="pList" class="stack">' + priceRows() + '</div></div>';
  return h;
}

var VIEWS = {semana: viewSemana, receitas: viewReceitas, lista: viewLista, precos: viewPrecos};

function syncCtx(){
  var a = $('#inPeople'), b = $('#inBudget'), c = $('#selStore');
  if (a && document.activeElement !== a) a.value = S.people;
  if (b && document.activeElement !== b) b.value = S.budget;
  if (c) c.value = S.store;
}
/* sem sessão, só se vê o ecrã de entrada (e a recuperação de palavra-passe) */
function isGated(){ return !SESSION || PASS_RECOVERY; }
function gateHTML(){
  var h = '<section class="gate card" aria-label="Entrar na casa"><p class="eyebrow">Casa</p><h1 class="h2">Entrar na casa</h1>';
  if (!AUTH_READY){
    h += '<p class="note">A verificar a ligação…</p>';
  } else if (!SB){
    h += '<p class="note">A ligação à casa não está configurada. Falta preencher config.js.</p>';
  } else if (PASS_RECOVERY){
    h += '<p class="note">Escolhe a nova palavra-passe (pelo menos 6 caracteres).</p>' +
         '<input class="inp" type="password" autocomplete="new-password" placeholder="Nova palavra-passe" data-l="novaPass" aria-label="Nova palavra-passe" value="">' +
         '<button type="button" class="btn pri block" data-act="login-nova">Definir palavra-passe</button>';
  } else {
    h += '<p class="note">A app só funciona depois de entrares com o teu email e palavra-passe.</p>' +
         '<div class="row wrap"><button type="button" class="btn sm" data-act="login-pick-1">Bernardo</button>' +
         '<button type="button" class="btn sm" data-act="login-pick-2">Paula</button></div>' +
         '<input class="inp" type="email" autocomplete="email" inputmode="email" placeholder="o.teu@email.com" data-l="email" aria-label="Email" value="' + esc(LOGIN.email) + '">' +
         '<input class="inp" type="password" autocomplete="current-password" placeholder="Palavra-passe" data-l="pass" aria-label="Palavra-passe" value="">' +
         '<button type="button" class="btn pri block" data-act="login-send">Entrar</button>' +
         '<button type="button" class="linkbtn" data-act="login-reset">Esqueci-me da palavra-passe</button>';
    if (LOGIN.msg) h += '<p class="note" role="status">' + esc(LOGIN.msg) + '</p>';
  }
  return h + '</section>';
}
/* atualiza o ecrã de entrada e a folha de login, conforme o estado */
function refreshLogin(){
  if (isGated()) render();
  if (SH && SH.type === 'login') renderSheet(false);
}
function render(){
  document.body.classList.toggle('gated', isGated());
  if (isGated()){ $('#view').innerHTML = gateHTML(); return; }
  syncCtx();
  $('#view').innerHTML = VIEWS[VIEW]();
  $$('#tabs .tab').forEach(function(b){
    if (b.dataset.tab === VIEW) b.setAttribute('aria-current', 'page'); else b.removeAttribute('aria-current');
  });
}

/* ---------- folhas ---------- */
function openSheet(s){
  lastFocus = document.activeElement;
  SH = s;
  renderSheet(true);
}
function closeSheet(){
  SH = null; ED = null; NI = null; SC = null; FAT = null;
  $('#sheet').hidden = true;
  document.body.style.overflow = '';
  if (lastFocus && lastFocus.focus && document.contains(lastFocus)) lastFocus.focus();
}
function renderSheet(first){
  if (!SH) return;
  var sb = $('#sheetBody'), keep = (!first && sb) ? sb.scrollTop : 0;
  var r = SHEETS[SH.type]();
  $('#sheetTitle').textContent = r.title;
  sb.innerHTML = r.html;
  sb.scrollTop = keep;
  $('#sheet').hidden = false;
  document.body.style.overflow = 'hidden';
  if (first) $('#sheetTitle').focus();
}

function pickKey(){ return SH.kind === 'sopa' ? soupKey(SH.day, SH.slot) : planKey(SH.day, SH.slot); }
function acceptsSH(r){ return SH.kind === 'sopa' ? soupAccepts(r) : slotAccepts(SH.slot, r); }
function pickerRows(){
  var cap = budgetPerDose(S), cur = S.plan[pickKey()], q = norm(UI.pk.q), counts = planCounts(S);
  var rows = S.recipes.filter(function(r){
    if (!acceptsSH(r)) return false;
    if (UI.pk.cat !== 'all' && r.cat !== UI.pk.cat) return false;
    if (q && norm(r.nome).indexOf(q) < 0) return false;
    return true;
  }).map(function(r){
    return {r: r, c: recipeCalc(r, S, S.store, S.people)};
  }).filter(function(o){
    return (!UI.pk.fit || o.c.perDose <= cap + 1e-9) && (UI.pk.t === 'all' || tierOf(o.c.perDose) === Number(UI.pk.t));
  }).sort(function(a, b){ return a.c.perDose - b.c.perDose; });
  if (!rows.length) return '<div class="empty"><p>Nenhuma receita com estes filtros.</p></div>';
  return '<div class="list">' + rows.map(function(o){
    var st = fitState(o.c.perDose), n = counts[o.r.id] || 0, isCur = o.r.id === cur;
    return '<button type="button" class="pickrow" data-act="assign" data-id="' + esc(o.r.id) + '"' + (isCur ? ' aria-current="true"' : '') + '>' +
      '<span class="rc-t"><span class="rc-name">' + esc(o.r.nome) + (isCur ? ' <span class="src man">atual</span>' : '') + '</span>' +
      '<span class="rc-fit"><i class="dot ' + st + '"></i>' + tierHtml(tierOf(o.c.perDose)) + ' · ' + catName(o.r.cat) + ' · ' + o.r.tempo + ' min' + (n ? ' · já na semana ' + n + '×' : '') + '</span></span>' +
      sticker(o.c.perDose) + '</button>';
  }).join('') + '</div>';
}
function sheetPicker(){
  var cur = S.plan[pickKey()], isPeq = SH.slot === 'peq';
  var cats = SH.kind === 'sopa' ? [{id: 'sopa', nome: 'Sopas'}] : (isPeq ? [] : RECIPE_CATS.filter(function(c){ return c.id !== 'peq' && c.id !== 'sopa'; }));
  var h = '<p class="note">Orçamento por dose: ' + eur(budgetPerDose(S)) + ' · ' + S.people + ' ' + plural(S.people, 'pessoa', 'pessoas') + ' · ' + esc(storeObj().curto) + '</p>';
  h += '<input id="pkSearch" class="inp" type="search" placeholder="Procurar receita" aria-label="Procurar receita" value="' + esc(UI.pk.q) + '">';
  h += '<div class="chips" role="group" aria-label="Filtros">';
  [{id: 'all', nome: 'Todas'}].concat(cats).forEach(function(c){
    h += '<button type="button" class="chip" data-act="pk-cat" data-v="' + c.id + '" aria-pressed="' + (UI.pk.cat === c.id) + '">' + c.nome + '</button>';
  });
  h += '<button type="button" class="chip" data-act="pk-fit" aria-pressed="' + UI.pk.fit + '">Cabem no orçamento</button></div>';
  h += tierChips('pk-tier', UI.pk.t);
  h += '<div class="row wrap"><button type="button" class="btn sm pri" data-act="pk-random">Surpreende-me</button>' +
       (cur && recById(S, cur) ? '<button type="button" class="btn sm danger" data-act="unplan">Remover esta refeição</button>' : '') + '</div>';
  h += '<div id="pkList">' + pickerRows() + '</div>';
  var tt = SH.kind === 'sopa' ? 'Sopa de entrada' : slotName(SH.slot);
  return {title: dayName(SH.day) + ' · ' + tt, html: h};
}

function nutriHtml(r){
  if (r.cat === 'peq') return '';
  var nu = recipeNutri(r), lvl = protLevel(nu), p = Math.round(nu.prot);
  var fonte = nu.fontes.map(function(g){ return GROUPS[g].nome.toLowerCase(); }).join(', ');
  var tt;
  if (r.cat === 'sopa') tt = 'Sopa: entrada, não prato principal. Para jantar ou almoço completo, junta uma proteína.';
  else if (lvl === 0) tt = 'Pouca proteína: não conta como prato principal. Junta ovo, carne, peixe ou leguminosas.';
  else if (lvl === 1) tt = 'Proteína razoável para um prato principal.';
  else tt = 'Boa fonte de proteína.';
  var vt = nu.veg < VEG_MIN && r.cat !== 'sopa' ? ' Pouca verdura: serve com salada ou legumes (metade do prato).' : '';
  return '<div class="card" style="margin-bottom:12px"><div style="display:flex;justify-content:space-between;align-items:baseline;gap:8px">' +
    '<span class="lbl" style="margin:0">Proteína por dose</span><span class="mono"><b>~' + p + ' g</b></span></div>' +
    '<p class="note" style="margin-top:6px">' + tt + vt + (fonte ? ' Fontes: ' + esc(fonte) + '.' : '') + '</p></div>';
}

/* receitas repetidas: o mesmo nome (sem maiúsculas, acentos nem pontuação) */
var DUP_CONF = null;   /* id da cópia que aguarda a segunda confirmação para apagar */
function recKey(nome){ return norm(String(nome)).replace(/[^a-z0-9]+/g, ' ').trim(); }
function receitaComNome(nome, exceptId){
  var k = recKey(nome), hit = null;
  S.recipes.forEach(function(r){ if (!hit && r.id !== exceptId && recKey(r.nome) === k) hit = r; });
  return hit;
}
/* ids das cópias repetidas (a primeira com aquele nome não conta) */
function idsRepetidos(){
  var vistos = {}, rep = {};
  S.recipes.forEach(function(r){ var k = recKey(r.nome); if (vistos[k]) rep[r.id] = true; else vistos[k] = r.id; });
  return rep;
}

function sheetRecipe(){
  var r = recById(S, SH.id);
  if (!r) return {title: 'Receita', html: '<p>Receita não encontrada.</p>'};
  var n = SH.people, c = recipeCalc(r, S, S.store, n), cap = budgetPerDose(S), st = fitState(c.perDose);
  var pct = cap > 0 ? Math.round(c.perDose / cap * 100) : 0;
  var h = '<div class="row wrap"><span class="muted">' + tierHtml(tierOf(c.perDose)) + ' · ' + catName(r.cat) + ' · ' + r.tempo + ' min' + (r.refeicao === 'almoco' ? ' · só almoço' : (r.refeicao === 'jantar' ? ' · só jantar' : '')) + '</span><span class="grow"></span>' + sticker(c.perDose) + '</div>';
  h += '<div class="field narrow"><label class="lbl" for="detPeople">Pessoas nesta receita</label><div class="step">' +
       '<button type="button" data-act="det-people" data-d="-1" aria-label="Menos uma pessoa">&minus;</button>' +
       '<input id="detPeople" value="' + n + '" readonly>' +
       '<button type="button" data-act="det-people" data-d="1" aria-label="Mais uma pessoa">+</button></div></div>';
  if (cap > 0){
    h += '<div><span class="pill ' + st + '">' + (st === 'ok' ? 'Cabe no orçamento' : 'Acima da média do orçamento') + ' · ' + pct + '% do orçamento por dose</span></div>';
  }
  h += nutriHtml(r);
  h += '<div class="receipt"><div class="rh"><span>Talão · ' + n + ' ' + plural(n, 'dose', 'doses') + '</span><span>' + esc(storeObj().curto) + '</span></div>';
  c.lines.forEach(function(l){
    h += '<div class="ln"><span class="nm">' + esc(l.ing.nome) + '</span><span class="qt">' + fmtQty(l.qty, l.ing.u) + '</span><span class="lead"></span><span class="pr">' + eur(l.cost) + '</span></div>';
  });
  h += '<div class="tot"><div class="ln"><span class="nm">Total</span><span class="lead"></span><span class="pr">' + eur(c.total) + '</span></div>' +
       '<div class="ln big-l"><span class="nm">Por dose</span><span class="lead"></span><span class="pr">' + eur(c.perDose) + '</span></div></div></div>';

  var isSoup = r.cat === 'sopa';
  var slots = activeSlots(S).filter(function(s){ return isSoup ? (s.id !== 'peq' && soupOn(S, s.id)) : slotAccepts(s.id, r); });
  if (slots.length){
    var firstSlot = slots[0].id, dayPick = DAYS[0].id;
    for (var i = 0; i < DAYS.length; i++){
      if (!S.plan[planKey(DAYS[i].id, firstSlot)]){ dayPick = DAYS[i].id; break; }
    }
    h += '<div class="card stack"><div class="lbl" style="margin:0">Adicionar ao planeador</div><div class="two">' +
         '<select id="dpDay" class="inp" aria-label="Dia">' + DAYS.map(function(d){ return '<option value="' + d.id + '"' + (d.id === dayPick ? ' selected' : '') + '>' + d.nome + '</option>'; }).join('') + '</select>' +
         '<select id="dpSlot" class="inp" aria-label="Refeição">' + slots.map(function(s){ return '<option value="' + s.id + '">' + s.nome + '</option>'; }).join('') + '</select></div>' +
         '<button type="button" class="btn pri block" data-act="det-plan">Adicionar</button></div>';
  } else if (isSoup){
    h += '<p class="note">Ativa a sopa de entrada no almoço ou no jantar, na secção Semana, para a planeares.</p>';
  } else {
    h += '<p class="note">Esta receita não tem proteína suficiente para prato principal, por isso não aparece no almoço nem no jantar. Edita-a e junta ovos, carne, peixe ou leguminosas.</p>';
  }
  h += '<div><div class="sect" style="margin-top:0">Preparação</div><ol class="steps">' +
       (r.passos && r.passos.length ? r.passos.map(function(p){ return '<li>' + esc(p) + '</li>'; }).join('') : '<li class="muted">Sem passos.</li>') + '</ol></div>';
  h += '<button type="button" class="btn block" data-act="edit-recipe">Editar receita</button>';
  if (idsRepetidos()[r.id]){
    h += '<p class="note">Há outra receita com este nome. Esta cópia pode ser apagada.</p>' +
         '<button type="button" class="btn danger block" data-act="apagar-copia">' + (DUP_CONF === r.id ? 'Toca outra vez para apagar esta cópia' : 'Apagar esta cópia') + '</button>';
  }
  return {title: r.nome, html: h};
}

/* editor de receitas */
function ingOptions(sel){
  var all = allIngs(S), h = '<option value="">Escolher ingrediente…</option>';
  CATS.forEach(function(c){
    var g = all.filter(function(i){ return i.cat === c.id; }).sort(function(a, b){ return a.nome.localeCompare(b.nome, 'pt'); });
    if (!g.length) return;
    h += '<optgroup label="' + esc(c.nome) + '">';
    g.forEach(function(i){ h += '<option value="' + esc(i.id) + '"' + (i.id === sel ? ' selected' : '') + '>' + esc(i.nome) + '</option>'; });
    h += '</optgroup>';
  });
  return h;
}
function edDraft(){
  return {doses: Math.max(1, ED.doses || 1), ing: ED.rows.filter(function(r){ return r.id && IMAP[r.id] && Number(r.qty) > 0; }).map(function(r){ return [r.id, Number(r.qty)]; })};
}
function edPreviewHtml(){
  var d = edDraft(), c = recipeCalc(d, S, S.store, d.doses), nu = recipeNutri(d), lv = protLevel(nu);
  var warn = ED.cat === 'peq' ? '' : (ED.cat !== 'sopa' && lv === 0 ? ' · sem proteína suficiente para prato principal' : '');
  return '<div class="rh"><span>Custo · ' + d.doses + ' ' + plural(d.doses, 'dose', 'doses') + '</span><span>' + esc(storeObj().curto) + '</span></div>' +
         '<div class="ln"><span class="nm">Total</span><span class="lead"></span><span class="pr">' + eur(c.total) + '</span></div>' +
         '<div class="ln big-l"><span class="nm">Por dose</span><span class="lead"></span><span class="pr">' + eur(c.perDose) + '</span></div>' +
         (ED.cat === 'peq' ? '' : '<p class="note" style="margin-top:6px">Proteína por dose: ~' + Math.round(nu.prot) + ' g' + esc(warn) + '</p>');
}
function openEditor(id){
  var r = id ? recById(S, id) : null;
  if (r){
    ED = {id: r.id, nome: r.nome, cat: r.cat, doses: r.doses, tempo: r.tempo, refeicao: r.refeicao || 'ambos',
          rows: r.ing.map(function(p){ return {id: p[0], qty: String(p[1])}; }), passos: (r.passos || []).join('\n'), confirmDel: false};
  } else {
    ED = {id: null, nome: '', cat: 'carne', doses: 4, tempo: 30, refeicao: 'ambos', rows: [{id: '', qty: ''}], passos: '', confirmDel: false};
  }
  if (SH && SH.type === 'recipe') SH = {type: 'editor'}; else openSheet({type: 'editor'});
  renderSheet(true);
}
function sheetEditor(){
  var h = '<div class="fgrid">';
  h += '<div class="field"><label class="lbl" for="edNome">Nome</label><input id="edNome" class="inp" data-f="nome" maxlength="80" value="' + esc(ED.nome) + '" placeholder="Ex.: Massa de grão"></div>';
  h += '<div class="two"><div class="field"><label class="lbl" for="edCat">Tipo</label><select id="edCat" class="inp" data-f="cat">' +
       RECIPE_CATS.map(function(c){ return '<option value="' + c.id + '"' + (c.id === ED.cat ? ' selected' : '') + '>' + c.nome + '</option>'; }).join('') + '</select></div>' +
       '<div class="field"><label class="lbl" for="edTempo">Tempo (min)</label><input id="edTempo" class="inp" type="number" min="0" inputmode="numeric" data-f="tempo" value="' + ED.tempo + '"></div></div>';
  if (ED.cat !== 'peq'){
    h += '<div class="field"><label class="lbl" for="edRef">Serve para</label><select id="edRef" class="inp" data-f="refeicao">' +
         [['ambos', 'Almoço e jantar'], ['almoco', 'Só almoço'], ['jantar', 'Só jantar']].map(function(o){
           return '<option value="' + o[0] + '"' + (o[0] === ED.refeicao ? ' selected' : '') + '>' + o[1] + '</option>';
         }).join('') + '</select></div>';
  }
  h += '<div class="field"><label class="lbl" for="edDoses">Doses a que se referem as quantidades</label><input id="edDoses" class="inp" type="number" min="1" max="24" inputmode="numeric" data-f="doses" value="' + ED.doses + '"></div></div>';
  h += '<div><div class="sect" style="margin-top:0">Ingredientes</div><div class="stack">';
  ED.rows.forEach(function(r, i){
    var u = r.id && IMAP[r.id] ? IMAP[r.id].u : '';
    h += '<div class="erow"><select class="inp" data-f="row-ing" data-i="' + i + '" aria-label="Ingrediente ' + (i + 1) + '">' + ingOptions(r.id) + '</select>' +
         '<input class="inp" type="number" min="0" step="any" inputmode="decimal" data-f="row-qty" data-i="' + i + '" value="' + esc(r.qty) + '" aria-label="Quantidade ' + (i + 1) + '">' +
         '<span class="u">' + u + '</span>' +
         '<button type="button" class="x" data-act="ed-del-row" data-i="' + i + '" aria-label="Remover ingrediente ' + (i + 1) + '">&times;</button></div>';
  });
  h += '</div><div class="row wrap" style="margin-top:10px"><button type="button" class="btn sm" data-act="ed-add-row">+ Ingrediente</button>' +
       '<button type="button" class="btn sm ghost" data-act="ed-new-ing">Novo ingrediente…</button></div></div>';
  h += '<div class="receipt" id="edPreview">' + edPreviewHtml() + '</div>';
  h += '<div class="field"><label class="lbl" for="edPassos">Passos (um por linha)</label><textarea id="edPassos" class="inp" rows="6" data-f="passos">' + esc(ED.passos) + '</textarea></div>';
  h += '<button type="button" class="btn pri block" data-act="ed-save">Guardar receita</button>';
  if (ED.id) h += '<button type="button" class="btn danger block" data-act="ed-del">' + (ED.confirmDel ? 'Toca outra vez para apagar' : 'Apagar receita') + '</button>';
  return {title: ED.id ? 'Editar receita' : 'Nova receita', html: h};
}
function saveEditor(){
  var nome = ED.nome.trim();
  var d = edDraft();
  if (!nome){ toast('Dá um nome à receita.'); return; }
  if (!d.ing.length){ toast('Junta pelo menos um ingrediente com quantidade.'); return; }
  var rec = {
    id: ED.id || 'u-' + Date.now().toString(36), nome: nome, cat: ED.cat, refeicao: ED.cat === 'peq' ? 'ambos' : (ED.refeicao || 'ambos'),
    tempo: Math.max(0, Math.round(ED.tempo || 0)), doses: d.doses, ing: d.ing,
    passos: ED.passos.split('\n').map(function(s){ return s.trim(); }).filter(Boolean)
  };
  if (receitaComNome(nome, rec.id)){ toast('Já existe uma receita com este nome. Muda o nome ou edita a que já existe.'); return; }
  var idx = -1;
  S.recipes.forEach(function(r, i){ if (r.id === rec.id) idx = i; });
  if (idx >= 0) S.recipes[idx] = rec; else S.recipes.push(rec);
  persist(); closeSheet(); render(); toast('Receita guardada');
}

/* novo ingrediente */
function sheetNewIng(){
  var h = '<div class="fgrid">';
  h += '<div class="field"><label class="lbl" for="niNome">Nome</label><input id="niNome" class="inp" data-n="nome" maxlength="60" value="' + esc(NI.nome) + '" placeholder="Ex.: Iogurte natural"></div>';
  h += '<div class="two"><div class="field"><label class="lbl" for="niCat">Corredor</label><select id="niCat" class="inp" data-n="cat">' +
       CATS.map(function(c){ return '<option value="' + c.id + '"' + (c.id === NI.cat ? ' selected' : '') + '>' + c.nome + '</option>'; }).join('') + '</select></div>' +
       '<div class="field"><label class="lbl" for="niU">Unidade</label><select id="niU" class="inp" data-n="u">' +
       [['g', 'gramas (g)'], ['ml', 'mililitros (ml)'], ['un', 'unidades (un)']].map(function(u){ return '<option value="' + u[0] + '"' + (u[0] === NI.u ? ' selected' : '') + '>' + u[1] + '</option>'; }).join('') + '</select></div></div>';
  h += '<div class="field"><label class="lbl" for="niTipo">Tipo de alimento (para a proteína)</label><select id="niTipo" class="inp" data-n="tipo">' + NUT_TIPOS.map(function(x){ return '<option value="' + x.id + '"' + (x.id === (NI.tipo || 'out') ? ' selected' : '') + '>' + x.nome + '</option>'; }).join('') + '</select></div>';
  h += '<div class="two"><div class="field"><label class="lbl" for="niPack">Tamanho da embalagem</label><input id="niPack" class="inp" type="number" min="0" step="any" inputmode="decimal" data-n="pack" value="' + esc(NI.pack) + '" placeholder="500"></div>' +
       '<div class="field"><label class="lbl" for="niPrice">Preço da embalagem (€)</label><input id="niPrice" class="inp" type="number" min="0" step="0.01" inputmode="decimal" data-n="price" value="' + esc(NI.price) + '" placeholder="1,29"></div></div></div>';
  h += '<p class="note">Escreve o tamanho na unidade escolhida (por exemplo, 500 g a 1,29 €). Podes corrigir o preço por supermercado na secção Preços.</p>';
  h += '<button type="button" class="btn pri block" data-act="ni-save">Criar ingrediente</button><button type="button" class="btn block" data-act="ni-cancel">Cancelar</button>';
  return {title: 'Novo ingrediente', html: h};
}
function saveNewIng(){
  var nome = NI.nome.trim(), pack = Number(NI.pack), price = Number(NI.price);
  if (!nome){ toast('Dá um nome ao ingrediente.'); return; }
  if (!(pack > 0)){ toast('Indica o tamanho da embalagem.'); return; }
  if (!(price >= 0) || NI.price === ''){ toast('Indica o preço da embalagem.'); return; }
  var tp = NUT_TIPOS.filter(function(x){ return x.id === NI.tipo; })[0] || NUT_TIPOS[0];
  var ing = {id: 'c-' + Date.now().toString(36), nome: nome, cat: NI.cat, u: NI.u, pack: pack, est: round2(price), custom: true, nut: {g: tp.id, p: tp.p}};
  S.customIngs.push(ing);
  rebuildIngIndex(S);
  persist();
  if (NI.from === 'fatura'){
    var linha = FAT && FAT.items[NI.fatIdx];
    if (linha){ linha.ingId = ing.id; recalcFat(linha); linha.on = linha.price != null; }
    NI = null; SH = {type: 'fatura'}; renderSheet(true);
    toast('Ingrediente criado');
    return;
  }
  if (NI.from === 'editor'){
    var empty = null;
    ED.rows.forEach(function(r){ if (!r.id && !empty) empty = r; });
    if (empty) empty.id = ing.id; else ED.rows.push({id: ing.id, qty: ''});
    NI = null; SH = {type: 'editor'}; renderSheet(true);
  } else {
    NI = null; closeSheet(); render();
  }
  toast('Ingrediente criado');
}

/* ---------- leitura de etiqueta (foto) ---------- */
function loadScript(url){
  return new Promise(function(res, rej){
    if (document.querySelector('script[data-src="' + url + '"]')) return res();
    var s = document.createElement('script');
    s.src = url; s.dataset.src = url; s.onload = res; s.onerror = function(){ rej(new Error('script')); };
    document.head.appendChild(s);
  });
}
function readBarcode(file, url){
  if ('BarcodeDetector' in window){
    return createImageBitmap(file).then(function(bm){
      return new BarcodeDetector({formats: ['ean_13', 'ean_8', 'upc_a']}).detect(bm);
    }).then(function(r){ return r && r[0] ? String(r[0].rawValue) : null; }).catch(function(){ return null; });
  }
  return loadScript(ZXING_URL).then(function(){
    return new ZXing.BrowserMultiFormatReader().decodeFromImageUrl(url).then(function(r){ return r.getText(); });
  }).catch(function(){ return null; });
}
function readText(file){
  return loadScript(TESS_URL).then(function(){
    return Tesseract.recognize(file, 'por').then(function(r){ return r.data.text || ''; });
  }).catch(function(){ return ''; });
}
function offLookup(ean){
  return fetch('https://world.openfoodfacts.org/api/v2/product/' + encodeURIComponent(ean) + '.json?fields=product_name,quantity')
    .then(function(r){ return r.ok ? r.json() : null; })
    .then(function(j){ return j && j.product ? j.product : null; })
    .catch(function(){ return null; });
}
function scanFile(file){
  if (!file || !SC) return;
  SC.busy = true; SC.error = ''; SC.msg = 'A ler o código de barras…'; renderSheet(false);
  var url = URL.createObjectURL(file), ean = null, text = '';
  readBarcode(file, url).then(function(code){
    ean = code; SC.msg = 'A ler o texto da etiqueta… pode demorar um pouco.'; renderSheet(false);
    return readText(file);
  }).then(function(tx){ text = tx || ''; })
  .then(function(){ return ean ? offLookup(ean) : null; })
  .then(function(off){ finishScan(ean, text, off); }, function(){ finishScan(ean, text, null); })
  .then(function(){ URL.revokeObjectURL(url); });
}
function finishScan(ean, text, off){
  if (!SC) return;
  var cands = parseShelfPrices(text), name = (off && off.product_name) ? off.product_name : guessProductName(text);
  var pq = parseQuantity(off && off.quantity), mapped = ean && S.eanMap[ean] && IMAP[S.eanMap[ean]] ? S.eanMap[ean] : null;
  var ing = mapped ? IMAP[mapped] : matchIngredient(name, S);
  var unit = pq ? pq.u : (ing ? ing.u : 'g'), qty = pq ? pq.q : (ing ? ing.pack : '');
  if (ing && pq && pq.u !== ing.u){ unit = ing.u; qty = ing.pack; }
  SC.busy = false; SC.step = 'confirm'; SC.ean = ean; SC.fromMap = !!mapped;
  SC.candidates = cands; SC.price = cands.length ? cands[0] : ''; SC.name = name;
  SC.ingId = ing ? ing.id : ''; SC.unit = unit; SC.qty = qty;
  if (!ean && !text) SC.error = 'Não consegui ler a etiqueta. Escreve os dados à mão.';
  else if (!text) SC.error = 'Não consegui ler o texto da etiqueta. Confirma o preço.';
  renderSheet(false);
}
function sheetScan(){
  if (SC.busy) return {title: 'Ler etiqueta', html: '<div class="card empty"><p>' + esc(SC.msg) + '</p></div>'};
  var h = '';
  if (SC.step === 'photo'){
    h += '<p class="note">Tira uma foto à etiqueta de preço na prateleira. Se o código de barras aparecer na foto, a app reconhece o produto da próxima vez.</p>';
    h += '<label class="btn pri block" style="cursor:pointer">Tirar ou escolher foto<input id="scanFile" type="file" accept="image/*" capture="environment" hidden></label>';
    h += '<button type="button" class="btn block" data-act="scan-manual">Escrever sem foto</button>';
    if (SC.error) h += '<p class="note">' + esc(SC.error) + '</p>';
    return {title: 'Ler etiqueta', html: h};
  }
  var ing = SC.ingId && IMAP[SC.ingId] ? IMAP[SC.ingId] : null;
  var unit = ing ? ing.u : SC.unit;
  if (SC.error) h += '<p class="note">' + esc(SC.error) + '</p>';
  if (SC.ean) h += '<p class="note">Código de barras ' + esc(SC.ean) + (SC.fromMap ? ' · já conhecido' : '') + '</p>';
  if (SC.candidates.length){
    h += '<div><span class="lbl" style="margin:0">Preços encontrados na foto</span><div class="chips" role="group" aria-label="Preços encontrados" style="margin-top:6px">' +
         SC.candidates.map(function(v){ return '<button type="button" class="chip" data-act="scan-cand" data-v="' + v + '" aria-pressed="' + (String(SC.price) === String(v)) + '">' + num2(v) + ' €</button>'; }).join('') + '</div></div>';
  }
  var stores = STORES.filter(function(s){ return s.id !== 'ref'; }).map(function(s){
    return '<option value="' + s.id + '"' + (s.id === SC.store ? ' selected' : '') + '>' + esc(s.nome) + '</option>';
  }).join('');
  h += '<div class="fgrid">' +
    '<div class="field"><label class="lbl" for="scNome">Produto</label><input id="scNome" class="inp" data-sc="name" maxlength="80" value="' + esc(SC.name) + '" placeholder="Ex.: Arroz agulha Cigarra"></div>' +
    '<div class="two"><div class="field"><label class="lbl" for="scPreco">Preço do produto (€)</label><input id="scPreco" class="inp" type="number" step="0.01" min="0" inputmode="decimal" data-sc="price" value="' + esc(SC.price) + '"></div>' +
    '<div class="field"><label class="lbl" for="scQty">Tamanho (' + (unit === 'un' ? 'un' : unit) + ')</label><input id="scQty" class="inp" type="number" min="0" step="any" inputmode="decimal" data-sc="qty" value="' + esc(SC.qty) + '"></div></div>' +
    '<div class="field"><label class="lbl" for="scIng">Corresponde a</label><select id="scIng" class="inp" data-sc="ingId">' + ingOptions(SC.ingId) +
      '<option value="__new"' + (SC.ingId === '__new' || (!SC.ingId && SC.name) ? ' selected' : '') + '>+ Criar ingrediente novo</option></select></div>' +
    (SC.ingId === '__new' || !SC.ingId ? '<div class="field"><label class="lbl" for="scUnit">Unidade</label><select id="scUnit" class="inp" data-sc="unit">' +
      [['g', 'gramas (g)'], ['ml', 'mililitros (ml)'], ['un', 'unidades (un)']].map(function(u){ return '<option value="' + u[0] + '"' + (u[0] === SC.unit ? ' selected' : '') + '>' + u[1] + '</option>'; }).join('') + '</select></div>' : '') +
    '<div class="field"><label class="lbl" for="scStore">Supermercado</label><select id="scStore" class="inp" data-sc="store">' + stores + '</select></div>' +
    '</div>';
  var price = Number(String(SC.price).replace(',', '.')), qty = Number(String(SC.qty).replace(',', '.'));
  if (ing && price > 0 && qty > 0){
    h += '<p class="note">Preço por embalagem de ' + fmtQty(ing.pack, ing.u) + ' na app: <b>' + eur(packPriceFromShelf(price, qty, ing)) + '</b></p>';
  }
  h += '<button type="button" class="btn pri block" data-act="scan-save">Guardar preço</button>';
  h += '<button type="button" class="btn block" data-act="scan-back">Tirar outra foto</button>';
  return {title: 'Ler etiqueta', html: h};
}
function saveScan(){
  var name = SC.name.trim(), price = Number(String(SC.price).replace(',', '.')), qty = Number(String(SC.qty).replace(',', '.'));
  if (!(price > 0)){ toast('Indica o preço.'); return; }
  if (!(qty > 0)){ toast('Indica o tamanho do produto.'); return; }
  var ing;
  if (SC.ingId === '__new' || !SC.ingId){
    if (!name){ toast('Dá um nome ao produto.'); return; }
    ing = {id: 'c-' + Date.now().toString(36), nome: name, cat: 'merc', u: SC.unit || 'g', pack: qty, est: round2(price), custom: true, nut: {g: 'out', p: 0}};
    S.customIngs.push(ing); rebuildIngIndex(S);
  } else ing = IMAP[SC.ingId];
  if (!ing){ toast('Escolhe a que ingrediente corresponde.'); return; }
  var store = SC.store, ean = SC.ean, pp = packPriceFromShelf(price, qty, ing);
  if (!S.prices[store]) S.prices[store] = {};
  S.prices[store][ing.id] = pp;
  if (ean) S.eanMap[ean] = ing.id;
  persist(); closeSheet(); render();
  toast(ing.nome + ' guardado a ' + eur(pp) + ' (' + storeObj(store).curto + ')');
}

function sheetLogin(){
  var h = '';
  if (SESSION && !PASS_RECOVERY){
    h += '<p class="note">Estás ligado como <b>' + esc(SESSION.user.email) + '</b>. A semana, as receitas, os preços e a lista são partilhados com quem também estiver ligado à casa.</p>';
    h += '<p class="note">As alterações são guardadas na casa automaticamente. Para veres logo o que os outros guardaram, carrega em <b>Atualizar</b> (no cabeçalho).</p>';
    h += '<button type="button" class="btn block" data-act="logout">Sair</button>';
  } else if (PASS_RECOVERY){
    h += '<p class="note">Escolhe a nova palavra-passe (pelo menos 6 caracteres).</p>';
    h += '<input class="inp" type="password" autocomplete="new-password" placeholder="Nova palavra-passe" data-l="novaPass" aria-label="Nova palavra-passe" value="">';
    h += '<button type="button" class="btn pri block" data-act="login-nova">Definir palavra-passe</button>';
  } else {
    h += '<p class="note">Entra com o teu email e palavra-passe. Só os emails da casa entram.</p>';
    h += '<div class="row wrap"><button type="button" class="btn sm" data-act="login-pick-1">Bernardo</button>' +
         '<button type="button" class="btn sm" data-act="login-pick-2">Paula</button></div>';
    h += '<input id="loginEmail" class="inp" type="email" autocomplete="email" inputmode="email" placeholder="o.teu@email.com" data-l="email" aria-label="Email" value="' + esc(LOGIN.email) + '">';
    h += '<input id="loginPass" class="inp" type="password" autocomplete="current-password" placeholder="Palavra-passe" data-l="pass" aria-label="Palavra-passe" value="">';
    h += '<button type="button" class="btn pri block" data-act="login-send">Entrar</button>';
    h += '<button type="button" class="linkbtn" data-act="login-reset">Esqueci-me da palavra-passe</button>';
    if (LOGIN.msg) h += '<p class="note" role="status">' + esc(LOGIN.msg) + '</p>';
  }
  h += '<div><div class="sect" style="margin-top:4px">Cópia de segurança</div>';
  h += '<p class="note">Guarda os dados num ficheiro, ou importa um ficheiro guardado antes.</p>';
  h += '<div class="row wrap" style="margin-top:8px"><button type="button" class="btn" data-act="data-export">Exportar dados</button>' +
       '<label class="btn" style="cursor:pointer">Importar ficheiro<input id="importFile" type="file" accept="application/json,.json" hidden></label></div>';
  var hasBackup = false; try { hasBackup = !!localStorage.getItem(BACKUP_KEY); } catch (e) {}
  if (hasBackup) h += '<div class="row wrap" style="margin-top:8px"><button type="button" class="btn" data-act="backup-restore">Restaurar cópia deste dispositivo</button></div>';
  h += '</div>';
  h += '<p class="note">Sem ligar, a app guarda tudo só neste dispositivo.</p>';
  return {title: SESSION && !PASS_RECOVERY ? 'Casa e dados' : 'Partilhar com a casa', html: h};
}

/* ---------- planeamento com IA (só preenche refeições vazias; o planeador normal fecha o que sobrar) ---------- */
var IA_PLAN = {busy: false, nota: ''};
var IA_PLAN_T = null;
function planearSemanaIA(){
  if (!SB || !SESSION){ toast('Entra na casa para usar a IA.'); return; }
  if (IA_PLAN.busy) return;
  var keys = [];
  DAYS.forEach(function(d){
    activeSlots(S).forEach(function(s){
      keys.push({k: planKey(d.id, s.id), dia: d.nome, refeicao: s.nome, s: s.id, soup: false});
      if (soupOn(S, s.id)) keys.push({k: soupKey(d.id, s.id), dia: d.nome, refeicao: s.nome + ' (sopa)', s: s.id, soup: true});
    });
  });
  var vazias = keys.filter(function(x){ return !(S.plan[x.k] && recById(S, S.plan[x.k])); });
  if (!vazias.length){
    /* semana cheia: a de exemplo refaz-se logo; a tua pede uma segunda toque, como "Sugerir semana" */
    if (!S.example && !IA_PLAN.confirmar){
      IA_PLAN = {busy: false, nota: '', confirmar: true};
      clearTimeout(IA_PLAN_T);
      IA_PLAN_T = setTimeout(function(){ if (IA_PLAN.confirmar){ IA_PLAN.confirmar = false; if (VIEW === 'semana' && !SH) render(); } }, 4000);
      render();
      toast('Toca outra vez para a IA refazer toda a semana.');
      return;
    }
    S.plan = {};
    vazias = keys;
  }
  IA_PLAN_T && clearTimeout(IA_PLAN_T);
  var gasto = planSummary(S).cost;
  var restante = S.budget > 0 ? S.budget - gasto : 100000;
  if (restante <= 0){ toast('Já não há orçamento para planear mais refeições.'); return; }

  var usadas = {};
  var refeicoes = vazias.map(function(x){
    var pool = S.recipes.filter(function(r){ return x.soup ? soupAccepts(r) : slotAccepts(x.s, r); });
    pool.forEach(function(r){ usadas[r.id] = r; });
    return {chave: x.k, dia: x.dia, refeicao: x.refeicao, opcoes: pool.map(function(r){ return r.id; })};
  }).filter(function(x){ return x.opcoes.length > 0; });
  var receitas = Object.keys(usadas).map(function(id){
    var r = usadas[id];
    return {id: id, nome: r.nome, cat: r.cat, custo: round2(recipeCalc(r, S, S.store, S.people).total), grupo: mainGroup(r)};
  });
  if (!refeicoes.length){ toast('Não há receitas que encaixem nas refeições vazias.'); return; }

  IA_PLAN = {busy: true, nota: ''};
  toast('A pedir a IA a semana… pode demorar uns segundos.');
  render();
  comLimite(SB.functions.invoke('planear-semana', {body: {orcamentoRestante: round2(restante), refeicoes: refeicoes, receitas: receitas, pedido: ''}}), 90000, 'a IA demorou demasiado a responder')
    .then(function(res){
      if (!res.error){
        if (!res.data || !res.data.plano) throw new Error('a IA devolveu uma resposta vazia');
        return res.data;
      }
      var ctx = res.error.context;
      return Promise.resolve(ctx && ctx.json ? ctx.json().catch(function(){ return {}; }) : {}).then(function(j){
        var e = new Error(j.erro || res.error.message || 'erro');
        e.status = ctx && ctx.status;
        throw e;
      });
    })
    .then(function(d){
      /* as escolhas da IA entram primeiro; o planeador normal preenche o que sobrar, com as suas regras */
      var plan = {};
      Object.keys(S.plan).forEach(function(k){ plan[k] = S.plan[k]; });
      Object.keys(d.plano).forEach(function(k){ plan[k] = d.plano[k]; });
      var st2 = Object.assign({}, S, {plan: plan});
      S.plan = suggestWeek(st2);
      S.example = false;
      IA_PLAN = {busy: false, nota: d.nota || ''};
      persist(); render();
      toast('Semana planeada com IA: ' + eur(planSummary(S).cost) + ' de ' + eur(S.budget));
    })
    .catch(function(e){
      /* sem IA: usa o planeador normal, que já existia */
      S.plan = suggestWeek(S);
      S.example = false;
      IA_PLAN = {busy: false, nota: ''};
      persist(); render();
      toast('IA indisponível (' + motivoIA(e) + '). Usei o planeador normal.');
    });
}

var SHEETS = {picker: sheetPicker, recipe: sheetRecipe, editor: sheetEditor, newing: sheetNewIng, scan: sheetScan, login: sheetLogin, fatura: sheetFatura, aiRecipe: sheetAiRecipe};

/* ---------- receita sugerida pela IA (só guarda depois de confirmares) ---------- */
var AIR = null;   /* {state: 'pick' | 'busy' | 'review', draft, pedido, msg} */
var AIR_SUGERIDAS = [];   /* nomes já sugeridos nesta sessão, para a IA não repetir */
function sugerirReceitaIA(pedido){
  if (!SB || !SESSION){ toast('Entra na casa para usar a IA.'); return; }
  var produtos = allIngs(S).map(function(i){ return {id: i.id, nome: i.nome, u: i.u}; });
  var evitar = S.recipes.map(function(r){ return r.nome; }).concat(AIR_SUGERIDAS).slice(-150);
  AIR = {state: 'busy', pedido: pedido || '', msg: ''};
  renderSheet(false);
  comLimite(SB.functions.invoke('sugerir-receita', {body: {produtos: produtos, pedido: pedido || '', evitar: evitar}}), 90000, 'a IA demorou demasiado a responder')
    .then(function(res){
      if (!res.error){
        if (!res.data || !Array.isArray(res.data.ing)) throw new Error('a IA devolveu uma resposta vazia');
        return res.data;
      }
      var ctx = res.error.context;
      return Promise.resolve(ctx && ctx.json ? ctx.json().catch(function(){ return {}; }) : {}).then(function(j){
        var e = new Error(j.erro || res.error.message || 'erro');
        e.status = ctx && ctx.status;
        throw e;
      });
    })
    .then(function(d){
      if (d.nome) AIR_SUGERIDAS.push(d.nome);
      AIR = {state: 'review', draft: d, pedido: pedido || '', msg: ''}; renderSheet(false);
    })
    .catch(function(e){ AIR = {state: 'pick', pedido: pedido || '', msg: 'Não consegui sugerir a receita: ' + motivoIA(e) + '.'}; renderSheet(false); });
}
function sheetAiRecipe(){
  if (!AIR || AIR.state === 'pick'){
    var p = '<p class="note">A IA cria uma receita original só com os produtos que já tens na app. Depois vês tudo e só guarda se quiseres.</p>' +
      '<div class="field"><label class="lbl" for="aiPedido">O que queres? (opcional)</label><input id="aiPedido" class="inp" maxlength="200" value="' + esc(AIR ? AIR.pedido : '') + '" placeholder="Ex.: algo rápido com frango e legumes"></div>' +
      '<button type="button" class="btn pri block" data-act="ai-recipe-go">Sugerir receita</button>';
    if (AIR && AIR.msg) p += '<p class="note" role="status">' + esc(AIR.msg) + '</p>';
    return {title: 'Sugerir receita com IA', html: p};
  }
  if (AIR.state === 'busy') return {title: 'Sugerir receita com IA', html: '<p class="note">A IA está a criar a receita…</p>'};
  var d = AIR.draft;
  var pares = d.ing.map(function(x){ return [x.id, x.qty]; });
  var rec = {id: 'ai-previa', nome: d.nome, cat: d.cat, tempo: d.tempo, doses: d.doses, refeicao: d.refeicao, ing: pares, passos: d.passos};
  var c = recipeCalc(rec, S, S.store, d.doses), nu = recipeNutri(rec), lv = protLevel(nu);
  var h = '<div class="rh"><span>' + esc(d.nome) + '</span><span>' + d.tempo + ' min · ' + d.doses + ' ' + plural(d.doses, 'dose', 'doses') + '</span></div>';
  h += '<div class="receipt">' +
       '<div class="ln big-l"><span class="nm">Custo por dose</span><span class="lead"></span><span class="pr">' + eur(c.perDose) + '</span></div>' +
       '<p class="note" style="margin-top:6px">Proteína: ' + ['sem proteína suficiente para prato principal', 'razoável', 'boa'][lv] + ' · ~' + Math.round(nu.prot) + ' g por dose</p></div>';
  h += '<div class="sect">Ingredientes</div><div class="stack">';
  d.ing.forEach(function(x){
    var ing = IMAP[x.id];
    if (ing) h += '<div class="ln"><span class="nm">' + esc(ing.nome) + '</span><span class="lead"></span><span class="mono">' + x.qty + ' ' + esc(ing.u) + '</span></div>';
  });
  h += '</div><div class="sect">Modo de preparação</div><ol class="steps">' + d.passos.map(function(s){ return '<li>' + esc(s) + '</li>'; }).join('') + '</ol>';
  if (d.faltam && d.faltam.length) h += '<p class="note">A IA diz que faltam: ' + esc(d.faltam.join(', ')) + '. Não entram na receita.</p>';
  h += '<button type="button" class="btn pri block" data-act="ai-recipe-save">Guardar receita</button>';
  h += '<button type="button" class="btn block" data-act="ai-recipe-go">Pedir outra sugestão</button>';
  h += '<button type="button" class="btn block" data-act="ai-recipe-discard">Descartar</button>';
  return {title: 'Receita sugerida', html: h};
}
function saveAiRecipe(){
  var d = AIR && AIR.draft;
  if (!d) return;
  var ing = d.ing.filter(function(x){ return IMAP[x.id] && x.qty > 0; });
  if (ing.length < 2){ toast('A receita não tem ingredientes válidos.'); return; }
  if (receitaComNome(d.nome, null)){ toast('Já existe uma receita com este nome. Pede outra sugestão.'); return; }
  S.recipes.push({id: 'u-' + Date.now().toString(36), nome: d.nome, cat: d.cat, refeicao: d.refeicao, tempo: d.tempo, doses: d.doses,
                  ing: ing.map(function(x){ return [x.id, x.qty]; }), passos: d.passos});
  persist(); AIR = null; closeSheet(); render(); toast('Receita guardada');
}

/* ---------- faturas ---------- */
var PDFJS_URL = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
var PDFJS_WORKER = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
/* limita o tempo de espera: se passar o limite, rejeita (a app mostra a leitura básica) */
function comLimite(promessa, ms, msg){
  return new Promise(function(resolve, reject){
    var t = setTimeout(function(){ reject(new Error(msg)); }, ms);
    promessa.then(function(v){ clearTimeout(t); resolve(v); }, function(e){ clearTimeout(t); reject(e); });
  });
}
function loadPdfJs(){
  return new Promise(function(resolve, reject){
    if (window.pdfjsLib){ resolve(window.pdfjsLib); return; }
    var s = document.createElement('script');
    s.src = PDFJS_URL;
    s.onload = function(){ window.pdfjsLib.GlobalWorkerOptions.workerSrc = PDFJS_WORKER; resolve(window.pdfjsLib); };
    s.onerror = function(){ reject(new Error('pdfjs')); };
    document.head.appendChild(s);
  });
}
/* pede a leitura da fatura à IA (função "ler-fatura" no Supabase). Sem sessão ou sem resposta, rejeita e fica a leitura básica. */
function lerComIA(text){
  if (!SB || !SESSION) return Promise.reject(new Error('sem sessão'));
  var semNif = String(text).replace(/NIF[^\n]*/gi, 'NIF [removido]').replace(/\b\d{9}\b/g, '[removido]');
  return SB.functions.invoke('ler-fatura', {body: {texto: semNif}}).then(function(res){
    if (!res.error){
      if (!res.data || !Array.isArray(res.data.linhas) || !res.data.linhas.length) throw new Error('A IA devolveu uma resposta vazia.');
      return res.data;
    }
    var ctx = res.error.context;
    return Promise.resolve(ctx && ctx.json ? ctx.json().catch(function(){ return {}; }) : {}).then(function(j){
      var e = new Error(j.erro || res.error.message || 'erro');
      e.status = ctx && ctx.status;
      throw e;
    });
  });
}
/* explica em português porque é que a IA não respondeu */
function motivoIA(e){
  if (!e) return 'erro desconhecido';
  if (e.status === 404) return 'a função ler-fatura ainda não está publicada no Supabase';
  if (e.status === 401) return 'a sessão expirou: sai da casa e volta a entrar';
  if (e.status === 403) return 'a conta não está na lista da casa';
  if (e.status === 500) return 'falta a chave GEMINI_API_KEY no Supabase';
  if (e.status === 502) return e.message;
  return e.message;
}
function readFatura(file){
  FAT = {step: 'review', busy: true, store: null, items: [], msg: '', check: null};
  renderSheet(false);
  comLimite(loadPdfJs(), 20000, 'o leitor de PDF não carregou (verifica a ligação)').then(function(lib){
    return file.arrayBuffer().then(function(buf){ return pdfToText(lib, new Uint8Array(buf)); });
  }).then(function(text){
    var r0 = parseInvoice(text);
    return comLimite(lerComIA(text), 90000, 'a IA demorou demasiado a responder').then(function(ia){
      return {r: aplicaIA(r0, ia), origem: 'ia'};
    }, function(e){
      return {r: r0, origem: 'basica', motivo: motivoIA(e)};
    });
  }).then(function(o){
    var r = o.r;
    var store = r.store || (S.store !== 'ref' ? S.store : null);
    var ref = r.regularTotal != null ? r.regularTotal : r.paidTotal;      /* o total que a fatura indica */
    FAT = {step: 'review', busy: false, store: store, storeLido: r.store, check: r.check, origem: o.origem, motivo: o.motivo,
           total: ref, soma: r.regularTotal != null ? r.soma : r.somaPaga, somaPaga: r.somaPaga,
           msg: r.items.length ? '' : 'Não encontrei linhas de artigos nesta fatura.', items: r.items.map(function(it){
      var ing = matchInvoiceIngredient(it.nome, S);
      var d = invDefaultQty(it);
      var row = {nome: it.nome, total: it.total, peso: it.peso, qtdLinha: it.qtd, qtd: d.qtd, qu: d.qu,
                 ingId: ing ? ing.id : '', price: null, on: false,       /* nada fica marcado sem confirmação */
                 novo: !ing && o.origem === 'ia'};                       /* produto que não existe: criado só ao guardar */
      recalcFat(row);
      return row;
    })};
    renderSheet(false);
  }).catch(function(){
    FAT = {step: 'pick', busy: false, msg: 'Não consegui ler este PDF. Confirma que é a fatura em PDF (não uma foto) e tenta de novo.'};
    renderSheet(false);
  });
}
/* recalcula o preço da embalagem de uma linha, com a quantidade e o ingrediente escolhidos */
function recalcFat(it){
  var ing = it.ingId ? IMAP[it.ingId] : null;
  it.price = ing ? invPackPrice(it.total, it.qtd, it.qu, ing) : null;
  /* produto novo: a embalagem é a quantidade comprada, por isso o preço da embalagem é o total da linha */
  if (!ing && it.novo && it.total > 0 && invBase(it.qtd, it.qu).q > 0) it.price = round2(it.total);
  it.erroUnidade = ing && it.price == null ? 'A unidade não coincide: o ingrediente é em ' + ({g: 'gramas', ml: 'mililitros', un: 'unidades'}[ing.u] || ing.u) + '. Ajusta a unidade ou escolhe outro ingrediente.' : '';
  if (ing && it.price == null) it.on = false;
  return it;
}
var UNIDADES = [['un', 'unidades'], ['g', 'gramas'], ['kg', 'quilos'], ['ml', 'mililitros'], ['l', 'litros']];
function perUnitText(it){
  var v = invPerUnit(it.total, it.qtd, it.qu);
  if (v == null) return '';
  var b = invBase(it.qtd, it.qu);
  if (b.un === 'un') return 'Fica a ' + eur(v) + ' por unidade.';
  return 'Fica a ' + eur(v * 1000) + (b.un === 'g' ? ' por quilo.' : ' por litro.');
}
function faturaCheckMsg(){
  if (FAT.check === true) return 'A soma das linhas (' + eur(FAT.soma) + ') bate certo com o total da fatura (' + eur(FAT.total) + ').';
  if (FAT.check === false) return 'Atenção: a soma das linhas (' + eur(FAT.soma) + ') não bate com o total da fatura (' + eur(FAT.total) + '). Confirma as linhas antes de guardar.';
  return 'Não encontrei o total da fatura para confirmar a leitura. Confirma as linhas antes de guardar.';
}
function sheetFatura(){
  if (!FAT || FAT.step === 'pick'){
    var p = '<p class="note">Escolhe o PDF da fatura do supermercado. A app lê o supermercado, os produtos e os preços. Antes de guardar, revês tudo.</p>' +
      '<label class="btn pri block" style="cursor:pointer">Escolher PDF da fatura<input id="faturaFile" type="file" accept="application/pdf" hidden></label>';
    if (FAT && FAT.msg) p += '<p class="note" role="status">' + esc(FAT.msg) + '</p>';
    return {title: 'Ler fatura', html: p};
  }
  if (FAT.busy) return {title: 'Ler fatura', html: '<p class="note">A ler a fatura…</p>'};
  var h = '';
  var stores = STORES.filter(function(s){ return s.id !== 'ref'; }).map(function(s){
    return '<option value="' + s.id + '"' + (s.id === FAT.store ? ' selected' : '') + '>' + esc(s.nome) + '</option>';
  }).join('');
  h += '<div class="field"><label class="lbl" for="fatStore">Supermercado' + (FAT.storeLido ? '' : ' (não reconhecido)') + '</label>' +
       '<select id="fatStore" class="inp" data-fat="store">' + (FAT.store ? '' : '<option value="">Escolher…</option>') + stores + '</select></div>';
  h += '<p class="note"' + (FAT.check === false ? ' class="verdict bad" style="font-size:14px"' : '') + '>' + esc(faturaCheckMsg()) + '</p>';
  if (FAT.origem === 'ia') h += '<p class="note">Lido com a IA (Gemini). Confirma cada linha antes de guardar.</p>';
  else if (FAT.origem === 'basica') h += '<p class="note">Leitura básica: a IA não respondeu (' + esc(FAT.motivo || 'sem detalhe') + '). Confirma cada linha.</p>';
  if (FAT.msg) h += '<p class="note">' + esc(FAT.msg) + '</p>';
  var marcados = FAT.items.filter(function(it){ return it.on; }).length;
  h += '<p class="note">' + FAT.items.length + ' linhas lidas · ' + marcados + ' marcadas para guardar. Os preços são os de tabela (sem descontos).</p>';
  FAT.items.forEach(function(it, i){
    var ing = it.ingId ? IMAP[it.ingId] : null;
    h += '<div class="fat-row">' +
      '<label><input type="checkbox" data-fat-on="' + i + '"' + (it.on ? ' checked' : '') + '> <span>' + esc(it.nome) + '</span> <small class="mono">' + eur(it.total) + '</small></label>' +
      '<select class="inp" data-fat-ing="' + i + '" aria-label="Corresponde a ' + esc(it.nome) + '">' + ingOptions(it.ingId) + '</select>' +
      '<div class="two"><div class="field"><label class="lbl" for="fq' + i + '">Quantidade comprada</label>' +
        '<input id="fq' + i + '" class="inp" type="number" step="any" min="0" inputmode="decimal" data-fat-qty="' + i + '" value="' + (it.qtd || '') + '"></div>' +
      '<div class="field"><label class="lbl" for="fu' + i + '">Unidade</label><select id="fu' + i + '" class="inp" data-fat-qu="' + i + '">' +
        UNIDADES.map(function(u){ return '<option value="' + u[0] + '"' + (u[0] === it.qu ? ' selected' : '') + '>' + u[1] + '</option>'; }).join('') +
        '</select></div></div>' +
      (perUnitText(it) ? '<p class="note">' + esc(perUnitText(it)) + '</p>' : '') +
      '<div class="field"><label class="lbl" for="fp' + i + '">Preço da embalagem' + (ing ? ' (' + ing.pack + ' ' + ing.u + ')' : '') + ' (€)</label>' +
        '<input id="fp' + i + '" class="inp" type="number" step="0.01" min="0" inputmode="decimal" data-fat-price="' + i + '" value="' + (it.price == null ? '' : it.price.toFixed(2)) + '"></div>' +
      (it.erroUnidade ? '<p class="note verdict bad" style="font-size:14px">' + esc(it.erroUnidade) + '</p>' : '') +
      (!it.ingId && it.novo ? '<p class="note">Produto novo: será criado como «' + esc(invCleanName(it.nome)) + '» (' + invBase(it.qtd, it.qu).q + ' ' + invBase(it.qtd, it.qu).un + ') ao guardar.</p>' : '') +
      (!it.ingId && !it.novo ? '<p class="note">Sem correspondência. Escolhe um ingrediente ou cria um novo.</p>' : '') +
      '<button type="button" class="linkbtn" data-act="fat-novo" data-i="' + i + '">+ Criar ingrediente com esta linha</button>' +
      '</div>';
  });
  h += '<button type="button" class="btn pri block" data-act="fat-save">Guardar preços marcados</button>';
  return {title: 'Rever fatura', html: h};
}
function faturaSave(){
  var store = FAT && FAT.store;
  if (!store){ toast('Escolhe o supermercado.'); return; }
  var semPreco = FAT.items.filter(function(it){ return it.on && it.ingId && !(it.price > 0); });
  if (semPreco.length){ toast('Falta o preço da embalagem de ' + semPreco[0].nome + '.'); return; }
  /* cria os produtos novos marcados (só agora, ao guardar) */
  FAT.items.forEach(function(it, k){
    if (!it.on || !it.novo || it.ingId) return;
    var b = invBase(it.qtd, it.qu);
    if (!(b.q > 0) || !(it.total > 0) || !(it.price > 0)) return;
    var ing = {id: 'c-' + Date.now().toString(36) + k, nome: invCleanName(it.nome), cat: 'merc', u: b.un,
               pack: round2(b.q), est: round2(it.total), custom: true, nut: {g: 'out', p: 0}};
    S.customIngs.push(ing);
    it.ingId = ing.id; it.novo = false;
  });
  rebuildIngIndex(S);
  FAT.items.forEach(function(it){ if (it.ingId) recalcFat(it); });

  var n = 0;
  if (!S.prices[store]) S.prices[store] = {};
  FAT.items.forEach(function(it){
    if (!it.on || !it.ingId || !(it.price > 0)) return;
    S.prices[store][it.ingId] = round2(it.price); n++;
  });
  if (!n){ toast('Não há linhas marcadas para guardar.'); return; }
  persist(); closeSheet(); render();
  toast(n + (n === 1 ? ' preço guardado' : ' preços guardados') + ' para ' + storeObj(store).nome + '.');
}

/* ---------- ações ---------- */
function setPeople(n){
  S.people = Math.min(12, Math.max(1, Math.round(n) || 1));
  persist(); render();
}
function setPrice(el){
  var id = el.dataset.id, v = parseFloat(String(el.value).replace(',', '.'));
  if (!S.prices[S.store]) S.prices[S.store] = {};
  if (!(v > 0)) delete S.prices[S.store][id]; else S.prices[S.store][id] = round2(v);
  persist();
  $('#pList').innerHTML = priceRows();
}
function importPrices(text){
  var all = allIngs(S), n = 0, bad = 0;
  if (!S.prices[S.store]) S.prices[S.store] = {};
  text.split(/\r?\n/).forEach(function(line){
    line = line.trim();
    if (!line) return;
    var parts = line.split(/[;\t]/);
    if (parts.length < 2){ bad++; return; }
    var name = norm(parts[0]), price = parseFloat(parts[parts.length - 1].replace(',', '.').replace(/[^\d.]/g, ''));
    if (!name || !(price > 0)){ bad++; return; }
    var hit = null;
    all.forEach(function(i){ if (!hit && norm(i.nome) === name) hit = i; });
    if (!hit && name.length >= 3) all.forEach(function(i){ if (!hit && norm(i.nome).indexOf(name) >= 0) hit = i; });
    if (!hit) all.forEach(function(i){ if (!hit && name.indexOf(norm(i.nome)) >= 0) hit = i; });
    if (!hit){ bad++; return; }
    S.prices[S.store][hit.id] = round2(price); n++;
  });
  persist(); render();
  toast(n + ' ' + plural(n, 'preço aplicado', 'preços aplicados') + (bad ? ' · ' + bad + ' não reconhecidos' : ''));
}
function copyText(t){
  function fallback(){
    var ta = document.createElement('textarea');
    ta.value = t; ta.setAttribute('readonly', ''); ta.style.position = 'fixed'; ta.style.opacity = '0';
    document.body.appendChild(ta); ta.select();
    var ok = false;
    try { ok = document.execCommand('copy'); } catch (e) {}
    document.body.removeChild(ta);
    toast(ok ? 'Lista copiada' : 'Não foi possível copiar');
  }
  if (navigator.clipboard && navigator.clipboard.writeText){
    navigator.clipboard.writeText(t).then(function(){ toast('Lista copiada'); }, fallback);
  } else fallback();
}

var ACTS = {
  'tab': function(el){ VIEW = el.dataset.tab; render(); window.scrollTo(0, 0); },
  'go-semana': function(){ VIEW = 'semana'; render(); window.scrollTo(0, 0); },
  'p-dec': function(){ setPeople(S.people - 1); },
  'p-inc': function(){ setPeople(S.people + 1); },
  'tier-set': function(el){ S.tier = el.dataset.v === 'all' ? 'all' : Number(el.dataset.v); persist(); render(); },
  'rt-set': function(el){ UI.rt = el.dataset.v; render(); },
  'pk-tier': function(el){ UI.pk.t = el.dataset.v; renderSheet(false); },
  'dismiss-example': function(){ S.example = false; persist(); render(); },
  'slot': function(el){
    var id = el.dataset.slot, n = activeSlots(S).length;
    if (S.slots[id] && n === 1){ toast('Mantém pelo menos uma refeição.'); return; }
    S.slots[id] = !S.slots[id]; persist(); render();
  },
  'soup-toggle': function(el){
    var id = el.dataset.slot;
    S.soup[id] = !S.soup[id]; S.example = false; persist(); render();
  },
  'suggest': function(){
    var before = planSummary(S);
    if (before.total && before.count >= before.total){
      if (!UI.sug){
        UI.sug = true; render();
        clearTimeout(UI.sugT);
        UI.sugT = setTimeout(function(){ UI.sug = false; if (VIEW === 'semana' && !SH) render(); }, 4000);
        return;
      }
      S.plan = {};
    }
    UI.sug = false;
    S.plan = suggestWeek(S); S.example = false; persist(); render();
    var sm = planSummary(S);
    toast('Semana sugerida: ' + eur(sm.cost) + ' de ' + eur(S.budget));
  },
  'ai-plan': planearSemanaIA,
  'accept-week': function(){
    S.acceptedSig = weekSig(S); S.example = false; persist(); render();
    toast('Semana aceite. A lista de compras está pronta.');
  },
  'scan-open': function(){
    SC = {step: 'photo', busy: false, msg: '', error: '', ean: null, fromMap: false, candidates: [], price: '', name: '', qty: '', unit: 'g', ingId: '',
          store: S.store === 'ref' ? 'continente' : S.store};
    openSheet({type: 'scan'});
  },
  'scan-manual': function(){
    SC.step = 'confirm'; SC.error = ''; SC.ean = null; SC.candidates = []; SC.price = ''; SC.name = ''; SC.qty = ''; SC.unit = 'g'; SC.ingId = '';
    renderSheet(false);
  },
  'scan-back': function(){ SC.step = 'photo'; SC.error = ''; renderSheet(false); },
  'scan-cand': function(el){ SC.price = el.dataset.v; renderSheet(false); },
  'scan-save': saveScan,
  'login-open': function(){ LOGIN.msg = ''; openSheet({type: 'login'}); },
  'casa-guardar': function(){ pushSafe(); },
  'fat-open': function(){ FAT = {step: 'pick', busy: false, msg: ''}; openSheet({type: 'fatura'}); },
  'fat-save': function(){ faturaSave(); },
  'fat-novo': function(el){
    var i = Number(el.dataset.i), it = FAT.items[i], b = invBase(it.qtd, it.qu);
    NI = {from: 'fatura', fatIdx: i, nome: invCleanName(it.nome), cat: 'merc', u: b.un, pack: b.q > 0 ? round2(b.q) : '', price: round2(it.total) || '', tipo: 'out'};
    SH = {type: 'newing'}; renderSheet(true);
  },
  'price-save': function(el){ var inp = el.closest('.prow').querySelector('.pinput'); setPrice(inp); toast('Preço guardado.'); },
  'casa-atualizar': function(){ refreshCasa(); },
  'login-pick-1': function(){ LOGIN.email = 'bernardo.n.f.mendes@gmail.com'; LOGIN.msg = ''; refreshLogin(); },
  'login-pick-2': function(){ LOGIN.email = 'paulanevesramalho@gmail.com'; LOGIN.msg = ''; refreshLogin(); },
  'login-send': signIn,
  'login-reset': resetPassword,
  'login-nova': setNewPassword,
  'logout': logout,
  'data-export': exportData,
  'backup-restore': restoreBackup,
  'clear-week': function(){ S.plan = {}; S.example = false; persist(); render(); toast('Semana limpa'); },
  'pick': function(el){
    UI.pk = {q: '', cat: 'all', t: String(S.tier), fit: false};
    openSheet({type: 'picker', day: el.dataset.day, slot: el.dataset.slot, kind: el.dataset.kind || 'main'});
  },
  'pk-cat': function(el){ UI.pk.cat = el.dataset.v; renderSheet(false); },
  'pk-fit': function(){ UI.pk.fit = !UI.pk.fit; renderSheet(false); },
  'pk-random': function(){
    var key = pickKey(), cur = S.plan[key], cap = budgetPerDose(S), counts = planCounts(S);
    var pool = S.recipes.filter(function(r){ return acceptsSH(r) && r.id !== cur; }).map(function(r){
      return {r: r, c: recipeCalc(r, S, S.store, S.people)};
    });
    if (!pool.length){ toast('Não há outra receita para esta refeição.'); return; }
    var ok = pool.filter(function(o){ return o.c.perDose <= cap + 1e-9 && (counts[o.r.id] || 0) < 2; });
    if (!ok.length) ok = pool.slice().sort(function(x, y){ return x.c.perDose - y.c.perDose; }).slice(0, 3);
    var pick = ok[Math.floor(Math.random() * ok.length)];
    S.plan[key] = pick.r.id; S.example = false; persist(); closeSheet(); render();
    toast('Escolhi: ' + pick.r.nome);
  },
  'assign': function(el){
    S.plan[pickKey()] = el.dataset.id; S.example = false;
    persist(); closeSheet(); render();
  },
  'unplan': function(el){
    var key = el.dataset.key || (SH && SH.day ? pickKey() : null);
    if (!key) return;
    delete S.plan[key]; S.example = false; persist();
    if (SH) closeSheet();
    render();
  },
  'open-recipe': function(el){ openSheet({type: 'recipe', id: el.dataset.id, people: S.people}); },
  'det-people': function(el){ SH.people = Math.min(24, Math.max(1, SH.people + Number(el.dataset.d))); renderSheet(false); },
  'det-plan': function(){
    var day = $('#dpDay').value, slot = $('#dpSlot').value;
    var rc = recById(S, SH.id);
    S.plan[rc && rc.cat === 'sopa' ? soupKey(day, slot) : planKey(day, slot)] = SH.id; S.example = false; persist();
    closeSheet(); render();
    toast('Adicionado a ' + dayName(day) + ' · ' + slotName(slot));
  },
  'edit-recipe': function(){ openEditor(SH.id); },
  'new-recipe': function(){ openEditor(null); },
  'ai-recipe-open': function(){ AIR = {state: 'pick', pedido: '', msg: ''}; openSheet({type: 'aiRecipe'}); },
  'ai-recipe-go': function(){
    var inp = document.getElementById('aiPedido');
    sugerirReceitaIA(inp ? inp.value.trim() : (AIR && AIR.pedido) || '');
  },
  'ai-recipe-save': saveAiRecipe,
  'ai-recipe-discard': function(){ AIR = null; closeSheet(); },
  'apagar-copia': function(){
    var id = SH && SH.id;
    if (!id) return;
    if (DUP_CONF !== id){ DUP_CONF = id; renderSheet(false); return; }
    DUP_CONF = null;
    S.recipes = S.recipes.filter(function(r){ return r.id !== id; });
    persist(); closeSheet(); render(); toast('Cópia apagada');
  },
  'rc-cat': function(el){ UI.rc = el.dataset.v; render(); },
  'rc-fit': function(){ UI.rfit = !UI.rfit; render(); },
  'ed-add-row': function(){
    ED.rows.push({id: '', qty: ''}); renderSheet(false);
    var sels = $$('#sheetBody select[data-f="row-ing"]');
    if (sels.length) sels[sels.length - 1].focus();
  },
  'ed-del-row': function(el){
    ED.rows.splice(Number(el.dataset.i), 1);
    if (!ED.rows.length) ED.rows.push({id: '', qty: ''});
    renderSheet(false);
  },
  'ed-new-ing': function(){ NI = {from: 'editor', nome: '', cat: 'merc', u: 'g', pack: '', price: '', tipo: 'out'}; SH = {type: 'newing'}; renderSheet(true); },
  'ed-save': saveEditor,
  'ed-del': function(){
    if (!ED.confirmDel){ ED.confirmDel = true; renderSheet(false); return; }
    var id = ED.id;
    S.recipes = S.recipes.filter(function(r){ return r.id !== id; });
    Object.keys(S.plan).forEach(function(k){ if (S.plan[k] === id) delete S.plan[k]; });
    persist(); closeSheet(); render(); toast('Receita apagada');
  },
  'new-ing': function(){ NI = {from: 'prices', nome: '', cat: 'merc', u: 'g', pack: '', price: '', tipo: 'out'}; openSheet({type: 'newing'}); },
  'ni-save': saveNewIng,
  'ni-cancel': function(){
    if (NI && NI.from === 'editor'){ NI = null; SH = {type: 'editor'}; renderSheet(true); }
    else if (NI && NI.from === 'fatura'){ NI = null; SH = {type: 'fatura'}; renderSheet(true); }
    else closeSheet();
  },
  'sheet-close': closeSheet,
  'have': function(el){
    var id = el.dataset.id, ing = IMAP[id];
    if (!ing) return;
    var cur = S.shop.have[id] !== undefined ? !!S.shop.have[id] : !!ing.pantry;
    S.shop.have[id] = !cur; persist(); render();
  },
  'ex-add': function(){
    var name = $('#exName').value.trim(), price = parseFloat(String($('#exPrice').value).replace(',', '.'));
    if (!name){ toast('Escreve o nome do item.'); return; }
    S.shop.extras.push({id: Date.now().toString(36), nome: name, preco: price > 0 ? round2(price) : 0, bought: false});
    persist(); render();
  },
  'ex-del': function(el){
    S.shop.extras = S.shop.extras.filter(function(e){ return e.id !== el.dataset.id; });
    persist(); render();
  },
  'cmp-store': function(el){ S.store = el.dataset.id; persist(); render(); },
  'reset-bought': function(){
    S.shop.bought = {};
    S.shop.extras.forEach(function(e){ e.bought = false; });
    persist(); render(); toast('Lista desmarcada');
  },
  'copy-list': function(){ copyText(listText(shoppingList(S, S.store))); },
  'price-reset': function(el){
    if (S.prices[S.store]) delete S.prices[S.store][el.dataset.id];
    persist(); $('#pList').innerHTML = priceRows();
  },
  'ing-del': function(el){
    var id = el.dataset.id;
    var used = S.recipes.some(function(r){ return r.ing.some(function(p){ return p[0] === id; }); });
    if (used){ toast('Este ingrediente está numa receita. Tira-o de lá primeiro.'); return; }
    S.customIngs = S.customIngs.filter(function(i){ return i.id !== id; });
    rebuildIngIndex(S); persist(); $('#pList').innerHTML = priceRows();
  },
  'imp-apply': function(){
    var t = $('#impText').value;
    if (!t.trim()){ toast('Cola primeiro a lista de preços.'); return; }
    importPrices(t);
  }
};

/* ---------- eventos ---------- */
document.addEventListener('click', function(e){
  if (e.target && e.target.id === 'sheet'){ closeSheet(); return; }
  var el = e.target.closest ? e.target.closest('[data-act]') : null;
  if (!el) return;
  var fn = ACTS[el.dataset.act];
  if (fn) fn(el, e);
});
document.addEventListener('change', function(e){
  var el = e.target;
  if (el.id === 'importFile'){ importData(el.files && el.files[0]); return; }
  if (el.id === 'scanFile'){ scanFile(el.files && el.files[0]); return; }
  if (el.id === 'faturaFile'){ readFatura(el.files && el.files[0]); return; }
  if (el.dataset && el.dataset.fat === 'store' && FAT){ FAT.store = el.value; renderSheet(false); return; }
  if (el.dataset && el.dataset.fatIng !== undefined && FAT){
    var it = FAT.items[Number(el.dataset.fatIng)];
    it.ingId = el.value; it.novo = false; recalcFat(it); it.on = it.price != null;
    renderSheet(false); return;
  }
  if (el.dataset && el.dataset.fatQu !== undefined && FAT){
    var l = FAT.items[Number(el.dataset.fatQu)]; l.qu = el.value; recalcFat(l); renderSheet(false); return;
  }
  if (el.dataset && el.dataset.fatQty !== undefined && FAT){
    var q = FAT.items[Number(el.dataset.fatQty)]; q.qtd = parseFloat(String(el.value).replace(',', '.')) || 0; recalcFat(q); renderSheet(false); return;
  }
  if (el.dataset && el.dataset.fatOn !== undefined && FAT){ FAT.items[Number(el.dataset.fatOn)].on = el.checked; renderSheet(false); return; }
  if (el.dataset && el.dataset.sc && SH && SH.type === 'scan' && SC){
    var f = el.dataset.sc;
    SC[f] = el.value;
    if (f === 'ingId' && el.value && el.value !== '__new' && IMAP[el.value]){
      var ig = IMAP[el.value];
      SC.unit = ig.u; if (!SC.qty) SC.qty = ig.pack;
    }
    renderSheet(false);
    return;
  }
  if (el.id === 'inPeople'){ setPeople(parseInt(el.value, 10) || S.people); return; }
  if (el.id === 'inBudget'){ S.budget = Math.max(0, parseFloat(String(el.value).replace(',', '.')) || 0); persist(); render(); return; }
  if (el.id === 'selStore'){ S.store = el.value; persist(); render(); return; }
  if (el.classList && el.classList.contains('pinput')){ return; }   /* grava só ao carregar em Guardar */
  if (el.dataset && el.dataset.act === 'bought'){ S.shop.bought[el.dataset.id] = el.checked; persist(); render(); return; }
  if (el.dataset && el.dataset.act === 'ex-bought'){
    S.shop.extras.forEach(function(x){ if (x.id === el.dataset.id) x.bought = el.checked; });
    persist(); render();
  }
});
document.addEventListener('input', function(e){
  var el = e.target;
  if (el.dataset && el.dataset.l){ LOGIN[el.dataset.l] = el.value; return; }
  if (el.dataset && el.dataset.fatPrice !== undefined && FAT){ FAT.items[Number(el.dataset.fatPrice)].price = parseFloat(String(el.value).replace(',', '.')) || null; return; }
  if (el.classList && el.classList.contains('pinput')){
    var g = el.closest('.prow') && el.closest('.prow').querySelector('.pguard');
    if (g) g.hidden = false;
    return;
  }
  if (el.dataset && el.dataset.sc && SH && SH.type === 'scan' && SC){ SC[el.dataset.sc] = el.value; return; }
  if (el.id === 'rSearch'){ UI.rq = el.value; $('#rList').innerHTML = recipeCards(); return; }
  if (el.id === 'pSearch'){ UI.pq = el.value; $('#pList').innerHTML = priceRows(); return; }
  if (el.id === 'pkSearch'){ UI.pk.q = el.value; $('#pkList').innerHTML = pickerRows(); return; }
  if (SH && SH.type === 'newing' && NI && el.dataset && el.dataset.n){ NI[el.dataset.n] = el.value; return; }
  if (SH && SH.type === 'editor' && ED && el.dataset && el.dataset.f){
    var f = el.dataset.f, i = Number(el.dataset.i);
    if (f === 'nome' || f === 'cat' || f === 'passos' || f === 'refeicao') ED[f] = el.value;
    else if (f === 'tempo') ED.tempo = Number(el.value) || 0;
    else if (f === 'doses') ED.doses = Math.max(1, Math.round(Number(el.value) || 1));
    else if (f === 'row-ing'){
      ED.rows[i].id = el.value;
      var u = el.parentNode.querySelector('.u');
      if (u) u.textContent = el.value && IMAP[el.value] ? IMAP[el.value].u : '';
    }
    else if (f === 'row-qty') ED.rows[i].qty = el.value;
    if (f === 'cat'){ renderSheet(false); var cs = $('#edCat'); if (cs) cs.focus(); return; }
    var pv = $('#edPreview');
    if (pv) pv.innerHTML = edPreviewHtml();
  }
});
document.addEventListener('keydown', function(e){
  if (e.key === 'Escape' && SH) closeSheet();
});

/* ---------- arranque ---------- */
window.addEventListener('online', function(){ if (SESSION && isUnsynced()) pushSafe(); });
window.addEventListener('beforeunload', function(e){
  if (SESSION && isUnsynced()){ e.preventDefault(); e.returnValue = ''; }
});
document.addEventListener('focusout', function(){
  setTimeout(function(){
    if (PENDING_REMOTE && !/^(INPUT|SELECT|TEXTAREA)$/.test((document.activeElement || {}).tagName || '')){
      var p = PENDING_REMOTE; PENDING_REMOTE = null; applyRemote(p.state, p.savedAt);
    }
  }, 0);
});
$('#selStore').innerHTML = STORES.map(function(s){ return '<option value="' + s.id + '">' + esc(s.nome) + '</option>'; }).join('');
render();
initRemote();

})();

