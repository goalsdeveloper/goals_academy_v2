import background from "/resources/img/vector/gradient-bg-3.svg";
import figure9 from "/resources/img/figure/9.svg";

export default function Hero() {
    return (
        <section id="hero" className="">
            <div className="w-[100%] ps-[12.5vw] mx-auto flex flex-col-reverse md:flex-row items-center justify-center md:justify-between gap-8 md:gap-0 overflow-hidden">
                <div className="absolute left-0 w-full sm:w-10/12 md:w-6/12 h-[33.25vw] overflow-hidden -z-10">
                    <img
                        className=""
                        src={background}   
                        alt="Gradient Bg 3"
                    />
                </div>
                <div className="md:w-6/12 -mt-[8vw]">
                    <h2 className="text-end md:text-start text-[2.5vw] mb-[1vw]">
                        Ubah Tantangan{" "}
                        <span className="text-primary">Jadi Prestasi</span>
                    </h2>
                    <p className="w-[30vw] text-end md:text-start text-[1.25vw]">
                        Program bimbingan intensif satu semester dengan 28 kali pertemuan bersama 
                        <p className="font-semibold">Tutor Professional Goals Academy</p>
                    </p>
                </div>
                <div className="w-full sm:w-10/12 md:w-7/12 translate-x-[1vw] h-[35vw] overflow-hidden">
                    <img
                        className=""
                        src={figure9}   
                        alt="Figure 9"
                    />
                </div>
            </div>
        </section>
    );
}
