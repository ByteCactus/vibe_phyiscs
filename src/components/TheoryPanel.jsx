import React from 'react';
import { X, BookOpen, ExternalLink } from 'lucide-react';
import useStore from '../store/useStore';
import translations, { theoryContent } from '../locales/translations';

export default function TheoryPanel() {
  const { theoryOpen, toggleTheory, activeGrade, activeExperiment, language } = useStore();
  const t = translations[language];

  if (!theoryOpen) {
    return (
      <button 
        onClick={toggleTheory}
        className="glass-panel"
        style={{
          position: 'absolute',
          bottom: '100px',
          right: '20px',
          width: '60px',
          height: '60px',
          borderRadius: '30px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          border: '1px solid #10b981',
          color: '#10b981',
          zIndex: 100,
          boxShadow: '0 0 15px rgba(0,0,0,0.5), inset 0 0 10px #10b981'
        }}
        title={t.ui.theoryTitle}
      >
        <BookOpen size={28} />
      </button>
    );
  }

  const current = theoryContent[language][activeGrade]?.[activeExperiment];

  return (
    <div className="glass-panel" style={{
      position: 'absolute',
      bottom: '100px',
      right: '20px',
      width: '370px',
      maxHeight: '450px',
      display: 'flex',
      flexDirection: 'column',
      zIndex: 100,
      overflow: 'hidden',
      border: '1px solid #10b981',
      boxShadow: '0 0 20px rgba(16, 185, 129, 0.2)'
    }}>
      <div style={{
        padding: '12px 15px',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: `rgba(0,0,0,0.3)`
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <BookOpen size={18} color={'#10b981'} />
          <h3 style={{ fontSize: '15px', margin: 0, color: '#fff' }}>{t.ui.theoryTitle}</h3>
        </div>
        <button onClick={toggleTheory} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}>
          <X size={18} />
        </button>
      </div>

      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '15px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px'
      }}>
        {current ? (
          <>
            <h4 style={{ color: '#10b981', margin: 0, fontSize: '17px' }}>{current.title}</h4>
            
            {current.formulas.map((f, i) => (
              <div key={i} style={{
                background: 'rgba(16, 185, 129, 0.08)',
                padding: '8px 12px',
                borderRadius: '8px',
                borderLeft: '3px solid #10b981'
              }}>
                <div style={{ fontSize: '11px', color: '#94a3b8', marginBottom: '3px' }}>{f.name}</div>
                <div style={{ fontFamily: 'monospace', fontSize: '15px', letterSpacing: '1px', color: '#fff' }}>
                  {f.expr}
                </div>
              </div>
            ))}

            <p style={{ color: 'var(--text-primary)', lineHeight: '1.5', fontSize: '13px', margin: 0 }}>
              {current.description}
            </p>

            <a 
              href={current.wiki} 
              target="_blank" 
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                color: '#38bdf8',
                fontSize: '13px',
                textDecoration: 'none',
                marginTop: '5px'
              }}
            >
              <ExternalLink size={14} />
              {t.ui.wikiLink}
            </a>
          </>
        ) : (
          <p style={{ color: '#94a3b8' }}>{t.ui.chooseExp}</p>
        )}
      </div>
    </div>
  );
}
