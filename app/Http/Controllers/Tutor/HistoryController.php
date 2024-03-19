<?php

namespace App\Http\Controllers\Tutor;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class HistoryController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $history = $user->tutor()->whereHas('tutor', function ($query) {
            $query->where('is_tutor', true);
        })->with('user', 'products')->paginate(10);
        return response()->json([
            'history' => $history,
        ]);
    }
}
