"use client";

import { useState, useEffect } from "react";

interface TerminalOutputProps {
  initialLines?: string[];
}

export default function TerminalOutput({
  initialLines = [],
}: TerminalOutputProps) {
  const [terminalLines, setTerminalLines] = useState<string[]>(initialLines);
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);
  const [isSkipped, setIsSkipped] = useState(false);

  useEffect(() => {
    // ターミナルに表示する行
    const lines = [
      "$ whoami",
      "micci184 - Full Stack Engineer & Cloud Architect",
      "$ cat skills.txt",
      "JavaScript, TypeScript, React, Node.js, AWS, GCP...",
      "$ aws sts get-caller-identity",
      "Account: ************ | Role: CloudArchitect",
      "$ kubectl get nodes",
      "Ready    3 nodes running in production",
      "$ terraform --version",
      "Terraform v1.6.0 on linux_amd64",
      "$ ls projects/",
      "3d-game-engine/ ai-assistant/ cloud-infrastructure/",
      "$ echo 'Ready to build scalable cloud solutions!'",
      "Ready to build scalable cloud solutions!",
      "$",
    ];

    if (isSkipped) {
      // スキップされた場合、すべての行を即座に表示
      setTerminalLines((prev) => [...prev, ...lines]);
      setIsAnimationComplete(true);
      return;
    }

    // アニメーション表示のための処理
    const tids: NodeJS.Timeout[] = [];
    let cumulativeDelay = 0;

    lines.forEach((line, index) => {
      // コンテンツに応じた可変間隔
      let delay = 700; // デフォルト
      if (line.startsWith("$")) {
        delay = 500; // コマンド入力は短め
      } else if (line.length > 40) {
        delay = 800; // 長い出力は長め
      }

      cumulativeDelay += delay;

      const id = setTimeout(() => {
        setTerminalLines((prev) => [...prev, line]);
        // 最後の行が表示されたらアニメーション完了フラグを設定
        if (index === lines.length - 1) {
          setIsAnimationComplete(true);
        }
      }, cumulativeDelay);

      tids.push(id);
    });

    // クリーンアップ関数
    return () => tids.forEach(clearTimeout);
  }, [isSkipped]);

  const handleSkip = () => {
    setIsSkipped(true);
  };

  return (
    <div className="terminal mx-auto mt-8 max-w-3xl md:mt-12">
      <div className="terminal-header">
        <div className="terminal-dot red"></div>
        <div className="terminal-dot yellow"></div>
        <div className="terminal-dot green"></div>
        <span className="text-gray-400 text-sm ml-4">
          micci184@cloud-workstation
        </span>
        {!isAnimationComplete && !isSkipped && (
          <button
            onClick={handleSkip}
            className="ml-auto mr-2 px-2 py-1 text-xs text-gray-400 hover:text-gray-200 transition-colors"
          >
            Skip
          </button>
        )}
      </div>
      <div className="p-4 space-y-2 text-left">
        {terminalLines.map((line, index) => (
          <div key={index} className="text-xs sm:text-sm">
            {line.startsWith("$") ? (
              <span className="text-primary-foreground dark:text-primary">
                {line}
              </span>
            ) : line.includes("Account:") ? (
              <span className="text-yellow-400">{line}</span>
            ) : line.includes("Ready") || line.includes("nodes") ? (
              <span className="text-green-400">{line}</span>
            ) : (
              <span className="whitespace-pre-wrap break-words text-cyan-400">
                {line}
              </span>
            )}
          </div>
        ))}
        <div className="flex items-center">
          <span className="text-primary-foreground dark:text-primary">$ </span>
          <div className="ml-2 h-4 w-2 animate-pulse bg-primary-foreground dark:bg-primary"></div>
        </div>
      </div>
    </div>
  );
}
