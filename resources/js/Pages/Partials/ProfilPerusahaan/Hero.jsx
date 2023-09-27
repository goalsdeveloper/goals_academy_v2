import figure5 from '/resources/img/figure/5.svg';

export default function Hero () {
    return (
        <section id="hero" className="my-16 xl:my-24 3xl:my-32">
            <div className="container mx-auto relative flex flex-col md:flex-row justify-between items-center md:pt-4 lg:pt-8 xl:pt-12 3xl:py-20 gap-8 md:gap-0 before:absolute before:-z-10 before:bg-tree-2 md:before:bg-none before:bg-cover before:bg-no-repeat before:w-screen before:h-[53vw] sm:before:-mt-[4vw]">
                <div className="md:w-7/12 md:absolute h-full flex flex-col justify-center">
                    <h2 className="text-20 sm:text-24 md:text-16 lg:text-24 xl:text-32 3xl:text-48">Transformasi Pendidikan Untuk <br /><span className="text-primary">Pendidikan Masa Depan</span></h2>
                    <p className="w-9/12 md:w-full mt-4 md:mt-2 xl:mt-4 text-14 sm:text-16 md:text-10 xl:text-16 3xl:text-20">Membangun Pemimpin Masa Depan melalui Inovasi dan Teknologi.</p>
                </div>
                <div></div>
                <div className="w-full md:w-8/12 md:translate-x-[20%] 3xl:translate-x-[30%] -z-10">
                    <img className="w-full md:w-11/12 md:float-right" src={figure5} alt="" />
                </div>
            </div>
        </section>
    )
}
