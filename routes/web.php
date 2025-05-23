<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PostController;
use App\Http\Controllers\ProductController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::resource('products',ProductController::class);
    Route::resource('posts',PostController::class);
    // Route::put('products/{product}','ProductController@update');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
