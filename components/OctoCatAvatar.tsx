export function OctoCatAvatar({ size = 120 }: { size?: number }) {
  const pixelSize = Math.max(4, Math.floor(size / 16));

  // 16x16 pixel art pattern for OctoCat
  const pixels = [
    "0000000000000000", // Row 1
    "0000022222000000", // Row 2 - ears
    "0002222222220000", // Row 3 - head
    "0022222222222000", // Row 4 - head
    "0222333333332220", // Row 5 - face
    "0223444444432230", // Row 6 - face
    "0234555555534320", // Row 7 - face
    "0245666776654520", // Row 8 - eyes
    "0245555555554520", // Row 9 - face
    "0234555775534320", // Row 10 - nose
    "0234588885534320", // Row 11 - mouth
    "0023455554532300", // Row 12 - chin
    "2223333333332222", // Row 13 - tentacles start
    "2222333333322222", // Row 14 - tentacles
    "0222222222222220", // Row 15 - tentacles
    "0022220000222200", // Row 16 - tentacle ends
  ];

  const colorMap: { [key: string]: string } = {
    "0": "transparent",
    "2": "#24292e", // GitHub dark gray
    "3": "#586069", // Medium gray
    "4": "#6a737d", // Light gray
    "5": "#f6f8fa", // Very light gray/white
    "6": "#1a1a1a", // Black eyes
    "7": "#ffffff", // White eye highlights
    "8": "#e1306c", // Pink mouth
  };

  return (
    <div
      className="relative inline-block pixel-art group"
      style={{
        width: size,
        height: size,
        imageRendering: "pixelated",
        WebkitImageRendering: "pixelated",
        MozImageRendering: "crisp-edges",
      }}
    >
      <div
        className="grid relative transition-transform duration-300 group-hover:scale-110"
        style={{
          gridTemplateColumns: `repeat(16, ${pixelSize}px)`,
          gridTemplateRows: `repeat(16, ${pixelSize}px)`,
          width: pixelSize * 16,
          height: pixelSize * 16,
        }}
      >
        {pixels.map((row, rowIndex) =>
          row.split("").map((pixel, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              style={{
                backgroundColor: colorMap[pixel],
                width: pixelSize,
                height: pixelSize,
              }}
            />
          ))
        )}
      </div>

      {/* Floating git commands around the avatar */}
      <div className="absolute -top-3 -right-4 text-green-400 text-xs opacity-70 animate-pulse font-mono">
        git push
      </div>
      <div className="absolute -bottom-2 -left-4 text-blue-400 text-xs opacity-70 animate-pulse delay-1000 font-mono">
        npm run
      </div>
      <div className="absolute top-3 -left-5 text-purple-400 text-xs opacity-70 animate-pulse delay-500 font-mono">
        yarn dev
      </div>
      <div className="absolute -top-1 left-1/2 text-orange-400 text-xs opacity-70 animate-pulse delay-700 font-mono">
        docker
      </div>

      {/* Hover effect particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-green-400 rounded-full opacity-0 group-hover:opacity-100 animate-ping"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 200}ms`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
