import header_left from "/resources/img/tutor/img-left-header.png";
import header_right from "/resources/img/tutor/img-right-header.png";

export default function Hero() {
    return (
        <section id="hero" className="relative flex pb-[22vw] md:pb-[8vw] pt-[15vw] md:pt-[4vw] md:mb-[8vw] md:mx-[11vw]">
            <img src={header_left} alt="" className="absolute md:static w-1/4 md:w-auto top-32 left-5"/>
            <div className="container mx-auto relative flex flex-col justify-center items-center">
                <h2 className="text-center md:mb-0 md:py-2">
                    Tutor Berpengalaman Siap <br />
                    <span className="text-primary">Membimbing Skripsimu</span>
                </h2>
                <p className="text-center">
                    Berkenalan dengan tutor-tutor pilihan Goals Academy yang
                    ahli di bidangnya
                </p>
            </div>
            <img src={header_right} alt="" className="absolute md:static w-1/4 md:w-auto top-32 right-5"/>
            <div className="absolute w-[523px] h-[523px] rounded-full left-[-10vw] z-10 bg-[radial-gradient(circle_at_center,
                    _var(--tw-gradient-stops))]
                    from-teal-300 via-gray-100
                    to-blue-300"></div>
        </section>
    );
}
