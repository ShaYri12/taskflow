import AppLayout from '@/layouts/AppLayout';
import { Link, useForm } from '@inertiajs/react';
import type { FormEvent } from 'react';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        description: '',
        status: 'pending',
        priority: 'medium',
        due_date: '',
    });

    const submit = (e: FormEvent) => {
        e.preventDefault();

        post('/tasks');
    };

    return (
        <AppLayout>
            <div className="min-h-screen bg-gray-100 p-8 dark:bg-gray-900">
                <div className="mx-auto max-w-2xl">
                    <Link
                        href="/tasks"
                        className="inline-flex items-center gap-2 text-gray-600 transition hover:text-black dark:text-gray-400 dark:hover:text-white"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                        >
                            <path d="M19 12H5" />
                            <path d="m12 19-7-7 7-7" />
                        </svg>

                        <span>Back to tasks</span>
                    </Link>

                    <h1 className="mt-6 text-3xl font-bold text-gray-900 dark:text-gray-100">
                        Create Task
                    </h1>

                    <form
                        onSubmit={submit}
                        className="mt-8 space-y-6 rounded-xl bg-white p-8 shadow-sm dark:bg-gray-800"
                    >
                        <div>
                            <label className="mb-2 block font-medium text-gray-900 dark:text-gray-100">
                                Title
                            </label>

                            <input
                                type="text"
                                value={data.title}
                                onChange={(e) =>
                                    setData('title', e.target.value)
                                }
                                className="w-full rounded-lg border border-gray-300 bg-white p-3 text-gray-900 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
                                placeholder="Enter task title"
                            />

                            {errors.title && (
                                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                                    {errors.title}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="mb-2 block font-medium text-gray-900 dark:text-gray-100">
                                Description
                            </label>

                            <textarea
                                value={data.description}
                                onChange={(e) =>
                                    setData('description', e.target.value)
                                }
                                className="w-full rounded-lg border border-gray-300 bg-white p-3 text-gray-900 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
                                rows={5}
                                placeholder="Enter task description"
                            />

                            {errors.description && (
                                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                                    {errors.description}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="mb-2 block font-medium text-gray-900 dark:text-gray-100">
                                Status
                            </label>

                            <select
                                value={data.status}
                                onChange={(e) =>
                                    setData('status', e.target.value)
                                }
                                className="w-full appearance-none rounded-lg border border-gray-300 bg-white p-3 pr-10 text-gray-900 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
                                style={{
                                    backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                                    backgroundPosition: 'right 0.5rem center',
                                    backgroundRepeat: 'no-repeat',
                                    backgroundSize: '1.5em 1.5em',
                                }}
                            >
                                <option value="pending">Pending</option>
                                <option value="in_progress">In Progress</option>
                                <option value="completed">Completed</option>
                            </select>

                            {errors.status && (
                                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                                    {errors.status}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="mb-2 block font-medium text-gray-900 dark:text-gray-100">
                                Priority
                            </label>

                            <select
                                value={data.priority}
                                onChange={(e) =>
                                    setData('priority', e.target.value)
                                }
                                className="w-full appearance-none rounded-lg border border-gray-300 bg-white p-3 pr-10 text-gray-900 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
                                style={{
                                    backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                                    backgroundPosition: 'right 0.5rem center',
                                    backgroundRepeat: 'no-repeat',
                                    backgroundSize: '1.5em 1.5em',
                                }}
                            >
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                            </select>

                            {errors.priority && (
                                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                                    {errors.priority}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="mb-2 block font-medium text-gray-900 dark:text-gray-100">
                                Due Date
                            </label>

                            <input
                                type="date"
                                value={data.due_date}
                                onChange={(e) =>
                                    setData('due_date', e.target.value)
                                }
                                className="w-full rounded-lg border border-gray-300 bg-white p-3 text-gray-900 [color-scheme:light] dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:[color-scheme:dark]"
                            />

                            {errors.due_date && (
                                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                                    {errors.due_date}
                                </p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full rounded-lg bg-black px-5 py-3 text-white transition hover:bg-gray-800 disabled:opacity-50 dark:bg-white dark:text-gray-950 dark:hover:bg-gray-200"
                        >
                            {processing ? 'Creating...' : 'Create Task'}
                        </button>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
