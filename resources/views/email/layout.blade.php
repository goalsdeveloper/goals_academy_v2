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

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet" />
    <link href="https://fonts.googleapis.com/css2?family=Work+Sans:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">

    <!-- Tailwind -->
    {{-- <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            darkMode: 'false',
            theme: {
                screens: {
                    '2xs': '320px',
                    'xs': '480px',
                    'sm': '564px',
                    'md': '768px',
                    'lg': '1024px',
                    'xl': '1280px',
                    '2xl': '1440px',
                    '3xl': '1920px',
                    '4xl': '2024px',
                    '5xl': '2560px',
                },
                extend: {
                    colors: {
                        "divider": "#F5F5F5",
                        "neutral": {
                            "10": "A6A6A6",
                            "20": "#D9D9D9",
                            "40": "#A6A6A6",
                            "50": "#848484",
                            "60": "#737373",
                            "70": "#4F4F4F",
                            "80": "#404040"
                        },
                        "info": {
                            "10": "#E5ECFF",
                            "40": "#3366FF",
                            "30": "#668CFF",
                            "50": "#0040FF"
                        },
                        "success": {
                            "10": "#EBFAF0",
                            "50": "#35CA61",
                            "60": "#2AA24E"
                        },
                        "warning": {
                            "10": "#FFF8E5",
                            "50": "#FFBD00"
                        },
                        "danger": {
                            "40": "#FF3334"
                        },
                        'primary': '#FF6420',
                        'primary-10': '#FFEDE5',
                        'primary-20': '#FFCAB2',
                        'primary-40': '#FF8854',
                        'secondary': '#FF8854',
                        'skin': '#FFDFD1',
                        'soft': '#FFF6F3',
                        'light-grey': '#848484',
                        'grey': 'color-mix(in lch, black 40%, #848484)',
                        'dark': '#404040',
                        'dark-indigo': '#3A3F51',
                    },
                    width: {
                        'xl': '160%',
                    },
                    borderWidth: {
                        '1': '1px',
                    },
                    fontFamily: {
                        'poppins': ['Poppins', 'ui-sans-serif', 'system-ui', 'sans-serif', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'],
                        'sans': ['Work Sans', 'ui-sans-serif', 'system-ui', 'sans-serif', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji']
                    },
                    fontSize: {
                        '4': '0.25rem',
                        '6': '0.375rem',
                        '8': '0.5rem',
                        '10': '0.625rem',
                        '12': '0.75rem',
                        '14': '0.875rem',
                        '16': '1rem',
                        '18': '1.125rem',
                        '20': '1.25rem',
                        '24': '1.5rem',
                        '28': '1.75rem',
                        '30': '1.875rem',
                        '32': '2rem',
                        '36': '2.25rem',
                        '40': '2.5rem',
                        '44': '2.25rem',
                        '48': '3rem',
                        '52': '3.25rem',
                        '56': '3.5rem',
                        '60': '3.75rem',
                        '64': '4rem',
                        '68': '4.25rem',
                        '72': '4.5rem',
                        '76': '4.75rem',
                        '80': '5rem',
                        '84': '5.25rem',
                        '88': '5.5rem',
                        '92': '5.75rem',
                        '96': '6rem',
                    },
                    backgroundImage: {
                        'unset': 'linear-gradient(0, #FFFFFF00 0%, #FFFFFF00 0%);',
                        'gradient-1': 'linear-gradient(165deg, #FFE6DB -0.04%, #FF8854 180.59%);',
                        'gradient-2': 'linear-gradient(125deg, rgba(255, 255, 255, 0.34) -0.03%, rgba(237, 113, 60, 0.34) 53.15%, rgba(255, 255, 255, 0.34) 101.07%);',
                        'sweep-primary': 'linear-gradient(120deg, #FF6420 90%, transparent 10%)',
                        'sweep-white': 'linear-gradient(120deg, #FFFFFF 90%, transparent 10%)',
                        'icon-primary': 'url(/resources/img/icon/goals-2.svg)',
                        'tree-1': 'url(/resources/img/vector/tree-1.svg)',
                        'tree-2': 'url(/resources/img/vector/tree-2.svg)',
                        'google': 'url(/resources/img/icon/google.svg)',
                        'facebook': 'url(/resources/img/icon/facebook.svg)',
                        'bimbingan': 'url(/resources/img/produk/bg-bimbingan.png)',
                        'produk-digital': 'url(/resources/img/produk/bg-produk-digital.png)',
                        'webinar': 'url(/resources/img/produk/bg-webinar.png)',
                        'konsultasi-lg': 'url(/resources/img/home/CTA-Desk.png)',
                        'konsultasi': 'url(/resources/img/home/CTA.png)',
                        'testimony': "url(/resources/img/home/TestimoniBG.png)",
                        'testimony-mobile': "url(/resources/img/home/TestimoniBGMobile.png)",
                    },
                    content: {
                        'career': '"Lihat Disini"',
                        'consultation': '"Tanya Sekarang"',
                        'completeness': '"Lengkapi Sekarang"',
                        'detail': '"Lihat Detail"',
                        'discount': '"Dapatkan Diskon"',
                        'pay': '"Bayar Sekarang"',
                        'mail-16': 'url(/resources/img/icon/mail-16.svg)',
                        'mail-20': 'url(/resources/img/icon/mail-20.svg)',
                        'mail-32': 'url(/resources/img/icon/mail-32.svg)',
                        'arrow-right-16': 'url(/resources/img/icon/arrow-right-16.svg)',
                        'arrow-right-20': 'url(/resources/img/icon/arrow-right-20.svg)',
                        'arrow-right-32': 'url(/resources/img/icon/arrow-right-32.svg)',
                        'arrow-right-secondary-16': 'url(/resources/img/icon/arrow-right-secondary-16.svg)',
                        'arrow-right-secondary-20': 'url(/resources/img/icon/arrow-right-secondary-20.svg)',
                        'arrow-right-secondary-24': 'url(/resources/img/icon/arrow-right-secondary-24.svg)',
                        'arrow-right-secondary-32': 'url(/resources/img/icon/arrow-right-secondary-32.svg)',
                    },
                    boxShadow: {
                        'thin': '0px 2px 4px 0 rgba(0,0,0,.25)',
                        'normal': '0px 4px 4px 0 rgba(0,0,0,.25)',
                        'top': '0px -4px 4px 0 rgba(0,0,0,.25)',
                        'centered': '0px 0px 4px 0 rgba(0,0,0,.25)',
                        'centered-spread': '0px 0px 8px 0px rgba(0,0,0,.20)',
                        'centered-left': '0px -3px 4px 0 rgba(0,0,0,.14)',
                        'bottom-right': '2px 3px 4px 0 rgba(0,0,0,.14)',
                    },
                    scale: {
                        '1': '1',
                    },
                    keyframes: {
                        'scroll': {
                                'from': { 'transform': 'translateX(0)' },
                                'to': { 'transform': 'translateX(-100%)'}
                        },
                        'slideRight': {
                            'from': { 'transform': 'translateX(-100%)' },
                            'to': { 'transform': 'translateX(0)' }
                        },
                        'fadeIn': {
                            'from': { 'opacity': '0' },
                            'to': { 'opacity': '1' }
                        },
                        'autoplayY': {
                            'from': { 'transform': 'translateY(0)' },
                            'to': { 'transform': 'translateY(-100%)' }
                        },
                        'smallBounce': {
                            '0%, 100%': {
                                'transform': 'translateY(-5%)',
                                'animation-timing-function': 'cubic-bezier(0.8,0,1,1)'
                            },
                            '50%': {
                                'transform': 'none',
                                'animation-timing-function': 'cubic-bezier(0,0,0.2,1)'
                            }
                        }
                    },
                    animation: {
                        scroll: 'scroll 20s infinite linear',
                        'scroll-slower': 'scroll 50s infinite linear',
                        'scroll-200': 'scroll 200s infinite linear',
                        slideRight: 'slideRight 3s',
                        fadeIn: 'fadeIn 3s',
                        autoplayY: 'autoplayY 20s infinite linear',
                        'bounce-sm': 'smallBounce 1s infinite',
                    }
                },
            },
        }
    </script> --}}

    @yield('head')
</head>

<body class="flex justify-center font-sans antialiased text-16 bg-neutral-20">
    <!-- Style -->
    <style>
        /* ! tailwindcss v3.4.5 | MIT License | https://tailwindcss.com */*,::after,::before{box-sizing:border-box;border-width:0;border-style:solid;border-color:#e5e7eb}::after,::before{--tw-content:''}:host,html{line-height:1.5;-webkit-text-size-adjust:100%;-moz-tab-size:4;tab-size:4;font-family:Work Sans, ui-sans-serif, system-ui, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji;font-feature-settings:normal;font-variation-settings:normal;-webkit-tap-highlight-color:transparent}body{margin:0;line-height:inherit}hr{height:0;color:inherit;border-top-width:1px}abbr:where([title]){-webkit-text-decoration:underline dotted;text-decoration:underline dotted}h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit}a{color:inherit;text-decoration:inherit}b,strong{font-weight:bolder}code,kbd,pre,samp{font-family:ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;font-feature-settings:normal;font-variation-settings:normal;font-size:1em}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-.25em}sup{top:-.5em}table{text-indent:0;border-color:inherit;border-collapse:collapse}button,input,optgroup,select,textarea{font-family:inherit;font-feature-settings:inherit;font-variation-settings:inherit;font-size:100%;font-weight:inherit;line-height:inherit;letter-spacing:inherit;color:inherit;margin:0;padding:0}button,select{text-transform:none}button,input:where([type=button]),input:where([type=reset]),input:where([type=submit]){-webkit-appearance:button;background-color:transparent;background-image:none}:-moz-focusring{outline:auto}:-moz-ui-invalid{box-shadow:none}progress{vertical-align:baseline}::-webkit-inner-spin-button,::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}summary{display:list-item}blockquote,dd,dl,figure,h1,h2,h3,h4,h5,h6,hr,p,pre{margin:0}fieldset{margin:0;padding:0}legend{padding:0}menu,ol,ul{list-style:none;margin:0;padding:0}dialog{padding:0}textarea{resize:vertical}input::placeholder,textarea::placeholder{opacity:1;color:#9ca3af}[role=button],button{cursor:pointer}:disabled{cursor:default}audio,canvas,embed,iframe,img,object,svg,video{display:block;vertical-align:middle}img,video{max-width:100%;height:auto}[hidden]{display:none}*, ::before, ::after{--tw-border-spacing-x:0;--tw-border-spacing-y:0;--tw-translate-x:0;--tw-translate-y:0;--tw-rotate:0;--tw-skew-x:0;--tw-skew-y:0;--tw-scale-x:1;--tw-scale-y:1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness:proximity;--tw-gradient-from-position: ;--tw-gradient-via-position: ;--tw-gradient-to-position: ;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-color:rgb(59 130 246 / 0.5);--tw-ring-offset-shadow:0 0 #0000;--tw-ring-shadow:0 0 #0000;--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: ;--tw-contain-size: ;--tw-contain-layout: ;--tw-contain-paint: ;--tw-contain-style: }::backdrop{--tw-border-spacing-x:0;--tw-border-spacing-y:0;--tw-translate-x:0;--tw-translate-y:0;--tw-rotate:0;--tw-skew-x:0;--tw-skew-y:0;--tw-scale-x:1;--tw-scale-y:1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness:proximity;--tw-gradient-from-position: ;--tw-gradient-via-position: ;--tw-gradient-to-position: ;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-color:rgb(59 130 246 / 0.5);--tw-ring-offset-shadow:0 0 #0000;--tw-ring-shadow:0 0 #0000;--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: ;--tw-contain-size: ;--tw-contain-layout: ;--tw-contain-paint: ;--tw-contain-style: }.inline-block{display:inline-block}.flex{display:flex}.hidden{display:none}.h-24{height:6rem}.h-6{height:1.5rem}.w-32{width:8rem}.w-full{width:100%}.max-w-\[640px\]{max-width:640px}.border-separate{border-collapse:separate}.flex-col{flex-direction:column}.items-center{align-items:center}.justify-center{justify-content:center}.justify-between{justify-content:space-between}.gap-2{gap:0.5rem}.gap-6{gap:1.5rem}.gap-8{gap:2rem}.space-y-1 > :not([hidden]) ~ :not([hidden]){--tw-space-y-reverse:0;margin-top:calc(0.25rem * calc(1 - var(--tw-space-y-reverse)));margin-bottom:calc(0.25rem * var(--tw-space-y-reverse))}.space-y-10 > :not([hidden]) ~ :not([hidden]){--tw-space-y-reverse:0;margin-top:calc(2.5rem * calc(1 - var(--tw-space-y-reverse)));margin-bottom:calc(2.5rem * var(--tw-space-y-reverse))}.space-y-2 > :not([hidden]) ~ :not([hidden]){--tw-space-y-reverse:0;margin-top:calc(0.5rem * calc(1 - var(--tw-space-y-reverse)));margin-bottom:calc(0.5rem * var(--tw-space-y-reverse))}.space-y-4 > :not([hidden]) ~ :not([hidden]){--tw-space-y-reverse:0;margin-top:calc(1rem * calc(1 - var(--tw-space-y-reverse)));margin-bottom:calc(1rem * var(--tw-space-y-reverse))}.space-y-6 > :not([hidden]) ~ :not([hidden]){--tw-space-y-reverse:0;margin-top:calc(1.5rem * calc(1 - var(--tw-space-y-reverse)));margin-bottom:calc(1.5rem * var(--tw-space-y-reverse))}.rounded-lg{border-radius:0.5rem}.rounded-md{border-radius:0.375rem}.border-1{border-width:1px}.border-y-1{border-top-width:1px;border-bottom-width:1px}.bg-neutral-20{--tw-bg-opacity:1;background-color:rgb(217 217 217 / var(--tw-bg-opacity))}.bg-secondary{--tw-bg-opacity:1;background-color:rgb(255 136 84 / var(--tw-bg-opacity))}.bg-white{--tw-bg-opacity:1;background-color:rgb(255 255 255 / var(--tw-bg-opacity))}.object-cover{object-fit:cover}.px-12{padding-left:3rem;padding-right:3rem}.px-9{padding-left:2.25rem;padding-right:2.25rem}.py-10{padding-top:2.5rem;padding-bottom:2.5rem}.py-2{padding-top:0.5rem;padding-bottom:0.5rem}.py-\[14px\]{padding-top:14px;padding-bottom:14px}.pb-2{padding-bottom:0.5rem}.pb-8{padding-bottom:2rem}.pt-10{padding-top:2.5rem}.pt-2{padding-top:0.5rem}.text-center{text-align:center}.text-end{text-align:end}.font-poppins{font-family:Poppins, ui-sans-serif, system-ui, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji}.font-sans{font-family:Work Sans, ui-sans-serif, system-ui, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji}.text-16{font-size:1rem}.text-20{font-size:1.25rem}.text-24{font-size:1.5rem}.text-\[1\.375rem\]{font-size:1.375rem}.font-bold{font-weight:700}.font-medium{font-weight:500}.font-semibold{font-weight:600}.leading-none{line-height:1}.text-neutral-40{--tw-text-opacity:1;color:rgb(166 166 166 / var(--tw-text-opacity))}.text-neutral-60{--tw-text-opacity:1;color:rgb(115 115 115 / var(--tw-text-opacity))}.text-red-500{--tw-text-opacity:1;color:rgb(239 68 68 / var(--tw-text-opacity))}.text-secondary{--tw-text-opacity:1;color:rgb(255 136 84 / var(--tw-text-opacity))}.text-white{--tw-text-opacity:1;color:rgb(255 255 255 / var(--tw-text-opacity))}.antialiased{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}
    </style>
    
    <div class="max-w-[640px] w-full bg-white px-12">
        <header class="flex justify-between pt-10 pb-8">
            <div class="flex items-center gap-2">
                <img src={{ asset("img/icon-goals-academy.svg") }} alt="" class="h-6">
                <span class="text-poppins text-20 font-semibold leading-none">Goals Academy</span>
            </div>
            <div class="flex items-center gap-6 text-secondary">
                <a href="https://x.com/goalsacademy_id"><i class="fa-brands fa-twitter text-[1.375rem]"></i></a>
                <a href="https://facebook.com"><i class="fa-brands fa-facebook text-[1.375rem]"></i></a>
                <a href="https://www.instagram.com/goalsacademy_id/"><i class="fa-brands fa-instagram text-[1.375rem]"></i></a>
            </div>
        </header>
        <main class="border-y-1 py-10">
            @yield('content')
        </main>
        <footer class="text-center pt-10 pb-8">
            <p>Jl. Graha Joyo Family | Kota Malang | Jawa Timur</p>
            <p>&copy; 2024 Goals Academy. All rights reserved</p>
        </footer>
    </div>
</body>

@yield('script')

</html>
