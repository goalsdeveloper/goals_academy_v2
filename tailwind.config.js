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
            'xs': '360px',
            'sm': '564px',
            'md': '768px',
            'lg': '1024px',
            'xl': '1280px',
            '2xl': '1440px',
            '3xl': '1920px',
        },
        extend: {
            colors: {
                'primary': '#FF6420',
                'secondary': '#FF8854',
                'skin': '#FFDFD1',
                'soft': '#FFF6F3',
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
                '48': '3rem',
                '56': '3.5rem',
                '64': '4rem',
                '80': '5rem',
            },
            backgroundImage: {
                'unset': 'linear-gradient(0, #FFFFFF00 0%, #FFFFFF00 0%);',
                'gradient-1': 'linear-gradient(165deg, #FFE6DB -0.04%, #FF8854 180.59%);',
                'sweep-primary': 'linear-gradient(120deg, #FF6420 90%, transparent 10%)',
                'icon-primary': 'url(/resources/img/icon-primary.svg)',
                'tree': 'url(/resources/img/tree.svg)',
            },
            content: {
                'discount': '"Dapatkan Diskon"',
                'consultation': '"Tanya Sekarang"',
                'career': '"Lihat Disini"',
                'mail-16': 'url(/resources/img/mail-16.svg)',
                'mail-20': 'url(/resources/img/mail-20.svg)',
                'mail-32': 'url(/resources/img/mail-32.svg)',
                'arrow-right-16': 'url(/resources/img/arrow-right-16.svg)',
                'arrow-right-20': 'url(/resources/img/arrow-right-20.svg)',
                'arrow-right-32': 'url(/resources/img/arrow-right-32.svg)',
            },
            boxShadow: {
                'centered': '0px 0px 4px 0 rgba(0,0,0,.25)',
                'centered-spread': '0px 0px 12px 0px rgba(0,0,0,.25)',
                'bottom-right': '2px 3px 4px 0 rgba(0,0,0,.14)',
            },
            scale: {
                '1': '1',
            },
            keyframes: {
                'autoplayY': {
                    'from': { 'transform': 'translateY(0)' },
                    'to': { 'transform': 'translateY(-100%)' }
                }
            },
            animation: {
                autoplayY: 'autoplayY 20s infinite linear'
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
                    width: '80%',
                    '@screen md': {
                        width: '75%'
                    },
                    '@screen 3xl': {
                        width: '70%',
                        maxWidth: '1536px'
                    }
                }
            })
        }
    ],
};
