<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Kategori;
use Illuminate\Support\Facades\Validator;

class KategoriController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $kategori = Kategori::all();
        return response()->json([
            'success' => true,
            'message' => 'List Data Kategori',
            'data' => $kategori
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
                'kategori' => 'required',
            ],
            [
                'kategori.required' => 'Kategori tidak boleh kosong',
            ]
        );
        if($validatedData->fails()){
            return response()->json([
                'success' => false,
                'message' => 'Isi data yang kosong',
                'data' => $validatedData->errors()
            ], 401);
        }
        $kategori = Kategori::create([
            'kategori' => $request->kategori,
        ]);
        if($kategori){
            return response()->json([
                'success' => true,
                'message' => 'Kategori berhasil ditambahkan',
                'data' => $kategori
            ], 201);
        }else{
            return response()->json([
                'success' => false,
                'message' => 'Kategori gagal ditambahkan',
                'data' => $kategori
            ], 401);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $kategori = Kategori::whereId($id)->first();
        if($kategori){
            return response()->json([
                'success' => true,
                'message' => 'Detail Data Kategori',
                'data' => $kategori
            ], 201);
        }else{
            return response()->json([
                'success' => false,
                'message' => 'Data Kategori tidak ditemukan',
                'data' => ''
            ], 401);
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        // $kategori = Kategori::whereId($id)->first();
        // if($kategori){
        //     return response()->json([
        //         'success' => true,
        //         'message' => 'Detail Data Kategori',
        //         'data' => $kategori
        //     ], 201);
        // }else{
        //     return response()->json([
        //         'success' => false,
        //         'message' => 'Data Kategori tidak ditemukan',
        //         'data' => ''
        //     ], 401);
        // }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $kategori = Kategori::whereId($id)->update([
            'kategori' => $request->kategori,
        ]);
        if($kategori){
            return response()->json([
                'success' => true,
                'message' => 'Kategori berhasil diupdate',
                'data' => $kategori
            ], 201);
        }else{
            return response()->json([
                'success' => false,
                'message' => 'Kategori gagal diupdate',
                'data' => $kategori
            ], 401);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $kategori = Kategori::whereId($id)->delete();
        if($kategori){
            return response()->json([
                'success' => true,
                'message' => 'Kategori berhasil dihapus',
                'data' => $kategori
            ], 201);
        }else{
            return response()->json([
                'success' => false,
                'message' => 'Kategori gagal dihapus',
                'data' => $kategori
            ], 401);
        }
    }
}
