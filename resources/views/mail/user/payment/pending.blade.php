<x-mail::message>
# Order Shipped
 
Your order has been shipped!

Name : {{ $data->products->name }}

Expiry time : {{ $expiry_time }}
 
<x-mail::button :url="'https://goalsacademy.id/purchase/' . $data->order_code" :align="'start'">
Pay now
</x-mail::button>

Thanks,<br>
{{ config('app.name') }}
</x-mail::message>