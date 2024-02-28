import "/resources/css/main.css";
import { Head } from "@inertiajs/react";
import MainHeader from "./Partials/MainHeader";
import MainFooter from "./Partials/MainFooter";
import "@/script/mainHeader";

export default function MainLayout({ auth, title, children }) {
    return (
        <>
            <Head title={title} />
            <MainHeader auth={auth} title={title} />
            <main className="text-dark pt-12 overflow-visible">
                {children}
            </main>
            <MainFooter />
        </>
    );
}
