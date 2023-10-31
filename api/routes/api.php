<?php

use App\Http\Controllers\PlanController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ContractController;
use App\Http\Controllers\PaymentController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::get('/', function () {
    return response()->json(['message' => 'ok']);
});

Route::get('user/{id}/contracts', [UserController::class, 'getContractsByUser']);
Route::get('contracts/{id}/payments', [ContractController::class, 'getPaymentsByContract']);
Route::patch('payments/{id}/pay', [PaymentController::class, 'payPayment']);

Route::apiResource('plans', PlanController::class, ['only' => 'index']);

Route::apiSingleton('user', UserController::class, ['only' => 'show']);

Route::apiResource('contracts', ContractController::class)->only(['store']);

Route::apiResource('payments', PaymentController::class)->except(['destroy']);