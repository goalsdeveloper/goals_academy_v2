<x-mail::message>
# Confirm your email address<br><br>
Hello, Please click the button below to verify your email address. If you did not create an account, no further action is required.
<br><br><br>
<x-mail::button :url="$url" :align="'start'">
Confirm email address
</x-mail::button>
<br><br>
If you're having trouble clicking the "Verify Email Address" button, copy and paste the URL below into your web browser: 
<a href="{{ $url }}" target="_blank">{{ $url }}</a>
</x-mail::message>
