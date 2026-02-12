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
  const [percent, setPercent] = useState(0);
  const [result, setResult] = useState<{ txt: string; score: number } | null>(null);

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
      document.body.removeChild(script); // opcional, limpia al desmontar
    };
  }, []);

  
  const handlePhoto = (file: File) => {
    setLoading(true);
    setProgress(0);
    setPercent(0);
    setResult(null);
    setShowPromo(true); // vuelve a mostrarse al empezar

    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result as string);
      fakeLoading();
    };
    reader.readAsDataURL(file);
  };

  const fakeLoading = () => {
    let p = 0;
    const interval = setInterval(() => {
      p += Math.random() * 6;

      if (p >= 100) {
        clearInterval(interval);
        setProgress(100);

        setShowPromo(false); // 👈 SE OCULTA AQUÍ

        setTimeout(showResult, 800);
      } else {
        setProgress(Math.min(p, 100));
      }
    }, 300);
  };

  const showResult = () => {
    const r = mensajes[Math.floor(Math.random() * mensajes.length)];
    const score = Math.floor(Math.random() * (r.max - r.min + 1)) + r.min;
    setLoading(false);
    setResult({ txt: r.txt, score });
    animatePercent(score);
  };

  const animatePercent = (target: number) => {
    let val = 0;
    const int = setInterval(() => {
      val += 1;
      setPercent(val);
      if (val >= target) clearInterval(int);
    }, 20);
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
         
        
          <div id="container-e3cd318543c99f5655fb82c6325acab5" style={{ fontSize: 12, opacity: 0.8 }}></div>
        </div>
      )}

      {loading && (
        <div className="loading">
          <p>🧠 Escaneando rasgos...</p>
          <div className="bar">
            <div className="fill" style={{ width: `${progress}%` }} />
          </div>
          <p>{Math.floor(progress)}%</p>
        </div>
      )}

     {result && (
  <div className="result fit-screen">
          {image && (
            <div className="img-wrap">
              <img src={image} alt="preview" />
            </div>
          )}
          <h2>{percent}%</h2>
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
              
            <button className="btn small">VER QUIÉNES</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
