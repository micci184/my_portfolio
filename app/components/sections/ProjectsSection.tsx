import { Suspense } from 'react';
import { projects } from '@/app/data/projects';
import dynamic from 'next/dynamic';

// クライアントコンポーネントを動的にインポート
const ProjectsClient = dynamic(
  () => import('./client/ProjectsClient'),
  { ssr: true } // SSRを有効化
);

// ローディングコンポーネント
function ProjectsLoading() {
  return (
    <div className="w-full animate-pulse space-y-8">
      <div className="h-8 w-2/3 rounded bg-muted mx-auto"></div>
      <div className="grid grid-cols-1 gap-6 md:gap-8 lg:grid-cols-2">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="glass rounded-2xl overflow-hidden">
            <div className="h-48 bg-muted"></div>
            <div className="p-4 space-y-3">
              <div className="h-5 w-3/4 rounded bg-muted"></div>
              <div className="flex flex-wrap gap-2">
                {[1, 2, 3].map((j) => (
                  <div key={j} className="h-6 w-16 rounded-full bg-muted"></div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ProjectsSection() {
  return (
    <div className="flex h-full w-full items-center justify-center p-4 sm:p-6 md:p-8">
      <div className="mx-auto w-full max-w-7xl space-y-8">
        <h2 className="mb-8 text-center text-2xl font-bold md:mb-12 md:text-3xl lg:text-4xl">
          Featured Projects
        </h2>
        
        <Suspense fallback={<ProjectsLoading />}>
          {/* プロジェクトデータをサーバーからクライアントコンポーネントに渡す */}
          <ProjectsClient initialProjects={projects} />
        </Suspense>
      </div>
    </div>
  );
}
