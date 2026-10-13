import React from 'react';
import { Sparkles, Sun, Moon, Globe, Crown, Bell, Plus, ShieldCheck } from 'lucide-react';
import { User } from '../../types';

interface HeaderProps {
  user: User;
  activeTab: string;
  theme: 'dark' | 'light';
  language: 'zh' | 'en';
  onToggleTheme: () => void;
  onToggleLanguage: () => void;
  onOpenCreateModal: () => void;
  onOpenPremiumModal: () => void;
  onOpenSettingsModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  user,
  theme,
  language,
  onToggleTheme,
  onToggleLanguage,
  onOpenCreateModal,
  onOpenPremiumModal,
  onOpenSettingsModal
}) => {
  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        backgroundColor: 'var(--bg-card)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid var(--border-color)',
        padding: '0.85rem 1.5rem',
        display: 'flex',
        align-items: 'center',
        justifyContent: 'space-between'
      }}
    >
      {/* Brand Logo & Slogan */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
        <div
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '12px',
            background: 'var(--gradient-aurora)',
            display: 'flex',
            align-items: 'center',
            justifyContent: 'center',
            boxShadow: 'var(--shadow-glow)'
          }}
        >
          <Sparkles size={22} color="#ffffff" />
        </div>
        <div>
          <h1 style={{ fontSize: '1.25rem', fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1.1 }} className="text-gradient">
            WishSync
          </h1>
          <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 500 }}>
            {language === 'zh' ? '找到和你拥有相似人生愿望的人' : 'Find someone to dream with'}
          </p>
        </div>
      </div>

      {/* Action Controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        {/* Quick Create Wish Button */}
        <button className="btn-primary" onClick={onOpenCreateModal}>
          <Plus size={16} />
          <span className="hide-mobile">{language === 'zh' ? '创建愿望' : 'Create Wish'}</span>
        </button>

        {/* Premium Upgrade Button */}
        <button
          style={{
            background: 'linear-gradient(135deg, rgba(234, 179, 8, 0.2), rgba(245, 158, 11, 0.2))',
            border: '1px solid rgba(245, 158, 11, 0.4)',
            color: '#fbbf24',
            borderRadius: '9999px',
            padding: '0.5rem 0.9rem',
            fontSize: '0.82rem',
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            align-items: 'center',
            gap: '0.4rem',
            transition: 'all 0.2s ease'
          }}
          onClick={onOpenPremiumModal}
        >
          <Crown size={15} />
          <span className="hide-mobile">{user.isPremium ? 'PRO' : 'Premium'}</span>
        </button>

        {/* Language Toggle */}
        <button
          className="btn-secondary"
          style={{ padding: '0.5rem 0.75rem', fontSize: '0.8rem' }}
          onClick={onToggleLanguage}
          title="Switch Language (中文 / English)"
        >
          <Globe size={15} />
          <span>{language === 'zh' ? '中' : 'EN'}</span>
        </button>

        {/* Theme Toggle */}
        <button
          className="btn-secondary"
          style={{ padding: '0.5rem', borderRadius: '50%' }}
          onClick={onToggleTheme}
          title="Toggle Theme Mode"
        >
          {theme === 'dark' ? <Sun size={17} color="#fbbf24" /> : <Moon size={17} color="#6366f1" />}
        </button>

        {/* User Profile Avatar */}
        <div
          style={{ position: 'relative', cursor: 'pointer' }}
          onClick={onOpenSettingsModal}
          title="Settings & Profile"
        >
          <img
            src={user.avatar}
            alt={user.name}
            style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover', border: '2px solid rgba(168, 85, 247, 0.6)' }}
          />
          {user.verifiedBadge && (
            <div
              style={{
                position: 'absolute',
                bottom: '-2px',
                right: '-2px',
                backgroundColor: '#6366f1',
                borderRadius: '50%',
                padding: '2px',
                color: '#fff',
                display: 'flex'
              }}
            >
              <ShieldCheck size={10} />
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
