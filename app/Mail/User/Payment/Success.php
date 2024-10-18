<?php

namespace App\Mail\User\Payment;

use App\Models\Order;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Attachment;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class Success extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     */
    public function __construct(protected Order $order)
    {
        // 
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Payment Success - ' . $this->order->order_code,
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        $date = date_create($this->order->orderHistory->first()->payload['expiry_time']);
        $expiry_time = date_format($date, 'd M Y H:i:s');
        // $expiry_time = $this->order->orderHistory->first()->payload['expiry_time'];
        $total_price = 'Rp ' . number_format($this->order->form_result['total_price'], 0, ',', '.');
        return new Content(
            markdown: 'mail.user.payment.success',
            with: [
                'data' => $this->order,
                'expiry_time' => $expiry_time,
                'total_price' => $total_price,
            ]
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [
            // Attachment::fromPath('https://goalsacademy.id/img/icon-goals-academy.svg')
            //     ->as('logo.svg')
            //     ->withMime('application/image'),
        ];
    }
}
