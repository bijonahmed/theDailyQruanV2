<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Public\PublicController;
use App\Http\Controllers\Public\PublicOrderStatusUpdate;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\User\UserController;
use App\Http\Controllers\Stripe\CheckOutController;

Route::get('/clear', function() {
    \Artisan::call('config:clear');
    \Artisan::call('cache:clear');
    \Artisan::call('config:cache');
    return "Cache cleared!";
});
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/auth/google', 'Auth\LoginController@redirectToGoogle');
Route::get('/auth/google/callback', 'Auth\LoginController@handleGoogleCallback');
Route::post('/stripe_webhook', [CheckOutController::class, 'handleStripeWebhook']);


Route::get('showProfileData', [UserController::class, 'me']);
Route::get('activate-account', [PublicController::class, 'activationAccount']);
Route::get('upload', [PublicController::class, 'upload']);
Route::post('submit', [PublicController::class, 'submit']);
 Route::get('allTorrentFiles', [PublicController::class, 'allTorrentFiles']);
Route::get('/', function () {
    return view('welcome');
});
