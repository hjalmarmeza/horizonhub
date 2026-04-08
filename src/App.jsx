import React, { useState, useEffect } from 'react';
import { projects } from './data/projects';
import ProjectCard from './components/ProjectCard';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  
  useEffect(() => {
    // iOS Background Heartbeat Activator (from AI Studio)
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
      {/* Hero Section with Warp Speed Background */}
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

      <main>
        <section className="launchpad-grid">
          {filteredProjects.map(project => (
            <ProjectCard key={project.id} project={project} />
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
