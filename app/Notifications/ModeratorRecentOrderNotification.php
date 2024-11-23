<?php

namespace App\Notifications;

use App\Mail\Moderator\Bimbingan\RecentOrder;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class ModeratorRecentOrderNotification extends Notification
{
    use Queueable;

    /**
     * Create a new notification instance.
     */
    protected $order, $url;
    public function __construct($order, $url)
    {
        $this->order = $order;
        $this->url = $url;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail', 'database'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): Mailable
    {
        return (new RecentOrder($this->order, $this->url))->to($notifiable->email);
    }

    public function toArray(object $notifiable): array
    {
        return [
            'category' => 'Pembelajaran',
            'title' => "Ada Bimbingan Baru!",
            'description' => "Terdapat Bimbingan Baru dengan kode {$this->order->order_code} yang Harus diproses!",
            'link' => $this->url,
        ];
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    // public function toArray(object $notifiable): array
    // {
    //     return [
    //         //
    //     ];
    // }
}
