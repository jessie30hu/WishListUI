import React from 'react';
import { User, Wish } from '../../types';
import { X, Sparkles, MessageSquare, Heart, ShieldCheck, MapPin, Compass, ArrowRight } from 'lucide-react';

interface OtherProfileModalProps {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenChat: (userId: string) => void;
  language: 'zh' | 'en';
}

export const OtherProfileModal: React.FC<OtherProfileModalProps> = ({
  user,
  isOpen,
  onClose,
  onOpenChat,
  language
}) => {
  if (!isOpen || !user) return null;

  const sharedWishesList = [
    { title: 'See the Northern Lights in Iceland', category: 'Travel' },
    { title: 'Road trip across New Zealand South Island', category: 'Adventure' },
    { title: 'Sleep under the stars in a desert bubble dome', category: 'Lifestyle' }
  ];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()} style={{ padding: '1.75rem' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '0.5rem' }}>
          <button className="btn-secondary" style={{ padding: '0.4rem', borderRadius: '50%' }} onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {/* Profile Card Info */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: '1.5rem' }}>
          <div style={{ position: 'relative', marginBottom: '0.8rem' }}>
            <img
              src={user.avatar}
              alt={user.name}
              style={{ width: '84px', height: '84px', borderRadius: '50%', objectFit: 'cover', border: '3px solid #a855f7' }}
            />
            {user.verifiedBadge && (
              <div style={{ position: 'absolute', bottom: 0, right: 0, backgroundColor: '#6366f1', borderRadius: '50%', padding: '3px', color: '#fff' }}>
                <ShieldCheck size={14} />
              </div>
            )}
          </div>

          <h3 style={{ fontSize: '1.4rem', fontWeight: 800 }}>{user.name}</h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>{user.location}</p>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', maxWidth: '420px', lineHeight: 1.45 }}>
            "{user.bio}"
          </p>
        </div>

        {/* PROMINENT COMMON WISHES SECTION (Wish > Social Data) */}
        <div
          style={{
            background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15), rgba(236, 72, 153, 0.15))',
            border: '1px solid rgba(168, 85, 247, 0.4)',
            borderRadius: 'var(--radius-lg)',
            padding: '1.2rem',
            marginBottom: '1.5rem'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.8rem' }}>
            <span style={{ fontSize: '0.92rem', fontWeight: 800, color: '#c084fc', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              ✨ You have 3 wishes in common
            </span>
            <span className="badge-aurora" style={{ fontSize: '0.75rem' }}>
              96% Common Wish
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {sharedWishesList.map((item, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: 'rgba(0,0,0,0.25)',
                  padding: '0.65rem 0.85rem',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '0.85rem'
                }}
              >
                <span style={{ color: '#ec4899' }}>✦</span>
                <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{item.title}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '0.8rem' }}>
          <button className="btn-primary" style={{ flex: 1, justifyContent: 'center' }} onClick={() => { onClose(); onOpenChat(user.id); }}>
            <MessageSquare size={16} /> Send Message
          </button>
        </div>

      </div>
    </div>
  );
};
