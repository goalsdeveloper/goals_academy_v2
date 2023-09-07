import MainHeader from "./Partials/MainHeader";
import MainFooter from "./Partials/MainFooter";
import "@/script/mainHeader";

export default function MainLayout ({ children }) {
    return (
        <>
            <MainHeader />
            <main className="pt-8 md:pt-4 xl:pt-8 3xl:pt-28 overflow-hidden">
                {children}
            </main>
            <MainFooter />
        </>
    )
}
