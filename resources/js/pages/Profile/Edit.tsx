import AppLayout from '@/layouts/AppLayout';
import { router, useForm, usePage } from '@inertiajs/react';
import type { FormEvent } from 'react';
import { useState } from 'react';

interface User {
    id: number;
    name: string;
    email: string;
}

interface Props {
    user: User;
}

// ─── Reusable input ───────────────────────────────────────────────────────────
function Field({
    id,
    label,
    type = 'text',
    value,
    onChange,
    error,
    autoComplete,
    placeholder,
    hint,
}: {
    id: string;
    label: string;
    type?: string;
    value: string;
    onChange: (v: string) => void;
    error?: string;
    autoComplete?: string;
    placeholder?: string;
    hint?: string;
}) {
    return (
        <div>
            <label
                htmlFor={id}
                className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
                {label}
            </label>
            <input
                id={id}
                type={type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                autoComplete={autoComplete}
                placeholder={placeholder}
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 transition focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-gray-500 dark:focus:border-gray-400 dark:focus:ring-gray-400/10"
            />
            {error && <p className="mt-1.5 text-xs text-red-500">{error}</p>}
            {hint && !error && (
                <p className="mt-1.5 text-xs text-gray-400 dark:text-gray-500">
                    {hint}
                </p>
            )}
        </div>
    );
}

// ─── Section card wrapper ─────────────────────────────────────────────────────
function Section({
    title,
    description,
    children,
}: {
    title: string;
    description: string;
    children: React.ReactNode;
}) {
    return (
        <div className="grid gap-6 md:grid-cols-3">
            <div>
                <h2 className="text-base font-semibold text-gray-900 dark:text-white">
                    {title}
                </h2>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    {description}
                </p>
            </div>
            <div className="md:col-span-2">
                <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                    {children}
                </div>
            </div>
        </div>
    );
}

// ─── Flash banner ─────────────────────────────────────────────────────────────
function Flash({ message }: { message?: string }) {
    if (!message) return null;
    return (
        <div className="flex items-center gap-2 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700 dark:border-green-800/50 dark:bg-green-950/30 dark:text-green-400">
            <svg
                className="h-4 w-4 shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                />
            </svg>
            {message}
        </div>
    );
}

export default function ProfileEdit({ user }: Props) {
    const { props } = usePage<{
        flash?: { success?: string };
        [key: string]: unknown;
    }>();
    const flash = props.flash?.success;

    // ── Info form ──────────────────────────────────────────────────────────────
    const infoForm = useForm({ name: user.name, email: user.email });

    const submitInfo = (e: FormEvent) => {
        e.preventDefault();
        infoForm.patch('/profile/info');
    };

    // ── Password form ──────────────────────────────────────────────────────────
    const pwForm = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const submitPassword = (e: FormEvent) => {
        e.preventDefault();
        pwForm.patch('/profile/password', {
            onSuccess: () => pwForm.reset(),
        });
    };

    // ── Delete account ─────────────────────────────────────────────────────────
    const [deleteOpen, setDeleteOpen] = useState(false);
    const deleteForm = useForm({ password: '' });

    const confirmDelete = (e: FormEvent) => {
        e.preventDefault();
        deleteForm.delete('/profile', {
            onSuccess: () => router.visit('/login'),
        });
    };

    return (
        <AppLayout>
            <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
                <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
                    {/* Page header */}
                    <div className="mb-8">
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                            Account settings
                        </h1>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                            Manage your profile information and security
                            settings.
                        </p>
                    </div>

                    {/* Global flash */}
                    {flash && (
                        <div className="mb-6">
                            <Flash message={flash} />
                        </div>
                    )}

                    <div className="space-y-10">
                        {/* ── Profile info ──────────────────────────────────── */}
                        <Section
                            title="Profile information"
                            description="Update your display name and email address."
                        >
                            <form onSubmit={submitInfo} className="space-y-5">
                                {/* Avatar placeholder */}
                                <div className="flex items-center gap-4">
                                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-gray-900 to-gray-600 text-xl font-bold text-white dark:from-white dark:to-gray-300 dark:text-gray-900">
                                        {user.name.charAt(0).toUpperCase()}
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                                            {user.name}
                                        </p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">
                                            {user.email}
                                        </p>
                                    </div>
                                </div>

                                <div className="border-t border-gray-100 pt-5 dark:border-gray-800" />

                                <Field
                                    id="name"
                                    label="Full name"
                                    value={infoForm.data.name}
                                    onChange={(v) =>
                                        infoForm.setData('name', v)
                                    }
                                    error={infoForm.errors.name}
                                    autoComplete="name"
                                />
                                <Field
                                    id="email"
                                    label="Email address"
                                    type="email"
                                    value={infoForm.data.email}
                                    onChange={(v) =>
                                        infoForm.setData('email', v)
                                    }
                                    error={infoForm.errors.email}
                                    autoComplete="email"
                                />

                                <div className="flex justify-end">
                                    <button
                                        type="submit"
                                        disabled={infoForm.processing}
                                        className="rounded-xl bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-700 disabled:opacity-60 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
                                    >
                                        {infoForm.processing
                                            ? 'Saving…'
                                            : 'Save changes'}
                                    </button>
                                </div>
                            </form>
                        </Section>

                        <div className="border-t border-gray-200 dark:border-gray-800" />

                        {/* ── Change password ───────────────────────────────── */}
                        <Section
                            title="Change password"
                            description="Use a strong password of at least 8 characters."
                        >
                            <form
                                onSubmit={submitPassword}
                                className="space-y-5"
                            >
                                <Field
                                    id="current_password"
                                    label="Current password"
                                    type="password"
                                    value={pwForm.data.current_password}
                                    onChange={(v) =>
                                        pwForm.setData('current_password', v)
                                    }
                                    error={pwForm.errors.current_password}
                                    autoComplete="current-password"
                                />
                                <Field
                                    id="new_password"
                                    label="New password"
                                    type="password"
                                    value={pwForm.data.password}
                                    onChange={(v) =>
                                        pwForm.setData('password', v)
                                    }
                                    error={pwForm.errors.password}
                                    autoComplete="new-password"
                                    hint="Minimum 8 characters."
                                />
                                <Field
                                    id="password_confirmation"
                                    label="Confirm new password"
                                    type="password"
                                    value={pwForm.data.password_confirmation}
                                    onChange={(v) =>
                                        pwForm.setData(
                                            'password_confirmation',
                                            v,
                                        )
                                    }
                                    error={pwForm.errors.password_confirmation}
                                    autoComplete="new-password"
                                />

                                <div className="flex justify-end">
                                    <button
                                        type="submit"
                                        disabled={pwForm.processing}
                                        className="rounded-xl bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-700 disabled:opacity-60 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
                                    >
                                        {pwForm.processing
                                            ? 'Updating…'
                                            : 'Update password'}
                                    </button>
                                </div>
                            </form>
                        </Section>

                        <div className="border-t border-gray-200 dark:border-gray-800" />

                        {/* ── Delete account ────────────────────────────────── */}
                        <Section
                            title="Delete account"
                            description="Permanently remove your account and all your tasks. This action cannot be undone."
                        >
                            {!deleteOpen ? (
                                <button
                                    type="button"
                                    onClick={() => setDeleteOpen(true)}
                                    className="rounded-xl border border-red-200 bg-red-50 px-5 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-100 dark:border-red-800/50 dark:bg-red-950/20 dark:text-red-400 dark:hover:bg-red-950/40"
                                >
                                    Delete my account
                                </button>
                            ) : (
                                <form
                                    onSubmit={confirmDelete}
                                    className="space-y-5"
                                >
                                    <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-800/50 dark:bg-red-950/20 dark:text-red-400">
                                        This will permanently delete your
                                        account and all associated tasks. Enter
                                        your password to confirm.
                                    </div>
                                    <Field
                                        id="delete_password"
                                        label="Your password"
                                        type="password"
                                        value={deleteForm.data.password}
                                        onChange={(v) =>
                                            deleteForm.setData('password', v)
                                        }
                                        error={deleteForm.errors.password}
                                        autoComplete="current-password"
                                    />
                                    <div className="flex items-center gap-3">
                                        <button
                                            type="submit"
                                            disabled={deleteForm.processing}
                                            className="rounded-xl bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700 disabled:opacity-60"
                                        >
                                            {deleteForm.processing
                                                ? 'Deleting…'
                                                : 'Yes, delete my account'}
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setDeleteOpen(false)}
                                            className="rounded-xl px-5 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            )}
                        </Section>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
