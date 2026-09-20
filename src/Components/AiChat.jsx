import { useEffect, useRef, useState } from 'react';
import { Bot, RotateCcw, Send, Sparkles, X, Trash2, Copy } from 'lucide-react';

const suggestedQuestions = [
  'What does Rishu build?',
  'Tell me about his skills',
  'How can I contact Rishu?',
];

const defaultPosition = () => ({ x: window.innerWidth - 88, y: window.innerHeight - 100 });

const MESSAGES_KEY = 'portfolio-chat-messages';

const AiChat = () => {
  const [prompt, setPrompt] = useState('');
  const [messages, setMessages] = useState(() => {
    try {
      const raw = JSON.parse(localStorage.getItem(MESSAGES_KEY));
      return Array.isArray(raw) ? raw : [];
    } catch {
      return [];
    }
  });
  const [status, setStatus] = useState('idle');
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('portfolio-chat-position'));
      return saved && Number.isFinite(saved.x) && Number.isFinite(saved.y) ? saved : defaultPosition();
    } catch {
      return defaultPosition();
    }
  });
  const positionRef = useRef(position);
  const dragRef = useRef({ active: false, moved: false, offsetX: 0, offsetY: 0 });
  const promptRef = useRef(null);
  const messagesRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    promptRef.current?.focus();
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open]);

  // persist messages
  useEffect(() => {
    try {
      localStorage.setItem(MESSAGES_KEY, JSON.stringify(messages));
    } catch {
      // ignore storage failures
    }
  }, [messages]);

  // auto-scroll to the bottom when messages change
  useEffect(() => {
    const el = messagesRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, status]);

  const handlePointerDown = (event) => {
    if (event.button !== 0) return;
    dragRef.current = {
      active: true,
      moved: false,
      offsetX: event.clientX - position.x,
      offsetY: event.clientY - position.y,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event) => {
    if (!dragRef.current.active) return;
    const next = {
      x: Math.max(8, Math.min(window.innerWidth - 64, event.clientX - dragRef.current.offsetX)),
      y: Math.max(8, Math.min(window.innerHeight - 64, event.clientY - dragRef.current.offsetY)),
    };
    if (Math.abs(next.x - position.x) > 3 || Math.abs(next.y - position.y) > 3) dragRef.current.moved = true;
    positionRef.current = next;
    setPosition(next);
  };

  const handlePointerUp = (event) => {
    if (!dragRef.current.active) return;
    dragRef.current.active = false;
    event.currentTarget.releasePointerCapture(event.pointerId);
    localStorage.setItem('portfolio-chat-position', JSON.stringify(positionRef.current));
  };

  const askAssistant = async (event) => {
    event.preventDefault();
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (!apiKey || !prompt.trim()) {
      if (!apiKey) setMessages((current) => [...current, { role: 'assistant', text: 'Add VITE_GEMINI_API_KEY to .env.local to enable the assistant.' }]);
      return;
    }

    const question = prompt.trim();
    // cap stored messages to the last 50 for size reasons
    const capped = [...messages, { role: 'user', text: question }].slice(-50);
    setMessages(capped);
    setPrompt('');
    setStatus('loading');
    try {
      const conversation = capped.map(({ role, text }) => `${role === 'user' ? 'Visitor' : 'Assistant'}: ${text}`).join('\n');
      const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-goog-api-key': apiKey },
        body: JSON.stringify({ contents: [{ parts: [{ text: `You are Rishu's portfolio assistant. Answer questions about Rishu Singh, his BCA in Data Science and AI from BBD University, current MCA in Software Engineering at USICT/GGSIPU, full-stack skills, projects, weather tracker, contact details, and this website. If something is unknown, say so clearly. Keep answers helpful, warm, and concise. Do not invent personal details.\n\nConversation:\n${conversation}` }] }] }),
      });
      if (!response.ok) throw new Error('AI service returned an error.');
      const data = await response.json();
      const answer = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!answer) throw new Error('AI service returned an empty response.');
      setMessages((current) => [...current, { role: 'assistant', text: answer }].slice(-50));
    } catch {
      setMessages((current) => [...current, { role: 'assistant', text: 'The assistant is unavailable right now. Please try again.' }].slice(-50));
    } finally {
      setStatus('idle');
    }
  };

  const resetPosition = () => {
    const next = defaultPosition();
    positionRef.current = next;
    setPosition(next);
    localStorage.removeItem('portfolio-chat-position');
  };

  const clearChat = () => {
    const ok = window.confirm('Clear the current conversation? This cannot be undone.');
    if (!ok) return;
    setMessages([]);
    try { localStorage.removeItem(MESSAGES_KEY); } catch (e) { console.warn('Could not remove messages from storage', e); }
  };

  const clearAll = () => {
    const ok = window.confirm('Clear conversation and reset assistant position?');
    if (!ok) return;
    setMessages([]);
    resetPosition();
    try { localStorage.removeItem(MESSAGES_KEY); localStorage.removeItem('portfolio-chat-position'); } catch (e) { console.warn('Could not clear storage', e); }
  };

  const exportChat = async () => {
    try {
      const transcript = messages.map(m => `${m.role === 'user' ? 'Visitor' : 'Assistant'}: ${m.text}`).join('\n\n');
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(transcript || '');
        alert('Conversation copied to clipboard.');
      } else {
        // fallback: open in a new window for manual copy
        const w = window.open('', '_blank');
        if (w) {
          w.document.title = 'Conversation transcript';
          w.document.body.style.whiteSpace = 'pre-wrap';
          w.document.body.textContent = transcript;
        } else {
          alert('Unable to open clipboard or new window.');
        }
      }
    } catch (e) {
      alert('Failed to copy transcript.');
    }
  };

  return (
    <div className="ai-widget" style={{ left: `${position.x}px`, top: `${position.y}px` }}>
      {open && <section className="ai-popover" aria-labelledby="ai-title">
        <div className="ai-popover-header"><span><Sparkles size={14} /> portfolio assistant</span><div className="ai-popover-actions"><button type="button" onClick={exportChat} aria-label="Export conversation" title="Copy conversation"><Copy size={14} /></button><button type="button" onClick={clearChat} aria-label="Clear conversation" title="Clear conversation"><Trash2 size={14} /></button><button type="button" onClick={clearAll} aria-label="Clear conversation and reset" title="Clear all"><Trash2 size={14} /></button><button type="button" onClick={resetPosition} aria-label="Reset assistant position" title="Reset position"><RotateCcw size={14} /></button><button type="button" onClick={() => setOpen(false)} aria-label="Close assistant"><X size={16} /></button></div></div>
        <h2 id="ai-title">Hi, I&apos;m Rishu&apos;s bot.</h2>
        <p className="feature-copy">Ask about Rishu, his education, skills, projects, or how this site works.</p>
        {messages.length === 0 && <div className="ai-suggestions">{suggestedQuestions.map((question) => <button type="button" key={question} onClick={() => setPrompt(question)}>{question}</button>)}</div>}
        {messages.length > 0 && <div ref={messagesRef} className="ai-messages" aria-live="polite">{messages.map((message, index) => <div className={`ai-message ai-message-${message.role}`} key={`${message.role}-${index}`}><span>{message.role === 'user' ? 'you' : 'bot'}</span><p>{message.text}</p></div>)}{status === 'loading' && <div className="ai-message ai-message-assistant is-loading"><span>bot</span><p>Thinking...</p></div>}</div>}
        <form className="ai-form" onSubmit={askAssistant}>
          <label className="sr-only" htmlFor="ai-prompt">Ask a question</label>
          <textarea ref={promptRef} id="ai-prompt" value={prompt} onChange={(event) => setPrompt(event.target.value)} onKeyDown={(event) => { if (event.key === 'Enter' && !event.shiftKey) { event.preventDefault(); event.currentTarget.form.requestSubmit(); } }} placeholder="Ask me anything..." rows="2" disabled={status === 'loading'} />
          <button type="submit" disabled={status === 'loading' || !prompt.trim()}><Send size={15} /> {status === 'loading' ? 'thinking...' : 'ask'}</button>
        </form>
      </section>}
      <button className="ai-fab" type="button" onPointerDown={handlePointerDown} onPointerMove={handlePointerMove} onPointerUp={handlePointerUp} onClick={() => { if (!dragRef.current.moved) setOpen(!open); }} aria-expanded={open} aria-label={open ? 'Close portfolio assistant' : 'Open portfolio assistant'} title="Drag to move or click to open"><Bot size={25} /></button>
    </div>
  );
};

export default AiChat;
