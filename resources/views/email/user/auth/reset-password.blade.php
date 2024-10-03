@extends('email.layout')

@section('content')
    <div class="space-y-6">
        <h1 class="font-poppins font-semibold text-24">Reset your password</h1>
        <p class="text-neutral-60">We have received a request to have your password reset. if you did not make this request, please ignore this email. To reset your password, please click this button bellow.</p>
    </div>
    <div class="pt-10 space-y-10">
        <a href="https://www.goalsacademy.id/reset-password/{{ $data->email }}" role="button" class="inline-block bg-secondary text-white rounded-lg py-[14px] px-9">Reset password</a>
    </div>
@endsection