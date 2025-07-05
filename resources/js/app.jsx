import "./bootstrap";
import "../css/app.css";

import { createRoot } from "react-dom/client";
import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { Toaster } from "react-hot-toast";
import useCsrfRefresh from "./bootstrap";

function AppWrapper({ children }) {
    useCsrfRefresh();
    return <>{children}</>;
}
const appName = import.meta.env.VITE_APP_NAME || "Goals Academy";

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob("./Pages/**/*.jsx")
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <>
                <Toaster />
                <AppWrapper>
                    <App {...props} />
                </AppWrapper>
            </>
        );
    },
    progress: {
        color: "#FF8854",
    },
}).then(
    document.getElementById('app').removeAttribute('data-page')
);
