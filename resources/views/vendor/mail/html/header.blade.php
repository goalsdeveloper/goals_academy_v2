@props(['url'])
<tr>
<td class="header">
    <table style="width: 100%;">
        <tr>
            <td style="text-align: left">
                <a href="{{ $url }}" style="text-align: left">
                    <img src="http://localhost:8000/img/mail/icon-goals-academy.png" alt="logo" style="height: 24px;">
                    <span style="font-family: Poppins, ui-sans-serif, system-ui, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji; font-size: 1.25em; font-weight: 600;">{{ $slot }}</span>
                </a>
            </td>
            <td style="text-align: right;">
                <div style="width: 100%; display: table; align-items: center; space: 32px;">
                    <div style="align-items: center; gap: 24px; color: #FF8854">
                        <a href="https://x.com/goalsacademy_id" style="width: 20px; margin: 0 8px;">
                            <img src="http://localhost:8000/img/mail/x.png" alt="x" style="height: 24px;">
                        </a>
                        <a href="https://facebook.com" style="height: 20px; margin: 0 8px;">
                            <img src="http://localhost:8000/img/mail/facebook.png" alt="facebook" style="height: 24px;">
                        </a>
                        <a href="https://www.instagram.com/goalsacademy_id/" style="height: 20px; margin: 0 8px;">
                            <img src="http://localhost:8000/img/mail/instagram.png" alt="instagram" style="height: 24px;">
                        </a>
                    </div>
                </div>
            </td>
        </tr>
    </table>
    <hr style="margin-top: 32px;">
        {{-- {{ $slot }} --}}
</td>
</tr>