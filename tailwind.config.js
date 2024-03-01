import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
        './node_modules/tw-elements/dist/js/**/*.js'
    ],
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
                "neutral": {
                    "20": "#D9D9D9",
                    "40": "#A6A6A6",
                    "50": "#848484",
                    "60": "#737373",
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
                    "50": "#35CA61"
                },
                "warning": {
                    "10": "#FFF8E5",
                    "50": "#FFBD00"
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
            },
            width: {
                'xl': '160%',
            },
            borderWidth: {
                '1': '1px',
            },
            fontFamily: {
                'poppins': ['Poppins', ...defaultTheme.fontFamily.sans],
                'sans': ['Work Sans', ...defaultTheme.fontFamily.sans]
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
                'ebook': 'url(/resources/img/produk/bg-ebook.png)',
                'webinar': 'url(/resources/img/produk/bg-webinar.png)',
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
                'fadeIn': {
                    'from': { 'opacity': '0' },
                    'to': { 'opacity': '1' }
                },
                'autoplayY': {
                    'from': { 'transform': 'translateY(0)' },
                    'to': { 'transform': 'translateY(-100%)' }
                }
            },
            animation: {
                fadeIn: 'fadeIn 3s',
                autoplayY: 'autoplayY 20s infinite linear',
            }
        },
    },
    corePlugins: {
        container: false,
    },
    plugins: [
        require('tw-elements/dist/plugin.cjs'),
        function ({addComponents}) {
            addComponents({
                '.container': {
                    width: '85%',
                    '@screen md': {
                        width: '75%'
                    },
                    '@screen 3xl': {
                        width: '70%',
                        maxWidth: '1536px'
                    },
                    '@screen 4xl': {
                        width: '70%',
                        maxWidth: '1728px'
                    }
                },
                '.container-lg': {
                    width: '85%',
                    '@screen md': {
                        width: '80%'
                    },
                    '@screen 3xl': {
                        width: '75%',
                        maxWidth: '1728px'
                    },
                    '@screen 4xl': {
                        width: '75%',
                        maxWidth: '1920px'
                    }
                }
            })
        }
    ],
};
