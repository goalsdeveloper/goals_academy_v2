<?php

namespace App\Observers;

use App\Models\User;
use App\Models\Order;
use Illuminate\Support\Facades\Log;
// use Filament\Notifications\Notification;
// use Filament\Notifications\Actions\Action;
// use App\Filament\AdminDashboard\Resources\CourseResource as AdminDashboard;
// use App\Filament\Moderator\Resources\CourseResource as ModeratorDashboard;

class OrderObserver
{
    /**
     * Handle the Order "created" event.
     */
    // public function created(Order $order): void
    // {
    //     //
    // }

    // /**
    //  * Handle the Order "updated" event.
    //  */
    // public function updated(Order $order): void
    // {
    //     $changes = $order->getChanges();
    //     $users = User::where('user_role', ['admin', 'moderator'])->get();
    //     if ($changes['status'] == 'Success') {
    //         foreach ($users as $receipent) {
    //             if ($receipent['user_role'] == 'admin') {
    //                 Notification::make()
    //                     ->title('Ada Bimbingan Baru Nih!')
    //                     ->info()
    //                     ->body($order->order_code . ' telah masuk dalam daftar bimbingan!')
    //                     ->actions([
    //                         Action::make('View')->url(
    //                             AdminDashboard::getUrl('edit', ['record' => $order->course], true, 'dashboard')
    //                         )
    //                     ])
    //                     ->sendToDatabase($receipent);
    //             } else if ($receipent['user_role'] == 'moderator') {
    //                 Notification::make()
    //                     ->title('Ada Bimbingan Baru Nih!')
    //                     ->info()
    //                     ->body($order->order_code . ' telah masuk dalam daftar bimbingan!')
    //                     ->actions([
    //                         Action::make('View')->url(
    //                             ModeratorDashboard::getUrl('edit', ['record' => $order->course], true, 'moderator')
    //                         )
    //                     ])
    //                     ->sendToDatabase($receipent);
    //             }
    //         }
    //         Log::alert("{$order->user->name} telah berhasil membayar pembelian {$order->order_code}");
    //     }
    // }

    // /**
    //  * Handle the Order "deleted" event.
    //  */
    // public function deleted(Order $order): void
    // {
    //     //
    // }

    // /**
    //  * Handle the Order "restored" event.
    //  */
    // public function restored(Order $order): void
    // {
    //     //
    // }

    // /**
    //  * Handle the Order "force deleted" event.
    //  */
    // public function forceDeleted(Order $order): void
    // {
    //     //
    // }
}
