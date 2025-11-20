
import React from 'react';
import { Terminal as TerminalIcon, Code, Cpu, Mail } from 'lucide-react';
import { Project, Skill, Language } from '../types';
import DigitalPortrait from './DigitalPortrait';
import HeroGlitch from './HeroGlitch';
import Terminal from './Terminal';
import SectionHeader from './SectionHeader';
import SkillBar from './SkillBar';
import SnakeGame from './SnakeGame';
import AiModelStatus from './AiModelStatus';
import ProjectCard from './ProjectCard';

const USER_IMAGE_URL = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fit=crop&w=800&q=80";

interface HomeProps {
  lang: Language;
}

const skills: Skill[] = [
  { name: 'Next.js', category: 'FRAMEWORK' },
  { name: 'React', category: 'LIBRARY' },
  { name: 'Supabase', category: 'DATABASE' },
  { name: 'Google Cloud', category: 'INFRA' },
  { name: 'API Management', category: 'BACKEND' },
  { name: 'n8n', category: 'AUTOMATION' },
  { name: 'OpenAI API', category: 'AI_CORE' },
  { name: 'AI Automation', category: 'AGENTS' },
  { name: 'Adobe Suite', category: 'DESIGN' },
  { name: 'Video Creation', category: 'MEDIA' },
  { name: 'SNS Management', category: 'MARKETING' },
];

const additionalTools: Skill[] = [
  { name: 'After Effects', category: 'VFX_CORE' },
  { name: 'CapCut', category: 'FAST_EDIT' },
  { name: 'HeyGen', category: 'AI_AVATAR' },
  { name: 'Suno AI', category: 'AI_AUDIO' },
  { name: 'Canva', category: 'UI_DESIGN' },
  { name: 'n8n', category: 'AUTO_FLOW' },
  { name: 'Google Cloud', category: 'GCP_INFRA' },
  { name: 'API Manager', category: 'GATEWAY' },
];

const aiModels = [
  "Gemini 2.5",
  "OpenAI 5.1",
  "Wan 2.5",
  "Veo 3.1",
  "Nano Banana"
];

const projects: Project[] = [
  {
    id: '1',
    title: 'GURO_AKO_WEBSITE',
    description: 'A specialized platform for educators in the Philippines. Currently undergoing system architecture renovation.',
    tech: ['WordPress', 'Google Adsense'],
    status: 'SYSTEM_RENOVATION',
    link: 'https://www.guroako.com'
  },
  {
    id: '2',
    title: 'GURO_AKO_FB_NODE',
    description: 'Social aggregation node for Filipino teachers. Network size: 300k+ active units.',
    tech: ['Facebook Platform', 'Community Mgmt'],
    status: 'ACTIVE_NODE',
    link: 'https://www.facebook.com/mgakaguro.page/'
  },
  {
    id: '3',
    title: 'JP_BEST_PRODUCTS',
    description: 'E-commerce interface for Japanese commodities. Connection currently terminated.',
    tech: ['Wix', 'Amazon Affiliate'],
    status: 'CONNECTION_LOST',
    link: 'https://www.japanesebestproducts.com'
  },
  {
    id: '4',
    title: 'EVENT_TICKETING_SYS',
    description: 'Web-based ticketing mainframe with admin dashboard. Zero-bug deployment record on Ferry Event.',
    tech: ['React', 'Sender API', 'Supabase'],
    status: 'SYSTEM_ONLINE',
    link: 'https://raja-ticketing-s.vercel.app/'
  },
  {
    id: '5',
    title: 'PAYROLL_ATTENDANCE_GRID',
    description: 'Corporate attendance tracking with automated salary computation and RFID authentication protocols.',
    tech: ['Next.js', 'Supabase', 'n8n Automation'],
    status: 'IN_DEVELOPMENT',
    link: 'https://raja-attendance-s.vercel.app/'
  },
  {
    id: '6',
    title: 'INTL_SCHOOL_PORTAL',
    description: 'Digital presence for English conversation and private child education institution.',
    tech: ['WordPress', 'JetEngine', 'Elementor'],
    status: 'SYSTEM_ONLINE',
    link: 'https://www.raja-international.com'
  },
  {
    id: '7',
    title: 'STUDY_ABROAD_LINK',
    description: 'Support interface for Japanese students studying overseas. Global connectivity established.',
    tech: ['WordPress', 'JetEngine', 'Elementor'],
    status: 'SYSTEM_ONLINE',
    link: 'https://www.kaeruryugaku.com'
  },
  {
    id: '8',
    title: 'LINE_AI_AGENT',
    description: '24/7 Automated Inquiry Response System. Integrates LINE Messenger webhook with Gemini AI.',
    tech: ['LINE API', 'n8n', 'Gemini AI'],
    status: 'BOT_ACTIVE',
    link: 'https://line.me/R/ti/p/@488yxtwc'
  },
  {
    id: '9',
    title: 'GURO_AKO_MEDIA',
    description: 'Educational content distribution channel. Subscriber base: 200k+.',
    tech: ['YouTube Data API', 'Content Creation'],
    status: 'BROADCASTING',
    link: 'https://www.youtube.com/@guroakochannel5116'
  },
  {
    id: '10',
    title: 'AI_GENERATED_TRAINING',
    description: 'Synthetic media generation for corporate onboarding and training modules using advanced AI voice/video synthesis.',
    tech: ['Synthesia', 'ElevenLabs', 'HeyGen', 'NiM'],
    status: 'TASK_COMPLETE',
    link: 'mailto:eoalferez@gmail.com?subject=Request%20Sample%20AI%20Video'
  },
  {
    id: '11',
    title: 'ARCHIVE_ACCESS_REQUEST',
    description: 'Request access to additional classified projects or initiate collaboration.',
    tech: ['SMTP', 'Encrypted Channel'],
    status: 'AWAITING_INPUT',
    link: 'mailto:eoalferez@gmail.com'
  }
];

const TEXT = {
  en: {
    status: 'STATUS: ONLINE',
    hero_bio: 'I bridge the gap between AI automation and creative expression. Specialized in building autonomous systems, full-stack architectures, and digital media strategies. Operating with multilingual proficiency in Filipino, Japanese, and English.',
    btn_init: 'Initialize',
    btn_term: 'Terminal',
    stats: [
      { label: 'SKILLS', val: '20+' },
      { label: 'UPTIME', val: '99.9%' },
      { label: 'PROJECTS', val: '11' },
      { label: 'COFFEE', val: '∞' },
    ],
    headers: {
      skills: 'SYSTEM_MODULES',
      tools: 'EXTENDED_CAPABILITIES',
      projects: 'ARCHIVED_PROJECTS'
    },
    subheaders: {
      creative: 'CREATIVE_&_AUTOMATION_TOOLS',
      neural: 'NEURAL_NET_ARCHITECTURES'
    },
    ai_status: 'STATUS: MODELS_LOADED',
    contact: {
      title: 'ESTABLISH UPLINK',
      desc: 'Transmission channel open. Encrypted messaging enabled. Looking for collaboration on AI automation or web infrastructure?',
      btn: 'SEND_TRANSMISSION_>'
    }
  },
  jp: {
    status: 'ステータス: オンライン',
    hero_bio: 'AI自動化と創造的表現の架け橋。自律型システム、フルスタックアーキテクチャ、デジタルメディア戦略の構築に特化。フィリピン語、日本語、英語のマルチリンガルとして活動中。',
    btn_init: '初期化開始',
    btn_term: 'ターミナル',
    stats: [
      { label: 'スキル数', val: '20+' },
      { label: '稼働時間', val: '99.9%' },
      { label: '案件数', val: '11' },
      { label: 'コーヒー', val: '∞' },
    ],
    headers: {
      skills: 'システム・モジュール',
      tools: '拡張機能 / ツール',
      projects: 'アーカイブ案件'
    },
    subheaders: {
      creative: 'クリエイティブ & 自動化ツール',
      neural: 'ニューラルネット・アーキテクチャ'
    },
    ai_status: 'ステータス: モデル読込完了',
    contact: {
      title: '通信確立',
      desc: '送信チャンネル開放中。暗号化メッセージ有効。AI自動化やWebインフラに関するコラボレーションを募集中。',
      btn: '送信開始_>'
    },
  }
};

const Home: React.FC<HomeProps> = ({ lang }) => {
  const content = TEXT[lang];

  return (
    <>
      <DigitalPortrait imageUrl={USER_IMAGE_URL} />
      <div className="fixed inset-0 pointer-events-none z-20 scanlines"></div>
      <div className="fixed inset-0 pointer-events-none z-20 bg-[radial-gradient(circle_at_center,transparent_50%,rgba(0,0,0,0.4)_100%)]"></div>

      {/* Profile Section */}
      <section className="max-w-6xl mx-auto px-6 min-h-[60vh] flex flex-col justify-center mb-24 pt-32 relative z-50" id="profile">
        <div className="grid md:grid-cols-2 gap-12 items-center relative z-30">
          <div>
            <div className="inline-block border border-green-500 px-2 py-1 text-xs mb-4 text-green-400 bg-green-900/20">
              {content.status}
            </div>
            
            <HeroGlitch />

            <p className="text-lg text-green-400/80 mb-8 max-w-lg leading-relaxed border-l-2 border-green-500 pl-4 bg-black/50 backdrop-blur-sm p-4 rounded-r-sm">
              {content.hero_bio}
            </p>
            <div className="flex gap-4">
                <button onClick={() => document.getElementById('projects')?.scrollIntoView({behavior: 'smooth'})} className="bg-green-700 text-black px-6 py-3 font-bold hover:bg-green-500 transition-all uppercase tracking-wider flex items-center gap-2">
                  <Code className="w-4 h-4" /> {content.btn_init}
                </button>
                <button onClick={() => document.getElementById('uplink')?.scrollIntoView({behavior: 'smooth'})} className="border border-green-500 text-green-500 px-6 py-3 font-bold hover:bg-green-900/30 transition-all uppercase tracking-wider flex items-center gap-2 bg-black/50">
                  <TerminalIcon className="w-4 h-4" /> {content.btn_term}
                </button>
            </div>
          </div>
          
          <div className="hidden md:block">
            <Terminal lang={lang} />
          </div>
        </div>
      </section>

      {/* Stats Section - Full width background, constrained content */}
      <section className="w-full border-y border-green-900 py-8 bg-black/50 backdrop-blur-sm relative z-50 mb-32">
          <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-4">
            {content.stats.map((stat, i) => (
              <div key={i} className="text-center border-r border-green-900/30 last:border-none">
                <div className="text-3xl font-retro text-white mb-1">{stat.val}</div>
                <div className="text-xs text-green-600 tracking-widest">{stat.label}</div>
              </div>
            ))}
          </div>
      </section>

      {/* Wrapper for remaining content to keep it centered */}
      <div className="max-w-6xl mx-auto px-6 relative z-50">
        <section id="skills" className="mb-24">
          <SectionHeader title={content.headers.skills} />
          <div className="grid md:grid-cols-2 gap-12">
              <div className="bg-black/40 backdrop-blur-sm p-4 rounded border border-green-900/30">
                <p className="mb-6 text-green-400/90 leading-relaxed">
                  <Cpu className="inline w-5 h-5 mr-2 text-green-500" />
                  {lang === 'en' 
                    ? "Initialized drivers for AI integration, cloud infrastructure, and creative workflows. My stack is optimized for automation and scalability."
                    : "AI統合、クラウドインフラ、クリエイティブワークフローのドライバーを初期化完了。自動化と拡張性に最適化されたスタックを展開中。"
                  }
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {skills.map(s => <SkillBar key={s.name} skill={s} />)}
                </div>
              </div>
              
              <SnakeGame />

          </div>
        </section>

        <section className="mb-24">
            <SectionHeader title={content.headers.tools} />
            
            <div className="mb-12">
              <h3 className="text-green-400 font-mono text-sm mb-4 flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span> 
                {content.subheaders.creative}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  {additionalTools.map(tool => (
                    <SkillBar key={tool.name} skill={tool} />
                  ))}
              </div>
            </div>

            <div>
              <h3 className="text-green-400 font-mono text-sm mb-4 flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span> 
                {content.subheaders.neural}
              </h3>
              <div className="bg-black/40 border border-green-900/30 p-6 rounded backdrop-blur-sm relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 text-xs text-green-800 font-mono">
                    {content.ai_status}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 relative z-10">
                    {aiModels.map((model, idx) => (
                      <AiModelStatus key={model} name={model} index={idx} lang={lang} />
                    ))}
                  </div>
              </div>
            </div>
        </section>

        <section id="projects" className="mb-32">
          <SectionHeader title={content.headers.projects} />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map(p => <ProjectCard key={p.id} project={p} lang={lang} />)}
          </div>
        </section>

        <section id="uplink" className="mb-32 max-w-2xl mx-auto text-center">
            <div className="border border-green-500/30 p-12 bg-gradient-to-b from-green-900/10 to-black relative backdrop-blur-md">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-500 to-transparent"></div>
              
              <Mail className="w-12 h-12 text-green-500 mx-auto mb-6" />
              <h2 className="text-3xl font-retro text-white mb-4">{content.contact.title}</h2>
              <p className="text-green-400 mb-8">
                {content.contact.desc}
              </p>
              
              <a href="mailto:eoalferez@gmail.com" className="inline-block bg-green-600 text-black px-8 py-4 font-bold text-lg hover:bg-white hover:scale-105 transition-all duration-200 shadow-[0_0_20px_rgba(0,255,0,0.3)]">
                {content.contact.btn}
              </a>
            </div>
        </section>
      </div>
    </>
  );
};

export default Home;
