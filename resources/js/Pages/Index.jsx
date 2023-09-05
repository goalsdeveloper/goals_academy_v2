import MainLayout from "@/Layouts/MainLayout";
import { Head } from "@inertiajs/react";
import figure1 from "/resources/img/figure-1.svg";

export default function Index() {
    return (
        <MainLayout>
            <Head title="Home" />
            <section id="hero" className="md:pb-8 xl:pb-12 3xl:pb-20">
                <div className="container mx-auto flex flex-wrap flex-col-reverse sm:flex-row justify-center sm:justify-between gap-8 sm:gap-0">
                    <div className="sm:w-6/12 md:w-5/12 my-auto">
                        <h1 className="font-bold text-end sm:text-start text-48 sm:text-32 lg:text-36 xl:text-56 3xl:text-80 leading-tight before:icon-primary sm:before:w-0 md:before:w-10 md:before:h-10 md:before:-ms-8 md:before:-mt-5 xl:before:w-20 xl:before:h-20 xl:before:-ms-16 xl:before:-mt-10 text-black">
                            Cepat Lulus Bareng <span className="text-primary">Goals.</span>
                        </h1>
                        <p className="text-end sm:text-start my-4 3xl:mt-12 3xl:mb-14">
                            Percepat kelulusanmu bersama tutor yang solutif dan friendly dimana saja dan kapanpun kalian berada.
                        </p>
                        <form action="" className="sm:w-11/12 flex justify-between border-2 border-primary rounded-full p-1 3xl:p-2 -z-20">
                            <input type="text" className="w-7/12 sm:w-6/12 md:w-7/12 bg-transparent border-none active:border-none focus:outline-none xl:leading-6 py-1 px-2 xl:py-2 xl:px-3" placeholder="Masukkan emailmu disini ..." />
                            <button type="submit" className="w-5/12 sm:w-6/12 md:w-5/12 hover:sweep-right before:p-0.5 sm:before:p-0 before:content-mail-20 md:before:content-mail-16 lg:before:content-mail-20 xl:before:content-mail-32 after:content-discount after:text-primary after:font-medium border-2 border-primary rounded-full"></button>
                        </form>
                    </div>
                    <div className="sm:w-6/12">
                        <img className="w-full h-80 sm:h-80 lg:h-96 xl:h-[32rem] 3xl:h-[44rem]" src={figure1} alt="Figure 1" />
                    </div>
                </div>
            </section>
        </MainLayout>
    )
}
