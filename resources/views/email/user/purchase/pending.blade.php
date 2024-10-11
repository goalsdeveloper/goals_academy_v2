@extends('email.layout')

<?php
    $expiry_time = $data->orderHistory->first()->payload['expiry_time'];
    $total_price = 'Rp ' . number_format($data->form_result['total_price'], 0, ',', '.');
?>

@section('content')
    <div id="expiry_time" class="hidden">{{ $expiry_time }}</div>
    <div class="space-y-6">
        <h1 class="font-poppins font-semibold text-24">Thank you for the order</h1>
        <p class="text-neutral-60">Hello! Thanks for shopping with us. We’ve received your order No. {{ $data->order_code }}. We will notify you when we send it.</p>
    </div>
    <div class="pt-10 space-y-10">
        <div class="space-y-2">
            <h2 class="font-poppins font-medium">Order details</h2>
            <p class="text-neutral-60">No. Invoice: <span class="font-semibold text-secondary">{{ $data->order_code }}</span></p>
        </div>
        <div class="space-y-4">
            <div class="flex gap-8">
                <img src="https://goalsacademy.id/storage/{{ $data->products->product_image }}" alt="" class="w-32 h-24 rounded-md border-1 object-cover">
                <div class="h-24 flex flex-col justify-between">
                    <p class="text-neutral-40">Bisa dibayar sebelum: <span id="countdown" class="font-semibold text-red-500">00:00:00</span></p>
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
    </div>
@endsection

@section('script')
    <script>
        const expiry_time = document.getElementById('expiry_time').innerHTML;
        const countdownContainer = document.getElementById('countdown');
        // Set the date we're counting down to
        const countDownDate = new Date(expiry_time).getTime();

        // Update the count down every 1 second
        const x = setInterval(function() {
            // Get today's date and time
            const now = new Date().getTime();

            // Find the distance between now and the count down date
            const distance = countDownDate - now;

            // Time calculations for days, hours, minutes and seconds
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            // Display the result in the element with id="countdown"
            countdownContainer.innerHTML = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

            // If the count down is finished, write some text
            if (distance < 0) {
                clearInterval(x);
                countdownContainer.innerHTML = "00:00:00";
            }
        }, 1000);
    </script>
@endsection
