# la paradeta · ivetanoro

L'enllaç de la bio d'Instagram: totes les eines de l'Ivet, perquè la gent les provi. Es publica a GitHub Pages a **ivetanoro.github.io** (la guia de tallat continua a `/guia-tallat/`).

- `index.html` — la pàgina. Llegeix el catàleg de `cataleg.js`.
- `cataleg.js` — el nom, el lema, les eines (`EINES`) i el que surt difuminat a «aviat» (`AVIAT`).
- `equilibri/` — la versió pública de l'equilibri (feta a partir de `ivetanoro-estudi/eines/equilibri/v5-404.html`): sense el panell de l'estudi ni les dreceres de gravar, amb el botó «posa-hi la teva cara».
- `fonts/` — Bitroad i Bitroad Mono (comprades, en .woff2). La Helvetica no es penja: es fa servir la del sistema.

## Obrir-la
Servidor local `paradeta` a `ivetanoro-portfolio/.claude/launch.json` → http://127.0.0.1:8790

## Canviar el nom
`nom` a `cataleg.js`, i el `<title>` i els `og:` d'`index.html`.

## Afegir una eina
Una entrada nova a `EINES` (els camps són a dalt de tot de `cataleg.js`). Si no té imatge, `rajola` en fa una de tipogràfica.

## Vendre (Stripe)
A Stripe, crea un Payment Link del producte i posa a l'entrada `preu: "9 €"` i `stripe: "https://buy.stripe.com/…"`. La targeta treu sola el botó «compra-la · 9 €». No cal servidor.
