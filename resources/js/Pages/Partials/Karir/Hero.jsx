import figure4 from "/resources/img/figure/4.svg";
import ButtonHoverSlide from "@/Components/ButtonHoverSlide";

export default function Hero () {
    return (
        <section id="hero" className="md:mb-16 lg:mb-20 xl:mb-24 3xl:mt-0 3xl:mb-32">
            <div className="container mx-auto flex flex-col flex-wrap items-center justify-center">
                <div className="text-center md:my-8 xl:my-12 3xl:my-24">
                    <h2 className="mt-8 md:mt-0 mb-2 3xl:mb-4 text-16 xs:text-20 sm:text-24 md:text-16 lg:text-24 xl:text-32 3xl:text-48">Bergabung dalam <span className="text-primary">Perjalanan Kami</span></h2>
                    <p className="text-14 sm:text-16 md:text-10 xl:text-16 3xl:text-20">Terbang lebih tinggi dan tumbuh bersama Goals Academy</p>
                </div>
                <div className="w-10/12 md:w-5/12 3xl:w-6/12 mt-8 xs:mt-12 sm:mt-16 md:mt-0 translate-y-4 xs:translate-y-6 md:translate-y-0">
                    <img src={figure4} alt="Figure 4" />
                </div>
            </div>
            <div className="w-full md:container md:mx-auto bg-white shadow-top md:shadow-centered xl:rounded-2xl -translate-y-0 md:-translate-y-6 3xl:-translate-y-12">
                <div className="container mx-auto md:w-full flex flex-wrap justify-center items-center p-8 md:p-14 lg:p-18 xl:p-24 3xl:p-32 gap-4 md:gap-0">
                    <div className="w-full md:w-7/12 text-center md:text-start">
                        <p className="font-medium md:tracking-[0.2rem] lg:tracking-[0.3rem] xl:tracking-[0.4rem]">TIM KAMI</p>
                        <h3 className="mt-2 md:mt-2 lg:mt-3 xl:mt-4 text-12 xs:text-14 sm:text-16 md:text-14 lg:text-18 xl:text-24 3xl:text-32 leading-normal">Mari Berkenalan Lebih Lanjut <br /><span className="text-primary">Dengan Tim Goals Academy</span></h3>
                    </div>
                    <div className="w-7/12 md:w-5/12 flex justify-center md:justify-end">
                        <a href="https://wa.me/6285637564245" className="w-10/12 md:w-6/12 h-8 md:h-8 lg:h-10 xl:h-12 3xl:h-16" target="_blank">
                            <ButtonHoverSlide className="h-full before:p-1 md:before:p-1.5 lg:before:p-1 xl:before:p-1.5 before:content-arrow-right-20 lg:before:content-arrow-right-32 xl:before:content-arrow-right-32 after:content-career after:text-primary after:font-medium border-1 xl:border-2 border-primary rounded-full before:w-[160%] before:-ms-[160%] before:duration-300 after:w-full after:duration-300 hover:before:-ms-[30%] hover:after:-me-[100%] before:bg-sweep-primary text-10 xs:text-12 md:text-8 lg:text-12 xl:text-14 3xl:text-20 bg-white"></ButtonHoverSlide>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    )
}
