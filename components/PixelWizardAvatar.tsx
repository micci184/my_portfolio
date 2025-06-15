export function PixelWizardAvatar({ size = 120 }: { size?: number }) {
  const pixelSize = Math.max(4, Math.floor(size / 16));

  // 16x16 pixel art pattern for cute wizard
  const pixels = [
    "0000000000000000", // Row 1
    "0000066666000000", // Row 2 - hat
    "0006666666600000", // Row 3 - hat
    "0066666666660000", // Row 4 - hat
    "0006666996600000", // Row 5 - hat with star
    "0000EEEEEE000000", // Row 6 - face
    "000EEEEEEEE00000", // Row 7 - face
    "00EE22EE22EE0000", // Row 8 - eyes
    "00EEEEEEEEEE0000", // Row 9 - face
    "00EE0E00E0EE0000", // Row 10 - nose and cheeks
    "00EEEE33EEEE0000", // Row 11 - mouth
    "000EEEEEEEE00000", // Row 12 - chin
    "0000EEEEEE000000", // Row 13 - chin
    "000AAAAAAAA00000", // Row 14 - robe
    "00AAAAAAAAA00000", // Row 15 - robe
    "0000000000000000", // Row 16
  ];

  const colorMap: { [key: string]: string } = {
    "0": "transparent",
    "2": "#1a1a1a", // black eyes
    "3": "#ef4444", // red mouth
    "6": "#3b82f6", // blue hat
    "9": "#fbbf24", // yellow star
    A: "#8b5cf6", // purple robe
    E: "#fef3c7", // skin
  };

  // CSSプロパティをオブジェクトとして定義
  const pixelArtStyle: React.CSSProperties = {
    width: size,
    height: size,
    imageRendering: "pixelated" as any,
  };

  return (
    <div className="relative inline-block pixel-art" style={pixelArtStyle}>
      <div
        className="grid relative"
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

      {/* Floating code symbols around the avatar */}
      <div className="absolute -top-2 -right-2 text-green-400 text-xs opacity-80 animate-pulse">
        &lt;/&gt;
      </div>
      <div className="absolute -bottom-1 -left-2 text-blue-400 text-xs opacity-80 animate-pulse delay-1000">
        {}
      </div>
      <div className="absolute top-2 -left-3 text-purple-400 text-xs opacity-80 animate-pulse delay-500">
        #
      </div>
    </div>
  );
}
