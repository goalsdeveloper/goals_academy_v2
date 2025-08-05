<tr>
    <td align="center" style="padding: 0;">
        {{-- <hr style="border: none; border-top: 1px solid #e5e5e5; width: 100%;"> --}}
        <table class="footer" align="center" width="100%" cellpadding="0" cellspacing="0" role="presentation" style="max-width: 640px; width: 100%; padding: 0 16px;">
            <tr>
                <td align="center" style="padding: 20px 0; font-family: 'Work Sans', sans-serif; font-size: 14px; color: #888888; line-height: 1.5; text-align: center;">
                {{ Illuminate\Mail\Markdown::parse($slot) }}
                </td>
            </tr>
        </table>
    </td>
</tr>
