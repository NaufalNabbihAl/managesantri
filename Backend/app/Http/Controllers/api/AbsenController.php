<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Absen;
use App\Models\Santri;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class AbsenController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $absen = Absen::all();
        return response()->json([
            'success' => true,
            'message' => 'List Data Santri',
            'data' => $absen
        ], 201);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
    }


    public function store(Request $request)
    {
        $data = $request->data;

        $validate = Validator::make($request->all(), [
            'data' => 'required|array',
            'data.*.id' => 'required',
            'data.*.kehadiran' => 'required|in:hadir,izin,sakit,alfa',
        ]);

        if ($validate->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Something went wrong',
                'details' => $validate->errors(),
            ], 422);
        }

        try {
            foreach ($data as $item) {
                Absen::create([
                    'santri_id' => $item['id'],
                    'kehadiran' => $item['kehadiran'],
                    'created_at' => Carbon::now(),
                ]);
            }

            return response()->json([
                'status' => 'success',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Something went wrong',
                'details' => $e->getMessage(),
            ], 500);
        }

    }
    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $absen = Absen::whereId($id)->first();
        if ($absen) {
            return response()->json([
                'success' => true,
                'message' => 'Detail Data Absen',
                'data' => $absen
            ], 201);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Data Absen Tidak Ditemukan!',
            ], 401);
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $absen = Absen::whereId($id)->update([
            'santri_id' => $request->santri_id,
            'kehadiran' => $request->kehadiran,
            'updated_at' => Carbon::now(),
        ]);

        if ($absen) {
            return response()->json([
                'success' => true,
                'message' => 'Absen Berhasil Diupdate!',
                'data' => $absen
            ], 201);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Absen Gagal Diupdate!',
            ], 401);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    
}
