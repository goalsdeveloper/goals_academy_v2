<x-mail::message>
# Thank you for the order <br><br>
Hello! Thanks for shopping with us. We’ve received your order No. {{ $data->order_code }}. We will notify you when we send it.

<div style="padding-top: 40px;">
    <div class="space-y-2" style="margin-bottom: 40px 0;">
        <h2>Order details</h2>
        <p>No. Invoice: <span class="font-semibold text-secondary" style="font-weight: 600; color: #FF8854;">{{ $data->order_code }}</span></p>
    </div>
    <div style="margin: 40px 0;">
        <table style="margin-bottom: 24px;">
            <tr style="vertical-align: top;">
                <td>
                    <img src="https://goalsacademy.id/storage/{{ $data->products->product_image }}" alt="product-image" width="128" height="96" style="object-fit: cover; border-width: 1px; border-radius: 6px;">
                </td>
                <td style="padding-left: 2em;">
                    <div style="height: 96px;">
                        <p style="margin-bottom: 2em;">Bisa dibayar sebelum: <span style="font-weight: 600; color: red;">{{ $expiry_time }}</span></p>
                        <div>
                            <p style="font-weight: 600">{{ $data->products->name }}</p>
                            <p style="font-family: Poppins, ui-sans-serif, system-ui, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji; font-weight: 700; color: #FF8854;">{{ $total_price }}</p>
                        </div>
                    </div>
                </td>
            </tr>
        </table>
        <table class="w-full border-separate" style="width: 100%;">
            <tr>
                <td style="padding-bottom: 8px;">Payment method</td>
                <td style="text-align: right">Gopay</td>
            </tr>
            <tr>
                <td style="padding: 8px 0;">Subtotal</td>
                <td style="text-align: right">{{ $total_price }}</td>
            </tr>
            <tr style="font-family: Poppins, ui-sans-serif, system-ui, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji; font-weight: 600; font-size: 1.5em;">
                <td style="padding-top: 8px">Total</td>
                <td style="text-align: right">{{ $total_price }}</td>
            </tr>
        </table>
    </div>
</div>

<x-mail::button :url="'https://goalsacademy.id/purchase/' . $data->order_code" :align="'start'">
Pay now
</x-mail::button>
</x-mail::message>
