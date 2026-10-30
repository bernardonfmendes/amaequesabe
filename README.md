# A Mãe é que Sabe

App partilhada de receitas, planeamento semanal, custos e lista de compras, para duas pessoas (a casa).
Corre em GitHub Pages e guarda os dados no Supabase. Sem ligação, funciona só neste dispositivo.

## Estrutura

- `src/` — código-fonte, dividido por módulos (dados, nutrição, lógica, interface).
- `build.sh` — junta `src/` em `app.bundle.js` e gera `index.html`. Correr sempre depois de editar `src/`.
- `config.js` — URL do projeto Supabase e chave **anon** (pública; a segurança está nas regras RLS).
- `supabase-schema.sql` — tabelas `allowed_emails` e `casa`, regras de acesso e publicação em tempo real.
- `tests/` — testes de lógica (Node) e um teste de fumo de navegador (Playwright, 400 px).

## Configuração (uma vez)

1. No Supabase, SQL Editor: correr `supabase-schema.sql`.
   Antes, substituir `EMAIL_DA_MULHER@exemplo.com` pelo email real dela.
2. Authentication → Users: criar os dois utilizadores com email e palavra-passe
   (ou usar "Send password recovery" para cada um definir a sua).
3. Authentication → Providers → Email: desligar **Allow new users to sign up**,
   para que ninguém se registe sozinho. O acesso aos dados já é bloqueado pelas regras RLS
   para emails que não estejam em `allowed_emails`.
4. Authentication → URL Configuration: em **Site URL** pôr
   `https://bernardonfmendes.github.io/amaequesabe/` e acrescentar o mesmo endereço em **Redirect URLs**
   (é para onde vai o link de "Esqueci-me da palavra-passe").
5. GitHub Pages: origem = branch principal, pasta raiz.

## Como entrar

- A app abre no ecrã de entrada: email e palavra-passe. Há dois botões com os emails da casa, para preencher mais depressa.
- Sem sessão não se vê nem se altera nada.
- **Esqueci-me da palavra-passe** envia um link para definir uma nova.
- Depois de entrar, a semana, as receitas, os preços e a lista são os mesmos para os dois.
- Para sair: botão **Casa e dados** no cabeçalho → **Sair**.

## Cópia de segurança

Na folha "Casa e dados":
- **Exportar dados** descarrega um ficheiro `.json` com tudo.
- **Importar ficheiro** repõe a partir de um ficheiro exportado (e envia para a casa).
- **Restaurar cópia deste dispositivo** recupera a versão local que foi posta de lado quando a casa tinha uma versão mais recente.

## Ler fatura (PDF)

Na zona de **Preços**, o botão **Ler fatura** aceita o PDF de uma fatura de supermercado.
- A app reconhece o supermercado (Pingo Doce, Continente, Auchan, Lidl, Mercadona) e lê as linhas de artigos.
- Os preços guardados são os **de tabela**, sem descontos.
- Nada fica marcado por defeito: confirmas cada linha, escolhes o ingrediente e confirmas o preço da embalagem.
- A app compara a soma das linhas com o total da fatura e avisa se não bater certo.
- Só funciona com PDF com texto. Fotos ainda não são lidas por esta função.
- Se o produto não existir, **+ Criar ingrediente com esta linha** cria-o com o nome e o tamanho da fatura.
- Cada linha tem a **quantidade comprada** (ex.: 24 unidades). A app calcula o preço por unidade (ex.: 6,49 € ÷ 24 = 0,27 € por ovo).

## Guardar na casa

- Cada alteração fica guardada neste dispositivo logo, e o cabeçalho mostra **Alterações por guardar**.
- Para enviar para a casa, carrega em **Guardar**. Antes de enviar, a app verifica se a casa mudou entretanto;
  se mudou, não sobrescreve: as tuas alterações ficam numa cópia de segurança (Casa e dados) e a versão da casa é carregada.
- A app avisa antes de fechar a página se houver alterações por guardar.

## Desenvolvimento

```sh
./build.sh                 # gera app.bundle.js e index.html
node tests/test-nutri.js   # nutrição e planeamento
node tests/test-accept.js  # aceitação da semana e lista de compras
node tests/test-scan.js    # leitura de etiquetas
```

## Leitura de faturas com IA (Gemini, opcional)

A função `supabase/functions/ler-fatura/index.ts` pede ao Gemini a lista de artigos de uma fatura. A chave **nunca** vai para o site.

1. Supabase → **Edge Functions** → **Secrets** (ou Project Settings → Edge Functions): adicionar o segredo `GEMINI_API_KEY` com a chave do AI Studio.
2. Edge Functions → **Deploy a new function** → **Via editor**: nome `ler-fatura`, colar o conteúdo de `supabase/functions/ler-fatura/index.ts` e publicar.
3. Opcional: segredo `GEMINI_MODEL` com o nome do modelo indicado no AI Studio (por defeito `gemini-2.5-flash`).
4. Se a IA não responder, a app usa a leitura básica e avisa no ecrã de revisão.


## Planear a semana com IA (Gemini, opcional)

Na secção **Semana**, o botão **Planear com IA** preenche só as refeições vazias. A IA escolhe entre as receitas que já encaixam em cada refeição (proteína, sopa, pequeno-almoço) e respeita o orçamento que sobra. O planeador normal fecha o que a IA deixar de fora, e se a IA falhar a app usa esse planeador.
- Função: `supabase/functions/planear-semana/index.ts` (mesmo segredo `GEMINI_API_KEY` de `ler-fatura`).
- A IA não pode inventar receitas nem ultrapassar as regras: no máximo 2 refeições de carne vermelha, 1 de charcutaria, e cada receita até 2 vezes.

## Publicar uma versão nova (aviso de atualização)
Em cada publicação que mude a app, sobe o número em três sítios:
1. `version.json` → `"versao"` (é o que a app compara; a app mostra o aviso quando este número é maior).
2. `index.html` → `var APP_VERSION` (versão que esta página traz).
3. `index.html` → `?v=` dos scripts `config.js` e `app.bundle.js` (para o Safari não usar a cópia antiga).
