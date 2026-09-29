import AppLayout from "@/layouts/AppLayout";
import { Link, router } from "@inertiajs/react";
import { useState } from "react";
import TaskDetailModal from "@/components/TaskDetailModal";

interface Task {
    id: number;
    title: string;
    description: string | null;
    status: string;
    priority: string;
    due_date: string | null;
}

interface Stats {
    total: number;
    pending: number;
    in_progress: number;
    completed: number;
}

interface Filters {
    search?: string;
    status?: string;
    priority?: string;
}

interface Props {
    tasks: Task[];
    stats: Stats;
    filters: Filters;
}

export default function Index({ tasks, stats, filters }: Props) {
    const [search, setSearch] = useState(filters.search || "");
    const [statusFilter, setStatusFilter] = useState(filters.status || "");
    const [priorityFilter, setPriorityFilter] = useState(filters.priority || "");
    const [selectedTasks, setSelectedTasks] = useState<number[]>([]);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [deleteType, setDeleteType] = useState<'single' | 'bulk'>('single');
    const [taskToDelete, setTaskToDelete] = useState<number | null>(null);
    const [detailModalOpen, setDetailModalOpen] = useState(false);
    const [taskToView, setTaskToView] = useState<Task | null>(null);
    const [openDropdown, setOpenDropdown] = useState<number | null>(null);

    const handleSearch = (value: string) => {
        setSearch(value);
        applyFilters({ search: value, status: statusFilter, priority: priorityFilter });
    };

    const handleStatusFilter = (value: string) => {
        setStatusFilter(value);
        applyFilters({ search, status: value, priority: priorityFilter });
    };

    const handlePriorityFilter = (value: string) => {
        setPriorityFilter(value);
        applyFilters({ search, status: statusFilter, priority: value });
    };

    const applyFilters = (filters: Filters) => {
        const params = new URLSearchParams();
        if (filters.search) params.set("search", filters.search);
        if (filters.status) params.set("status", filters.status);
        if (filters.priority) params.set("priority", filters.priority);
        
        router.get(`/tasks?${params.toString()}`, {}, { preserveState: true });
    };

    const clearFilters = () => {
        setSearch("");
        setStatusFilter("");
        setPriorityFilter("");
        router.get("/tasks");
    };

    const deleteTask = (id: number) => {
        setOpenDropdown(null);
        setTaskToDelete(id);
        setDeleteType('single');
        setDeleteModalOpen(true);
    };

    const viewTaskDetail = (task: Task) => {
        setOpenDropdown(null);
        setTaskToView(task);
        setDetailModalOpen(true);
    };

    const confirmDelete = () => {
        if (taskToDelete) {
            router.delete(`/tasks/${taskToDelete}`, {
                onSuccess: () => {
                    setDeleteModalOpen(false);
                    setTaskToDelete(null);
                }
            });
        }
    };

    const toggleTaskSelection = (taskId: number) => {
        setSelectedTasks((prev) =>
            prev.includes(taskId)
                ? prev.filter((id) => id !== taskId)
                : [...prev, taskId]
        );
    };

    const toggleSelectAll = () => {
        if (selectedTasks.length === tasks.length) {
            setSelectedTasks([]);
        } else {
            setSelectedTasks(tasks.map((task) => task.id));
        }
    };

    const bulkDelete = () => {
        setDeleteType('bulk');
        setDeleteModalOpen(true);
    };

    const confirmBulkDelete = () => {
        if (selectedTasks.length === 0) return;
        
        const count = selectedTasks.length;
        // Use Promise.all to wait for all deletions
        router.delete(`/tasks/${selectedTasks[0]}`, {
            onSuccess: () => {
                // After first deletion succeeds, delete the rest
                const remaining = selectedTasks.slice(1);
                if (remaining.length > 0) {
                    remaining.forEach(taskId => {
                        router.delete(`/tasks/${taskId}`, {
                            preserveScroll: true,
                            preserveState: false,
                        });
                    });
                }
                setSelectedTasks([]);
                setDeleteModalOpen(false);
            },
        });
    };

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case "high":
                return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";
            case "medium":
                return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400";
            case "low":
                return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400";
            default:
                return "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300";
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case "completed":
                return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
            case "in_progress":
                return "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400";
            case "pending":
                return "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300";
            default:
                return "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300";
        }
    };

    const formatStatus = (status: string) => {
        return status.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase());
    };

    const isOverdue = (dueDate: string | null) => {
        if (!dueDate) return false;
        return new Date(dueDate) < new Date() && new Date(dueDate).toDateString() !== new Date().toDateString();
    };

    const hasActiveFilters = search || statusFilter || priorityFilter;

    return (
        <AppLayout>
            <div className="min-h-screen bg-gray-50 py-8 dark:bg-gray-900">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                            Tasks Overview
                        </h1>
                        <p className="mt-2 text-gray-600 dark:text-gray-400">
                            Manage and track all your tasks in one place
                        </p>
                    </div>

                    {/* Stats Cards */}
                    <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                        Total Tasks
                                    </p>
                                    <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-gray-100">
                                        {stats.total}
                                    </p>
                                </div>
                                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-700">
                                    <svg className="h-6 w-6 text-gray-600 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                        Pending
                                    </p>
                                    <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-gray-100">
                                        {stats.pending}
                                    </p>
                                </div>
                                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-700">
                                    <svg className="h-6 w-6 text-gray-600 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                        In Progress
                                    </p>
                                    <p className="mt-2 text-3xl font-bold text-purple-600 dark:text-purple-400">
                                        {stats.in_progress}
                                    </p>
                                </div>
                                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900/30">
                                    <svg className="h-6 w-6 text-purple-600 dark:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                        Completed
                                    </p>
                                    <p className="mt-2 text-3xl font-bold text-green-600 dark:text-green-400">
                                        {stats.completed}
                                    </p>
                                </div>
                                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900/30">
                                    <svg className="h-6 w-6 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Filters */}
                    <div className="mb-6 rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
                        <div className="flex flex-col gap-4 md:flex-row md:items-center">
                            <div className="flex-1">
                                <input
                                    type="text"
                                    placeholder="Search tasks..."
                                    value={search}
                                    onChange={(e) => handleSearch(e.target.value)}
                                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 placeholder-gray-500 focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100 dark:placeholder-gray-400 dark:focus:border-gray-100 dark:focus:ring-gray-100"
                                />
                            </div>

                            <div className="flex flex-wrap gap-2">
                                <select
                                    value={statusFilter}
                                    onChange={(e) => handleStatusFilter(e.target.value)}
                                    className="appearance-none rounded-lg border border-gray-300 bg-white py-2 pl-4 pr-10 text-gray-900 focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100 dark:focus:border-gray-100 dark:focus:ring-gray-100"
                                    style={{
                                        backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                                        backgroundPosition: 'right 0.5rem center',
                                        backgroundRepeat: 'no-repeat',
                                        backgroundSize: '1.5em 1.5em',
                                    }}
                                >
                                    <option value="">All Status</option>
                                    <option value="pending">Pending</option>
                                    <option value="in_progress">In Progress</option>
                                    <option value="completed">Completed</option>
                                </select>

                                <select
                                    value={priorityFilter}
                                    onChange={(e) => handlePriorityFilter(e.target.value)}
                                    className="appearance-none rounded-lg border border-gray-300 bg-white py-2 pl-4 pr-10 text-gray-900 focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100 dark:focus:border-gray-100 dark:focus:ring-gray-100"
                                    style={{
                                        backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                                        backgroundPosition: 'right 0.5rem center',
                                        backgroundRepeat: 'no-repeat',
                                        backgroundSize: '1.5em 1.5em',
                                    }}
                                >
                                    <option value="">All Priority</option>
                                    <option value="high">High</option>
                                    <option value="medium">Medium</option>
                                    <option value="low">Low</option>
                                </select>

                                {hasActiveFilters && (
                                    <button
                                        type="button"
                                        onClick={clearFilters}
                                        className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                                    >
                                        Clear
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Bulk Actions Bar - Always visible when tasks selected */}
                    {selectedTasks.length > 0 && (
                        <div className="sticky top-20 z-10 mb-4 animate-in slide-in-from-top">
                            <div className="flex items-center justify-between rounded-xl backdrop-blur-sm border-2 border-blue-500 bg-blue-50 p-4 shadow-lg dark:border-blue-400 dark:bg-blue-950/50">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500 text-white dark:bg-blue-400 dark:text-gray-900">
                                        <span className="font-bold">{selectedTasks.length}</span>
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-900 dark:text-gray-100">
                                            {selectedTasks.length === 1 ? '1 task selected' : `${selectedTasks.length} tasks selected`}
                                        </p>
                                        <p className="text-xs text-gray-600 dark:text-gray-400">
                                            Click to deselect or delete
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        type="button"
                                        onClick={() => setSelectedTasks([])}
                                        className="rounded-lg border-2 border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                                    >
                                        Clear
                                    </button>
                                    <button
                                        type="button"
                                        onClick={bulkDelete}
                                        className="flex items-center gap-2 rounded-lg bg-red-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition hover:bg-red-700 hover:shadow-xl"
                                    >
                                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                        {selectedTasks.length === 1 ? 'Delete Task' : `Delete All (${selectedTasks.length})`}
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Tasks List Header */}
                    {tasks.length > 0 && (
                        <div className="mb-3 rounded-lg border border-gray-200 bg-white p-3 dark:border-gray-700 dark:bg-gray-800">
                            <div className="flex items-center gap-3">
                                <button
                                    type="button"
                                    onClick={toggleSelectAll}
                                    className="flex h-5 w-5 flex-shrink-0 cursor-pointer items-center justify-center rounded border-2 transition hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-gray-100"
                                    style={{
                                        borderColor: selectedTasks.length === tasks.length && tasks.length > 0
                                            ? 'rgb(59, 130, 246)' 
                                            : 'rgb(209, 213, 219)',
                                        backgroundColor: selectedTasks.length === tasks.length && tasks.length > 0
                                            ? 'rgb(59, 130, 246)'
                                            : 'transparent'
                                    }}
                                >
                                    {selectedTasks.length === tasks.length && tasks.length > 0 ? (
                                        <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    ) : selectedTasks.length > 0 ? (
                                        <svg className="h-3 w-3 text-gray-600 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M3 10h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                                        </svg>
                                    ) : null}
                                </button>
                                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                    Select All
                                </span>
                            </div>
                        </div>
                    )}

                    {/* Tasks List */}
                    <div className="space-y-3">
                        {tasks.length === 0 ? (
                            <div className="rounded-xl border border-gray-200 bg-white p-12 text-center dark:border-gray-700 dark:bg-gray-800">
                                <svg className="mx-auto h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                                </svg>
                                <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-gray-100">
                                    {hasActiveFilters ? "No tasks found" : "No tasks yet"}
                                </h3>
                                <p className="mt-2 text-gray-600 dark:text-gray-400">
                                    {hasActiveFilters
                                        ? "Try adjusting your filters"
                                        : "Get started by creating your first task"}
                                </p>
                                {!hasActiveFilters && (
                                    <Link
                                        href="/tasks/create"
                                        className="mt-6 inline-flex items-center gap-2 rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800 dark:bg-white dark:text-gray-950 dark:hover:bg-gray-200"
                                    >
                                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                        </svg>
                                        Create Your First Task
                                    </Link>
                                )}
                            </div>
                        ) : (
                            tasks.map((task) => (
                                <div
                                    key={task.id}
                                    className={`group rounded-xl border bg-white p-5 transition hover:shadow-md ${
                                        selectedTasks.includes(task.id)
                                            ? "border-blue-500 ring-2 ring-blue-200 dark:border-blue-400 dark:ring-blue-900/50"
                                            : "border-gray-200 dark:border-gray-700"
                                    } dark:bg-gray-800`}
                                >
                                    <div className="flex items-start justify-between gap-1">
                                        <div className="flex flex-1 items-start gap-3">
                                            {/* Selection Checkbox */}
                                            <button
                                                type="button"
                                                onClick={() => toggleTaskSelection(task.id)}
                                                className="mt-1 flex h-5 w-5 flex-shrink-0 cursor-pointer items-center justify-center rounded border-2 transition hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                                                style={{
                                                    borderColor: selectedTasks.includes(task.id) 
                                                        ? 'rgb(59, 130, 246)' 
                                                        : 'rgb(209, 213, 219)',
                                                    backgroundColor: selectedTasks.includes(task.id)
                                                        ? 'rgb(59, 130, 246)'
                                                        : 'transparent'
                                                }}
                                            >
                                                {selectedTasks.includes(task.id) && (
                                                    <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                    </svg>
                                                )}
                                            </button>
                                            
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-start gap-2">
                                                    {/* Status Toggle Button */}
                                                    
                                                    <h3 className={`text-lg font-semibold transition break-words ${
                                                        task.status === "completed" 
                                                            ? "text-gray-500 line-through dark:text-gray-500" 
                                                            : "text-gray-900 dark:text-gray-100"
                                                    }`}>
                                                        {task.title}
                                                    </h3>
                                                </div>
                                                
                                                {task.description && (
                                                    <p className="mt-1 text-sm text-gray-600 line-clamp-2 break-words dark:text-gray-400">
                                                        {task.description}
                                                    </p>
                                                )}

                                                <div className="mt-3 flex flex-wrap items-center gap-2">
                                                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(task.status)}`}>
                                                        {formatStatus(task.status)}
                                                    </span>
                                                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getPriorityColor(task.priority)}`}>
                                                        {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority
                                                    </span>
                                                    {task.due_date && (
                                                        <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                                            isOverdue(task.due_date)
                                                                ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                                                                : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                                                        }`}>
                                                            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                            </svg>
                                                            {new Date(task.due_date).toLocaleDateString()}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        {/* 3-Dot Menu */}
                                        <div className="relative">
                                            <button
                                                type="button"
                                                onClick={() => setOpenDropdown(openDropdown === task.id ? null : task.id)}
                                                className="rounded-lg p-2 text-gray-600 transition hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-100"
                                            >
                                                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                                                </svg>
                                            </button>

                                            {/* Dropdown Menu */}
                                            {openDropdown === task.id && (
                                                <>
                                                    <div 
                                                        className="fixed inset-0 z-10" 
                                                        onClick={() => setOpenDropdown(null)}
                                                    />
                                                    <div className="absolute right-0 z-20 w-38 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800">
                                                        <button
                                                            type="button"
                                                            onClick={() => viewTaskDetail(task)}
                                                            className="flex w-full items-center gap-3 px-4 py-3 text-sm text-gray-700 transition hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700"
                                                        >
                                                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                            </svg>
                                                            View Details
                                                        </button>
                                                        <Link
                                                            href={`/tasks/${task.id}/edit`}
                                                            className="flex w-full items-center gap-3 px-4 py-3 text-sm text-gray-700 transition hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700"
                                                            onClick={() => setOpenDropdown(null)}
                                                        >
                                                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                            </svg>
                                                            Edit
                                                        </Link>
                                                        <button
                                                            type="button"
                                                            onClick={() => deleteTask(task.id)}
                                                            className="flex w-full items-center gap-3 border-t border-gray-200 px-4 py-3 text-sm text-red-600 transition hover:bg-red-50 dark:border-gray-700 dark:text-red-400 dark:hover:bg-red-950/40"
                                                        >
                                                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                            </svg>
                                                            Delete
                                                        </button>
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            {deleteModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <div 
                        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
                        onClick={() => setDeleteModalOpen(false)}
                    />
                    
                    {/* Modal */}
                    <div className="relative z-10 w-full max-w-md transform rounded-2xl bg-white p-6 shadow-2xl transition-all dark:bg-gray-800">
                        {/* Icon */}
                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
                            <svg className="h-7 w-7 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                        </div>

                        {/* Content */}
                        <div className="mt-4 text-center">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                                {deleteType === 'bulk' 
                                    ? `Delete ${selectedTasks.length} Task${selectedTasks.length > 1 ? 's' : ''}?`
                                    : 'Delete Task?'
                                }
                            </h3>
                            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                                {deleteType === 'bulk'
                                    ? `Are you sure you want to delete ${selectedTasks.length} selected task${selectedTasks.length > 1 ? 's' : ''}? This action cannot be undone.`
                                    : 'Are you sure you want to delete this task? This action cannot be undone.'
                                }
                            </p>
                        </div>

                        {/* Actions */}
                        <div className="mt-6 flex gap-3">
                            <button
                                type="button"
                                onClick={() => {
                                    setDeleteModalOpen(false);
                                    setTaskToDelete(null);
                                }}
                                className="flex-1 rounded-lg border-2 border-gray-300 bg-white px-4 py-2.5 font-medium text-gray-700 transition hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={deleteType === 'bulk' ? confirmBulkDelete : confirmDelete}
                                className="flex-1 rounded-lg bg-red-600 px-4 py-2.5 font-medium text-white transition hover:bg-red-700"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Task Detail Modal */}
            <TaskDetailModal
                isOpen={detailModalOpen}
                task={taskToView}
                onClose={() => setDetailModalOpen(false)}
                getPriorityColor={getPriorityColor}
                getStatusColor={getStatusColor}
                formatStatus={formatStatus}
                isOverdue={isOverdue}
            />
        </AppLayout>
    );
}
