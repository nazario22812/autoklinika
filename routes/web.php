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
use App\Http\Controllers\Auth\PasswordController;

Route::get('/', function () {
    if (Auth::check()) {
        return redirect()->route('strona-glowna');
    }
    return Inertia::render('Main');
})->name('main');


Route::middleware('guest')->group(function () {
    Route::get('/login', [AuthenticatedSessionController::class, 'create'])->name('login');
    Route::post('/login', [AuthenticatedSessionController::class, 'store']);

    Route::get('/register', function () {
        return Inertia::render('Auth/Register');
    })->name('register');
    Route::post('/register', [RegisteredUserController::class, 'store'])->name('register.store');




    Route::get('/forgot-password', [AuthenticatedSessionController::class, 'forgotPassword'])->name('password.request');
    Route::post('/forgot-password', [PasswordController::class, 'generateResetCode'])->name('password.gencode');
    Route::get('/forgot-password/code', [PasswordController::class, 'codeforgotPassword'])->name('password.code');
    Route::post('/forgot-password/code', [PasswordController::class, 'verifyCode'])->name('password.verifycode');
    Route::get('/reset-password', function () {
        return Inertia::render('Auth/ResetPassword');
    })->name('password.reset');
    Route::post('/reset-password', [PasswordController::class, 'update'])->name('password.update');
  
});





Route::middleware(['auth'])->group(function () {
    
    Route::middleware(['admin'])->group(function () {
       
        Route::get('admin/dahboard', [AdminController::class, 'counts'])->name('admin.dashboard');
        Route::get('admin/user-list', [AdminController::class, 'getallusers'])->name('admin.users');
        Route::post('admin/user-list', [AdminController::class, 'updateRole'])->name('admin.updateRole');
        Route::get('admin/zamowienia', [AdminController::class, 'getallorders'])->name('admin.zamowienia');
        Route::post('admin/zamowienia/anuluj/{id}', [AdminController::class, 'anulowanie'])->name('admin.zamowienia.anuluj');
        Route::post('admin/zamowienia/wziaczamowienie/{id}', [AdminController::class, 'wziaczamowienie'])->name('admin.zamowienia.wziaczamowienie');
        Route::get('admin/active-orders', [AdminController::class, 'getactiveorders'])->name('admin.activeorders');
        Route::get('admin/active-orders/{id}', [AdminController::class, 'getactiveorderdetail'])->name('admin.activeorders.detail');
        Route::post('admin/active-orders/{id}', [AdminController::class, 'updatezamowienie'])->name('admin.zamowienie.update');
        Route::get('admin/calendar', [AdminController::class, 'harmonogram'])->name('admin.calendar');
        Route::get('admin/pytania', [AdminController::class, 'getallquestions'])->name('admin.questions');
        Route::post('admin/pytania/{id}', [AdminController::class, 'wyslijodpowiedz'])->name('admin.wyslij-odpowiedz');
    });


    Route::get('/strona-glowna', function () {
        return Inertia::render('StronaGlowna');
    })->name('strona-glowna');


    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])->name('logout');

    
    
    
    Route::get('/services', function () {
        return Inertia::render('Services');
    })->name('services');

    

    Route::get('/check-order', [UsersController::class, 'index'])->name('check-order');
    Route::get('/check-order/{id}', [UsersController::class, 'szczegoly'])->name('szczegoly');

 
    Route::get('/booking', function () {
        return Inertia::render('Booking');
    })->name('wizyta');    
    Route::post('/booking', [WizytaController::class, 'store'])->name('wizyta.store');

    Route::get('/faq', [UsersController::class, 'faq'])->name('faq');
    Route::get('/faq/zadaj-pytanie', [UsersController::class, 'zadajpytanie'])->name('faq.zadaj-pytanie');
    Route::post('/faq/zadaj-pytanie', [UsersController::class, 'wyslijpytanie'])->name('faq.wyslij-pytanie');
});

