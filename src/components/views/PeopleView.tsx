import React from 'react';
import { CommonWishMatch } from '../../types';
import { UserCard } from '../common/UserCard';
import { Users, Sparkles, Filter, ShieldCheck, MapPin } from 'lucide-react';

interface PeopleViewProps {
  matches: CommonWishMatch[];
  language: 'zh' | 'en';
  onSelectUser: (userId: string) => void;
  onOpenChat: (userId: string) => void;
}

export const PeopleView: React.FC<PeopleViewProps> = ({
  matches,
  language,
  onSelectUser,
  onOpenChat
}) => {
  const [minMatchScore, setMinMatchScore] = React.useState<number>(80);
  const [onlyVerified, setOnlyVerified] = React.useState<boolean>(false);

  const filteredMatches = matches.filter(m => {
    if (m.score < minMatchScore) return false;
    if (onlyVerified && !m.user.verifiedBadge) return false;
    return true;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.8rem', paddingBottom: '3rem' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Users size={26} color="#6366f1" />
            {language === 'zh' ? '寻同路人 (People Discovery)' : 'People Who Share Your Dreams'}
          </h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            {language === 'zh' ? '绝对基于共同愿望与价值观契合度算法推荐' : 'Purely matched by Common Wishes & Shared Lifetime Goals'}
          </p>
        </div>
      </div>

      {/* Matching Filter Controls */}
      <div className="glass-panel" style={{ padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.82rem' }}>
            <Filter size={15} color="#a855f7" />
            <span style={{ color: 'var(--text-muted)' }}>Common Wish Match Score ≥</span>
            {[80, 85, 90, 95].map(sc => (
              <button
                key={sc}
                style={{
                  background: minMatchScore === sc ? 'var(--gradient-aurora)' : 'rgba(255,255,255,0.06)',
                  color: minMatchScore === sc ? '#fff' : 'var(--text-secondary)',
                  border: `1px solid ${minMatchScore === sc ? 'transparent' : 'var(--border-color)'}`,
                  borderRadius: '9999px',
                  padding: '0.25rem 0.65rem',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
                onClick={() => setMinMatchScore(sc)}
              >
                {sc}%
              </button>
            ))}
          </div>

          <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.82rem', color: 'var(--text-secondary)', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={onlyVerified}
              onChange={(e) => setOnlyVerified(e.target.checked)}
              style={{ accentColor: '#6366f1' }}
            />
            <ShieldCheck size={15} color="#6366f1" /> Verified Identity Only
          </label>
        </div>

        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          Found {filteredMatches.length} soulmate matches
        </div>
      </div>

      {/* People Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
        {filteredMatches.map(m => (
          <UserCard
            key={m.id}
            match={m}
            onSelectUser={onSelectUser}
            onOpenChat={onOpenChat}
          />
        ))}
      </div>

    </div>
  );
};
