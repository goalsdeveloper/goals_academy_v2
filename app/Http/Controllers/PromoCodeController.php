<?php

namespace App\Http\Controllers;

use App\Models\PromoCode;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PromoCodeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $req)
    {
        return Inertia::render('Auth/Admin/Bimbingan/PromoCode', [
            'promo_code' => function () use ($req) {
                $perPage = $req->input('perPage', 5);
                $search = $req->search;
                $promos = PromoCode::when($search, function ($q) use ($search){
                    $q->where('promo_code', 'LIKE', "%$search%")
                    ->orWhere('description', 'LIKE', "%$search%")
                    ->orWhere('value', 'LIKE', "%$search%")
                    ->orWhere('date_start', 'LIKE', "%$search%")
                    ->orWhere('date_end', 'LIKE', "%$search%")
                    ->orWhere('created_at', 'LIKE', "%$search%");
                })->paginate($perPage);
                return $promos;
            }
        ]);
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
        try {
            $data  = $request->validate([
                'promo_code' => 'required|string',
                'description' => 'required|string',
                'value' => 'required|numeric',
                'date_start' => 'required|date',
                'date_end' => 'required|date',
            ]);
            PromoCode::create($data);
        } catch (\Throwable $th) {
            return redirect()->back()->with('error', 'Gagal Menyimpan Kode Promo');
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(PromoCode $promo_code)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(PromoCode $promo_code)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, PromoCode $promo_code)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(PromoCode $promo_code)
    {
        //
    }
}
