import "/resources/css/main.css";
import { Head } from "@inertiajs/react";
import MainHeader from "./Partials/MainHeader";
import MainFooter from "./Partials/MainFooter";
import "@/script/mainHeader";

export default function MainLayout ({ title, children }) {
    return (
        <>
            <Head title={title} />
            <MainHeader title={title} />
            <main className="text-dark pt-8 md:pt-4 xl:pt-8 3xl:pt-28 overflow-visible">
                {children}
            </main>
            <MainFooter />
        </>
    )
}
