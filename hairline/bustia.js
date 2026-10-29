/**
 * Bústia: a country mailbox on a post: a box with a round roof, a door on its
 * near end that drops open, a flag on its side. The pointer is projected onto
 * a plane at the door's height; the nearer it is to the door, the further the
 * door drops, on one spring. envia() slides a slip in through the door and
 * raises the flag, which takes the bright stroke; torna() lowers it again;
 * atent(on) holds the door ajar while someone writes. The slider is the reach.
 *
 * The pattern: a field with one part. A hit test on a fixed plane, a falloff
 * that reaches a floor, and tweens for the post going in.
 */
const {
  Cam, clamp, facing, fillet, fit, hull, lerp, open, poly, prism, proj, rad, rings, run, seg, unproj,
  spring, stepS, tween, tset, tval, tdone, mk, place, pointer, put, register, disposer, solid,
} = HL;

const L = 60, W = 30, ZB = 50, HW = 15, B = 1.6;        // the box: length, width, floor, wall height, crease inset
const ZH = ZB + B, DH = HW + W / 2 - 2 * B, FT = 1.2;   // the door: hinge height, height, thickness
const REST = 8, OPEN = 96, WAIT = 40, TURN = 51;        // door angles; past TURN its inside faces us
const FY = W + 1.5, PX = 9, PZ = ZB + 11;               // the flag's plane and its pivot
const SL = 24, SY0 = 7, SY1 = 23, SZ = ZB + 5.5;        // the slip, lying flat
const FLAG = [[-3, -1.6], [34, -1.6], [34, 12], [20, 12], [20, 1.6], [-3, 1.6]];

const ease = (s) => s * s * (3 - 2 * s);

/** The box's end, inset by b: rounded feet, straight walls, a round roof, as [y, z] around. */
function arch(b) {
  const r = W / 2 - b, pts = [[b, ZB + b], [W - b, ZB + b]];
  for (let k = 0; k <= 20; k++) pts.push([W / 2 + r * Math.cos((Math.PI * k) / 20), ZB + HW + r * Math.sin((Math.PI * k) / 20)]);
  return fillet(pts, pts.map((_, i) => (i < 2 ? 3 - b : 0)), 3);
}

function mount({ stage, svg, read }, value) {
  const bag = disposer();
  let R = value, over = null, near = 0, wait = false, phase = 0, got = false, done = null;

  // Fitted to the door dropped open and the flag up, the two poses that reach furthest.
  const C = Cam(45, 0.5, 2.45);
  fit(C, [[16, 1, -5], [44, 29, -5], [44, 1, -5], [16, 29, -5], [0, W / 2, ZB + 30], [0, 0, ZB], [0, W, ZB + HW],
    [L + DH + 1, 0, ZH], [L + DH + 1, W, ZH], [PX - 12, FY + FT, PZ + 34], [PX + 34, FY + FT, PZ + 12]], 200, 170);
  const P = proj(C), front = facing(C);
  const at = (x) => (p) => P(x, p[0], p[1]);
  const g = mk("g", {}, svg);
  const block = (x0, y0, x1, y1, r, b, z0, z1) => {
    const [ring, inner] = rings(x0, y0, x1, y1, r, b);
    put(solid(g), prism(P, front, ring, inner, z0, z1));
  };

  // Back to front: the base, the post, the box (its silhouette, and its open end as the crease), two rolled ribs.
  block(16, 1, 44, 29, 8, 2, -5, 0);
  block(25, 10, 35, 20, 2, 0.8, 0, ZB + 2);
  const end = arch(0), mouth = arch(B);
  put(solid(g), { sil: poly(hull(end.map(at(0)).concat(end.map(at(L))))), crease: poly(mouth.map(at(L))) });
  const seen = run(end, (p) => (p[0] - W / 2) * 0.61 + (p[1] - ZB - HW) * 0.5 > 0);
  for (const x of [5, L - 5]) mk("path", { d: open(seen.map(at(x))), class: "nf lo" }, g);

  // The door, then the slip over it, then the flag on the near side.
  const doorBack = mk("path", { class: "lo" }, g), doorFace = mk("path", { class: "sil" }, g);
  const knob = mk("circle", { r: 1.1, class: "dot m" }, g);
  const slipBack = mk("path", { class: "lo" }, g), slipFace = mk("path", { class: "sil" }, g);
  const slipRule = mk("path", { class: "nf lo" }, g);
  const flagBack = mk("path", { class: "lo" }, g), flagFace = mk("path", { class: "sil" }, g);
  place(mk("circle", { r: 1.2, class: "dot m" }, g), P(PX, FY + FT + 0.1, PZ));

  /** The door dropped d degrees about its hinge; off lifts a point off its inside, along its normal. */
  const onDoor = (d, off) => {
    const c = Math.cos(rad(d)), s = Math.sin(rad(d));
    return (p) => { const h = p[1] - ZH; return P(L + 0.3 + h * s + off * c, p[0], ZH + h * c - off * s); };
  };
  function drawDoor(d) {
    const out = poly(mouth.map(onDoor(d, FT))), inn = poly(mouth.map(onDoor(d, 0)));
    doorBack.setAttribute("d", d < TURN ? inn : out);
    doorFace.setAttribute("d", d < TURN ? out : inn);
    place(knob, onDoor(d, FT + 0.1)([W / 2, ZH + DH - 4]));
  }
  /** The slip with its back edge at x; whatever has gone past the door is inside the box, so it is not drawn. */
  function drawSlip(x) {
    const x0 = Math.max(L, x), els = [slipBack, slipFace, slipRule];
    if (x + SL - x0 < 0.6) { els.forEach((el) => el.setAttribute("d", "")); return; }
    const r = x0 > x ? 0 : 1.2, pts = fillet([[x0, SY0], [x + SL, SY0], [x + SL, SY1], [x0, SY1]], [r, 1.2, 1.2, r]);
    const on = (z) => (p) => P(p[0], p[1], z);
    slipBack.setAttribute("d", poly(pts.map(on(SZ - 0.8))));
    slipFace.setAttribute("d", poly(pts.map(on(SZ))));
    slipRule.setAttribute("d", [SY0 + 4, SY0 + 8, SY0 + 12].filter(() => x + SL - 4 > x0 + 1)
      .map((y) => seg(P(Math.max(x0, x + 4), y, SZ), P(x + SL - 4, y, SZ))).join(""));
  }
  const flagShape = fillet(FLAG, [1.5, 1.2, 1.2, 1.2, 0.8, 1.5]);
  /** The flag turned ph degrees about its pivot: 0 lies along the box, 90 stands up. */
  function drawFlag(ph) {
    const c = Math.cos(rad(ph)), s = Math.sin(rad(ph));
    const on = (y) => (p) => P(PX + p[0] * c - p[1] * s, y, PZ + p[0] * s + p[1] * c);
    flagBack.setAttribute("d", poly(flagShape.map(on(FY))));
    flagFace.setAttribute("d", poly(flagShape.map(on(FY + FT))));
  }

  // Where the slip starts: far enough out that all of it is past the frame's right or bottom edge.
  const outside = (x) => {
    const cs = [[x, SY0], [x, SY1], [x + SL, SY0], [x + SL, SY1]].map((p) => P(p[0], p[1], SZ - 0.8));
    return cs.every((q) => q[0] > 402) || cs.every((q) => q[1] > 322);
  };
  let from = L + DH;
  while (!outside(from)) from += 4;
  const INSIDE = L - SL - 4;
  const door = spring(REST), flag = tween(0);
  let slip = tween(INSIDE);

  /** The door's target: the pointer's reach, ajar while someone writes, wide open while a slip goes in. */
  function aim(now) {
    near = over ? clamp(1 - Math.hypot(over[0] - L, over[1] - W / 2) / R, 0, 1) : 0;
    const feeding = phase === 1 || (phase === 2 && tval(slip, now) + SL > L);
    door.t = feeding ? OPEN : Math.max(wait ? WAIT : REST, lerp(REST, OPEN, ease(near)));
  }
  /** One bright: the door while it is the thing to reach for, the flag once something is posted. */
  function mark() {
    const reaching = near > 0 || !got;
    doorFace.classList.toggle("hi", reaching);
    flagFace.classList.toggle("hi", !reaching);
    read.textContent = near > 0 ? `porta ${Math.round(door.t)}°` : got ? "rebuda" : "rest";
  }

  let dx = NaN, sx = NaN, gx = NaN;
  const T = register(stage, (dt, now) => {
    if (phase === 1 && tdone(slip, now)) { phase = 2; tset(slip, INSIDE, now, 0); tset(flag, 90, now, 350); got = true; mark(); }
    else if (phase === 2 && tdone(slip, now) && tdone(flag, now)) { phase = 0; if (done) { done(); done = null; } }
    if (phase) aim(now);
    const m = stepS(door, dt);
    if (door.x !== dx) drawDoor((dx = door.x));
    const x = tval(slip, now), ph = tval(flag, now);
    if (x !== sx) drawSlip((sx = x));
    if (ph !== gx) drawFlag((gx = ph));
    return m || phase > 0 || !tdone(flag, now);
  });
  bag.add(T.unregister);

  const update = () => { aim(performance.now()); mark(); T.wake(); };
  bag.add(pointer(stage, {
    move: (p) => { over = unproj(C, p[0], p[1], ZB + HW); update(); },
    leave: () => { over = null; update(); },
  }));
  bag.add(() => svg.replaceChildren());
  update();

  return {
    set: (v) => { R = v; update(); },
    envia: () => {
      if (phase) return Promise.resolve();
      const now = performance.now();
      slip = tween(from); tset(slip, L + 6, now, 0); tset(flag, 0, now, 0);
      got = false; phase = 1; update();
      return new Promise((r) => { done = r; });
    },
    torna: () => { if (phase || !got) return; got = false; tset(flag, 0, performance.now(), 0); update(); },
    atent: (on) => { wait = !!on; update(); },
    destroy: bag.dispose,
  };
}

hairline({
  name: "bustia",
  means: "Una bústia en un pal: la porta s’obre quan t’hi acostes, i la banderola puja quan hi tires una petició.",
  rules: [1, 3, 4, 5],
  range: [18, 30, 46],
  tour: [[146, 138], [214, 132], [233, 148], [181, 218], null],
  mount,
});
