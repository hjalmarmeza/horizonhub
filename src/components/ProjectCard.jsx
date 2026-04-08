import React, { useEffect } from 'react';

const ProjectCard = ({ project }) => {
  const [imageError, setImageError] = React.useState(false);
  const [status, setStatus] = React.useState('checking');

  useEffect(() => {
    const checkStatus = async () => {
      // Delay to avoid network hit on mobile
      await new Promise(r => setTimeout(r, Math.random() * 2000));
      try {
        const controller = new AbortController();
        const id = setTimeout(() => controller.abort(), 8000);
        await fetch(project.url, { mode: 'no-cors', signal: controller.signal, cache: 'no-cache' });
        clearTimeout(id);
        setStatus('online');
      } catch {
        setStatus('offline');
      }
    };
    checkStatus();
  }, [project.url]);

  // Artistic placeholder generator
  const getArtisticPlaceholder = (name, tag) => {
    const gradients = {
      'Salud': 'linear-gradient(135deg, #FF5E7E, #FF99AC)',
      'Seguridad': 'linear-gradient(135deg, #FF9500, #FFCC00)',
      'Finanzas': 'linear-gradient(135deg, #34C759, #A7EBA9)',
      'Música': 'linear-gradient(135deg, #AF52DE, #D6A4EE)',
      'Productividad': 'linear-gradient(135deg, #5856D6, #7D7AFF)',
      'IA': 'linear-gradient(135deg, #007AFF, #5AC8FA)',
      'Default': 'linear-gradient(135deg, #1C1C1E, #3A3A3C)'
    };

    const emojis = {
      'Seguridad': '🛡️',
      'Asistente de Voz': '🎙️',
      'Gestión': '🍽️',
      'Ahorro Inteligente': '💰',
      'Finanzas': '💳',
      'Juego IA': '🕹️',
      'Clima & Emoción': '🌈',
      'Asistente de Código': '💻',
      'Juego WebCam': '🏎️',
      'Landing Page': '✨',
      'Networking': '📇',
      'Salud Ocular': '👁️'
    };

    const key = Object.keys(gradients).find(k => tag.includes(k)) || 'Default';
    const emoji = emojis[Object.keys(emojis).find(k => tag.includes(k) || name.includes(k))] || '🚀';

    return (
      <div className="artistic-placeholder" style={{ background: gradients[key] }}>
        <span className="placeholder-emoji">{emoji}</span>
        <span className="placeholder-text-inner">{name}</span>
      </div>
    );
  };

  return (
    <a 
      href={project.url} 
      className={`project-card ${project.featured ? 'featured' : ''}`}
      data-category={project.tag}
      target="_blank" 
      rel="noopener noreferrer"
    >
      {project.featured && <div className="featured-badge">Destacado</div>}
      <div className="image-container">
        {!imageError && project.image ? (
          <img 
            src={project.image} 
            alt={project.name} 
            loading="lazy"
            decoding="async"
            fetchpriority={project.featured ? "high" : "low"}
            onError={() => setImageError(true)}
          />
        ) : (
          getArtisticPlaceholder(project.name, project.tag)
        )}
      </div>
      <div className="project-info">
        <span className="tag">{project.tag}</span>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3>{project.name}</h3>
          <div className={`status-indicator ${status}`} title={`Status: ${status}`}></div>
        </div>
        {project.description && (
          <p className="project-description">{project.description}</p>
        )}
      </div>
    </a>
  );
};

export default ProjectCard;
