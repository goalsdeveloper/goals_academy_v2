/**
 * We'll load the axios HTTP library which allows us to easily issue requests
 * to our Laravel back-end. This library automatically handles sending the
 * CSRF token as a header based on the value of the "XSRF" token cookie.
 */

import { useEffect } from 'react';
import axios from 'axios';
window.axios = axios;

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

/** * Next, we will register the CSRF token as a common header with Axios so that
 * all outgoing requests automatically have it attached. This is just a simple
 * convenience so we don't have to attach the token manually to every single
 * request we send in our application.
 * * @see https://laravel.com/docs/csrf#csrf-x-csrf-token-header
 */
let token = document.head.querySelector('meta[name="csrf-token"]');

/** * This hook will refresh the CSRF token periodically to ensure it remains valid.
 * It fetches a new CSRF token from the server every 10 minutes and updates
 * the Axios default headers with the new token.
 * * @see https://laravel.com/docs/csrf#csrf-token-refresh
 * @returns {void}
 */

const useCsrfRefresh = () => {
  useEffect(() => {
    const refreshToken = async () => {
      try {
        const res = await axios.get('/csrf-token'); // Laravel route
        axios.defaults.headers.common['X-CSRF-TOKEN'] = res.data.csrf_token;
      } catch (err) {
        console.error("Gagal mendapatkan CSRF token", err);
      }
    };

    refreshToken(); // Initial
    const interval = setInterval(refreshToken, 1 * 60 * 1000); // Tiap 1 menit

    return () => clearInterval(interval); // Bersihkan timer saat unmount
  }, []);
};

export default useCsrfRefresh;

/**
 * Echo exposes an expressive API for subscribing to channels and listening
 * for events that are broadcast by Laravel. Echo and event broadcasting
 * allows your team to easily build robust real-time web applications.
 */

// import Echo from 'laravel-echo';

// import Pusher from 'pusher-js';
// window.Pusher = Pusher;

// window.Echo = new Echo({
//     broadcaster: 'pusher',
//     key: import.meta.env.VITE_PUSHER_APP_KEY,
//     cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER ?? 'mt1',
//     wsHost: import.meta.env.VITE_PUSHER_HOST ? import.meta.env.VITE_PUSHER_HOST : `ws-${import.meta.env.VITE_PUSHER_APP_CLUSTER}.pusher.com`,
//     wsPort: import.meta.env.VITE_PUSHER_PORT ?? 80,
//     wssPort: import.meta.env.VITE_PUSHER_PORT ?? 443,
//     forceTLS: (import.meta.env.VITE_PUSHER_SCHEME ?? 'https') === 'https',
//     enabledTransports: ['ws', 'wss'],
// });
