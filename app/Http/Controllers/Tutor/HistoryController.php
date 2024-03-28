<?php

namespace App\Http\Controllers\Tutor;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class HistoryController extends Controller
{
    public function index(Request $request)
    {
        $user = Auth::user();
        $paginate = $request->paginate ?? 10;
        $name = $request->name;
        $place = $request->place;
        $product = $request->product;
        $history = $user->tutor()->whereHas('tutor', function ($query) {
            $query->where('is_tutor', true);
        });
        if ($request->search) {
            $search = $request->search;
            $history = $history->whereHas('user', function ($q) use ($search) {
                $q->where('name', 'LIKE', "%$search%");
            })->orWhereHas('products', function ($q) use ($search) {
                $q->where('name', 'LIKE', "%$search%");
            })->orWhereHas('place', function ($q) use ($search) {
                $q->where('place', 'LIKE', "%$search%");
            })
                ->orWhere('date', 'LIKE', "%$search%")
                ->orWhere('time', 'LIKE', "%$search%");
        }
        $history = $history->with(
            ['user' => function ($q) use ($name) {
                $q->select(['name', 'id']);
                if (!is_null($name)) {
                    $q->orderBy('name', $name);
                }}],
            ['products' => function ($q) use ($product) {
                $q->select(['name', 'id']);
                if (!is_null($product)) {
                    $q->orderBy('name', $product);
                }}],
            ['place' => function ($q) use ($place) {
                $q->select(['place', 'id']);
                if (!is_null($place)) {
                    $q->orderBy('place', $place);
                }
            }])
            ->paginate($paginate);
        return response()->json([
            'history' => $history,
        ]);
    }
}
