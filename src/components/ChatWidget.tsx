import { useEffect, useRef, useState } from 'react';
import type { FormEvent } from 'react';
import * as ReactDOM from 'react-dom';
import { Bot, MessageSquare, RefreshCw, Send, Sparkles, X } from 'lucide-react';

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
const quickPrompts = [
  "What are Jason's top skills?",
  'Show me recent projects',
  'How can I contact Jason?',
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

export function ChatWidget({ className }: CopilotChatProps = {}) {
  const [isMounted, setIsMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    createMessage('bot', "Hi, I'm Jason's assistant. Ask me about his experience, skills, education, projects, or contact details."),
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const frameId = window.requestAnimationFrame(() => setIsMounted(true));
    return () => window.cancelAnimationFrame(frameId);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  async function sendMessage(textToSend: string): Promise<void> {
    const text = textToSend.trim();
    if (!text || isLoading || text.length > MAX_MESSAGE_LENGTH) return;

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
            role: sender === 'bot' ? 'model' : sender,
            text: messageText,
          })),
        }),
      });
      const data = (await response.json()) as ChatResponse;
      if (!response.ok || !data.reply) throw new Error(data.error ?? 'Unable to send message.');
      setMessages((current) => [...current, createMessage('bot', data.reply as string)]);
    } catch (requestError) {
      console.error('Chat request failed', requestError);
      setMessages((current) => [...current, createMessage('bot', 'I am unavailable right now. Please try again shortly.', true)]);
    } finally {
      setIsLoading(false);
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    void sendMessage(input);
  }

  function clearChat(): void {
    setMessages([createMessage('bot', "Let's start fresh. Ask me about Jason's experience, skills, or projects.")]);
    setInput('');
  }

  if (!isMounted) return null;

  return ReactDOM.createPortal(
    <div
      className={`fixed bottom-6 right-6 z-[999999] flex flex-col items-end${className ? ` ${className}` : ''}`}
      data-lenis-prevent
      style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 999999, pointerEvents: 'auto', width: 'max-content', maxWidth: 'calc(100vw - 32px)', boxSizing: 'border-box' }}
    >
      {isOpen && (
        <section
          className="mb-4 flex flex-col overflow-hidden rounded-[24px] border border-gray-800 bg-black text-white shadow-[0_25px_50px_-12px_rgba(0,0,0,0.6)]"
          aria-label="Chat with Jason's assistant"
          style={{
            position: 'static',
            width: 'min(360px, calc(100vw - 32px))',
            height: 'min(520px, calc(100dvh - 48px))',
            maxWidth: 'calc(100vw - 32px)',
            maxHeight: 'calc(100dvh - 48px)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            boxSizing: 'border-box',
          }}
        >
          <header className="relative z-10 flex min-w-0 shrink-0 items-center gap-3 overflow-hidden border-b border-gray-800 bg-black" style={{ position: 'relative', zIndex: 10, backgroundColor: '#000000', overflow: 'hidden', flexShrink: 0, padding: '12px 16px', boxSizing: 'border-box' }}>
            <div className="relative grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-black">
              <Bot size={17} className="text-white" />
              <span className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full border-2 border-white bg-gray-500" />
            </div>
            <div className="min-w-0 flex-1 overflow-hidden">
              <h2 className="flex items-center gap-1.5 text-base font-semibold tracking-tight text-white">
                Jason's Assistant
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
                onClick={() => setIsOpen(false)}
                aria-label="Close chat"
              >
                <X size={18} />
              </button>
            </div>
          </header>

          {/* Messages */}
          <div className="min-h-0 flex-1 space-y-3 overflow-y-auto bg-gray-950" aria-live="polite" style={{ minHeight: 0, flex: '1 1 auto', overflowY: 'auto', overflowX: 'hidden', boxSizing: 'border-box', padding: '16px 16px 20px' }}>
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
                        <div className={`inline-block w-fit min-w-[48px] max-w-full break-words text-[13px] leading-relaxed ${message.isError ? 'my-1 rounded-xl border border-gray-700 bg-gray-900 text-xs text-gray-300' : isAssistant ? 'rounded-2xl rounded-tl-sm border border-gray-800 bg-gray-900 text-gray-100' : 'rounded-2xl rounded-tr-sm bg-white text-black shadow-sm'}`} style={{ display: 'inline-block', width: 'fit-content', minWidth: 48, maxWidth: '100%', overflowWrap: 'anywhere', whiteSpace: 'normal', boxSizing: 'border-box', padding: message.isError ? 12 : '10px 14px' }}>
                          {message.text}
                    </div>
                        <span className="text-[10px] text-gray-500" style={{ padding: '0 4px' }}>{message.time}</span>
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
            {messages.length === 1 && !isLoading && (
              <div className="flex max-w-full flex-wrap gap-2 border-b border-gray-800 bg-black" style={{ padding: '4px 0 10px', gap: 8, maxWidth: '100%', overflow: 'hidden' }}>
                {quickPrompts.map((prompt) => (
                  <button
                    type="button"
                    key={prompt}
                    onClick={() => void sendMessage(prompt)}
                    className="max-w-full rounded-full border border-gray-700 bg-gray-900 text-left text-gray-200 transition-colors hover:border-white hover:text-white"
                    style={{ maxWidth: '100%', padding: '6px 10px', fontSize: 11, lineHeight: 1.25, whiteSpace: 'normal', overflowWrap: 'anywhere', boxSizing: 'border-box' }}
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            )}
            <div style={{ paddingTop: 12, width: '100%', boxSizing: 'border-box' }}>
              <form
                className="flex items-center gap-2 rounded-2xl border border-gray-700 bg-gray-900 transition-colors focus-within:border-white focus-within:ring-2 focus-within:ring-gray-700"
                onSubmit={handleSubmit}
                style={{ padding: '6px 6px 6px 12px', gap: 8 }}
              >
                <input
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  placeholder="Message Jason's assistant..."
                  maxLength={MAX_MESSAGE_LENGTH}
                  disabled={isLoading}
                  aria-label="Message"
                  className="min-w-0 flex-1 bg-transparent px-2 text-sm text-white outline-none placeholder:text-gray-500"
                  style={{ minWidth: 0, flex: '1 1 auto', paddingLeft: 8, paddingRight: 8 }}
                />
                <button
                  type="submit"
                  aria-label="Send message"
                  disabled={!input.trim() || isLoading}
                  className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-white text-black transition-all hover:bg-gray-300 active:scale-95 disabled:pointer-events-none disabled:opacity-30"
                >
                  <Send size={15} />
                </button>
              </form>
              <p className="mt-2 text-center text-[10px] text-gray-500">Conversations are not saved after the session.</p>
            </div>
          </footer>
        </section>
      )}

      {!isOpen && (
        <button
          className="group relative grid h-14 w-14 place-items-center rounded-full bg-black text-white shadow-[0_18px_35px_-12px_rgba(0,0,0,0.55)] transition-transform duration-300 hover:scale-105 active:scale-95"
          type="button"
          onClick={() => setIsOpen(true)}
          aria-label="Open chat assistant"
        >
          <span className="absolute inset-0 rounded-full bg-gray-500/30 opacity-0 blur-md transition-opacity group-hover:opacity-100" />
          <MessageSquare className="relative" size={22} />
        </button>
      )}
    </div>,
    document.body,
  );
}