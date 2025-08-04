import dynamic from "next/dynamic";
import { SectionId } from "../layout/Portfolio";

// クライアントコンポーネントを動的インポート（レイジーロード）
const TerminalOutput = dynamic(() => import("./client/TerminalOutput"), {
  ssr: false, // クライアントサイドでのみレンダリング
  loading: () => <TerminalOutputSkeleton />, // ローディング中に表示するスケルトン
});

const SectionNavigationButtons = dynamic(
  () => import("./client/SectionNavigationButtons"),
  {
    ssr: true, // SSRでプリレンダリング
  }
);

// スケルトンローディングコンポーネント
function TerminalOutputSkeleton() {
  return (
    <div
      className="terminal mx-auto mt-8 max-w-3xl md:mt-12 animate-pulse"
      aria-busy="true"
      aria-label="ターミナル出力をロード中"
    >
      <div className="terminal-header">
        <div className="terminal-dot red"></div>
        <div className="terminal-dot yellow"></div>
        <div className="terminal-dot green"></div>
        <span className="text-gray-400 text-sm ml-4">Loading...</span>
      </div>
      <div className="p-4 space-y-2 text-left">
        <div className="h-4 bg-gray-700 rounded w-3/4"></div>
        <div className="h-4 bg-gray-700 rounded w-1/2"></div>
        <div className="h-4 bg-gray-700 rounded w-5/6"></div>
        <div className="h-4 bg-gray-700 rounded w-2/3"></div>
      </div>
    </div>
  );
}

export default function HomeSection() {
  return (
    <div className="flex h-full w-full items-center justify-center p-4">
      <div className="mx-auto w-full max-w-4xl space-y-6 text-center md:space-y-8">
        <div className="space-y-4 md:space-y-6">
          <div className="inline-block">
            <div className="glass rounded-full px-4 py-2 neon-glow sm:px-6 sm:py-3">
              <span className="font-mono text-xs text-primary sm:text-sm">
                ● Available for hire
              </span>
            </div>
          </div>

          <div className="space-y-2 md:space-y-4">
            <h1 className="font-heading text-primary text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
              micci184
            </h1>
            <h2 className="text-3xl font-bold sm:text-4xl md:text-5xl lg:text-6xl">
              Full Stack Engineer
            </h2>
            <h3 className="text-xl font-semibold text-muted-foreground sm:text-2xl md:text-3xl">
              & Cloud Architect
            </h3>
            <p className="mx-auto max-w-2xl text-base text-foreground md:text-lg">
              Building scalable cloud solutions with cutting-edge technologies
            </p>
          </div>
        </div>

        <SectionNavigationButtons
          onSectionChange={(_section: SectionId) => {
            /* TODO: セクション切替ロジックを実装 */
          }}
        />

        <TerminalOutput />
      </div>
    </div>
  );
}
