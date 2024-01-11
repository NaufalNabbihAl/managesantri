<?php

namespace App\Http\Controllers\api;


use App\Http\Controllers\Controller;
use App\Models\Absen;
use Illuminate\Http\Request;
use App\Models\Santri;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class SantriController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $santri = Santri::join('kategoris', 'santris.kategori_id', '=', 'kategoris.id')
            ->select('santris.id', 'santris.nama', 'kategoris.kategori')
            ->get();
        return response()->json([
            'success' => true,
            'message' => 'List Data Santri',
            'data' => $santri
        ], 200);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = Validator::make(
            $request->all(),
            [
                'nama' => 'required',
                'kategori_id' => 'required',
            ],
            [
                'nama.required' => 'Nama tidak boleh kosong',
                'kategori_id.required' => 'Kategori tidak boleh kosong',
            ]
        );

        if ($validatedData->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Isi data yang kosong',
                'data' => $validatedData->errors()
            ], 401);
        }

        $santri = Santri::create([
            'nama' => $request->nama,
            'kategori_id' => $request->kategori_id,
        ]);
        if ($santri) {
            return response()->json([
                'success' => true,
                'message' => 'Data berhasil ditambahkan',
                'data' => $santri
            ], 201);
        }

        return response()->json([
            'success' => false,
            'message' => 'Data gagal ditambahkan',
            'data' => $santri
        ], 401);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $santri = Santri::whereId($id)->first();
        if ($santri) {
            return response()->json([
                'success' => true,
                'message' => 'Detail Data Santri',
                'data' => $santri
            ], 200);
        }

        return response()->json([
            'success' => false,
            'message' => 'Data Santri tidak ditemukan',
            'data' => ''
        ], 401);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        // Find the santri to update
        $santri = Santri::findOrFail($id); // Assuming you have a Santri model

        // Update the specified column based on the request
        $columnToUpdate = $request->izin ? 'izin' : ($request->alfa ? 'alfa' : 'sakit');
        $santri->$columnToUpdate = 1;

        // Reset any other columns to 0
        $santri->izin = $columnToUpdate === 'izin' ? 1 : 0;
        $santri->alfa = $columnToUpdate === 'alfa' ? 1 : 0;
        $santri->sakit = $columnToUpdate === 'sakit' ? 1 : 0;

        $santri->tanggal_absen = Carbon::now();
        // Save the changes
        $santri->save();

        // Return a response indicating success or failure
        if ($santri->wasChanged()) {
            return response()->json(['message' => 'Kehadiran santri updated successfully'], 201);
        } else {
            return response()->json(['message' => 'No changes were made'], 401);
        }
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $santri = Santri::whereId($id)->delete();

        if ($santri) {
            return response()->json([
                'success' => true,
                'message' => 'Data Santri berhasil dihapus',
                'data' => $santri
            ], 200);
        }

        return response()->json([
            'success' => false,
            'message' => 'Data Santri gagal dihapus',
            'data' => $santri
        ], 401);
    }

    public function reportAbsent()
    {

        $santris = Santri::join('absens', 'santris.id', '=', 'absens.santri_id')
            ->select(
                'santris.id',
                'santris.nama',
                DB::raw('SUM(CASE WHEN absens.kehadiran = "izin" THEN 1 ELSE 0 END) AS izin_count'),
                DB::raw('SUM(CASE WHEN absens.kehadiran = "alfa" THEN 1 ELSE 0 END) AS alfa_count'),
                DB::raw('SUM(CASE WHEN absens.kehadiran = "sakit" THEN 1 ELSE 0 END) AS sakit_count'),
                DB::raw('SUM(CASE WHEN absens.kehadiran = "hadir" THEN 1 ELSE 0 END) AS hadir_count'),
            )
            ->groupBy('santris.id', 'santris.nama')
            ->get();

        return response()->json([
            'success' => true,
            'message' => 'List Data Santri',
            'data' => $santris
        ], 200);
    }
}
