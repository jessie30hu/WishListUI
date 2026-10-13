import React from 'react';
import { Home, Sparkles, Users, MessageSquare, User as UserIcon } from 'lucide-react';

interface MobileNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  unreadMessagesCount: number;
}

export const MobileNav: React.FC<MobileNavProps> = ({
  activeTab,
  onTabChange,
  unreadMessagesCount
}) => {
  // Scheme A 5 Golden Tabs: Home, Wishes, Match, Messages, Profile
  const navItems = [
    { id: 'home', icon: Home, label: '首页' },
    { id: 'wishes', icon: Sparkles, label: '愿望' },
    { id: 'people', icon: Users, label: '匹配' },
    { id: 'messages', icon: MessageSquare, label: '消息', badge: unreadMessagesCount },
    { id: 'profile', icon: UserIcon, label: '我的' }
  ];

  return (
    <nav
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        backgroundColor: 'rgba(15, 23, 42, 0.92)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderTop: '1px solid var(--border-color)',
        padding: '0.5rem 0.25rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around'
      }}
      className="mobile-nav-only"
    >
      {navItems.map(item => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;

        return (
          <button
            key={item.id}
            style={{
              background: 'transparent',
              color: isActive ? '#a855f7' : 'var(--text-muted)',
              border: 'none',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.2rem',
              fontSize: '0.7rem',
              fontWeight: isActive ? 700 : 500,
              cursor: 'pointer',
              position: 'relative',
              padding: '0.25rem 0.5rem'
            }}
            onClick={() => onTabChange(item.id)}
          >
            <Icon size={20} color={isActive ? '#a855f7' : 'var(--text-muted)'} />
            <span>{item.label}</span>

            {item.badge && item.badge > 0 ? (
              <span
                style={{
                  position: 'absolute',
                  top: '0px',
                  right: '6px',
                  backgroundColor: '#ec4899',
                  color: '#fff',
                  fontSize: '0.62rem',
                  fontWeight: 700,
                  borderRadius: '9999px',
                  width: '16px',
                  height: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {item.badge}
              </span>
            ) : null}
          </button>
        );
      })}
    </nav>
  );
};
