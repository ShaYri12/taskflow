import ThemeToggle from '@/components/ThemeToggle';
import { Link, router, usePage } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';

interface User {
    id: number;
    name: string;
    email: string;
}

interface PageProps {
    auth: { user: User | null };
    [key: string]: unknown;
}

interface Props {
    children: React.ReactNode;
}

export default function AppLayout({ children }: Props) {
    const { auth } = usePage<PageProps>().props;
    const user = auth?.user ?? null;

    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    // Close user menu on outside click
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (
                menuRef.current &&
                !menuRef.current.contains(e.target as Node)
            ) {
                setUserMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    const logout = () => {
        setUserMenuOpen(false);
        router.post('/logout');
    };

    return (
        <div className="min-h-screen bg-gray-50 transition-colors dark:bg-gray-950">
            <header className="sticky top-0 z-50 border-b border-gray-200/70 bg-white/80 backdrop-blur-xl dark:border-gray-800/70 dark:bg-gray-950/80">
                <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
                    {/* Brand */}
                    <Link
                        href="/tasks"
                        className="flex items-center gap-2 sm:gap-3"
                    >
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-gray-900 to-gray-700 text-lg font-bold text-white shadow-md dark:from-white dark:to-gray-200 dark:text-gray-950">
                            T
                        </div>
                        <span className="text-xl font-bold">TaskFlow</span>
                    </Link>

                    <div className="flex items-center gap-2 sm:gap-3">
                        <ThemeToggle />

                        {user ? (
                            <>
                                {/* New Task */}
                                <Link
                                    href="/tasks/create"
                                    className="flex items-center gap-1 rounded-xl bg-gray-950 px-3 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800 sm:gap-2 sm:px-4 dark:bg-white dark:text-gray-950 dark:hover:bg-gray-200"
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
                                    <span className="hidden sm:inline-flex">
                                        Task
                                    </span>
                                </Link>

                                {/* User avatar + dropdown */}
                                <div className="relative" ref={menuRef}>
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setUserMenuOpen((o) => !o)
                                        }
                                        className="flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 bg-white text-sm font-semibold text-gray-700 transition hover:bg-gray-100 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800"
                                        aria-label="User menu"
                                        aria-expanded={userMenuOpen}
                                        aria-haspopup="true"
                                    >
                                        {user.name.charAt(0).toUpperCase()}
                                    </button>

                                    {userMenuOpen && (
                                        <div className="absolute right-0 mt-2 w-56 rounded-2xl border border-gray-200 bg-white py-1.5 shadow-xl dark:border-gray-800 dark:bg-gray-900">
                                            {/* User info header */}
                                            <div className="border-b border-gray-100 px-4 py-3 dark:border-gray-800">
                                                <p className="truncate text-sm font-semibold text-gray-900 dark:text-white">
                                                    {user.name}
                                                </p>
                                                <p className="truncate text-xs text-gray-500 dark:text-gray-400">
                                                    {user.email}
                                                </p>
                                            </div>

                                            {/* Profile link */}
                                            <Link
                                                href="/profile"
                                                onClick={() =>
                                                    setUserMenuOpen(false)
                                                }
                                                className="flex w-full items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 transition hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800"
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
                                                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                                    />
                                                </svg>
                                                Account settings
                                            </Link>

                                            <div className="my-1 border-t border-gray-100 dark:border-gray-800" />

                                            {/* Sign out */}
                                            <button
                                                type="button"
                                                onClick={logout}
                                                className="flex w-full items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 transition hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800"
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
                                                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                                    />
                                                </svg>
                                                Sign out
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </>
                        ) : (
                            /* Guest nav */
                            <div className="flex items-center gap-2">
                                <Link
                                    href="/login"
                                    className="rounded-xl px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                                >
                                    Sign in
                                </Link>
                                <Link
                                    href="/register"
                                    className="rounded-xl bg-gray-950 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800 dark:bg-white dark:text-gray-950 dark:hover:bg-gray-200"
                                >
                                    Get started
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </header>

            <main>{children}</main>
        </div>
    );
}
