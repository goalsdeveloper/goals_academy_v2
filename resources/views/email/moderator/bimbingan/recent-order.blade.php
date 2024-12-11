@extends('email.layout')

@section('content')
    <div class="space-y-6">
        <h1 class="font-poppins font-semibold text-24">You have a new order</h1>
        <p class="text-neutral-60">Great news! You've just received a new order. Please log in to your dashboard to view the full details of the order and begin processing it.</p>
    </div>
    <div class="pt-10 space-y-10">
        <div class="space-y-2">
            <h2 class="font-poppins font-medium">Order details</h2>
            <p class="text-neutral-60">Product's Name: <span class="font-semibold text-secondary">{{ $data->products->name }}</span></p>
            <p class="text-neutral-60">No. Invoice: <span class="font-semibold text-secondary">{{ $data->order_code }}</span></p>
        </div>
        <a href="{{ $url }}" role="button" class="inline-block bg-secondary text-white rounded-lg py-[14px] px-9">Process</a>
    </div>
@endsection
