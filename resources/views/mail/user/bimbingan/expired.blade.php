<x-mail::message>
# Your access has expired<br><br>
Hello, Your access for <a href="https://goalsacademy.id/bimbingan/{{ $data->order_code }}" style="font-weight: 500; color: #FF8854;">{{ $data->products->name }}</a> program has expired. Don't worry, you can still continue your learning journey . Renew your access now!
<br><br><br>
<x-mail::button :url="'https://goalsacademy.id/produk'" :align="'start'">
Buy new access
</x-mail::button>
</x-mail::message>