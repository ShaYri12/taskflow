import { Link } from "@inertiajs/react";

interface Task {
    id: number;
    title: string;
    description: string | null;
    status: string;
    priority: string;
    due_date: string | null;
}

interface TaskDetailModalProps {
    isOpen: boolean;
    task: Task | null;
    onClose: () => void;
    getPriorityColor: (priority: string) => string;
    getStatusColor: (status: string) => string;
    formatStatus: (status: string) => string;
    isOverdue: (dueDate: string | null) => boolean;
}

export default function TaskDetailModal({
    isOpen,
    task,
    onClose,
    getPriorityColor,
    getStatusColor,
    formatStatus,
    isOverdue,
}: TaskDetailModalProps) {
    if (!isOpen || !task) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative z-10 flex w-full max-w-2xl flex-col max-h-[90vh] transform rounded-2xl bg-white shadow-2xl transition-all dark:bg-gray-800">
                {/* Header - Fixed */}
                <div className="flex flex-shrink-0 items-center justify-between border-b border-gray-200 p-4 sm:p-6 dark:border-gray-700">
                    <div className="flex-1">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                            Task Details
                        </h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-700 dark:hover:text-gray-300"
                    >
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Content - Scrollable */}
                <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                    <div className="space-y-6">
                        {/* Title */}
                        <div>
                            <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Title</label>
                            <p className="mt-1 text-lg font-semibold text-gray-900 dark:text-gray-100">{task.title}</p>
                        </div>

                        {/* Description */}
                        {task.description && (
                            <div>
                                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Description</label>
                                <p className="mt-1 whitespace-pre-wrap text-gray-700 dark:text-gray-300">{task.description}</p>
                            </div>
                        )}

                        {/* Status, Priority, Due Date Grid */}
                        <div className="grid gap-6 sm:grid-cols-3">
                            <div className="flex flex-col">
                                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Status</label>
                                <span className={`mt-2 inline-flex w-fit items-center rounded-full px-3 py-1 text-sm font-medium ${getStatusColor(task.status)}`}>
                                    {formatStatus(task.status)}
                                </span>
                            </div>

                            <div className="flex flex-col">
                                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Priority</label>
                                <span className={`mt-2 inline-flex w-fit items-center rounded-full px-3 py-1 text-sm font-medium ${getPriorityColor(task.priority)}`}>
                                    {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                                </span>
                            </div>

                            {task.due_date && (
                                <div>
                                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Due Date</label>
                                    <p className={`mt-2 flex items-center gap-2 text-sm font-medium ${
                                        isOverdue(task.due_date)
                                            ? "text-red-600 dark:text-red-400"
                                            : "text-gray-900 dark:text-gray-100"
                                    }`}>
                                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        {new Date(task.due_date).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Actions - Fixed */}
                <div className="flex flex-shrink-0 gap-3 border-t border-gray-200 p-4 sm:p-6 dark:border-gray-700">
                    <Link
                        href={`/tasks/${task.id}/edit`}
                        className="flex-1 rounded-lg border-2 border-gray-300 bg-white px-4 py-2.5 text-center font-medium text-gray-700 transition hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                    >
                        Edit Task
                    </Link>
                    <button
                        type="button"
                        onClick={onClose}
                        className="flex-1 rounded-lg bg-gray-900 px-4 py-2.5 font-medium text-white transition hover:bg-gray-800 dark:bg-white dark:text-gray-950 dark:hover:bg-gray-200"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}
