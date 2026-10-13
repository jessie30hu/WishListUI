import React from 'react';
import { SharedExperienceStory } from '../../types';
import { CheckCircle2, Heart, MapPin, Calendar, Sparkles } from 'lucide-react';

interface ExperienceCardProps {
  story: SharedExperienceStory;
}

export const ExperienceCard: React.FC<ExperienceCardProps> = ({ story }) => {
  const [likes, setLikes] = React.useState(story.likesCount);
  const [hasLiked, setHasLiked] = React.useState(false);

  const handleLike = () => {
    if (hasLiked) {
      setLikes(l => l - 1);
      setHasLiked(false);
    } else {
      setLikes(l => l + 1);
      setHasLiked(true);
    }
  };

  return (
    <div
      className="glass-panel glass-card-glow"
      style={{
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        height: '100%'
      }}
    >
      <div style={{ position: 'relative', height: '180px', width: '100%' }}>
        <img
          src={story.coverUrl}
          alt={story.wishTitle}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to bottom, transparent 30%, rgba(0,0,0,0.85) 100%)'
          }}
        />

        <div style={{ position: 'absolute', top: '12px', left: '12px' }}>
          <span style={{ backgroundColor: 'rgba(16, 185, 129, 0.25)', color: '#34d399', border: '1px solid rgba(16, 185, 129, 0.4)' }} className="badge-aurora">
            <CheckCircle2 size={12} /> We Did It
          </span>
        </div>

        {/* Avatars of the two partners */}
        <div style={{ position: 'absolute', bottom: '12px', left: '14px', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img
              src={story.userA.avatar}
              alt={story.userA.name}
              style={{ width: '32px', height: '32px', borderRadius: '50%', border: '2px solid #6366f1', objectFit: 'cover' }}
            />
            <img
              src={story.userB.avatar}
              alt={story.userB.name}
              style={{ width: '32px', height: '32px', borderRadius: '50%', border: '2px solid #ec4899', marginLeft: '-10px', objectFit: 'cover' }}
            />
          </div>
          <div style={{ color: '#fff', fontSize: '0.82rem', fontWeight: 600 }}>
            {story.userA.name.split(' ')[0]} + {story.userB.name.split(' ')[0]}
          </div>
        </div>
      </div>

      <div style={{ padding: '1.1rem', display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'space-between' }}>
        <div>
          <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
            {story.wishTitle}
          </h4>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
              <MapPin size={12} /> {story.location}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
              <Calendar size={12} /> {story.completedDate}
            </span>
          </div>

          <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.45, marginBottom: '1rem' }}>
            "{story.storyText}"
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '0.75rem', borderTop: '1px solid var(--border-color)' }}>
          <span style={{ fontSize: '0.75rem', color: '#c084fc', display: 'flex', alignItems: 'center', gap: '0.3rem', fontWeight: 600 }}>
            <Sparkles size={12} /> Shared Memory
          </span>

          <button
            style={{
              background: hasLiked ? 'rgba(236, 72, 153, 0.2)' : 'rgba(255,255,255,0.06)',
              border: `1px solid ${hasLiked ? 'rgba(236, 72, 153, 0.5)' : 'var(--border-color)'}`,
              color: hasLiked ? '#ec4899' : 'var(--text-secondary)',
              borderRadius: '9999px',
              padding: '0.3rem 0.7rem',
              fontSize: '0.78rem',
              cursor: 'pointer',
              display: 'flex',
              align-items: 'center',
              gap: '0.35rem'
            }}
            onClick={handleLike}
          >
            <Heart size={13} fill={hasLiked ? '#ec4899' : 'none'} />
            <span>{likes}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
