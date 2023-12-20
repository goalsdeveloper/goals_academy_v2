import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y, FreeMode } from "swiper/modules";
import ButtonSwiper from "@/Components/ButtonSwiper";
import ButtonPill from "@/Components/ButtonPill";

export default function Ebook({ data, active, status }) {
    return (
        <section
            id="ebook"
            className={`${
                active || status ? "" : "hidden"
            } my-8 xl:my-12 3xl:my-16 overflow-hidden`}
        >
            <div className="container mx-auto hidden md:block">
                <h2 className="mb-4 sm:mb-6 xl:mb-10 3xl:mb-14">E-Book</h2>
                <div className="grid grid-cols-3 justify-center md:gap-8 xl:gap-16 pb-2">
                    {data.map((item, index) => {
                        const model =
                            (index + 1) % 3 == 2
                                ? "justify-center"
                                : (index + 1) % 3 == 0
                                ? "justify-end"
                                : "";
                        return (
                            <div key={index} className={`flex ${model}`}>
                                <EbookCard
                                    key={index}
                                    item={item}
                                    className="md:w-[21vw] 3xl:w-[20vw]"
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
            <EbookMobile data={data} />
        </section>
    );
}

function EbookMobile({ data }) {
    return (
        <div className="container mx-auto md:hidden">
            <div className="flex justify-between mb-6 xs:mb-8">
                <div className="md:w-6/12">
                    <h2 className="text-[5vw]">
                        E-Book <span className="text-primary">Skripsi</span>
                    </h2>
                </div>
                <div className="grid grid-cols-2 gap-2">
                    <ButtonSwiper name="ebook-prev" direction="left" />
                    <ButtonSwiper name="ebook-next" direction="right" />
                </div>
            </div>
            <Swiper
                modules={[Navigation, Pagination, A11y, FreeMode]}
                className="swiper-custom"
                wrapperClass="-ms-2"
                slidesPerView={"auto"}
                grabCursor={true}
                freeMode={true}
                navigation={{ nextEl: ".ebook-next", prevEl: ".ebook-prev" }}
            >
                {data.map((item, index) => {
                    return (
                        <SwiperSlide
                            key={index}
                            style={{ width: "fit-content" }}
                            className="p-4 md:p-2 lg:p-3 xl:p-4"
                        >
                            <EbookCard item={item} className="w-[70vw]" />
                        </SwiperSlide>
                    );
                })}
            </Swiper>
        </div>
    );
}

function EbookCard({ item, className }) {
    const currency = Intl.NumberFormat("id-ID");
    return (
        <div
            className={`shadow-centered rounded-3xl md:rounded-lg xl:rounded-3xl overflow-hidden ${className}`}
        >
            <div className="w-full h-[90vw] md:h-[27vw] overflow-hidden">
                <img
                    className="w-full"
                    src={`/storage/${item.product_image}`}
                    alt={item.name}
                />
            </div>
            <div className="p-4 md:p-3 lg:p-4 2xl:p-6 3xl:p-8">
                <p className="font-medium text-16 xs:text-20 md:text-10 lg:text-14 xl:text-16 2xl:text-20 3xl:text-24 h-12 xs:h-16 md:h-7 lg:h-8 2xl:h-12 3xl:h-16">
                    {item.name}
                </p>
                <p className="font-bold font-poppins text-primary text-20 xs:text-24 md:text-14 lg:text-18 xl:text-24 2xl:text-28 3xl:text-32 my-4 md:my-3 lg:my-4 xl:my-6">
                    IDR {item.price != "-" ? currency.format(item.price) : "-"}
                </p>
                {/* <ButtonPill href={item.link} className="w-full">Beli Sekarang</ButtonPill> */}
                <ButtonPill
                    href={item.link}
                    isLink={false}
                    isActive={false}
                    className="w-full"
                >
                    Coming Soon
                </ButtonPill>
            </div>
        </div>
    );
}
