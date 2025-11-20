
import React from 'react';
import { Activity, Database } from 'lucide-react';
import { Language } from '../types';

interface Props {
  name: string;
  index: number;
  lang: Language;
}

const AiModelStatus: React.FC<Props> = ({ name, index, lang }) => {
  // Simulate a random load percentage for the "live" feel
  const loadPercent = Math.floor(Math.random() * 15) + 85; // 85-99%
  
  return (
    <div className="border border-green-900/50 bg-black/60 p-4 flex items-center justify-between hover:border-green-500 hover:bg-green-900/10 transition-all duration-300 group relative overflow-hidden">
      {/* Background scan effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-green-500/5 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]"></div>

      <div className="flex items-center gap-4 relative z-10">
        <div className="p-2 bg-green-900/20 rounded group-hover:bg-green-500/20 transition-colors border border-green-900/50 group-hover:border-green-500/50">
          <Database className="w-5 h-5 text-green-600 group-hover:text-green-400 transition-colors" />
        </div>
        <div>
          <div className="text-[10px] text-green-700 font-mono mb-0.5 tracking-widest">
            NET_ID_{index.toString().padStart(2, '0')}
          </div>
          <div className="text-green-300 font-bold font-mono text-sm group-hover:text-white tracking-wide">
            {name}
          </div>
        </div>
      </div>
      
      <div className="text-right relative z-10 hidden sm:block">
        <div className="flex items-center gap-2 justify-end text-[10px] text-green-600 group-hover:text-green-400 mb-1">
           <Activity className="w-3 h-3" />
           <span>{lang === 'en' ? 'CAPACITY' : '負荷率'}: {loadPercent}%</span>
        </div>
        <div className="w-24 h-1 bg-green-900/30 rounded-full overflow-hidden">
          <div className="h-full bg-green-600 group-hover:bg-green-400 shadow-[0_0_5px_#0f0]" style={{ width: `${loadPercent}%` }}></div>
        </div>
      </div>
    </div>
  );
};

export default AiModelStatus;
