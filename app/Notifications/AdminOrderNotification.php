<?php

namespace App\Notifications;

use App\Mail\Moderator\Bimbingan\RecentOrder;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class AdminOrderNotification extends Notification
{
    use Queueable;

    /**
     * Create a new notification instance.
     */
    protected $order, $url, $title, $description;
    public function __construct($order, $url)
    {
        $this->order = $order;
        $this->url = $url;
        $this->title = "";
        $this->description = "";
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
        switch ($this->order->products->productType->type) {
            case 'Bimbingan':
                $this->title = "Ada Pesanan Bimbingan Baru!";
                $this->description = "Terdapat Bimbingan Baru dengan kode {$this->order->order_code} yang Harus diproses!";
                break;
            case 'Jasa Riset':
                $this->title = "Ada Pesanan Jasa Riset Baru!";
                $this->description = "Terdapat Pesanan Jasa Riset Baru dengan kode {$this->order->order_code}!";
                break;
            case 'Webinar':
                $this->title = "Ada Pesanan Webinar Baru!";
                $this->description = "Terdapat Pesanan Webinar Baru dengan kode {$this->order->order_code}!";
                break;
            case 'Skripsi Mastery':
                $this->title = "Ada Pesanan Skripsi Mastery Baru!";
                $this->description = "Terdapat Pesanan Skripsi Mastery Baru dengan kode {$this->order->order_code}!";
                break;
            default:
                $this->title = "Ada Pesanan Baru!";
                $this->description = "Terdapat Pesanan Baru dengan kode {$this->order->order_code}!";
                break;
        }
        return [
            'category' => 'Pembelajaran',
            'title' => $this->title,
            'description' => $this->description,
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
