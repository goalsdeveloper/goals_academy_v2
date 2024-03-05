import "/resources/css/main.css";
import { Head } from "@inertiajs/react";
import MainHeader from "./Partials/MainHeader";
import MainFooter from "./Partials/MainFooter";
import "@/script/mainHeader";

export default function MainLayout({
    auth,
    title,
    children,
    className,
    withFooter = true,
}) {
    return (
        <>
            <Head title={title} />
            <MainHeader auth={auth} title={title} />
            <main className={`text-dark overflow-visible ${className}`}>
                {children}
            </main>
            {withFooter && <MainFooter />}
        </>
    );
}
