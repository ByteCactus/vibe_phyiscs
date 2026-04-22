import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Volume2, VolumeX } from 'lucide-react';
import useStore from '../store/useStore';
import translations from '../locales/translations';

export default function AITutor() {
  const { aiTutorOpen, toggleAITutor, aiMessages, addAiMessage, activeGrade, activeExperiment, language } = useStore();
  const [input, setInput] = useState('');
  const [isMuted, setIsMuted] = useState(false);
  const messagesEndRef = useRef(null);
  const t = translations[language];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (aiTutorOpen) {
      scrollToBottom();
    }
  }, [aiMessages, aiTutorOpen]);

  const speak = (text) => {
    if (isMuted || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language === 'uk' ? 'uk-UA' : 'cs-CZ';
    utterance.rate = 1.0;
    utterance.pitch = 1.1;
    window.speechSynthesis.speak(utterance);
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    addAiMessage({ role: 'user', content: input });
    const userMessage = input;
    setInput('');

    setTimeout(() => {
      let response = '';
      if (language === 'uk') {
        response = `Я бачу, ви зараз у розділі ${activeGrade}-го класу, Дослід ${activeExperiment}! Це чудове запитання про "${userMessage}". `;
        
        if (activeGrade === 7) {
          if (activeExperiment === 1) response += "Тут ми вивчаємо закон Архімеда. Спробуйте змінити густину рідини, щоб побачити, як зміниться виштовхувальна сила!";
          else response += "У механіці ми вивчаємо рух. Змініть швидкість, щоб побачити, як швидко тіло долає шлях.";
        } else if (activeGrade === 8) {
          if (activeExperiment === 1) response += "Закон Ома показує зв'язок між напругою та струмом. Спробуйте збільшити опір!";
          else response += "Під час нагрівання лід спочатку плавиться, а потім вода нагрівається. Температура не росте під час зміни агрегатного стану.";
        } else if (activeGrade === 9) {
           if (activeExperiment === 1) response += "Оптика вивчає заломлення світла. Змініть показник заломлення, щоб змінити кут!";
           else response += "Хвилі переносять енергію, а не речовину. Спробуйте змінити частоту хвиль.";
        } else if (activeGrade === 10) {
          if (activeExperiment === 1) response += "Класична механіка Ньютона: гравітація та пружність впливають на поведінку об'єктів. Потягніть їх мишкою!";
          else response += "Молекулярно-кінетична теорія пояснює, що тиск газу залежить від температури та об'єму.";
        } else if (activeGrade === 11) {
          if (activeExperiment === 1) response += "Сила Лоренца діє на заряджені частинки у магнітному полі. Змініть магнітне поле (B).";
          else response += "Радіоактивний розпад є ймовірнісним процесом для одного атома, але передбачуваним для багатьох.";
        }
      } else {
        response = `Vidím, že jste právě v sekci pro ${activeGrade}. třídu, pokus ${activeExperiment}! To je skvělá otázka ohledně "${userMessage}". `;
        
        if (activeGrade === 7) {
          if (activeExperiment === 1) response += "Zde studujeme Archimedův zákon. Zkuste změnit hustotu kapaliny, abyste viděli, jak se změní vztlaková síla!";
          else response += "V mechanice studujeme pohyb. Změňte rychlost, abyste viděli, jak rychle těleso urazí dráhu.";
        } else if (activeGrade === 8) {
          if (activeExperiment === 1) response += "Ohmův zákon ukazuje vztah mezi napětím a proudem. Zkuste zvýšit odpor!";
          else response += "Během zahřívání led nejprve taje a poté se voda ohřívá. Teplota neroste během změny skupenství.";
        } else if (activeGrade === 9) {
           if (activeExperiment === 1) response += "Optika studuje lom světla. Změňte index lomu, abyste změnili úhel!";
           else response += "Vlnění přenáší energii, nikoliv látku. Zkuste změnit frekvenci vlnění.";
        } else if (activeGrade === 10) {
          if (activeExperiment === 1) response += "Klasická Newtonova mechanika: gravitace a pružnost ovlivňují chování objektů. Přetáhněte je myší!";
          else response += "Kinetická teorie látek vysvětluje, že tlak plynu závisí na teplotě a objemu.";
        } else if (activeGrade === 11) {
          if (activeExperiment === 1) response += "Lorentzova síla působí na nabité částice v magnetickém poli. Změňte magnetické pole (B).";
          else response += "Radioaktivní rozpad je pravděpodobnostní proces pro jeden atom, ale předvídatelný pro mnoho atomů.";
        }
      }

      addAiMessage({ role: 'ai', content: response });
      speak(response);
    }, 1000);
  };

  if (!aiTutorOpen) {
    return (
      <button 
        onClick={toggleAITutor}
        className="glass-panel"
        style={{
          position: 'absolute',
          bottom: '20px',
          right: '20px',
          width: '60px',
          height: '60px',
          borderRadius: '30px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          border: '1px solid #3b82f6',
          color: '#3b82f6',
          zIndex: 100,
          boxShadow: '0 0 15px rgba(0,0,0,0.5), inset 0 0 10px #3b82f6'
        }}
      >
        <MessageCircle size={28} />
      </button>
    );
  }

  return (
    <div className="glass-panel" style={{
      position: 'absolute',
      bottom: '20px',
      right: '20px',
      width: '350px',
      height: '500px',
      display: 'flex',
      flexDirection: 'column',
      zIndex: 100,
      overflow: 'hidden'
    }}>
      <div style={{
        padding: '15px',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: `rgba(0,0,0,0.2)`
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <MessageCircle size={20} color={'#3b82f6'} />
          <h3 style={{ fontSize: '16px', margin: 0 }}>{language === 'uk' ? 'AI Вчитель' : 'AI Učitel'}</h3>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={() => setIsMuted(!isMuted)} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}>
            {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </button>
          <button onClick={toggleAITutor} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}>
            <X size={18} />
          </button>
        </div>
      </div>

      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '15px',
        display: 'flex',
        flexDirection: 'column',
        gap: '15px'
      }}>
        {aiMessages.map((msg, idx) => (
          <div key={idx} style={{
            alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
            maxWidth: '85%',
            padding: '10px 14px',
            borderRadius: '12px',
            background: msg.role === 'user' ? '#3b82f6' : 'rgba(255,255,255,0.1)',
            color: '#fff',
            fontSize: '14px',
            lineHeight: '1.4',
            borderBottomRightRadius: msg.role === 'user' ? '2px' : '12px',
            borderBottomLeftRadius: msg.role === 'ai' ? '2px' : '12px'
          }}>
            {msg.content}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSend} style={{
        padding: '15px',
        borderTop: '1px solid rgba(255,255,255,0.1)',
        display: 'flex',
        gap: '10px'
      }}>
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={t.ui.aiPlaceholder}
          style={{
            flex: 1,
            background: 'rgba(0,0,0,0.2)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '8px',
            padding: '10px 12px',
            color: '#fff',
            outline: 'none',
            fontFamily: 'inherit'
          }}
        />
        <button type="submit" style={{
          background: '#3b82f6',
          border: 'none',
          borderRadius: '8px',
          width: '40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          cursor: 'pointer'
        }}>
          <Send size={18} />
        </button>
      </form>
    </div>
  );
}
