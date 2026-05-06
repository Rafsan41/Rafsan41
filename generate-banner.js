const fs    = require('fs');
const path  = require('path');
const https = require('https');

// ── Fetch SVG path data from Simple Icons CDN ─────────────────────────────
function fetchPaths(slug, color = 'ffffff') {
  return new Promise((resolve) => {
    function get(url) {
      https.get(url, { headers: { 'Accept': 'image/svg+xml', 'User-Agent': 'Mozilla/5.0' } }, res => {
        if ([301,302,307,308].includes(res.statusCode) && res.headers.location) {
          return get(res.headers.location);
        }
        let raw = '';
        res.on('data', c => raw += c);
        res.on('end', () => {
          const ds = [...raw.matchAll(/\bd="([^"]+)"/g)].map(m => m[1]);
          resolve(ds.length ? ds : null);
        });
      }).on('error', () => resolve(null));
    }
    get(`https://cdn.simpleicons.org/${slug}/${color}`);
  });
}

// Scale icon paths (24x24 viewBox) to fit inside a circle of given radius
function iconSvg(paths, radius, color = 'white') {
  if (!paths) return `<text y="4" text-anchor="middle" font-family="Arial" font-size="9" fill="${color}">?</text>`;
  const s = (radius / 12) * 0.55;  // ~55% of circle diameter
  return `<g transform="scale(${s.toFixed(4)}) translate(-12,-12)">${
    paths.map(d => `<path d="${d}" fill="${color}"/>`).join('')
  }</g>`;
}

// Floating bubble — uses animateTransform additive="sum" (GitHub-safe)
function bubble(x, y, r, fill, paths, iconColor, dur, delay) {
  return `
<g transform="translate(${x},${y})">
  <circle r="${r}" fill="${fill}" stroke="rgba(255,255,255,0.35)" stroke-width="2.5"/>
  ${iconSvg(paths, r, iconColor)}
  <animateTransform attributeName="transform" type="translate" additive="sum"
    values="0,0;0,-10;0,0" dur="${dur}s" begin="${delay}s"
    repeatCount="indefinite" calcMode="spline"
    keyTimes="0;0.5;1" keySplines=".45,0,.55,1;.45,0,.55,1"/>
</g>`;
}

// Center chip — static, no conflicting transform animation
function chip(x, y, fill, paths, iconColor = 'white') {
  return `
<g transform="translate(${x},${y})">
  <circle r="17" fill="${fill}" stroke="rgba(255,255,255,0.28)" stroke-width="2"/>
  ${iconSvg(paths, 17, iconColor)}
</g>`;
}

// ── MAIN ──────────────────────────────────────────────────────────────────
async function main() {
  // 1. Photo
  const photoBase64 = fs.readFileSync(
    path.join(__dirname, 'Public', '20180526_043831-removebg-preview.png')
  ).toString('base64');
  const photoSrc = `data:image/png;base64,${photoBase64}`;

  // 2. Fetch all icons in parallel
  console.log('Fetching icons from Simple Icons CDN...');
  const [tsP, reactP, nextP, prismaP, nodeP, mongoP, pgP] = await Promise.all([
    fetchPaths('typescript'),
    fetchPaths('react',      '61DAFB'),   // cyan brand color on dark bg
    fetchPaths('nextdotjs'),
    fetchPaths('prisma'),
    fetchPaths('nodedotjs'),
    fetchPaths('mongodb'),
    fetchPaths('postgresql'),
  ]);

  const icons = { ts:tsP, react:reactP, next:nextP, prisma:prismaP, node:nodeP, mongo:mongoP, pg:pgP };
  Object.entries(icons).forEach(([k,v]) => console.log(`  ${k}: ${v ? v.length+' path(s)' : 'FAILED — using fallback'}`));

  // 3. Build SVG
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
  width="900" height="280" viewBox="0 0 900 280">
<defs>
  <style>
    @keyframes shimmer { 0%,100%{fill:#1e0a3c} 50%{fill:#7c3aed} }
    @keyframes fadeUp  { from{opacity:0}       to{opacity:1} }
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

<!-- ── LEFT FLOATING BUBBLES ── -->
${bubble(36,  90,  22, '#3178C6', icons.ts,     'white',   3.5, 0.0)}
${bubble(77,  155, 22, '#20232A', icons.react,  '#61DAFB', 4.0, 0.5)}
${bubble(36,  215, 18, '#111111', icons.next,   'white',   4.5, 1.0)}
${bubble(108, 222, 14, '#2D3748', icons.prisma, 'white',   3.8, 0.3)}
${bubble(148, 118, 19, '#539E43', icons.node,   'white',   3.2, 0.7)}
${bubble(165, 65,  15, '#47A248', icons.mongo,  'white',   4.2, 1.2)}

<!-- Pulsing connector dots -->
<circle cx="58"  cy="112" r="3"   fill="rgba(90,50,190,0.45)">
  <animate attributeName="r"       values="3;5;3"           dur="2.0s" repeatCount="indefinite"/>
  <animate attributeName="opacity" values="0.45;0.8;0.45"   dur="2.0s" repeatCount="indefinite"/>
</circle>
<circle cx="100" cy="170" r="2.5" fill="rgba(90,50,190,0.45)">
  <animate attributeName="r"       values="2.5;4.5;2.5"     dur="2.5s" repeatCount="indefinite"/>
  <animate attributeName="opacity" values="0.45;0.8;0.45"   dur="2.5s" repeatCount="indefinite"/>
</circle>
<circle cx="165" cy="90"  r="2"   fill="rgba(90,50,190,0.40)">
  <animate attributeName="r"       values="2;4;2"           dur="1.8s" repeatCount="indefinite"/>
  <animate attributeName="opacity" values="0.35;0.75;0.35"  dur="1.8s" repeatCount="indefinite"/>
</circle>
<circle cx="38"  cy="152" r="2"   fill="rgba(90,50,190,0.35)">
  <animate attributeName="r"       values="2;3.5;2"         dur="2.2s" repeatCount="indefinite"/>
  <animate attributeName="opacity" values="0.3;0.7;0.3"     dur="2.2s" repeatCount="indefinite"/>
</circle>

<!-- Collaborate button -->
<g>
  <rect x="18" y="18" width="150" height="32" rx="16" fill="#7c3aed">
    <animate attributeName="opacity" values="1;0.82;1" dur="2.4s" repeatCount="indefinite"/>
  </rect>
  <text x="93" y="39" text-anchor="middle"
        font-family="Segoe UI,Arial,sans-serif" font-weight="700" font-size="12.5" fill="white">
    Let's Collaborate!
  </text>
</g>

<!-- ── CENTER CONTENT ── -->
<g class="center-g">

  <!-- Name -->
  <text x="415" y="108" text-anchor="middle"
        font-family="Segoe UI,Arial,sans-serif" font-weight="900" font-size="32" letter-spacing="-0.5"
        class="name-txt">Rafsan Jani Dipta</text>

  <!-- Decorative curl arrow -->
  <path d="M590,85 Q606,78 608,92 L596,90"
        fill="none" stroke="#7c3aed" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>

  <!-- Title -->
  <text x="440" y="134" text-anchor="middle"
        font-family="Segoe UI,Arial,sans-serif" font-weight="600" font-size="13.5"
        fill="#4c1d95" letter-spacing="1.2">FULL STACK DEVELOPER</text>

  <!-- Center tech chips (proper icons) -->
  ${chip(344, 168, '#3178C6', icons.ts)}
  ${chip(386, 168, '#20232A', icons.react,  '#61DAFB')}
  ${chip(428, 168, '#111111', icons.next)}
  ${chip(470, 168, '#2D3748', icons.prisma)}
  ${chip(512, 168, '#539E43', icons.node)}
  ${chip(554, 168, '#336791', icons.pg)}

  <!-- Tagline -->
  <text x="440" y="210" text-anchor="middle"
        font-family="Segoe UI,Arial,sans-serif" font-size="13" fill="#3b0764" font-weight="500">
    Turning ideas into clean, scalable web apps
  </text>

  <!-- Email icon + text -->
  <g transform="translate(288,232)">
    <rect x="-7" y="-5" width="14" height="10" rx="1.5" fill="none" stroke="#7c3aed" stroke-width="1.5"/>
    <polyline points="-7,-5 0,1 7,-5" fill="none" stroke="#7c3aed" stroke-width="1.5" stroke-linejoin="round"/>
  </g>
  <text x="303" y="237" font-family="Segoe UI,Arial,sans-serif" font-size="11.5" fill="#4c1d95" font-weight="500">rafsundipto116@gmail.com</text>

  <!-- Globe icon + text -->
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

  // 4. Write file
  const outPath = path.join(__dirname, 'banner', 'banner.svg');
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, svg);
  console.log(`\n✅  banner.svg  —  ${(fs.statSync(outPath).size/1024).toFixed(1)} KB`);
}

main().catch(console.error);
