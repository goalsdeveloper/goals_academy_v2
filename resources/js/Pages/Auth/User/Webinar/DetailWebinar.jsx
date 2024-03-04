import MainLayout from "@/Layouts/MainLayout";
import { Link } from "@inertiajs/react";
import { FiChevronLeft } from "react-icons/fi";
import { detailWebinar as dataWebinar } from "./data";

import { useMediaQuery } from "react-responsive";
import DetailBanyakSesi from "./layouts/DetailBanyakSesi";
import DetailSatuSesi from "./layouts/DetailSatuSesi";

const DetailWebinar = ({ auth }) => {
    const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

    return (
        <MainLayout
            auth={auth}
            title="Detail Webinar"
            className="pb-[16vw] md:pb-0"
        >
            <div className="container mx-auto md:space-y-[2.5vw] text-secondary mb-[5.2vw]">
                <Link
                    href="/webinar"
                    className="hidden md:flex text-[1vw] font-medium gap-[.5vw] items-center leading-none"
                >
                    <FiChevronLeft className="text-[1.2vw]" />
                    Kembali
                </Link>

                {isMobile ? (
                    <Link
                        href="/bimbingan"
                        className="flex items-center gap-[1.5vw] text-black"
                    >
                        <FiChevronLeft className="md:hidden text-[4vw]" />
                        <h1 className="font-medium text-black text-[3.7vw] md:text-[1.8vw] leading-[12vw] md:leading-[4vw]">
                            Detail Webinar
                        </h1>
                    </Link>
                ) : (
                    <h1 className="font-medium text-black text-[3.7vw] md:text-[1.8vw] leading-[12vw] md:leading-[4vw]">
                        Detail Webinar
                    </h1>
                )}

                {/* <div className="flex justify-between items-center">
                    <h1 className="md:font-medium text-black text-[1.8vw] leading-[12vw] md:leading-[4vw]">
                        Detail Webinar
                    </h1>
                </div> */}

                {/* <div className="fixed md:relative w-full md:w-auto bottom-0 left-0 flex gap-[1vw] md:gap-[.5vw] justify-center pb-[3.7vw] pt-[3.4vw] md:p-0 bg-white z-[40] md:z-0">
                    <GoalsButton variant="bordered">Beri Ulasan</GoalsButton>
                </div> */}

                <DetailSatuSesi data={dataWebinar[0].detail} />
                <DetailBanyakSesi data={dataWebinar} />
            </div>
        </MainLayout>
    );
};

export default DetailWebinar;
