// Dins del navegador d'Instagram (i del de Facebook, Threads o TikTok) no es pot baixar cap fitxer:
// el botó no fa res. Aquí, sota cada enllaç de baixada (<a download>), surt un avís per obrir la pàgina
// al navegador i un botó per copiar l’enllaç. A Android, també un botó que l’obre al navegador de la persona.
// Un enllaç pot portar el seu propi avís a data-avis-app. Per provar-ho fora d'Instagram: ?app=1.
(function () {
  var ua = navigator.userAgent || "";
  var dinsApp = /Instagram|FBAN|FBAV|FB_IAB|Threads|Barcelona|musical_ly|Bytedance|TikTok/i.test(ua)
    || /[?&]app=1\b/.test(location.search);
  if (!dinsApp) return;
  var android = /Android/i.test(ua);
  var u = new URL(location.href); u.searchParams.delete("app"); u.hash = "";
  var enllac = u.href;

  var css = document.createElement("style");
  css.textContent =
    ".avis-app{margin:12px 0 0;padding:12px 14px;border:1.5px solid currentColor;border-radius:8px;font-size:14px;line-height:1.4;text-align:left}" +
    ".avis-app p{margin:0 0 10px}.avis-app.toca{animation:avis-app .5s}" +
    ".avis-app button,.avis-app a{display:inline-block;margin:0 8px 0 0;padding:8px 12px;border:1.5px solid currentColor;border-radius:6px;background:transparent;color:inherit;font:inherit;font-weight:700;text-decoration:none;cursor:pointer}" +
    "@keyframes avis-app{25%{transform:translateX(-4px)}75%{transform:translateX(4px)}}" +
    "@media (prefers-reduced-motion:reduce){.avis-app.toca{animation:none}}";
  document.head.appendChild(css);

  var general = "dins d’instagram no es pot baixar res. obre aquesta pàgina al navegador: toca els tres punts de dalt a la dreta i tria obrir-la al navegador.";

  document.querySelectorAll("a[download]").forEach(function (a) {
    var avis = document.createElement("div");
    avis.className = "avis-app";
    avis.setAttribute("role", "status");
    var p = document.createElement("p");
    p.textContent = a.getAttribute("data-avis-app") || general;
    avis.appendChild(p);

    var copia = document.createElement("button");
    copia.type = "button";
    copia.textContent = "copia l’enllaç";
    copia.addEventListener("click", function () {
      var fet = function () { copia.textContent = "copiat ✓"; };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(enllac).then(fet, function () { prompt("copia l’enllaç:", enllac); });
      } else { prompt("copia l’enllaç:", enllac); }
    });
    avis.appendChild(copia);

    if (android) {   // sense «package»: Android l'obre amb el navegador que la persona fa servir
      var obre = document.createElement("a");
      obre.href = "intent://" + enllac.replace(/^https?:\/\//, "") + "#Intent;scheme=https;action=android.intent.action.VIEW;category=android.intent.category.BROWSABLE;end";
      obre.textContent = "obre-la al navegador";
      avis.appendChild(obre);
    }

    a.insertAdjacentElement("afterend", avis);
    a.addEventListener("click", function (e) {
      e.preventDefault();
      avis.classList.remove("toca"); void avis.offsetWidth; avis.classList.add("toca");
    });
  });
})();
