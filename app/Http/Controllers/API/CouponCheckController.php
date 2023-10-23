<?php

namespace App\Http\Controllers\API;

use App\Models\PromoCode;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class CouponCheckController extends Controller
{
    public function couponCheck(Request $request)
    {
        $user = auth()->user();

        if ($request->promo_code) {
            $cekPromo = PromoCode::where('promo_code', $request->promo_code)->first();
            if (!$cekPromo) {
                return response()->json(['message' => 'Promo tidak ditemukan!']);
            }
            if ($user->kodePromo()->where('promo_code_id', $cekPromo->id)->exists()) {
                return response()->json(['message' => 'Kode promo telah terpakai']);
            } else {
                $promoCode = $user->kodePromo()->attach($cekPromo->id);
            }
            // return response()->json(['message' => 'Kode promo berhasil digunakan']);
        }
    }
}
