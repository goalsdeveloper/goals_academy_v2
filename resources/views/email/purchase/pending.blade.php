@extends('email.layout')

@section('content')
    <div class="space-y-6">
        <h1 class="font-poppins font-semibold text-24">Thank you for the order</h1>
        <p class="text-neutral-60">Hello! Thanks for shopping with us. We’ve received your order No. 13428. We will notify you when we send it.</p>
    </div>
    <div class="pt-10 space-y-10">
        <div class="space-y-2">
            <h2 class="font-poppins font-medium">Order details</h2>
            <p class="text-neutral-60">No. Invoice: <span class="font-semibold text-secondary">DBO123456789</span></p>
        </div>
        <div class="space-y-4">
            <div class="flex gap-8">
                <img src="https://goalsacademy.id/storage/product/bimbingan/bimbingan1720598439.png" alt="" class="h-24 rounded-md border-1">
                <div class="h-24 flex flex-col justify-between">
                    <p class="text-neutral-40">Bisa dibayar sebelum: <span class="font-semibold text-red-500">23:58:58</span></p>
                    <div class="space-y-1">
                        <p class="font-semibold">Dibimbing Sekali Online</p>
                        <p class="font-poppins font-bold text-secondary">Rp 88.000</p>
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
                    <td class="text-end">Rp 88.000</td>
                </tr>
                <tr class="font-poppins font-semibold text-24">
                    <td class="pt-2">Total</td>
                    <td class="text-end">Rp 88.000</td>
                </tr>
            </table>
        </div>
    </div>
@endsection