import MainFooter from "@/Components/MainFooter";
import MainHeader from "@/Components/MainHeader";
import "@/script/mainHeader";

export default function MainLayout ({ children }) {
    return (
        <>
            <MainHeader />
            <main className="pt-16 md:pt-20 xl:pt-32 3xl:pt-48">
                {children}
            </main>
            <MainFooter />
        </>
    )
}
