<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class GeneralCourseNotification extends Notification
{
    use Queueable;

    /**
     * Create a new notification instance.
     */
    protected $title, $description, $url, $via;
    public function __construct($title, $description, $url, $via = ['database'])
    {
        $this->title = $title;
        $this->description = $description;
        $this->url = $url;
        $this->via = $via;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return $this->via;
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
        ->subject('Goals Academy Notifications')
        ->line($this->title)
        ->line($this->description)
        ->action('Notification Action', $this->url);
    }

    public function toArray(object $notifiable): array
    {
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
