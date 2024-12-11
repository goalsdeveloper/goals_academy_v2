<x-mail::message>
# Reset your password<br><br>
We have received a request to have your password reset. if you did not make this request, please ignore this email. To reset your password, please click this button bellow.
<br><br><br>
<x-mail::button :url="route('auth.reset-password.form', ['token' => $token, 'email' => $data->email])" :align="'start'">
Reset password
</x-mail::button>
</x-mail::message>
