import React, { useState, useEffect, useRef } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { motion, AnimatePresence, useScroll, useSpring, useTransform } from 'motion/react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  Phone, 
  MapPin, 
  ExternalLink, 
  ChevronRight, 
  Database, 
  Code, 
  Cpu, 
  Layout, 
  Terminal, 
  Menu, 
  X,
  ArrowRight,
  Calendar,
  Clock,
  Tag,
  Zap,
  Users,
  Briefcase,
  Plus,
  Trash2,
  Save,
  Lock,
  Cloud,
  Award,
  Palette,
  BarChart3,
  Moon,
  Sun,
  Download,
  Layers,
  Activity,
  ArrowDown,
  Search,
  Send,
  Code2,
  Monitor,
  FileText,
  CheckCircle2,
  Eye,
  Pencil,
  ImagePlus,
  ChevronLeft,
  ChevronUp,
  ChevronDown,
  ArrowUpRight,
  Copy,
  Check,
  Share2,
  BookOpen,
  Sparkles,
  SlidersHorizontal,
  GitBranch
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import ReactMarkdown from 'react-markdown';
import MDEditor from '@uiw/react-md-editor';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { LazyPDFDownload } from './components/LazyPDFDownload';
import { CommandPalette } from './components/CommandPalette';
import { 
  PERSONAL_INFO, 
  EXPERIENCES, 
  EDUCATION, 
  EXPERTISE, 
  RESEARCH_INTERESTS, 
  BLOG_POSTS as INITIAL_BLOG_POSTS,
  IMPACT_METRICS,
  PROJECTS,
  VISUAL_PORTFOLIO,
  CERTIFICATIONS,
  CURRENTLY_LEARNING,
  PHOTOGRAPHY,
  BOOKS as INITIAL_BOOKS,
  GAMES as INITIAL_GAMES,
  USES,
  type BlogPost,
  type Book,
  type Game
} from './data/content';

// Initialize Mermaid
// Mermaid initialization is handled dynamically in the component

const Mermaid = ({ chart }: { chart: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = useState<string>('');

  useEffect(() => {
    const renderChart = async () => {
      if (ref.current && chart) {
        try {
          const mermaid = (await import('mermaid')).default;
          mermaid.initialize({
            startOnLoad: true,
            theme: 'neutral',
            look: 'handDrawn',
            securityLevel: 'loose',
            fontFamily: 'Inter'
          });
          const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;
          const { svg } = await mermaid.render(id, chart);
          setSvg(svg);
        } catch (error) {
          console.error('Mermaid rendering failed', error);
        }
      }
    };
    renderChart();
  }, [chart]);

  return (
    <div 
      className="my-8 flex justify-center bg-white dark:bg-zinc-900 p-6 rounded-xl border border-zinc-100 dark:border-zinc-800 overflow-x-auto" 
      ref={ref}
      dangerouslySetInnerHTML={{ __html: svg || chart }}
    />
  );
};

/**
 * Utility for tailwind class merging
 */
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Components ---

const SectionHeader = ({ title, subtitle }: { title: string; subtitle?: string }) => (
  <div className="mb-12">
    <h2 className="text-4xl font-light tracking-tight text-zinc-900 mb-2 font-serif italic">
      {title}
    </h2>
    {subtitle && <p className="text-zinc-500 font-mono text-sm uppercase tracking-widest">{subtitle}</p>}
    <div className="h-px bg-zinc-200 mt-4 w-24" />
  </div>
);

const Card = ({ children, className, onClick }: { children: React.ReactNode; className?: string; onClick?: () => void }) => (
  <div 
    onClick={onClick}
    className={cn("bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm hover:shadow-md transition-all", className)}
  >
    {children}
  </div>
);

const Badge = ({ children, variant = "default", className }: { children: React.ReactNode; variant?: "default" | "outline"; className?: string }) => (
  <span className={cn(
    "px-3 py-1 rounded-full text-xs font-medium",
    variant === "default" ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200" : "border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400",
    className
  )}>
    {children}
  </span>
);

const DataStackVisualizer = () => {
  const steps = [
    { name: 'Sources', tools: ['Databases', 'APIs', 'File Formats'], icon: Database },
    { name: 'Ingestion', tools: ['Airbyte', 'Airflow', 'Kafka'], icon: Activity },
    { name: 'Storage', tools: ['S3', 'Snowflake', 'PostgreSQL'], icon: Layers },
    { name: 'Processing', tools: ['PySpark', 'Databricks', 'dbt'], icon: Cpu },
    { name: 'Visualization', tools: ['Tableau', 'PowerBI', 'Looker'], icon: BarChart3 },
  ];

  return (
    <div className="py-12 px-6 bg-zinc-50 dark:bg-zinc-950 rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden relative">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 relative z-10">
        {steps.map((step, idx) => (
          <React.Fragment key={idx}>
            <div className="flex flex-col items-center text-center z-20 w-full md:w-auto">
              <div className="w-16 h-16 bg-white dark:bg-zinc-900 rounded-2xl shadow-lg border border-zinc-100 dark:border-zinc-800 flex items-center justify-center mb-4 text-zinc-900 dark:text-white cursor-pointer hover:scale-110 hover:rotate-3 transition-transform duration-300">
                <step.icon size={28} />
              </div>
              <h4 className="font-medium text-sm mb-2 dark:text-white">{step.name}</h4>
              <div className="flex flex-wrap justify-center gap-1">
                {step.tools.map(tool => (
                  <span key={tool} className="text-[10px] px-1.5 py-0.5 bg-zinc-200 dark:bg-zinc-800 rounded text-zinc-600 dark:text-zinc-400">{tool}</span>
                ))}
              </div>
            </div>
            
            {idx < steps.length - 1 && (
              <div className="hidden md:flex flex-grow relative items-center justify-center min-w-[40px]">
                <div className="absolute left-0 right-0 h-px bg-zinc-300 dark:bg-zinc-700" />
                <div className="bg-zinc-50 dark:bg-zinc-950 px-2 relative z-10">
                  <ArrowRight size={14} className="text-zinc-400" />
                </div>
              </div>
            )}
            
            {idx < steps.length - 1 && (
              <div className="md:hidden py-4 relative flex justify-center w-full">
                <div className="absolute top-0 bottom-0 w-px bg-zinc-300 dark:bg-zinc-700" />
                <div className="bg-zinc-50 dark:bg-zinc-950 py-2 relative z-10">
                  <ArrowDown size={20} className="text-zinc-300 dark:text-zinc-700" />
                </div>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

const DataInsightsWidget = () => {
  return (
    <div className="space-y-4">
      <Card className="p-6 bg-gradient-to-br from-zinc-50 to-white dark:from-zinc-900/50 dark:to-zinc-900 border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Github size={18} className="text-zinc-900 dark:text-white" />
            <h3 className="text-sm font-medium dark:text-white">GitHub Activity</h3>
          </div>
          <Badge variant="outline" className="text-[10px]">Coming Soon</Badge>
        </div>

        <div className="grid grid-cols-2 gap-4 opacity-50 grayscale">
          <div className="space-y-1">
            <p className="text-xs text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Commits (YTD)</p>
            <p className="text-2xl font-mono text-zinc-900 dark:text-white">1,243</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Repositories</p>
            <p className="text-2xl font-mono text-zinc-900 dark:text-white">42</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Stars Earned</p>
            <p className="text-2xl font-mono text-zinc-900 dark:text-white">128</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Followers</p>
            <p className="text-2xl font-mono text-zinc-900 dark:text-white">56</p>
          </div>
        </div>
      </Card>

      <Card className="p-6 bg-gradient-to-br from-zinc-50 to-white dark:from-zinc-900/50 dark:to-zinc-900 border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Code2 size={18} className="text-zinc-900 dark:text-white" />
            <h3 className="text-sm font-medium dark:text-white">LeetCode Stats</h3>
          </div>
          <Badge variant="outline" className="text-[10px]">Coming Soon</Badge>
        </div>
        
        <div className="space-y-4 opacity-50 grayscale">
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-zinc-500 dark:text-zinc-400">Easy</span>
              <span className="font-mono text-zinc-900 dark:text-white">142 / 780</span>
            </div>
            <div className="w-full bg-zinc-200 dark:bg-zinc-800 rounded-full h-1.5">
              <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: '18%' }}></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-zinc-500 dark:text-zinc-400">Medium</span>
              <span className="font-mono text-zinc-900 dark:text-white">284 / 1540</span>
            </div>
            <div className="w-full bg-zinc-200 dark:bg-zinc-800 rounded-full h-1.5">
              <div className="bg-yellow-500 h-1.5 rounded-full" style={{ width: '18%' }}></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-zinc-500 dark:text-zinc-400">Hard</span>
              <span className="font-mono text-zinc-900 dark:text-white">45 / 650</span>
            </div>
            <div className="w-full bg-zinc-200 dark:bg-zinc-800 rounded-full h-1.5">
              <div className="bg-red-500 h-1.5 rounded-full" style={{ width: '7%' }}></div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

// --- Main App ---

const getReadingTime = (text: string) => {
  if (!text) return 0;
  const wordsPerMinute = 200;
  const words = text.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
};

const BLOG_STARTER_TEMPLATE = [
  '## The idea in one line',
  '',
  'Write the clearest version of the idea here. Give the reader a reason to keep going.',
  '',
  '## Why this matters',
  '',
  'Explain the context in two or three short paragraphs. Keep each paragraph focused on one thought.',
  '',
  '> Add one memorable observation, rule, or quote here.',
  '',
  '## What I learned',
  '',
  '- First useful lesson',
  '- Second useful lesson',
  '- A practical next step',
  '',
  '## A practical takeaway',
  '',
  'Close with the action you want the reader to remember or try.'
].join('\n');

const BlogMarkdown = ({ content, className }: { content: string; className?: string }) => (
  <div className={cn('blog-prose', className)}>
    <ReactMarkdown
      components={{
        h1: ({ children, ...props }: any) => <h1 {...props}>{children}</h1>,
        h2: ({ children, ...props }: any) => <h2 {...props}>{children}</h2>,
        h3: ({ children, ...props }: any) => <h3 {...props}>{children}</h3>,
        a: ({ children, href, ...props }: any) => (
          <a href={href} {...props} target={href?.startsWith('/') ? undefined : '_blank'} rel={href?.startsWith('/') ? undefined : 'noreferrer'}>{children}</a>
        ),
        img: ({ alt, ...props }: any) => <img {...props} alt={alt || ''} loading="lazy" />,
        code({ inline, className: codeClassName, children, ...props }: any) {
          const match = /language-(\w+)/.exec(codeClassName || '');
          return !inline && match && match[1] === 'mermaid' ? (
            <Mermaid chart={String(children).replace(/\n$/, '')} />
          ) : !inline && match ? (
            <div className="blog-code-block">
              <div className="blog-code-label"><span>{match[1]}</span><span>Copy into your notes</span></div>
              <pre><code className={codeClassName} {...props}>{children}</code></pre>
            </div>
          ) : (
            <code className={codeClassName} {...props}>{children}</code>
          );
        }
      }}
    >
      {content}
    </ReactMarkdown>
  </div>
);

const HorizontalScroll = ({ children }: { children: React.ReactNode }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(true);

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeft(scrollLeft > 0);
      setShowRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    handleScroll();
    window.addEventListener('resize', handleScroll);
    return () => window.removeEventListener('resize', handleScroll);
  }, [children]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;
      const scrollAmount = direction === 'left' ? -clientWidth / 2 : clientWidth / 2;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative group/carousel">
      {showLeft && (
        <button 
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 z-10 p-2 bg-white/90 dark:bg-zinc-900/90 shadow-lg rounded-full text-zinc-900 dark:text-white opacity-0 group-hover/carousel:opacity-100 transition-opacity hover:scale-110"
        >
          <ChevronLeft size={24} />
        </button>
      )}
      
      <div 
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex overflow-x-auto overflow-y-hidden gap-6 pb-8 hide-scrollbar snap-x scroll-smooth"
      >
        {children}
      </div>

      {showRight && (
        <button 
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 z-10 p-2 bg-white/90 dark:bg-zinc-900/90 shadow-lg rounded-full text-zinc-900 dark:text-white opacity-0 group-hover/carousel:opacity-100 transition-opacity hover:scale-110"
        >
          <ChevronRight size={24} />
        </button>
      )}
    </div>
  );
};

const Typewriter = ({ text, delay = 0 }: { text: string, delay?: number }) => {
  const [displayedText, setDisplayedText] = useState('');
  
  useEffect(() => {
    let i = 0;
    let interval: NodeJS.Timeout;
    const timer = setTimeout(() => {
      interval = setInterval(() => {
        setDisplayedText(text.substring(0, i + 1));
        i++;
        if (i >= text.length) clearInterval(interval);
      }, 50);
    }, delay);
    return () => {
      clearTimeout(timer);
      if (interval) clearInterval(interval);
    };
  }, [text, delay]);

  return <span>{displayedText}<span className="animate-pulse">_</span></span>;
};

const Magnetic = ({ children }: { children: React.ReactElement }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  const { x, y } = position;
  return (
    <motion.div
      style={{ position: "relative" }}
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x, y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
    >
      {children}
    </motion.div>
  );
};

const TiltCard = ({ children, className, onClick }: { children: React.ReactNode, className?: string, onClick?: () => void }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    setRotateX(yPct * -15);
    setRotateY(xPct * 15);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      animate={{ rotateX, rotateY }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      style={{ perspective: 1000, transformStyle: "preserve-3d" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

import { forwardRef } from 'react';

const PageTransition = forwardRef<HTMLDivElement, { children: React.ReactNode, className?: string, id: string }>(
  ({ children, className, id }, ref) => (
    <motion.div
      ref={ref}
      key={id}
      initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      exit={{ opacity: 0, y: -20, filter: 'blur(8px)' }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
);
PageTransition.displayName = 'PageTransition';

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  const heroImageScale = useTransform(scrollYProgress, [0, 0.32], [1, 1.22]);
  const heroImageY = useTransform(scrollYProgress, [0, 0.32], [0, -20]);

  const [activeTab, setActiveTab] = useState<'home' | 'experience' | 'projects' | 'skills' | 'blog' | 'life' | 'contact' | 'admin'>('home');
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [selectedProject, setSelectedProject] = useState<any | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [blogs, setBlogs] = useState<BlogPost[]>(INITIAL_BLOG_POSTS);
  const [adminPassword, setAdminPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [projects, setProjects] = useState<any[]>(PROJECTS);
  const [books, setBooks] = useState<Book[]>(INITIAL_BOOKS);
  const [games, setGames] = useState<Game[]>(INITIAL_GAMES);
  const [blogSearch, setBlogSearch] = useState('');
  const [blogCategory, setBlogCategory] = useState('All');
  const [blogSort, setBlogSort] = useState<'newest' | 'oldest' | 'shortest'>('newest');
  const [blogPage, setBlogPage] = useState(1);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [syncStatus, setSyncStatus] = useState<'idle' | 'syncing' | 'synced' | 'error'>('idle');
  const [projectCategory, setProjectCategory] = useState('All');
  const [adminSection, setAdminSection] = useState<'blogs' | 'books' | 'games' | 'projects' | 'resume'>('blogs');
  const [blogEditorMode, setBlogEditorMode] = useState<'write' | 'preview'>('write');
  const [blogSaveState, setBlogSaveState] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');

  const formatBlogDate = (dateStr: string) => {
    if (!dateStr) return '';
    const parsed = new Date(`${dateStr}T00:00:00`);
    if (Number.isNaN(parsed.getTime())) return dateStr;
    return parsed.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  const extractHeadings = (markdown: string) => {
    if (!markdown) return [];
    return markdown
      .split('\n')
      .filter(line => /^##\s+/.test(line.trim()))
      .map(line => line.trim().replace(/^##\s+/, '').trim());
  };

  const blogCategories = ['All', ...Array.from(new Set(blogs.flatMap(p => p.tags)))];
  const filteredBlogs = blogs
    .filter(post => {
      const q = blogSearch.toLowerCase();
      const matchesSearch =
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        post.tags.some(t => t.toLowerCase().includes(q));
      const matchesCategory = blogCategory === 'All' || post.tags.includes(blogCategory);
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (blogSort === 'oldest') return a.date.localeCompare(b.date);
      if (blogSort === 'shortest') return getReadingTime(a.content) - getReadingTime(b.content);
      return b.date.localeCompare(a.date);
    });

  const BLOGS_PER_PAGE = 6;
  const featuredBlogPost = filteredBlogs[0] || null;
  const gridSourceBlogs =
    !blogSearch && blogCategory === 'All' && blogSort === 'newest' && filteredBlogs.length > 1
      ? filteredBlogs.slice(1)
      : filteredBlogs;
  const totalBlogPages = Math.max(1, Math.ceil(gridSourceBlogs.length / BLOGS_PER_PAGE));
  const currentBlogPage = Math.min(blogPage, totalBlogPages);
  const paginatedGridBlogs = gridSourceBlogs.slice(
    (currentBlogPage - 1) * BLOGS_PER_PAGE,
    currentBlogPage * BLOGS_PER_PAGE
  );

  const projectCategories = ['All', ...Array.from(new Set(projects.flatMap(p => p.tags)))];
  const filteredProjects = projects.filter(project => {
    return projectCategory === 'All' || project.tags.includes(projectCategory);
  });
  
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+. or Cmd+. to open admin panel
      if ((e.ctrlKey || e.metaKey) && e.key === '.') {
        e.preventDefault();
        setActiveTab('admin');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleLogin = async () => {
    try {
      const res = await fetch('/api/verify-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: adminPassword })
      });
      if (res.ok) {
        setIsLoggedIn(true);
      } else {
        const errorData = await res.json().catch(() => ({}));
        alert(errorData.error || 'Server error. Check Vercel logs.');
      }
    } catch (err) {
      alert('Network error verifying password');
    }
  };

  // Dark Mode Effect
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);
  
  // Admin Form State
  const [editingProject, setEditingProject] = useState<any>({
    title: '', category: '', description: '', tags: [], link: '', githubUrl: '', liveUrl: '',
    deepDive: { problem: '', solution: '', outcome: '', architecture: '' }
  });
  const [editingPost, setEditingPost] = useState<Partial<BlogPost>>({
    title: '',
    excerpt: '',
    content: '',
    tags: [],
    imageUrl: ''
  });

  const editingPostContent = editingPost.content || '';
  const rawEditingPostTags = editingPost.tags as unknown;
  const editingPostTags = Array.isArray(rawEditingPostTags)
    ? rawEditingPostTags as string[]
    : typeof rawEditingPostTags === 'string'
      ? rawEditingPostTags.split(',').map(tag => tag.trim()).filter(Boolean)
      : [];
  const editingPostWordCount = editingPostContent.trim() ? editingPostContent.trim().split(/\s+/).length : 0;

  const [editingBook, setEditingBook] = useState<Partial<Book>>({
    title: '',
    author: '',
    category: '',
    cover: '',
    isReading: false
  });

  const [editingGame, setEditingGame] = useState<Partial<Game>>({
    title: '',
    platform: '',
    status: '',
    imageUrl: '',
    icon: 'Award'
  });

  // Fetch blogs (merges live DB blogs with static INITIAL_BLOG_POSTS fallback)
  const fetchBlogs = async () => {
    try {
      const res = await fetch('/api/blogs');
      if (!res.ok) return;
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        const dbIds = new Set(data.map((b: BlogPost) => b.id));
        const merged = [
          ...data,
          ...INITIAL_BLOG_POSTS.filter(b => !dbIds.has(b.id))
        ].sort((a, b) => b.date.localeCompare(a.date));
        setBlogs(merged);
      }
    } catch (err) {
      console.error("Failed to fetch blogs, using static bundle", err);
    }
  };

  const fetchProjects = async () => {
    try {
      const res = await fetch('/api/projects');
      const data = await res.json();
      setProjects(data);
    } catch (err) {
      console.error("Failed to fetch projects", err);
    }
  };

  // Fetch books
  const fetchBooks = async () => {
    try {
      const res = await fetch('/api/books');
      if (res.ok) {
        const data = await res.json();
        setBooks(data.map((b: any) => ({ ...b, isReading: !!b.isReading })));
      }
    } catch (err) {
      console.error("Error fetching books:", err);
    }
  };

  // Fetch games
  const fetchGames = async () => {
    try {
      const res = await fetch('/api/games');
      if (res.ok) {
        const data = await res.json();
        setGames(data);
      }
    } catch (err) {
      console.error("Error fetching games:", err);
    }
  };

  useEffect(() => {
    fetchBlogs();
    fetchBooks();
    fetchGames();
    fetchProjects();
  }, []);

  const handleSaveProject = async () => {
    const projectToSave = {
      ...editingProject,
      id: editingProject.id || editingProject.title.toLowerCase().replace(/\s+/g, '-'),
      tags: typeof editingProject.tags === 'string' ? (editingProject.tags as string).split(',').map(t => t.trim()) : editingProject.tags,
    };
    try {
      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: adminPassword, project: projectToSave })
      });
      if (res.ok) {
        setEditingProject({
          title: '', category: '', description: '', tags: [], link: '', githubUrl: '', liveUrl: '',
          deepDive: { problem: '', solution: '', outcome: '', architecture: '' }
        });
        fetchProjects();
      } else {
        alert('Failed to save project');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    try {
      const res = await fetch(`/api/projects/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: adminPassword })
      });
      if (res.ok) fetchProjects();
      else alert('Failed to delete project');
    } catch (err) {
      console.error(err);
    }
  };

  const slugifyTitle = (title: string) =>
    title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '') || Date.now().toString();

  const handleSaveBlog = async () => {
    if (!editingPost.title?.trim() || !editingPost.content?.trim()) {
      setBlogSaveState('error');
      return;
    }

    setBlogSaveState('saving');
    const postToSave: BlogPost = {
      id: editingPost.id?.trim() || slugifyTitle(editingPost.title),
      title: editingPost.title.trim(),
      date: editingPost.date || new Date().toISOString().split('T')[0],
      excerpt: editingPost.excerpt?.trim() || editingPost.content.trim().slice(0, 180) + '...',
      content: editingPost.content,
      tags: typeof editingPost.tags === 'string'
        ? (editingPost.tags as string).split(',').map(t => t.trim()).filter(Boolean)
        : (editingPost.tags || ['Data Engineering']),
      imageUrl: editingPost.imageUrl || ''
    };

    try {
      const res = await fetch('/api/blogs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: adminPassword, blog: postToSave })
      });
      if (res.ok) {
        const data = await res.json().catch(() => ({}));
        if (data.syncedToCode) setSyncStatus('synced');
        await fetchBlogs();
        setEditingPost({ title: '', excerpt: '', content: '', tags: [], imageUrl: '', date: '' });
        setBlogEditorMode('write');
        setBlogSaveState('saved');
      } else {
        setBlogSaveState('error');
      }
    } catch (err) {
      setBlogSaveState('error');
    }
  };

  const handleSyncBlogsToCode = async () => {
    setSyncStatus('syncing');
    try {
      const res = await fetch('/api/blogs/sync-to-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: adminPassword })
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.success) {
        setSyncStatus('synced');
      } else {
        setSyncStatus('error');
      }
    } catch {
      setSyncStatus('error');
    }
  };

  const handleCopyBlogsCode = () => {
    const exportString = `export const BLOG_POSTS: BlogPost[] = ${JSON.stringify(blogs, null, 2)};`;
    navigator.clipboard.writeText(exportString);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  const handleDeleteBlog = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    try {
      const res = await fetch(`/api/blogs/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: adminPassword })
      });
      if (res.ok) {
        fetchBlogs();
      }
    } catch (err) {
      alert("Error deleting blog");
    }
  };

  const handleResetBlogs = async () => {
    if (!confirm("This will reset all blogs to default. Continue?")) return;
    try {
      // Delete all existing blogs first
      for (const blog of blogs) {
        await fetch(`/api/blogs/${blog.id}`, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ password: adminPassword })
        });
      }
      // Save initial blogs
      for (const blog of INITIAL_BLOG_POSTS) {
        await fetch('/api/blogs', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ password: adminPassword, blog })
        });
      }
      fetchBlogs();
      alert("Blogs reset to defaults!");
    } catch (err) {
      alert("Error resetting blogs");
    }
  };

  const handleSaveBook = async () => {
    if (!editingBook.title || !editingBook.author) return;
    
    const bookToSave = {
      ...editingBook,
      id: editingBook.id || Date.now().toString()
    };

    try {
      const res = await fetch('/api/books', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: adminPassword, book: bookToSave })
      });
      if (res.ok) {
        alert("Book saved successfully!");
        fetchBooks();
        setEditingBook({ title: '', author: '', category: '', cover: '', isReading: false, rating: undefined });
      } else {
        alert("Failed to save book. Check password.");
      }
    } catch (err) {
      alert("Error saving book");
    }
  };

  const handleDeleteBook = async (id: string) => {
    try {
      const res = await fetch(`/api/books/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: adminPassword })
      });
      if (res.ok) {
        fetchBooks();
      }
    } catch (err) {
      alert("Error deleting book");
    }
  };

  const compressImageToDataUrl = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const maxWidth = 1280;
          const scale = img.width > maxWidth ? maxWidth / img.width : 1;
          canvas.width = Math.round(img.width * scale);
          canvas.height = Math.round(img.height * scale);
          const ctx = canvas.getContext('2d');
          if (!ctx) {
            resolve(String(e.target?.result || ''));
            return;
          }
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          resolve(canvas.toDataURL('image/webp', 0.82));
        };
        img.onerror = reject;
        img.src = String(e.target?.result || '');
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  const handleFileUpload = async (file: File): Promise<string | null> => {
    const formData = new FormData();
    formData.append('image', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      if (res.ok) {
        const data = await res.json();
        if (data.url && !data.localInline) {
          return data.url;
        }
      }
      // Automatic client-side compressed image fallback if Cloudinary env vars are not set
      return await compressImageToDataUrl(file);
    } catch (err) {
      console.warn('Falling back to client-side image compression:', err);
      try {
        return await compressImageToDataUrl(file);
      } catch {
        alert('Error processing image.');
        return null;
      }
    }
  };

  const handleSaveGame = async () => {
    if (!editingGame.title || !editingGame.platform) return;
    
    const gameToSave = {
      ...editingGame,
      id: editingGame.id || Date.now().toString()
    };

    try {
      const res = await fetch('/api/games', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: adminPassword, game: gameToSave })
      });
      if (res.ok) {
        alert("Game saved successfully!");
        fetchGames();
        setEditingGame({ title: '', platform: '', status: '', imageUrl: '', icon: 'Award' });
      } else {
        alert("Failed to save game. Check password.");
      }
    } catch (err) {
      alert("Error saving game");
    }
  };

  const handleDeleteGame = async (id: string) => {
    try {
      const res = await fetch(`/api/games/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: adminPassword })
      });
      if (res.ok) {
        fetchGames();
      }
    } catch (err) {
      alert("Error deleting game");
    }
  };

  const handleResetBooks = async () => {
    if (!confirm("This will reset all books to default. Continue?")) return;
    try {
      // Delete all existing books first
      for (const book of books) {
        await fetch(`/api/books/${book.id}`, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ password: adminPassword })
        });
      }
      // Save initial books
      for (const book of INITIAL_BOOKS) {
        await fetch('/api/books', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ password: adminPassword, book })
        });
      }
      fetchBooks();
      alert("Books reset to defaults!");
    } catch (err) {
      alert("Error resetting books");
    }
  };

  const handleResetGames = async () => {
    if (!confirm("This will reset all games to default. Continue?")) return;
    try {
      // Delete all existing games first
      for (const game of games) {
        await fetch(`/api/games/${game.id}`, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ password: adminPassword })
        });
      }
      // Save initial games
      for (const game of INITIAL_GAMES) {
        await fetch('/api/games', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ password: adminPassword, game })
        });
      }
      fetchGames();
      alert("Games reset to defaults!");
    } catch (err) {
      alert("Error resetting games");
    }
  };

  const handleResetProjects = async () => {
    if (!confirm("This will reset all projects to default. Continue?")) return;
    try {
      // Delete all existing projects first
      for (const project of projects) {
        await fetch(`/api/projects/${project.id}`, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ password: adminPassword })
        });
      }
      // Save initial projects
      for (const project of PROJECTS) {
        await fetch('/api/projects', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ password: adminPassword, project: {
            ...project,
            id: project.title.toLowerCase().replace(/\s+/g, '-')
          }})
        });
      }
      fetchProjects();
      alert("Projects reset to defaults!");
    } catch (err) {
      alert("Error resetting projects");
    }
  };

  // Scroll to top when tab changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeTab, selectedPost]);

  const NavItem = ({ id, label }: { id: typeof activeTab; label: string }) => (
    <button
      onClick={() => {
        setActiveTab(id);
        setSelectedPost(null);
        setIsMenuOpen(false);
      }}
      className={cn(
        "px-4 py-2 text-sm font-medium transition-all relative",
        activeTab === id ? "text-zinc-900 dark:text-white" : "text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
      )}
    >
      {label}
      {activeTab === id && (
        <motion.div
          layoutId="nav-underline"
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-zinc-900 dark:bg-white mx-4"
        />
      )}
    </button>
  );

  const IconMap: Record<string, any> = {
    Clock, Zap, Users, Database, Cloud, Award, Terminal, Cpu, Layers, Activity, Code
  };

  return (
    <HelmetProvider>
      <div className="min-h-screen bg-[#F9F9F8] dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans selection:bg-zinc-900 dark:selection:bg-zinc-100 selection:text-white dark:selection:text-zinc-900 transition-colors duration-300">
        <motion.div 
          className="fixed top-0 left-0 right-0 h-1 bg-zinc-900 dark:bg-zinc-100 origin-left z-[100]" 
          style={{ scaleX }} 
        />
        <CommandPalette 
          isDarkMode={isDarkMode} 
          setIsDarkMode={setIsDarkMode} 
          setActiveTab={setActiveTab} 
          setSelectedPost={setSelectedPost} 
          blogs={blogs} 
        />
        <Helmet>
          <title>Utsav Shrestha | Data Engineer</title>
          <meta name="description" content="Portfolio of Utsav Shrestha, a Data Engineer specializing in Big Data, Spark, and Data Architecture." />
          <meta property="og:title" content="Utsav Shrestha | Data Engineer" />
          <meta property="og:description" content="Portfolio of Utsav Shrestha, a Data Engineer specializing in Big Data, Spark, and Data Architecture." />
          <meta property="og:type" content="website" />
        </Helmet>
        {/* Navigation */}
        <nav className="sticky top-0 z-50 bg-[#F9F9F8]/80 dark:bg-zinc-950/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-sm">
              <img 
                src={PERSONAL_INFO.image} 
                alt="Utsav Shrestha" 
                className="w-full h-full object-cover grayscale"
                referrerPolicy="no-referrer"
              />
            </div>
            <span className="font-serif italic text-xl tracking-tight hidden sm:block dark:text-white">Utsav Shrestha</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-2">
            <NavItem id="home" label="About" />
            <NavItem id="experience" label="Experience" />
            <NavItem id="projects" label="Projects" />
            <NavItem id="skills" label="Expertise" />
            <NavItem id="blog" label="Blog" />
            <NavItem id="life" label="Life" />
            <NavItem id="contact" label="Contact" />
            
            <div className="h-4 w-px bg-zinc-200 dark:bg-zinc-800 mx-2" />
            
            <button 
              onClick={() => {
                const event = new KeyboardEvent('keydown', { key: 'k', metaKey: true });
                window.dispatchEvent(event);
              }}
              className="hidden md:flex items-center gap-2 px-3 py-1.5 text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-white bg-zinc-100 dark:bg-zinc-800/50 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-lg transition-colors"
            >
              <Search size={14} />
              <span className="font-mono text-xs">⌘K</span>
            </button>
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors"
            >
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-16 left-0 right-0 bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 p-6 flex flex-col gap-4 md:hidden shadow-xl"
            >
              <button onClick={() => { setActiveTab('home'); setIsMenuOpen(false); }} className="text-left py-2 font-medium dark:text-white">About</button>
              <button onClick={() => { setActiveTab('experience'); setIsMenuOpen(false); }} className="text-left py-2 font-medium dark:text-white">Experience</button>
              <button onClick={() => { setActiveTab('projects'); setIsMenuOpen(false); }} className="text-left py-2 font-medium dark:text-white">Projects</button>
              <button onClick={() => { setActiveTab('skills'); setIsMenuOpen(false); }} className="text-left py-2 font-medium dark:text-white">Expertise</button>
              <button onClick={() => { setActiveTab('blog'); setIsMenuOpen(false); }} className="text-left py-2 font-medium dark:text-white">Blog</button>
              <button onClick={() => { setActiveTab('life'); setIsMenuOpen(false); }} className="text-left py-2 font-medium dark:text-white">Life</button>
              <button onClick={() => { setActiveTab('contact'); setIsMenuOpen(false); }} className="text-left py-2 font-medium dark:text-white">Contact</button>
              <div className="h-px bg-zinc-100 dark:bg-zinc-800 my-2" />
              <button 
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="flex items-center gap-3 py-2 font-medium dark:text-white"
              >
                {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
                <span>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main className="max-w-6xl mx-auto px-6 py-12 md:py-20">
        <AnimatePresence mode="wait">
          {/* HOME / ABOUT */}
          {activeTab === 'home' && !selectedPost && (
            <PageTransition
              key="home"
              id="home"
              className="grid grid-cols-1 lg:grid-cols-12 gap-12"
            >
              <div className="lg:col-span-7">
                <h1 className="text-6xl md:text-8xl font-serif italic tracking-tighter mb-6 leading-tight dark:text-white">
                  Data <br />
                  <span className="text-zinc-400 dark:text-zinc-500">
                    <Typewriter text="Engineer" delay={300} />
                  </span>
                </h1>
                <p className="text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed mb-8 max-w-xl">
                  {PERSONAL_INFO.summary}
                </p>
                
                <div className="flex flex-wrap gap-4 mb-12">
                  <button onClick={() => setActiveTab('contact')} className="flex items-center gap-2 px-6 py-3 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-full hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors">
                    <Mail size={18} />
                    <span>Get in Touch</span>
                  </button>
                  <div className="flex items-center gap-4 px-4">
                    <Magnetic>
                      <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noopener noreferrer" title="LinkedIn" className="p-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors block">
                        <Linkedin size={24} />
                      </a>
                    </Magnetic>
                    <Magnetic>
                      <a href={PERSONAL_INFO.github} target="_blank" rel="noopener noreferrer" title="Github" className="p-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors block">
                        <Github size={24} />
                      </a>
                    </Magnetic>
                    <Magnetic>
                      <a href={PERSONAL_INFO.behance} target="_blank" rel="noopener noreferrer" title="Behance" className="p-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors block">
                        <ExternalLink size={24} />
                      </a>
                    </Magnetic>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 border-t border-zinc-200 dark:border-zinc-800 pt-12">
                  <div>
                    <h3 className="font-mono text-xs uppercase tracking-widest text-zinc-400 mb-4">Contact</h3>
                    <ul className="space-y-3 text-sm">
                      <li className="flex items-center gap-3 text-zinc-600 dark:text-zinc-400">
                        <MapPin size={16} className="text-zinc-400" />
                        {PERSONAL_INFO.location}
                      </li>
                      <li className="flex items-center gap-3 text-zinc-600 dark:text-zinc-400">
                        <Phone size={16} className="text-zinc-400" />
                        {PERSONAL_INFO.phone}
                      </li>
                      <li className="flex items-center gap-3 text-zinc-600 dark:text-zinc-400">
                        <ExternalLink size={16} className="text-zinc-400" />
                        <span className="underline underline-offset-4 cursor-pointer">Tableau Portfolio</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-mono text-xs uppercase tracking-widest text-zinc-400 mb-4">Research Interests</h3>
                    <div className="flex flex-wrap gap-2">
                      {RESEARCH_INTERESTS.map(interest => (
                        <Badge key={interest} variant="outline">{interest}</Badge>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Impact Metrics */}
                <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
                  {IMPACT_METRICS.map((metric, idx) => {
                    const Icon = IconMap[metric.icon];
                    return (
                      <div key={idx} className="p-4 border border-zinc-100 dark:border-zinc-800 rounded-xl bg-white/50 dark:bg-zinc-900/50">
                        <div className="text-zinc-400 mb-2">
                          {Icon && <Icon size={18} />}
                        </div>
                        <div className="text-2xl font-bold text-zinc-900 dark:text-white">{metric.value}</div>
                        <div className="text-[10px] uppercase tracking-wider text-zinc-500 font-mono">{metric.label}</div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="flex justify-center mb-10">
                  <div className="zoom-photo-card group">
                    <div className="zoom-photo-frame">
                      <motion.img
                        src={PERSONAL_INFO.aboutImage} 
                        alt="Utsav Shrestha" 
                        style={{ scale: heroImageScale, y: heroImageY }}
                        className="zoom-photo-image grayscale group-hover:grayscale-0 transition-all duration-700"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="zoom-photo-caption">
                      <span>Art & Engineering</span>
                      <span className="zoom-photo-caption__hint"><ArrowDown size={12} /> Scroll through the frame</span>
                    </div>
                  </div>
                </div>
                
                {/* Live Integrations Placeholders */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Card className="p-4 flex flex-col justify-between h-40 relative overflow-hidden group">
                    <div className="z-10 relative">
                      <div className="flex items-center gap-2 mb-2">
                        <Github size={18} className="text-zinc-900 dark:text-white" />
                        <h3 className="font-medium text-sm dark:text-white">GitHub</h3>
                      </div>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-3">Live commit history coming soon.</p>
                      <Badge variant="outline" className="bg-zinc-100 dark:bg-zinc-800 text-[10px]">Setup Pending</Badge>
                    </div>
                    <div className="absolute -bottom-4 -right-4 text-zinc-100 dark:text-zinc-800/50 group-hover:scale-110 transition-transform duration-500">
                      <Github size={80} />
                    </div>
                  </Card>
                  <Card className="p-4 flex flex-col justify-between h-40 relative overflow-hidden group">
                    <div className="z-10 relative">
                      <div className="flex items-center gap-2 mb-2">
                        <Code2 size={18} className="text-zinc-900 dark:text-white" />
                        <h3 className="font-medium text-sm dark:text-white">LeetCode</h3>
                      </div>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-3">Live problem stats coming soon.</p>
                      <Badge variant="outline" className="bg-zinc-100 dark:bg-zinc-800 text-[10px]">Setup Pending</Badge>
                    </div>
                    <div className="absolute -bottom-4 -right-4 text-zinc-100 dark:text-zinc-800/50 group-hover:scale-110 transition-transform duration-500">
                      <Code2 size={80} />
                    </div>
                  </Card>
                </div>
              </div>

              {/* Tech Stack Marquee */}
              <div className="lg:col-span-12 mt-12 pt-12 border-t border-zinc-200 dark:border-zinc-800 overflow-hidden relative">
                <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#F9F9F8] dark:from-zinc-950 to-transparent z-10"></div>
                <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#F9F9F8] dark:from-zinc-950 to-transparent z-10"></div>
                
                <div className="flex w-max animate-marquee">
                  {[...Array(2)].map((_, i) => (
                    <div key={i} className="flex items-center gap-12 px-6">
                      {["Python", "SQL", "Snowflake", "dbt", "AWS", "Airflow", "Tableau", "React", "TypeScript", "Node.js", "Docker", "Figma", "Adobe CC"].map((tool, idx) => (
                        <div key={`${i}-${idx}`} className="flex items-center gap-3 text-zinc-400 dark:text-zinc-500 grayscale hover:grayscale-0 hover:text-zinc-900 dark:hover:text-white transition-all duration-300 cursor-default">
                          <span className="font-mono text-sm uppercase tracking-widest">{tool}</span>
                          <span className="w-1.5 h-1.5 rounded-full bg-zinc-300 dark:bg-zinc-700"></span>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </PageTransition>
          )}

          {/* PROJECTS */}
          {activeTab === 'projects' && (
            <PageTransition key="projects" id="projects">
              <SectionHeader title="Featured Projects" subtitle="Impact & Solutions" />
              
              <div className="flex flex-wrap gap-2 mb-8">
                {projectCategories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setProjectCategory(cat)}
                    className={clsx(
                      "px-4 py-2 rounded-full text-sm font-medium transition-colors",
                      projectCategory === cat 
                        ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900" 
                        : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700"
                    )}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {filteredProjects.map((project, idx) => (
                  <TiltCard key={idx} className="h-full" onClick={() => setSelectedProject(project)}>
                    <Card className="flex flex-col h-full group cursor-pointer">
                      <div className="flex justify-between items-start mb-4">
                        <div className="p-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg">
                          <Briefcase size={20} className="text-zinc-900 dark:text-zinc-100" />
                        </div>
                        <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400">{project.category}</span>
                      </div>
                      <h3 className="text-xl font-medium mb-3 group-hover:text-zinc-600 dark:group-hover:text-zinc-400 transition-colors">{project.title}</h3>
                      <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed mb-6 flex-grow">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.tags.map(tag => <Badge key={tag} variant="outline">{tag}</Badge>)}
                      </div>
                      <button className="flex items-center gap-2 text-zinc-900 dark:text-zinc-100 font-medium text-sm border-t border-zinc-100 dark:border-zinc-800 pt-4 w-full">
                        View Deep-Dive <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                      </button>
                    </Card>
                  </TiltCard>
                ))}
              </div>

              {/* Project Deep-Dive Modal */}
              <AnimatePresence>
                {selectedProject && (
                  <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onClick={() => setSelectedProject(null)}
                      className="absolute inset-0 bg-zinc-900/60 backdrop-blur-sm"
                    />
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: 20 }}
                      className="bg-white dark:bg-zinc-900 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl z-10 relative p-8 md:p-12"
                    >
                      <button 
                        onClick={() => setSelectedProject(null)}
                        className="absolute top-6 right-6 p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors"
                      >
                        <X size={24} />
                      </button>
                      
                      <div className="mb-8">
                        <Badge className="mb-4">{selectedProject.category}</Badge>
                        <h2 className="text-4xl font-serif italic mb-4">{selectedProject.title}</h2>
                        <div className="flex flex-wrap gap-4 mb-4">
                          {selectedProject.githubUrl && (
                            <a href={selectedProject.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors">
                              <Github size={16} /> View Source
                            </a>
                          )}
                          {selectedProject.liveUrl && (
                            <a href={selectedProject.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors">
                              <ExternalLink size={16} /> Live Demo
                            </a>
                          )}
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {selectedProject.tags.map((tag: string) => <Badge key={tag} variant="outline">{tag}</Badge>)}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        <div className="md:col-span-2 space-y-8">
                          <section>
                            <h4 className="text-xs font-mono uppercase tracking-widest text-zinc-400 mb-4">The Challenge</h4>
                            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">{selectedProject.deepDive.problem}</p>
                          </section>
                          <section>
                            <h4 className="text-xs font-mono uppercase tracking-widest text-zinc-400 mb-4">The Solution</h4>
                            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">{selectedProject.deepDive.solution}</p>
                          </section>
                          <section>
                            <h4 className="text-xs font-mono uppercase tracking-widest text-zinc-400 mb-4">The Outcome</h4>
                            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">{selectedProject.deepDive.outcome}</p>
                          </section>
                        </div>
                        <div>
                          <h4 className="text-xs font-mono uppercase tracking-widest text-zinc-400 mb-4">Architecture</h4>
                          <div className="bg-zinc-50 dark:bg-zinc-950 p-4 rounded-xl border border-zinc-100 dark:border-zinc-800">
                            <Mermaid chart={selectedProject.deepDive.architecture} />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                )}
              </AnimatePresence>

              <div className="mt-20">
                <SectionHeader title="Visual Portfolio" subtitle="Tableau & Behance" />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {VISUAL_PORTFOLIO.map((item, idx) => (
                    <div key={idx} className="group cursor-pointer" onClick={() => window.open(item.link, '_blank')}>
                      <div className="aspect-video bg-zinc-200 rounded-xl mb-4 overflow-hidden relative">
                        <img 
                          src={item.thumbnail} 
                          alt={item.title} 
                          className="object-cover w-full h-full grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute top-3 left-3">
                          <Badge variant="default" className="bg-white/90 backdrop-blur-sm dark:bg-zinc-800/90">
                            {item.platform === 'Tableau' ? <BarChart3 size={12} className="inline mr-1" /> : <Palette size={12} className="inline mr-1" />}
                            {item.platform}
                          </Badge>
                        </div>
                      </div>
                      <h3 className="text-lg font-medium mb-2 group-hover:text-zinc-600 dark:group-hover:text-zinc-400 transition-colors">{item.title}</h3>
                      <p className="text-zinc-500 dark:text-zinc-400 text-xs leading-relaxed line-clamp-2">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {CERTIFICATIONS.length > 0 && (
                <div className="mt-20">
                  <SectionHeader title="Certifications" subtitle="Credentials" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {CERTIFICATIONS.map((cert, idx) => {
                      const Icon = IconMap[cert.icon];
                      return (
                        <div key={idx} className="flex items-center gap-6 p-6 bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-xl shadow-sm">
                          <div className="p-4 bg-zinc-50 dark:bg-zinc-800 rounded-lg text-zinc-900 dark:text-zinc-100">
                            {Icon && <Icon size={24} />}
                          </div>
                          <div>
                            <h3 className="text-lg font-medium mb-1 dark:text-white">{cert.name}</h3>
                            <p className="text-zinc-500 dark:text-zinc-400 text-sm">{cert.issuer} • {cert.date}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </PageTransition>
          )}
          {activeTab === 'experience' && (
            <PageTransition key="experience" id="experience">
              <SectionHeader title="Professional Journey" subtitle="Work Experience" />
              <div className="relative max-w-4xl mx-auto py-8">
                {/* Left-aligned Timeline Line */}
                <div className="absolute left-6 top-0 bottom-0 w-px bg-zinc-200 dark:bg-zinc-800" />
                
                <div className="space-y-12">
                  {EXPERIENCES.map((exp, idx) => {
                    return (
                      <motion.div 
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: idx * 0.1 }}
                        className="relative flex items-start group"
                      >
                        {/* Timeline Dot */}
                        <div className="absolute left-6 w-4 h-4 rounded-full bg-white dark:bg-zinc-950 border-2 border-zinc-300 dark:border-zinc-700 transform -translate-x-1/2 mt-8 group-hover:border-zinc-900 dark:group-hover:border-zinc-100 group-hover:bg-zinc-900 dark:group-hover:bg-zinc-100 transition-all duration-300 z-10 shadow-[0_0_0_4px_rgba(255,255,255,1)] dark:shadow-[0_0_0_4px_rgba(9,9,11,1)]" />
                        
                        {/* Content Container */}
                        <div className="w-full pl-16">
                          <div className="p-8 bg-white dark:bg-zinc-900/50 rounded-2xl border border-zinc-100 dark:border-zinc-800/50 shadow-sm hover:shadow-md transition-all duration-300 group-hover:-translate-y-1 relative overflow-hidden text-left">
                            {/* Subtle background gradient on hover */}
                            <div className="absolute inset-0 bg-gradient-to-br from-zinc-50 to-transparent dark:from-zinc-800/20 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            
                            <div className="relative z-10">
                              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
                                <div>
                                  <h3 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-1">{exp.role}</h3>
                                  <p className="text-zinc-500 dark:text-zinc-400 font-serif italic text-lg">{exp.company}</p>
                                </div>
                                <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400 font-mono text-sm bg-zinc-100 dark:bg-zinc-800/50 px-3 py-1.5 rounded-full w-fit">
                                  <Calendar size={14} />
                                  <span>{exp.period}</span>
                                </div>
                              </div>
                              
                              <ul className="space-y-3 text-base text-zinc-600 dark:text-zinc-400 text-left mt-6">
                                {exp.description.map((item, i) => (
                                  <li key={i} className="flex gap-3 leading-relaxed flex-row">
                                    <ChevronRight size={16} className="mt-1 flex-shrink-0 text-zinc-400" />
                                    <span>{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              <div className="mt-20">
                <SectionHeader title="Academic Background" subtitle="Education" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {EDUCATION.map((edu, idx) => (
                    <Card key={idx}>
                      <p className="font-mono text-xs text-zinc-400 mb-2">{edu.period}</p>
                      <h3 className="text-xl font-medium mb-1">{edu.degree}</h3>
                      <p className="text-zinc-500 text-sm mb-4">{edu.institution}</p>
                      {edu.details && <p className="text-zinc-600 text-sm font-medium">{edu.details}</p>}
                    </Card>
                  ))}
                </div>
              </div>
            </PageTransition>
          )}          {/* SKILLS / EXPERTISE */}
          {activeTab === 'skills' && (
            <PageTransition
              key="skills"
              id="skills"
              className="space-y-20"
            >
              <div>
                <SectionHeader title="The Data Stack" subtitle="Architecture & Flow" />
                <DataStackVisualizer />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                <div className="md:col-span-2">
                  <SectionHeader title="Core Expertise" subtitle="Technical Skills" />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Card className="p-6 bg-gradient-to-br from-zinc-50 to-white dark:from-zinc-900/50 dark:to-zinc-900 border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all group">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="text-zinc-500 dark:text-zinc-400 group-hover:scale-110 transition-transform">
                          <Database size={20} />
                        </div>
                        <h4 className="font-medium dark:text-white">Databases & Storage</h4>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {EXPERTISE.databases.map(db => <Badge key={db} variant="outline" className="bg-white dark:bg-zinc-950">{db}</Badge>)}
                      </div>
                    </Card>

                    <Card className="p-6 bg-gradient-to-br from-zinc-50 to-white dark:from-zinc-900/50 dark:to-zinc-900 border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all group">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="text-zinc-500 dark:text-zinc-400 group-hover:scale-110 transition-transform">
                          <Code size={20} />
                        </div>
                        <h4 className="font-medium dark:text-white">Programming</h4>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {EXPERTISE.programming.map(lang => <Badge key={lang} variant="outline" className="bg-white dark:bg-zinc-950">{lang}</Badge>)}
                      </div>
                    </Card>

                    <Card className="p-6 sm:col-span-2 bg-gradient-to-br from-zinc-50 to-white dark:from-zinc-900/50 dark:to-zinc-900 border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all group overflow-hidden relative">
                      <div className="flex items-center gap-3 mb-6 relative z-20">
                        <div className="text-zinc-500 dark:text-zinc-400 group-hover:scale-110 transition-transform">
                          <Layers size={20} />
                        </div>
                        <h4 className="font-medium dark:text-white">Tools & Frameworks</h4>
                      </div>
                      
                      <div className="relative -mx-6">
                        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-zinc-50 dark:from-zinc-900/50 to-transparent z-10"></div>
                        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white dark:from-zinc-900 to-transparent z-10"></div>
                        
                        <div className="flex w-max animate-marquee">
                          {[...Array(2)].map((_, i) => (
                            <div key={i} className="flex items-center gap-3 px-3">
                              {EXPERTISE.skills.map((skill, idx) => (
                                <Badge key={`${i}-${idx}`} variant="outline" className="bg-white dark:bg-zinc-950 whitespace-nowrap py-1.5 px-3">
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                          ))}
                        </div>
                      </div>
                    </Card>

                    <Card className="p-6 bg-gradient-to-br from-zinc-50 to-white dark:from-zinc-900/50 dark:to-zinc-900 border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all group">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="text-zinc-500 dark:text-zinc-400 group-hover:scale-110 transition-transform">
                          <Terminal size={20} />
                        </div>
                        <h4 className="font-medium dark:text-white">OS & Environments</h4>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {EXPERTISE.os.map(os => <Badge key={os} variant="outline" className="bg-white dark:bg-zinc-950">{os}</Badge>)}
                      </div>
                    </Card>

                    <Card className="p-6 bg-gradient-to-br from-zinc-50 to-white dark:from-zinc-900/50 dark:to-zinc-900 border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all group">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="text-zinc-500 dark:text-zinc-400 group-hover:scale-110 transition-transform">
                          <Palette size={20} />
                        </div>
                        <h4 className="font-medium dark:text-white">Design</h4>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {EXPERTISE.design.map(design => <Badge key={design} variant="outline" className="bg-white dark:bg-zinc-950">{design}</Badge>)}
                      </div>
                    </Card>
                  </div>
                </div>
                <div>
                  <SectionHeader title="Insights" subtitle="Live Stats" />
                  <DataInsightsWidget />
                </div>
              </div>

              <div>
                <SectionHeader title="Currently Learning" subtitle="The Tech Radar" />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {CURRENTLY_LEARNING.map((item, idx) => {
                    const Icon = IconMap[item.icon];
                    return (
                      <Card key={idx} className="flex items-center gap-4">
                        <div className="p-3 bg-zinc-50 dark:bg-zinc-800 rounded-lg text-zinc-900 dark:text-zinc-100">
                          {Icon && <Icon size={20} />}
                        </div>
                        <div>
                          <h4 className="font-medium text-sm dark:text-white">{item.name}</h4>
                          <span className="text-[10px] uppercase tracking-widest text-zinc-400">{item.status}</span>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              </div>
            </PageTransition>
          )}

          {/* BLOG — Untitled UI Inspired Editorial Feature */}
          {activeTab === 'blog' && (
            <PageTransition key="blog" id="blog">
              {!selectedPost ? (
                <div className="space-y-12 pb-16">
                  {/* Untitled UI Editorial Header & Subscribe Bar */}
                  <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-4">
                    <div className="max-w-2xl">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-4">
                        <span className="w-1.5 h-1.5 rounded-full bg-zinc-900 dark:bg-white" />
                        <span>Our blog</span>
                      </div>
                      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-zinc-900 dark:text-white leading-[1.08]">
                        Writings on Data, Systems &amp; AI
                      </h1>
                      <p className="text-lg sm:text-xl text-zinc-500 dark:text-zinc-400 mt-4 leading-relaxed">
                        The latest architectural deep dives, distributed systems playbooks, and engineering field notes.
                      </p>
                    </div>

                    <div className="w-full lg:w-auto lg:min-w-[380px]">
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          if (newsletterEmail.trim()) {
                            setNewsletterSubscribed(true);
                            setNewsletterEmail('');
                          }
                        }}
                        className="flex flex-col sm:flex-row gap-2.5"
                      >
                        <input
                          type="email"
                          required
                          value={newsletterEmail}
                          onChange={(e) => setNewsletterEmail(e.target.value)}
                          placeholder="Enter your email"
                          className="flex-1 px-4 py-3 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 shadow-xs"
                        />
                        <button
                          type="submit"
                          className="px-5 py-3 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-sm font-semibold hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors shrink-0 shadow-xs"
                        >
                          {newsletterSubscribed ? 'Subscribed ✓' : 'Subscribe'}
                        </button>
                      </form>
                      <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-2">
                        {newsletterSubscribed
                          ? 'Thanks for subscribing — new field notes will land in your inbox.'
                          : 'New engineering deep dives & architecture notes. No spam, ever.'}
                      </p>
                    </div>
                  </div>

                  {/* Featured Hero Post Card with Frosted Glass Overlay (Untitled UI Shot #23081977) */}
                  {featuredBlogPost && !blogSearch && blogCategory === 'All' && blogSort === 'newest' && (
                    <div
                      onClick={() => {
                        setSelectedPost(featuredBlogPost);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="group cursor-pointer relative rounded-3xl overflow-hidden bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-lg aspect-[4/5] sm:aspect-[16/10] lg:aspect-[20/10] flex flex-col justify-end"
                    >
                      <img
                        src={featuredBlogPost.imageUrl || `https://picsum.photos/seed/${featuredBlogPost.id}/1400/800`}
                        alt={featuredBlogPost.title}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/10 transition-opacity duration-500" />

                      {/* Frosted Glass Bottom Panel */}
                      <div className="relative z-10 backdrop-blur-md bg-black/45 border-t border-white/20 p-6 sm:p-8 lg:p-10 text-white">
                        <div className="flex items-start justify-between gap-4 mb-3">
                          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight leading-tight max-w-3xl group-hover:underline decoration-white/60 underline-offset-4">
                            {featuredBlogPost.title}
                          </h2>
                          <span className="w-10 h-10 rounded-full bg-white/15 border border-white/25 flex items-center justify-center shrink-0 group-hover:bg-white group-hover:text-zinc-900 transition-all duration-300">
                            <ArrowUpRight size={20} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                          </span>
                        </div>

                        <p className="text-white/80 text-sm sm:text-base leading-relaxed max-w-3xl line-clamp-2 mb-6 sm:mb-8">
                          {featuredBlogPost.excerpt}
                        </p>

                        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pt-4 border-t border-white/15">
                          <div className="flex flex-wrap items-center gap-6 sm:gap-8">
                            <div>
                              <span className="block text-[11px] font-medium uppercase tracking-wider text-white/60 mb-1.5">Written by</span>
                              <div className="flex items-center gap-2.5">
                                <img
                                  src={PERSONAL_INFO.image}
                                  alt={PERSONAL_INFO.name}
                                  className="w-7 h-7 rounded-full object-cover border border-white/30"
                                  referrerPolicy="no-referrer"
                                />
                                <span className="text-sm font-medium text-white">{PERSONAL_INFO.name}</span>
                              </div>
                            </div>
                            <div>
                              <span className="block text-[11px] font-medium uppercase tracking-wider text-white/60 mb-1.5">Published on</span>
                              <span className="text-sm font-medium text-white">{formatBlogDate(featuredBlogPost.date)}</span>
                            </div>
                            <div>
                              <span className="block text-[11px] font-medium uppercase tracking-wider text-white/60 mb-1.5">Reading time</span>
                              <span className="text-sm font-medium text-white">{getReadingTime(featuredBlogPost.content)} min read</span>
                            </div>
                          </div>

                          <div>
                            <span className="block text-[11px] font-medium uppercase tracking-wider text-white/60 mb-1.5 sm:text-right">File under</span>
                            <div className="flex flex-wrap gap-2">
                              {featuredBlogPost.tags.map(tag => (
                                <span
                                  key={tag}
                                  className="px-3 py-1 rounded-full text-xs font-medium border border-white/40 bg-white/10 text-white backdrop-blur-xs"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Untitled UI Filter Tabs, Search & Sort Bar */}
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-0">
                    <div className="flex items-center gap-1 overflow-x-auto hide-scrollbar -mb-px">
                      {blogCategories.map(cat => {
                        const isActive = blogCategory === cat;
                        const label = cat === 'All' ? 'View all' : cat;
                        return (
                          <button
                            key={cat}
                            type="button"
                            onClick={() => {
                              setBlogCategory(cat);
                              setBlogPage(1);
                            }}
                            className={cn(
                              'whitespace-nowrap px-4 py-3.5 text-sm font-medium border-b-2 transition-all',
                              isActive
                                ? 'border-zinc-900 dark:border-white text-zinc-900 dark:text-white'
                                : 'border-transparent text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200'
                            )}
                          >
                            {label}
                          </button>
                        );
                      })}
                    </div>

                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pb-3 lg:pb-2">
                      <div className="relative min-w-[220px]">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" size={16} />
                        <input
                          type="text"
                          placeholder="Search articles..."
                          value={blogSearch}
                          onChange={(e) => {
                            setBlogSearch(e.target.value);
                            setBlogPage(1);
                          }}
                          className="w-full pl-9 pr-8 py-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100"
                        />
                        {blogSearch && (
                          <button
                            type="button"
                            onClick={() => { setBlogSearch(''); setBlogPage(1); }}
                            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200"
                          >
                            <X size={14} />
                          </button>
                        )}
                      </div>

                      <div className="relative flex items-center">
                        <SlidersHorizontal size={14} className="absolute left-3.5 text-zinc-400 pointer-events-none" />
                        <select
                          aria-label="Sort blog posts"
                          value={blogSort}
                          onChange={(e) => {
                            setBlogSort(e.target.value as 'newest' | 'oldest' | 'shortest');
                            setBlogPage(1);
                          }}
                          className="pl-9 pr-8 py-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm font-medium text-zinc-700 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 appearance-none cursor-pointer"
                        >
                          <option value="newest">Most recent</option>
                          <option value="oldest">Oldest first</option>
                          <option value="shortest">Shortest read</option>
                        </select>
                        <ChevronDown size={14} className="absolute right-3 text-zinc-400 pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  {/* 3-Column Untitled UI Blog Card Grid */}
                  {filteredBlogs.length > 0 ? (
                    <div className="space-y-14">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                        {paginatedGridBlogs.map((post) => (
                          <article
                            key={post.id}
                            onClick={() => {
                              setSelectedPost(post);
                              window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                            className="group cursor-pointer flex flex-col h-full"
                          >
                            {/* Card Image + Frosted Glass Metadata Strip */}
                            <div className="aspect-[16/10] bg-zinc-100 dark:bg-zinc-900 rounded-2xl mb-5 overflow-hidden relative border border-zinc-200/70 dark:border-zinc-800 shadow-xs group-hover:shadow-md transition-all">
                              <img
                                src={post.imageUrl || `https://picsum.photos/seed/${post.id}/800/500`}
                                alt={post.title}
                                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500 ease-out"
                                referrerPolicy="no-referrer"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent opacity-90" />
                              <div className="absolute inset-x-0 bottom-0 backdrop-blur-md bg-black/40 border-t border-white/20 px-4 py-3 text-white flex items-center justify-between gap-2">
                                <div className="min-w-0">
                                  <p className="text-xs font-semibold truncate">{PERSONAL_INFO.name}</p>
                                  <p className="text-[11px] text-white/75">{formatBlogDate(post.date)}</p>
                                </div>
                                {post.tags[0] && (
                                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium border border-white/35 bg-white/10 text-white shrink-0">
                                    {post.tags[0]}
                                  </span>
                                )}
                              </div>
                            </div>

                            {/* Card Text Content */}
                            <div className="flex flex-col flex-grow">
                              <div className="flex items-center gap-2 text-xs font-semibold text-zinc-600 dark:text-zinc-400 mb-2">
                                <span>{post.tags[0] || 'Engineering'}</span>
                                <span className="w-1 h-1 rounded-full bg-zinc-300 dark:bg-zinc-700" />
                                <span className="font-normal text-zinc-500 dark:text-zinc-400">{getReadingTime(post.content)} min read</span>
                              </div>

                              <div className="flex items-start justify-between gap-3 mb-2.5">
                                <h3 className="text-xl font-semibold text-zinc-900 dark:text-white group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors leading-snug">
                                  {post.title}
                                </h3>
                                <ArrowUpRight
                                  size={20}
                                  className="shrink-0 mt-1 text-zinc-900 dark:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                                />
                              </div>

                              <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed line-clamp-2 mb-5">
                                {post.excerpt}
                              </p>

                              <div className="mt-auto pt-3 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between gap-3">
                                <div className="flex items-center gap-2.5 min-w-0">
                                  <img
                                    src={PERSONAL_INFO.image}
                                    alt={PERSONAL_INFO.name}
                                    className="w-7 h-7 rounded-full object-cover border border-zinc-200 dark:border-zinc-700"
                                    referrerPolicy="no-referrer"
                                  />
                                  <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300 truncate">
                                    {formatBlogDate(post.date)}
                                  </span>
                                </div>
                                <span className="inline-flex items-center gap-1 text-xs font-semibold text-zinc-900 dark:text-white group-hover:underline underline-offset-4">
                                  Read post <ArrowUpRight size={14} />
                                </span>
                              </div>
                            </div>
                          </article>
                        ))}
                      </div>

                      {/* Untitled UI Pagination Footer */}
                      <div className="pt-6 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between gap-4">
                        <button
                          type="button"
                          disabled={currentBlogPage <= 1}
                          onClick={() => setBlogPage(p => Math.max(1, p - 1))}
                          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-900 disabled:opacity-40 disabled:pointer-events-none transition-colors"
                        >
                          <ArrowRight size={16} className="rotate-180" />
                          <span>Previous</span>
                        </button>

                        <div className="flex items-center gap-1">
                          {Array.from({ length: totalBlogPages }, (_, i) => i + 1).map(pageNum => (
                            <button
                              key={pageNum}
                              type="button"
                              onClick={() => setBlogPage(pageNum)}
                              className={cn(
                                'w-9 h-9 rounded-lg text-sm font-medium transition-colors',
                                currentBlogPage === pageNum
                                  ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900'
                                  : 'text-zinc-500 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800'
                              )}
                            >
                              {pageNum}
                            </button>
                          ))}
                        </div>

                        <button
                          type="button"
                          disabled={currentBlogPage >= totalBlogPages}
                          onClick={() => setBlogPage(p => Math.min(totalBlogPages, p + 1))}
                          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-900 disabled:opacity-40 disabled:pointer-events-none transition-colors"
                        >
                          <span>Next</span>
                          <ArrowRight size={16} />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="py-20 px-6 bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl border border-zinc-200 dark:border-zinc-800 text-center">
                      <div className="max-w-md mx-auto">
                        <span className="text-xs font-mono uppercase tracking-widest text-zinc-400">No matching articles</span>
                        <h3 className="text-2xl font-semibold text-zinc-900 dark:text-white mt-2 mb-2">No posts matched your filter</h3>
                        <p className="text-zinc-500 dark:text-zinc-400 text-sm mb-6">
                          Try clearing your search query or switching back to View all categories.
                        </p>
                        <button
                          type="button"
                          onClick={() => {
                            setBlogSearch('');
                            setBlogCategory('All');
                            setBlogSort('newest');
                            setBlogPage(1);
                          }}
                          className="px-4 py-2.5 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-sm font-medium"
                        >
                          Reset filters
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                /* Single Post Reading View — Untitled UI Editorial Layout */
                <div className="max-w-5xl mx-auto pb-24">
                  <div className="flex items-center justify-between gap-4 mb-10">
                    <button
                      onClick={() => setSelectedPost(null)}
                      aria-label="Back to all blog posts"
                      className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 text-sm font-medium text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
                    >
                      <ArrowRight size={16} className="rotate-180" />
                      <span>Back to blog</span>
                    </button>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          navigator.clipboard.writeText(window.location.href);
                          setCopiedLink(true);
                          setTimeout(() => setCopiedLink(false), 2000);
                        }}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 text-xs font-medium text-zinc-600 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
                      >
                        {copiedLink ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
                        <span>{copiedLink ? 'Link copied' : 'Copy link'}</span>
                      </button>
                    </div>
                  </div>

                  {/* Centered Editorial Article Header */}
                  <div className="text-center max-w-3xl mx-auto mb-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-xs font-semibold text-zinc-800 dark:text-zinc-200 mb-5">
                      <span>{selectedPost.tags[0] || 'Engineering'}</span>
                      <span className="w-1 h-1 rounded-full bg-zinc-400" />
                      <span>{getReadingTime(selectedPost.content)} min read</span>
                    </div>

                    <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight text-zinc-900 dark:text-white leading-[1.12] mb-5">
                      {selectedPost.title}
                    </h1>

                    {selectedPost.excerpt && (
                      <p className="text-lg sm:text-xl text-zinc-500 dark:text-zinc-400 leading-relaxed">
                        {selectedPost.excerpt}
                      </p>
                    )}

                    <div className="flex items-center justify-center gap-3 mt-8">
                      <img
                        src={PERSONAL_INFO.image}
                        alt={PERSONAL_INFO.name}
                        className="w-11 h-11 rounded-full object-cover border border-zinc-200 dark:border-zinc-700"
                        referrerPolicy="no-referrer"
                      />
                      <div className="text-left">
                        <div className="text-sm font-semibold text-zinc-900 dark:text-white">{PERSONAL_INFO.name}</div>
                        <div className="text-xs text-zinc-500 dark:text-zinc-400">Published {formatBlogDate(selectedPost.date)}</div>
                      </div>
                    </div>
                  </div>

                  {/* Full-Bleed Article Cover Image */}
                  <div className="aspect-[16/9] bg-zinc-100 dark:bg-zinc-900 rounded-3xl overflow-hidden mb-14 shadow-md border border-zinc-200 dark:border-zinc-800">
                    <img
                      src={selectedPost.imageUrl || `https://picsum.photos/seed/${selectedPost.id}/1400/750`}
                      alt={selectedPost.title}
                      className="object-cover w-full h-full"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  {/* 2-Column Editorial Layout: Sidebar Metadata + Prose */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                    <aside className="lg:col-span-4 lg:sticky lg:top-28 space-y-6 order-2 lg:order-1">
                      <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 space-y-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={PERSONAL_INFO.image}
                            alt={PERSONAL_INFO.name}
                            className="w-10 h-10 rounded-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                          <div>
                            <div className="text-sm font-semibold text-zinc-900 dark:text-white">{PERSONAL_INFO.name}</div>
                            <div className="text-xs text-zinc-500 dark:text-zinc-400">{PERSONAL_INFO.title}</div>
                          </div>
                        </div>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                          Writing about distributed data engineering, lakehouse storage internals, and high-leverage AI workflows.
                        </p>
                        <div className="pt-3 border-t border-zinc-200 dark:border-zinc-800 flex flex-wrap gap-1.5">
                          {selectedPost.tags.map(tag => (
                            <span
                              key={tag}
                              className="px-2.5 py-1 rounded-full bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-xs font-medium text-zinc-700 dark:text-zinc-300"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {extractHeadings(selectedPost.content).length > 0 && (
                        <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-zinc-400 mb-3">
                            <BookOpen size={14} />
                            <span>In this article</span>
                          </div>
                          <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
                            {extractHeadings(selectedPost.content).map((heading, idx) => (
                              <li key={idx} className="flex items-start gap-2 leading-snug">
                                <span className="text-xs font-mono text-zinc-400 mt-0.5">{String(idx + 1).padStart(2, '0')}</span>
                                <span>{heading}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </aside>

                    <div className="lg:col-span-8 order-1 lg:order-2 min-w-0">
                      <BlogMarkdown content={selectedPost.content} />
                    </div>
                  </div>

                  {/* Related Posts Footer in Untitled UI Card Style */}
                  {blogs.filter(post => post.id !== selectedPost.id).slice(0, 3).length > 0 && (
                    <section className="mt-24 pt-12 border-t border-zinc-200 dark:border-zinc-800">
                      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
                        <div>
                          <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">From the blog</span>
                          <h2 className="text-2xl sm:text-3xl font-semibold text-zinc-900 dark:text-white mt-1">Latest writings &amp; playbooks</h2>
                        </div>
                        <button
                          type="button"
                          onClick={() => setSelectedPost(null)}
                          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-sm font-medium w-fit"
                        >
                          <span>View all posts</span>
                          <ArrowUpRight size={16} />
                        </button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {blogs.filter(post => post.id !== selectedPost.id).slice(0, 3).map(post => (
                          <div
                            key={post.id}
                            onClick={() => {
                              setSelectedPost(post);
                              window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                            className="group cursor-pointer flex flex-col"
                          >
                            <div className="aspect-[16/10] rounded-2xl overflow-hidden mb-4 relative border border-zinc-200 dark:border-zinc-800">
                              <img
                                src={post.imageUrl || `https://picsum.photos/seed/${post.id}/800/500`}
                                alt={post.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                referrerPolicy="no-referrer"
                              />
                            </div>
                            <div className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 mb-1.5">
                              {post.tags[0] || 'Engineering'} · {getReadingTime(post.content)} min read
                            </div>
                            <div className="flex items-start justify-between gap-2 mb-2">
                              <h3 className="font-semibold text-zinc-900 dark:text-white group-hover:underline underline-offset-4 leading-snug">
                                {post.title}
                              </h3>
                              <ArrowUpRight size={16} className="shrink-0 mt-1 text-zinc-900 dark:text-white" />
                            </div>
                            <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2">{post.excerpt}</p>
                          </div>
                        ))}
                      </div>
                    </section>
                  )}
                </div>
              )}
            </PageTransition>
          )}

          {/* LIFE SECTION */}
          {activeTab === 'life' && (
            <PageTransition
              key="life"
              id="life"
              className="space-y-24"
            >
              {PHOTOGRAPHY.length > 0 && (
                <section>
                  <SectionHeader title="Nature Photography" subtitle="Through My Lens" />
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {PHOTOGRAPHY.map((photo, idx) => (
                      <div key={idx} className="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-zinc-100 dark:bg-zinc-900">
                        <img 
                          src={photo.url} 
                          alt={photo.title} 
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110 grayscale group-hover:grayscale-0"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                          <h4 className="text-white font-medium">{photo.title}</h4>
                          <p className="text-white/70 text-xs flex items-center gap-1">
                            <MapPin size={10} /> {photo.location}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              <section className={PHOTOGRAPHY.length > 0 ? "mt-20" : ""}>
                <SectionHeader title="Reading List" subtitle="Books & Influence" />
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-6">
                  {books.map((book, idx) => (
                    <div key={idx} className="group cursor-pointer">
                      <div className="aspect-[2/3] mb-4 overflow-hidden rounded-lg shadow-lg transition-transform group-hover:-translate-y-2 relative bg-zinc-100 dark:bg-zinc-800">
                        <img 
                          src={book.cover.replace('http://', 'https://')} 
                          alt={book.title} 
                          className="h-full w-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0"
                          referrerPolicy="no-referrer"
                          loading="lazy"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            if (!target.src.includes('placeholder')) {
                              target.src = `https://picsum.photos/seed/${book.id}/400/600?blur=2`;
                            }
                          }}
                        />
                        {book.isReading && (
                          <div className="absolute top-2 right-2 bg-emerald-500 text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-lg animate-pulse">
                            READING
                          </div>
                        )}
                        {book.rating && (
                          <div className="absolute bottom-2 right-2 bg-black/80 backdrop-blur-sm text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg flex items-center gap-1">
                            ★ {book.rating}
                          </div>
                        )}
                      </div>
                      <h4 className="text-sm font-medium leading-tight dark:text-white mb-1">{book.title}</h4>
                      <p className="text-xs text-zinc-500">{book.author}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section className="mt-20">
                <SectionHeader title="Gaming Library" subtitle="Favorites & Current" />
                <HorizontalScroll>
                  {games.map((game, idx) => {
                    const Icon = IconMap[game.icon];
                    return (
                      <TiltCard key={idx} className="min-w-[140px] sm:min-w-[180px] snap-start group relative cursor-pointer">
                        <div className="aspect-[3/4] rounded-xl overflow-hidden bg-zinc-100 dark:bg-zinc-800 shadow-sm transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-xl group-hover:ring-2 group-hover:ring-zinc-900 dark:group-hover:ring-white">
                          <img 
                            src={game.imageUrl.replace('http://', 'https://')} 
                            alt={game.title} 
                            className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105 grayscale group-hover:grayscale-0"
                            referrerPolicy="no-referrer"
                            loading="lazy"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              if (!target.src.includes('placeholder')) {
                                target.src = `https://picsum.photos/seed/${game.id}/400/600?blur=2`;
                              }
                            }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                            <h4 className="text-white font-medium text-sm leading-tight mb-2">{game.title}</h4>
                            <div className="flex items-center justify-between">
                              <div className="flex flex-col gap-1">
                                <span className="text-[10px] uppercase tracking-widest text-zinc-300">{game.platform}</span>
                                <span className={clsx(
                                  "text-[10px] uppercase tracking-widest font-bold",
                                  game.status === 'Playing' ? "text-emerald-400" : "text-zinc-400"
                                )}>{game.status}</span>
                              </div>
                              {Icon && <Icon size={16} className="text-white/70" />}
                            </div>
                          </div>
                        </div>
                        {game.status === 'Playing' && (
                          <div className="absolute -top-2 -right-2 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white dark:border-zinc-950 animate-pulse" />
                        )}
                      </TiltCard>
                    );
                  })}
                </HorizontalScroll>
              </section>

              <section className="mt-24">
                <SectionHeader title="Uses" subtitle="My Setup & Tools" />
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {USES.map((category, idx) => (
                    <div key={idx} className="bg-zinc-50 dark:bg-zinc-900/40 rounded-3xl p-8 border border-zinc-100 dark:border-zinc-800/50">
                      <div className="flex items-center gap-3 mb-8">
                        <div className="p-2.5 bg-white dark:bg-zinc-800 rounded-xl shadow-sm border border-zinc-200/50 dark:border-zinc-700/50">
                          {idx === 0 ? <Monitor size={20} className="text-zinc-700 dark:text-zinc-300" /> : <Terminal size={20} className="text-zinc-700 dark:text-zinc-300" />}
                        </div>
                        <h3 className="text-2xl font-serif italic dark:text-white">{category.category}</h3>
                      </div>
                      
                      <div className="space-y-4">
                        {category.items.map((item, itemIdx) => (
                          <div 
                            key={itemIdx} 
                            className="group relative p-5 bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800 rounded-2xl hover:shadow-md hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-300 overflow-hidden"
                          >
                            <div className="absolute inset-0 bg-gradient-to-r from-zinc-50/50 to-transparent dark:from-zinc-800/20 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="relative z-10 flex flex-col sm:flex-row sm:items-start gap-4">
                              <div className="h-2 w-2 mt-2 rounded-full bg-zinc-300 dark:bg-zinc-700 group-hover:bg-zinc-900 dark:group-hover:bg-zinc-100 transition-colors shrink-0" />
                              <div>
                                <h4 className="font-medium text-base mb-1.5 text-zinc-900 dark:text-white group-hover:text-black dark:group-hover:text-white transition-colors">{item.name}</h4>
                                <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed">{item.description}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </PageTransition>
          )}

          {/* CONTACT */}
          {activeTab === 'contact' && (
            <PageTransition key="contact" id="contact">
              <div className="max-w-4xl mx-auto">
                <div className="bg-zinc-50 dark:bg-zinc-900/50 rounded-3xl p-8 md:p-12 border border-zinc-100 dark:border-zinc-800 text-center">
                  <h2 className="text-3xl font-serif italic mb-4 dark:text-white">Let's Connect</h2>
                  <p className="text-zinc-500 dark:text-zinc-400 max-w-xl mx-auto mb-10 leading-relaxed">
                    Whether you have a question, a project idea, or just want to say hi, I'll try my best to get back to you!
                  </p>
                  
                  <form 
                    onSubmit={async (e) => {
                      e.preventDefault();
                      const form = e.target as HTMLFormElement;
                      const data = new FormData(form);
                      const button = form.querySelector('button[type="submit"]') as HTMLButtonElement;
                      const originalText = button.innerHTML;
                      
                      try {
                        button.innerHTML = 'Sending...';
                        button.disabled = true;
                        
                        const response = await fetch('https://formspree.io/f/mgonevdp', {
                          method: 'POST',
                          body: data,
                          headers: {
                            'Accept': 'application/json'
                          }
                        });
                        
                        if (response.ok) {
                          form.reset();
                          button.innerHTML = 'Message Sent! ✓';
                          button.classList.add('bg-emerald-500', 'text-white', 'hover:bg-emerald-600');
                          button.classList.remove('bg-zinc-900', 'dark:bg-zinc-100', 'text-white', 'dark:text-zinc-900', 'hover:bg-zinc-800', 'dark:hover:bg-zinc-200');
                          setTimeout(() => {
                            button.innerHTML = originalText;
                            button.disabled = false;
                            button.classList.remove('bg-emerald-500', 'text-white', 'hover:bg-emerald-600');
                            button.classList.add('bg-zinc-900', 'dark:bg-zinc-100', 'text-white', 'dark:text-zinc-900', 'hover:bg-zinc-800', 'dark:hover:bg-zinc-200');
                          }, 3000);
                        } else {
                          throw new Error('Failed to send message');
                        }
                      } catch (error) {
                        button.innerHTML = 'Error Sending. Try Again.';
                        button.disabled = false;
                        setTimeout(() => {
                          button.innerHTML = originalText;
                        }, 3000);
                      }
                    }} 
                    className="max-w-md mx-auto space-y-4 text-left mb-10"
                  >
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-widest text-zinc-400 mb-2">Name</label>
                      <input type="text" name="name" required className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 dark:text-white focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 transition-all" placeholder="John Doe" />
                    </div>
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-widest text-zinc-400 mb-2">Email</label>
                      <input type="email" name="email" required className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 dark:text-white focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 transition-all" placeholder="john@example.com" />
                    </div>
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-widest text-zinc-400 mb-2">Message</label>
                      <textarea name="message" required rows={4} className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 dark:text-white focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 transition-all resize-none" placeholder="Hello Utsav..."></textarea>
                    </div>
                    <button type="submit" className="w-full py-4 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-xl font-medium hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed">
                      <Send size={18} /> Send Message
                    </button>
                  </form>

                  <div className="flex flex-wrap justify-center items-center gap-4 pt-8 border-t border-zinc-200 dark:border-zinc-800">
                    <Magnetic>
                      <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noopener noreferrer" className="p-3 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-full text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:border-zinc-900 dark:hover:border-zinc-100 transition-all block">
                        <Linkedin size={18} />
                      </a>
                    </Magnetic>
                    <Magnetic>
                      <a href={PERSONAL_INFO.github} target="_blank" rel="noopener noreferrer" className="p-3 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-full text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:border-zinc-900 dark:hover:border-zinc-100 transition-all block">
                        <Github size={18} />
                      </a>
                    </Magnetic>
                    <Magnetic>
                      <a href={`mailto:${PERSONAL_INFO.email}`} className="p-3 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-full text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:border-zinc-900 dark:hover:border-zinc-100 transition-all block">
                        <Mail size={18} />
                      </a>
                    </Magnetic>
                  </div>
                </div>
              </div>
            </PageTransition>
          )}

          {/* ADMIN */}
          {activeTab === 'admin' && (
            <PageTransition
              key="admin"
              id="admin"
              className="max-w-4xl mx-auto"
            >
              <SectionHeader title="Admin Dashboard" subtitle="Manage Content" />
              
              {!isLoggedIn ? (
                <Card className="max-w-md mx-auto text-center py-12">
                  <Lock className="mx-auto mb-4 text-zinc-400" size={48} />
                  <h3 className="text-xl font-medium mb-6 dark:text-white">Restricted Access</h3>
                  <input 
                    type="password" 
                    placeholder="Enter Admin Password"
                    className="w-full px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white mb-4 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100"
                    value={adminPassword || ''}
                    onChange={(e) => setAdminPassword(e.target.value)}
                  />
                  <button 
                    onClick={handleLogin}
                    className="w-full py-3 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-lg font-medium hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors"
                  >
                    Login
                  </button>
                </Card>
              ) : (
                <>
                  <div className="flex gap-4 mb-8 border-b border-zinc-200 dark:border-zinc-800">
                    <button 
                      onClick={() => setAdminSection('blogs')}
                      className={cn("pb-2 px-4 text-sm font-medium transition-colors", adminSection === 'blogs' ? "border-b-2 border-zinc-900 dark:border-white text-zinc-900 dark:text-white" : "text-zinc-400")}
                    >
                      Blogs
                    </button>
                    <button 
                      onClick={() => setAdminSection('books')}
                      className={cn("pb-2 px-4 text-sm font-medium transition-colors", adminSection === 'books' ? "border-b-2 border-zinc-900 dark:border-white text-zinc-900 dark:text-white" : "text-zinc-400")}
                    >
                      Books
                    </button>
                    <button 
                      onClick={() => setAdminSection('games')}
                      className={cn("pb-2 px-4 text-sm font-medium transition-colors", adminSection === 'games' ? "border-b-2 border-zinc-900 dark:border-white text-zinc-900 dark:text-white" : "text-zinc-400")}
                    >
                      Games
                    </button>
                    <button 
                      onClick={() => setAdminSection('projects')}
                      className={cn("pb-2 px-4 text-sm font-medium transition-colors", adminSection === 'projects' ? "border-b-2 border-zinc-900 dark:border-white text-zinc-900 dark:text-white" : "text-zinc-400")}
                    >
                      Projects
                    </button>
                    <button 
                      onClick={() => setAdminSection('resume')}
                      className={cn("pb-2 px-4 text-sm font-medium transition-colors", adminSection === 'resume' ? "border-b-2 border-zinc-900 dark:border-white text-zinc-900 dark:text-white" : "text-zinc-400")}
                    >
                      Resume
                    </button>
                  </div>

                  {adminSection === 'blogs' ? (
                    <div className="space-y-8">
                      {/* Admin Upload & Git Deployment Workflow Banner */}
                      <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-900/70 border border-zinc-200 dark:border-zinc-800 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                        <div className="space-y-1">
                          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-zinc-600 dark:text-zinc-300">
                            <GitBranch size={14} />
                            <span>Admin Upload → Git → Vercel Deployment Pipeline</span>
                          </div>
                          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-2xl">
                            When running locally (<code className="font-mono text-zinc-800 dark:text-zinc-200">npm run dev</code>), clicking <strong>Save post</strong> saves to SQLite <em>and</em> auto-syncs <code className="font-mono text-zinc-800 dark:text-zinc-200">src/data/content.ts</code> so you can commit and push to Git for instant Vercel deployment.
                          </p>
                        </div>
                        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
                          <button
                            type="button"
                            onClick={handleSyncBlogsToCode}
                            className="px-3.5 py-2 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-xs font-medium text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors flex items-center gap-1.5"
                          >
                            <GitBranch size={14} />
                            <span>{syncStatus === 'syncing' ? 'Syncing…' : syncStatus === 'synced' ? 'Synced to content.ts ✓' : 'Sync to content.ts'}</span>
                          </button>
                          <button
                            type="button"
                            onClick={handleCopyBlogsCode}
                            className="px-3.5 py-2 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-xs font-medium text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors flex items-center gap-1.5"
                          >
                            {copiedCode ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
                            <span>{copiedCode ? 'Copied TS Code' : 'Copy BLOG_POSTS TS'}</span>
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                        <aside className="lg:col-span-4 space-y-4">
                          <div className="flex items-end justify-between gap-4">
                            <div>
                              <h3 className="font-mono text-xs uppercase tracking-widest text-zinc-400">Published Posts</h3>
                              <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">Select a post to edit or create a new article.</p>
                            </div>
                            <span className="text-xs font-mono text-zinc-400">{blogs.length}</span>
                          </div>
                          <div className="space-y-2">
                            {blogs.length > 0 ? blogs.map(post => (
                              <div key={post.id} className={cn("flex items-center gap-3 p-3 bg-white dark:bg-zinc-900 border rounded-xl group transition-colors", editingPost.id === post.id ? "border-zinc-900 dark:border-zinc-100" : "border-zinc-200 dark:border-zinc-800")}>
                                {post.imageUrl && (
                                  <img src={post.imageUrl} alt="" className="w-11 h-11 rounded-lg object-cover shrink-0 border border-zinc-200 dark:border-zinc-800" referrerPolicy="no-referrer" />
                                )}
                                <button
                                  type="button"
                                  onClick={() => { setEditingPost(post); setBlogEditorMode('write'); setBlogSaveState('idle'); }}
                                  className="min-w-0 flex-1 text-left"
                                >
                                  <span className="block text-sm font-medium truncate dark:text-zinc-200">{post.title}</span>
                                  <span className="block text-[10px] font-mono text-zinc-400 mt-1">{post.date} · {getReadingTime(post.content)} min read</span>
                                </button>
                                <div className="flex gap-1 opacity-60 group-hover:opacity-100 transition-opacity">
                                  <button type="button" aria-label={`Edit ${post.title}`} onClick={() => { setEditingPost(post); setBlogEditorMode('write'); setBlogSaveState('idle'); }} className="p-1.5 text-zinc-400 hover:text-zinc-900 dark:hover:text-white"><Pencil size={15} /></button>
                                  <button type="button" aria-label={`Delete ${post.title}`} onClick={() => handleDeleteBlog(post.id)} className="p-1.5 text-zinc-400 hover:text-red-600"><Trash2 size={15} /></button>
                                </div>
                              </div>
                            )) : (
                              <div className="p-4 rounded-xl border border-dashed border-zinc-200 dark:border-zinc-800 text-sm text-zinc-500 dark:text-zinc-400">Your published posts will appear here.</div>
                            )}
                            <button
                              type="button"
                              onClick={() => { setEditingPost({ title: '', excerpt: '', content: '', tags: [], imageUrl: '', date: new Date().toISOString().split('T')[0] }); setBlogEditorMode('write'); setBlogSaveState('idle'); }}
                              className="w-full py-3 border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-xl text-zinc-500 hover:border-zinc-900 dark:hover:border-zinc-100 hover:text-zinc-900 dark:hover:text-zinc-100 transition-all flex items-center justify-center gap-2"
                            >
                              <Plus size={18} /> New post
                            </button>
                            <button
                              type="button"
                              onClick={handleResetBlogs}
                              className="w-full py-2 text-[10px] uppercase tracking-widest text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
                            >
                              Reset to Defaults
                            </button>
                          </div>
                        </aside>

                        <div className="lg:col-span-8">
                          <Card className="overflow-hidden p-0">
                            <div className="flex flex-wrap items-start justify-between gap-4 px-6 py-5 border-b border-zinc-200 dark:border-zinc-800">
                              <div>
                                <span className="text-[10px] font-mono uppercase tracking-[0.24em] text-zinc-400">{editingPost.id ? 'Editing post' : 'New post'}</span>
                                <h3 className="text-2xl font-serif italic text-zinc-900 dark:text-white mt-1">{editingPost.title || 'Untitled dispatch'}</h3>
                                <div className="flex items-center gap-3 text-xs font-mono text-zinc-400 mt-2">
                                  <span>{editingPostWordCount} words</span>
                                  <span className="w-1 h-1 bg-zinc-300 dark:bg-zinc-700 rounded-full" />
                                  <span>{editingPostContent ? getReadingTime(editingPostContent) : 0} min read</span>
                                </div>
                              </div>
                              <div className="flex rounded-lg border border-zinc-200 dark:border-zinc-800 p-1 bg-zinc-50 dark:bg-zinc-950">
                                <button type="button" onClick={() => setBlogEditorMode('write')} className={cn("flex items-center gap-2 px-3 py-2 rounded-md text-xs font-medium transition-colors", blogEditorMode === 'write' ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm" : "text-zinc-400")}><Pencil size={14} /> Write</button>
                                <button type="button" onClick={() => setBlogEditorMode('preview')} className={cn("flex items-center gap-2 px-3 py-2 rounded-md text-xs font-medium transition-colors", blogEditorMode === 'preview' ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm" : "text-zinc-400")}><Eye size={14} /> Preview</button>
                              </div>
                            </div>

                            {blogEditorMode === 'write' ? (
                              <div className="p-6 space-y-6">
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                  <div className="sm:col-span-2 space-y-2">
                                    <label className="text-xs font-mono uppercase tracking-widest text-zinc-400" htmlFor="blog-title">Title</label>
                                    <input id="blog-title" type="text" placeholder="A clear, specific headline" className="w-full px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100" value={editingPost.title || ''} onChange={(e) => { setEditingPost({...editingPost, title: e.target.value}); setBlogSaveState('idle'); }} />
                                  </div>
                                  <div className="space-y-2">
                                    <label className="text-xs font-mono uppercase tracking-widest text-zinc-400" htmlFor="blog-date">Publish Date</label>
                                    <input id="blog-date" type="date" className="w-full px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100" value={editingPost.date || new Date().toISOString().split('T')[0]} onChange={(e) => setEditingPost({...editingPost, date: e.target.value})} />
                                  </div>
                                </div>
                                <div className="space-y-2">
                                  <label className="text-xs font-mono uppercase tracking-widest text-zinc-400" htmlFor="blog-excerpt">Excerpt (2-line card summary)</label>
                                  <textarea id="blog-excerpt" placeholder="One or two sentences that tell readers why this matters." className="w-full px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 min-h-24 resize-y" value={editingPost.excerpt || ''} onChange={(e) => setEditingPost({...editingPost, excerpt: e.target.value})} />
                                </div>
                                <div className="space-y-2">
                                  <div className="flex items-center justify-between gap-4">
                                    <label className="text-xs font-mono uppercase tracking-widest text-zinc-400" htmlFor="blog-image-url">Hero Cover Image</label>
                                    <span className="text-xs text-zinc-400">Paste URL or upload file (auto-compressed)</span>
                                  </div>
                                  <div className="flex gap-2">
                                    <input id="blog-image-url" type="text" placeholder="Paste an Unsplash/Cloudinary URL or click Upload →" className="flex-1 px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100" value={editingPost.imageUrl || ''} onChange={(e) => setEditingPost({...editingPost, imageUrl: e.target.value})} />
                                    <input type="file" accept="image/*" className="hidden" id="blog-image-upload" onChange={async (e) => { if (e.target.files?.[0]) { const url = await handleFileUpload(e.target.files[0]); if (url) setEditingPost({...editingPost, imageUrl: url}); } }} />
                                    <label htmlFor="blog-image-upload" className="px-4 py-3 bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white rounded-lg cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors flex items-center justify-center gap-2 shrink-0"><ImagePlus size={16} /> Upload</label>
                                  </div>
                                  {editingPost.imageUrl && <img src={editingPost.imageUrl} alt="Blog hero preview" className="w-full h-40 object-cover rounded-xl border border-zinc-200 dark:border-zinc-800 mt-3" referrerPolicy="no-referrer" />}
                                </div>
                                <div className="space-y-2" data-color-mode={isDarkMode ? 'dark' : 'light'}>
                                  <div className="flex items-center justify-between gap-4">
                                    <label className="text-xs font-mono uppercase tracking-widest text-zinc-400">Markdown Content</label>
                                    <div className="flex items-center gap-3">
                                      <span className="hidden sm:inline text-xs text-zinc-400">Supports ```mermaid diagrams &amp; code blocks</span>
                                      {!editingPostContent.trim() && <button type="button" onClick={() => setEditingPost({...editingPost, content: BLOG_STARTER_TEMPLATE})} className="text-xs font-medium text-zinc-900 dark:text-zinc-100 hover:opacity-60 transition-opacity">Use starter outline</button>}
                                    </div>
                                  </div>
                                  <MDEditor value={editingPostContent} onChange={(val) => { setEditingPost({...editingPost, content: val || ''}); setBlogSaveState('idle'); }} height={420} className="w-full rounded-lg border border-zinc-200 dark:border-zinc-800 focus-within:ring-2 focus-within:ring-zinc-900 dark:focus-within:ring-zinc-100" />
                                </div>
                                <div className="space-y-2">
                                  <label className="text-xs font-mono uppercase tracking-widest text-zinc-400" htmlFor="blog-tags">Categories / Tags</label>
                                  <input id="blog-tags" type="text" placeholder="Data Engineering, Lakehouse, Apache Spark, AI Systems" className="w-full px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100" value={editingPostTags.join(', ')} onChange={(e) => setEditingPost({...editingPost, tags: e.target.value as any})} />
                                  <p className="text-xs text-zinc-400">Separate tags with commas. The first tag appears as the primary card badge.</p>
                                </div>
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-3 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
                                  {[
                                    ['Title', Boolean(editingPost.title?.trim())],
                                    ['Excerpt', Boolean(editingPost.excerpt?.trim())],
                                    ['Content', Boolean(editingPostContent.trim())],
                                    ['Tags', editingPostTags.length > 0]
                                  ].map(([label, complete]) => (
                                    <div key={String(label)} className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
                                      <CheckCircle2 size={14} className={complete ? 'text-emerald-600' : 'text-zinc-300 dark:text-zinc-700'} />
                                      <span>{String(label)}</span>
                                    </div>
                                  ))}
                                </div>
                                <div className="flex flex-wrap items-center justify-between gap-3">
                                  <div aria-live="polite" className="text-sm">
                                    {blogSaveState === 'error' && <span className="text-red-600">Add a title and some content before saving.</span>}
                                    {blogSaveState === 'saved' && (
                                      <span className="text-emerald-700 dark:text-emerald-400">
                                        Saved &amp; synced to <code className="font-mono">src/data/content.ts</code>! Commit &amp; push to Git to deploy.
                                      </span>
                                    )}
                                  </div>
                                  <button type="button" onClick={handleSaveBlog} disabled={blogSaveState === 'saving'} className="px-5 py-3 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-lg font-medium hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"><Save size={18} /> {blogSaveState === 'saving' ? 'Saving…' : editingPost.id ? 'Update & Sync Post' : 'Publish & Sync Post'}</button>
                                </div>
                              </div>
                            ) : (
                              <div className="p-6">
                                <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
                                  {editingPost.imageUrl && <img src={editingPost.imageUrl} alt="Blog hero preview" className="w-full aspect-[16/7] object-cover" referrerPolicy="no-referrer" />}
                                  <div className="p-6 sm:p-8">
                                    <div className="flex flex-wrap gap-2 mb-4">{editingPostTags.map(tag => <span key={tag} className="px-2.5 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-xs text-zinc-600 dark:text-zinc-300">{tag}</span>)}</div>
                                    <h1 className="text-3xl font-semibold text-zinc-900 dark:text-white mb-3">{editingPost.title || 'Untitled dispatch'}</h1>
                                    <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed mb-8">{editingPost.excerpt || 'Add an excerpt to give readers a clear reason to continue.'}</p>
                                    <BlogMarkdown content={editingPostContent || '*Your article preview will appear here.*'} />
                                  </div>
                                </div>
                              </div>
                            )}
                          </Card>
                        </div>
                      </div>
                    </div>
                  ) : adminSection === 'books' ? (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                      <div className="lg:col-span-4 space-y-4">
                        <h3 className="font-mono text-xs uppercase tracking-widest text-zinc-400 mb-4">Existing Books</h3>
                        <div className="space-y-2">
                          {books.map(book => (
                            <div key={book.id} className="flex items-center justify-between p-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg group">
                              <span className="text-sm font-medium truncate mr-2 dark:text-zinc-200">{book.title}</span>
                              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button onClick={() => setEditingBook(book)} className="p-1.5 text-zinc-400 hover:text-zinc-900 dark:hover:text-white"><Plus size={16} /></button>
                                <button onClick={() => handleDeleteBook(book.id)} className="p-1.5 text-zinc-400 hover:text-red-600"><Trash2 size={16} /></button>
                              </div>
                            </div>
                          ))}
                          <button 
                            onClick={() => setEditingBook({ title: '', author: '', category: '', cover: '', isReading: false, rating: undefined })}
                            className="w-full py-3 border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-400 hover:border-zinc-900 dark:hover:border-zinc-100 hover:text-zinc-900 dark:hover:text-zinc-100 transition-all flex items-center justify-center gap-2"
                          >
                            <Plus size={18} /> New Book
                          </button>
                          <button 
                            onClick={handleResetBooks}
                            className="w-full py-2 text-[10px] uppercase tracking-widest text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
                          >
                            Reset to Defaults
                          </button>
                        </div>
                      </div>

                      <div className="lg:col-span-8">
                        <Card className="space-y-6">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <label className="text-xs font-mono uppercase tracking-widest text-zinc-400">Title</label>
                              <input 
                                type="text" 
                                className="w-full px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100"
                                value={editingBook.title || ''}
                                onChange={(e) => setEditingBook({...editingBook, title: e.target.value})}
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="text-xs font-mono uppercase tracking-widest text-zinc-400">Author</label>
                              <input 
                                type="text" 
                                className="w-full px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100"
                                value={editingBook.author || ''}
                                onChange={(e) => setEditingBook({...editingBook, author: e.target.value})}
                              />
                            </div>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <label className="text-xs font-mono uppercase tracking-widest text-zinc-400">Category</label>
                              <input 
                                type="text" 
                                className="w-full px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100"
                                value={editingBook.category || ''}
                                onChange={(e) => setEditingBook({...editingBook, category: e.target.value})}
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="text-xs font-mono uppercase tracking-widest text-zinc-400">Cover Image</label>
                              <div className="flex gap-2">
                                <input 
                                  type="text" 
                                  placeholder="URL or upload file ->"
                                  className="flex-1 px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100"
                                  value={editingBook.cover || ''}
                                  onChange={(e) => setEditingBook({...editingBook, cover: e.target.value})}
                                />
                                <input 
                                  type="file" 
                                  accept="image/*"
                                  className="hidden" 
                                  id="book-cover-upload"
                                  onChange={async (e) => {
                                    if (e.target.files && e.target.files[0]) {
                                      const url = await handleFileUpload(e.target.files[0]);
                                      if (url) setEditingBook({...editingBook, cover: url});
                                    }
                                  }}
                                />
                                <label 
                                  htmlFor="book-cover-upload"
                                  className="px-4 py-2 bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white rounded-lg cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors flex items-center justify-center"
                                >
                                  Upload
                                </label>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <input 
                              type="checkbox" 
                              id="isReading"
                              checked={!!editingBook.isReading}
                              onChange={(e) => setEditingBook({...editingBook, isReading: e.target.checked})}
                              className="w-4 h-4 rounded border-zinc-300 text-zinc-900 focus:ring-zinc-900"
                            />
                            <label htmlFor="isReading" className="text-sm font-medium dark:text-white">Currently Reading</label>
                          </div>
                          <div className="space-y-2">
                            <label className="text-xs font-mono uppercase tracking-widest text-zinc-400">Rating (1-5)</label>
                            <input 
                              type="number" 
                              min="1"
                              max="5"
                              className="w-full px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100"
                              value={editingBook.rating || ''}
                              onChange={(e) => setEditingBook({...editingBook, rating: parseInt(e.target.value) || undefined})}
                            />
                          </div>
                          <button 
                            onClick={handleSaveBook}
                            className="w-full py-4 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-lg font-medium hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2"
                          >
                            <Save size={18} /> Save Book
                          </button>
                        </Card>
                      </div>
                    </div>
                  ) : adminSection === 'projects' ? (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                      <div className="lg:col-span-4 space-y-4">
                        <h3 className="font-mono text-xs uppercase tracking-widest text-zinc-400 mb-4">Existing Projects</h3>
                        <div className="space-y-2">
                          {projects.map(project => (
                            <div key={project.id} className="p-4 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 flex justify-between items-center group">
                              <div>
                                <h4 className="font-medium text-sm">{project.title}</h4>
                                <p className="text-xs text-zinc-500">{project.category}</p>
                              </div>
                              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button onClick={() => setEditingProject(project)} className="p-2 text-zinc-400 hover:text-zinc-900 dark:hover:text-white"><Code2 size={16} /></button>
                                <button onClick={() => handleDeleteProject(project.id)} className="p-2 text-red-400 hover:text-red-500"><Trash2 size={16} /></button>
                              </div>
                            </div>
                          ))}
                          <button 
                            onClick={handleResetProjects}
                            className="w-full py-2 text-[10px] uppercase tracking-widest text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
                          >
                            Reset to Defaults
                          </button>
                        </div>
                      </div>
                      <div className="lg:col-span-8">
                        <Card className="p-6 md:p-8">
                          <div className="flex justify-between items-center mb-8">
                            <h3 className="text-xl font-medium">{editingProject.id ? 'Edit Project' : 'New Project'}</h3>
                            {editingProject.id && (
                              <button 
                                onClick={() => setEditingProject({ title: '', category: '', description: '', tags: [], link: '', githubUrl: '', liveUrl: '', deepDive: { problem: '', solution: '', outcome: '', architecture: '' } })}
                                className="text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-white flex items-center gap-2"
                              >
                                <Plus size={16} /> New Project
                              </button>
                            )}
                          </div>
                          
                          <div className="space-y-6 mb-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div className="space-y-2">
                                <label className="text-xs font-mono uppercase tracking-widest text-zinc-400">Title</label>
                                <input 
                                  type="text" 
                                  className="w-full px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100"
                                  value={editingProject.title || ''}
                                  onChange={(e) => setEditingProject({...editingProject, title: e.target.value})}
                                />
                              </div>
                              <div className="space-y-2">
                                <label className="text-xs font-mono uppercase tracking-widest text-zinc-400">Category</label>
                                <input 
                                  type="text" 
                                  className="w-full px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100"
                                  value={editingProject.category || ''}
                                  onChange={(e) => setEditingProject({...editingProject, category: e.target.value})}
                                />
                              </div>
                            </div>
                            
                            <div className="space-y-2">
                              <label className="text-xs font-mono uppercase tracking-widest text-zinc-400">Short Description</label>
                              <textarea 
                                className="w-full px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 h-24"
                                value={editingProject.description || ''}
                                onChange={(e) => setEditingProject({...editingProject, description: e.target.value})}
                              />
                            </div>

                            <div className="space-y-2">
                              <label className="text-xs font-mono uppercase tracking-widest text-zinc-400">Tags (comma separated)</label>
                              <input 
                                type="text" 
                                className="w-full px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100"
                                value={Array.isArray(editingProject.tags) ? editingProject.tags.join(', ') : (editingProject.tags || '')}
                                onChange={(e) => setEditingProject({...editingProject, tags: e.target.value})}
                              />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div className="space-y-2">
                                <label className="text-xs font-mono uppercase tracking-widest text-zinc-400">GitHub URL</label>
                                <input 
                                  type="text" 
                                  className="w-full px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100"
                                  value={editingProject.githubUrl || ''}
                                  onChange={(e) => setEditingProject({...editingProject, githubUrl: e.target.value})}
                                />
                              </div>
                              <div className="space-y-2">
                                <label className="text-xs font-mono uppercase tracking-widest text-zinc-400">Live URL</label>
                                <input 
                                  type="text" 
                                  className="w-full px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100"
                                  value={editingProject.liveUrl || ''}
                                  onChange={(e) => setEditingProject({...editingProject, liveUrl: e.target.value})}
                                />
                              </div>
                            </div>

                            <div className="pt-6 border-t border-zinc-200 dark:border-zinc-800">
                              <h4 className="text-sm font-medium mb-4">Deep Dive Details</h4>
                              <div className="space-y-6">
                                <div className="space-y-2">
                                  <label className="text-xs font-mono uppercase tracking-widest text-zinc-400">The Problem</label>
                                  <textarea 
                                    className="w-full px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 h-24"
                                    value={editingProject.deepDive?.problem || ''}
                                    onChange={(e) => setEditingProject({...editingProject, deepDive: {...editingProject.deepDive, problem: e.target.value}})}
                                  />
                                </div>
                                <div className="space-y-2">
                                  <label className="text-xs font-mono uppercase tracking-widest text-zinc-400">The Solution</label>
                                  <textarea 
                                    className="w-full px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 h-24"
                                    value={editingProject.deepDive?.solution || ''}
                                    onChange={(e) => setEditingProject({...editingProject, deepDive: {...editingProject.deepDive, solution: e.target.value}})}
                                  />
                                </div>
                                <div className="space-y-2">
                                  <label className="text-xs font-mono uppercase tracking-widest text-zinc-400">The Outcome</label>
                                  <textarea 
                                    className="w-full px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 h-24"
                                    value={editingProject.deepDive?.outcome || ''}
                                    onChange={(e) => setEditingProject({...editingProject, deepDive: {...editingProject.deepDive, outcome: e.target.value}})}
                                  />
                                </div>
                                <div className="space-y-2">
                                  <label className="text-xs font-mono uppercase tracking-widest text-zinc-400">Architecture (Mermaid JS)</label>
                                  <textarea 
                                    className="w-full px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 h-48 font-mono text-sm"
                                    placeholder="graph TD\n  A --> B"
                                    value={editingProject.deepDive?.architecture || ''}
                                    onChange={(e) => setEditingProject({...editingProject, deepDive: {...editingProject.deepDive, architecture: e.target.value}})}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <button 
                            onClick={handleSaveProject}
                            className="w-full py-4 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-lg font-medium hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2"
                          >
                            <Save size={18} /> Save Project
                          </button>
                        </Card>
                      </div>
                    </div>
                  ) : adminSection === 'games' ? (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                      <div className="lg:col-span-4 space-y-4">
                        <h3 className="font-mono text-xs uppercase tracking-widest text-zinc-400 mb-4">Existing Games</h3>
                        <div className="space-y-2">
                          {games.map(game => (
                            <div key={game.id} className="flex items-center justify-between p-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg group">
                              <span className="text-sm font-medium truncate mr-2 dark:text-zinc-200">{game.title}</span>
                              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button onClick={() => setEditingGame(game)} className="p-1.5 text-zinc-400 hover:text-zinc-900 dark:hover:text-white"><Plus size={16} /></button>
                                <button onClick={() => handleDeleteGame(game.id)} className="p-1.5 text-zinc-400 hover:text-red-600"><Trash2 size={16} /></button>
                              </div>
                            </div>
                          ))}
                          <button 
                            onClick={() => setEditingGame({ title: '', platform: '', status: '', imageUrl: '', icon: 'Award' })}
                            className="w-full py-3 border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-400 hover:border-zinc-900 dark:hover:border-zinc-100 hover:text-zinc-900 dark:hover:text-zinc-100 transition-all flex items-center justify-center gap-2"
                          >
                            <Plus size={18} /> New Game
                          </button>
                          <button 
                            onClick={handleResetGames}
                            className="w-full py-2 text-[10px] uppercase tracking-widest text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
                          >
                            Reset to Defaults
                          </button>
                        </div>
                      </div>

                      <div className="lg:col-span-8">
                        <Card className="space-y-6">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <label className="text-xs font-mono uppercase tracking-widest text-zinc-400">Title</label>
                              <input 
                                type="text" 
                                className="w-full px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100"
                                value={editingGame.title || ''}
                                onChange={(e) => setEditingGame({...editingGame, title: e.target.value})}
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="text-xs font-mono uppercase tracking-widest text-zinc-400">Platform</label>
                              <input 
                                type="text" 
                                className="w-full px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100"
                                value={editingGame.platform || ''}
                                onChange={(e) => setEditingGame({...editingGame, platform: e.target.value})}
                              />
                            </div>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <label className="text-xs font-mono uppercase tracking-widest text-zinc-400">Status</label>
                              <select 
                                className="w-full px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100"
                                value={editingGame.status || ''}
                                onChange={(e) => setEditingGame({...editingGame, status: e.target.value})}
                              >
                                <option value="Completed">Completed</option>
                                <option value="Playing">Playing</option>
                                <option value="Competitive">Competitive</option>
                              </select>
                            </div>
                            <div className="space-y-2">
                              <label className="text-xs font-mono uppercase tracking-widest text-zinc-400">Image</label>
                              <div className="flex gap-2">
                                <input 
                                  type="text" 
                                  placeholder="URL or upload file ->"
                                  className="flex-1 px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100"
                                  value={editingGame.imageUrl || ''}
                                  onChange={(e) => setEditingGame({...editingGame, imageUrl: e.target.value})}
                                />
                                <input 
                                  type="file" 
                                  accept="image/*"
                                  className="hidden" 
                                  id="game-image-upload"
                                  onChange={async (e) => {
                                    if (e.target.files && e.target.files[0]) {
                                      const url = await handleFileUpload(e.target.files[0]);
                                      if (url) setEditingGame({...editingGame, imageUrl: url});
                                    }
                                  }}
                                />
                                <label 
                                  htmlFor="game-image-upload"
                                  className="px-4 py-2 bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white rounded-lg cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors flex items-center justify-center"
                                >
                                  Upload
                                </label>
                              </div>
                            </div>
                          </div>
                          <button 
                            onClick={handleSaveGame}
                            className="w-full py-4 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-lg font-medium hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2"
                          >
                            <Save size={18} /> Save Game
                          </button>
                        </Card>
                      </div>
                    </div>
                  ) : adminSection === 'resume' ? (
                    <div className="max-w-2xl mx-auto">
                      <Card className="p-8 text-center space-y-6">
                        <div className="w-16 h-16 bg-zinc-100 dark:bg-zinc-900 rounded-full flex items-center justify-center mx-auto mb-4">
                          <FileText className="text-zinc-400" size={32} />
                        </div>
                        <h3 className="text-2xl font-medium dark:text-white">Resume Management</h3>
                        <p className="text-zinc-500 dark:text-zinc-400">
                          Download the latest generated version of your resume. The resume is automatically generated from your profile data.
                        </p>
                        <div className="pt-4 flex justify-center">
                          <LazyPDFDownload className="flex items-center gap-2 px-8 py-4 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-full font-medium hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors" />
                        </div>
                      </Card>
                    </div>
                  ) : null}
                </>
              )}
            </PageTransition>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-200 dark:border-zinc-800 py-12 bg-white dark:bg-zinc-950">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-6 h-6 rounded overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-sm">
                  <img 
                    src={PERSONAL_INFO.image} 
                    alt="Utsav Shrestha" 
                    className="w-full h-full object-cover grayscale"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <span className="font-serif italic text-lg dark:text-white">Utsav Shrestha</span>
              </div>
              <p className="text-zinc-400 text-sm font-mono">© 2026 Personal Portfolio.</p>
            </div>
            
            <div className="flex items-center gap-6">
              <Magnetic>
                <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors block">
                  <Linkedin size={20} />
                </a>
              </Magnetic>
              <Magnetic>
                <a href={PERSONAL_INFO.github} target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors block">
                  <Github size={20} />
                </a>
              </Magnetic>
              <Magnetic>
                <a href={`mailto:${PERSONAL_INFO.email}`} className="text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors block">
                  <Mail size={20} />
                </a>
              </Magnetic>
              <button
                type="button"
                onClick={() => { setActiveTab('admin'); setSelectedPost(null); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                title="Open Admin Dashboard (Cmd+.)"
                className="text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors flex items-center gap-1 text-xs font-mono"
              >
                <Lock size={15} />
                <span className="hidden sm:inline">Admin</span>
              </button>
            </div>
          </div>
        </div>
      </footer>
      </div>
    </HelmetProvider>
  );
}
