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
            <main className="text-dark pt-12 xs:pt-16 md:pt-20 xl:pt-32 3xl:pt-48 overflow-visible">
                {children}
            </main>
            <MainFooter />
        </>
    );
}
