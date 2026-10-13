import React from 'react';
import { Wish } from '../../types';
import { CategoryBadge } from '../common/CategoryBadge';
import { X, Heart, MessageSquare, MapPin, Calendar, CheckCircle2, Clock, Sparkles, UserCheck } from 'lucide-react';

interface WishDetailModalProps {
  wish: Wish | null;
  isOpen: boolean;
  onClose: () => void;
  onToggleHeart: (wishId: string, e: React.MouseEvent) => void;
  onOpenChat: (userId: string) => void;
  language: 'zh' | 'en';
}

export const WishDetailModal: React.FC<WishDetailModalProps> = ({
  wish,
  isOpen,
  onClose,
  onToggleHeart,
  onOpenChat,
  language
}) => {
  if (!isOpen || !wish) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()} style={{ overflow: 'hidden', padding: 0 }}>
        
        {/* Hero Cover Image */}
        <div style={{ position: 'relative', width: '100%', height: '240px' }}>
          <img src={wish.coverUrl} alt={wish.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 30%, rgba(17, 24, 39, 0.95) 100%)' }} />

          <button
            className="btn-secondary"
            style={{ position: 'absolute', top: '12px', right: '12px', padding: '0.4rem', borderRadius: '50%', background: 'rgba(0,0,0,0.5)' }}
            onClick={onClose}
          >
            <X size={18} />
          </button>

          <div style={{ position: 'absolute', top: '12px', left: '12px' }}>
            <CategoryBadge category={wish.category} />
          </div>

          <div style={{ position: 'absolute', bottom: '16px', left: '20px', right: '20px' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', lineHeight: 1.3 }}>
              {wish.title}
            </h2>
          </div>
        </div>

        {/* Content Details */}
        <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          
          {/* Creator Profile snippet */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '1rem', borderBottom: '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <img
                src={wish.userAvatar}
                alt={wish.userName}
                style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover' }}
              />
              <div>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 700 }}>{wish.userName}</h4>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{wish.userLocation}</p>
              </div>
            </div>

            {wish.userId !== 'user_me' && (
              <button className="btn-primary" style={{ padding: '0.45rem 0.9rem', fontSize: '0.8rem' }} onClick={() => onOpenChat(wish.userId)}>
                <MessageSquare size={14} /> Message
              </button>
            )}
          </div>

          {/* Description */}
          <div>
            <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>
              Description
            </h4>
            <p style={{ fontSize: '0.92rem', color: 'var(--text-primary)', lineHeight: 1.6 }}>
              {wish.description}
            </p>
          </div>

          {/* Location & Date Meta badges */}
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            {wish.location && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                <MapPin size={15} color="#ec4899" /> {wish.location}
              </div>
            )}

            {wish.targetDate && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                <Calendar size={15} color="#818cf8" /> Target: {wish.targetDate}
              </div>
            )}
          </div>

          {/* Action Footer */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
            <button
              style={{
                background: wish.isHearted ? 'rgba(236, 72, 153, 0.2)' : 'rgba(255,255,255,0.06)',
                border: `1px solid ${wish.isHearted ? 'rgba(236, 72, 153, 0.5)' : 'var(--border-color)'}`,
                color: wish.isHearted ? '#ec4899' : 'var(--text-secondary)',
                borderRadius: '9999px',
                padding: '0.5rem 1.1rem',
                fontSize: '0.88rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                align-items: 'center',
                gap: '0.4rem'
              }}
              onClick={(e) => onToggleHeart(wish.id, e)}
            >
              <Heart size={16} fill={wish.isHearted ? '#ec4899' : 'none'} />
              <span>{wish.heartsCount} Hearts</span>
            </button>

            {wish.status === 'Completed' && (
              <span className="badge-aurora" style={{ backgroundColor: 'rgba(16, 185, 129, 0.2)', color: '#34d399' }}>
                <CheckCircle2 size={13} /> Completed
              </span>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
