<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class NotificationController extends Controller
{
    public function readNotification(String $id)
    {
        // dd('test');
        $user = Auth::user();
        $notif = $user->notifications()->where('id', $id)->first();
        if ($notif) {
            $notif->markAsRead();
            return response()->json([
                'message' => 'Dibaca',
            ]);
        }
        return response()->json([
            'message' => 'Notif Tidak Ditemukan',
        ], 404);
    }

    public function index () {
        $user = Auth::user();
        $notifications = $user->notifications;
        return response()->json([
            'notifications' => $notifications,
        ]);
    }
}
