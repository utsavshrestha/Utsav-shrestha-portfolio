import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  Moon, 
  Sun, 
  Download, 
  Layout, 
  Briefcase, 
  Code2, 
  Terminal, 
  Code, 
  Mail, 
  Lock,
  FileText
} from 'lucide-react';
import { BlogPost } from '../data/content';

type Action = {
  id: string;
  title: string;
  icon: React.ReactNode;
  section: string;
  onSelect: () => void;
};

interface CommandPaletteProps {
  isDarkMode: boolean;
  setIsDarkMode: (val: boolean) => void;
  setActiveTab: (tab: any) => void;
  setSelectedPost: (post: BlogPost | null) => void;
  blogs: BlogPost[];
}

export function CommandPalette({ 
  isDarkMode, 
  setIsDarkMode, 
  setActiveTab, 
  setSelectedPost,
  blogs 
}: CommandPaletteProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setActiveIndex(0);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const actions: Action[] = [
    { id: 'nav-home', title: 'Go to Home', icon: <Layout size={18} />, section: 'Navigation', onSelect: () => { setActiveTab('home'); setSelectedPost(null); } },
    { id: 'nav-exp', title: 'Go to Experience', icon: <Briefcase size={18} />, section: 'Navigation', onSelect: () => { setActiveTab('experience'); setSelectedPost(null); } },
    { id: 'nav-proj', title: 'Go to Projects', icon: <Code2 size={18} />, section: 'Navigation', onSelect: () => { setActiveTab('projects'); setSelectedPost(null); } },
    { id: 'nav-skills', title: 'Go to Skills', icon: <Terminal size={18} />, section: 'Navigation', onSelect: () => { setActiveTab('skills'); setSelectedPost(null); } },
    { id: 'nav-blog', title: 'Go to Blog', icon: <FileText size={18} />, section: 'Navigation', onSelect: () => { setActiveTab('blog'); setSelectedPost(null); } },
    { id: 'nav-life', title: 'Go to Life & Hobbies', icon: <Code size={18} />, section: 'Navigation', onSelect: () => { setActiveTab('life'); setSelectedPost(null); } },
    { id: 'nav-contact', title: 'Go to Contact', icon: <Mail size={18} />, section: 'Navigation', onSelect: () => { setActiveTab('contact'); setSelectedPost(null); } },
    
    { id: 'action-theme', title: `Toggle ${isDarkMode ? 'Light' : 'Dark'} Mode`, icon: isDarkMode ? <Sun size={18} /> : <Moon size={18} />, section: 'Actions', onSelect: () => setIsDarkMode(!isDarkMode) },
    { id: 'action-resume', title: 'Download Resume', icon: <Download size={18} />, section: 'Actions', onSelect: () => {
      // Find the hidden or visible download link and click it
      const link = document.getElementById('resume-download-link');
      if (link) link.click();
      else alert('Resume download is available on the Home page.');
    }},
  ];

  blogs.forEach(blog => {
    actions.push({
      id: `blog-${blog.id}`,
      title: `Read: ${blog.title}`,
      icon: <FileText size={18} />,
      section: 'Blog Posts',
      onSelect: () => {
        setActiveTab('blog');
        setSelectedPost(blog);
      }
    });
  });

  const filteredActions = actions.filter(action => 
    action.title.toLowerCase().includes(query.toLowerCase()) || 
    action.section.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((prev) => (prev + 1) % filteredActions.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((prev) => (prev - 1 + filteredActions.length) % filteredActions.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredActions[activeIndex]) {
        filteredActions[activeIndex].onSelect();
        setIsOpen(false);
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      setIsOpen(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh]">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-zinc-900/40 dark:bg-black/60 backdrop-blur-sm"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.15 }}
            className="relative w-full max-w-xl bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden flex flex-col max-h-[60vh] mx-4"
          >
            <div className="flex items-center px-4 py-4 border-b border-zinc-100 dark:border-zinc-800">
              <Search size={20} className="text-zinc-400 mr-3" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type a command or search..."
                className="flex-1 bg-transparent border-none outline-none text-zinc-900 dark:text-white placeholder-zinc-400 text-lg"
              />
              <div className="text-xs font-mono text-zinc-400 px-2 py-1 bg-zinc-100 dark:bg-zinc-800 rounded">ESC</div>
            </div>
            
            <div className="overflow-y-auto p-2">
              {filteredActions.length === 0 ? (
                <div className="p-8 text-center text-zinc-500 dark:text-zinc-400">
                  No results found for "{query}"
                </div>
              ) : (
                <div className="space-y-1">
                  {filteredActions.map((action, index) => {
                    const isSelected = index === activeIndex;
                    return (
                      <button
                        key={action.id}
                        onClick={() => {
                          action.onSelect();
                          setIsOpen(false);
                        }}
                        onMouseEnter={() => setActiveIndex(index)}
                        className={`w-full flex items-center px-4 py-3 rounded-xl transition-colors text-left ${
                          isSelected 
                            ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white' 
                            : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800/50'
                        }`}
                      >
                        <div className={`mr-3 ${isSelected ? 'text-zinc-900 dark:text-white' : 'text-zinc-400'}`}>
                          {action.icon}
                        </div>
                        <div className="flex-1 font-medium">
                          {action.title}
                        </div>
                        <div className="text-xs font-mono text-zinc-400">
                          {action.section}
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
