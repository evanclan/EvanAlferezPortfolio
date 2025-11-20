
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Play, RefreshCw, Keyboard } from 'lucide-react';

const GRID_SIZE = 20;
const SPEED = 100;

type Point = { x: number, y: number };

const SnakeGame: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Game State
  const [snake, setSnake] = useState<Point[]>([{ x: 10, y: 10 }]);
  const [food, setFood] = useState<Point>({ x: 15, y: 5 });
  const [direction, setDirection] = useState<Point>({ x: 1, y: 0 });
  const [nextDirection, setNextDirection] = useState<Point>({ x: 1, y: 0 }); // Buffer for rapid key presses
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [highScore, setHighScore] = useState(0);

  // Refs for game loop to avoid closure staleness
  const snakeRef = useRef(snake);
  const directionRef = useRef(direction);
  const nextDirectionRef = useRef(nextDirection);
  const foodRef = useRef(food);
  const isPlayingRef = useRef(isPlaying);
  const gameLoopRef = useRef<number | null>(null);

  // Sync refs with state
  useEffect(() => { snakeRef.current = snake; }, [snake]);
  useEffect(() => { directionRef.current = direction; }, [direction]);
  useEffect(() => { nextDirectionRef.current = nextDirection; }, [nextDirection]);
  useEffect(() => { foodRef.current = food; }, [food]);
  useEffect(() => { isPlayingRef.current = isPlaying; }, [isPlaying]);

  const spawnFood = () => {
    const newFood = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE)
    };
    // Prevent spawning on snake
    const isOnSnake = snakeRef.current.some(seg => seg.x === newFood.x && seg.y === newFood.y);
    if (isOnSnake) return spawnFood();
    setFood(newFood);
  };

  const resetGame = () => {
    setSnake([{ x: 10, y: 10 }]);
    setDirection({ x: 1, y: 0 });
    setNextDirection({ x: 1, y: 0 });
    setScore(0);
    setGameOver(false);
    setIsPlaying(true);
    spawnFood();
    // Focus the container to capture keys immediately
    containerRef.current?.focus();
  };

  const moveSnake = useCallback(() => {
    if (!isPlayingRef.current) return;

    const currentHead = snakeRef.current[0];
    const currentDir = nextDirectionRef.current;
    
    // Update actual direction from buffer
    setDirection(currentDir);

    const newHead = {
      x: currentHead.x + currentDir.x,
      y: currentHead.y + currentDir.y
    };

    // Check Wall Collision
    if (
      newHead.x < 0 || 
      newHead.x >= GRID_SIZE || 
      newHead.y < 0 || 
      newHead.y >= GRID_SIZE
    ) {
      handleGameOver();
      return;
    }

    // Check Self Collision
    if (snakeRef.current.some(seg => seg.x === newHead.x && seg.y === newHead.y)) {
      handleGameOver();
      return;
    }

    const newSnake = [newHead, ...snakeRef.current];
    
    // Check Food Collision
    if (newHead.x === foodRef.current.x && newHead.y === foodRef.current.y) {
      setScore(s => s + 10);
      spawnFood();
    } else {
      newSnake.pop(); // Remove tail if not eating
    }

    setSnake(newSnake);
  }, []);

  const handleGameOver = () => {
    setGameOver(true);
    setIsPlaying(false);
    if (score > highScore) setHighScore(score);
    if (gameLoopRef.current) clearInterval(gameLoopRef.current);
  };

  // Input Handling
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent default scrolling for arrow keys if game is focused or playing
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " "].includes(e.key)) {
        e.preventDefault();
      }

      if (gameOver && e.key === 'Enter') {
        resetGame();
        return;
      }

      if (!isPlaying && !gameOver && (e.key === 'Enter' || e.key === ' ')) {
        resetGame();
        return;
      }

      const currentDir = directionRef.current;
      
      switch (e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          if (currentDir.y === 0) setNextDirection({ x: 0, y: -1 });
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          if (currentDir.y === 0) setNextDirection({ x: 0, y: 1 });
          break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
          if (currentDir.x === 0) setNextDirection({ x: -1, y: 0 });
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          if (currentDir.x === 0) setNextDirection({ x: 1, y: 0 });
          break;
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      if (container) container.removeEventListener('keydown', handleKeyDown);
    };
  }, [gameOver, isPlaying, score, highScore]);

  // Game Loop
  useEffect(() => {
    if (isPlaying) {
      gameLoopRef.current = window.setInterval(moveSnake, SPEED);
    } else if (gameLoopRef.current) {
      clearInterval(gameLoopRef.current);
    }
    return () => {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    };
  }, [isPlaying, moveSnake]);

  // Rendering
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const cellSize = canvas.width / GRID_SIZE;

    // Clear
    ctx.fillStyle = '#000000'; // Black background
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Grid lines (subtle)
    ctx.strokeStyle = '#003300';
    ctx.lineWidth = 1;
    for (let i = 0; i <= GRID_SIZE; i++) {
      ctx.beginPath();
      ctx.moveTo(i * cellSize, 0);
      ctx.lineTo(i * cellSize, canvas.height);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, i * cellSize);
      ctx.lineTo(canvas.width, i * cellSize);
      ctx.stroke();
    }

    // Draw Snake
    ctx.fillStyle = '#0f0'; // Neon Green
    ctx.shadowBlur = 10;
    ctx.shadowColor = '#0f0';
    snake.forEach((seg, i) => {
      // Head is slightly brighter/different?
      ctx.fillStyle = i === 0 ? '#ccffcc' : '#0f0';
      ctx.fillRect(seg.x * cellSize + 1, seg.y * cellSize + 1, cellSize - 2, cellSize - 2);
    });
    ctx.shadowBlur = 0;

    // Draw Food
    ctx.fillStyle = '#0f0';
    ctx.shadowBlur = 15;
    ctx.shadowColor = '#0f0';
    // Pulse effect for food
    const pulse = Math.sin(Date.now() / 200) * 2 + 2;
    ctx.fillRect(
      food.x * cellSize + pulse, 
      food.y * cellSize + pulse, 
      cellSize - (pulse * 2), 
      cellSize - (pulse * 2)
    );
    ctx.shadowBlur = 0;

  }, [snake, food]);

  return (
    <div 
      ref={containerRef}
      tabIndex={0}
      className="relative border border-green-900 bg-black/80 h-full min-h-[300px] w-full flex flex-col outline-none ring-1 ring-transparent focus:ring-green-500/50 transition-all group hidden md:flex"
    >
       {/* Header */}
       <div className="flex justify-between items-center border-b border-green-900/50 p-2 bg-green-900/20">
         <span className="text-xs text-green-500 font-bold tracking-widest">SNAKE_V1.0.EXE</span>
         <div className="flex gap-4 text-[10px] font-mono text-green-400">
           <span>SCORE: {score.toString().padStart(4, '0')}</span>
           <span>HI: {highScore.toString().padStart(4, '0')}</span>
         </div>
       </div>

       {/* Game Canvas */}
       <div className="flex-grow relative p-4 flex items-center justify-center">
          <canvas 
            ref={canvasRef}
            width={400}
            height={400}
            className="w-full h-full object-contain border border-green-900/30 bg-black pixelated"
          />

          {/* Start Overlay */}
          {!isPlaying && !gameOver && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 z-10">
               <Keyboard className="w-12 h-12 text-green-500 mb-4 animate-pulse" />
               <h3 className="text-green-400 font-retro text-2xl mb-2 tracking-widest">READY?</h3>
               <button 
                 onClick={resetGame}
                 className="px-6 py-2 border border-green-500 text-green-500 hover:bg-green-500 hover:text-black transition-colors font-mono text-sm flex items-center gap-2"
               >
                 <Play className="w-4 h-4" /> INITIALIZE
               </button>
               <p className="mt-4 text-[10px] text-green-700">USE ARROW KEYS TO NAVIGATE</p>
            </div>
          )}

          {/* Game Over Overlay */}
          {gameOver && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/90 z-10">
               <h3 className="text-red-500 font-retro text-4xl mb-2 tracking-widest animate-pulse">GAME OVER</h3>
               <p className="text-green-400 font-mono mb-6">FINAL_SCORE: {score}</p>
               <button 
                 onClick={resetGame}
                 className="px-6 py-2 border border-green-500 text-green-500 hover:bg-green-500 hover:text-black transition-colors font-mono text-sm flex items-center gap-2"
               >
                 <RefreshCw className="w-4 h-4" /> RETRY
               </button>
            </div>
          )}
       </div>
    </div>
  );
};

export default SnakeGame;
