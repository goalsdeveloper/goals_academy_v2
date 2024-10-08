@extends('email.layout')

@section('content')
    <div class="space-y-6">
        <h1 class="font-poppins font-semibold text-24">Your access has expired</h1>
        <p class="text-neutral-60">Hello, Your access for <a href="https://goalsacademy.id/bimbingan/{{ $data->order_code }}" class="font-medium text-secondary">{{ $data->products->name }}</a> program has expired. Don't worry, you can still continue your learning journey . Renew your access now!</p>
    </div>
    <div class="pt-10 space-y-10">
        <a href="https://goalsacademy.id/produk" role="button" class="inline-block bg-secondary text-white rounded-lg py-[14px] px-9">Buy new access</a>
    </div>
@endsection
