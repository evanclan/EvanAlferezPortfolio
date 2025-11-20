
import React, { useState, useRef, useEffect } from 'react';
import { Command, Language } from '../types';
import { getGeminiResponse } from '../services/geminiService';
import { ArrowRight } from 'lucide-react';

interface Props {
  lang: Language;
}

const Terminal: React.FC<Props> = ({ lang }) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<Command[]>([]);
  const [isThinking, setIsThinking] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Initialize history from LocalStorage or default
  useEffect(() => {
    const savedHistory = localStorage.getItem('terminal_history');
    
    if (savedHistory) {
      try {
        const parsed = JSON.parse(savedHistory);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setHistory(parsed);
          return;
        }
      } catch (e) {
        console.error("Failed to parse history", e);
      }
    }

    const initMsg = lang === 'en' 
      ? 'System initialized. Welcome to Evan Alferez Portfolio. Type "help" for available commands.'
      : 'システム初期化完了。エヴァン・アルフェレスのポートフォリオへようこそ。コマンド一覧は "help" を入力してください。';
      
    setHistory([{ input: 'init', output: initMsg, type: 'system' }]);
  }, []); // Run once on mount to load storage

  // Save history to LocalStorage whenever it changes
  useEffect(() => {
    if (history.length > 0) {
      localStorage.setItem('terminal_history', JSON.stringify(history));
    }
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  // Handle Language switching updates for the latest system message only if it's the only message
  useEffect(() => {
    if (history.length === 1 && history[0].type === 'system') {
        const initMsg = lang === 'en' 
        ? 'System initialized. Welcome to Evan Alferez Portfolio. Type "help" for available commands.'
        : 'システム初期化完了。エヴァン・アルフェレスのポートフォリオへようこそ。コマンド一覧は "help" を入力してください。';
        setHistory([{ input: 'init', output: initMsg, type: 'system' }]);
    }
  }, [lang]);

  const handleCommand = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const cmd = input.trim().toLowerCase();
    const newHistory = [...history, { input: input, output: '', type: 'input' as const }];
    setInput('');
    
    let response: React.ReactNode = '';
    let type: Command['type'] = 'output';

    switch (cmd) {
      case 'help':
        response = lang === 'en' ? (
          <div className="grid grid-cols-1 gap-1 text-sm">
            <p>Available Commands:</p>
            <p className="pl-4"><span className="text-white">about</span> - Display user profile</p>
            <p className="pl-4"><span className="text-white">projects</span> - List confidential projects</p>
            <p className="pl-4"><span className="text-white">skills</span> - Analyze technical capabilities</p>
            <p className="pl-4"><span className="text-white">contact</span> - Establish communication uplink</p>
            <p className="pl-4"><span className="text-white">clear</span> - Clear terminal buffer</p>
            <p className="pl-4"><span className="text-white">ask &lt;query&gt;</span> - Query the AI Mainframe</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-1 text-sm">
            <p>利用可能なコマンド:</p>
            <p className="pl-4"><span className="text-white">about</span> - ユーザープロファイルを表示</p>
            <p className="pl-4"><span className="text-white">projects</span> - 機密プロジェクト一覧</p>
            <p className="pl-4"><span className="text-white">skills</span> - 技術能力の分析</p>
            <p className="pl-4"><span className="text-white">contact</span> - 通信アップリンクの確立</p>
            <p className="pl-4"><span className="text-white">clear</span> - ターミナルのクリア</p>
            <p className="pl-4"><span className="text-white">ask &lt;query&gt;</span> - AIメインフレームへの問い合わせ</p>
          </div>
        );
        break;
      case 'about':
        response = lang === 'en' 
          ? "Identity: Evan Alferez. Status: Senior Fullstack Engineer. Mission: Building scalable, secure, and aesthetic web interfaces."
          : "ID: エヴァン・アルフェレス。 ステータス: シニアフルスタックエンジニア。 任務: スケーラブルで安全、かつ美しいWebインターフェースの構築。";
        break;
      case 'clear':
        const resetMsg = lang === 'en' 
            ? 'Buffer cleared. System ready.'
            : 'バッファを消去しました。システム準備完了。';
        setHistory([{ input: 'clear', output: resetMsg, type: 'system' }]);
        localStorage.removeItem('terminal_history'); // Clear storage too
        return;
      case 'skills':
        response = lang === 'en'
          ? "Scanning neural net... [React, TypeScript, Node.js, Python, AWS, Docker, Cybersec Basics] detected."
          : "ニューラルネットスキャン中... [React, TypeScript, Node.js, Python, AWS, Docker, Cybersec Basics] を検出しました。";
        break;
      case 'projects':
        response = lang === 'en'
          ? "Accessing secured files... [Project_Alpha, Project_Onyx, Project_Void] found. Scroll down for details."
          : "機密ファイルにアクセス中... [Project_Alpha, Project_Onyx, Project_Void] が見つかりました。詳細は下へスクロールしてください。";
        break;
      case 'contact':
        response = lang === 'en'
          ? "Uplink available at: eoalferez@gmail.com // Transmission encrypted."
          : "アップリンク可能: eoalferez@gmail.com // 通信は暗号化されています。";
        break;
      default:
        if (cmd.startsWith('ask ')) {
          setIsThinking(true);
          setHistory(newHistory);
          const query = cmd.replace('ask ', '');
          try {
            const prompt = lang === 'jp' 
              ? `(Please answer in Japanese) ${query}` 
              : query;
            const aiResponse = await getGeminiResponse(prompt);
            setHistory(prev => [...prev, { input: '', output: aiResponse, type: 'output' }]);
          } catch (e) {
            setHistory(prev => [...prev, { input: '', output: lang === 'en' ? 'Error communicating with AI.' : 'AIとの通信エラー。', type: 'error' }]);
          } finally {
            setIsThinking(false);
          }
          return; // Early return handled by async logic
        }
        type = 'error';
        response = lang === 'en' 
          ? `Command '${cmd}' not recognized. Type 'help' for assistance.`
          : `コマンド '${cmd}' は認識されません。'help' で一覧を確認してください。`;
    }

    setHistory([...newHistory, { input: '', output: response, type }]);
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-10 border border-green-900 bg-black/90 shadow-[0_0_20px_rgba(0,255,0,0.2)] rounded-sm overflow-hidden font-mono text-sm md:text-base">
      <div className="bg-green-900/20 border-b border-green-900 p-2 flex justify-between items-center">
        <span className="text-green-400 text-xs">TERMINAL_V2.5.0 // {lang === 'en' ? 'ONLINE' : 'オンライン'} // MEMORY: ACTIVE</span>
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500 opacity-50"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500 opacity-50"></div>
          <div className="w-3 h-3 rounded-full bg-green-500 opacity-100 shadow-[0_0_8px_#0f0]"></div>
        </div>
      </div>
      
      <div className="p-4 h-96 overflow-y-auto font-mono space-y-2" onClick={() => document.getElementById('terminal-input')?.focus()}>
        {history.map((entry, idx) => (
          <div key={idx} className="break-words">
            {entry.type === 'input' && (
              <div className="flex items-center text-yellow-300">
                <span className="mr-2">root@EvanAlferez:~#</span>
                <span>{entry.input}</span>
              </div>
            )}
            {entry.output && (
              <div className={`ml-0 ${entry.type === 'error' ? 'text-red-500' : 'text-green-400'}`}>
                {entry.output}
              </div>
            )}
          </div>
        ))}
        {isThinking && (
           <div className="text-green-400 animate-pulse">
             {lang === 'en' ? 'Processing neural request...' : 'ニューラルリクエスト処理中...'}
           </div>
        )}
        <div ref={bottomRef}></div>
      </div>

      <form onSubmit={handleCommand} className="p-2 bg-gray-900/50 border-t border-green-900 flex items-center gap-2">
        <ArrowRight className="w-4 h-4 text-green-500" />
        <input 
          id="terminal-input"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 bg-transparent border-none outline-none text-green-300 placeholder-green-900 font-mono"
          placeholder={lang === 'en' ? "Enter command..." : "コマンドを入力..."}
          autoComplete="off"
        />
      </form>
    </div>
  );
};

export default Terminal;
