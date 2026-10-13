import React from 'react';
import { Wish } from '../../types';
import { CategoryBadge } from './CategoryBadge';
import { Heart, MapPin, Calendar, Plus, CheckCircle2, Clock, Sparkles } from 'lucide-react';

interface WishCardProps {
  wish: Wish;
  onSelectWish?: (wish: Wish) => void;
  onToggleHeart?: (wishId: string, e: React.MouseEvent) => void;
  onAddWishCopy?: (wish: Wish, e: React.MouseEvent) => void;
}

export const WishCard: React.FC<WishCardProps> = ({
  wish,
  onSelectWish,
  onToggleHeart,
  onAddWishCopy
}) => {
  const getStatusBadge = (status: Wish['status']) => {
    switch (status) {
      case 'Completed':
        return (
          <span style={{ backgroundColor: 'rgba(16, 185, 129, 0.2)', color: '#34d399', border: '1px solid rgba(16, 185, 129, 0.4)' }} className="badge-aurora">
            <CheckCircle2 size={12} /> Completed
          </span>
        );
      case 'In Progress':
        return (
          <span style={{ backgroundColor: 'rgba(245, 158, 11, 0.2)', color: '#fbbf24', border: '1px solid rgba(245, 158, 11, 0.4)' }} className="badge-aurora">
            <Clock size={12} /> In Progress
          </span>
        );
      default:
        return (
          <span style={{ backgroundColor: 'rgba(99, 102, 241, 0.15)', color: '#a5b4fc', border: '1px solid rgba(99, 102, 241, 0.3)' }} className="badge-aurora">
            <Sparkles size={12} /> Planned
          </span>
        );
    }
  };

  return (
    <div
      className="glass-panel glass-card-glow"
      style={{
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        overflow: 'hidden'
      }}
      onClick={() => onSelectWish && onSelectWish(wish)}
    >
      {/* Card Header Image */}
      <div style={{ position: 'relative', width: '100%', height: '190px', overflow: 'hidden' }}>
        <img
          src={wish.coverUrl}
          alt={wish.title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.5s ease'
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        />
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.85) 100%)'
          }}
        />

        {/* Top Badges overlay */}
        <div style={{ position: 'absolute', top: '12px', left: '12px', right: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <CategoryBadge category={wish.category} size="sm" />
          <div style={{ display: 'flex', gap: '0.4rem' }}>
            {getStatusBadge(wish.status)}
          </div>
        </div>

        {/* Wish Title & User overlay */}
        <div style={{ position: 'absolute', bottom: '12px', left: '14px', right: '14px' }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#ffffff', lineHeight: 1.3, marginBottom: '0.4rem', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
            {wish.title}
          </h3>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <img
              src={wish.userAvatar}
              alt={wish.userName}
              style={{ width: '22px', height: '22px', borderRadius: '50%', objectFit: 'cover', border: '1px solid rgba(255,255,255,0.6)' }}
            />
            <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.9)', fontWeight: 500 }}>
              {wish.userName}
            </span>
            {wish.location && (
              <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.7)', display: 'flex', alignItems: 'center', gap: '0.2rem', marginLeft: 'auto' }}>
                <MapPin size={11} /> {wish.location}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Card Content Body */}
      <div style={{ padding: '1rem 1.1rem', display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'space-between' }}>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.45, marginBottom: '1rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {wish.description}
        </p>

        {/* Footer Actions */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '0.75rem', borderTop: '1px solid var(--border-color)' }}>
          {/* Target Date or Granularity */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            {wish.targetDate ? (
              <>
                <Calendar size={12} /> {wish.targetDate}
              </>
            ) : (
              <span style={{ backgroundColor: 'rgba(255,255,255,0.06)', padding: '0.1rem 0.4rem', borderRadius: '4px' }}>
                {wish.granularity === 'Macro' ? '🌌 Lifetime Dream' : '⚡ Micro Goal'}
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {/* One-Tap +1 Wish Button */}
            {onAddWishCopy && wish.userId !== 'user_me' && (
              <button
                className="btn-secondary"
                title="Add to My Bucket List (+1 Wish)"
                style={{ padding: '0.35rem 0.6rem', fontSize: '0.75rem' }}
                onClick={(e) => {
                  e.stopPropagation();
                  onAddWishCopy(wish, e);
                }}
              >
                <Plus size={13} /> +1 Wish
              </button>
            )}

            {/* Heart Toggle Button */}
            <button
              style={{
                background: wish.isHearted ? 'rgba(236, 72, 153, 0.2)' : 'rgba(255,255,255,0.06)',
                border: `1px solid ${wish.isHearted ? 'rgba(236, 72, 153, 0.5)' : 'var(--border-color)'}`,
                color: wish.isHearted ? '#ec4899' : 'var(--text-secondary)',
                borderRadius: '9999px',
                padding: '0.35rem 0.7rem',
                fontSize: '0.8rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                align-items: 'center',
                gap: '0.35rem',
                transition: 'all 0.2s ease'
              }}
              onClick={(e) => {
                e.stopPropagation();
                if (onToggleHeart) onToggleHeart(wish.id, e);
              }}
            >
              <Heart size={14} fill={wish.isHearted ? '#ec4899' : 'none'} />
              <span>{wish.heartsCount}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
