
import React from 'react';
import { Project, Language } from '../types';
import { Lock, Globe, AlertTriangle, Wifi, WifiOff, Zap } from 'lucide-react';

interface Props {
  project: Project;
  lang: Language;
}

const ProjectCard: React.FC<Props> = ({ project, lang }) => {
  // Helper to determine status styles and icon
  const getStatusConfig = (status: string) => {
    const s = status.toLowerCase();
    if (s.includes('online') || s.includes('active') || s.includes('deployed') || s.includes('complete') || s.includes('broadcasting')) {
      return {
        color: 'text-green-500 border-green-500',
        bgColor: 'bg-green-500',
        icon: <Wifi className="w-3 h-3 animate-pulse" />
      };
    }
    if (s.includes('development') || s.includes('renovation')) {
      return {
        color: 'text-yellow-500 border-yellow-500',
        bgColor: 'bg-yellow-500',
        icon: <Zap className="w-3 h-3" />
      };
    }
    if (s.includes('lost') || s.includes('expired') || s.includes('offline') || s.includes('terminated')) {
      return {
        color: 'text-red-500 border-red-500',
        bgColor: 'bg-red-500',
        icon: <WifiOff className="w-3 h-3" />
      };
    }
    return {
      color: 'text-blue-400 border-blue-400',
      bgColor: 'bg-blue-400',
      icon: <AlertTriangle className="w-3 h-3" />
    };
  };

  const config = getStatusConfig(project.status);
  const isRestricted = project.status.toLowerCase().includes('classified');

  // Ensure valid link formatting
  const getLink = (link?: string) => {
    if (!link) return '#';
    if (link.startsWith('http') || link.startsWith('mailto')) return link;
    return `https://${link}`;
  };

  // Translation Helper for Status
  const getTranslatedStatus = (status: string) => {
    if (lang === 'en') return status;
    
    const map: Record<string, string> = {
      'SYSTEM_RENOVATION': 'システム改修中',
      'ACTIVE_NODE': 'アクティブ・ノード',
      'CONNECTION_LOST': '接続切断',
      'SYSTEM_ONLINE': 'システム稼働中',
      'IN_DEVELOPMENT': '開発中',
      'BOT_ACTIVE': 'ボット稼働中',
      'BROADCASTING': '放送中',
      'TASK_COMPLETE': 'タスク完了',
      'AWAITING_INPUT': '入力待ち'
    };
    return map[status] || status;
  };

  return (
    <div className={`border border-green-900/60 bg-black/80 hover:bg-green-900/10 transition-all duration-300 p-5 group relative overflow-hidden flex flex-col h-full backdrop-blur-sm hover:shadow-[0_0_15px_rgba(0,255,0,0.15)] hover:border-green-500/50`}>
        
        {/* Tech lines decorative background */}
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[linear-gradient(45deg,transparent_25%,rgba(0,255,0,0.1)_25%,rgba(0,255,0,0.1)_50%,transparent_50%,transparent_75%,rgba(0,255,0,0.1)_75%,rgba(0,255,0,0.1)_100%)] background-size-[4px_4px]"></div>

        {/* Corner accents */}
        <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-green-600 group-hover:border-green-400 transition-colors"></div>
        <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-green-600 group-hover:border-green-400 transition-colors"></div>
        <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-green-600 group-hover:border-green-400 transition-colors"></div>
        <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-green-600 group-hover:border-green-400 transition-colors"></div>

        {/* Header */}
        <div className="flex justify-between items-start mb-4 z-10">
            <h3 className="text-lg font-bold text-white font-retro tracking-widest group-hover:text-neon-green transition-colors">
                {project.title}
            </h3>
            <div className={`flex items-center gap-1.5 text-[10px] border px-1.5 py-0.5 font-mono uppercase tracking-wider ${config.color}`}>
                {config.icon}
                {getTranslatedStatus(project.status)}
            </div>
        </div>
        
        {/* Body */}
        <p className="text-green-400/80 text-sm mb-6 font-mono leading-relaxed z-10 flex-grow">
            {project.description}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mb-6 z-10">
            {project.tech.map(t => (
                <span key={t} className="text-[10px] text-green-300 bg-green-900/20 border border-green-900/30 px-2 py-1">
                  {t}
                </span>
            ))}
        </div>

        {/* Footer Actions */}
        <div className="mt-auto pt-4 border-t border-green-900/50 flex items-center justify-between z-10">
            <div className="text-[10px] text-green-800 font-mono">
               ID: {project.id.padStart(3, '0')}
            </div>
            
            {project.link && !isRestricted && (
                <a 
                  href={getLink(project.link)} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-green-500 hover:text-white hover:bg-green-900/50 px-3 py-1 text-xs flex items-center gap-2 border border-transparent hover:border-green-500 transition-all"
                >
                    <Globe className="w-3 h-3" /> {lang === 'en' ? 'ACCESS_NODE' : 'アクセス'}
                </a>
            )}
            
            {!project.link && !isRestricted && (
                <span className="text-gray-600 text-xs cursor-not-allowed flex items-center gap-1">
                    <Lock className="w-3 h-3" /> {lang === 'en' ? 'OFFLINE' : 'オフライン'}
                </span>
            )}
        </div>

        {/* Overlay for Classified/Restricted projects if needed in future */}
        {isRestricted && (
            <div className="absolute inset-0 bg-black/90 flex items-center justify-center flex-col z-20 backdrop-blur-sm border border-red-900/50 m-1">
                <Lock className="w-8 h-8 text-red-500 mb-2 animate-pulse" />
                <span className="text-red-500 font-retro text-xl tracking-widest">
                  {lang === 'en' ? 'RESTRICTED' : 'アクセス制限'}
                </span>
            </div>
        )}
    </div>
  );
};

export default ProjectCard;
