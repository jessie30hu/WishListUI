import React from 'react';
import { CommonWishMatch } from '../../types';
import { Sparkles, MapPin, Heart, MessageSquare, ShieldCheck, ArrowRight } from 'lucide-react';

interface UserCardProps {
  match: CommonWishMatch;
  onSelectUser: (userId: string) => void;
  onOpenChat: (userId: string) => void;
}

export const UserCard: React.FC<UserCardProps> = ({ match, onSelectUser, onOpenChat }) => {
  const { user, score, explanation, commonWishesCount, matchedWishTitles } = match;

  return (
    <div
      className="glass-panel glass-card-glow"
      style={{
        padding: '1.25rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        position: 'relative'
      }}
    >
      {/* Header Profile Section */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.85rem' }}>
        <div style={{ position: 'relative' }}>
          <img
            src={user.avatar}
            alt={user.name}
            style={{ width: '56px', height: '56px', borderRadius: '50%', objectFit: 'cover', border: '2px solid rgba(168, 85, 247, 0.5)' }}
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
                display: 'flex',
                align-items: 'center',
                justifyContent: 'center',
                color: '#fff'
              }}
              title="Verified Identity Badge"
            >
              <ShieldCheck size={12} />
            </div>
          )}
        </div>

        <div style={{ flexGrow: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h4
              style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)', cursor: 'pointer' }}
              onClick={() => onSelectUser(user.id)}
            >
              {user.name}
            </h4>
            <span className="badge-aurora">
              <Sparkles size={12} /> {score}% Common Wish
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
            <MapPin size={12} /> {user.location}
          </div>
        </div>
      </div>

      {/* Shared Wishes Count Banner */}
      <div
        style={{
          background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.12), rgba(236, 72, 153, 0.12))',
          border: '1px solid rgba(168, 85, 247, 0.3)',
          borderRadius: 'var(--radius-md)',
          padding: '0.75rem 0.9rem'
        }}
      >
        <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#c084fc', marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          ✨ You have {commonWishesCount} wishes in common
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
          {matchedWishTitles.slice(0, 3).map((title, idx) => (
            <div key={idx} style={{ fontSize: '0.8rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span style={{ color: '#ec4899', fontSize: '0.7rem' }}>✦</span>
              <span style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{title}</span>
            </div>
          ))}
        </div>
      </div>

      {/* AI Explanation Snippet */}
      <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontStyle: 'italic', lineHeight: 1.4 }}>
        "{explanation}"
      </p>

      {/* Footer Actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginTop: 'auto', paddingTop: '0.5rem' }}>
        <button
          className="btn-secondary"
          style={{ flex: 1, justifyContent: 'center', fontSize: '0.82rem' }}
          onClick={() => onSelectUser(user.id)}
        >
          View Profile <ArrowRight size={14} />
        </button>
        <button
          className="btn-primary"
          style={{ padding: '0.55rem 1rem', fontSize: '0.82rem' }}
          onClick={() => onOpenChat(user.id)}
        >
          <MessageSquare size={14} /> Message
        </button>
      </div>
    </div>
  );
};
