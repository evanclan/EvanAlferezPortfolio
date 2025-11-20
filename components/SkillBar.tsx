
import React from 'react';
import { Skill } from '../types';

const SkillBar: React.FC<{ skill: Skill }> = ({ skill }) => {
  // Generate a pseudo-random hex code based on the skill name for aesthetic
  const hexCode = `0x${skill.name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0).toString(16).toUpperCase()}`;

  return (
    <div className="relative overflow-hidden bg-green-900/10 border border-green-900/50 p-3 flex items-center justify-between hover:bg-green-900/30 hover:border-green-500/50 transition-all duration-300 group cursor-default">
      {/* Scanning line effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-green-500/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
      
      <div className="flex items-center gap-3 relative z-10">
        {/* Left accent bar */}
        <div className="w-0.5 h-full absolute left-0 top-0 bg-green-800 group-hover:bg-green-500 transition-colors"></div>
        
        <div className="flex flex-col">
          <span className="text-[10px] text-green-700 font-mono uppercase tracking-widest mb-0.5 group-hover:text-green-500 transition-colors">
            {skill.category}
          </span>
          <span className="text-green-300 font-mono font-bold text-sm group-hover:text-white tracking-wide flex items-center gap-2">
            {skill.name}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3 relative z-10">
        <span className="text-[10px] text-green-800 font-mono hidden sm:block group-hover:text-green-600">
          ADDR:{hexCode}
        </span>
        <div className="flex gap-0.5">
           <div className="w-1 h-1 bg-green-500/40 rounded-full group-hover:bg-green-400 group-hover:shadow-[0_0_4px_#0f0]"></div>
           <div className="w-1 h-1 bg-green-500/40 rounded-full group-hover:bg-green-400 group-hover:shadow-[0_0_4px_#0f0] delay-75"></div>
        </div>
      </div>
    </div>
  );
};

export default SkillBar;