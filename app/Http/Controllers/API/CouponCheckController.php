<?php

namespace App\Http\Controllers\API;

use App\Models\User;
use App\Models\PromoCode;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class CouponCheckController extends Controller
{
    public function couponCheck(Request $request)
    {
        $user = User::where('id', $request->userId)->first();

        if ($request->inputCode) {
            $cekPromo = PromoCode::where('promo_code', $request->inputCode)->first();
            if (!$cekPromo) {
                return response()->json(['message' => 'Promo tidak ditemukan!']);
            }
            if ($user->kodePromo()->where('promo_code_id', $cekPromo->id)->exists()) {
                return response()->json(['message' => 'Kode promo sudah digunakan, silahkan menggunakan kode promo lainnya!']);
            }
            return response()->json(['message' => 'Promo berhasil terpakai', 'data' => $cekPromo]);
        }
    }
}
