<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Support\Facades\Log;

class InvoiceNotification extends Notification
{
    use Queueable;

    private $order;

    /**
     * Create a new notification instance.
     */
    public function __construct($order)
    {
        $this->order = $order;
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
    public function toMail(object $notifiable): MailMessage
    {
        $url = url('/purchase/' . $this->order->order_code);
        return (new MailMessage)
            ->subject('Segera Lakukan Pembayaran')
            ->greeting('Hello')
            ->line('Orderan kamu siap untuk dibayar nih!')
            ->action('Detail Pembayaran', $url)
            ->line('Terimakasih telah menggunakan Goals Academy!');
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        $paymentMethod = $this->order->orderHistory()->where('status', 'pending')->first()->payload;
        if ($paymentMethod['payment_type'] == 'bank_transfer') {
                $paymentType = $paymentMethod['provider_name'];
        } else {
            $paymentType = $paymentMethod['payment_type'];
        }

        return [
            'category' => 'Transaksi',
            'title' => 'Segera Lakukan Pembayaran!',
            'expiry_time' => $paymentMethod['expiry_time'],
            'order_id' => $this->order->order_code,
            'payment_method' => $paymentType,
            'link' => route('purchase.status', ['order' => $this->order->order_code])
        ];
    }
}
