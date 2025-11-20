
import React, { useState, useEffect } from 'react';
import SectionHeader from './SectionHeader';
import { Language } from '../types';
import { 
  Search, ExternalLink, Zap, Cpu, Image as ImageIcon, Video, Type, Mic, 
  ChevronLeft, ChevronRight, X, Play, Info, LayoutTemplate, 
  Crown, Briefcase, FileText, HeartHandshake, Users, Sparkles 
} from 'lucide-react';

interface Props {
  lang: Language;
}

interface Tool {
  id: string;
  name: string;
  category: 'TEXT' | 'IMAGE' | 'VIDEO' | 'AUDIO' | 'CODE' | 'PRODUCTIVITY';
  tags: string[];
  description: {
    en: string;
    jp: string;
  };
  laymanDesc: {
    en: string;
    jp: string;
  };
  howItWorks: {
    en: string;
    jp: string;
  };
  status: 'FREE' | 'PAID' | 'FREEMIUM';
  link: string;
  featured: boolean;
  youtubeId: string;
  recommendedFor: string[]; // IDs of Personas
}

interface Persona {
  id: string;
  name: string;
  role: { en: string; jp: string };
  icon: React.ReactNode;
  color: string;
}

const PERSONAS: Persona[] = [
  {
    id: 'sallie',
    name: 'Sallie',
    role: { en: 'The Boss', jp: '代表 / ボス' },
    icon: <Crown className="w-5 h-5" />,
    color: 'text-yellow-400'
  },
  {
    id: 'saki',
    name: 'Saki',
    role: { en: 'Chief Manager', jp: 'チーフマネージャー' },
    icon: <Briefcase className="w-5 h-5" />,
    color: 'text-blue-400'
  },
  {
    id: 'mariko',
    name: 'Mariko',
    role: { en: 'Secretary / Docs', jp: '秘書 / 書類管理' },
    icon: <FileText className="w-5 h-5" />,
    color: 'text-pink-400'
  },
  {
    id: 'natsuki',
    name: 'Natsuki',
    role: { en: 'HR / Relations', jp: '人事 / 渉外' },
    icon: <HeartHandshake className="w-5 h-5" />,
    color: 'text-purple-400'
  }
];

const TOOLS: Tool[] = [
  {
    id: 'claude-3-sonnet',
    name: 'Claude 3.5 Sonnet',
    category: 'TEXT',
    tags: ['Keigo / Writing', 'Summary', 'Coding'],
    description: { 
      en: 'The most natural AI for Japanese business writing and nuanced document creation.', 
      jp: '日本のビジネス文書や繊細なニュアンスの表現において、最も自然な日本語を生成するAI。' 
    },
    laymanDesc: {
      en: "If ChatGPT is a genius scholar, Claude is a skilled Japanese writer. It understands 'Keigo' (honorifics) and context better than others. Perfect for drafting emails to clients, summarizing messy meeting notes, or writing official reports.",
      jp: "ChatGPTが天才学者だとすれば、Claudeは熟練した日本のライターです。敬語や文脈を他よりも深く理解しています。クライアントへのメール作成、乱雑な会議メモの要約、公式レポートの執筆に最適です。"
    },
    howItWorks: {
      en: "1. Paste your rough notes or a rude draft.\n2. Ask: 'Rewrite this as a polite business email to a superior.'\n3. Claude will output perfectly formatted, tone-appropriate Japanese text.",
      jp: "1. 箇条書きのメモやラフな下書きを貼り付けます。\n2. 「これを上司宛の丁寧なビジネスメールとして書き直して」と指示します。\n3. ClaudeはTPOに合わせた完璧な日本語を出力します。"
    },
    status: 'FREEMIUM',
    link: 'https://claude.ai',
    featured: true,
    youtubeId: 'ODaQbK8tYF0',
    recommendedFor: ['mariko', 'saki', 'sallie']
  },
  {
    id: 'notta',
    name: 'Notta',
    category: 'AUDIO',
    tags: ['Meeting Minutes', 'Transcription', 'Efficiency'],
    description: { 
      en: 'AI automated transcription tool specialized for Japanese meetings (Gijiroku).', 
      jp: '日本の会議に特化したAI自動文字起こし・議事録作成ツール。' 
    },
    laymanDesc: {
      en: "The ultimate secretary tool. It listens to your Zoom/Teams meetings or real-life audio, identifies who is speaking, and writes down everything. It then summarizes the 'Action Items' and 'Decisions' automatically.",
      jp: "究極の秘書ツールです。Zoom/Teams会議や対面の音声を聴き取り、誰が話しているかを識別して全て書き起こします。さらに「決定事項」や「ネクストアクション」を自動で要約してくれます。"
    },
    howItWorks: {
      en: "1. Connect Notta to your Zoom/Google Meet.\n2. Let it record.\n3. After the meeting, click 'AI Summary' to get a formatted minute (Gijiroku) instantly.",
      jp: "1. NottaをZoomやGoogle Meetに接続（または録音開始）します。\n2. 会議をそのまま行います。\n3. 終了後、「AI要約」をクリックすると、整形された議事録が一瞬で完成します。"
    },
    status: 'FREEMIUM',
    link: 'https://www.notta.ai',
    featured: true,
    youtubeId: 'O3iE-B7Zq6o',
    recommendedFor: ['mariko', 'natsuki']
  },
  {
    id: 'gamma-app',
    name: 'Gamma',
    category: 'PRODUCTIVITY',
    tags: ['Presentations', 'Documents', 'Sales Decks'],
    description: { 
      en: 'AI-powered medium for generating presentations, memos, and briefs instantly.', 
      jp: 'プレゼンテーション、メモ、要約を即座に生成するAI搭載メディア。' 
    },
    laymanDesc: {
      en: "Imagine you have a professional designer sitting next to you. You give them a rough outline or a topic, and they instantly build a beautiful PowerPoint presentation with pictures and layouts tailored to your content.",
      jp: "プロのデザイナーが隣にいると想像してください。トピックや概要を伝えるだけで、美しいデザインとレイアウトのプレゼンテーション資料を瞬時に作成してくれます。"
    },
    howItWorks: {
      en: "1. Type your topic (e.g., 'Monthly Sales Report').\n2. Select 'Presentation'.\n3. Gamma generates an outline (which you can edit).\n4. Click 'Generate', and it builds all the slides with text and images in seconds.",
      jp: "1. トピックを入力します（例：「月次売上報告書」）。\n2. 「プレゼンテーション」を選択します。\n3. 自動生成されたアウトラインを確認・編集します。\n4. 「生成」をクリックすると、数秒でスライドが完成します。"
    },
    status: 'FREEMIUM',
    link: 'https://gamma.app',
    featured: true,
    youtubeId: 'h58FkXGZfPQ',
    recommendedFor: ['sallie', 'saki']
  },
  {
    id: 'canva-magic',
    name: 'Canva Magic Studio',
    category: 'IMAGE',
    tags: ['Design', 'Social Media', 'Flyers'],
    description: { 
      en: 'All-in-one design platform with generative AI for non-designers.', 
      jp: 'ノンデザイナー向けの生成AIを搭載したオールインワンデザインプラットフォーム。' 
    },
    laymanDesc: {
      en: "You don't need to be an artist. Just say 'Make an Instagram post about our summer sale', and it creates the layout, picks the colors, and writes the text. You can also expand images or erase background objects with one click.",
      jp: "アーティストである必要はありません。「サマーセールのインスタ投稿を作って」と言うだけで、レイアウト作成、色選び、テキスト執筆まで行います。ワンクリックで画像の背景を消したり、範囲を拡張したりもできます。"
    },
    howItWorks: {
      en: "1. Open Canva and select 'Magic Design'.\n2. Upload a photo of your product (optional).\n3. Describe what you want.\n4. It generates 4-5 template options for you to customize.",
      jp: "1. Canvaを開き「Magic Design」を選択します。\n2. 商品写真をアップロードします（任意）。\n3. 作りたいものを説明します。\n4. 4〜5つのテンプレート案が生成されるので、好きなものを選んで調整します。"
    },
    status: 'FREEMIUM',
    link: 'https://www.canva.com',
    featured: false,
    youtubeId: 'Vf60G5g6a3E',
    recommendedFor: ['natsuki', 'saki']
  },
  {
    id: 'perplexity',
    name: 'Perplexity',
    category: 'TEXT',
    tags: ['Research', 'Search', 'Citations'],
    description: { 
      en: 'Conversational answer engine that cites sources for reliability.', 
      jp: '信頼性のために情報源を引用する対話型回答エンジン。' 
    },
    laymanDesc: {
      en: "It's Google Search on steroids. Instead of giving you blue links to click on, it reads the websites for you and writes a summary answer, while showing you exactly where it found the information.",
      jp: "Google検索の超進化版です。リンクのリストを表示するのではなく、ウェブサイトを代わりに読んで要約を作成し、その情報の出典元を正確に示してくれます。"
    },
    howItWorks: {
      en: "1. Ask a question like 'What are the marketing trends for 2025?'.\n2. Read the summary.\n3. Click the small numbers (citations) to verify the source.",
      jp: "1. 「2025年のマーケティングトレンドは？」のように質問します。\n2. 要約を読みます。\n3. 小さな番号（引用）をクリックして、情報源を確認します。"
    },
    status: 'FREE',
    link: 'https://www.perplexity.ai',
    featured: false,
    youtubeId: '4C4aT6UvGg4',
    recommendedFor: ['sallie', 'mariko']
  },
  {
    id: 'chatgpt',
    name: 'ChatGPT 4o',
    category: 'TEXT',
    tags: ['General', 'Analysis', 'Brainstorming'],
    description: { 
      en: 'Omni-model capable of reasoning, voice, and complex analysis.', 
      jp: '推論、音声、複雑な分析が可能なオムニモデル。' 
    },
    laymanDesc: {
      en: "The best all-rounder. Great for brainstorming ideas, analyzing data in spreadsheets, or translating documents. It's less specialized than the others but can do a bit of everything.",
      jp: "最高のオールラウンダーです。アイデア出し、スプレッドシートのデータ分析、文書翻訳に最適です。他のツールほど特化していませんが、あらゆることを少しずつこなせます。"
    },
    howItWorks: {
      en: "1. Open the app.\n2. Talk to it like a colleague.\n3. Use it to check your thinking or get a second opinion on a plan.",
      jp: "1. アプリを開きます。\n2. 同僚のように話しかけます。\n3. 自分の考えを確認したり、計画に対するセカンドオピニオンを得るために使用します。"
    },
    status: 'FREEMIUM',
    link: 'https://chat.openai.com',
    featured: false,
    youtubeId: 'c2D3iOqK44w',
    recommendedFor: ['sallie', 'saki', 'mariko', 'natsuki']
  }
];

const CATEGORY_ICONS = {
  TEXT: <Type className="w-4 h-4" />,
  IMAGE: <ImageIcon className="w-4 h-4" />,
  VIDEO: <Video className="w-4 h-4" />,
  AUDIO: <Mic className="w-4 h-4" />,
  CODE: <Cpu className="w-4 h-4" />,
  PRODUCTIVITY: <LayoutTemplate className="w-4 h-4" />
};

// --- Component: Tool Modal ---
const ToolModal: React.FC<{ tool: Tool | null, onClose: () => void, lang: Language }> = ({ tool, onClose, lang }) => {
  if (!tool) return null;

  // Get recommended personas for this tool
  const recPersonas = PERSONAS.filter(p => tool.recommendedFor.includes(p.id));

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/90 backdrop-blur-md"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative bg-black border border-green-500 w-full max-w-6xl max-h-[90vh] overflow-y-auto md:overflow-hidden shadow-[0_0_50px_rgba(0,255,0,0.1)] flex flex-col md:flex-row rounded-sm animate-[scanline_0.2s_ease-out]">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-20 text-green-500 hover:text-white bg-black/50 p-2 rounded-full border border-green-900 hover:border-green-500 transition-all"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Left: Video/Visual */}
        <div className="w-full md:w-1/2 bg-green-900/5 border-r border-green-900/50 flex flex-col">
          <div className="aspect-video w-full bg-black relative group">
             <iframe 
               width="100%" 
               height="100%" 
               src={`https://www.youtube.com/embed/${tool.youtubeId}`} 
               title="YouTube video player" 
               frameBorder="0" 
               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
               allowFullScreen
               className="absolute inset-0"
             ></iframe>
          </div>
          <div className="p-6 hidden md:block flex-grow bg-[linear-gradient(45deg,transparent_25%,rgba(0,255,0,0.05)_25%,rgba(0,255,0,0.05)_50%,transparent_50%,transparent_75%,rgba(0,255,0,0.05)_75%,rgba(0,255,0,0.05)_100%)] background-size-[4px_4px]">
             
             {/* Recommendations in Modal */}
             {recPersonas.length > 0 && (
                <div className="mb-6">
                   <div className="text-[10px] text-green-600 font-mono mb-2 uppercase tracking-widest">
                     {lang === 'en' ? 'OPTIMIZED_FOR_PERSONNEL:' : '推奨担当者:'}
                   </div>
                   <div className="flex flex-wrap gap-2">
                     {recPersonas.map(p => (
                       <div key={p.id} className={`flex items-center gap-1.5 border border-green-900/50 px-2 py-1 rounded bg-black/50 ${p.color}`}>
                         {p.icon}
                         <span className="text-xs font-bold">{p.name}</span>
                       </div>
                     ))}
                   </div>
                </div>
             )}

             <div className="flex gap-2 flex-wrap mb-4">
               {tool.tags.map(tag => (
                 <span key={tag} className="text-xs font-mono text-green-300 bg-green-900/30 px-2 py-1 border border-green-900/50">
                   #{tag}
                 </span>
               ))}
             </div>
             <div className="text-green-800 text-xs font-mono">
               VIDEO_FEED_ID: {tool.youtubeId}<br/>
               STATUS: STREAM_ACTIVE
             </div>
          </div>
        </div>

        {/* Right: Info */}
        <div className="w-full md:w-1/2 p-8 flex flex-col overflow-y-auto scrollbar-hide">
          <div className="flex items-center gap-3 mb-2">
             <div className="p-2 bg-green-500/10 rounded border border-green-500/30">
                {CATEGORY_ICONS[tool.category]}
             </div>
             <span className="text-green-600 text-xs font-mono tracking-[0.2em] uppercase">
                {lang === 'en' ? 'SYSTEM_ANALYSIS' : 'システム分析'}
             </span>
          </div>

          <h2 className="text-3xl md:text-4xl font-retro text-white mb-6">
            {tool.name}
          </h2>

          <div className="space-y-8">
            <div>
              <h3 className="text-green-500 font-mono text-sm mb-2 flex items-center gap-2">
                <Info className="w-4 h-4" />
                {lang === 'en' ? "WHAT IS THIS? (THE LAYMAN'S TERMS)" : "概要（初心者向け説明）"}
              </h3>
              <p className="text-gray-300 leading-relaxed border-l-2 border-green-800 pl-4">
                {lang === 'en' ? tool.laymanDesc.en : tool.laymanDesc.jp}
              </p>
            </div>

            <div>
              <h3 className="text-green-500 font-mono text-sm mb-2 flex items-center gap-2">
                <Zap className="w-4 h-4" />
                {lang === 'en' ? "HOW IT WORKS (PROTOCOL)" : "使用手順 (プロトコル)"}
              </h3>
              <div className="text-gray-400 text-sm font-mono whitespace-pre-line bg-green-900/10 p-4 rounded border border-green-900/30">
                {lang === 'en' ? tool.howItWorks.en : tool.howItWorks.jp}
              </div>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-green-900/50 flex justify-between items-center">
             <div className="text-xs text-green-700 font-mono">
                ACCESS: {tool.status}
             </div>
             <a 
               href={tool.link} 
               target="_blank" 
               rel="noopener noreferrer"
               className="bg-green-600 text-black px-6 py-3 font-bold hover:bg-white transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(0,255,0,0.3)] hover:shadow-[0_0_25px_rgba(0,255,0,0.6)]"
             >
               {lang === 'en' ? 'LAUNCH TOOL' : 'ツールを起動'} <ExternalLink className="w-4 h-4" />
             </a>
          </div>

        </div>

      </div>
    </div>
  );
};

// --- Component: Featured Carousel ---
const FeaturedCarousel: React.FC<{ tools: Tool[], lang: Language, onSelect: (t: Tool) => void }> = ({ tools, lang, onSelect }) => {
  const [index, setIndex] = useState(0);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex(prev => (prev + 1) % tools.length);
    }, 8000); // Auto rotate every 8s
    return () => clearInterval(timer);
  }, [tools.length]);

  const next = () => setIndex(prev => (prev + 1) % tools.length);
  const prev = () => setIndex(prev => (prev - 1 + tools.length) % tools.length);
  
  const current = tools[index];

  return (
    <div className="mb-12 relative group">
       {/* Header Label */}
       <div className="flex items-center gap-2 mb-2">
          <div className="w-2 h-2 bg-green-500 animate-pulse rounded-full"></div>
          <span className="text-xs text-green-500 font-mono tracking-widest">
            {lang === 'en' ? 'WEEKLY_HIGHLIGHT // ADMIN_RECOMMENDED' : '今週のハイライト // 管理者推奨'}
          </span>
       </div>

       {/* Slide Content */}
       <div className="relative border border-green-500 bg-black/80 overflow-hidden h-[300px] md:h-[350px] flex flex-col md:flex-row">
          {/* Background Tech FX */}
          <div className="absolute inset-0 opacity-10 pointer-events-none bg-[linear-gradient(90deg,transparent_0%,rgba(0,255,0,0.2)_50%,transparent_100%)] animate-[shimmer_4s_infinite]"></div>
          
          {/* Left: Image/Thumb */}
          <div className="w-full md:w-7/12 relative bg-green-900/20 h-full overflow-hidden">
            <img 
              src={`https://img.youtube.com/vi/${current.youtubeId}/maxresdefault.jpg`} 
              alt={current.name}
              className="w-full h-full object-cover opacity-60 mix-blend-luminosity hover:mix-blend-normal transition-all duration-500 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-transparent md:via-black/20 md:to-black"></div>
            
            {/* Play Overlay */}
            <button 
              onClick={() => onSelect(current)}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black/50 border border-green-500 p-4 rounded-full text-green-500 hover:bg-green-500 hover:text-black transition-all hover:scale-110 z-10"
            >
               <Play className="w-8 h-8 fill-current" />
            </button>
          </div>

          {/* Right: Info */}
          <div className="w-full md:w-5/12 p-8 flex flex-col justify-center relative z-10 bg-gradient-to-b from-transparent to-black md:bg-none">
             <div className="flex items-center gap-2 mb-4">
               <span className="text-[10px] border border-green-500 text-green-500 px-2 py-0.5 uppercase">
                 {lang === 'en' ? 'FEATURED' : '注目'}
               </span>
               <span className="text-[10px] text-green-700 font-mono">
                 ID: {current.id}
               </span>
             </div>

             <h2 className="text-3xl md:text-4xl font-retro text-white mb-4 leading-none">
               {current.name}
             </h2>

             <p className="text-green-400/90 mb-6 text-sm md:text-base line-clamp-3">
               {lang === 'en' ? current.laymanDesc.en : current.laymanDesc.jp}
             </p>

             <button 
               onClick={() => onSelect(current)}
               className="self-start flex items-center gap-2 text-sm font-bold text-green-500 hover:text-white hover:translate-x-2 transition-all"
             >
               {lang === 'en' ? 'READ BRIEFING' : '詳細を確認'} <ChevronRight className="w-4 h-4" />
             </button>
          </div>

          {/* Navigation Controls */}
          <button onClick={prev} className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 text-white/50 hover:text-green-500 transition-colors">
            <ChevronLeft className="w-8 h-8" />
          </button>
          <button onClick={next} className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 text-white/50 hover:text-green-500 transition-colors">
            <ChevronRight className="w-8 h-8" />
          </button>
       </div>

       {/* Indicators */}
       <div className="flex gap-1 mt-2 justify-end">
         {tools.map((_, idx) => (
           <div 
             key={idx} 
             className={`h-1 transition-all duration-300 ${index === idx ? 'w-8 bg-green-500' : 'w-2 bg-green-900'}`}
           />
         ))}
       </div>
    </div>
  );
};

const AiTools: React.FC<Props> = ({ lang }) => {
  const [filter, setFilter] = useState('ALL');
  const [search, setSearch] = useState('');
  const [selectedPersona, setSelectedPersona] = useState<string | null>(null);
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);

  const filteredTools = TOOLS.filter(tool => {
    const matchesCategory = filter === 'ALL' || tool.category === filter;
    const matchesSearch = tool.name.toLowerCase().includes(search.toLowerCase()) || 
                          tool.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));
    const matchesPersona = selectedPersona ? tool.recommendedFor.includes(selectedPersona) : true;
    
    return matchesCategory && matchesSearch && matchesPersona;
  });

  const featuredTools = TOOLS.filter(t => t.featured);

  return (
    <div className="min-h-screen pt-32 px-6 max-w-6xl mx-auto pb-20">
      {/* Modal Layer */}
      {selectedTool && (
        <ToolModal tool={selectedTool} onClose={() => setSelectedTool(null)} lang={lang} />
      )}

      <div className="mb-12">
         <SectionHeader title={lang === 'en' ? "ADMIN_SUPPORT_CONSOLE" : "管理サポートコンソール"} />
         <p className="text-green-400/80 mb-8 font-mono border-l-2 border-green-500 pl-4 bg-black/40 p-2">
           {lang === 'en' 
             ? "Welcome to RaJA AI tools database, this page aims to introduce the admin of RaJA to the newest ai tools available right now, to improve productivity of work."
             : "RaJA AIツールデータベースへようこそ。このページは、業務生産性を向上させるための最新AIツールをRaJA管理部の皆様に紹介することを目的としています。"
           }
         </p>
      </div>

      {/* Featured Carousel */}
      {featuredTools.length > 0 && (
        <FeaturedCarousel tools={featuredTools} lang={lang} onSelect={setSelectedTool} />
      )}

      {/* Persona / Team Filter */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Users className="w-4 h-4 text-green-500" />
          <span className="text-xs text-green-500 font-mono tracking-widest uppercase">
            {lang === 'en' ? 'SELECT_OPERATOR // PERSONALIZED_ACCESS' : '担当者選択 // 推奨ツール'}
          </span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
           {PERSONAS.map(p => {
             const isSelected = selectedPersona === p.id;
             return (
               <button
                 key={p.id}
                 onClick={() => setSelectedPersona(isSelected ? null : p.id)}
                 className={`border relative overflow-hidden transition-all duration-300 p-4 text-left flex items-center gap-4 group ${
                    isSelected 
                      ? 'bg-green-900/30 border-green-500 shadow-[0_0_15px_rgba(0,255,0,0.2)]' 
                      : 'bg-black/50 border-green-900/50 hover:border-green-500/50 hover:bg-green-900/10'
                 }`}
               >
                  <div className={`p-2 rounded-full ${isSelected ? 'bg-black text-green-500' : 'bg-green-900/20 ' + p.color}`}>
                     {p.icon}
                  </div>
                  <div>
                    <div className={`font-retro text-xl leading-none mb-1 ${isSelected ? 'text-white' : 'text-gray-300'}`}>
                      {p.name}
                    </div>
                    <div className="text-[10px] font-mono text-green-600 uppercase">
                      {lang === 'en' ? p.role.en : p.role.jp}
                    </div>
                  </div>
                  
                  {/* Active Indicator */}
                  {isSelected && (
                    <div className="absolute top-2 right-2 w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_5px_#0f0]"></div>
                  )}
               </button>
             );
           })}
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-4 mb-8 items-center justify-between bg-green-900/10 p-4 border border-green-900/30 rounded sticky top-20 z-40 backdrop-blur-md">
        <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-hide">
          {['ALL', 'PRODUCTIVITY', 'TEXT', 'IMAGE', 'VIDEO', 'AUDIO'].map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-3 py-1 text-xs font-mono border transition-all whitespace-nowrap flex items-center gap-2 ${
                filter === cat 
                  ? 'bg-green-500 text-black border-green-500 font-bold' 
                  : 'bg-black/50 text-green-500 border-green-900 hover:border-green-500'
              }`}
            >
               {cat !== 'ALL' && CATEGORY_ICONS[cat as keyof typeof CATEGORY_ICONS]}
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-green-700" />
          <input 
            type="text" 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={lang === 'en' ? "SEARCH_DATABASE..." : "データベース検索..."}
            className="w-full bg-black border border-green-900 text-green-400 pl-10 pr-4 py-2 focus:outline-none focus:border-green-500 font-mono text-sm placeholder-green-900"
          />
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTools.map((tool) => {
          // Find which personas this tool is recommended for
          const recs = PERSONAS.filter(p => tool.recommendedFor.includes(p.id));
          
          return (
            <button 
              key={tool.id}
              onClick={() => setSelectedTool(tool)}
              className="text-left border border-green-900/50 bg-black/60 hover:bg-green-900/10 hover:border-green-500/50 transition-all duration-300 p-5 group relative overflow-hidden flex flex-col h-full w-full"
            >
              {/* Decorative corner */}
              <div className="absolute top-0 right-0 w-0 h-0 border-t-[20px] border-r-[20px] border-t-transparent border-r-green-900/50 group-hover:border-r-green-500 transition-colors"></div>

              <div className="flex justify-between items-start mb-3 w-full">
                <div className="flex items-center gap-2 text-green-500">
                  {CATEGORY_ICONS[tool.category]}
                  <span className="text-xs font-bold tracking-wider">{tool.category}</span>
                </div>
                <span className={`text-[10px] px-1.5 py-0.5 border ${
                  tool.status === 'PAID' ? 'border-yellow-600 text-yellow-600' : 'border-green-800 text-green-800'
                }`}>
                  {tool.status}
                </span>
              </div>

              <h3 className="text-xl font-retro text-white mb-2 group-hover:text-neon-green transition-colors">
                {tool.name}
              </h3>

              {/* Recommended Badges on Card */}
              {recs.length > 0 && (
                 <div className="flex flex-wrap gap-1 mb-3">
                    {recs.map(p => (
                      <div key={p.id} className={`flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded border border-white/10 bg-white/5 ${p.color}`}>
                         {p.icon} 
                         <span className="font-bold hidden sm:inline">{p.name}</span>
                      </div>
                    ))}
                 </div>
              )}

              {/* Tags */}
              <div className="flex flex-wrap gap-1 mb-3">
                {tool.tags.slice(0,3).map(tag => (
                  <span key={tag} className="text-[10px] text-green-700 bg-green-900/20 px-1">
                    {tag}
                  </span>
                ))}
              </div>

              <p className="text-green-400/70 text-sm mb-6 font-mono flex-grow line-clamp-3">
                {lang === 'en' ? tool.description.en : tool.description.jp}
              </p>

              <div className="mt-auto w-full border border-green-900 text-green-500 py-2 text-center text-xs font-mono hover:bg-green-500 hover:text-black transition-all flex items-center justify-center gap-2 group-hover:shadow-[0_0_10px_rgba(0,255,0,0.2)]">
                <Info className="w-3 h-3" />
                {lang === 'en' ? 'ACCESS_DETAILS' : '詳細アクセス'}
              </div>
            </button>
          );
        })}
      </div>

      {filteredTools.length === 0 && (
        <div className="text-center py-20 border border-green-900 border-dashed text-green-800 font-mono bg-black/40">
          <Sparkles className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>{lang === 'en' ? 'NO_MATCHING_PROTOCOLS_FOUND' : '一致するプロトコルが見つかりません'}</p>
          <button onClick={() => {setSelectedPersona(null); setFilter('ALL'); setSearch('')}} className="mt-4 text-green-500 hover:underline text-sm">
             {lang === 'en' ? 'RESET_FILTERS' : 'フィルターをリセット'}
          </button>
        </div>
      )}
    </div>
  );
};

export default AiTools;
