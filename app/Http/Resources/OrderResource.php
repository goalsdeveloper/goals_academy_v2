<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OrderResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'user' => [
                'name' => $this->user->profile->name,
                'username' => $this->user->username,
                'email' => $this->user->email,
                'phone_number' => $this->user->profile->phone_number,
            ],
            'order_code' => $this->order_code,
            'product_name' => $this->products->name,
            'gross_amount' => $this->gross_amount,
            'status' => $this->status,
        ];
    }
}
