<?php

return [
    'merchant_id' => env('MID_MERCHANT_ID'),
    'client_key' => env('MID_CLIENT_KEY'),
    'server_key' => env('MID_SERVER_KEY'),

    'is_production' => env('MID_IS_PRODUCTION', false),
    'is_sanitized' => true,
    'is_3ds' => true,
];
