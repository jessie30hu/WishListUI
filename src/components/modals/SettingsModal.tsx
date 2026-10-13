import React from 'react';
import { X, Settings, Sun, Moon, Globe, Trash2, LogOut, ShieldCheck, FileText, User } from 'lucide-react';
import { User as UserType } from '../../types';

interface SettingsModalProps {
  user: UserType;
  isOpen: boolean;
  onClose: () => void;
  theme: 'dark' | 'light';
  language: 'zh' | 'en';
  onToggleTheme: () => void;
  onToggleLanguage: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  user,
  isOpen,
  onClose,
  theme,
  language,
  onToggleTheme,
  onToggleLanguage
}) => {
  const [cacheCleared, setCacheCleared] = React.useState(false);

  if (!isOpen) return null;

  const handleClearCache = () => {
    setCacheCleared(true);
    setTimeout(() => setCacheCleared(false), 2000);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()} style={{ padding: '1.75rem' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Settings size={20} color="#a855f7" />
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>
              {language === 'zh' ? '系统设置 (Settings)' : 'Settings & Account'}
            </h3>
          </div>
          <button className="btn-secondary" style={{ padding: '0.4rem', borderRadius: '50%' }} onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {/* User Account Info snippet */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', padding: '1rem', backgroundColor: 'rgba(255,255,255,0.04)', borderRadius: 'var(--radius-md)', marginBottom: '1.25rem' }}>
          <img src={user.avatar} alt={user.name} style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover' }} />
          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              {user.name} {user.verifiedBadge && <ShieldCheck size={14} color="#6366f1" />}
            </h4>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Connected via Google Account</p>
          </div>
        </div>

        {/* Settings List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
          
          {/* Theme */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem 0.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.9rem' }}>
              {theme === 'dark' ? <Moon size={16} color="#6366f1" /> : <Sun size={16} color="#fbbf24" />}
              <span>Theme Mode</span>
            </div>
            <button className="btn-secondary" style={{ padding: '0.35rem 0.8rem', fontSize: '0.78rem' }} onClick={onToggleTheme}>
              {theme === 'dark' ? 'Dark Aurora' : 'Warm Light'}
            </button>
          </div>

          {/* Language */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem 0.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.9rem' }}>
              <Globe size={16} color="#818cf8" />
              <span>Language</span>
            </div>
            <button className="btn-secondary" style={{ padding: '0.35rem 0.8rem', fontSize: '0.78rem' }} onClick={onToggleLanguage}>
              {language === 'zh' ? '简体中文' : 'English'}
            </button>
          </div>

          {/* Clear Cache */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem 0.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.9rem' }}>
              <Trash2 size={16} color="#f87171" />
              <span>Clear Local Cache</span>
            </div>
            <button className="btn-secondary" style={{ padding: '0.35rem 0.8rem', fontSize: '0.78rem' }} onClick={handleClearCache}>
              {cacheCleared ? 'Cleared ✓' : 'Clear (12.4 MB)'}
            </button>
          </div>

        </div>

        {/* Footer Privacy & Terms links */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', fontSize: '0.78rem', color: 'var(--text-muted)', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
          <span style={{ cursor: 'pointer' }}>Privacy Policy</span>
          <span>•</span>
          <span style={{ cursor: 'pointer' }}>Terms of Service</span>
          <span>•</span>
          <span style={{ cursor: 'pointer' }}>PRD V3.0 Docs</span>
        </div>

      </div>
    </div>
  );
};
