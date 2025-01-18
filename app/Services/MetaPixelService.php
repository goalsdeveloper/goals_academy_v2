<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class MetaPixelService
{
    protected $pixelId;
    protected $accessToken;
    protected $apiUrl;
    protected $data;

    public function __construct()
    {
        $this->pixelId = env('META_PIXEL_ID');
        $this->accessToken = env('META_PIXEL_TOKEN');
        $this->apiUrl = "https://graph.facebook.com/v21.0/{$this->pixelId}/events";
        $this->data = [];
    }

    public function sendEvent()
    {
        // $response = Http::withToken($this->accessToken)
        //     ->post($this->apiUrl, [
        //         'data' => [$eventData],
        //         'test_event_code' => $eventData['test_event_code'] ?? null, // Tambahkan jika ingin menggunakan kode pengujian
        //     ]);
        try {
            $response = Http::withToken($this->accessToken)
                ->post($this->apiUrl, $this->data);
            Log::info("tracking");
            return $response->json();
        } catch (\Throwable $th) {
            // throw new ErrorException()
            return;
        }
    }

    public function setEventName($name)
    {
        $this->data['event_name'] = $name;
        return $this;
    }

    public function setEventTime($time)
    {
        $this->data['event_time'] = $time;
        return $this;
    }

    public function setUserData($email, $phone)
    {
        $user_data = [
            "em" => [
                hash('sha256', $email)
            ],
            "ph" => [
                hash('sha256', $phone)
            ]
        ];
        $this->data['user_data'] = $user_data;
        return $this;
    }

    public function setCustomData(array $custom_data)
    {
        $this->data['custom_data'] = $custom_data;
        return $this;
    }

    public function setTestCode(string $test_code)
    {
        $this->data['test_event_code'] = $test_code;
        return $this;
    }

    public function setSourceURL(string $url)
    {
        $this->data['event_source_url'] = $url;
        return $this;
    }

    public function setData($event_name, $time, $email, $phone, array $custom_data, $source_url)
    {
        return [
            "event_name" =>  $event_name,
            "event_time" =>  $time,
            "user_data" => [
                "em" => [
                    hash('sha256', $email)
                ],
                "ph" => [
                    hash('sha256', $phone)
                ]
            ],
            'custom_data' => $custom_data,
            "event_source_url" => $source_url,
            "action_source" => "website"
        ];
    }

    public function getData()
    {
        return $this->data;
    }
}
