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
            $promoCode = PromoCode::where('promo_code', $request->inputCode)->first();
            // Mengecek apakah promo code ditemukan
            if (!$promoCode) {
                return response()->json(['message' => 'Promo tidak ditemukan!'], 400);
            }
            // Mengecek apakah promo code hanya berlaku untuk produk tertentu
            if ($promoCode->product_ids) {
                $productIds = json_decode($promoCode->product_ids);
                if (!in_array($request->productId, $productIds)) {
                    return response()->json(['message' => 'Kode promo tidak berlaku untuk produk ini.'], 400);
                }
            }
            // Mengecek apakah promo code masih berlaku
            if ($promoCode->date_start > now()) {
                return response()->json(['message' => 'Promo code belum berlaku.'], 400);
            }
            if ($promoCode->date_end < now()) {
                return response()->json(['message' => 'Promo code sudah expired.'], 400);
            }
            // Mengecek apakah kuota promo code sudah habis
            if (!$promoCode->quota > 0) {
                return response()->json(['message' => 'Kuota promo code sudah habis.'], 400);
            }
            // Mengecek apakah promo code sudah digunakan oleh user
            if ($user->promoCode()->where('promo_code_id', $promoCode->id)->exists()) {
                return response()->json(['message' => 'Kode promo sudah digunakan, silahkan menggunakan kode promo lainnya!']);
            }
            return response()->json(['message' => 'Promo berhasil terpakai', 'data' => $promoCode]);
        }
    }
}
