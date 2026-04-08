import React, { useState, useEffect } from 'react';
import { projects } from './data/projects';
import ProjectCard from './components/ProjectCard';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showNews, setShowNews] = useState(false);
  const [news, setNews] = useState([]);
  
  useEffect(() => {
    // Fetch News Feed with cache busting
    const fetchNews = async () => {
      try {
        const response = await fetch('./news.json?t=' + Date.now());
        const data = await response.json();
        setNews(data);
      } catch (err) {
        console.error('News fetch failed:', err);
      }
    };
    fetchNews();

    // iOS Background Heartbeat Activator
    function initAudioHack() {
      const silentAudio = document.getElementById('iosWakeAudio');
      if (silentAudio) {
        silentAudio.play().then(() => {
          console.log("🚀 iOS Background Heartbeat Activado");
          window.removeEventListener('touchstart', initAudioHack);
          window.removeEventListener('click', initAudioHack);
        }).catch(err => console.log("Audio Hack bloqueado:", err));
      }
    }
    window.addEventListener('touchstart', initAudioHack, { once: true });
    window.addEventListener('click', initAudioHack, { once: true });
  }, []);

  const filteredProjects = projects.filter(project => 
    project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.tag.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="hub-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">HORIZON HUB</h1>
          <p className="hero-subtitle">Tu ecosistema de aplicaciones, a un clic de distancia.</p>
          
          <div className="search-container">
            <input 
              type="text" 
              placeholder="Buscar en el ecosistema..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
        </div>
      </section>

      <div className="controls-bar" style={{justifyContent: 'flex-end'}}>
        <div className="news-bell" onClick={() => setShowNews(!showNews)}>
          <span>🔔</span>
          {news.length > 0 && <div className="news-badge"></div>}
        </div>
      </div>

      {showNews && (
        <div className="news-panel">
          <h3>Novedades</h3>
          {news.map(item => (
            <div key={item.id} className="news-item">
              <h4>{item.title}</h4>
              <p>{item.content}</p>
              <small style={{opacity: 0.5}}>{item.date}</small>
            </div>
          ))}
          <button 
            onClick={() => setShowNews(false)}
            style={{marginTop: '15px', background: 'none', border: '1px solid #444', color: 'white', borderRadius: '8px', padding: '5px 10px', width: '100%'}}
          >
            Cerrar
          </button>
        </div>
      )}

      <main>
        <section className="launchpad-grid">
          {filteredProjects.map(project => (
            <ProjectCard 
              key={project.id} 
              project={project} 
            />
          ))}
        </section>
      </main>

      <footer>
        &copy; {new Date().getFullYear()} Hjalmar Meza. Diseñado con estética de Apple.
      </footer>
    </div>
  );
}

export default App;
