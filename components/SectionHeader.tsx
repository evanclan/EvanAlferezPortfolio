import React from 'react';

interface Props {
  title: string;
  id?: string;
}

const SectionHeader: React.FC<Props> = ({ title, id }) => {
  return (
    <div id={id} className="flex items-center gap-4 mb-8 mt-16 border-b border-green-900 pb-2">
      <span className="text-neon-green text-2xl font-retro">{`> ~/ROOT/${title}`}</span>
      <div className="flex-grow h-px bg-green-900/50"></div>
      <span className="text-xs text-green-700 font-mono">[R_ACCESS: GRANTED]</span>
    </div>
  );
};

export default SectionHeader;