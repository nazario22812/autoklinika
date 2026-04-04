<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\UsersController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\WizytaController;

// --- 1. ГОЛОВНА СТОРІНКА ---
Route::get('/', function () {
    // Якщо користувач вже залогінений, одразу кидаємо його на сторінку welcome
    if (Auth::check()) {
        return redirect()->route('strona-glowna');
    }
    // Якщо гість — бачить сторінку з механіком
    return Inertia::render('Main');
})->name('main');


// --- 2. МАРШРУТИ ТІЛЬКИ ДЛЯ ГОСТЕЙ ---
Route::middleware('guest')->group(function () {
    // Логін
    Route::get('/login', [AuthenticatedSessionController::class, 'create'])->name('login');
    Route::post('/login', [AuthenticatedSessionController::class, 'store']);

    // Реєстрація
    Route::get('/register', function () {
        return Inertia::render('Auth/Register');
    })->name('register');
    Route::post('/register', [RegisteredUserController::class, 'store'])->name('register.store');

    // Відновлення пароля
    Route::get('/forgot-password', function () {
        return Inertia::render('Auth/ForgotPassword');
    })->name('password.request');
});





// --- 3. ЗАХИЩЕНІ МАРШРУТИ (ТІЛЬКИ ДЛЯ АВТОРИЗОВАНИХ) ---
Route::middleware(['auth'])->group(function () {
    
    Route::middleware(['admin'])->group(function () {
        // Route::get('/admin/dashboard', function () {
        //     return Inertia::render('Admin/Dashboard');
        // })->name('admin.dashboard');
        Route::get('admin/dahboard', [AdminController::class, 'counts'])->name('admin.dashboard');
        Route::get('admin/user-list', [AdminController::class, 'getallusers'])->name('admin.users');
        Route::post('admin/user-list', [AdminController::class, 'updateRole'])->name('admin.updateRole');
        Route::get('admin/zamowienia', [AdminController::class, 'getallorders'])->name('admin.zamowienia');
        Route::post('admin/zamowienia/anuluj/{id}', [AdminController::class, 'anulowanie'])->name('admin.zamowienia.anuluj');
        Route::post('admin/zamowienia/wziaczamowienie/{id}', [AdminController::class, 'wziaczamowienie'])->name('admin.zamowienia.wziaczamowienie');
    });


    // Твоя сторінка Welcome після успішного входу
    Route::get('/strona-glowna', function () {
        return Inertia::render('StronaGlowna');
    })->name('strona-glowna');


    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    // Вихід з акаунту
    Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])->name('logout');

    
    
    
    Route::get('/services', function () {
        return Inertia::render('Services');
    })->name('services');

    // Route::get('/check-order', function () {
    //     return Inertia::render('CheckOrder');
    // })->name('check-order');

    Route::get('/check-order', [UsersController::class, 'index'])->name('check-order');
    Route::get('/check-order/{id}', [UsersController::class, 'szczegoly'])->name('szczegoly');

    Route::get('/faq', function () {
        return Inertia::render('FAQ');
    })->name('faq');

    Route::get('/booking', function () {
        return Inertia::render('Booking');
    })->name('wizyta');    
    Route::post('/booking', [WizytaController::class, 'store'])->name('wizyta.store');
});

