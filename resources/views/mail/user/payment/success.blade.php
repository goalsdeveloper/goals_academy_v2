<x-mail::message>
<img src="https://goalsacademy.id/img/vector/payment.png" alt="payment-vector" height="200">

# Pembayaran berhasil
Halo! Terima kasih telah melakukan pembayaran untuk produk kami. Kami telah menerima pembayaranmu dengan No. {{ $data->order_code }}.

<div style="padding-top: 20px;">
    <div style="margin-bottom: 20px;">
        <h2 style="margin-bottom: 8px;">Detail pesanan</h2>
        <p>No. Invoice: <span style="font-weight: 600; color: #FF8854;">{{ $data->order_code }}</span></p>
    </div>
    <div style="margin: 20px 0;">
        <table style="margin-bottom: 24px;">
            <tr style="vertical-align: top;">
                <td>
                    <img src="https://goalsacademy.id/storage/{{$data->products->product_image}}" alt="product-image" width="128" style="object-fit: cover; border: none;">
                </td>
                <td style="padding-left: 16px; height: 96px;">
                    <p style="font-weight: 600">{{ $data->products->name }}</p>
                    <p style="font-family: Poppins, ui-sans-serif, system-ui, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji; font-weight: 700; color: #FF8854;">{{ $total_price }}</p>
                </td>
            </tr>
        </table>
        <table class="w-full border-separate" style="width: 100%;">
            <tr>
                <td style="padding-bottom: 4px;">Metode pembayaran</td>
                <td style="text-align: right">Gopay</td>
            </tr>
            <tr>
                <td style="padding: 4px 0;">Subtotal</td>
                <td style="text-align: right">{{ $total_price }}</td>
            </tr>
            <tr style="font-family: Poppins, ui-sans-serif, system-ui, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji; font-weight: 600; font-size: 16px;">
                <td style="padding-top: 4px">Total</td>
                <td style="text-align: right">{{ $total_price }}</td>
            </tr>
        </table>
    </div>
</div>

# Konfirmasi pesananmu sekarang
Silahkan konfirmasi pesananmu ke MinGoals sekarang dengan klik tombol berikut. <br><br>

<x-mail::button :url="'https://api.whatsapp.com/send?phone=6282147638286'" :align="'start'">
Konfirmasi pesanan
</x-mail::button>
</x-mail::message>
