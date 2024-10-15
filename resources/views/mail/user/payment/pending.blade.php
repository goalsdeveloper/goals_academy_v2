<x-mail::message>
<div class="space-y-6">
    <h1 class="font-poppins font-semibold text-24">Thank you for the order</h1>
    <p class="text-neutral-60">Hello! Thanks for shopping with us. We’ve received your order No. {{ $data->order_code }}. We will notify you when we send it.</p>
</div>
<div class="pt-10 space-y-10">
    <div class="space-y-2">
        <h2 class="font-poppins font-medium">Order details</h2>
        <p class="text-neutral-60">No. Invoice: <span class="font-semibold text-secondary">{{ $data->order_code }}</span></p>
    </div>
    <div class="space-y-6">
        <div class="flex gap-8" style="flex-wrap: wrap">
            <img src="https://goalsacademy.id/storage/{{ $data->products->product_image }}" alt="" class="w-32 h-24 rounded-md border-1 object-cover">
            <div class="h-24 flex flex-col justify-between gap-2">
                <p class="text-neutral-40">Bisa dibayar sebelum: <span class="font-semibold text-red-500">{{ $expiry_time }}</span></p>
                <div class="space-y-1">
                    <p class="font-semibold">{{ $data->products->name }}</p>
                    <p class="font-poppins font-bold text-secondary">{{ $total_price }}</p>
                </div>
            </div>
        </div>
        <table class="w-full border-separate">
            <tr>
                <td class="pb-2">Payment method</td>
                <td class="text-end">Gopay</td>
            </tr>
            <tr>
                <td class="py-2">Subtotal</td>
                <td class="text-end">{{ $total_price }}</td>
            </tr>
            <tr class="font-poppins font-semibold text-24">
                <td class="pt-2">Total</td>
                <td class="text-end">{{ $total_price }}</td>
            </tr>
        </table>
    </div>
    <a href="https://goalsacademy.id/purchase/{{ $data->order_code }}" role="button" class="inline-block bg-secondary text-white rounded-lg py-[14px] px-9">Pay now</a>
    {{-- <x-mail::button :url="'https://goalsacademy.id/purchase/' . $data->order_code" :align="'start'">
    Pay now
    </x-mail::button> --}}
</div>


</x-mail::message>