<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <title>{{ config('app.name') }}</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta name="color-scheme" content="light" />
  <meta name="supported-color-schemes" content="light" />

  <!-- Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Work+Sans:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">

  <style>
    @media only screen and (max-width: 600px) {
      .inner-body {
        width: 100% !important;
      }

      .footer {
        width: 100% !important;
      }
    }

    @media only screen and (max-width: 500px) {
      .button {
        width: 100% !important;
      }
      .content-cell {
        padding: 24px 16px !important;
      }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: #f2f4f6; font-family: 'Work Sans', sans-serif;">

  <table class="wrapper" width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background-color: #f2f4f6; padding: 0; margin: 0;">
    <tr>
      <td align="center">
        <table class="content" width="100%" cellpadding="0" cellspacing="0" role="presentation" style="max-width: 640px; margin: 0 auto; background-color: #ffffff;">

          {{-- Header --}}
          @if(isset($header))
          <tr>
            <td>
              {!! $header !!}
            </td>
          </tr>
          @endif

          {{-- Body --}}
          <tr>
            <td class="body" width="100%" cellpadding="0" cellspacing="0" style="padding: 0; border: none;">
              <table class="inner-body" align="center" width="100%" cellpadding="0" cellspacing="0" role="presentation" style="width: 100%; margin: 0 auto; border-top: 1px solid #e5e7eb; border-bottom: 1px solid #e5e7eb; box-shadow: none;">
                <tr>
                  <td class="content-cell" style="font-family: 'Work Sans', sans-serif; font-size: 16px; color: #333333; line-height: 1.5; padding: 32px 48px;">
                    {!! Illuminate\Mail\Markdown::parse($slot) !!}

                    @isset($subcopy)
                      <table class="subcopy" width="100%" cellpadding="0" cellspacing="0" role="presentation" style="margin-top: 24px; border: none; padding-top: 24px;">
                        <tr>
                          <td style="font-size: 14px; color: #6b7280;">
                            {!! $subcopy !!}
                          </td>
                        </tr>
                      </table>
                    @endisset
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          {{-- Footer --}}
          @if(isset($footer))
          <tr>
            <td>
              {!! $footer !!}
            </td>
          </tr>
          @endif

        </table>
      </td>
    </tr>
  </table>

</body>
</html>
