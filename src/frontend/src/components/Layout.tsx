import { Link, useRouterState } from '@tanstack/react-router';
import { StickyNote, CheckSquare, Heart } from 'lucide-react';

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouterState();
  const currentPath = router.location.pathname;

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 dark:from-purple-950 dark:via-pink-950 dark:to-blue-950">
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/70 dark:bg-gray-900/70 border-b border-pink-200/50 dark:border-pink-800/50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-400 to-purple-400 flex items-center justify-center shadow-lg">
                <Heart className="w-5 h-5 text-white fill-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
                Cute Notes
              </h1>
            </div>
            <nav className="flex gap-2">
              <Link
                to="/notes"
                className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-medium transition-all duration-300 ${
                  currentPath === '/' || currentPath === '/notes'
                    ? 'bg-gradient-to-r from-pink-400 to-purple-400 text-white shadow-lg shadow-pink-300/50 dark:shadow-pink-900/50'
                    : 'bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 hover:bg-pink-100 dark:hover:bg-pink-900/30 hover:shadow-md'
                }`}
              >
                <StickyNote className="w-4 h-4" />
                Notes
              </Link>
              <Link
                to="/todos"
                className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-medium transition-all duration-300 ${
                  currentPath === '/todos'
                    ? 'bg-gradient-to-r from-purple-400 to-blue-400 text-white shadow-lg shadow-purple-300/50 dark:shadow-purple-900/50'
                    : 'bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 hover:bg-purple-100 dark:hover:bg-purple-900/30 hover:shadow-md'
                }`}
              >
                <CheckSquare className="w-4 h-4" />
                To-Dos
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">{children}</main>

      <footer className="mt-16 py-6 border-t border-pink-200/50 dark:border-pink-800/50 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 text-center text-sm text-gray-600 dark:text-gray-400">
          <p className="flex items-center justify-center gap-2">
            Built with <Heart className="w-4 h-4 text-pink-500 fill-pink-500 animate-pulse" /> using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
                window.location.hostname
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-500 hover:text-purple-500 font-medium transition-colors"
            >
              caffeine.ai
            </a>
          </p>
          <p className="mt-1 text-xs">© {new Date().getFullYear()} Cute Notes</p>
        </div>
      </footer>
    </div>
  );
}
