# Agente de preços (Continente, Pingo Doce, Auchan)

Recolha semanal dos preços das três lojas, feita no Supabase. Respeita os `robots.txt` das lojas:
lê só páginas de categoria (sem pesquisa interna, paginação nem ordenação), devagar (2 páginas por loja por minuto).

## Peças
- `supabase/functions/agente-precos` — Edge Function com três modos: `categorias` (mapas de site → `lojas_categorias`),
  `pagina` (uma página de categoria → `lojas_produtos`) e `calcular` (produto mais barato por kg/l/un para cada
  ingrediente → linha `lojas` da tabela `precos`, que a app lê). Só aceita pedidos com a chave guardada em `agente_config`.
- Tabelas privadas (RLS sem políticas): `lojas_categorias`, `lojas_produtos`, `ingredientes_agente`, `agente_fila`, `agente_config`.
- Funções SQL: `agente_chamar(corpo)`, `agente_iniciar()` (enche a fila), `agente_passo()` (2 páginas por loja; no fim calcula).
- `pg_cron`: `agente-precos-categorias` (dia 1 de cada mês, 02:30 UTC), `agente-precos-inicio` (segundas, 03:00 UTC),
  `agente-precos-passo` (cada minuto; sem fila não faz nada).

## Regras de procura
`regras.py` gera o SQL de `ingredientes_agente` (palavras obrigatórias, alternativas, exclusões e preço de referência).
Um produto só é aceite se o preço por kg/l/un estiver entre 40 % e 250 % do preço de referência do ingrediente.
Os ingredientes novos criados na app (`customIngs`) entram automaticamente, com palavras tiradas do nome.

Além disso, a palavra principal tem de aparecer no início do nome do produto (antes dela só marcas, palavras do
próprio ingrediente, palavras de apresentação como "posta" ou "filetes", e as indicadas em `inicio`). Assim
"Pastéis de Bacalhau", "Quiche de Salmão" ou "Sementes de Linhaça Dourada" não contam como bacalhau, salmão ou dourada.
Há também uma lista geral de palavras que excluem sempre (preparados, sobremesas, misturas, etc.).

## Recolher já, à mão (SQL Editor)
```sql
select public.agente_iniciar();   -- põe as páginas na fila; o passo de cada minuto faz o resto
```
