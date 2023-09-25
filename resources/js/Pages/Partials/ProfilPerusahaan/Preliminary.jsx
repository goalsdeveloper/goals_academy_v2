import wave1 from "/resources/img/vector/wave-1.svg";
import wave2 from "/resources/img/vector/wave-2.svg";

export default function Preliminary () {
    return (
        <section id="preliminary" className="my-16 xl:my-24 3xl:my-32">
            <div className="bg-white md:bg-skin shadow-centered-spread md:shadow-none mb-16 md:mb-0">
                <div className="container mx-auto flex flex-col items-center md:gap-2 xl:gap-4 py-12 md:py-6 xl:py-12">
                    <i className="bi bi-quote text-primary md:text-white text-24 md:text-32 lg:text-48 xl:text-64 3xl:text-80"></i>
                    <p className="md:w-8/12 my-2 md:my-0 text-center text-14 md:text-10 lg:text-12 xl:text-16 3xl:text-24">Berkomitmen dalam mentransformasi tenaga pendidik profesional dan pelajar sebagai pemimpin di masa depan dengan mengedepankan kemajuan dan efektifitas di bidang riset, pendidikan dan keilmuan berbasis inovasi dan teknologi.</p>
                    <i className="bi bi-quote text-primary md:text-white text-24 md:text-32 lg:text-48 xl:text-64 3xl:text-80 -scale-x-1 -scale-y-1"></i>
                </div>
            </div>
            <div className="relative bg-secondary md:bg-soft">
                <div className="md:hidden">
                    <img className="absolute bottom-0 left-0 w-10/12" src={wave1} alt="Wave 1" />
                    <img className="absolute bottom-0 left-0 w-10/12" src={wave2} alt="Wave 1" />
                    <img className="absolute top-0 right-0 -scale-x-1 -scale-y-1 w-10/12" src={wave1} alt="Wave 1" />
                    <img className="absolute top-0 right-0 -scale-x-1 -scale-y-1 w-10/12" src={wave2} alt="Wave 1" />
                </div>
                <div className="container mx-auto flex flex-col md:flex-row justify-center items-center gap-12 md:gap-4 xl:gap-8 py-24 md:py-6 xl:py-12 text-secondary md:text-dark">
                    <div className="w-full md:w-3/12 rounded-lg shadow-centered-spread md:shadow-none bg-white md:bg-transparent flex justify-center items-center gap-8 md:gap-4 xl:gap-8 py-8 md:py-0">
                        <i className="bi bi-people text-56 md:text-36 xl:text-64 3xl:text-80"></i>
                        <div className="w-[27.5vw]">
                            <p className="font-bold text-32 md:text-20 xl:text-32 3xl:text-56">21</p>
                            <p className="text-20 md:text-10 lg:text-12 xl:text-16 3xl:text-24">Tutor Skripsi yang berpengalaman</p>
                        </div>
                    </div>
                    <div className="w-full md:w-3/12 rounded-lg shadow-centered-spread md:shadow-none bg-white md:bg-transparent flex justify-center items-center gap-8 md:gap-4 xl:gap-8 py-8 md:py-0">
                        <i className="bi bi-rocket-takeoff text-48 md:text-28 xl:text-56 3xl:text-64"></i>
                        <div className="w-[27.5vw]">
                            <p className="font-bold text-32 md:text-20 xl:text-32 3xl:text-56">7</p>
                            <p className="text-20 md:text-10 lg:text-12 xl:text-16 3xl:text-24">Tutor Skripsi yang berpengalaman</p>
                        </div>
                    </div>
                    <div className="w-full md:w-3/12 rounded-lg shadow-centered-spread md:shadow-none bg-white md:bg-transparent flex justify-center items-center gap-8 md:gap-4 xl:gap-8 py-8 md:py-0">
                        <i className="bi bi-mortarboard text-56 md:text-36 xl:text-64 3xl:text-80"></i>
                        <div className="w-[27.5vw]">
                            <p className="font-bold text-32 md:text-20 xl:text-32 3xl:text-56">76</p>
                            <p className="text-20 md:text-10 lg:text-12 xl:text-16 3xl:text-24">Tutor Skripsi yang berpengalaman</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
