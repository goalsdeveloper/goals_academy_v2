<x-mail::message>
# You have a new order<br><br>
Great news! You've just received a new order. Please log in to your dashboard to view the full details of the order and begin processing it.

<div style="padding: 40px 0;">
    <div class="space-y-2" style="margin-bottom: 40px 0;">
        <h2>Order details</h2>
        <p>Product's Name: <span class="font-semibold text-secondary" style="font-weight: 600; color: #FF8854;">{{ $data->products->name }}</span></p>
        <p>No. Invoice: <span class="font-semibold text-secondary" style="font-weight: 600; color: #FF8854;">{{ $data->order_code }}</span></p>
    </div>
</div>

<x-mail::button :url="'https://goalsacademy.id/moderator/bimbingan/order/' . $data->order_code . '/edit'" :align="'start'">
Process Order
</x-mail::button>
</x-mail::message>
