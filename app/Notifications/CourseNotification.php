<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class CourseNotification extends Notification
{
    use Queueable;

    protected $course;
    protected $key;
    protected $pesan;

    /**
     * Create a new notification instance.
     */
    public function __construct($course, $key, $pesan = null)
    {
        $this->course = $course;
        $this->key = $key;
        if ($pesan !== null) {
            $this->pesan = $pesan;
        }
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
        $userRole = $notifiable->user_role;
        switch ($userRole) {
            case 'admin':
                $subject = "Perubahan Data Bimbingan {$this->course->order->order_code}";
                $line1 = 'Admin telah melakukan perubahan data pada bimbingan ' . $this->course->order->order_code . '. Lihat selengkapnya di:';
                break;
            case 'tutor':
                $subject = 'Bimbingan Baru!';
                $line1 = 'Kamu mendapatkan bimbingan baru, lihat selengkapnya di:';
                break;
            case 'user':
                if ($this->pesan !== null) {
                    $resultSwitch = $this->handleSwitchUser($this->key, $this->pesan);
                }
                $resultSwitch = $this->handleSwitchUser($this->key);
                $subject = $resultSwitch['subject'];
                $line1 = $resultSwitch['line1'];
                break;
            default:
                $subject = "Perubahan Data Bimbingan {$this->course->order->order_code}";
                $line1 = 'Admin telah melakukan perubahan data pada bimbingan ' . $this->course->order->order_code . '. Lihat selengkapnya di:';
                break;
        }
        return (new MailMessage)
            ->subject($subject)
            ->line($line1)
            ->action('View Course Details', url('/pembelajaran/' . $this->course->order->order_code))
            ->line('Terimakasih telah menggunakan Goals Academy!');
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toDatabase(object $notifiable): array
    {
        return [
            'title' => "ini adalah title notifikasi",
            'body' => "ini adalah body notifikasi",
            'link' => url('/pembelajaran/' . $this->course->order->order_code),
        ];
    }

    public function handleSwitchUser($value, $pesan = null)
    {
        $result = ['subject', 'line1'];
        switch ($value) {
            case 'tutor_id':
                $result['subject'] = "Perubahan Tutor Bimbingan";
                $result['line1'] = "Kamu mendapat perubahan pada Tutor bimbingan, lihat selengkapnya di:";
                break;
            case 'location':
                $result['subject'] = "Perubahan Lokasi Bimbigan";
                $result['line1'] = "Kamu mendapat perubahan pada Lokasi bimbingan, lihat selengkapnya di:";
                break;
            case 'date':
                $result['subject'] = "Perubahan Tanggal Bimbingan";
                $result['line1'] = "Kamu mendapat perubahan pada Tanggal bimbingan, lihat selengkapnya di:";
                break;
            case 'time':
                if ($pesan !== null) {
                    $result['subject'] = $pesan;
                } else {
                    $result['subject'] = "Perubahan Waktu Bimbingan";
                }
                $result['line1'] = "Kamu mendapat perubahan pada Waktu bimbingan, lihat selengkapnya di:";
                break;
        }
        return $result;
    }
}
