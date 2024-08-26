import React from "react";

export default function Consultation() {
    return (
        <section className="relative w-[90%] mx-auto bg-cover overflow-hidden py-8 md:py-20">
            {/* <img
                src={ConsultationImage}
                alt="Consultation"
                className="absolute top-0 left-0 object-cover w-full -z-10"
            /> */}
            {/* <div className="mx-auto h-[14vw] w-[86vw] bg-konsultasi-lg">
        </div> */}
            <div className="flex justify-between rounded-[3.7vw] overflow-hidden md:rounded-[.8vw] p-[4vw] py-[6vw] md:p-[2vw] md:py-[2vw] bg-konsultasi md:bg-konsultasi-lg bg-cover">
                <div className="flex flex-col md:flex-row gap-[4vw] md:gap-[2vw] items-center w-80% text-center justify-between mx-auto">
                    <div className="w-[80%] md:w-[50%] space-y-[1vw]">
                        <h2 className="font-poppins text-[3.7vw] md:text-[1.8vw] leading-normal text-white">
                            Masih Bingung Program Apa yang Sesuai Dengan
                            Kebutuhanmu?
                        </h2>
                        <p className="text-white text-[2.7vw] md:text-[1vw]">
                            Konsultasikan program yang cocok dan sesuai dengan
                            kebutuhanmu
                        </p>
                    </div>

                    <button className="bg-primary-10 font-medium py-[2vw] px-[4vw] md:py-[.8vw] md:px-[2vw] my-auto !border-0 w-fit h-fit rounded-full md:rounded-[.4vw] text-secondary">
                        Tanya Sekarang
                    </button>
                </div>
            </div>
        </section>
    );
}
