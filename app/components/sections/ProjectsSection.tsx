// ProjectsSection.tsx - サーバーコンポーネント
// クライアントコンポーネントを遅延ロードするためのサーバーコンポーネントラッパー
import dynamic from 'next/dynamic';

// クライアントコンポーネントを動的にインポート
const ProjectsClient = dynamic(
  () => import('./client/ProjectsClient'),
  { ssr: false } // クライアント側でのみレンダリング
);

export function ProjectsSection() {
  return (
    <div className="flex h-full w-full items-center justify-center p-4 sm:p-6 md:p-8">
      <div className="mx-auto w-full max-w-7xl space-y-8">
        <h2 className="mb-8 text-center text-2xl font-bold md:mb-12 md:text-3xl lg:text-4xl">
          Featured Projects
        </h2>
        
        {/* クライアントコンポーネントをレンダリング */}
        <ProjectsClient />
      </div>
    </div>
  );
}