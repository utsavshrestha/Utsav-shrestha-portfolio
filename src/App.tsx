import React, { useState, useEffect, useRef } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { motion, AnimatePresence } from 'motion/react';
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
  ChevronLeft
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
    { name: 'Sources', tools: ['SQL Server', 'APIs', 'Logs'], icon: Database },
    { name: 'Ingestion', tools: ['Airbyte', 'Rabbit-MQ'], icon: Activity },
    { name: 'Storage', tools: ['Snowflake', 'Delta Lake', 'S3'], icon: Layers },
    { name: 'Processing', tools: ['PySpark', 'Databricks'], icon: Cpu },
    { name: 'Visualization', tools: ['Tableau', 'XBI'], icon: BarChart3 },
  ];

  return (
    <div className="py-12 px-6 bg-zinc-50 dark:bg-zinc-950 rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 relative">
        {steps.map((step, idx) => (
          <React.Fragment key={idx}>
            <div className="flex flex-col items-center text-center z-10 w-full md:w-auto">
              <div className="w-16 h-16 bg-white dark:bg-zinc-900 rounded-2xl shadow-lg border border-zinc-100 dark:border-zinc-800 flex items-center justify-center mb-4 text-zinc-900 dark:text-white group hover:scale-110 transition-transform">
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
              <div className="hidden md:block flex-grow h-px bg-zinc-300 dark:bg-zinc-700 relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-zinc-50 dark:bg-zinc-950 px-2">
                  <ArrowRight size={14} className="text-zinc-400" />
                </div>
              </div>
            )}
            {idx < steps.length - 1 && (
              <div className="md:hidden py-2">
                <ArrowDown size={20} className="text-zinc-300 dark:text-zinc-700" />
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

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'experience' | 'projects' | 'skills' | 'blog' | 'life' | 'contact' | 'admin'>('home');
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [selectedProject, setSelectedProject] = useState<any | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [adminPassword, setAdminPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [projects, setProjects] = useState<any[]>(PROJECTS);
  const [books, setBooks] = useState<Book[]>(INITIAL_BOOKS);
  const [games, setGames] = useState<Game[]>(INITIAL_GAMES);
  const [blogSearch, setBlogSearch] = useState('');
  const [blogCategory, setBlogCategory] = useState('All');
  const [projectCategory, setProjectCategory] = useState('All');
  const [adminSection, setAdminSection] = useState<'blogs' | 'books' | 'games' | 'projects' | 'resume'>('blogs');

  const blogCategories = ['All', ...Array.from(new Set(blogs.flatMap(p => p.tags)))];
  const filteredBlogs = blogs.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(blogSearch.toLowerCase()) || post.excerpt.toLowerCase().includes(blogSearch.toLowerCase());
    const matchesCategory = blogCategory === 'All' || post.tags.includes(blogCategory);
    return matchesSearch && matchesCategory;
  });

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
        alert('Incorrect password');
      }
    } catch (err) {
      alert('Error verifying password');
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

  // Fetch blogs
  const fetchBlogs = async () => {
    try {
      const res = await fetch('/api/blogs');
      const data = await res.json();
      setBlogs(data);
    } catch (err) {
      console.error("Failed to fetch blogs", err);
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

  const handleSaveBlog = async () => {
    const postToSave = {
      ...editingPost,
      id: editingPost.id || Date.now().toString(),
      date: editingPost.date || new Date().toISOString().split('T')[0],
      tags: typeof editingPost.tags === 'string' ? (editingPost.tags as string).split(',').map(t => t.trim()) : editingPost.tags,
      imageUrl: editingPost.imageUrl || ''
    };

    try {
      const res = await fetch('/api/blogs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: adminPassword, blog: postToSave })
      });
      if (res.ok) {
        alert("Blog saved successfully!");
        fetchBlogs();
        setEditingPost({ title: '', excerpt: '', content: '', tags: [], imageUrl: '' });
      } else {
        alert("Failed to save. Check password.");
      }
    } catch (err) {
      alert("Error saving blog");
    }
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
        return data.url;
      }
      alert("Failed to upload image.");
      return null;
    } catch (err) {
      console.error("Error uploading file:", err);
      alert("Error uploading image.");
      return null;
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
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-12"
            >
              <div className="lg:col-span-7">
                <h1 className="text-6xl md:text-8xl font-serif italic tracking-tighter mb-6 leading-tight dark:text-white">
                  Data <br />
                  <span className="text-zinc-400 dark:text-zinc-500">Engineer</span>
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
                    <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noopener noreferrer" title="LinkedIn" className="p-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors">
                      <Linkedin size={24} />
                    </a>
                    <a href={PERSONAL_INFO.github} target="_blank" rel="noopener noreferrer" title="Github" className="p-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors">
                      <Github size={24} />
                    </a>
                    <a href={PERSONAL_INFO.behance} target="_blank" rel="noopener noreferrer" title="Behance" className="p-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors">
                      <ExternalLink size={24} />
                    </a>
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
                  <div className="relative bg-[#fdfdfd] dark:bg-[#f0f0f0] p-4 pb-16 sm:p-5 sm:pb-20 shadow-xl rounded-sm transform rotate-2 hover:rotate-0 hover:scale-[1.02] transition-all duration-500 w-full border border-zinc-200 dark:border-zinc-300 group">
                    <div className="overflow-hidden bg-white border border-zinc-100 dark:border-zinc-300">
                      <img 
                        src={PERSONAL_INFO.aboutImage} 
                        alt="Utsav Shrestha" 
                        className="w-full h-auto grayscale transition-all duration-700"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="absolute bottom-5 sm:bottom-6 left-0 right-0 text-center font-serif italic text-zinc-500 dark:text-zinc-600 text-lg sm:text-xl opacity-80">
                      Art & Engineering
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
            </motion.div>
          )}

          {/* PROJECTS */}
          {activeTab === 'projects' && (
            <motion.div
              key="projects"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
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
                  <Card key={idx} className="flex flex-col h-full group cursor-pointer" onClick={() => setSelectedProject(project)}>
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
            </motion.div>
          )}
          {activeTab === 'experience' && (
            <motion.div
              key="experience"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <SectionHeader title="Professional Journey" subtitle="Work Experience" />
              <div className="relative max-w-5xl mx-auto py-8">
                {/* Central Timeline Line */}
                <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-zinc-200 dark:bg-zinc-800 transform md:-translate-x-1/2" />
                
                <div className="space-y-16">
                  {EXPERIENCES.map((exp, idx) => {
                    const isEven = idx % 2 === 0;
                    return (
                      <motion.div 
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: idx * 0.1 }}
                        className="relative flex flex-col md:flex-row items-center justify-between group"
                      >
                        {/* Timeline Dot */}
                        <div className="absolute left-6 md:left-1/2 w-4 h-4 rounded-full bg-white dark:bg-zinc-950 border-2 border-zinc-300 dark:border-zinc-700 transform -translate-x-1/2 group-hover:border-zinc-900 dark:group-hover:border-zinc-100 group-hover:bg-zinc-900 dark:group-hover:bg-zinc-100 transition-all duration-300 z-10 shadow-[0_0_0_4px_rgba(255,255,255,1)] dark:shadow-[0_0_0_4px_rgba(9,9,11,1)]" />
                        
                        {/* Content Container */}
                        <div className={clsx(
                          "w-full md:w-5/12 pl-16 md:pl-0 text-left",
                          isEven ? "md:pr-12" : "md:order-2 md:pl-12"
                        )}>
                          <div className="p-6 bg-white dark:bg-zinc-900/50 rounded-2xl border border-zinc-100 dark:border-zinc-800/50 shadow-sm hover:shadow-md transition-all duration-300 group-hover:-translate-y-1 relative overflow-hidden">
                            {/* Subtle background gradient on hover */}
                            <div className="absolute inset-0 bg-gradient-to-br from-zinc-50 to-transparent dark:from-zinc-800/20 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            
                            <div className="relative z-10">
                              <div className="flex items-center gap-2 mb-3 text-zinc-500 dark:text-zinc-400 font-mono text-xs justify-start">
                                <Calendar size={14} />
                                <span>{exp.period}</span>
                              </div>
                              <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-1">{exp.role}</h3>
                              <p className="text-zinc-500 dark:text-zinc-400 font-serif italic mb-5">{exp.company}</p>
                              
                              <ul className="space-y-3 text-sm text-zinc-600 dark:text-zinc-400 text-left">
                                {exp.description.map((item, i) => (
                                  <li key={i} className="flex gap-3 leading-relaxed flex-row">
                                    <ChevronRight size={14} className="mt-1 flex-shrink-0 text-zinc-400" />
                                    <span>{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                        
                        {/* Spacer for the other side on desktop */}
                        <div className="hidden md:block w-5/12" />
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
            </motion.div>
          )}          {/* SKILLS / EXPERTISE */}
          {activeTab === 'skills' && (
            <motion.div
              key="skills"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
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
            </motion.div>
          )}

          {/* BLOG */}
          {activeTab === 'blog' && (
            <motion.div
              key="blog"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {!selectedPost ? (
                <>
                  <SectionHeader title="Insights & Research" subtitle="The Data Blog" />
                  
                  <div className="flex flex-col md:flex-row gap-4 mb-8">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
                      <input 
                        type="text" 
                        placeholder="Search articles..." 
                        value={blogSearch}
                        onChange={(e) => setBlogSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 transition-all dark:text-white"
                      />
                    </div>
                    <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
                      {blogCategories.map(cat => (
                        <button
                          key={cat}
                          onClick={() => setBlogCategory(cat)}
                          className={clsx(
                            "whitespace-nowrap px-4 py-2 rounded-xl text-sm font-medium transition-colors",
                            blogCategory === cat 
                              ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900" 
                              : "bg-white text-zinc-600 border border-zinc-200 hover:bg-zinc-50 dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-800"
                          )}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>

                  {filteredBlogs.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {filteredBlogs.map(post => (
                        <div 
                          key={post.id} 
                          className="group cursor-pointer"
                          onClick={() => setSelectedPost(post)}
                        >
                          <div className="aspect-[16/9] bg-zinc-200 rounded-xl mb-6 overflow-hidden relative">
                            <img 
                              src={post.imageUrl || `https://picsum.photos/seed/${post.id}/800/450`} 
                              alt={post.title} 
                              className="object-cover w-full h-full grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                              referrerPolicy="no-referrer"
                            />
                            <div className="absolute top-4 left-4">
                              <Badge>{post.tags[0]}</Badge>
                            </div>
                          </div>
                          <div className="flex items-center gap-3 text-zinc-400 text-xs font-mono mb-3">
                            <Calendar size={14} />
                            <span>{post.date}</span>
                            <span className="w-1 h-1 bg-zinc-300 rounded-full" />
                            <Clock size={14} />
                            <span>{getReadingTime(post.content)} min read</span>
                          </div>
                          <h3 className="text-2xl font-medium mb-3 group-hover:text-zinc-600 dark:group-hover:text-zinc-400 dark:text-white transition-colors leading-tight">
                            {post.title}
                          </h3>
                          <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed mb-4 line-clamp-2">
                            {post.excerpt}
                          </p>
                          <div className="flex items-center gap-2 text-zinc-900 dark:text-zinc-100 font-medium text-sm">
                            Read Full Article <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-20 bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl border border-zinc-100 dark:border-zinc-800">
                      <h3 className="text-xl font-medium text-zinc-900 dark:text-white mb-2">No posts yet</h3>
                      <p className="text-zinc-500 dark:text-zinc-400">Check back soon for new articles and insights.</p>
                    </div>
                  )}
                </>
              ) : (
                <div className="max-w-3xl mx-auto">
                  <button 
                    onClick={() => setSelectedPost(null)}
                    className="flex items-center gap-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-white mb-8 transition-colors"
                  >
                    <ArrowRight size={16} className="rotate-180" />
                    <span>Back to Blog</span>
                  </button>
                  
                  <div className="mb-12">
                    <div className="flex items-center gap-3 text-zinc-400 text-xs font-mono mb-4">
                      <Calendar size={14} />
                      <span>{selectedPost.date}</span>
                      <span className="w-1 h-1 bg-zinc-300 dark:bg-zinc-700 rounded-full" />
                      <Clock size={14} />
                      <span>{getReadingTime(selectedPost.content)} min read</span>
                      <span className="w-1 h-1 bg-zinc-300 dark:bg-zinc-700 rounded-full" />
                      <Tag size={14} />
                      <div className="flex gap-2">
                        {selectedPost.tags.map(tag => <span key={tag}>{tag}</span>)}
                      </div>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-serif italic mb-8 leading-tight dark:text-white">
                      {selectedPost.title}
                    </h1>
                    <div className="aspect-[21/9] bg-zinc-200 dark:bg-zinc-800 rounded-2xl overflow-hidden mb-12">
                      <img 
                        src={selectedPost.imageUrl || `https://picsum.photos/seed/${selectedPost.id}/1200/600`} 
                        alt={selectedPost.title} 
                        className="object-cover w-full h-full grayscale"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  </div>

                  <div className="prose prose-zinc dark:prose-invert max-w-none prose-headings:font-serif prose-headings:italic prose-p:text-zinc-600 dark:prose-p:text-zinc-400 prose-p:leading-relaxed">
                    <ReactMarkdown
                      components={{
                        code({ node, inline, className, children, ...props }: any) {
                          const match = /language-(\w+)/.exec(className || '');
                          return !inline && match && match[1] === 'mermaid' ? (
                            <Mermaid chart={String(children).replace(/\n$/, '')} />
                          ) : (
                            <code className={className} {...props}>
                              {children}
                            </code>
                          );
                        }
                      }}
                    >
                      {selectedPost.content}
                    </ReactMarkdown>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* LIFE SECTION */}
          {activeTab === 'life' && (
            <motion.div
              key="life"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
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
                      <div key={idx} className="min-w-[140px] sm:min-w-[180px] snap-start group relative cursor-pointer">
                      
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
                          <img 
                            src={game.imageUrl} 
                            alt={game.title} 
                            className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105 grayscale group-hover:grayscale-0"
                            referrerPolicy="no-referrer"
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
                      </div>
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
            </motion.div>
          )}

          {/* CONTACT */}
          {activeTab === 'contact' && (
            <motion.div
              key="contact"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
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
                    <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noopener noreferrer" className="p-3 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-full text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:border-zinc-900 dark:hover:border-zinc-100 transition-all">
                      <Linkedin size={18} />
                    </a>
                    <a href={PERSONAL_INFO.github} target="_blank" rel="noopener noreferrer" className="p-3 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-full text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:border-zinc-900 dark:hover:border-zinc-100 transition-all">
                      <Github size={18} />
                    </a>
                    <a href={`mailto:${PERSONAL_INFO.email}`} className="p-3 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-full text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:border-zinc-900 dark:hover:border-zinc-100 transition-all">
                      <Mail size={18} />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ADMIN */}
          {activeTab === 'admin' && (
            <motion.div
              key="admin"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
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
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                      <div className="lg:col-span-4 space-y-4">
                        <h3 className="font-mono text-xs uppercase tracking-widest text-zinc-400 mb-4">Existing Posts</h3>
                        <div className="space-y-2">
                          {blogs.map(post => (
                            <div key={post.id} className="flex items-center justify-between p-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg group">
                              <span className="text-sm font-medium truncate mr-2 dark:text-zinc-200">{post.title}</span>
                              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button onClick={() => setEditingPost(post)} className="p-1.5 text-zinc-400 hover:text-zinc-900 dark:hover:text-white"><Plus size={16} /></button>
                                <button onClick={() => handleDeleteBlog(post.id)} className="p-1.5 text-zinc-400 hover:text-red-600"><Trash2 size={16} /></button>
                              </div>
                            </div>
                          ))}
                          <button 
                            onClick={() => setEditingPost({ title: '', excerpt: '', content: '', tags: [], imageUrl: '' })}
                            className="w-full py-3 border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-400 hover:border-zinc-900 dark:hover:border-zinc-100 hover:text-zinc-900 dark:hover:text-zinc-100 transition-all flex items-center justify-center gap-2"
                          >
                            <Plus size={18} /> New Post
                          </button>
                          <button 
                            onClick={handleResetBlogs}
                            className="w-full py-2 text-[10px] uppercase tracking-widest text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
                          >
                            Reset to Defaults
                          </button>
                        </div>
                      </div>

                      <div className="lg:col-span-8">
                        <Card className="space-y-6">
                          <div className="space-y-2">
                            <label className="text-xs font-mono uppercase tracking-widest text-zinc-400">Title</label>
                            <input 
                              type="text" 
                              className="w-full px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100"
                              value={editingPost.title || ''}
                              onChange={(e) => setEditingPost({...editingPost, title: e.target.value})}
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-xs font-mono uppercase tracking-widest text-zinc-400">Excerpt</label>
                            <textarea 
                              className="w-full px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 h-20"
                              value={editingPost.excerpt || ''}
                              onChange={(e) => setEditingPost({...editingPost, excerpt: e.target.value})}
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-xs font-mono uppercase tracking-widest text-zinc-400">Hero Image (Optional)</label>
                            <div className="flex gap-2">
                              <input 
                                type="text" 
                                placeholder="URL or upload file ->"
                                className="flex-1 px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100"
                                value={editingPost.imageUrl || ''}
                                onChange={(e) => setEditingPost({...editingPost, imageUrl: e.target.value})}
                              />
                              <input 
                                type="file" 
                                accept="image/*"
                                className="hidden" 
                                id="blog-image-upload"
                                onChange={async (e) => {
                                  if (e.target.files && e.target.files[0]) {
                                    const url = await handleFileUpload(e.target.files[0]);
                                    if (url) setEditingPost({...editingPost, imageUrl: url});
                                  }
                                }}
                              />
                              <label 
                                htmlFor="blog-image-upload"
                                className="px-4 py-2 bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white rounded-lg cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors flex items-center justify-center"
                              >
                                Upload
                              </label>
                            </div>
                          </div>
                          <div className="space-y-2" data-color-mode={isDarkMode ? 'dark' : 'light'}>
                            <label className="text-xs font-mono uppercase tracking-widest text-zinc-400">Content (Markdown)</label>
                            <MDEditor
                              value={editingPost.content || ''}
                              onChange={(val) => setEditingPost({...editingPost, content: val || ''})}
                              height={400}
                              className="w-full rounded-lg border border-zinc-200 dark:border-zinc-800 focus-within:ring-2 focus-within:ring-zinc-900 dark:focus-within:ring-zinc-100"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-xs font-mono uppercase tracking-widest text-zinc-400">Tags (comma separated)</label>
                            <input 
                              type="text" 
                              className="w-full px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100"
                              value={Array.isArray(editingPost.tags) ? editingPost.tags.join(', ') : (editingPost.tags || '')}
                              onChange={(e) => setEditingPost({...editingPost, tags: e.target.value as any})}
                            />
                          </div>
                          <button 
                            onClick={handleSaveBlog}
                            className="w-full py-4 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-lg font-medium hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2"
                          >
                            <Save size={18} /> Save Blog Post
                          </button>
                        </Card>
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
            </motion.div>
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
              <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors">
                <Linkedin size={20} />
              </a>
              <a href={PERSONAL_INFO.github} target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors">
                <Github size={20} />
              </a>
              <a href={`mailto:${PERSONAL_INFO.email}`} className="text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors">
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>
      </footer>
      </div>
    </HelmetProvider>
  );
}
