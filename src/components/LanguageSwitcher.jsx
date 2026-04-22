import React from 'react';
import useStore from '../store/useStore';

export default function LanguageSwitcher() {
  const { language, setLanguage } = useStore();

  return (
    <div style={{
      position: 'absolute',
      top: '15px',
      right: '20px',
      zIndex: 100,
      display: 'flex',
      gap: '8px'
    }}>
      <button
        onClick={() => setLanguage('uk')}
        className="glass-panel"
        style={{
          padding: '6px 10px',
          cursor: 'pointer',
          background: language === 'uk' ? 'rgba(59, 130, 246, 0.4)' : 'var(--panel-bg)',
          color: '#fff',
          border: `1px solid ${language === 'uk' ? '#3b82f6' : 'var(--panel-border)'}`,
          fontSize: '12px',
          display: 'flex',
          alignItems: 'center',
          gap: '5px'
        }}
      >
        <span style={{ fontSize: '16px' }}>🇺🇦</span> UA
      </button>
      <button
        onClick={() => setLanguage('cs')}
        className="glass-panel"
        style={{
          padding: '6px 10px',
          cursor: 'pointer',
          background: language === 'cs' ? 'rgba(59, 130, 246, 0.4)' : 'var(--panel-bg)',
          color: '#fff',
          border: `1px solid ${language === 'cs' ? '#3b82f6' : 'var(--panel-border)'}`,
          fontSize: '12px',
          display: 'flex',
          alignItems: 'center',
          gap: '5px'
        }}
      >
        <span style={{ fontSize: '16px' }}>🇨🇿</span> CZ
      </button>
    </div>
  );
}
