# A Mãe é que Sabe — guia para agentes

Este ficheiro diz a um agente novo o que é o projeto, como está feito, como se publica e o que falta fazer. Lê-o todo antes de mudares código.

Estado em 14 de novembro de 2026, na versão 33 da app.

## 1. O que é

É uma app web (PWA) portuguesa de planeamento de refeições para uma casa. Tem:
- receitas e o plano da semana;
- lista de compras com a loja mais barata;
- preços do Continente, Pingo Doce e Auchan;
- leitura de faturas e de etiquetas com IA;
- sugestão de receitas e de plano semanal com IA;
- partilha entre as pessoas da casa (até 3).

O dono quer **comercializá-la**: plano grátis mais plano pago, em que a IA e as faturas só existem no pago. A análise completa para o lançamento comercial está num documento Claude Docs privado do dono, "A Mãe é que Sabe — análise para comercializar".

**O dono:**
- Fala português de Portugal e usa sobretudo o iPhone.
- Não é programador. Quer instruções curtas, um passo de cada vez, e pede que se faça por ele sempre que possível.
- Responde-lhe sempre em português de Portugal, sem jargão.

## 2. Endereços

| O quê | Onde |
| --- | --- |
| App (GitHub Pages, ainda é o principal) | https://bernardonfmendes.github.io/amaequesabe/ |
| App (Vercel, com cabeçalhos de segurança; vai passar a principal) | https://amaequesabe.vercel.app |
| Repositório | github.com/bernardonfmendes/amaequesabe (ramo `main`) |
| Supabase | projeto `jaszwfxzevyqtkhmjxci` (região eu-west-3) |
| Vercel | equipa `bennymendes` (team_wmcwdYOtBPWubDUrH1mCoxHL), projeto `amaequesabe` |

## 3. Como o código está organizado

**Não há passo de compilação.** A app é um único ficheiro, `app.bundle.js`, editado diretamente. O repositório não tem uma pasta `src/`.

```
index.html          página, CSS e ordem dos scripts (com ?v=NN para limpar a cache)
atualizar.js        aviso de "versão nova" (compara APP_VERSION com version.json)
config.js           URL do Supabase e chave PÚBLICA anon (é a única chave que pode ir para o site)
app.bundle.js       toda a app
version.json        {"versao": NN}
vercel.json         cabeçalhos de segurança (CSP, HSTS, X-Frame-Options, etc.)
.vercelignore       supabase/, README, etc. não são publicados no Vercel
supabase/functions/ código das Edge Functions (a fonte é este repositório)
supabase/functions/_shared/ia.ts    pedirIA(): usa a Claude se existir ANTHROPIC_API_KEY, senão o Gemini; limiteDiario()
supabase/functions/_shared/cors.ts  servir(): CORS por origem (github.io e vercel.app; mais origens no segredo APP_ORIGENS)
supabase/agente/    regras do agente de preços (regras.py gera o SQL de ingredientes_agente) e o seu README
```

**Dentro de `app.bundle.js`:**
- O núcleo fica no topo do ficheiro: `BOOK`, `ING`, `packPrice`, `media`, `aplicaAtivos`, `aplicaLojas`.
- A interface fica dentro de uma IIFE que começa em `(function(){ 'use strict'; var S = ...`.
- O estado da casa é `S`.
- As ações dos botões vão por `data-act` para um mapa de funções, perto do fim do ficheiro.
- As folhas de baixo (ecrãs que sobem por cima da app) estão em `SHEETS`.

**Para testar com Playwright:** copia a app para uma pasta temporária e acrescenta `window.__app = function(code){ return eval(code); };` antes do `})();` final. Assim chegas ao que está dentro da IIFE.

**Ao alterar a app:**
1. Sobe a versão em quatro sítios: `APP_VERSION` em `atualizar.js`, os `?v=` em `index.html` e o número em `version.json`.
2. Corre `node --check app.bundle.js`.

## 4. Base de dados (Supabase)

Todas as tabelas têm RLS ligado. As tabelas internas não têm políticas e o acesso de anon e authenticated foi revogado, por isso só o servidor lhes chega.

| Tabela | Para quê |
| --- | --- |
| `households`, `household_members(user_id, household_id, email, papel)` | casas e pessoas; `papel` é `admin` ou `membro` |
| `casa(id = household_id em texto, state jsonb, saved_at)` | todo o estado de uma casa num JSON (receitas, plano, customIngs, etc.) |
| `convites(email, household_id)` | convites por aceitar |
| `allowed_emails` | emails autorizados a ter conta |
| `precos(id, state)` | preços partilhados: `global` (manual, só o admin), `ativos` (Ativos.pt), `lojas` (agente) |
| `precos_casa(household_id, state)` | preços dos produtos criados por cada casa; só essa casa lê |
| `uso_ia(household_id, dia, funcao, n)` | contagem diária de pedidos de IA |
| `convite_pedidos` | registo de convites, para os limites |
| `lojas_categorias`, `lojas_produtos`, `ingredientes_agente`, `agente_fila`, `agente_config` | agente de preços (`agente_config` guarda a chave privada do agente) |

**Funções SQL:**

| Função | O que faz |
| --- | --- |
| `minha_casa()` | Devolve a casa do utilizador. Se a pessoa tem convite, entra nessa casa (máximo 3 pessoas). Se não tem, cria uma casa nova **vazia** e a pessoa fica `admin`. Sem convite nem email autorizado, dá `sem convite`. |
| `casa_pessoas()` | Lista membros e convites da casa de quem pede. |
| `casa_remover(alvo)` | Só admin: remove alguém ou cancela um convite. |
| `casa_papel(alvo, novo)` | Só admin: muda o papel de alguém; fica sempre pelo menos um admin. |
| `ia_registar(funcao, limite)` | Conta um pedido de IA e diz se ainda está dentro do limite diário. |
| `agente_chamar`, `agente_iniciar`, `agente_passo` | Fazem andar o agente de preços. |

**Cron (pg_cron):**

| Tarefa | Quando | O que faz |
| --- | --- | --- |
| `precos-ativos-semanal` | segundas às 6h | lê os preços do Ativos.pt |
| `agente-precos-categorias` | dia 1 de cada mês | atualiza a lista de categorias das lojas |
| `agente-precos-inicio` | segundas às 3h | começa a leitura das lojas |
| `agente-precos-passo` | todos os minutos | lê 2 páginas por loja; no fim chama `calcular` |

## 5. Edge Functions

| Função | verify_jwt | Limite diário por casa | Notas |
| --- | --- | --- | --- |
| `ler-fatura` | sim | 15 | recebe o TEXTO do PDF (o NIF é retirado) e devolve as linhas em JSON |
| `ler-etiqueta` | sim | 40 | foto JPEG em base64 |
| `sugerir-receita` | sim | 20 | só usa ingredientes da lista; rejeita nomes repetidos (`evitar`) |
| `planear-semana` | sim | 10 | só escolhe entre as opções que a app já validou |
| `ler-link` | sim | 30 | verifica cada redireção (proteção contra SSRF) |
| `convidar-pessoa` | **não** | 1 por email a cada 10 min, 10 por quem convida por dia, 20 por hora sem sessão | só administradores convidam; máximo 3 pessoas contando os convites; sem sessão cria uma casa vazia |
| `agente-precos` | **não** | — | autentica-se pelo cabeçalho `x-agente`, igual a `agente_config.segredo`; modos `categorias`, `pagina` e `calcular` |
| `precos-ativos` | sim | — | |
| `diag-lojas` | sim | — | desativada (responde 410); pode ser apagada no painel |

**Para publicar uma função:** usa a ferramenta MCP `deploy_edge_function` com `index.ts` e os ficheiros partilhados que usa, com os nomes `../_shared/ia.ts` e `../_shared/cors.ts`. Depois confirma que arranca com `net.http_post` a partir do SQL: sem sessão tem de responder 401 "sem sessão".

**Segredos no Supabase:**
- `GEMINI_API_KEY`, `GEMINI_MODEL`, `GEMINI_MODEL_RESERVA`.
- `ANTHROPIC_API_KEY` e `ANTHROPIC_MODEL` são opcionais. Ainda **não** estão postos: o dono adiou. Quando existirem, a Claude passa a ser usada automaticamente, por defeito o modelo `claude-haiku-5-5`.

## 6. Modelo de preços

| Peça | O que é |
| --- | --- |
| `ING[].src` | preço por loja para a quantidade `srcQty` |
| `BOOK[loja][id]` | preço da embalagem |
| `BOOK.ref` | **média** das lojas |
| `packPrice` | escolhe por esta ordem: manual (`precos.global`) > preço da loja > referência |

**O agente de preços:**
- Lê só a primeira página de cada subcategoria, para respeitar o robots.txt.
- Escolhe o produto normal mais barato por kg, litro ou unidade.
- Tem regras para não apanhar produtos errados: `palavras`, `alguma`, `excluir`, `inicio`, uma lista `GERAIS` e uma faixa de 0,4 a 2,5 vezes `ref_base`.
- Pormenores em `supabase/agente/README.md`.

## 7. Como se publica

1. Cria um ramo novo (nunca trabalhes em `main`), faz commit e push.
2. Abre o PR com `gh api repos/bernardonfmendes/amaequesabe/pulls`. O GraphQL está bloqueado neste ambiente.
3. Faz o merge com `gh api -X PUT .../pulls/N/merge`.
4. O GitHub Pages e o Vercel publicam sozinhos a partir de `main`. Confirma que publicaram, pela API de deployments ou por `list_deployments` no Vercel.
5. Mensagens de commit: termina com as linhas de atribuição que o ambiente pedir.

O dono autorizou publicar diretamente ("podes colocar tu").

## 8. Regras de segurança que não se quebram

- No site só pode ir a chave pública anon do Supabase. Nunca a service_role.
- As chaves de IA (Gemini e Anthropic) só podem existir nos Secrets do Supabase: nunca no site, no repositório ou na conversa.
- Não crias contas falsas nem te fazes passar por utilizadores para recolher dados.
- Respeitas o robots.txt das lojas.
- Não apagas dados de utilizadores sem autorização expressa do dono.
- Depois de mudares tabelas ou funções, corres os avisos de segurança do Supabase (`get_advisors security`).

## 9. Por fazer (por ordem)

1. **IA paga.** Os termos do Gemini gratuito não permitem usá-lo numa app para pessoas no Espaço Económico Europeu. Falta pôr `ANTHROPIC_API_KEY` (ou faturação no Gemini) antes do primeiro cliente.
2. **Domínio próprio.** Foi adiado pelo dono. Disponíveis: amaequesabe.com (12,03 USD/ano) e amaequesabe.app pelo Vercel; o .pt compra-se fora. Depois do domínio:
   - ligá-lo ao Vercel;
   - configurar o Resend (está ligado, mas ainda sem domínio) e enviar os emails pelas funções com `generateLink`;
   - acrescentar o domínio em ORIGENS no `cors.ts` e nas Redirect URLs do Supabase.
3. **Emails.** O dono já colou nos modelos do Supabase os emails em português de convite e de palavra-passe. Falta confirmar que chegam bem.
4. **Passar o Vercel a principal.** Antes, o dono tem de testar lá a leitura de faturas em PDF, de etiquetas e de códigos de barras, que não foram testadas no Vercel.
5. **Planos e pagamentos** (fase 3 da análise):
   - tabela de planos por casa;
   - Stripe (mensal e anual; o MB WAY só serve para o anual);
   - bloquear IA e faturas no servidor para quem não paga;
   - um telemóvel por conta;
   - botão de apagar a conta.
6. **Parte legal:**
   - política de privacidade e termos;
   - faturação certificada;
   - Livro de Reclamações Eletrónico;
   - marca no INPI;
   - autorização ou termos de uso dos dados de preços das lojas e do Ativos.pt.
7. **Painel do Supabase:** ligar a proteção contra palavras-passe vazadas.
8. **Dados antigos:**
   - A casa `8ce2d1e7-…` recebeu uma cópia dos dados do dono antes da correção da v32. Só se limpa com autorização do dono.
   - A linha `casa` com id `'casa'` é antiga e já não é usada.

## 10. Problemas conhecidos

- O ícone do ecrã principal do iPhone mostrava um "M" cinzento. O dono pediu para esquecer este assunto.
- O agente só lê a primeira página de cada categoria, por isso alguns ingredientes ficam sem preço numa das lojas.
- O envio de emails incluído no Supabase tem um limite baixo por hora. Serve para testes, não para clientes.
