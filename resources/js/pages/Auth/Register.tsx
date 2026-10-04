import ThemeToggle from '@/components/ThemeToggle';
import { Link, useForm } from '@inertiajs/react';
import type { FormEvent } from 'react';

export default function Register() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e: FormEvent) => {
        e.preventDefault();
        post('/register');
    };

    return (
        <div className="relative flex min-h-screen items-center justify-center bg-gray-50 px-4 dark:bg-gray-950">
            {/* Theme toggle — top-right corner */}
            <div className="absolute top-4 right-4">
                <ThemeToggle />
            </div>

            <div className="w-full max-w-md">
                {/* Logo */}
                <div className="mb-8 text-center">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-gray-900 to-gray-700 text-lg font-bold text-white shadow-md dark:from-white dark:to-gray-200 dark:text-gray-950">
                        T
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Create your account
                    </h1>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        Start managing your tasks with TaskFlow
                    </p>
                </div>

                {/* Card */}
                <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                    <form onSubmit={submit} className="space-y-5">
                        {/* Name */}
                        <div>
                            <label
                                htmlFor="name"
                                className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300"
                            >
                                Full name
                            </label>
                            <input
                                id="name"
                                type="text"
                                autoComplete="name"
                                autoFocus
                                value={data.name}
                                onChange={(e) =>
                                    setData('name', e.target.value)
                                }
                                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 transition focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-gray-500 dark:focus:border-gray-400 dark:focus:ring-gray-400/10"
                                placeholder="Jane Smith"
                            />
                            {errors.name && (
                                <p className="mt-1.5 text-xs text-red-500">
                                    {errors.name}
                                </p>
                            )}
                        </div>

                        {/* Email */}
                        <div>
                            <label
                                htmlFor="email"
                                className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300"
                            >
                                Email address
                            </label>
                            <input
                                id="email"
                                type="email"
                                autoComplete="email"
                                value={data.email}
                                onChange={(e) =>
                                    setData('email', e.target.value)
                                }
                                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 transition focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-gray-500 dark:focus:border-gray-400 dark:focus:ring-gray-400/10"
                                placeholder="you@example.com"
                            />
                            {errors.email && (
                                <p className="mt-1.5 text-xs text-red-500">
                                    {errors.email}
                                </p>
                            )}
                        </div>

                        {/* Password */}
                        <div>
                            <label
                                htmlFor="password"
                                className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300"
                            >
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                autoComplete="new-password"
                                value={data.password}
                                onChange={(e) =>
                                    setData('password', e.target.value)
                                }
                                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 transition focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-gray-500 dark:focus:border-gray-400 dark:focus:ring-gray-400/10"
                                placeholder="Min. 8 characters"
                            />
                            {errors.password && (
                                <p className="mt-1.5 text-xs text-red-500">
                                    {errors.password}
                                </p>
                            )}
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label
                                htmlFor="password_confirmation"
                                className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300"
                            >
                                Confirm password
                            </label>
                            <input
                                id="password_confirmation"
                                type="password"
                                autoComplete="new-password"
                                value={data.password_confirmation}
                                onChange={(e) =>
                                    setData(
                                        'password_confirmation',
                                        e.target.value,
                                    )
                                }
                                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 transition focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-gray-500 dark:focus:border-gray-400 dark:focus:ring-gray-400/10"
                                placeholder="Repeat your password"
                            />
                            {errors.password_confirmation && (
                                <p className="mt-1.5 text-xs text-red-500">
                                    {errors.password_confirmation}
                                </p>
                            )}
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full rounded-xl bg-gray-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-700 disabled:opacity-60 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
                        >
                            {processing
                                ? 'Creating account…'
                                : 'Create account'}
                        </button>
                    </form>
                </div>

                {/* Footer */}
                <p className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
                    Already have an account?{' '}
                    <Link
                        href="/login"
                        className="font-medium text-gray-900 underline-offset-4 hover:underline dark:text-white"
                    >
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    );
}
