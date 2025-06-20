"use client";

import { useState, useEffect } from "react";

interface TerminalOutputProps {
  initialLines?: string[];
}

{isAnimationComplete && (
          <div className="flex items-center">
            <span className="text-primary-foreground dark:text-primary">$ </span>
            <div className="ml-2 h-4 w-2 animate-pulse bg-primary-foreground dark:bg-primary"></div>
          </div>
        )}
          setIsAnimationComplete(true);
        }
      }, cumulativeDelay);

      tids.push(id);
    });

    return () => {
      tids.forEach(clearTimeout);
    };
  }, [isSkipped]);

  const handleSkip = () => {
    setIsSkipped(true);
  };

  const getLineStyle = (line: string): string => {
    if (line.startsWith("$"))
      return "text-primary-foreground dark:text-primary";
    if (line.includes("Account:")) return "text-yellow-400";
    if (line.includes("Ready") || line.includes("nodes"))
      return "text-green-400";
    return "whitespace-pre-wrap break-words text-cyan-400";
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
            className="ml-auto mr-2 px-2 py-1 text-xs text-gray-400 hover:text-gray-200 transition-colors rounded"
            aria-label="アニメーションをスキップしてすべてのターミナル出力を表示"
          >
            ⏩ Skip
          </button>
        )}
      </div>
      <div className="p-4 space-y-2 text-left">
        {terminalLines.map((line, index) => (
          <div key={index} className="text-xs sm:text-sm">
            <span className={getLineStyle(line)}>{line}</span>
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
