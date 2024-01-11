<?php
use App\Http\Controllers\api\AbsenController ;
use App\Http\Controllers\api\KategoriController;
use App\Http\Controllers\api\SantriController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/santri/store', [SantriController::class, 'store']);

Route::get('/santri', [SantriController::class, 'index']);

Route::get('santri/report', [SantriController::class, 'reportAbsent']);

Route::delete('/santri/delete/{id}', [SantriController::class, 'destroy']);

Route::get('/santri/{id}', [SantriController::class, 'show']);

Route::put('/santri/{id}', [SantriController::class, 'update']);

Route::post('absen/store', [AbsenController::class, 'store']);

Route::get('absen', [AbsenController::class, 'index']);

Route::get('absen/{id}', [AbsenController::class, 'show']);

Route::put('absen/{id}', [AbsenController::class, 'update']);

Route::get('kategori', [KategoriController::class, 'index']);

Route::post('kategori/store', [KategoriController::class, 'store']);

Route::get('kategori/{id}', [KategoriController::class, 'show']);

Route::put('kategori/{id}', [KategoriController::class, 'update']);

Route::delete('kategori/delete/{id}', [KategoriController::class, 'destroy']);




