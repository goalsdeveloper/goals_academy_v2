@extends('email.layout')

@section('content')
    <div class="space-y-6">
        <h1 class="font-poppins font-semibold text-24">Confirm your email address</h1>
        <p class="text-neutral-60">Hello, Please click the button below to verify your email address. If you did not create an account, no further action is required.</p>
    </div>
    <div class="pt-10 space-y-10">
        <a href="https://www.goalsacademy.id/email/verify/{{ $data->email }}" role="button" class="inline-block bg-secondary text-white rounded-lg py-[14px] px-9">Confirm email address</a>
        <p>
            If you're having trouble clicking the "Verify Email Address" button, copy and paste the URL below into your web browser: <a href="https://www.goalsacademy.id/email/verify/{{ $data->email }}" class="text-blue-500 underline">https://www.goalsacademy.id/email/verify/{{ $data->email }}</a>
        </p>
    </div>
@endsection