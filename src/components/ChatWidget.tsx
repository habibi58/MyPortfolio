import { useEffect, useRef, useState } from 'react';
import type { FormEvent } from 'react';
import * as ReactDOM from 'react-dom';
import { Bot, MessageSquare, RefreshCw, Send, Sparkles, X } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { getLenisInstance } from '../hooks/useLenis';

export interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  time: string;
  isError?: boolean;
}

export interface CopilotChatProps {
  className?: string;
}

type ChatResponse = {
  reply?: string;
  error?: string;
};

const MAX_MESSAGE_LENGTH = 1200;
const MAX_SAVED_MESSAGES = 25;
const CHAT_SESSION_KEY = 'jason-ai-chat-session';
const welcomeMessage = "Hi, I'm Jason's AI assistant. I can tell you about his experience, skills, education, projects, or contact details.";
const allQuickPrompts = [
  "What are Jason's top skills?",
  'Tell me about Jason\'s projects',
  'How can I contact Jason?',
  'What does Jason do at Accenture?',
  'What are Jason\'s hobbies?',
  'Tell me about Jason\'s education',
  'What games does Jason play?',
  'What\'s Jason\'s favorite football team?',
  'How can I reach Jason on LinkedIn?',
  'What is Jason studying?',
  'Tell me about Jason\'s internship',
  'What\'s Jason\'s favorite Marvel character?',
];

function createMessage(sender: ChatMessage['sender'], text: string, isError = false): ChatMessage {
  return {
    id: `${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    sender,
    text,
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    ...(isError ? { isError: true } : {}),
  };
}

function loadSessionMessages(): ChatMessage[] {
  if (typeof window === 'undefined') return [];

  try {
    const raw = window.sessionStorage.getItem(CHAT_SESSION_KEY);
    if (!raw) return [];

    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];

    return parsed
      .filter((item): item is Record<string, unknown> => !!item && typeof item === 'object' && 'id' in item && 'sender' in item && 'text' in item && 'time' in item)
      .map((item) => {
        const senderValue = item.sender;
        const sender: ChatMessage['sender'] = senderValue === 'bot' ? 'bot' : 'user';

        return {
          id: String(item.id),
          sender,
          text: String(item.text),
          time: String(item.time),
          ...(item.isError ? { isError: true } : {}),
        } satisfies ChatMessage;
      })
      .slice(-MAX_SAVED_MESSAGES);
  } catch {
    return [];
  }
}

export function ChatWidget({ className }: CopilotChatProps = {}) {
  const [isMounted, setIsMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isChatHovering, setIsChatHovering] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(() => loadSessionMessages());
  const [quickPrompts, setQuickPrompts] = useState<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const typingIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const frameId = window.requestAnimationFrame(() => setIsMounted(true));
    // Randomly select 4 prompts from allQuickPrompts
    const shuffled = [...allQuickPrompts].sort(() => 0.5 - Math.random());
    setQuickPrompts(shuffled.slice(0, 4));
    return () => {
      window.cancelAnimationFrame(frameId);
      if (typingIntervalRef.current) {
        clearInterval(typingIntervalRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const trimmedMessages = messages.slice(-MAX_SAVED_MESSAGES);
    window.sessionStorage.setItem(CHAT_SESSION_KEY, JSON.stringify(trimmedMessages));
  }, [messages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading, isTyping]);

  useEffect(() => {
    if (!isOpen || isLoading || isTyping || messages.length > 0) return;

    const timer = window.setTimeout(() => {
      void typeOutMessage(welcomeMessage);
    }, 260);

    return () => window.clearTimeout(timer);
  }, [isOpen, isLoading, isTyping, messages.length]);

  useEffect(() => {
    const isMobileViewport = typeof window !== 'undefined' && window.innerWidth <= 767;
    if (!(isOpen || isClosing) || !isMobileViewport) {
      return undefined;
    }

    const lenis = getLenisInstance();
    if (lenis) {
      lenis.stop();
    }

    const preventScroll = (event: Event) => {
      const target = event.target as HTMLElement | null;
      if (target && target.closest('[data-chat-scroll], [data-chat-panel]')) {
        return;
      }
      event.preventDefault();
    };

    const preventKeyboardScroll = (event: KeyboardEvent) => {
      if (['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', 'Space'].includes(event.key)) {
        event.preventDefault();
      }
    };

    window.addEventListener('wheel', preventScroll, { passive: false });
    window.addEventListener('touchmove', preventScroll, { passive: false });
    window.addEventListener('keydown', preventKeyboardScroll);

    return () => {
      if (lenis) {
        lenis.start();
      }
      window.removeEventListener('wheel', preventScroll);
      window.removeEventListener('touchmove', preventScroll);
      window.removeEventListener('keydown', preventKeyboardScroll);
    };
  }, [isOpen, isClosing]);

  useEffect(() => {
    const isMobileViewport = typeof window !== 'undefined' && window.innerWidth <= 767;
    const shouldLockBackground = (isOpen || isClosing) && isMobileViewport;

    if (!shouldLockBackground) return undefined;

    const preventScroll = (event: Event) => {
      const target = event.target as HTMLElement | null;
      if (target && target.closest('[data-chat-scroll], [data-chat-panel]')) {
        return;
      }
      event.preventDefault();
    };

    const preventKeyboardScroll = (event: KeyboardEvent) => {
      if (['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', 'Space'].includes(event.key)) {
        event.preventDefault();
      }
    };

    window.addEventListener('wheel', preventScroll, { passive: false });
    window.addEventListener('touchmove', preventScroll, { passive: false });
    window.addEventListener('keydown', preventKeyboardScroll);

    return () => {
      window.removeEventListener('wheel', preventScroll);
      window.removeEventListener('touchmove', preventScroll);
      window.removeEventListener('keydown', preventKeyboardScroll);
    };
  }, [isOpen, isChatHovering, isClosing]);

  function typeOutMessage(fullText: string): Promise<void> {
    return new Promise<void>((resolve) => {
      const messageId = `${Date.now()}-${Math.floor(Math.random() * 1000)}`;
      const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      // Faster typing for a snappier open experience
      const totalChars = fullText.length;
      const targetDuration = Math.min(5000, Math.max(800, totalChars * 22));
      const stepInterval = 24;
      const totalSteps = Math.max(1, Math.floor(targetDuration / stepInterval));
      const charsPerStep = Math.max(1, Math.ceil(totalChars / totalSteps));

      let currentIndex = 0;

      // Add empty bot message bubble
      setMessages((current) => [
        ...current,
        { id: messageId, sender: 'bot', text: '', time },
      ]);

      if (typingIntervalRef.current) {
        clearInterval(typingIntervalRef.current);
      }

      typingIntervalRef.current = setInterval(() => {
        currentIndex = Math.min(totalChars, currentIndex + charsPerStep);
        const currentSlice = fullText.slice(0, currentIndex);

        setMessages((current) =>
          current.map((msg) => (msg.id === messageId ? { ...msg, text: currentSlice } : msg))
        );

        if (currentIndex >= totalChars) {
          if (typingIntervalRef.current) {
            clearInterval(typingIntervalRef.current);
            typingIntervalRef.current = null;
          }
          resolve();
        }
      }, stepInterval);
    });
  }

  async function sendMessage(textToSend: string): Promise<void> {
    const text = textToSend.trim();
    if (!text || isLoading || isTyping || text.length > MAX_MESSAGE_LENGTH) return;

    const userMessage = createMessage('user', text);
    const conversation = [...messages, userMessage];
    setMessages(conversation);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history: conversation.slice(-13, -1).map(({ sender, text: messageText }) => ({
            role: sender === 'bot' ? 'assistant' : 'user',
            text: messageText,
          })),
        }),
      });
      const data = (await response.json()) as ChatResponse;
      if (!response.ok || !data.reply) throw new Error(data.error ?? 'Unable to send message.');

      setIsLoading(false);
      setIsTyping(true);
      // Post-process to remove em dashes and replace with proper punctuation
      const cleanedReply = (data.reply as string).replace(/—/g, ', ').replace(/–/g, '-');
      await typeOutMessage(cleanedReply);
    } catch (requestError) {
      console.error('Chat request failed', requestError);
      setMessages((current) => [...current, createMessage('bot', 'I am unavailable right now. Please try again shortly.', true)]);
    } finally {
      setIsLoading(false);
      setIsTyping(false);
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    void sendMessage(input);
  }

  function clearChat(): void {
    if (typingIntervalRef.current) {
      clearInterval(typingIntervalRef.current);
      typingIntervalRef.current = null;
    }
    setIsTyping(false);
    setIsLoading(false);
    setMessages([]);
    if (typeof window !== 'undefined') {
      window.sessionStorage.removeItem(CHAT_SESSION_KEY);
    }
    setInput('');
    // Regenerate random prompts
    const shuffled = [...allQuickPrompts].sort(() => 0.5 - Math.random());
    setQuickPrompts(shuffled.slice(0, 4));
  }

  function closeChat(): void {
    if (isClosing) return;
    setIsClosing(true);
    window.setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
    }, 260);
  }

  if (!isMounted) return null;

  const shouldRenderPanel = isOpen || isClosing;

  return ReactDOM.createPortal(
    <>
      <style>{`
        @keyframes chat-in {
          0% {
            opacity: 0;
            transform: translateY(26px) scale(0.9);
          }
          60% {
            opacity: 1;
            transform: translateY(-4px) scale(1.01);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes chat-out {
          0% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
          100% {
            opacity: 0;
            transform: translateY(20px) scale(0.96);
          }
        }
      `}</style>
      <div
        className={`fixed bottom-6 right-6 z-[999999] flex flex-col items-end${className ? ` ${className}` : ''}`}
        data-lenis-prevent
        style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 999999, pointerEvents: 'auto', width: 'max-content', maxWidth: 'calc(100vw - 32px)', boxSizing: 'border-box' }}
      >
      {shouldRenderPanel && (
        <section
          className="mb-4 flex flex-col overflow-hidden rounded-[24px] border border-gray-800 bg-[#000000] text-white shadow-[0_25px_50px_-12px_rgba(0,0,0,0.6)]"
          aria-label="Chat with Jason's assistant"
          data-chat-panel
          onMouseEnter={() => setIsChatHovering(true)}
          onMouseLeave={() => setIsChatHovering(false)}
          style={{
            position: 'static',
            width: 'min(360px, calc(100vw - 32px))',
            height: 'min(620px, calc(100dvh - 32px))',
            maxWidth: 'calc(100vw - 32px)',
            maxHeight: 'calc(100dvh - 32px)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            boxSizing: 'border-box',
            opacity: 1,
            transform: 'translateY(0) scale(1)',
            transformOrigin: 'bottom right',
            willChange: 'transform, opacity',
            animation: isClosing ? 'chat-out 0.3s cubic-bezier(0.2, 0, 0.2, 1) both' : 'chat-in 0.45s cubic-bezier(0.22, 1, 0.36, 1) both',
          }}
        >
          <header className="relative z-10 flex min-w-0 shrink-0 items-center gap-3 overflow-hidden border-b border-gray-800 bg-black" style={{ position: 'relative', zIndex: 10, backgroundColor: '#000000', overflow: 'hidden', flexShrink: 0, padding: '12px 16px', boxSizing: 'border-box' }}>
            <div className="relative grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-black">
              <Bot size={17} className="text-white" />
              <span className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full border-2 border-white bg-gray-500" />
            </div>
            <div className="min-w-0 flex-1 overflow-hidden">
              <h2 className="flex items-center gap-1.5 text-base font-semibold tracking-tight text-white">
                Jason's AI Assistant
                <Sparkles size={13} className="shrink-0 text-white" />
              </h2>
              <p className="mt-0.5 flex items-center gap-1.5 text-xs text-gray-500"><span className="h-1.5 w-1.5 rounded-full bg-gray-500" />Online - replies in seconds</p>
            </div>
            <div className="flex shrink-0 items-center gap-1">
              <button
                className="rounded-xl p-2 text-gray-400 transition-colors hover:bg-gray-800 hover:text-white"
                type="button"
                onClick={clearChat}
                aria-label="Clear chat history"
                title="Clear chat history"
              >
                <RefreshCw size={16} />
              </button>
              <button
                className="rounded-xl p-2 text-gray-400 transition-colors hover:bg-gray-800 hover:text-white"
                type="button"
                onClick={closeChat}
                aria-label="Close chat"
              >
                <X size={18} />
              </button>
            </div>
          </header>

          {/* Messages */}
          <div className="min-h-0 flex-1 space-y-3 overflow-y-auto bg-gray-950" data-chat-scroll aria-live="polite" style={{ minHeight: 0, flex: '1 1 auto', overflowY: 'auto', overflowX: 'hidden', boxSizing: 'border-box', padding: '16px 16px 20px', scrollbarWidth: 'auto', msOverflowStyle: 'auto' }}>
            {messages.map((message) => {
              const isAssistant = message.sender === 'bot';
              return (
                <div className={`flex w-full min-w-0 items-start gap-3 ${isAssistant ? '' : 'justify-end'}`} key={message.id} style={{ width: '100%', minWidth: 0, gap: 12 }}>
                  {isAssistant && (
                    <div className="grid h-6 w-6 shrink-0 place-items-center rounded-lg bg-white text-black">
                      <Bot size={13} />
                    </div>
                  )}
                      <div className={`flex min-w-0 flex-col ${isAssistant ? 'items-start' : 'items-end'}`} style={{ minWidth: 0, maxWidth: isAssistant ? 'calc(100% - 0px)' : '80%' }}>
                        <div className={`inline-block w-fit min-w-[48px] max-w-full break-words text-[13px] leading-relaxed ${message.isError ? 'my-1 rounded-xl border border-gray-700 bg-gray-900 text-xs text-gray-300' : isAssistant ? 'rounded-2xl rounded-tl-sm border border-gray-800 bg-gray-900 text-gray-100' : 'rounded-2xl rounded-tr-sm bg-white text-black shadow-sm'}`} style={{ display: 'inline-block', width: 'fit-content', minWidth: 48, maxWidth: '100%', overflowWrap: 'anywhere', whiteSpace: 'pre-wrap', boxSizing: 'border-box', padding: message.isError ? 12 : '10px 14px' }}>
                          {isAssistant ? (
                            <ReactMarkdown
                              components={{
                                strong: ({ children }) => <strong className="font-bold">{children}</strong>,
                                em: ({ children }) => <em className="italic">{children}</em>,
                                p: ({ children }) => <p className="mb-1 last:mb-0">{children}</p>,
                                a: ({ href, children }) => <a href={href} className="text-cyan-400 hover:text-cyan-300 underline" target="_blank" rel="noopener noreferrer">{children}</a>,
                              }}
                            >
                              {message.text}
                            </ReactMarkdown>
                          ) : (
                            message.text
                          )}
                    </div>
                        <span className="text-[10px] text-gray-500" style={{ padding: '4px 4px 0' }}>{message.time}</span>
                  </div>
                </div>
              );
            })}

            {isLoading && (
              <div className="flex items-start gap-2">
                <div className="grid h-6 w-6 shrink-0 place-items-center rounded-lg bg-white text-black">
                  <Bot size={13} />
                </div>
                <div className="flex items-center gap-1.5 rounded-2xl rounded-tl-sm border border-gray-800 bg-gray-900 px-3.5 py-2.5">
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-500 [animation-delay:0ms]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-500 [animation-delay:150ms]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-500 [animation-delay:300ms]" />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Footer */}
          <footer className="shrink-0 border-t border-gray-800 bg-black" style={{ flexShrink: 0, boxSizing: 'border-box', overflow: 'hidden', padding: '12px 16px', width: '100%' }}>
            {messages.length === 1 && !isLoading && !isTyping && (
              <div className="grid grid-cols-2 gap-2 border-b border-gray-800 bg-black" style={{ padding: '4px 0 10px', maxWidth: '100%', overflow: 'hidden' }}>
                {quickPrompts.map((prompt, index) => (
                  <button
                    type="button"
                    key={prompt}
                    onClick={() => void sendMessage(prompt)}
                    disabled={isLoading || isTyping}
                    className="rounded-lg border border-gray-700 bg-gray-900 text-left text-gray-200 transition-colors hover:border-white hover:text-white disabled:pointer-events-none disabled:opacity-40 animate-fade-in"
                    style={{
                      padding: '8px 10px',
                      fontSize: 11,
                      lineHeight: 1.25,
                      whiteSpace: 'normal',
                      overflowWrap: 'anywhere',
                      boxSizing: 'border-box',
                      animation: `fadeInUp 0.3s ease-out ${index * 0.1}s both`
                    }}
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            )}
            <div style={{ paddingTop: 16, width: '100%', boxSizing: 'border-box' }}>
              <form
                className="flex items-center gap-2 rounded-2xl border border-gray-700 bg-gray-900 transition-colors focus-within:border-white focus-within:ring-2 focus-within:ring-gray-700"
                onSubmit={handleSubmit}
                style={{ padding: '6px 6px 6px 12px', gap: 8 }}
              >
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  placeholder="Message Jason's AI assistant..."
                  maxLength={MAX_MESSAGE_LENGTH}
                  aria-label="Message"
                  className="min-w-0 flex-1 bg-transparent px-2 text-sm text-white outline-none placeholder:text-gray-500"
                  style={{ minWidth: 0, flex: '1 1 auto', paddingLeft: 8, paddingRight: 8 }}
                />
                <button
                  type="submit"
                  aria-label="Send message"
                  disabled={!input.trim() || isLoading || isTyping}
                  className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-white text-black transition-all hover:bg-gray-300 active:scale-95 disabled:pointer-events-none disabled:opacity-30"
                >
                  <Send size={15} />
                </button>
              </form>
            </div>
            <p
              className="px-4 text-center text-[11px] leading-relaxed text-gray-500"
              style={{ marginTop: 6, paddingBottom: 1, paddingTop: 0 }}
            >
              Conversations are not saved after the session.
            </p>
          </footer>
        </section>
      )}

      {!isOpen && !isClosing && (
        <button
          className="group relative grid h-14 w-14 place-items-center rounded-full border border-white/20 bg-black/30 text-white shadow-[0_18px_35px_-12px_rgba(0,0,0,0.55)] backdrop-blur-md transition-transform duration-300 hover:scale-105 active:scale-95"
          type="button"
          onClick={() => {
            setIsClosing(false);
            setIsOpen(true);
          }}
          aria-label="Open chat assistant"
        >
          <span className="absolute inset-0 rounded-full bg-white/10 opacity-0 blur-md transition-opacity group-hover:opacity-100" />
          <MessageSquare className="relative" size={22} />
        </button>
      )}
      </div>
    </>,
    document.body,
  );
}