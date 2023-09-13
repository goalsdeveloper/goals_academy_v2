import figure4 from "/resources/img/figure-4.svg";
import ButtonHoverSlide from "@/Components/ButtonHoverSlide";

export default function Hero () {
    return (
        <section id="hero" className="my-8 xl:my-12 3xl:my-16">
            <div className="container mx-auto flex flex-col flex-wrap items-center justify-center">
                <div className="text-center md:my-14 xl:my-20 3xl:my-28">
                    <h2 className="mb-2 3xl:mb-4">Bergabung dalam <span className="text-primary">Perjalanan Kami</span></h2>
                    <p className="md:text-10 xl:text-16 3xl:text-20">Terbang lebih tinggi dan tumbuh bersama Goals Academy</p>
                </div>
                <div className="w-5/12 3xl:w-6/12">
                    <img src={figure4} alt="Figure 4" />
                </div>
                <div className="w-full flex flex-wrap flex-col md:flex-row items-center bg-white shadow-centered-spread md:shadow-centered rounded-xl xl:rounded-2xl p-8 md:p-14 lg:p-18 xl:p-24 3xl:p-32 -translate-y-6 3xl:-translate-y-12">
                    <div className="w-full md:w-7/12 text-center md:text-start">
                        <p className="font-medium md:tracking-[0.2rem] lg:tracking-[0.3rem] xl:tracking-[0.4rem] mb-4 md:mb-2 lg:mb-3 xl:mb-4 text-center md:text-start">TIM KAMI</p>
                        <h3 className="mt-6 md:mt-2 lg:mt-3 xl:mt-4 leading-normal">Mari Berkenalan Lebih Lanjut <br /><span className="text-primary">Dengan Tim Goals Academy</span></h3>
                    </div>
                    <div className="w-full md:w-5/12 flex justify-center md:justify-end">
                        <a href="https://wa.me/6285637564245" className="w-6/12 h-10 md:h-8 lg:h-10 xl:h-12 3xl:h-16" target="_blank">
                            <ButtonHoverSlide className="h-full before:p-1 md:before:p-1.5 lg:before:p-1 xl:before:p-1.5 before:content-arrow-right-20 xs:before:content-arrow-right-32 md:before:content-arrow-right-20 lg:before:content-arrow-right-32 xl:before:content-arrow-right-32 after:content-career after:text-primary after:font-medium border-1 xl:border-2 border-primary rounded-full before:w-[160%] before:-ms-[160%] before:duration-300 after:w-full after:duration-300 hover:before:-ms-[30%] hover:after:-me-[100%] before:bg-sweep-primary bg-white"></ButtonHoverSlide>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    )
}
