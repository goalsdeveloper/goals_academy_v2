@extends('email.layout')

<?php
    // $total_price = 'Rp ' . number_format($data->form_result['total_price'], 0, ',', '.');
?>

@section('content')
    <img src={{ asset('img/vector/payment.svg') }} alt="" class="h-52">
    <div class="space-y-2">
        <h1 class="font-poppins font-semibold text-24">Your payment successfull</h1>
        <p class="text-neutral-60">Hello, Thank you for your payment on {{ date_format($data->created_at, "M d, Y") }}</p>
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
                    <div class="space-y-1">
                        <p class="font-semibold">{{ $data->products->name }}</p>
                        <p class="font-poppins font-bold text-secondary">{{ Number::currency($data->form_result['total_price'], 'IDR') }}</p>
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
                    <td class="text-end">{{ Number::currency($data->form_result['total_price'], 'IDR') }}</td>
                </tr>
                <tr class="font-poppins font-semibold text-24">
                    <td class="pt-2">Total</td>
                    <td class="text-end">{{ Number::currency($data->form_result['total_price'], 'IDR') }}</td>
                </tr>
            </table>
        </div>
        <div class="space-y-6">
            <h2 class="font-poppins font-semibold text-24">Have problems or want to confirm the program?</h2>
            <p class="text-neutral-60">If you're having any issues or need to confirm program details, our team is here to help! Contact us by clicking this button bellow.</p>
        </div>
        <a href="https://api.whatsapp.com/send?phone=6282147638286" role="button" class="inline-block bg-secondary text-white rounded-lg py-[14px] px-9">Contact Admin</a>
    </div>
@endsection
