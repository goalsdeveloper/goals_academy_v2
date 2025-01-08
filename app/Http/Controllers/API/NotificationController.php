<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class NotificationController extends Controller
{
    public function readNotification(String $id)
    {
        $user = Auth::user();
        $notif = $user->notifications()->where('id', $id)->first();
        if ($notif) {
            $notif->markAsRead();
            if (!isset($notif->data['link'])) {
                return redirect()->back()->with('success', 'notif berhasil dibaca');
            }
            return Inertia::location($notif->data['link']);
        }
        return redirect()->back()->with('error', 'data tidak ditemukan');
    }

    public function getNewNotification(Request $req)
    {

    }

    public function userNotification(Request $req)
    {
        $user = Auth::user();
        $transactions_notifications = $user->notifications()->where('data->category', 'Transaksi')->where('created_at', '<=', Carbon::now()->subHours(24)->toDateTimeString());
        $new_transactions_notifications = $user->notifications()->where('data->category', 'Transaksi')->where('created_at', '>=', Carbon::now()->subHours(24)->toDateTimeString());
        $promo_notifications = $user->notifications()->where('data->category', 'Promo');
        $program_notifications = $user->notifications()->where('data->category', 'Pembelajaran');
        if ($req['new'] == true) {
            $transactions_notifications = $new_transactions_notifications->get();
            $promo_notifications = $promo_notifications->where('created_at', '>=', Carbon::now()->subHours(24)->toDateTimeString())->limit(5)->get();
            $program_notifications = $program_notifications->where('created_at', '>=', Carbon::now()->subHours(24)->toDateTimeString())->limit(5)->get();
        } else {
            $transactions_notifications = $transactions_notifications->paginate(5);
            $new_transactions_notifications = $new_transactions_notifications->get();
            $promo_notifications = $promo_notifications->paginate(5);
            $program_notifications = $program_notifications->paginate(5);
        }
        return response()->json([
            'transaction_notifications' => $transactions_notifications,
            'new_transaction_notifications' => $new_transactions_notifications,
            'program_notifications' => $program_notifications,
            'promo_notifications' => $promo_notifications,
        ]);
    }

    public function index(Request $req)
    {
        $user = Auth::user();
        $new_notifications = $user->notifications()->where('created_at', '>=', Carbon::now()->subHours(24)->toDateTimeString())->get();
        $old_notifications = $user->notifications()->where('created_at', '<=', Carbon::now()->subHours(24)->toDateTimeString())->paginate(5);
        return response()->json([
            'new_notifications' => $new_notifications,
            'old_notifications' => $old_notifications,
        ]);
    }

    public function getMoreNotif(Request $req)
    {
        $user = Auth::user();
        $type = $req['type'];
        $current_page = $req['page'];
        $notifications = $user->notifications()->when($type, function ($q) use ($type) {
            $q->where('data->category', $type)->when($type == 'Transaksi', function ($q) {
                $q->where('created_at', '<=', Carbon::now()->subHours(24)->toDateTimeString());
            });
        })->paginate(5, page: $current_page);
        return response()->json([
            'notifications' => $notifications,
        ]);
    }

    public function readAll() {
        $user = Auth::user();
        try {
            $user->unreadNotifications->markAsRead();
            return redirect()->back();
        } catch (\Throwable $th) {
            return redirect()->back();
        }
    }
}
