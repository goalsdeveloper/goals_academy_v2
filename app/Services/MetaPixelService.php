<?php

namespace App\Services;

use ErrorException;
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
        $this->apiUrl = "https://graph.facebook.com/v21.0/{$this->pixelId}/events?access_token=" . $this->accessToken;
        $this->data = [];
        if (env('META_PIXEL_TEST_MODE')) {
            $this->data['test_event_code'] = env('META_PIXEL_TEST_CODE');
        }
    }

    public function sendEvent()
    {
        try {
            $response = Http::post($this->apiUrl, $this->data);
            if($response->status() != 200 ){
                Log::error($response->json());
            }
            return $response->json();
        } catch (\Throwable $th) {
            Log::error($th->getMessage());
            throw new ErrorException($th->getMessage());
            // return;
        }
    }

    public function setEventName($name)
    {
        $this->data['data'][0]['event_name'] = $name;
        return $this;
    }

    public function setEventTime($time)
    {
        $this->data['data'][0]['event_time'] = $time;
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
        $this->data['data'][0]['user_data'] = $user_data;
        return $this;
    }

    public function setCustomData(array $custom_data)
    {
        $this->data['data'][0]['custom_data'][0] = $custom_data;
        return $this;
    }

    public function setSourceURL(string $url)
    {
        $this->data['data'][0]['event_source_url'] = $url;
        return $this;
    }

    public function setActionSource()
    {
        $this->data['data'][0]['action_source'] = "website";
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

    public function trackingViewContent($email, $phone, array $custom_data, $source_url)
    {
        $this->setEventName("ViewContent")->setEventTime(time())
            ->setUserData($email, $phone)->setCustomData($custom_data)
            ->setSourceURL($source_url)->setActionSource()->sendEvent();
        return;
    }

    public function trackingPurchase($email, $phone, array $custom_data, $source_url)
    {
        $this->setEventName("Purchase")->setEventTime(time())
            ->setUserData($email, $phone)->setCustomData($custom_data)
            ->setSourceURL($source_url)->setActionSource()->sendEvent();
        return;
    }

    public function trackingInitiateCheckout($email, $phone, array $custom_data, $source_url)
    {
        $this->setEventName("InitiateCheckout")->setEventTime(time())
            ->setUserData($email, $phone)->setCustomData($custom_data)
            ->setSourceURL($source_url)->setActionSource()->sendEvent();
        return;
    }

    public function getData()
    {
        return $this->data;
    }
}
