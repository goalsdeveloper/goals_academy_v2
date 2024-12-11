import "/resources/css/main.css";
import { Head } from "@inertiajs/react";
import MainHeader from "./Partials/MainHeader";
import MainFooter from "./Partials/MainFooter";
import "@/script/mainHeader";

export default function MainLayout({
    auth,
    title,
    className,
    withFooter = true,
    headerClassName,
    footerClassName,
    children,
}) {
    return (
        <>
            <Head title={title} />
            <MainHeader auth={auth} title={title} className={headerClassName} />
            <main className={`relative text-dark overflow-visible ${className} z-0 mt-[20vw] md:mt-0`}>
                {children}
            </main>
            {withFooter && <MainFooter className={footerClassName} />}
        </>
    );
}
