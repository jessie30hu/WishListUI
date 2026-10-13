import React from 'react';
import { Conversation, Wish, User, Visitor } from '../../types';
import { MessageSquare, Send, Sparkles, ShieldCheck, Eye, Flame, ChevronRight } from 'lucide-react';

interface MessagesViewProps {
  conversations: Conversation[];
  activeConversationId: string;
  myWishes: Wish[];
  currentUser: User;
  visitors: Visitor[];
  language: 'zh' | 'en';
  onSelectConversation: (id: string) => void;
  onSendMessage: (convId: string, text: string, wishCard?: Wish) => void;
  onOpenPremiumModal: () => void;
}

export const MessagesView: React.FC<MessagesViewProps> = ({
  conversations,
  activeConversationId,
  myWishes,
  currentUser,
  visitors,
  language,
  onSelectConversation,
  onSendMessage,
  onOpenPremiumModal
}) => {
  const [inputText, setInputText] = React.useState('');
  const [showWishPicker, setShowWishPicker] = React.useState(false);

  const currentConv = conversations.find(c => c.id === activeConversationId) || conversations[0];
  const topRepeatedVisitor = visitors.find(v => v.isRepeated) || visitors[0];

  const handleSend = () => {
    if (!inputText.trim()) return;
    onSendMessage(currentConv.id, inputText);
    setInputText('');
  };

  const handleSendWishCard = (wish: Wish) => {
    onSendMessage(currentConv.id, `I shared a wish with you: ${wish.title}`, wish);
    setShowWishPicker(false);
  };

  return (
    <div style={{ display: 'flex', gap: '1.25rem', height: 'calc(100vh - 160px)', minHeight: '550px' }}>
      
      {/* 1. Conversations Inbox Sidebar */}
      <div
        className="glass-panel"
        style={{
          width: '340px',
          flexShrink: 0,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }}
      >
        <div style={{ padding: '1.1rem 1.25rem', borderBottom: '1px solid var(--border-color)' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <MessageSquare size={18} color="#a855f7" />
            {language === 'zh' ? '消息与访客' : 'Messages'}
          </h3>
        </div>

        {/* 方案A 特色入口：置顶访客与动态卡片 (Visitors Entrance) */}
        <div
          style={{
            margin: '0.85rem 1rem 0.5rem 1rem',
            padding: '0.85rem 1rem',
            background: 'linear-gradient(135deg, rgba(168,85,247,0.2), rgba(236,72,153,0.2))',
            border: '1px solid rgba(168, 85, 247, 0.4)',
            borderRadius: 'var(--radius-md)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
          onClick={onOpenPremiumModal}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ position: 'relative' }}>
              <img
                src={topRepeatedVisitor.visitor.avatar}
                alt={topRepeatedVisitor.visitor.name}
                style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' }}
              />
              <span style={{ position: 'absolute', bottom: -2, right: -2, background: '#ec4899', color: '#fff', fontSize: '0.6rem', borderRadius: '50%', width: 14, height: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>
                🔥
              </span>
            </div>
            <div>
              <h4 style={{ fontSize: '0.88rem', fontWeight: 700, color: '#fff' }}>
                👁️ 谁看过了我 ({visitors.length}人访问)
              </h4>
              <p style={{ fontSize: '0.72rem', color: '#e2e8f0' }}>
                {topRepeatedVisitor.visitor.name} 重复访问了 5 次
              </p>
            </div>
          </div>
          <ChevronRight size={16} color="#fbbf24" />
        </div>

        {/* Conversation List */}
        <div style={{ overflowY: 'auto', flexGrow: 1 }}>
          {conversations.map(conv => {
            const isSelected = conv.id === currentConv.id;
            return (
              <div
                key={conv.id}
                style={{
                  padding: '0.9rem 1.1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  cursor: 'pointer',
                  backgroundColor: isSelected ? 'rgba(168, 85, 247, 0.15)' : 'transparent',
                  borderLeft: `3px solid ${isSelected ? '#a855f7' : 'transparent'}`,
                  transition: 'all 0.2s ease'
                }}
                onClick={() => onSelectConversation(conv.id)}
              >
                <div style={{ position: 'relative' }}>
                  <img
                    src={conv.partner.avatar}
                    alt={conv.partner.name}
                    style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover' }}
                  />
                  {conv.unreadCount > 0 && (
                    <span
                      style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        backgroundColor: '#ec4899',
                        color: '#fff',
                        fontSize: '0.65rem',
                        fontWeight: 700,
                        borderRadius: '9999px',
                        width: '16px',
                        height: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      {conv.unreadCount}
                    </span>
                  )}
                </div>

                <div style={{ flexGrow: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.2rem' }}>
                    <h4 style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                      {conv.partner.name}
                    </h4>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                      {conv.lastMessageTime}
                    </span>
                  </div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                    {conv.lastMessage}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. Main Chat Area */}
      <div
        className="glass-panel"
        style={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }}
      >
        {/* Chat Header */}
        <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <img
              src={currentConv.partner.avatar}
              alt={currentConv.partner.name}
              style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }}
            />
            <div>
              <h4 style={{ fontSize: '1rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                {currentConv.partner.name}
                {currentConv.partner.verifiedBadge && <ShieldCheck size={15} color="#6366f1" />}
              </h4>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                {currentConv.partner.location} · 96% Common Wish Match
              </p>
            </div>
          </div>

          <span className="badge-aurora">
            <Sparkles size={12} /> Common Dream Partner
          </span>
        </div>

        {/* Messages List Area */}
        <div style={{ flexGrow: 1, overflowY: 'auto', padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {currentConv.messages.map(msg => {
            const isMe = msg.senderId === currentUser.id;

            return (
              <div
                key={msg.id}
                style={{
                  display: 'flex',
                  justifyContent: isMe ? 'flex-end' : 'flex-start',
                  alignItems: 'flex-start',
                  gap: '0.6rem'
                }}
              >
                {!isMe && (
                  <img
                    src={currentConv.partner.avatar}
                    alt={currentConv.partner.name}
                    style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }}
                  />
                )}

                <div style={{ maxWidth: '70%', display: 'flex', flexDirection: 'column', alignItems: isMe ? 'flex-end' : 'flex-start' }}>
                  <div
                    style={{
                      background: isMe ? 'var(--gradient-aurora)' : 'rgba(255,255,255,0.08)',
                      color: '#ffffff',
                      borderRadius: isMe ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                      padding: '0.75rem 1rem',
                      fontSize: '0.9rem',
                      lineHeight: 1.45,
                      boxShadow: isMe ? '0 4px 15px rgba(99,102,241,0.25)' : 'none'
                    }}
                  >
                    {msg.text}
                  </div>

                  {msg.sharedWishCard && (
                    <div
                      style={{
                        marginTop: '0.5rem',
                        background: 'rgba(15, 23, 42, 0.9)',
                        border: '1px solid rgba(168, 85, 247, 0.4)',
                        borderRadius: 'var(--radius-md)',
                        padding: '0.75rem',
                        maxWidth: '280px'
                      }}
                    >
                      <div style={{ fontSize: '0.72rem', color: '#c084fc', fontWeight: 700, marginBottom: '0.3rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                        <Sparkles size={11} /> Wish Attachment
                      </div>
                      <img
                        src={msg.sharedWishCard.coverUrl}
                        alt={msg.sharedWishCard.title}
                        style={{ width: '100%', height: '110px', borderRadius: '8px', objectFit: 'cover', marginBottom: '0.5rem' }}
                      />
                      <h5 style={{ fontSize: '0.88rem', fontWeight: 700, color: '#fff', marginBottom: '0.2rem' }}>
                        {msg.sharedWishCard.title}
                      </h5>
                      <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                        {msg.sharedWishCard.location}
                      </p>
                    </div>
                  )}

                  <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Share Wish Picker Overlay */}
        {showWishPicker && (
          <div
            style={{
              padding: '0.9rem 1.25rem',
              backgroundColor: 'rgba(0,0,0,0.4)',
              borderTop: '1px solid var(--border-color)',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem'
            }}
          >
            <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#c084fc' }}>
              Select a Wish to Share into Chat:
            </div>
            <div style={{ display: 'flex', gap: '0.6rem', overflowX: 'auto', paddingBottom: '0.3rem' }}>
              {myWishes.map(w => (
                <div
                  key={w.id}
                  style={{
                    background: 'rgba(255,255,255,0.08)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '8px',
                    padding: '0.5rem 0.75rem',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    fontSize: '0.8rem'
                  }}
                  onClick={() => handleSendWishCard(w)}
                >
                  🌌 {w.title}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Input Bar */}
        <div style={{ padding: '0.85rem 1.25rem', borderTop: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <button
            className="btn-secondary"
            style={{ padding: '0.5rem', borderRadius: '50%' }}
            onClick={() => setShowWishPicker(!showWishPicker)}
            title="Share Wish Card"
          >
            <Sparkles size={17} color="#a855f7" />
          </button>

          <input
            type="text"
            placeholder={language === 'zh' ? '输入消息...' : 'Type a message...'}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            style={{
              flexGrow: 1,
              backgroundColor: 'rgba(0, 0, 0, 0.3)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-full)',
              padding: '0.6rem 1.1rem',
              color: 'var(--text-primary)',
              fontSize: '0.9rem',
              outline: 'none'
            }}
          />

          <button className="btn-primary" style={{ padding: '0.6rem 1rem' }} onClick={handleSend}>
            <Send size={15} />
          </button>
        </div>

      </div>

    </div>
  );
};
