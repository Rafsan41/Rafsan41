const fs   = require('fs');
const path = require('path');

const photoBase64 = fs.readFileSync(
  path.join(__dirname, 'Public', '20180526_043831-removebg-preview.png')
).toString('base64');
const photoSrc = `data:image/png;base64,${photoBase64}`;

// ── ICON CONTENT (centered at 0,0) ───────────────────────────────────────
const I = {
  ts: `<text y="5" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-weight="900" font-size="13" fill="white">TS</text>`,
  react: `
    <ellipse rx="9.5" ry="3.6" fill="none" stroke="#61DAFB" stroke-width="1.4"/>
    <ellipse rx="9.5" ry="3.6" fill="none" stroke="#61DAFB" stroke-width="1.4" transform="rotate(60)"/>
    <ellipse rx="9.5" ry="3.6" fill="none" stroke="#61DAFB" stroke-width="1.4" transform="rotate(120)"/>
    <circle r="2.2" fill="#61DAFB"/>`,
  next: `<text y="5" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-weight="900" font-size="15" fill="white">N</text>`,
  prisma: `
    <polygon points="0,-8 7,4 -7,4" fill="none" stroke="white" stroke-width="1.6" stroke-linejoin="round"/>
    <line x1="0" y1="-8" x2="0" y2="4" stroke="white" stroke-width="1.2" opacity="0.7"/>`,
  node: `
    <text y="2"  text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-weight="900" font-size="8.5" fill="white">NODE</text>
    <text y="11" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-weight="900" font-size="7.5" fill="white">.JS</text>`,
  mongo: `<text y="5" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-weight="900" font-size="9.5" fill="white">MDB</text>`,
  pg:    `<text y="4" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-weight="900" font-size="11"   fill="white">PG</text>`,
};

// Floating bubble — uses animateTransform additive="sum" to AVOID CSS/SVG transform conflict
function bubble(x, y, r, color, icon, dur, delay) {
  return `
<g transform="translate(${x},${y})">
  <circle r="${r}" fill="${color}" stroke="rgba(255,255,255,0.35)" stroke-width="2.5"/>
  ${icon}
  <animateTransform attributeName="transform" type="translate" additive="sum"
    values="0,0; 0,-10; 0,0" dur="${dur}s" begin="${delay}s"
    repeatCount="indefinite" calcMode="spline"
    keyTimes="0;0.5;1" keySplines=".45,0,.55,1;.45,0,.55,1"/>
</g>`;
}

// Center chip — static position, no conflicting transform animation
function chip(x, y, color, icon) {
  return `
<g transform="translate(${x},${y})">
  <circle r="17" fill="${color}" stroke="rgba(255,255,255,0.3)" stroke-width="2"/>
  ${icon}
</g>`;
}

// ── SVG ───────────────────────────────────────────────────────────────────
const svg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
  width="900" height="280" viewBox="0 0 900 280">
<defs>
  <style>
    /* Only non-transform CSS animations — safe on GitHub */
    @keyframes shimmer { 0%,100%{fill:#1e0a3c} 50%{fill:#7c3aed} }
    @keyframes fadeUp  { from{opacity:0} to{opacity:1} }
    .name-txt { animation: shimmer 4s linear 1.5s infinite; }
    .center-g { animation: fadeUp 0.8s ease 0.3s both; }
  </style>

  <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="0%">
    <stop offset="0%"   stop-color="#7c6ff7">
      <animate attributeName="stop-color" values="#7c6ff7;#9b7ff5;#7c6ff7" dur="8s" repeatCount="indefinite"/>
    </stop>
    <stop offset="45%"  stop-color="#a78bfa"/>
    <stop offset="75%"  stop-color="#c4b5fd">
      <animate attributeName="stop-color" values="#c4b5fd;#ddd6fe;#c4b5fd" dur="8s" repeatCount="indefinite"/>
    </stop>
    <stop offset="100%" stop-color="#e0d7ff"/>
  </linearGradient>

  <radialGradient id="glow" cx="58%" cy="45%" r="50%">
    <stop offset="0%"   stop-color="white" stop-opacity="0.22"/>
    <stop offset="100%" stop-color="white" stop-opacity="0"/>
  </radialGradient>

  <clipPath id="photoClip">
    <rect x="655" y="0" width="245" height="280"/>
  </clipPath>

  <filter id="photoShadow">
    <feDropShadow dx="-5" dy="0" stdDeviation="10" flood-color="rgba(80,40,180,0.3)"/>
  </filter>
</defs>

<!-- BACKGROUND -->
<rect width="900" height="280" fill="url(#bgGrad)"/>
<rect width="900" height="280" fill="url(#glow)"/>

<!-- ── LEFT FLOATING BUBBLES (animateTransform, not CSS) ── -->
${bubble(36,  90,  22, '#3178C6', I.ts,     3.5, 0.0)}
${bubble(77,  155, 22, '#20232A', I.react,  4.0, 0.5)}
${bubble(36,  215, 18, '#111111', I.next,   4.5, 1.0)}
${bubble(108, 222, 14, '#2D3748', I.prisma, 3.8, 0.3)}
${bubble(148, 118, 19, '#339933', I.node,   3.2, 0.7)}
${bubble(165, 65,  15, '#47A248', I.mongo,  4.2, 1.2)}

<!-- Pulsing connector dots (SVG animate, no CSS) -->
<circle cx="58"  cy="112" r="3" fill="rgba(90,50,190,0.45)">
  <animate attributeName="r"       values="3;5;3"         dur="2.0s" repeatCount="indefinite"/>
  <animate attributeName="opacity" values="0.45;0.8;0.45" dur="2.0s" repeatCount="indefinite"/>
</circle>
<circle cx="100" cy="170" r="2.5" fill="rgba(90,50,190,0.45)">
  <animate attributeName="r"       values="2.5;4.5;2.5"   dur="2.5s" repeatCount="indefinite"/>
  <animate attributeName="opacity" values="0.45;0.8;0.45" dur="2.5s" repeatCount="indefinite"/>
</circle>
<circle cx="165" cy="90"  r="2"   fill="rgba(90,50,190,0.4)">
  <animate attributeName="r"       values="2;4;2"         dur="1.8s" repeatCount="indefinite"/>
  <animate attributeName="opacity" values="0.35;0.75;0.35" dur="1.8s" repeatCount="indefinite"/>
</circle>
<circle cx="38"  cy="152" r="2"   fill="rgba(90,50,190,0.35)">
  <animate attributeName="r"       values="2;3.5;2"       dur="2.2s" repeatCount="indefinite"/>
  <animate attributeName="opacity" values="0.3;0.7;0.3"   dur="2.2s" repeatCount="indefinite"/>
</circle>

<!-- Collaborate button with SVG animate pulse -->
<g>
  <rect x="18" y="18" width="150" height="32" rx="16" fill="#7c3aed">
    <animate attributeName="opacity" values="1;0.82;1" dur="2.4s" repeatCount="indefinite"/>
  </rect>
  <text x="93" y="39" text-anchor="middle"
        font-family="Segoe UI,Arial,sans-serif" font-weight="700" font-size="12.5" fill="white">
    Let's Collaborate!
    <animate attributeName="opacity" values="1;0.82;1" dur="2.4s" repeatCount="indefinite"/>
  </text>
</g>

<!-- ── CENTER CONTENT ── -->
<g class="center-g">

  <!-- Name -->
  <text x="415" y="108" text-anchor="middle"
        font-family="Segoe UI,Arial,sans-serif" font-weight="900" font-size="38" letter-spacing="-0.5"
        class="name-txt">Rafsan Dipto</text>

  <!-- Decorative arrow -->
  <path d="M590,85 Q606,78 608,92 L596,90"
        fill="none" stroke="#7c3aed" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>

  <!-- Title -->
  <text x="440" y="134" text-anchor="middle"
        font-family="Segoe UI,Arial,sans-serif" font-weight="600" font-size="13.5"
        fill="#4c1d95" letter-spacing="1.2">FULL STACK DEVELOPER</text>

  <!-- Tech chips row (static — no conflicting animation) -->
  ${chip(344, 168, '#3178C6', I.ts)}
  ${chip(386, 168, '#20232A', I.react)}
  ${chip(428, 168, '#111111', I.next)}
  ${chip(470, 168, '#2D3748', I.prisma)}
  ${chip(512, 168, '#339933', I.node)}
  ${chip(554, 168, '#4169E1', I.pg)}

  <!-- Tagline -->
  <text x="440" y="210" text-anchor="middle"
        font-family="Segoe UI,Arial,sans-serif" font-size="13" fill="#3b0764" font-weight="500">
    Turning ideas into clean, scalable web apps
  </text>

  <!-- Email -->
  <g transform="translate(288,232)">
    <rect x="-7" y="-5" width="14" height="10" rx="1.5" fill="none" stroke="#7c3aed" stroke-width="1.5"/>
    <polyline points="-7,-5 0,1 7,-5" fill="none" stroke="#7c3aed" stroke-width="1.5" stroke-linejoin="round"/>
  </g>
  <text x="303" y="237" font-family="Segoe UI,Arial,sans-serif" font-size="11.5" fill="#4c1d95" font-weight="500">rafsundipto116@gmail.com</text>

  <!-- Portfolio -->
  <g transform="translate(490,232)">
    <circle r="7" fill="none" stroke="#7c3aed" stroke-width="1.4"/>
    <ellipse rx="3.5" ry="7" fill="none" stroke="#7c3aed" stroke-width="1.1"/>
    <line x1="-7" y1="0" x2="7" y2="0" stroke="#7c3aed" stroke-width="1.1"/>
  </g>
  <text x="505" y="237" font-family="Segoe UI,Arial,sans-serif" font-size="11.5" fill="#4c1d95" font-weight="500">rafsandev.vercel.app</text>

</g>

<!-- ── PHOTO ── -->
<image href="${photoSrc}"
       x="655" y="0" width="245" height="280"
       preserveAspectRatio="xMidYMax meet"
       clip-path="url(#photoClip)"
       filter="url(#photoShadow)"/>

</svg>`;

const outPath = path.join(__dirname, 'banner', 'banner.svg');
fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, svg);
console.log(`✅  banner.svg  —  ${(fs.statSync(outPath).size/1024).toFixed(1)} KB`);
