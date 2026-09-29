<?php

use App\Http\Controllers\TaskController;
use Illuminate\Support\Facades\Route;

// Route::inertia('/', 'welcome')->name('home');
Route::resource('tasks', TaskController::class);
