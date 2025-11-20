import React, { useEffect, useRef } from 'react';

interface Props {
  imageUrl: string;
}

const DigitalPortrait: React.FC<Props> = ({ imageUrl }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = imageUrl;

    let gridPoints: { x: number, y: number, opacity: number }[] = [];
    const fontSize = 16;
    const chars = '01';
    let lastDrawTime = 0;
    const fpsInterval = 1000 / 15; // 15 FPS

    const initGrid = () => {
      if (!canvas || !ctx) return;
      
      // Ensure canvas dimensions match window
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      if (canvas.width === 0 || canvas.height === 0) return;
      if (!img.complete || img.naturalWidth === 0 || img.naturalHeight === 0) return;

      const cols = Math.ceil(canvas.width / fontSize);
      const rows = Math.ceil(canvas.height / fontSize);

      // Create offscreen canvas for pixel analysis
      const offCanvas = document.createElement('canvas');
      offCanvas.width = cols;
      offCanvas.height = rows;
      const offCtx = offCanvas.getContext('2d');

      if (!offCtx) return;

      // Calculate aspect ratios to cover the screen
      const imgAspect = img.naturalWidth / img.naturalHeight;
      const screenAspect = canvas.width / canvas.height;

      let drawW, drawH, drawX, drawY;

      if (screenAspect > imgAspect) {
        drawW = cols;
        drawH = cols / imgAspect;
        drawX = 0;
        drawY = (rows - drawH) / 2;
      } else {
        drawH = rows;
        drawW = rows * imgAspect;
        drawX = (cols - drawW) / 2;
        drawY = 0;
      }

      try {
        offCtx.drawImage(img, drawX, drawY, drawW, drawH);
        const imageData = offCtx.getImageData(0, 0, cols, rows);
        const pixels = imageData.data;

        gridPoints = [];
        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            const i = (r * cols + c) * 4;
            if (pixels[i + 3] > 0) { // Alpha check
              const brightness = (pixels[i] + pixels[i + 1] + pixels[i + 2]) / 3;
              if (brightness > 20) {
                gridPoints.push({
                  x: c * fontSize + fontSize / 2,
                  y: r * fontSize + fontSize / 2,
                  opacity: Math.min(0.2, (brightness / 255) * 0.25)
                });
              }
            }
          }
        }
      } catch (e) {
        // Silently fail if image data cannot be accessed (CORS etc)
        console.debug("DigitalPortrait: Image access restricted or failed.");
      }
    };

    const animate = (time: number) => {
      requestRef.current = requestAnimationFrame(animate);

      if (time - lastDrawTime < fpsInterval) return;
      lastDrawTime = time;

      if (!canvas || !ctx || canvas.width === 0 || canvas.height === 0) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.font = `bold ${fontSize}px monospace`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      // Render only if we have points
      if (gridPoints.length > 0) {
        for (const point of gridPoints) {
          // Optimization: Simple random check is faster than full math
          if (Math.random() > 0.1) {
             const char = chars[Math.random() > 0.5 ? 1 : 0];
             ctx.fillStyle = `rgba(0, 255, 0, ${point.opacity})`;
             ctx.fillText(char, point.x, point.y);
          }
        }
      }
    };

    const handleResize = () => {
      initGrid();
    };

    img.onload = () => {
      initGrid();
      requestRef.current = requestAnimationFrame(animate);
    };
    
    // If image is already cached
    if (img.complete) {
        initGrid();
        requestRef.current = requestAnimationFrame(animate);
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [imageUrl]);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none opacity-50"
    />
  );
};

export default DigitalPortrait;