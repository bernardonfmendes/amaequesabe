  /* Versão desta página. Ao publicar uma versão nova, sobe este número, version.json e o ?v= dos scripts. */
  var APP_VERSION = 32;
  /* Atualiza a app mesmo quando o telemóvel (Safari, app no ecrã principal) guarda uma versão antiga:
     volta a pedir ao servidor a página e os scripts, e depois recarrega. */
  function atualizarApp(botao){
    if (botao){ botao.disabled = true; botao.textContent = 'A atualizar…'; }
    var urls = Array.prototype.map.call(document.querySelectorAll('script[src]'), function(s){ return s.src; });
    urls.push(location.href.split('?')[0]);
    Promise.all(urls.map(function(u){
      return fetch(u, { cache: 'reload' }).catch(function(){ return null; });
    })).then(function(){
      location.replace(location.pathname + '?atualizado=' + Date.now());
    }, function(){
      location.reload();
    });
  }
  (function(){
    /* o botão "Procurar nova versão" está dentro do Menu (criado depois), por isso usa delegação */
    document.addEventListener('click', function(e){
      var btn = e.target && e.target.closest ? e.target.closest('#appRefresh') : null;
      if (btn) atualizarApp(btn);
    });

    /* Aviso quando existe uma versão mais nova publicada (version.json é pedido sem cache). */
    var banner = document.getElementById('updBanner');
    var ultimoAviso = 0;
    function mostrarAviso(){
      if (!banner || !banner.hidden) return;
      banner.hidden = false;
    }
    function verificarVersao(){
      if (!banner) return;
      fetch('version.json?t=' + Date.now(), { cache: 'no-store' })
        .then(function(r){ return r.ok ? r.json() : null; })
        .then(function(d){
          if (d && Number(d.versao) > APP_VERSION) mostrarAviso();
        })
        .catch(function(){ /* sem rede: não há aviso */ });
    }
    var upd = document.getElementById('updAtualizar');
    if (upd) upd.addEventListener('click', function(){ atualizarApp(upd); });
    var dispensar = document.getElementById('updDepois');
    if (dispensar) dispensar.addEventListener('click', function(){ banner.hidden = true; });

    setTimeout(verificarVersao, 3000);
    setInterval(verificarVersao, 30 * 60 * 1000);
    document.addEventListener('visibilitychange', function(){
      if (document.visibilityState === 'visible' && Date.now() - ultimoAviso > 60000){ ultimoAviso = Date.now(); verificarVersao(); }
    });
  })();
