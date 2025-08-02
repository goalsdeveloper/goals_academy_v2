<x-mail::message>
# Pesanan diterima <br>
Halo! Terima kasih telah memesan produk kami. Kami telah menerima pesananmu dengan No. {{ $data->order_code }}.

<div style="padding-top: 20px;">
    <div style="margin-bottom: 20px;">
        <h2 style="margin-bottom: 8px;">Detail pesanan</h2>
        <p>No. Invoice: <span style="font-weight: 600; color: #FF8854;">{{ $data->order_code }}</span></p>
    </div>
    <div style="margin: 20px 0;">
        <table style="margin-bottom: 24px;">
            <tr style="vertical-align: top;">
                <td>
                    <img src="https://goalsacademy.id/storage/{{$data->products->product_image}}" alt="product-image" width="128" style="object-fit: cover;">
                </td>
                <td style="padding-left: 16px;">
                    <div style="height: 96px;">Bayar sebelum: <span style="font-weight: 600; color: red;">{{ $expiry_time }}</span></p>
                        <div>
                            <p style="font-weight: 600">{{ $data->products->name }}</p>
                            <p style="font-family: Poppins, ui-sans-serif, system-ui, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji; font-weight: 600; color: #FF8854;">{{ $total_price }}</p>
                        </div>
                    </div>
                </td>
            </tr>
        </table>
        <table style="width: 100%; border-collapse: separate;">
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

<x-mail::button :url="route('purchase.status', ['order' => $data->order_code])" :align="'start'">
    Bayar sekarang
</x-mail::button>
</x-mail::message>
