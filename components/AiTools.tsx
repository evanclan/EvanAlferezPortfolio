
import React, { useState, useEffect } from 'react';
import SectionHeader from './SectionHeader';
import { Language } from '../types';
import { 
  Search, ExternalLink, Zap, Cpu, Image as ImageIcon, Video, Type, Mic, 
  ChevronLeft, ChevronRight, X, Play, Info, LayoutTemplate, 
  Crown, Briefcase, FileText, HeartHandshake, Users, Sparkles, ChessKing, Bug
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
    id: 'salliee',
    name: 'Salliee',
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
  },
  {
    id: 'shunsuke',
    name: 'Shunsuke',
    role: { en: 'The Master', jp: 'かえるマスター' },
    icon: <ChessKing className="w-5 h-5" />,
    color: 'text-green-400'
  },
  {
    id: 'evan',
    name: 'Evan',
    role: { en: 'Bug Hunter', jp: 'バグハンター' },
    icon: <Bug className="w-5 h-5" />,
    color: 'text-red-400'
  }
];

const TOOLS: Tool[] = [
  {
    id: 'claude 4',
    name: 'Claude AI',
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
    youtubeId: 'Lvx9fOJkZnc',
    recommendedFor: ['mariko', 'saki', 'salliee', 'shunsuke']
  },
  {
    id: 'm365-copilot',
    name: 'Microsoft 365 Copilot',
    category: 'PRODUCTIVITY',
    tags: ['Office', 'Word', 'Excel', 'PowerPoint'],
    description: { 
      en: 'AI assistant built into Word, Excel, PowerPoint, Outlook, and Teams for office work.',
      jp: 'Word・Excel・PowerPoint・Outlook・Teamsに組み込まれたオフィス向けAIアシスタント。' 
    },
    laymanDesc: {
      en: "It lives inside the tools you already use. You can ask, ‘Make a report from this data’, ‘Draft a reply email’, or ‘Turn this document into slides’, and it prepares the first draft for you.",
      jp: "いつも使っているWord・Excelなどの中にいるAIです。「このデータから報告書を作って」「このメールに返信文を作って」「この資料をスライドにして」などと頼むと、たたき台を作ってくれます。"
    },
    howItWorks: {
      en: "1. Open Word, Excel, or PowerPoint.\n2. Click the Copilot button.\n3. Type a request like ‘Summarize this document’ or ‘Create 5 slides from this text’.\n4. Review and edit the draft it generates.",
      jp: "1. WordやExcel、PowerPointを開きます。\n2. Copilotのボタンをクリックします。\n3. 「この文書を要約して」「この文章から5枚のスライドを作って」などと入力します。\n4. 生成されたたたき台を確認して、必要に応じて修正します。"
    },
    status: 'PAID',
    link: 'https://www.microsoft.com/ja-jp/microsoft-365/ai',
    featured: true,
    youtubeId: 'MNHaf2e33tg',
    recommendedFor: ['salliee', 'natsuki','mariko']
  },
  {
    id: 'notion-ai',
    name: 'Notion AI',
    category: 'PRODUCTIVITY',
    tags: ['Knowledge Base', 'Notes', 'Summarize'],
    description: { 
      en: 'AI features inside Notion for drafting, summarizing, and rewriting workspace documents.',
      jp: 'Notion内で文章作成・要約・書き直しを行えるAI機能。' 
    },
    laymanDesc: {
      en: "Think of it as a helper living inside your notebooks and wikis. It can turn messy meeting notes into clean minutes, or write the first draft of a blog or manual for you.",
      jp: "ノートや社内Wikiの中に住んでいる手伝い係のイメージです。ぐちゃぐちゃなメモをきれいな議事録にしたり、ブログやマニュアルのたたき台を書いてくれます。"
    },
    howItWorks: {
      en: "1. Open a Notion page.\n2. Type ‘/ai’ or click the AI button.\n3. Choose what you want (summarize, improve writing, translate, etc.).\n4. Adjust the result and save it on the page.",
      jp: "1. Notionのページを開きます。\n2. 「/ai」と入力するか、AIボタンを押します。\n3. 「要約」「文章を良くする」「翻訳」など、やりたいことを選びます。\n4. 出力結果を調整して、そのままページに保存します。"
    },
    status: 'FREEMIUM',
    link: 'https://www.notion.so/product/ai',
    featured: false,
    youtubeId: 'A9nIIX89Gno',
    recommendedFor: ['mariko', 'saki']
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
      en: "You don’t need to be an artist. Say ‘Make an Instagram post about our summer campaign’ and it suggests designs with text and colors. You can also erase backgrounds or expand images with one click.",
      jp: "絵が下手でも大丈夫です。「サマーキャンペーンのインスタ投稿を作って」と指示すると、デザイン案・色・文章まで提案してくれます。背景を消したり、画像を広げたりもワンクリックでできます。"
    },
    howItWorks: {
      en: "1. Open Canva and choose a design type (Instagram post, flyer, etc.).\n2. Click the Magic Design / AI tools.\n3. Describe what you want (theme, target, mood).\n4. Pick your favorite suggestion and edit text and colors.",
      jp: "1. Canvaを開き、インスタ投稿やチラシなど作りたいものを選びます。\n2. 「Magic Design」やAIツールをクリックします。\n3. テーマ・ターゲット・雰囲気などを文章で説明します。\n4. 提案されたデザインから気に入ったものを選び、文字や色を調整します。"
    },
    status: 'FREEMIUM',
    link: 'https://www.canva.com/ja_jp/',
    featured: true,
    youtubeId: 'MiHy29UiKTE',
    recommendedFor: ['saki', 'natsuki','mariko']
  },
  {
    id: 'midjourney',
    name: 'Midjourney',
    category: 'IMAGE',
    tags: ['Concept Art', 'Illustration', 'Logos'],
    description: { 
      en: 'Image generation tool that turns text prompts into detailed artwork.',
      jp: '文章から高品質なイラストや画像を生成する画像生成ツール。' 
    },
    laymanDesc: {
      en: "You type what you want to see, and it draws it for you. For example, ‘simple green frog logo, cute, for a study abroad company’ and it gives you several logo ideas.",
      jp: "見たいイメージを文章で書くと、その絵を描いてくれます。例えば「留学エージェント用の、シンプルでかわいい緑のカエルロゴ」と書くと、いくつもロゴ案を出してくれます。"
    },
    howItWorks: {
      en: "1. Join the Midjourney Discord server.\n2. Go to a ‘newbie’ channel.\n3. Type `/imagine` and then your description.\n4. Wait for the images, then upscale or make variations you like.",
      jp: "1. MidjourneyのDiscordサーバーに参加します。\n2. 「newbie」などのチャンネルを開きます。\n3. `/imagine` の後に作りたい画像の説明を書きます。\n4. 出てきた画像から気に入ったものをアップスケールしたり、バリエーションを作ったりします。"
    },
    status: 'PAID',
    link: 'https://www.midjourney.com',
    featured: false,
    youtubeId: 'KZ1wLoLPfrM',
    recommendedFor: ['salliee', 'saki']
  },
  {
    id: 'deepl-write',
    name: 'DeepL Write',
    category: 'TEXT',
    tags: ['Proofreading', 'Translation', 'Polish'],
    description: { 
      en: 'AI writing assistant that fixes grammar and improves style in Japanese and English.',
      jp: '日本語・英語の文法チェックや言い回し改善をしてくれるAIライティングアシスタント。' 
    },
    laymanDesc: {
      en: "You paste your sentence, and it rewrites it into natural, polite language. Very useful for fixing strange Japanese or English in emails and documents.",
      jp: "文章を貼り付けると、自然で丁寧な言い方に直してくれます。メールや資料の変な日本語・英語をきれいにしたいときにとても便利です。"
    },
    howItWorks: {
      en: "1. Open DeepL Write in your browser.\n2. Select the language (e.g. Japanese or English).\n3. Paste your text.\n4. Compare the suggestions and choose the version you like.",
      jp: "1. ブラウザでDeepL Writeを開きます。\n2. 言語（日本語・英語など）を選びます。\n3. 自分の文章を貼り付けます。\n4. 提案された文を見比べて、気に入ったものを選びます。"
    },
    status: 'FREEMIUM',
    link: 'https://www.deepl.com/write',
    featured: false,
    youtubeId: 'EeL9j1j0lX0',
    recommendedFor: ['mariko', 'saki','shunsuke','salliee']
  },
  {
    id: 'synthesia',
    name: 'Synthesia',
    category: 'VIDEO',
    tags: ['Training Video', 'Avatar', 'Announcements'],
    description: { 
      en: 'AI video platform that creates presenter-style videos from text using virtual avatars.',
      jp: 'テキストからバーチャルアバターが話す説明動画を作成できるAI動画プラットフォーム。' 
    },
    laymanDesc: {
      en: "You don’t need a camera or studio. You just write a script like a speech, choose a person avatar, and the system creates a video of that person talking in Japanese.",
      jp: "カメラもスタジオも不要です。話したい内容を文章で書いて、好みの人物アバターを選ぶと、その人が日本語で話している動画を自動で作ってくれます。"
    },
    howItWorks: {
      en: "1. Log in to Synthesia.\n2. Choose a template or a blank video.\n3. Select an avatar and language (Japanese).\n4. Paste your script and generate the video.",
      jp: "1. Synthesiaにログインします。\n2. テンプレートか白紙の動画を選びます。\n3. アバターと使用言語（日本語）を選びます。\n4. 台本となる文章を貼り付けて、動画を生成します。"
    },
    status: 'PAID',
    link: 'https://www.synthesia.io',
    featured: false,
    youtubeId: 'vVAz437kfDo',
    recommendedFor: ['salliee', 'evan']
  },
  {
    id: 'notta',
    name: 'Notta',
    category: 'AUDIO',
    tags: ['Transcription', 'Minutes', 'Meetings'],
    description: { 
      en: 'AI tool that transcribes and summarizes meetings in real time.',
      jp: '会議の内容をリアルタイムで文字起こし＆要約してくれるAIツール。' 
    },
    laymanDesc: {
      en: "During a meeting, it listens and turns speech into text automatically. After the meeting, you can quickly see who said what and check the important points without re-listening.",
      jp: "会議中の発言を自動で文字にしてくれます。会議後は「誰が何を言ったか」「大事なポイントは何か」を音声を聞き直さずにすぐ確認できます。"
    },
    howItWorks: {
      en: "1. Open Notta on your PC or phone.\n2. Start recording before the meeting begins.\n3. Let it run during the meeting.\n4. Afterward, read the transcript and use the auto summary.",
      jp: "1. パソコンやスマホでNottaを開きます。\n2. 会議が始まる前に録音を開始します。\n3. 会議中はそのまま動かしておきます。\n4. 終了後、文字起こしと自動要約を確認します。"
    },
    status: 'FREEMIUM',
    link: 'https://www.notta.ai/ja',
    featured: false,
    youtubeId: '6crd7RQkiWY',
    recommendedFor: ['mariko', 'saki','shunsuke','salliee', 'natsuki']
  },
  {
    id: 'ismartrecruit',
    name: 'iSmartRecruit',
    category: 'PRODUCTIVITY',
    tags: ['HR', 'Recruitment', 'ATS'],
    description: { 
      en: 'Applicant tracking system with AI-based resume matching and Japanese support.',
      jp: 'AIで応募者の経歴マッチングを行い、日本語にも対応した採用管理システム。' 
    },
    laymanDesc: {
      en: "It’s like a database for job candidates. You upload resumes, and it helps you find people who match the job, instead of reading every resume one by one.",
      jp: "応募者の情報をまとめて管理できるツールです。履歴書を登録しておくと、人事担当者が一枚一枚読む代わりに、条件に合いそうな人を探し出してくれます。"
    },
    howItWorks: {
      en: "1. Import resumes into the system.\n2. Set the job requirements (skills, experience, language, etc.).\n3. Let the system rank candidates.\n4. Check the top matches and proceed with interviews.",
      jp: "1. 応募者の履歴書をシステムに取り込みます。\n2. 求人条件（スキル・経験・言語など）を設定します。\n3. システムに候補者を自動でスコアリングさせます。\n4. 上位の候補者を確認し、面接などのステップに進みます。"
    },
    status: 'PAID',
    link: 'https://www.ismartrecruit.com',
    featured: false,
    youtubeId: 'MLpB_gDaKXs',
    recommendedFor: ['salliee', 'mariko', 'nastsuki']
  },
  {
    id: 'google-duet',
    name: 'Google Duet AI (Workspace)',
    category: 'PRODUCTIVITY',
    tags: ['Gmail', 'Docs', 'Sheets', 'Slides'],
    description: { 
      en: 'AI assistant across Google Workspace for writing, analysis, and image creation.',
      jp: 'Gmail・ドキュメント・スプレッドシート・スライドで文章作成や分析を手伝うAIアシスタント。' 
    },
    laymanDesc: {
      en: "It helps inside Gmail and Google Docs. You can ask it to write a draft email, summarize a long document, create sample data in Sheets, or generate images for slides.",
      jp: "GmailやGoogleドキュメントの中で手伝ってくれるAIです。メールの下書きを作ったり、長い文書を要約したり、スプレッドシートに例のデータを入れたり、スライド用の画像を作ったりできます。"
    },
    howItWorks: {
      en: "1. Open Gmail, Docs, or Sheets.\n2. Click the Duet AI (Help me write) button.\n3. Type what you want (e.g. ‘draft a polite reply’).\n4. Edit the suggested result and send or save it.",
      jp: "1. Gmailやドキュメント、スプレッドシートを開きます。\n2. Duet AI（「文章を作成」など）のボタンを押します。\n3. 「丁寧な返信文を作って」など、やってほしいことを入力します。\n4. 提案された文章を修正して、そのまま送信・保存します。"
    },
    status: 'PAID',
    link: 'https://workspace.google.com/intl/ja/products/duet-ai/',
    featured: false,
    youtubeId: 'sgzKqvjMUvQ',
    recommendedFor: ['mariko', 'natsuki','shunsuke','salliee']
  },
  {
    id: 'rimo-voice',
    name: 'Rimo Voice',
    category: 'AUDIO',
    tags: ['Meetings', 'Minutes', 'Summary'],
    description: { 
      en: 'Japanese-focused AI that joins online meetings to create minutes and summaries.',
      jp: 'オンライン会議に参加して自動で議事録や要約を作成してくれる日本発のAIツール。' 
    },
    laymanDesc: {
      en: "You invite a bot to your Zoom or online meeting. It listens quietly, writes down who said what, and later shows you a clean summary and action items.",
      jp: "Zoomなどのオンライン会議にボットを招待すると、静かに話を聞いて「誰が何を言ったか」を自動で記録し、あとからきれいな要約とToDoを見せてくれます。"
    },
    howItWorks: {
      en: "1. Schedule a meeting and add Rimo Voice bot.\n2. Start the meeting as usual.\n3. Let the bot stay from start to end.\n4. After the meeting, open Rimo and read the transcript and summary.",
      jp: "1. 会議を予約し、Rimo Voiceのボットを参加者に追加します。\n2. いつも通りオンライン会議を開始します。\n3. 会議の最初から最後までボットに参加させます。\n4. 終了後、Rimoの画面で文字起こしと要約を確認します。"
    },
    status: 'FREEMIUM',
    link: 'https://rimo.app',
    featured: false,
    youtubeId: 'Wwp7kXXwLsw',
    recommendedFor: ['mariko', 'saki','nastsuki']
  },
  {
    id: 'ideogram',
    name: 'Ideogram',
    category: 'IMAGE',
    tags: ['Logos', 'Posters', 'Text-in-Image'],
    description: { 
      en: 'Image generator that is especially good at pictures with text, such as logos and posters.',
      jp: 'ロゴやポスターなど、文字入りの画像生成が得意な画像生成AI。' 
    },
    laymanDesc: {
      en: "You tell it what kind of design you want, and it makes images with readable letters. For example, ‘Japanese title + simple logo for English school’ and it creates poster-style images.",
      jp: "欲しいデザインを説明すると、読める文字が入った画像を作ってくれます。例えば「英会話スクール用の日本語タイトル＋シンプルなロゴ」と書くと、ポスター風の画像をいくつも出してくれます。"
    },
    howItWorks: {
      en: "1. Sign up and log in to Ideogram.\n2. Type your prompt including the text you want in the image.\n3. Generate images and download the ones you like.\n4. Use them in flyers, SNS, or presentations.",
      jp: "1. Ideogramに登録・ログインします。\n2. 画像に入れたい文字も含めて、欲しいイメージを文章で入力します。\n3. 生成された画像から気に入ったものをダウンロードします。\n4. チラシ・SNS・プレゼン資料などに利用します。"
    },
    status: 'FREEMIUM',
    link: 'https://ideogram.ai',
    featured: false,
    youtubeId: 'J51POTfVnC8',
    recommendedFor: ['salliee', 'saki', 'evan']
  },
  {
    id: 'sakubun',
    name: 'SAKUBUN',
    category: 'TEXT',
    tags: ['Copywriting', 'Blogs', 'Japanese'],
    description: { 
      en: 'Japanese-first AI writing tool with many ready-made templates.',
      jp: '日本語向けテンプレートが豊富なAIライティングツール。' 
    },
    laymanDesc: {
      en: "You pick a template like ‘blog article’, ‘product description’, or ‘SNS post’, fill in a few keywords, and it writes a Japanese draft for you.",
      jp: "「ブログ記事」「商品説明」「SNS投稿」などのテンプレートを選び、キーワードを少し入れるだけで、日本語のたたき台文章を作ってくれます。"
    },
    howItWorks: {
      en: "1. Log in to SAKUBUN.\n2. Choose a template (blog, ad copy, SNS, etc.).\n3. Enter your product, service, or theme.\n4. Let it generate text and then edit it to match your brand.",
      jp: "1. SAKUBUNにログインします。\n2. 「ブログ」「広告文」「SNS」などのテンプレートを選びます。\n3. 商品名やサービス内容、テーマを入力します。\n4. 生成された文章を自社向けに少し調整して使います。"
    },
    status: 'FREEMIUM',
    link: 'https://sakubun.ai',
    featured: false,
    youtubeId: '9kGgHTcDCXs',
    recommendedFor: ['salliee', 'mariko', 'saki']
  },
  {
    id: 'felo',
    name: 'Felo',
    category: 'TEXT',
    tags: ['Search', 'Research', 'Mindmap'],
    description: { 
      en: 'Japan-born AI search engine that summarizes web results and creates outputs like slides or mind maps.',
      jp: '検索結果を要約し、スライドやマインドマップも作れる日本発のAI検索エンジン。' 
    },
    laymanDesc: {
      en: "Instead of just showing links, it reads the web for you and writes a clear summary. You can then ask it to turn that into a slide outline or a simple report.",
      jp: "リンクの一覧だけでなく、インターネットの記事を代わりに読んで、わかりやすい要約を作ってくれます。その内容から、スライドの構成や簡単なレポートも作成できます。"
    },
    howItWorks: {
      en: "1. Open Felo and type your question in Japanese.\n2. Read the AI summary and check the sources.\n3. Click options to make slides or a mind map from the result.\n4. Export or copy the text into your own document.",
      jp: "1. Feloを開き、日本語で知りたいことを入力します。\n2. AIが作った要約と、元になった情報源を確認します。\n3. 結果からスライド案やマインドマップを作成するボタンを押します。\n4. 出てきた内容を自分の資料にコピーして活用します。"
    },
    status: 'FREEMIUM',
    link: 'https://felo.ai',
    featured: false,
    youtubeId: 'mcTIuAmFUl4',
    recommendedFor: ['salliee', 'natsuki', 'mariko','shunsuke', 'saki']
  },
  {
    id: 'vrew',
    name: 'Vrew',
    category: 'VIDEO',
    tags: ['Subtitles', 'Editing', 'YouTube'],
    description: { 
      en: 'Video editing tool that automatically adds Japanese subtitles and cuts silence.',
      jp: '日本語の自動字幕や無音カットができる動画編集ツール。' 
    },
    laymanDesc: {
      en: "You drop in a video, and it automatically writes subtitles based on the voice. You just fix small mistakes instead of typing everything by hand.",
      jp: "動画を入れると、話している内容から自動で字幕を書いてくれます。あとは少し誤字を直すだけで、1から全部打ち込む必要がありません。"
    },
    howItWorks: {
      en: "1. Install and open Vrew.\n2. Import your video file.\n3. Let it auto-generate subtitles.\n4. Edit the text and export the video with subtitles.",
      jp: "1. Vrewをインストールして起動します。\n2. 動画ファイルを読み込みます。\n3. 自動字幕生成を実行します。\n4. 字幕の文字を調整して、字幕付き動画として書き出します。"
    },
    status: 'FREEMIUM',
    link: 'https://vrew.ai',
    featured: false,
    youtubeId: 'aR_bfHZ96QE',
    recommendedFor: ['natsuki', 'saki','evan']
  },
  {
    id: 'miitel',
    name: 'MiiTel',
    category: 'AUDIO',
    tags: ['Sales Calls', 'Voice Analysis', 'Call Center'],
    description: { 
      en: 'AI phone and meeting analysis tool that visualizes conversation quality.',
      jp: '電話やオンライン商談の会話内容を分析・可視化する音声解析AIツール。' 
    },
    laymanDesc: {
      en: "It records calls and shows easy-to-understand scores like ‘who talked too much’ or ‘pace of speaking’. Managers can see where to improve without listening to every call.",
      jp: "通話を録音し、「どちらが話しすぎか」「話す速さはどうか」などをわかりやすく数値で見せてくれます。上司は全ての通話を聞かなくても、改善ポイントを把握できます。"
    },
    howItWorks: {
      en: "1. Connect your phone or online meeting tool to MiiTel.\n2. Make calls or hold meetings as usual.\n3. After each call, check the dashboard for scores and key phrases.\n4. Use the feedback for training and coaching.",
      jp: "1. 電話やオンライン会議ツールをMiiTelと連携します。\n2. いつも通り電話や商談を行います。\n3. 通話後にダッシュボードでスコアや重要な発言箇所を確認します。\n4. その結果をもとにトレーニングや指導に活用します。"
    },
    status: 'PAID',
    link: 'https://miitel.com/jp',
    featured: false,
    youtubeId: 'FY7fHvcCsyU',
    recommendedFor: ['natsuki', 'mariko', 'saki']
  },
  {
    id: 'chatpdf',
    name: 'ChatPDF',
    category: 'TEXT',
    tags: ['PDF', 'Summary', 'Q&A'],
    description: { 
      en: 'Tool that lets you chat with PDF files and get summaries or answers.',
      jp: 'PDFファイルの内容について質問したり要約してもらえる対話型ツール。' 
    },
    laymanDesc: {
      en: "You upload a PDF, and then you can ask, ‘What are the main points?’ or ‘What does this page mean?’ It answers in simple Japanese so you don’t need to read every page.",
      jp: "PDFをアップロードすると、「大事なポイントは何？」「このページは何を言っている？」と質問でき、やさしい日本語で答えてくれます。全部のページを細かく読む必要がなくなります。"
    },
    howItWorks: {
      en: "1. Go to ChatPDF and upload your PDF.\n2. Wait for it to process.\n3. Ask questions in Japanese about the content.\n4. Read the answers and copy important parts into your notes.",
      jp: "1. ChatPDFのサイトを開き、PDFファイルをアップロードします。\n2. 処理が終わるのを待ちます。\n3. 内容について日本語で質問します。\n4. 返ってきた回答を読み、必要な部分を自分のメモにコピーします。"
    },
    status: 'FREEMIUM',
    link: 'https://www.chatpdf.com/ja',
    featured: false,
    youtubeId: 'mrg1Nej97Ik',
    recommendedFor: ['mariko', 'saki']
  },
  {
    id: 'ai-chatkun',
    name: 'AIチャットくん (LINE)',
    category: 'TEXT',
    tags: ['LINE', 'Chatbot', 'Everyday Help'],
    description: { 
      en: 'ChatGPT-style AI bot you can use directly in LINE.',
      jp: 'LINE上でそのまま使えるChatGPT風AIチャットボット。' 
    },
    laymanDesc: {
      en: "You just add it as a LINE friend. When you are on the train or at home, you can ask it to rewrite emails, translate, or explain something in simple Japanese.",
      jp: "LINEの友だちとして追加するだけで使えます。電車の中や家にいるときに、「メール文を直して」「翻訳して」「わかりやすく説明して」などと頼むことができます。"
    },
    howItWorks: {
      en: "1. Add the official AIチャットくん account on LINE.\n2. Open the chat and type your question or text.\n3. Ask what you want (rewrite, translate, summarize, etc.).\n4. Copy the answer into your email or document.",
      jp: "1. LINEで公式アカウント「AIチャットくん」を友だち追加します。\n2. トーク画面を開き、質問や文章を送ります。\n3. 「書き直して」「翻訳して」「要約して」など、やってほしいことを伝えます。\n4. 返ってきた文章をメールや資料にコピーして使います。"
    },
    status: 'FREEMIUM',
    link: 'https://picon-inc.com/ai-chat',
    featured: false,
    youtubeId: '0muxA4k6Wys',
    recommendedFor: ['mariko', 'saki', 'shunsuke', 'salliee']
  },
  {
    id: 'tegaki',
    name: 'Tegaki',
    category: 'TEXT',
    tags: ['Handwritten Forms', 'OCR', 'Back Office'],
    description: { 
      en: 'AI service that reads Japanese handwritten forms and turns them into digital data.',
      jp: '日本語の手書き帳票を読み取り、デジタルデータに変換するAI-OCRサービス。' 
    },
    laymanDesc: {
      en: "Instead of typing information from paper forms into Excel by hand, you scan them and the system reads most of the handwriting automatically.",
      jp: "紙の申込書などを見ながら、1行ずつExcelに手入力する代わりに、スキャンするだけで手書き文字をほとんど自動で読み取ってくれます。"
    },
    howItWorks: {
      en: "1. Scan or photograph handwritten forms.\n2. Upload the images to Tegaki.\n3. Let the system read and convert the characters.\n4. Export the data to CSV or connect it to your internal system.",
      jp: "1. 手書きの申込書やアンケートをスキャン、または写真で撮影します。\n2. 画像をTegakiにアップロードします。\n3. システムに文字を読み取らせ、データ化します。\n4. CSVとして出力したり、社内システムに連携させたりします。"
    },
    status: 'PAID',
    link: 'https://www.tegaki.ai',
    featured: false,
    youtubeId: 'LOrodhUpv3g',
    recommendedFor: ['salliee', 'mariko']
  },
  {
    id: 'perplexity',
    name: 'Perplexity',
    category: 'TEXT',
    tags: ['Research', 'Search', 'Citations'],
    description: { 
      en: 'Conversational answer engine that cites sources for reliability.',
      jp: '信頼性のために情報源を引用してくれる対話型回答エンジン。' 
    },
    laymanDesc: {
      en: "It feels like Google Search plus a smart assistant. Instead of only giving links, it reads websites for you and writes an easy summary, showing where each part came from.",
      jp: "Google検索と賢いアシスタントを合わせたような感じです。リンクを並べるだけでなく、サイトを代わりに読み、わかりやすい要約を書き、その内容がどのサイトから来たかも表示してくれます。"
    },
    howItWorks: {
      en: "1. Go to Perplexity.\n2. Ask a question like ‘Study abroad trends in Japan’.\n3. Read the summary answer.\n4. Click the small source marks to check the original pages.",
      jp: "1. Perplexityのサイトを開きます。\n2. 「日本の留学トレンドは？」のように質問します。\n3. 出てきた要約を読みます。\n4. 小さな出典マークをクリックして、元のページを確認します。"
    },
    status: 'FREE',
    link: 'https://www.perplexity.ai',
    featured: false,
    youtubeId: '4C4aT6UvGg4',
    recommendedFor: ['salliee', 'mariko', 'shunsuke', 'saki']
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
