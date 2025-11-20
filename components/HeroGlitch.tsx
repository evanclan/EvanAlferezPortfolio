
import React, { useState, useEffect, useRef } from 'react';

const HeroGlitch: React.FC = () => {
  const [text, setText] = useState({ line1: '', line2: '' });
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    const phrases = [
      { l1: "WAKE UP,", l2: "VISITOR" },
      { l1: "目を覚ませ、", l2: "訪問者" }
    ];
    
    let loopIndex = 0;

    const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

    const runLoop = async () => {
      while (isMounted.current) {
        const current = phrases[loopIndex % phrases.length];
        
        // Type Line 1
        for (let i = 0; i <= current.l1.length; i++) {
          if (!isMounted.current) return;
          setText(prev => ({ ...prev, line1: current.l1.slice(0, i) }));
          await sleep(100);
        }
        
        // Type Line 2
        for (let i = 0; i <= current.l2.length; i++) {
          if (!isMounted.current) return;
          setText(prev => ({ ...prev, line2: current.l2.slice(0, i) }));
          await sleep(100);
        }

        await sleep(3000);

        // Delete Line 2
        for (let i = current.l2.length; i >= 0; i--) {
          if (!isMounted.current) return;
          setText(prev => ({ ...prev, line2: current.l2.slice(0, i) }));
          await sleep(50);
        }

        // Delete Line 1
        for (let i = current.l1.length; i >= 0; i--) {
          if (!isMounted.current) return;
          setText(prev => ({ ...prev, line1: current.l1.slice(0, i) }));
          await sleep(50);
        }
        
        await sleep(500);
        loopIndex++;
      }
    };

    runLoop();

    return () => {
      isMounted.current = false;
    };
  }, []);

  return (
    <h1 className="text-5xl md:text-7xl font-retro font-bold text-white mb-6 leading-tight min-h-[160px]">
      <span className="inline-block">
        {text.line1}
        {text.line1 && !text.line2 && <span className="animate-cursor-blink ml-1 inline-block w-3 h-8 bg-green-500 align-middle"></span>}
      </span>
      <br />
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-700 inline-block">
        {text.line2}
        {text.line2 && <span className="animate-cursor-blink ml-1 inline-block w-3 h-8 bg-green-500 align-middle"></span>}
      </span>
    </h1>
  );
};

export default HeroGlitch;
