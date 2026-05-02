import { useState, useEffect, useRef, useCallback } from "react";

const UI = {
  en: {
    siteTitle: "Design Challenge",
    tagline: "Train your UI skills",
    heroTitle1: "Generate your",
    heroTitle2: "next design",
    heroTitle3: "challenge",
    heroDesc: "Sharpen your design skills with randomized briefs. Hit generate, get constraints, and start designing.",
    generateBtn: "Generate new brief",
    generateFirstBtn: "Generate brief",
    briefLabel: "Brief",
    footer: "Design Challenge — Practice makes perfect",
    combinations: "possible combinations",
    lockLimit: "Max 2 locks",
    locked: "locked",
    wildcardBtn: "Add some chaos",
    chaosHeroTitle1: "Embrace",
    chaosHeroTitle2: "the",
    chaosHeroTitle3: "chaos",
    chaosDesc: "You asked for it. Now design your way out.",
    difficultyLabel: "Difficulty",
    difficulty: { easy: "Easy", medium: "Medium", hard: "Hard" },
  },
  fr: {
    siteTitle: "Design Challenge",
    tagline: "Entraîne tes skills UI",
    heroTitle1: "Génère ton",
    heroTitle2: "prochain défi",
    heroTitle3: "design",
    heroDesc: "Améliore tes compétences en design avec des briefs aléatoires. Génère, découvre tes contraintes, et commence à designer.",
    generateBtn: "Nouveau brief",
    generateFirstBtn: "Générer un brief",
    briefLabel: "Brief",
    footer: "Design Challenge — C'est en forgeant qu'on devient forgeron",
    combinations: "combinaisons possibles",
    lockLimit: "Max 2 verrous",
    locked: "verrouillés",
    wildcardBtn: "Ajouter du chaos",
    chaosHeroTitle1: "Embrasse",
    chaosHeroTitle2: "le",
    chaosHeroTitle3: "chaos",
    chaosDesc: "Tu l'as voulu. Maintenant, design ta sortie.",
    difficultyLabel: "Difficulté",
    difficulty: { easy: "Facile", medium: "Moyen", hard: "Difficile" },
  },
};

const DIFFICULTIES = ["easy", "medium", "hard"];

const CATEGORIES = {
  project: {
    label: { en: "Design a", fr: "Concevoir" },
    items: {
      en: {
        easy: ["Landing page","Portfolio site","Settings page","Weather app","Recipe app","Note-taking app","Task manager","Calendar app","News reader","Podcast player","Music player","Meditation app"],
        medium: ["Mobile app","Dashboard","E-commerce store","SaaS platform","Booking system","Chat interface","Onboarding flow","Checkout flow","Email client","Fitness tracker","Travel planner","Banking app","Video platform","Photo editor","Health tracker","Transport app","Design app"],
        hard: ["Social network","Analytics panel","File manager","Car interface","Flight tracker","Car rental app"],
      },
      fr: {
        easy: ["Page d'accueil","Site portfolio","Page de paramètres","App météo","App de recettes","App de notes","Gestionnaire de tâches","Agenda","Lecteur d'actualités","Lecteur de podcasts","Lecteur de musique","App de méditation"],
        medium: ["Application mobile","Tableau de bord","Boutique en ligne","Plateforme SaaS","Système de réservation","Interface de chat","Parcours d'onboarding","Tunnel de paiement","Client email","Tracker fitness","Planificateur de voyage","App bancaire","Plateforme vidéo","Éditeur photo","Tracker santé","App de transport","App de design"],
        hard: ["Réseau social","Panneau analytique","Gestionnaire de fichiers","Interface voiture","Suivi de vols","App de location de voiture"],
      },
    },
  },
  industry: {
    label: { en: "For the", fr: "Pour le secteur" },
    items: {
      en: {
        easy: ["Healthcare","Education","Food & drink","Music","Travel","Sports","Pet care","Wellness"],
        medium: ["Finance","Real estate","Fashion","Gaming","Automotive","Publishing","Childcare","Non-profit","Art & culture"],
        hard: ["Architecture","Agriculture","Space tech","Sustainability","Legal","Logistics","Luxury goods"],
      },
      fr: {
        easy: ["Santé","Éducation","Alimentation","Musique","Voyage","Sport","Animaux","Bien-être"],
        medium: ["Finance","Immobilier","Mode","Jeux vidéo","Automobile","Édition","Petite enfance","Associatif","Art & culture"],
        hard: ["Architecture","Agriculture","Spatial","Développement durable","Juridique","Logistique","Luxe"],
      },
    },
  },
  constraint: {
    label: { en: "Constraint", fr: "Contrainte" },
    items: {
      en: {
        easy: ["Mobile first","Dark mode only","Card-based layout","Grid-based only","Maximum 2 fonts","Under 3 screens","One page only"],
        medium: ["No images","One color only","Monochrome palette","No rounded corners","Horizontal scroll","Oversized typography","Asymmetric layout","Sustainable design","Accessible (AAA)"],
        hard: ["No text over 16px","Typography only","No icons","Watch first","TV app","Black & White UI","Only Comic Sans","No AI","Only Vibecoding"],
      },
      fr: {
        easy: ["Mobile first","Mode sombre uniquement","Layout en cartes","Grille uniquement","Maximum 2 polices","Moins de 3 écrans","Une seule page"],
        medium: ["Sans images","Une seule couleur","Palette monochrome","Pas de coins arrondis","Scroll horizontal","Typographie surdimensionnée","Mise en page asymétrique","Design durable","Accessible (AAA)"],
        hard: ["Pas de texte au-dessus de 16px","Typographie uniquement","Sans icônes","Montre d'abord","App TV","Interface noir & blanc","Uniquement Comic Sans","Sans IA","Uniquement Vibecoding"],
      },
    },
  },
  style: {
    label: { en: "Style", fr: "Style" },
    items: {
      en: {
        easy: ["Minimalist","Elegant","Playful","Scandinavian","Retro","Futuristic"],
        medium: ["Industrial","Swiss design","Japanese","Pop Art","Bauhaus","Glassmorphism","Cyberpunk"],
        hard: ["Organic","Brutalist","Art Deco","Memphis","Neo-brutalist","Vaporwave","Cottagecore","Y2K"],
      },
      fr: {
        easy: ["Minimaliste","Élégant","Ludique","Scandinave","Rétro","Futuriste"],
        medium: ["Industriel","Design suisse","Japonais","Pop Art","Bauhaus","Glassmorphisme","Cyberpunk"],
        hard: ["Organique","Brutaliste","Art Déco","Memphis","Néo-brutaliste","Vaporwave","Cottagecore","Y2K"],
      },
    },
  },
  accessibility: {
    label: { en: "Accessibility", fr: "Accessibilité" },
    items: {
      en: {
        easy: ["0% accessible","100% accessible"],
        medium: ["0% accessible","100% accessible"],
        hard: ["0% accessible","100% accessible"],
      },
      fr: {
        easy: ["0% accessible","100% accessible"],
        medium: ["0% accessible","100% accessible"],
        hard: ["0% accessible","100% accessible"],
      },
    },
  },
  ai: {
    label: { en: "Design with AI", fr: "Design avec IA" },
    isSlider: true,
    levels: {
      en: ["No AI", "Light AI assist", "Balanced human + AI", "AI-led design", "Full AI generation"],
      fr: ["Sans IA", "Assistance IA légère", "Équilibre humain + IA", "Design piloté par IA", "Génération 100% IA"],
    },
  },
};

function itemsFor(key, lang, difficulty) {
  const cat = CATEGORIES[key];
  if (cat.isSlider) return cat.levels[lang];
  return cat.items[lang][difficulty];
}

function allItemsFlat(key, lang) {
  const cat = CATEGORIES[key];
  if (cat.isSlider) return cat.levels[lang];
  const i = cat.items[lang];
  return [...i.easy, ...i.medium, ...i.hard];
}

const WILDCARD = {
  label: { en: "Plot twist", fr: "Grain de folie" },
  items: {
    en: ["The client changes the brief halfway through","Every button must have a sound effect","The UI must work upside down","All content is written by a pirate","The app has a secret dark mode easter egg","Users can only navigate by swiping","Every screen must include a cat somewhere","The color palette is chosen by a 5-year-old","No straight lines allowed","The whole UI must feel like a video game","Design it as if it's the year 2099","All micro-copy must rhyme","The loading screen is the main feature","Users interact only with their voice","Everything must animate continuously","The design must tell a story across screens","Use only emojis for icons","The app has a personality and talks back","Design it for a 2-meter wide screen","Every element must cast a dramatic shadow","The UI gradually changes as the user scrolls","Include a hidden mini-game","All text must be handwritten style","The design must work in black and white only"],
    fr: ["Le client change le brief à mi-parcours","Chaque bouton doit avoir un effet sonore","L'interface doit fonctionner à l'envers","Tout le contenu est écrit par un pirate","L'app a un easter egg en mode sombre secret","On ne peut naviguer qu'en swipant","Chaque écran doit inclure un chat quelque part","La palette est choisie par un enfant de 5 ans","Aucune ligne droite autorisée","Toute l'interface doit ressembler à un jeu vidéo","Designez comme si on était en 2099","Tous les micro-textes doivent rimer","L'écran de chargement est la feature principale","Les utilisateurs interagissent uniquement à la voix","Tout doit être animé en permanence","Le design doit raconter une histoire entre les écrans","Utiliser uniquement des emojis comme icônes","L'app a une personnalité et répond","Designez pour un écran de 2 mètres de large","Chaque élément projette une ombre dramatique","L'interface change progressivement au scroll","Inclure un mini-jeu caché","Tout le texte doit être en style manuscrit","Le design doit fonctionner en noir et blanc uniquement"],
  },
};

const CORE_KEYS = Object.keys(CATEGORIES);
const SLOT_KEYS = CORE_KEYS.filter((k) => !CATEGORIES[k].isSlider);
const ACCENT_COLORS = [
  { bg: "#FF4D00", text: "#fff" },{ bg: "#0047FF", text: "#fff" },
  { bg: "#00C853", text: "#000" },{ bg: "#FF006E", text: "#fff" },
  { bg: "#8B5CF6", text: "#fff" },{ bg: "#06B6D4", text: "#000" },
  { bg: "#F59E0B", text: "#000" },{ bg: "#E11D48", text: "#fff" },
];

const CHAOS_ROTATIONS = [-2.8, 1.5, -1.2, 2.4];

function pick(a) { return a[Math.floor(Math.random() * a.length)]; }
function pickNew(a, c) { if (a.length <= 1) return a[0]; let v; do { v = pick(a); } while (v === c); return v; }

function LockIcon({ locked, size = 14 }) {
  return locked ? (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" stroke="none">
      <rect x="3" y="11" width="18" height="11" rx="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  ) : (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 9.9-1" />
    </svg>
  );
}
function RefreshIcon({ size = 14 }) {
  return (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 2v6h-6" /><path d="M3 12a9 9 0 0 1 15-6.7L21 8" /></svg>);
}
function ShuffleIcon({ size = 20 }) {
  return (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 3 21 3 21 8" /><line x1="4" y1="20" x2="21" y2="3" /><polyline points="21 16 21 21 16 21" /><line x1="15" y1="15" x2="21" y2="21" /><line x1="4" y1="4" x2="9" y2="9" /></svg>);
}
function FlameIcon({ size = 18, animated = false }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      style={animated ? { animation: "flameWiggle 0.4s ease-in-out infinite alternate", transformOrigin: "center bottom" } : undefined}
    >
      <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
    </svg>
  );
}
function XIcon({ size = 12 }) {
  return (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>);
}

function CardBox({ text, accent, isAccent, locked, accentColor, chaos, rotation }) {
  return (
    <div style={{
      position: "relative",
      background: chaos && !isAccent ? "#111" : isAccent ? accent.bg : "transparent",
      border: isAccent ? "1.5px solid transparent" : locked ? "1.5px solid " + accentColor.bg : chaos ? "1.5px solid #333" : "1.5px solid #222",
      borderRadius: chaos ? "0px" : "2px",
      padding: "20px 24px", minHeight: "36px",
      display: "flex", alignItems: "center",
      transition: "all 0.5s cubic-bezier(0.23, 1, 0.32, 1)",
      transform: chaos && !isAccent ? `rotate(${rotation || 0}deg)` : "rotate(0deg)",
    }}>
      {locked && !isAccent && (
        <div style={{
          position: "absolute", top: "-1px", right: "-1px",
          background: accentColor.bg, color: accentColor.text,
          width: "26px", height: "26px",
          display: "flex", alignItems: "center", justifyContent: "center",
          borderRadius: "0 2px 0 4px",
        }}><LockIcon locked size={12} /></div>
      )}
      <span style={{
        fontFamily: chaos ? "'Space Mono', monospace" : "'Clash Display', 'Satoshi', sans-serif",
        fontSize: chaos ? "clamp(15px, 3vw, 22px)" : "clamp(18px, 3.5vw, 26px)",
        fontWeight: 600,
        color: chaos && !isAccent ? "#FF4D00" : isAccent ? accent.text : "#111",
        letterSpacing: chaos ? "0px" : "-0.5px",
        lineHeight: 1.2,
        transition: "all 0.5s cubic-bezier(0.23, 1, 0.32, 1)",
        textTransform: chaos ? "uppercase" : "none",
      }}>{text}</span>
    </div>
  );
}

function SlotCard({ items, value, spinTrigger, delay, accentColor, locked, chaos, rotation }) {
  const [rolling, setRolling] = useState(null);
  const refs = useRef({ t: null, i: null });
  const mounted = useRef(false);

  useEffect(() => {
    if (!mounted.current) { mounted.current = true; if (spinTrigger === 0) return; }
    if (locked) { setRolling(null); return; }
    let tick = 0;
    const total = 8 + Math.floor(Math.random() * 6);
    setRolling(pick(items));
    refs.current.t = setTimeout(() => {
      refs.current.i = setInterval(() => {
        tick++;
        if (tick >= total) { clearInterval(refs.current.i); refs.current.i = null; setRolling(null); }
        else setRolling(pick(items));
      }, 70 + tick * 8);
    }, delay);
    return () => { clearTimeout(refs.current.t); if (refs.current.i) clearInterval(refs.current.i); setRolling(null); };
  }, [spinTrigger]);

  const animating = rolling !== null;
  return <CardBox text={animating ? rolling : value} accent={accentColor} isAccent={animating && !locked} locked={locked} accentColor={accentColor} chaos={chaos} rotation={rotation} />;
}

function SliderCard({ levels, value, onChange, accentColor, chaos }) {
  const max = levels.length - 1;
  const accentBg = chaos ? "#FF4D00" : accentColor.bg;
  return (
    <div style={{
      position: "relative",
      background: "transparent",
      border: chaos ? "1.5px solid #333" : "1.5px solid #222",
      borderRadius: chaos ? "0px" : "2px",
      padding: "20px 24px", minHeight: "36px",
      display: "flex", flexDirection: "column", gap: "14px",
      transition: "all 0.5s cubic-bezier(0.23, 1, 0.32, 1)",
    }}>
      <span style={{
        fontFamily: chaos ? "'Space Mono', monospace" : "'Clash Display', 'Satoshi', sans-serif",
        fontSize: chaos ? "clamp(15px, 3vw, 22px)" : "clamp(18px, 3.5vw, 26px)",
        fontWeight: 600,
        color: chaos ? "#FF4D00" : "#111",
        letterSpacing: chaos ? "0px" : "-0.5px",
        lineHeight: 1.2,
        textTransform: chaos ? "uppercase" : "none",
        transition: "color 0.4s ease",
      }}>{levels[value]}</span>
      <input
        type="range"
        min={0}
        max={max}
        step={1}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-label="AI level"
        style={{
          width: "100%",
          accentColor: accentBg,
          cursor: "pointer",
          margin: 0,
        }}
      />
      <div style={{
        display: "flex", justifyContent: "space-between",
        fontFamily: "'Space Mono', monospace",
        fontSize: "9px", letterSpacing: "1.5px",
        textTransform: "uppercase",
        color: chaos ? "#444" : "#aaa",
      }}>
        <span>{levels[0]}</span>
        <span>{levels[max]}</span>
      </div>
    </div>
  );
}

const CHAOS_CSS = `
@keyframes flameWiggle {
  0% { transform: rotate(-6deg) scaleY(1); }
  50% { transform: rotate(4deg) scaleY(1.12); }
  100% { transform: rotate(-3deg) scaleY(0.95); }
}
@keyframes chaosGrid {
  0% { transform: rotate(0deg) scale(1); opacity: 0.06; }
  33% { transform: rotate(1.5deg) scale(1.02); opacity: 0.1; }
  66% { transform: rotate(-1deg) scale(0.99); opacity: 0.04; }
  100% { transform: rotate(0deg) scale(1); opacity: 0.06; }
}
@keyframes chaosGlitch {
  0%, 90%, 100% { clip-path: inset(0 0 0 0); transform: translate(0); }
  92% { clip-path: inset(20% 0 40% 0); transform: translate(-4px, 2px); }
  94% { clip-path: inset(60% 0 10% 0); transform: translate(3px, -1px); }
  96% { clip-path: inset(10% 0 70% 0); transform: translate(-2px, 3px); }
  98% { clip-path: inset(50% 0 20% 0); transform: translate(4px, -2px); }
}
@keyframes chaosPulse {
  0%, 100% { opacity: 0; }
  50% { opacity: 0.03; }
}
@keyframes chaosFloat {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-8px) rotate(2deg); }
}
`;

export default function DesignChallenge() {
  const [lang, setLang] = useState("fr");
  const [difficulty, setDifficulty] = useState("medium");
  const [aiLevel, setAiLevel] = useState(2);
  const [selections, setSelections] = useState(() => {
    const o = {}; SLOT_KEYS.forEach((k) => { o[k] = pick(itemsFor(k, "fr", "medium")); }); return o;
  });
  const [spinTrigger, setSpinTrigger] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [accent, setAccent] = useState(ACCENT_COLORS[0]);
  const [count, setCount] = useState(0);
  const [locks, setLocks] = useState(new Set());
  const [wildcard, setWildcard] = useState(null);
  const [wildcardAnim, setWildcardAnim] = useState(null);
  const [chaosMode, setChaosMode] = useState(false);
  const [flameHover, setFlameHover] = useState(false);
  const didMount = useRef(false);

  const t = UI[lang];

  const generateAll = useCallback(() => {
    if (spinning) return;
    const next = {};
    SLOT_KEYS.forEach((k) => {
      next[k] = locks.has(k) && selections[k] ? selections[k] : pick(itemsFor(k, lang, difficulty));
    });
    setAccent(ACCENT_COLORS[count % ACCENT_COLORS.length]);
    setSelections(next);
    setSpinTrigger((n) => n + 1);
    setSpinning(true); setGenerated(true); setCount((n) => n + 1);
    setTimeout(() => setSpinning(false), 1500);
  }, [spinning, count, selections, locks, lang, difficulty]);

  const shuffleSingle = useCallback((key) => {
    if (spinning || locks.has(key) || CATEGORIES[key].isSlider) return;
    setSelections((prev) => ({ ...prev, [key]: pickNew(itemsFor(key, lang, difficulty), prev[key]) }));
  }, [spinning, locks, lang, difficulty]);

  const toggleLock = useCallback((key) => {
    if (spinning) return;
    setLocks((prev) => { const n = new Set(prev); if (n.has(key)) n.delete(key); else if (n.size < 2) n.add(key); return n; });
  }, [spinning]);

  const generateWildcard = useCallback(() => {
    if (spinning) return;
    const items = WILDCARD.items[lang];
    let tick = 0; const total = 10;
    setWildcardAnim(pick(items));
    setChaosMode(true);
    const iv = setInterval(() => {
      tick++;
      if (tick >= total) { clearInterval(iv); setWildcard(pick(items)); setWildcardAnim(null); }
      else setWildcardAnim(pick(items));
    }, 80 + tick * 10);
  }, [spinning, lang]);

  const removeWildcard = useCallback(() => {
    setWildcard(null); setWildcardAnim(null); setChaosMode(false);
  }, []);

  const reshuffleWildcard = useCallback(() => {
    if (spinning) return;
    setWildcard((prev) => pickNew(WILDCARD.items[lang], prev));
  }, [spinning, lang]);

  useEffect(() => { generateAll(); }, []);

  useEffect(() => {
    setSelections((prev) => {
      const next = {};
      SLOT_KEYS.forEach((k) => {
        const oldFlat = allItemsFlat(k, lang === "en" ? "fr" : "en");
        const newFlat = allItemsFlat(k, lang);
        const idx = oldFlat.indexOf(prev[k]);
        next[k] = idx >= 0 ? newFlat[idx] : pick(itemsFor(k, lang, difficulty));
      });
      return next;
    });
    if (wildcard) {
      const oldI = WILDCARD.items[lang === "en" ? "fr" : "en"];
      const newI = WILDCARD.items[lang];
      const idx = oldI.indexOf(wildcard);
      setWildcard(idx >= 0 ? newI[idx] : pick(newI));
    }
  }, [lang]);

  useEffect(() => {
    if (!didMount.current) { didMount.current = true; return; }
    setSelections((prev) => {
      const next = { ...prev };
      SLOT_KEYS.forEach((k) => {
        if (locks.has(k)) return;
        const pool = itemsFor(k, lang, difficulty);
        if (!pool.includes(prev[k])) next[k] = pick(pool);
      });
      return next;
    });
  }, [difficulty]);

  const totalCombos = SLOT_KEYS.reduce((acc, k) => acc * itemsFor(k, "en", difficulty).length, 1) * CATEGORIES.ai.levels.en.length;
  const cm = chaosMode;

  return (
    <div style={{
      minHeight: "100vh",
      background: cm ? "#0A0A0A" : "#FAFAF8",
      fontFamily: "'Satoshi', 'DM Sans', system-ui, sans-serif",
      position: "relative", overflow: "hidden",
      transition: "background 0.6s cubic-bezier(0.23, 1, 0.32, 1)",
    }}>
      <style>{CHAOS_CSS}</style>
  

      <div style={{
        position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0,
        backgroundImage: cm
          ? "linear-gradient(rgba(255,77,0,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(255,0,110,0.07) 1px, transparent 1px)"
          : "linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)",
        backgroundSize: cm ? "60px 60px" : "80px 80px",
        animation: cm ? "chaosGrid 4s ease-in-out infinite" : "none",
        transition: "background-size 0.6s ease",
      }} />

      {cm && <div style={{
        position: "fixed", inset: 0, pointerEvents: "none", zIndex: 1,
        background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,77,0,0.02) 2px, rgba(255,77,0,0.02) 4px)",
        animation: "chaosPulse 3s ease-in-out infinite",
      }} />}

      {/* Header */}
      <header style={{
        position: "relative", zIndex: 10,
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "24px clamp(20px, 5vw, 48px)",
        borderBottom: cm ? "1.5px solid #222" : "1.5px solid #111",
        flexWrap: "wrap", gap: "12px",
        transition: "border-color 0.5s ease",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{
            width: "32px", height: "32px",
            background: cm ? "#FF4D00" : "#111",
            borderRadius: cm ? "0px" : "2px",
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: "all 0.5s ease",
            transform: cm ? "rotate(-4deg)" : "rotate(0deg)",
          }}>
            <span style={{ color: "#fff", fontSize: "16px", fontWeight: 700, fontFamily: "'Clash Display', sans-serif" }}>D</span>
          </div>
          <span style={{
            fontFamily: cm ? "'Space Mono', monospace" : "'Clash Display', 'Satoshi', sans-serif",
            fontWeight: 700, fontSize: "16px",
            letterSpacing: cm ? "1px" : "-0.5px",
            color: cm ? "#FF4D00" : "#111",
            textTransform: cm ? "uppercase" : "none",
            transition: "all 0.5s ease",
          }}>{t.siteTitle}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <button onClick={() => setLang((l) => l === "en" ? "fr" : "en")} style={{
            fontFamily: "'Space Mono', monospace", fontSize: "11px", letterSpacing: "1.5px",
            textTransform: "uppercase", background: "none",
            border: cm ? "1.5px solid #333" : "1.5px solid #ddd",
            borderRadius: cm ? "0px" : "2px", padding: "6px 14px", cursor: "pointer",
            color: cm ? "#666" : "#555",
            display: "flex", alignItems: "center", gap: "6px",
            transition: "all 0.4s ease",
          }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = cm ? "#FF4D00" : "#111"; e.currentTarget.style.color = cm ? "#FF4D00" : "#111"; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = cm ? "#333" : "#ddd"; e.currentTarget.style.color = cm ? "#666" : "#555"; }}
          >
            <span style={{ opacity: lang === "en" ? 1 : 0.4, fontWeight: lang === "en" ? 700 : 400 }}>EN</span>
            <span style={{ color: cm ? "#333" : "#ccc" }}>/</span>
            <span style={{ opacity: lang === "fr" ? 1 : 0.4, fontWeight: lang === "fr" ? 700 : 400 }}>FR</span>
          </button>
          <div style={{
            fontFamily: "'Space Mono', monospace", fontSize: "11px",
            letterSpacing: "1.5px", textTransform: "uppercase",
            color: cm ? "#333" : "#999", transition: "color 0.5s ease",
          }}>{t.tagline}</div>
        </div>
      </header>

      {/* Hero */}
      <section style={{
        position: "relative", zIndex: 10,
        padding: "clamp(40px, 8vw, 80px) clamp(20px, 5vw, 48px) clamp(24px, 4vw, 40px)",
        borderBottom: cm ? "1.5px solid #222" : "1.5px solid #111",
        transition: "border-color 0.5s ease",
      }}>
        <h1 style={{
          fontFamily: cm ? "'Space Mono', monospace" : "'Clash Display', 'Satoshi', sans-serif",
          fontSize: "clamp(36px, 8vw, 72px)", fontWeight: 700,
          lineHeight: 1.0,
          letterSpacing: cm ? "2px" : "-2px",
          color: cm ? "#fff" : "#111",
          margin: 0, maxWidth: "800px",
          textTransform: cm ? "uppercase" : "none",
          transition: "all 0.5s cubic-bezier(0.23, 1, 0.32, 1)",
          animation: cm ? "chaosGlitch 6s step-end infinite" : "none",
        }}>
          {cm ? t.chaosHeroTitle1 : t.heroTitle1}<br />
          {cm ? t.chaosHeroTitle2 : t.heroTitle2}<br />
          <span style={{
            color: cm ? "#FF4D00" : accent.bg,
            transition: "color 0.4s ease",
            ...(cm ? { textDecoration: "line-through", textDecorationColor: "#FF006E" } : {}),
          }}>{cm ? t.chaosHeroTitle3 : t.heroTitle3}</span>
          <span style={{ color: cm ? "#333" : "#ccc" }}>.</span>
        </h1>
        <p style={{
          fontFamily: cm ? "'Space Mono', monospace" : "'Satoshi', sans-serif",
          fontSize: cm ? "clamp(12px, 1.5vw, 14px)" : "clamp(14px, 2vw, 17px)",
          color: cm ? "#555" : "#777",
          marginTop: "20px", maxWidth: "480px", lineHeight: 1.6,
          letterSpacing: cm ? "0.5px" : "0px",
          transition: "all 0.5s ease",
        }}>{cm ? t.chaosDesc : t.heroDesc}</p>
      </section>

      {/* Cards */}
      <section style={{
        position: "relative", zIndex: 10,
        padding: "clamp(32px, 5vw, 56px) clamp(20px, 5vw, 48px)",
      }}>
        {/* Difficulty slider */}
        <div style={{
          maxWidth: "1100px", marginBottom: "clamp(24px, 4vw, 40px)",
          display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap",
        }}>
          <div style={{
            fontSize: "11px", fontFamily: "'Space Mono', monospace",
            textTransform: "uppercase", letterSpacing: "2.5px",
            color: cm ? "#FF4D00" : accent.bg,
          }}>{t.difficultyLabel}</div>
          <div style={{
            display: "flex", alignItems: "center", gap: "8px",
            flex: 1, minWidth: "220px", maxWidth: "360px",
          }}>
            <input
              type="range"
              min={0}
              max={DIFFICULTIES.length - 1}
              step={1}
              value={DIFFICULTIES.indexOf(difficulty)}
              onChange={(e) => setDifficulty(DIFFICULTIES[Number(e.target.value)])}
              aria-label={t.difficultyLabel}
              style={{ flex: 1, accentColor: cm ? "#FF4D00" : accent.bg, cursor: "pointer" }}
            />
          </div>
          <div style={{
            display: "flex", gap: "12px",
            fontFamily: "'Space Mono', monospace", fontSize: "10px",
            letterSpacing: "1.5px", textTransform: "uppercase",
          }}>
            {DIFFICULTIES.map((d) => (
              <button key={d} onClick={() => setDifficulty(d)} style={{
                background: "none", border: "none", padding: "2px 4px", cursor: "pointer",
                fontFamily: "inherit", fontSize: "inherit", letterSpacing: "inherit",
                textTransform: "inherit",
                color: difficulty === d ? (cm ? "#FF4D00" : accent.bg) : cm ? "#444" : "#bbb",
                fontWeight: difficulty === d ? 700 : 400,
                transition: "color 0.2s ease",
              }}>{t.difficulty[d]}</button>
            ))}
          </div>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
          gap: cm ? "40px 48px" : "32px 40px",
          maxWidth: "1100px",
          transition: "gap 0.5s ease",
        }}>
          {CORE_KEYS.map((key, i) => {
            const cat = CATEGORIES[key];
            const isLocked = locks.has(key);
            const canLock = locks.size < 2 || isLocked;
            return (
              <div key={key} style={{
                animation: cm ? `chaosFloat ${3 + i * 0.5}s ease-in-out infinite` : "none",
              }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px" }}>
                  <div style={{
                    fontSize: "11px", fontFamily: "'Space Mono', monospace",
                    textTransform: "uppercase", letterSpacing: "2.5px",
                    color: isLocked ? (cm ? "#FF4D00" : accent.bg) : cm ? "#444" : "#999",
                    transition: "color 0.3s",
                  }}>{cat.label[lang]}</div>
                  {!cat.isSlider && generated && !spinning && (
                    <div style={{ display: "flex", alignItems: "center", gap: "2px" }}>
                      {!isLocked && (
                        <button onClick={() => shuffleSingle(key)} aria-label="Shuffle" style={{
                          background: "none", border: "none", cursor: "pointer",
                          color: cm ? "#444" : "#bbb", padding: "4px",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          transition: "color 0.15s, transform 0.15s", borderRadius: "2px",
                        }}
                          onMouseEnter={(e) => { e.currentTarget.style.color = cm ? "#FF4D00" : "#111"; e.currentTarget.style.transform = "rotate(-30deg)"; }}
                          onMouseLeave={(e) => { e.currentTarget.style.color = cm ? "#444" : "#bbb"; e.currentTarget.style.transform = "rotate(0deg)"; }}
                        ><RefreshIcon /></button>
                      )}
                      <button onClick={() => toggleLock(key)} aria-label={isLocked ? "Unlock" : "Lock"}
                        title={!canLock ? t.lockLimit : ""}
                        style={{
                          background: "none", border: "none",
                          cursor: canLock ? "pointer" : "not-allowed",
                          color: isLocked ? (cm ? "#FF4D00" : accent.bg) : cm ? "#333" : "#ccc",
                          padding: "4px",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          transition: "color 0.15s", opacity: canLock ? 1 : 0.35, borderRadius: "2px",
                        }}
                        onMouseEnter={(e) => { if (canLock) e.currentTarget.style.color = isLocked ? "#E11D48" : cm ? "#FF4D00" : "#111"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.color = isLocked ? (cm ? "#FF4D00" : accent.bg) : cm ? "#333" : "#ccc"; }}
                      ><LockIcon locked={isLocked} /></button>
                    </div>
                  )}
                </div>
                {cat.isSlider ? (
                  <SliderCard
                    levels={cat.levels[lang]}
                    value={aiLevel}
                    onChange={setAiLevel}
                    accentColor={accent}
                    chaos={cm}
                  />
                ) : (
                  <SlotCard
                    items={itemsFor(key, lang, difficulty)}
                    value={selections[key]}
                    spinTrigger={spinTrigger}
                    delay={i * 120}
                    accentColor={accent}
                    locked={isLocked}
                    chaos={cm}
                    rotation={CHAOS_ROTATIONS[i % CHAOS_ROTATIONS.length]}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Wildcard */}
        {generated && !spinning && (wildcard || wildcardAnim) && (
          <div style={{ maxWidth: "1100px", marginTop: "36px", animation: cm ? "chaosFloat 2.5s ease-in-out infinite" : "none" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px" }}>
              <div style={{
                fontSize: "11px", fontFamily: "'Space Mono', monospace",
                textTransform: "uppercase", letterSpacing: "2.5px",
                color: cm ? "#FF4D00" : accent.bg,
                display: "flex", alignItems: "center", gap: "6px",
              }}>
                <FlameIcon size={13} animated={cm} />
                {WILDCARD.label[lang]}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "2px" }}>
                {wildcard && !wildcardAnim && (
                  <button onClick={reshuffleWildcard} aria-label="Shuffle wildcard" style={{
                    background: "none", border: "none", cursor: "pointer",
                    color: cm ? "#444" : "#bbb", padding: "4px",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    transition: "color 0.15s, transform 0.15s", borderRadius: "2px",
                  }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = cm ? "#FF4D00" : "#111"; e.currentTarget.style.transform = "rotate(-30deg)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = cm ? "#444" : "#bbb"; e.currentTarget.style.transform = "rotate(0deg)"; }}
                  ><RefreshIcon /></button>
                )}
                <button onClick={removeWildcard} aria-label="Remove wildcard" style={{
                  background: "none", border: "none", cursor: "pointer",
                  color: cm ? "#444" : "#bbb", padding: "4px",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  transition: "color 0.15s", borderRadius: "2px",
                }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = "#E11D48"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = cm ? "#444" : "#bbb"; }}
                ><XIcon /></button>
              </div>
            </div>
            <CardBox text={wildcardAnim || wildcard} accent={accent} isAccent={!!wildcardAnim} locked={false} accentColor={accent} chaos={cm} rotation={-1.8} />
          </div>
        )}

        {locks.size > 0 && !spinning && (
          <div style={{
            marginTop: "16px", fontFamily: "'Space Mono', monospace",
            fontSize: "10px", letterSpacing: "2px", textTransform: "uppercase",
            color: cm ? "#FF4D00" : accent.bg, opacity: 0.7,
          }}>{locks.size}/2 {t.locked}</div>
        )}

        {/* Buttons */}
        <div style={{ marginTop: "clamp(40px, 6vw, 64px)", display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>
          <button onClick={generateAll} disabled={spinning} style={{
            display: "inline-flex", alignItems: "center", gap: "12px",
            fontFamily: cm ? "'Space Mono', monospace" : "'Clash Display', 'Satoshi', sans-serif",
            fontSize: "clamp(15px, 2.5vw, 18px)", fontWeight: 600,
            letterSpacing: cm ? "1px" : "-0.3px",
            color: cm ? "#000" : accent.text,
            background: cm ? "#FF4D00" : accent.bg,
            border: "none", borderRadius: cm ? "0px" : "2px",
            padding: "18px 40px",
            cursor: spinning ? "wait" : "pointer",
            textTransform: cm ? "uppercase" : "none",
            transition: "all 0.4s cubic-bezier(0.23, 1, 0.32, 1)",
            opacity: spinning ? 0.7 : 1,
            transform: spinning ? "scale(0.97)" : "scale(1)",
          }}
            onMouseEnter={(e) => { if (!spinning) { e.currentTarget.style.transform = cm ? "scale(1.02) rotate(-1deg)" : "scale(1.02)"; }}}
            onMouseLeave={(e) => { e.currentTarget.style.transform = spinning ? "scale(0.97)" : "scale(1)"; }}
          >
            <ShuffleIcon size={20} />
            {generated ? t.generateBtn : t.generateFirstBtn}
          </button>

          {generated && !spinning && !wildcard && !wildcardAnim && (
            <button
              onClick={generateWildcard}
              onMouseEnter={() => setFlameHover(true)}
              onMouseLeave={() => setFlameHover(false)}
              style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                fontFamily: cm ? "'Space Mono', monospace" : "'Clash Display', 'Satoshi', sans-serif",
                fontSize: "clamp(13px, 2vw, 15px)", fontWeight: 600,
                letterSpacing: "-0.2px",
                color: flameHover ? "#FF4D00" : "#555",
                background: "transparent",
                border: flameHover ? "1.5px dashed #FF4D00" : "1.5px dashed #ccc",
                borderRadius: "2px", padding: "17px 28px", cursor: "pointer",
                transition: "all 0.2s ease",
                transform: flameHover ? "scale(1.02)" : "scale(1)",
              }}
            >
              <FlameIcon size={18} animated={flameHover} />
              {t.wildcardBtn}
            </button>
          )}
        </div>

        {count > 0 && (
          <div style={{
            marginTop: "24px", fontFamily: "'Space Mono', monospace",
            fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase",
            color: cm ? "#222" : "#ccc", transition: "color 0.5s ease",
          }}>{t.briefLabel} #{String(count).padStart(3, "0")}</div>
        )}
      </section>

      <footer style={{
        position: "relative", zIndex: 10,
        borderTop: cm ? "1.5px solid #1a1a1a" : "1.5px solid #eee",
        padding: "24px clamp(20px, 5vw, 48px)",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        flexWrap: "wrap", gap: "12px",
        transition: "border-color 0.5s ease",
      }}>
        <div style={{
          fontFamily: "'Space Mono', monospace", fontSize: "10px",
          letterSpacing: "2px", textTransform: "uppercase",
          color: cm ? "#222" : "#bbb", transition: "color 0.5s ease",
        }}>{t.footer}</div>
        <div style={{
          fontFamily: "'Space Mono', monospace", fontSize: "10px",
          letterSpacing: "1.5px",
          color: cm ? "#222" : "#ccc", transition: "color 0.5s ease",
        }}>{totalCombos.toLocaleString()}+ {t.combinations}</div>
      </footer>
    </div>
  );
}