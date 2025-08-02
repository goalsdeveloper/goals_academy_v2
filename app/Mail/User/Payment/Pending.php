<?php

namespace App\Mail\User\Payment;

use App\Models\Order;
use DateTime;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Attachment;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use IntlDateFormatter;

class Pending extends Mailable
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
            subject: 'Payment Pending - ' . $this->order->order_code,
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        $date = new DateTime($this->order->orderHistory->first()->payload['expiry_time']);

        $formatter = new IntlDateFormatter(
            'id_ID',                            // Locale Indonesia
            IntlDateFormatter::NONE,           // Tingkat format tanggal (NONE untuk custom)
            IntlDateFormatter::NONE,           // Tingkat format waktu (NONE untuk custom)
            'Asia/Jakarta',                    // Timezone
            IntlDateFormatter::GREGORIAN,      // Kalender
            'dd MMMM yyyy HH:mm:ss'            // Pola custom format
        );

        $expiry_time = $formatter->format($date);
        $total_price = 'Rp ' . number_format($this->order->form_result['total_price'], 0, ',', '.');
        return new Content(
            markdown: 'mail.user.payment.pending',
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
