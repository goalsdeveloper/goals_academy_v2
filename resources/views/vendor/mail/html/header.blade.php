@props(['url'])
<tr>
  <td class="header" style="padding: 20px 0;">
    <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
      <tr>
        <!-- Logo & Title -->
        <td align="left" style="padding: 0 16px;">
            <a href="{{ $url }}" target="_blank" style="text-decoration: none; display: inline-flex; align-items: center;">
                <img src="https://goalsacademy/img/mail/icon-goals-academy.png" alt="logo" style="height: 24px; vertical-align: middle; margin-right: 8px;">
                <span style="font-family: Poppins, ui-sans-serif, system-ui, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji; font-size: 14px; font-weight: bold; color: #000000;">{{ $slot }}</span>
            </a>
        </td>

        <!-- Social Media Icons -->
        <td align="right" style="padding: 0 16px;">
            <table cellpadding="0" cellspacing="0" role="presentation" style="display: inline-block;">
                <tr>
                <td style="padding: 0 4px;">
                    <a href="https://x.com/goalsacademy_id" target="_blank">
                    <img src="https://goalsacademy/img/mail/x.png" alt="x" style="height: 24px;">
                    </a>
                </td>
                <td style="padding: 0 4px;">
                    <a href="https://facebook.com" target="_blank">
                    <img src="https://goalsacademy/img/mail/facebook.png" alt="facebook" style="height: 24px;">
                    </a>
                </td>
                <td style="padding: 0 4px;">
                    <a href="https://www.instagram.com/goalsacademy_id/" target="_blank">
                    <img src="https://goalsacademy/img/mail/instagram.png" alt="instagram" style="height: 24px;">
                    </a>
                </td>
                </tr>
            </table>
        </td>
      </tr>
    </table>

    {{-- <hr style="margin: 24px 0 0 0; border: none; border-top: 1px solid #e5e5e5;"> --}}
  </td>
</tr>
