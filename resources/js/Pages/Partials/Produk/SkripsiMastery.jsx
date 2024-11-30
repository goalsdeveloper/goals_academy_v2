import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y, FreeMode } from "swiper/modules";
import ButtonSwiper from "@/Components/ButtonSwiper";
import BimbinganCard from "@/Components/BimbinganCard";

export default function SkripsiMastery({
    data,
    active,
    status,
    categories,
    category,
    setCategory,
    filterHandler,
}) {
    return (
        <section
            id="skripsi-mastery"
            className={`${
                active || status ? "" : "hidden"
            } my-8 xl:my-12 3xl:my-16 overflow-hidden`}
        >
            <div className="container mx-auto hidden md:block">
                <h2 className="mb-4 sm:mb-6 xl:mb-10 3xl:mb-14">Skripsi Mastery</h2>
                {data.length ? (
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
                                    <BimbinganCard
                                        item={item}
                                        className="w-72 md:w-[21vw] 3xl:w-[20vw]"
                                    />
                                </div>
                            );
                        })}
                    </div>
                ) : <div className="w-full text-center">Produk tidak ditemukan</div>}
            </div>
            <SkripsiMasteryMobile
                data={data}
                categories={categories}
                category={category}
                setCategory={setCategory}
                filterHandler={filterHandler}
            />
        </section>
    );
}

function SkripsiMasteryMobile({
    data,
    categories,
    category,
    setCategory,
    filterHandler,
}) {
    return (
        <div className="container mx-auto md:hidden">
            <div className="flex justify-between mb-6 xs:mb-8">
                <div className="md:w-6/12">
                    <h2 className="text-[5vw]">
                        Produk <span className="text-primary">Digital</span>
                    </h2>
                </div>
                <div className="grid grid-cols-2 gap-2">
                    <ButtonSwiper name="skripsi-mastery-prev" direction="left" />
                    <ButtonSwiper name="skripsi-mastery-next" direction="right" />
                </div>
            </div>
            {/* <Swiper
                modules={[Navigation, Pagination, A11y, FreeMode]}
                slidesPerView={"auto"}
                grabCursor={true}
                freeMode={true}
            >
                {categories.map((item, index) => {
                    return (
                        <SwiperSlide
                            key={index}
                            style={{ width: "fit-content" }}
                            className="p-1 md:p-2 lg:p-3 xl:p-4"
                        >
                            <div
                                className={`rounded-full px-[2vw] py-[.5vw] border-[.25vw] ${
                                    category == item
                                        ? "border-secondary text-secondary"
                                        : "border-light-grey"
                                }`}
                                onClick={() => filterHandler(item, "skripsi-mastery")}
                            >
                                {item}
                            </div>
                        </SwiperSlide>
                    );
                })}
            </Swiper> */}
            <Swiper
                modules={[Navigation, Pagination, A11y, FreeMode]}
                className="swiper-custom"
                wrapperClass="-ms-2"
                slidesPerView={"auto"}
                grabCursor={true}
                freeMode={true}
                navigation={{
                    nextEl: ".skripsi-mastery-next",
                    prevEl: ".skripsi-mastery-prev",
                }}
            >
                {data.map((item, index) => {
                    return (
                        <SwiperSlide
                            key={index}
                            style={{ width: "fit-content" }}
                            className="p-4 md:p-2 lg:p-3 xl:p-4"
                        >
                            <BimbinganCard item={item} className="w-[70vw]" />
                        </SwiperSlide>
                    );
                })}
            </Swiper>
        </div>
    );
}