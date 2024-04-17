import GoalsButton from "@/Components/elements/GoalsButton";
import {
    ProductItemCardContent,
    ProductItemCardLayout,
} from "@/Components/fragments/ProductItemCard";
import MainLayout from "@/Layouts/MainLayout";
import { Link } from "@inertiajs/react";
import { FiChevronLeft } from "react-icons/fi";
import { useMediaQuery } from "react-responsive";
import DetailBanyakSesi from "./layouts/DetailBanyakSesi";
import DetailSatuSesi from "./layouts/DetailSatuSesi";
import CardImage from "/resources/img/karir/academic-internship.png";

const DetailWebinar = ({ auth, orderWebinar: data }) => {
    const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
    const orderWebinar = data[0];
    const products = orderWebinar.products;
    const webinar_properties = products.webinar_properties;

    return (
        <MainLayout
            auth={auth}
            title="Detail Webinar"
            className="pb-[16vw] md:pb-0"
            withFooter={isMobile ? false : true}
        >
            <div className="container mx-auto md:space-y-[2.5vw] text-secondary mb-[5.2vw]">
                <Link
                    href="/webinar"
                    className="hidden md:flex text-[1vw] font-medium gap-[.5vw] items-center leading-none"
                >
                    <FiChevronLeft className="text-[1.2vw]" />
                    Kembali
                </Link>
                <div className="flex justify-between items-center">
                    {isMobile ? (
                        <Link
                            href="/webinar"
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

                    <div className="hidden md:block w-full md:w-auto bottom-0 left-0 gap-[1vw] md:gap-[.5vw] justify-center pb-[3.7vw] pt-[3.4vw] bg-white md:p-0 z-[40] md:z-0">
                        <GoalsButton variant="bordered">
                            Beri Ulasan
                        </GoalsButton>
                    </div>
                </div>

                <ProductItemCardLayout
                    imageUrl={CardImage}
                    className="hidden md:flex"
                >
                    <ProductItemCardContent>
                        <div className="text-[1vw] space-y-[.2vw]">
                            <h2 className="h5 font-medium mb-[.4vw]">
                                {products.name}
                            </h2>
                            <ul className="text-neutral-60 space-y-[.3vw]">
                                <li>
                                    {webinar_properties.date !== undefined
                                        ? new Date(
                                              webinar_properties.date
                                          ).toDateString()
                                        : new Date(
                                              webinar_properties.start_date
                                          ).toDateString() +
                                          " - " +
                                          new Date(
                                              webinar_properties.end_date
                                          ).toDateString()}
                                </li>
                                <li>
                                    {webinar_properties?.time
                                        ? webinar_properties.time + " WIB"
                                        : "Waktu Belum Ditentukan"}
                                </li>
                            </ul>
                        </div>
                        <a
                            target="_blank"
                            href={webinar_properties.link}
                            className="text-center px-[8.3vw] md:px-[2vw] py-[3.2vw] md:py-[.8vw] rounded-[1.8vw] md:rounded-[.4vw] text-[3.7vw] md:text-[1vw] bg-info-40 hover:bg-info-50 text-white"
                        >
                            Gabung Webinar
                        </a>
                    </ProductItemCardContent>
                </ProductItemCardLayout>

                <div className="fixed md:hidden w-full bottom-0 left-0 flex flex-col gap-[1vw] justify-center px-[8vw] pb-[3.7vw] pt-[3.4vw] bg-white z-[40] ">
                    <a
                        target="_blank"
                        href={webinar_properties.link}
                        className="text-center w-full px-[8.3vw] md:px-[2vw] py-[3.2vw] md:py-[.8vw] rounded-[1.8vw] md:rounded-[.4vw] text-[3.7vw] md:text-[1vw] bg-info-40 hover:bg-info-50 text-white"
                    >
                        Gabung Webinar
                    </a>
                </div>
                {webinar_properties.session ? (
                    <DetailBanyakSesi data={orderWebinar.products} />
                ) : (
                    <DetailSatuSesi
                        data={orderWebinar.products}
                    />
                )}
            </div>
        </MainLayout>
    );
};

export default DetailWebinar;
