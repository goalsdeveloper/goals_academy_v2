import MainLayout from "@/Layouts/MainLayout";
import { Head } from "@inertiajs/react";
import figure1 from "/resources/img/figure-1.svg";

export default function Index() {
    return (
        <MainLayout>
            <Head title="Home" />
            <section id="hero" className="md:pb-8 xl:pb-12 3xl:pb-20">
                <div className="container mx-auto flex flex-wrap justify-between">
                    <div className="w-5/12 my-auto">
                        <h1 className="font-bold md:text-32 lg:text-36 xl:text-56 3xl:text-80 leading-tight before:icon-primary md:before:w-10 md:before:h-10 md:before:-ms-8 md:before:-mt-5 xl:before:w-20 xl:before:h-20 xl:before:-ms-16 xl:before:-mt-10 text-black">
                            Cepat Lulus Bareng <span className="text-primary">Goals.</span>
                        </h1>
                        <p className="my-4 3xl:mt-12 3xl:mb-14">
                            Percepat kelulusanmu bersama tutor yang solutif dan friendly dimana saja dan kapanpun kalian berada.
                        </p>
                        <form action="" className="w-11/12 flex justify-between border-2 border-primary rounded-full p-1 3xl:p-2 -z-20">
                            <input type="text" className="w-7/12 bg-transparent border-none active:border-none focus:outline-none xl:leading-6 py-1 px-2 xl:py-2 xl:px-3" placeholder="Masukkan emailmu disini ..." />
                            <button type="submit" className="w-5/12 hover:sweep-right md:before:content-mail-16 lg:before:content-mail-20 xl:before:content-mail-32 after:content-discount after:text-primary after:font-medium border-2 border-primary rounded-full"></button>
                        </form>
                    </div>
                    <div className="w-1/2">
                        <img className="w-full md:h-[20rem] lg:h-[24rem] xl:h-[32rem] 3xl:h-[44rem]" src={figure1} alt="Figure 1" />
                    </div>
                </div>
            </section>
        </MainLayout>
    )
}
