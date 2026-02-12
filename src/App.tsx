import { useEffect, useState } from "react";
import "./App.css";

const mensajes = [
  { txt: "Magnetismo puro", min: 88, max: 97 },
  { txt: "Muy atractivo", min: 80, max: 89 },
  { txt: "Encantas sin saberlo", min: 72, max: 81 },
  { txt: "Presencia poderosa", min: 85, max: 94 },
  { txt: "Impacto inmediato", min: 90, max: 99 }
];

function App() {
  const [misteryCount, setMisteryCount] = useState(0);
  const [showPromo, setShowPromo] = useState(true);
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<{ txt: string; score: number } | null>(null);
  const [isMobile, setIsMobile] = useState(false); // Detectar móvil
  const [showMobilePercent, setShowMobilePercent] = useState(false); // Para mostrar % final en móviles

  // Detectar si es móvil
  useEffect(() => {
    const ua = navigator.userAgent;
    setIsMobile(/Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(ua));
  }, []);

  useEffect(() => {
    const n = Math.floor(Math.random() * 5) + 2; // 2 a 6
    setMisteryCount(n);
  }, []);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://pl28698465.effectivegatecpm.com/e3cd318543c99f5655fb82c6325acab5/invoke.js";
    script.async = true;
    script.dataset.cfasync = "false";
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handlePhoto = (file: File) => {
    setLoading(true);
    setProgress(0);
    setResult(null);
    setShowPromo(true);
    setShowMobilePercent(false); // reset para móviles

    const reader = new FileReader();
    reader.onload = () => {
      // Elegir mensaje y puntaje final
      const r = mensajes[Math.floor(Math.random() * mensajes.length)];
      const targetScore = Math.floor(Math.random() * (r.max - r.min + 1)) + r.min;

      // Función para animar fases de progreso
      const animatePhase = (from: number, to: number, duration: number, callback?: () => void) => {
        const stepTime = 50;
        const steps = Math.ceil(duration / stepTime);
        const increment = (to - from) / steps;
        let current = from;
        const interval = setInterval(() => {
          current += increment;
          if (current >= to) {
            current = to;
            clearInterval(interval);
            if (callback) callback();
          }
          setProgress(current);
        }, stepTime);
      };

      // Animación escalonada: 0→30 → 60 → 99 → 100
      animatePhase(0, 30, 600, () => {
        animatePhase(30, 60, 1000, () => {
          animatePhase(60, 99, 1200, () => {
            animatePhase(99, 100, 300, () => {
              setShowPromo(false);
              setImage(reader.result as string); // mostrar imagen solo al final
              setResult({ txt: r.txt, score: targetScore });
              setLoading(false);
              if (isMobile) setShowMobilePercent(true); // mostrar % final flotante en móviles
            });
          });
        });
      });
    };

    reader.readAsDataURL(file);
  };

  const abrirPublicidad = () => {
    const script = document.createElement("script");
    script.src = "https://pl28698498.effectivegatecpm.com/af/47/e5/af47e5f5902cc0de8bbfb7592188853b.js";
    script.async = true;
    document.body.appendChild(script);

    setTimeout(() => {
      document.body.removeChild(script);
    }, 3000);
  };

  return (
    <div className="app">
      <h1>¿Qué tan atractivo eres?</h1>
      <p className="sub">Descúbrelo en segundos. Privacidad Garantizada.</p>

      {!image && !loading && !result && (
        <label className="btn">
          🔮 ANALIZAR MI ROSTRO
          <input
            type="file"
            hidden
            accept="image/*"
            onChange={(e) => e.target.files && handlePhoto(e.target.files[0])}
          />
        </label>
      )}

      {showPromo && (
        <div className="promo-box">
          <div
            id="container-e3cd318543c99f5655fb82c6325acab5"
            style={{ fontSize: 12, opacity: 0.8 }}
          ></div>
        </div>
      )}

      {loading && (
        <div className="loading">
          <p>🧠 Escaneando rasgos...</p>
          <div className="bar" style={{ position: "relative" }}>
            <div className="fill" style={{ width: `${progress}%` }} />
            {/* Número final flotante solo en móviles */}
            {isMobile && showMobilePercent && result && (
              <span
                style={{
                  position: "absolute",
                  right: 5,
                  top: -20,
                  fontSize: 12,
                  fontWeight: "bold",
                  color: "#000"
                }}
              >
                {result.score}%
              </span>
            )}
          </div>
          {/* Porcentaje visible en PC */}
          {!isMobile && (
            <p>{result ? Math.floor((progress / 100) * result.score) : Math.floor(progress)}%</p>
          )}
        </div>
      )}

      {result && (
        <div className="result fit-screen">
          {image && (
            <div className="img-wrap">
              <img src={image} alt="preview" />
            </div>
          )}
          <h2>{result.score}%</h2>
          <p>{result.txt}</p>

          <button className="retry-btn" onClick={() => location.reload()}>
            🔄 Probar otra foto
          </button>

          <div className="cta">
            <p>
              👀 {misteryCount} personas de tu entorno sienten algo por ti
              <br />
              <small>Trabajo, estudios o redes</small>
            </p>

            <button className="btn small" onClick={abrirPublicidad}>
              VER QUIÉNES
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
