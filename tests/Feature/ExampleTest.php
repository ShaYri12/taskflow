<?php

use App\Models\User;

test('guests are redirected to login', function () {
    $this->get(route('tasks.index'))
        ->assertRedirectToRoute('login');
});

test('authenticated users can view tasks', function () {
    $user = User::factory()->create();

    $this->actingAs($user)
        ->get(route('tasks.index'))
        ->assertOk();
});
