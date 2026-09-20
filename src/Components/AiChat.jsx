import { useRef, useState } from 'react';
import { Bot, Send, Sparkles, X } from 'lucide-react';

const AiChat = () => {
  const [prompt, setPrompt] = useState('');
  const [reply, setReply] = useState('');
  const [status, setStatus] = useState('idle');
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState(() => {
    const saved = localStorage.getItem('portfolio-chat-position');
    return saved ? JSON.parse(saved) : { x: window.innerWidth - 88, y: window.innerHeight - 100 };
  });
  const positionRef = useRef(position);
  const dragRef = useRef({ active: false, moved: false, offsetX: 0, offsetY: 0 });

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
      setReply(apiKey ? 'Write a question first.' : 'Add VITE_GEMINI_API_KEY to .env.local to enable the assistant.');
      return;
    }

    setStatus('loading');
    setReply('');
    try {
      const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-goog-api-key': apiKey },
        body: JSON.stringify({ contents: [{ parts: [{ text: `You are Rishu's portfolio assistant. Answer questions about Rishu Singh, his BCA in Data Science and AI from BBD University, current MCA in Software Engineering at USICT/GGSIPU, full-stack skills, projects, weather tracker, contact details, and this website. If something is unknown, say so clearly. Keep answers helpful and concise.\n\nVisitor question: ${prompt}` }] }] }),
      });
      if (!response.ok) throw new Error('AI service returned an error.');
      const data = await response.json();
      setReply(data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response received.');
    } catch {
      setReply('The assistant is unavailable right now. Please try again.');
    } finally {
      setStatus('ready');
    }
  };

  return (
    <div className="ai-widget" style={{ left: `${position.x}px`, top: `${position.y}px` }}>
      {open && <section className="ai-popover" aria-labelledby="ai-title">
        <div className="ai-popover-header"><span><Sparkles size={14} /> portfolio assistant</span><button type="button" onClick={() => setOpen(false)} aria-label="Close assistant"><X size={16} /></button></div>
        <h2 id="ai-title">Hi, I&apos;m Rishu&apos;s bot.</h2>
        <p className="feature-copy">Ask about Rishu, his education, skills, projects, or how this site works.</p>
        <form className="ai-form" onSubmit={askAssistant}>
          <label className="sr-only" htmlFor="ai-prompt">Ask a question</label>
          <textarea id="ai-prompt" value={prompt} onChange={(event) => setPrompt(event.target.value)} placeholder="Try: What does Rishu build?" rows="3" />
          <button type="submit" disabled={status === 'loading'}><Send size={15} /> {status === 'loading' ? 'thinking...' : 'ask'}</button>
        </form>
        {reply && <div className="ai-reply">{reply}</div>}
      </section>}
      <button className="ai-fab" type="button" onPointerDown={handlePointerDown} onPointerMove={handlePointerMove} onPointerUp={handlePointerUp} onClick={() => { if (!dragRef.current.moved) setOpen(!open); }} aria-expanded={open} aria-label={open ? 'Close portfolio assistant' : 'Open portfolio assistant'} title="Drag to move or click to open"><Bot size={25} /></button>
    </div>
  );
};

export default AiChat;
