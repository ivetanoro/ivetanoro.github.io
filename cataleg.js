// El catàleg de la paradeta. Per afegir una eina, afegeix-ne una entrada a EINES (l'ordre és el de la pàgina).
// La que porta «destacada: true» surt a dalt de tot, en gran.
// Camps: titol, frase, fitxa ([etiqueta, valor] × 3), boto {text, url}, enllac2 {text, url} (opcional),
// imatge (ruta) o rajola {fons: "oxblood" | "espresso" | "blue", text}.
// Per vendre-la: preu ("9 €") i stripe (l'enllaç de pagament de Stripe, https://buy.stripe.com/…).
// A AVIAT, les que encara no hi són: surten difuminades. «llista» hi posa un botó per apuntar-s'hi.

window.PARADETA = {
  nom: "la paradeta",
  lema: "les eines que faig, perquè les provis. de moment, totes gratis.",
  actualitzat: "29.10",
  instagram: "https://www.instagram.com/ivetanoro/",
};

window.EINES = [
  {
    destacada: true,
    etiqueta: "nova · 29.10",
    titol: "intentant trobar l’equilibri",
    frase: "vocació, vida i sou: tria’n dos. mou els punts i mira què li passa a la cara. també hi pots posar la teva.",
    fitxa: [["cal", "res"], ["on", "mòbil o ordinador"], ["dura", "1 minut"]],
    boto: { text: "prova-la", url: "equilibri/" },
    imatge: "img/equilibri.jpg",
  },
  {
    titol: "tallat",
    frase: "l’editor de reels en català. talles el vídeo tocant les paraules, com si fos un text, i li poses subtítols animats.",
    fitxa: [["cal", "Claude o Codex"], ["on", "Mac o Windows"], ["preu", "gratis"]],
    boto: { text: "com l’instal·lo", url: "https://ivetanoro.github.io/guia-tallat/" },
    enllac2: { text: "el codi", url: "https://github.com/ivetanoro/tallat" },
    rajola: { fons: "oxblood", text: "tallat" },
  },
  {
    titol: "prova d’animacions",
    frase: "puges el teu vídeo i Claude et proposa animacions just quan dius cada cosa. tries les que t’agraden i el descarregues.",
    fitxa: [["cal", "compte de Claude"], ["on", "ordinador amb Chrome"], ["preu", "gratis"]],
    boto: { text: "obre-la", url: "https://claude.ai/artifact/EjHXuNkUU1mVNZxVwPRZT2" },
    rajola: { fons: "espresso", text: "anima" },
  },
];

window.AVIAT = [
  { titol: "app d’estil", frase: "poses un reel que t’agrada i el teu vídeo, i te’l torna editat amb aquell estil.",
    llista: { text: "apunta’t a la llista", url: "https://tally.so/r/bZ5NyE?origen=paradeta" } },
  { titol: "massa idees", frase: "el teu tauler d’idees al mòbil: les dius i s’ordenen soles." },
  { titol: "s’hauria de dir més", frase: "paraules catalanes que s’haurien de dir més, i les votes." },
  { titol: "filtre beauty", frase: "el filtre de pell per als reels, sense passar per CapCut." },
  { titol: "entre línies", frase: "escrius una paraula i les lletres li fan lloc." },
];
