// El catàleg de la paradeta. Per afegir una eina, afegeix-ne una entrada a EINES (l'ordre és el de la pàgina).
// Camps: titol, frase, fitxa ([etiqueta, valor] × 2), boto {text, url}, enllac2 {text, url} (opcional),
// etiqueta (adhesiu sobre la imatge, p. ex. "nova"), i visual:
//   {imatge: "img/…"} · {fons: "img/…", logo: "img/…"} · {ui: "timeline"}
// Per vendre-la: preu ("9 €") i stripe (l'enllaç de pagament de Stripe, https://buy.stripe.com/…).
// A AVIAT, les que encara no hi són: surten difuminades. «llista» hi posa un botó per apuntar-s'hi.
// La bústia envia les peticions amb Web3Forms: la clau (no el correu) va a bustia.clau. Sense clau, la bústia no surt.

window.PARADETA = {
  nom: "la paradeta",
  lema: "les eines que faig, perquè les provis.",
  actualitzat: "29.10",
  instagram: "https://www.instagram.com/ivetanoro/",
  bustia: { clau: "2d063f5c-0977-426c-98f8-42de75fbe5a1" },   // clau pública de Web3Forms (envia a l’Ivet; no ensenya el correu)
};

// EINES i AVIAT surten del panell de la paradeta (amb /paradeta). Si els canvies a mà, la passada següent ho recull.
window.EINES = [
  {
    etiqueta: "nova",
    titol: "intentant trobar l’equilibri",
    frase: "vocació, vida i sou: tria’n dos i mira què li passa a la cara. hi pots posar la teva.",
    fitxa: [["cal", "res"], ["on", "mòbil o ordinador"]],
    boto: { text: "prova-la", url: "equilibri/" },
    visual: { imatge: "img/equilibri.jpg" },
  },
  {
    titol: "tallat",
    frase: "l’editor de reels en català. talles el vídeo tocant les paraules, com si fos un text.",
    fitxa: [["cal", "Claude o Codex"], ["on", "Mac o Windows"]],
    boto: { text: "instal·la’l", url: "https://ivetanoro.github.io/guia-tallat/" },
    visual: { fons: "img/tallat-cafe.jpg", logo: "img/tallat-wordmark.png" },
  },
];

window.AVIAT = [
  { titol: "app d’estil", frase: "poses un reel que t’agrada i el teu vídeo, i te’l torna editat amb aquell estil.",
    llista: { text: "apunta’t", url: "https://tally.so/r/bZ5NyE?origen=paradeta" } },
  { titol: "entre línies", frase: "escrius una paraula i les lletres li fan lloc." },
  { titol: "el mandala", frase: "un objectiu, vuit pilars i seixanta-quatre accions: el teu pla per créixer, en una graella." },
];
