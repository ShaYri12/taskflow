import { Link } from '@inertiajs/react';
import { useEffect, useState } from 'react';

interface Props {
    children: React.ReactNode;
}

export default function AppLayout({ children }: Props) {
    const [dark, setDark] = useState(false);

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');

        if (savedTheme === 'dark') {
            document.documentElement.classList.add('dark');
            setDark(true);
        }
    }, []);

    const toggleTheme = () => {
        const nextDark = !dark;

        setDark(nextDark);

        if (nextDark) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 transition-colors dark:bg-gray-950">
            <header className="sticky top-0 z-50 border-b border-gray-200/70 bg-white/80 backdrop-blur-xl dark:border-gray-800/70 dark:bg-gray-950/80">
                <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
                    <Link href="/tasks" className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-gray-900 to-gray-700 text-sm font-bold text-white shadow-md dark:from-white dark:to-gray-200 dark:text-gray-950">
                            T
                        </div>

                        <span className="font-logo text-xl font-bold">
                            TaskFlow
                        </span>
                    </Link>

                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            onClick={toggleTheme}
                            className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-600 transition hover:bg-gray-100 hover:text-gray-950 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
                            aria-label="Toggle theme"
                        >
                            {dark ? (
                                <svg
                                    className="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    className="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                                    />
                                </svg>
                            )}
                        </button>

                        <Link
                            href="/tasks/create"
                            className="flex items-center gap-2 rounded-xl bg-gray-950 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800 dark:bg-white dark:text-gray-950 dark:hover:bg-gray-200"
                        >
                            <svg
                                className="h-4 w-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 4v16m8-8H4"
                                />
                            </svg>
                            New{' '}
                            <span className="hidden sm:inline-flex">Task</span>
                        </Link>
                    </div>
                </div>
            </header>

            <main>{children}</main>
        </div>
    );
}
