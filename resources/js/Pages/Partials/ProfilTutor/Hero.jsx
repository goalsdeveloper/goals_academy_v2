import figure6 from '/resources/img/figure/6.svg';

export default function Hero () {
    return (
        <section id="hero" className="mb-16 xs:mb-20 md:mb-16 lg:mb-20 xl:mb-24 3xl:mb-32">
            <div className="container mx-auto relative flex flex-col justify-between items-center md:pt-4 lg:pt-8 xl:pt-8 3xl:py-20">
                <h2 className="text-center mb-8 md:mb-0">Para Tutor yang <br /><span className="text-primary">Berkeahlian di Bidangnya</span></h2>
                <div className="w-full">
                    <img className="w-full float-right" src={figure6} alt="" />
                </div>
            </div>
        </section>
    )
}
