<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;

class TaskController extends Controller
{
    public function index(Request $request): Response
    {
        $query = $request->user()->tasks();

        if ($request->filled('search')) {
            $query->where(function ($q) use ($request) {
                $q->where('title', 'like', '%'.$request->search.'%')
                    ->orWhere('description', 'like', '%'.$request->search.'%');
            });
        }

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        if ($request->filled('priority')) {
            $query->where('priority', $request->priority);
        }

        $tasks = $query->latest()->get();

        $baseQuery = $request->user()->tasks();

        $stats = [
            'total'       => (clone $baseQuery)->count(),
            'pending'     => (clone $baseQuery)->where('status', 'pending')->count(),
            'in_progress' => (clone $baseQuery)->where('status', 'in_progress')->count(),
            'completed'   => (clone $baseQuery)->where('status', 'completed')->count(),
        ];

        return Inertia::render('Tasks/Index', [
            'tasks'   => $tasks,
            'stats'   => $stats,
            'filters' => $request->only(['search', 'status', 'priority']),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Tasks/Create');
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title'       => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'status'      => ['required', 'in:pending,in_progress,completed'],
            'priority'    => ['required', 'in:low,medium,high'],
            'due_date'    => ['nullable', 'date'],
        ]);

        $request->user()->tasks()->create($validated);

        return redirect()
            ->route('tasks.index')
            ->with('success', 'Task created successfully.');
    }

    public function edit(Task $task): Response
    {
        Gate::authorize('update', $task);

        return Inertia::render('Tasks/Edit', [
            'task' => $task,
        ]);
    }

    public function update(Request $request, Task $task): RedirectResponse
    {
        Gate::authorize('update', $task);

        $validated = $request->validate([
            'title'       => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'status'      => ['required', 'in:pending,in_progress,completed'],
            'priority'    => ['required', 'in:low,medium,high'],
            'due_date'    => ['nullable', 'date'],
        ]);

        $task->update($validated);

        return redirect()
            ->route('tasks.index')
            ->with('success', 'Task updated successfully.');
    }

    public function destroy(Task $task): RedirectResponse
    {
        Gate::authorize('delete', $task);

        $task->delete();

        return redirect()
            ->route('tasks.index')
            ->with('success', 'Task deleted successfully.');
    }
}
