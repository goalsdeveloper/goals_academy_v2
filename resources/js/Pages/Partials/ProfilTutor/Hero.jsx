import figure6 from '/resources/img/figure-6.svg';

export default function Hero () {
    return (
        <section id="hero" className="my-16 xl:my-24 3xl:my-32">
            <div className="container mx-auto relative flex justify-between items-center md:pt-4 lg:pt-8 xl:pt-12">
                <div className="w-7/12 absolute h-full flex flex-col justify-center">
                    <div className="before:bg-tree before:absolute before:-z-10 before:bg-no-repeat md:before:w-32 md:before:h-32 lg:before:w-40 lg:before:h-40 xl:before:w-56 xl:before:h-56 2xl:before:w-64 2xl:before:h-64 3xl:before:w-80 3xl:before:h-80 md:before:-translate-x-3/4 3xl:before:-translate-x-[80%] md:before:-translate-y-8 lg:before:-translate-y-10 xl:before:-translate-y-12 3xl:before:-translate-y-20">
                        <h2>Para Tutor yang <span className="text-primary">Berkeahlian di Bidangnya</span></h2>
                        {/* <p className="md:mt-2 xl:mt-4">Membangun Pemimpin Masa Depan melalui Inovasi dan Teknologi.</p> */}
                    </div>
                </div>
                <div></div>
                <div className="w-8/12 md:translate-x-[20%]">
                    <img className="w-11/12 float-right" src={figure6} alt="" />
                </div>
            </div>
        </section>
    )
}
