<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title inertia>{{ config('app.name', 'Goals Academy') }}</title>

    <!-- Favicon -->
    <link rel="icon" type="image/png" href="{{ asset('img/icon-goals-academy.svg') }}">

    <!-- Bootstrap Icons -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.0/font/bootstrap-icons.css">

    <!-- FontAwesome -->
    <script src="https://kit.fontawesome.com/1c256bdeea.js" crossorigin="anonymous"></script>

    <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-WSWZG2RDLM"></script>
    {{-- <script>
        window.dataLayer = window.dataLayer || [];

        function gtag() {
            dataLayer.push(arguments);
        }
        gtag('js', new Date());

        gtag('config', 'G-WSWZG2RDLM');

    </script> --}}

    <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-SZ92GS9QYP"></script>
    <script>
        window.dataLayer = window.dataLayer || [];

        function gtag() {
            dataLayer.push(arguments);
        }
        gtag('js', new Date());

        gtag('config', 'G-SZ92GS9QYP');

    </script>

    <script>
        ! function (f, b, e, v, n, t, s) {
            if (f.fbq) return;
            n = f.fbq = function () {
                n.callMethod ?
                    n.callMethod.apply(n, arguments) : n.queue.push(arguments)
            };
            if (!f._fbq) f._fbq = n;
            n.push = n;
            n.loaded = !0;
            n.version = '2.0';
            n.queue = [];
            t = b.createElement(e);
            t.async = !0;
            t.src = v;
            s = b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t, s)
        }(window, document, 'script',
            'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '7713547088705036');
        fbq('track', 'PageView');

    </script>

    <!--REDIRECTING TO NATIVE BROWSER-->
    <script>
        var userAgent = navigator.userAgent || navigator.vendor || window.opera;
        var str = navigator.userAgent;
        var instagram = str.indexOf("Instagram");
        var facebook = str.indexOf("FB");

        if (/android/i.test(userAgent) && (instagram != -1 || facebook != -1)) {
            document.write(
                "<a target=\"_blank\" href=\"https://goalsacademy.id\" download id=\"open-browser-url\">Mengarahkan ke Browser</a>"
                );
            window.stop();
            let input = document.getElementById('open-browser-url');
            if (input) {
                input.click();
            }
        }
        
    </script>

    <noscript><img height="1" width="1" style="display:none"
            src="https://www.facebook.com/tr?id=7713547088705036&ev=PageView&noscript=1" /></noscript>
    <!-- End Meta Pixel Code -->

    <!-- Fonts -->
    <link
        href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
        rel="stylesheet" />

    <!-- Scripts -->
    @routes
    @viteReactRefresh
    @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
    @inertiaHead
</head>

<body class="font-sans antialiased text-12 xs:text-16 sm:text-16 md:text-8 lg:text-12 xl:text-14 3xl:text-20">
    @inertia
    <div id="modal-root"></div>
</body>

</html>
