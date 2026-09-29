<?php

test('returns a successful response', function () {
    $response = $this->get(route('tasks.index'));

    $response->assertOk();
});
