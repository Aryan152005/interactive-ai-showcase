
import { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

export const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([]);
  const [input, setInput] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { text: input, isUser: true };
    setMessages([...messages, userMessage]);
    setInput('');

    // Add bot response (this should be replaced with actual API call)
    const botMessage = { text: "I'm a demo chatbot. For now, I just echo what you say!", isUser: false };
    setTimeout(() => {
      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <div className="glass w-80 h-96 rounded-2xl flex flex-col animate-fade-up">
          <div className="p-4 border-b border-white/20 flex justify-between items-center">
            <h3 className="font-semibold">AI Assistant</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-white/10 rounded-lg transition-colors"
            >
              <X size={20} />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`${
                  message.isUser ? 'ml-auto bg-primary' : 'mr-auto bg-gray-600'
                } max-w-[80%] rounded-lg p-3 text-white`}
              >
                {message.text}
              </div>
            ))}
          </div>
          
          <form onSubmit={handleSubmit} className="p-4 border-t border-white/20">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800"
            />
          </form>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="w-12 h-12 bg-primary rounded-full flex items-center justify-center hover:bg-primary-hover transition-colors shadow-lg"
        >
          <MessageCircle className="text-white" size={24} />
        </button>
      )}
    </div>
  );
};
