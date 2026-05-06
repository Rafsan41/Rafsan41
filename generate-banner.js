const fs = require('fs');
const path = require('path');

const photoPath = path.join(__dirname, 'Public', '20180526_043831-removebg-preview.png');
const photoBase64 = fs.readFileSync(photoPath).toString('base64');
const photoSrc = `data:image/png;base64,${photoBase64}`;

// ── ICON HELPERS ──────────────────────────────────────────────────────────
// Each returns SVG markup centered at (0,0), fits inside r=13

const iconTS = `
  <text y="5" text-anchor="middle"
        font-family="'Arial Black',Arial,sans-serif"
        font-weight="900" font-size="13" fill="white">TS</text>`;

// React: three overlapping ellipses + center dot
const iconReact = `
  <ellipse rx="9.5" ry="3.6" fill="none" stroke="#61DAFB" stroke-width="1.4"/>
  <ellipse rx="9.5" ry="3.6" fill="none" stroke="#61DAFB" stroke-width="1.4" transform="rotate(60)"/>
  <ellipse rx="9.5" ry="3.6" fill="none" stroke="#61DAFB" stroke-width="1.4" transform="rotate(120)"/>
  <circle r="2.2" fill="#61DAFB"/>`;

const iconNext = `
  <text y="5" text-anchor="middle"
        font-family="'Arial Black',Arial,sans-serif"
        font-weight="900" font-size="15" fill="white">N</text>`;

// Prisma: upward triangle outline with inner line
const iconPrisma = `
  <polygon points="0,-8 7,4 -7,4"
           fill="none" stroke="white" stroke-width="1.6" stroke-linejoin="round"/>
  <line x1="0" y1="-8" x2="0" y2="4" stroke="white" stroke-width="1.2" opacity="0.7"/>`;

const iconNode = `
  <text y="3" text-anchor="middle"
        font-family="'Arial Black',Arial,sans-serif"
        font-weight="900" font-size="9" fill="white">NODE</text>
  <text y="12" text-anchor="middle"
        font-family="'Arial Black',Arial,sans-serif"
        font-weight="900" font-size="8" fill="white">.JS</text>`;

const iconMongo = `
  <text y="5" text-anchor="middle"
        font-family="'Arial Black',Arial,sans-serif"
        font-weight="900" font-size="10" fill="white">MDB</text>`;

const iconPG = `
  <text y="4" text-anchor="middle"
        font-family="'Arial Black',Arial,sans-serif"
        font-weight="900" font-size="11" fill="white">PG</text>`;

// Email icon (envelope shape)
const emailIcon = `<g transform="translate(0,-1)">
  <rect x="-7" y="-5" width="14" height="10" rx="1.5"
        fill="none" stroke="#7c3aed" stroke-width="1.5"/>
  <polyline points="-7,-5 0,1 7,-5"
            fill="none" stroke="#7c3aed" stroke-width="1.5" stroke-linejoin="round"/>
</g>`;

// Globe icon
const globeIcon = `
  <circle cx="0" cy="0" r="7" fill="none" stroke="#7c3aed" stroke-width="1.4"/>
  <ellipse cx="0" cy="0" rx="3.5" ry="7" fill="none" stroke="#7c3aed" stroke-width="1.1"/>
  <line x1="-7" y1="0" x2="7" y2="0" stroke="#7c3aed" stroke-width="1.1"/>`;

// ── SVG ───────────────────────────────────────────────────────────────────
const svg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
     width="900" height="280" viewBox="0 0 900 280">
<defs>
  <style>
    @keyframes floatY  { 0%,100%{transform:translateY(0)}  50%{transform:translateY(-10px)} }
    @keyframes shimmer { 0%,100%{fill:#1e0a3c}             50%{fill:#7c3aed} }
    @keyframes pulse   { 0%,100%{opacity:1}                50%{opacity:0.82} }
    @keyframes dotBeat { 0%,100%{opacity:.35} 50%{opacity:.8} }
    @keyframes slideIn { from{opacity:0;transform:translateX(32px)} to{opacity:1;transform:translateX(0)} }
    @keyframes fadeUp  { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
    @keyframes chipPop { 0%{opacity:0;transform:scale(.4)} 70%{transform:scale(1.1)} 100%{opacity:1;transform:scale(1)} }
    .b1{animation:floatY 3.5s ease-in-out 0.0s infinite}
    .b2{animation:floatY 4.0s ease-in-out 0.5s infinite}
    .b3{animation:floatY 4.5s ease-in-out 1.0s infinite}
    .b4{animation:floatY 3.8s ease-in-out 0.3s infinite}
    .b5{animation:floatY 3.2s ease-in-out 0.7s infinite}
    .b6{animation:floatY 4.2s ease-in-out 1.2s infinite}
    .name-txt{animation:shimmer 4s linear 1.5s infinite}
    .collab  {animation:pulse  2.4s ease-in-out 1s infinite}
    .photo-el{animation:slideIn 0.8s ease 0.3s both}
    .center-g{animation:fadeUp  0.7s ease 0.2s both}
    .c1{animation:chipPop .4s ease 0.7s  both}
    .c2{animation:chipPop .4s ease 0.85s both}
    .c3{animation:chipPop .4s ease 1.0s  both}
    .c4{animation:chipPop .4s ease 1.15s both}
    .c5{animation:chipPop .4s ease 1.3s  both}
    .c6{animation:chipPop .4s ease 1.45s both}
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

<!-- ── LEFT FLOATING BUBBLES ── -->

<!-- TypeScript -->
<g transform="translate(36,90)" class="b1">
  <circle r="22" fill="#3178C6" stroke="rgba(255,255,255,0.35)" stroke-width="2.5"/>
  ${iconTS}
</g>

<!-- React -->
<g transform="translate(77,155)" class="b2">
  <circle r="22" fill="#20232A" stroke="rgba(255,255,255,0.35)" stroke-width="2.5"/>
  ${iconReact}
</g>

<!-- Next.js -->
<g transform="translate(36,215)" class="b3">
  <circle r="18" fill="#111111" stroke="rgba(255,255,255,0.35)" stroke-width="2.5"/>
  ${iconNext}
</g>

<!-- Prisma -->
<g transform="translate(108,222)" class="b4">
  <circle r="14" fill="#2D3748" stroke="rgba(255,255,255,0.35)" stroke-width="2.5"/>
  ${iconPrisma}
</g>

<!-- Node.js -->
<g transform="translate(148,118)" class="b5">
  <circle r="19" fill="#339933" stroke="rgba(255,255,255,0.35)" stroke-width="2.5"/>
  ${iconNode}
</g>

<!-- MongoDB -->
<g transform="translate(165,65)" class="b6">
  <circle r="15" fill="#47A248" stroke="rgba(255,255,255,0.35)" stroke-width="2.5"/>
  ${iconMongo}
</g>

<!-- Connecting dots -->
<circle cx="58"  cy="112" r="3">
  <animate attributeName="r"       values="3;5;3"       dur="2.0s" repeatCount="indefinite"/>
  <animate attributeName="opacity" values="0.4;0.8;0.4" dur="2.0s" repeatCount="indefinite"/>
  <animate attributeName="fill"    values="rgba(90,50,190,0.45);rgba(124,58,237,0.7);rgba(90,50,190,0.45)" dur="2.0s" repeatCount="indefinite"/>
</circle>
<circle cx="100" cy="170" r="2.5">
  <animate attributeName="r"       values="2.5;4.5;2.5" dur="2.5s" repeatCount="indefinite"/>
  <animate attributeName="opacity" values="0.4;0.8;0.4" dur="2.5s" repeatCount="indefinite"/>
  <animate attributeName="fill"    values="rgba(90,50,190,0.45);rgba(124,58,237,0.7);rgba(90,50,190,0.45)" dur="2.5s" repeatCount="indefinite"/>
</circle>
<circle cx="165" cy="90" r="2">
  <animate attributeName="r"       values="2;4;2"       dur="1.8s" repeatCount="indefinite"/>
  <animate attributeName="opacity" values="0.35;0.75;0.35" dur="1.8s" repeatCount="indefinite"/>
  <animate attributeName="fill"    values="rgba(90,50,190,0.35);rgba(124,58,237,0.65);rgba(90,50,190,0.35)" dur="1.8s" repeatCount="indefinite"/>
</circle>
<circle cx="38" cy="152" r="2">
  <animate attributeName="r"       values="2;3.5;2"     dur="2.2s" repeatCount="indefinite"/>
  <animate attributeName="opacity" values="0.3;0.7;0.3" dur="2.2s" repeatCount="indefinite"/>
  <animate attributeName="fill"    values="rgba(90,50,190,0.3);rgba(124,58,237,0.6);rgba(90,50,190,0.3)" dur="2.2s" repeatCount="indefinite"/>
</circle>

<!-- Collaborate button -->
<g class="collab">
  <rect x="18" y="18" width="150" height="32" rx="16" fill="#7c3aed"/>
  <text x="93" y="39" text-anchor="middle"
        font-family="'Segoe UI',Arial,sans-serif"
        font-weight="700" font-size="12.5" fill="white">Let's Collaborate!</text>
</g>

<!-- ── CENTER CONTENT ── -->
<g class="center-g">

  <!-- Name + decorative arrow -->
  <text x="415" y="108" text-anchor="middle"
        font-family="'Segoe UI',Arial,sans-serif"
        font-weight="900" font-size="38" letter-spacing="-0.5"
        class="name-txt">Rafsan Dipto</text>
  <!-- arrow drawn as SVG path -->
  <path d="M590,85 Q606,78 608,92 L596,90" fill="none" stroke="#7c3aed" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>

  <!-- Title -->
  <text x="440" y="134" text-anchor="middle"
        font-family="'Segoe UI',Arial,sans-serif"
        font-weight="600" font-size="13.5" fill="#4c1d95" letter-spacing="1.2">FULL STACK DEVELOPER</text>

  <!-- ── CENTER TECH CHIPS ── -->
  <g class="c1" transform="translate(344,168)">
    <circle r="17" fill="#3178C6" stroke="rgba(255,255,255,0.3)" stroke-width="2"/>
    ${iconTS}
  </g>
  <g class="c2" transform="translate(386,168)">
    <circle r="17" fill="#20232A" stroke="rgba(255,255,255,0.3)" stroke-width="2"/>
    ${iconReact}
  </g>
  <g class="c3" transform="translate(428,168)">
    <circle r="17" fill="#111111" stroke="rgba(255,255,255,0.3)" stroke-width="2"/>
    ${iconNext}
  </g>
  <g class="c4" transform="translate(470,168)">
    <circle r="17" fill="#2D3748" stroke="rgba(255,255,255,0.3)" stroke-width="2"/>
    ${iconPrisma}
  </g>
  <g class="c5" transform="translate(512,168)">
    <circle r="17" fill="#339933" stroke="rgba(255,255,255,0.3)" stroke-width="2"/>
    ${iconNode}
  </g>
  <g class="c6" transform="translate(554,168)">
    <circle r="17" fill="#4169E1" stroke="rgba(255,255,255,0.3)" stroke-width="2"/>
    ${iconPG}
  </g>

  <!-- Tagline -->
  <text x="440" y="210" text-anchor="middle"
        font-family="'Segoe UI',Arial,sans-serif"
        font-size="13" fill="#3b0764" font-weight="500">Turning ideas into clean, scalable web apps</text>

  <!-- Contact row -->
  <g transform="translate(290,232)">${emailIcon}</g>
  <text x="305" y="237" font-family="'Segoe UI',Arial,sans-serif" font-size="11.5" fill="#4c1d95" font-weight="500">rafsundipto116@gmail.com</text>

  <g transform="translate(492,232)">${globeIcon}</g>
  <text x="507" y="237" font-family="'Segoe UI',Arial,sans-serif" font-size="11.5" fill="#4c1d95" font-weight="500">rafsandev.vercel.app</text>

</g>

<!-- ── PHOTO ── -->
<image href="${photoSrc}"
       x="655" y="0" width="245" height="280"
       preserveAspectRatio="xMidYMax meet"
       clip-path="url(#photoClip)"
       class="photo-el"
       filter="url(#photoShadow)"/>

</svg>`;

// Write output
const outPath = path.join(__dirname, 'banner', 'banner.svg');
fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, svg);
const sizeKB = (fs.statSync(outPath).size / 1024).toFixed(1);
console.log(`✅  banner.svg  —  ${sizeKB} KB`);
