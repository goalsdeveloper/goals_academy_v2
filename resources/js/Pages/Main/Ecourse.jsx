import MainLayout from "@/Layouts/MainLayout";
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y } from 'swiper/modules';
import ButtonPill from '@/Components/ButtonPill';
import CornerWaveVector2 from '@/Components/CornerWaveVector2';
import tree3 from '/resources/img/vector/tree-3.svg';
import tree4 from '/resources/img/vector/tree-4.svg';

export default function Ecourse ({ auth, data }) {
    return (
        <MainLayout auth={auth} title="E-Course">
            <section id="ecourse" className="pt-[10vw] pb-[20vw] md:pt-0 md:pb-[5vw] relative overflow-hidden">
                <img src={tree3} className="absolute bottom-0 w-screen h-[95%] -z-10 hidden md:block" />
                <img src={tree4} className="absolute bottom-0 w-screen h-[100%] -z-10 md:hidden" />
                <EcourseExpand data={data} />
                <EcourseMobile data={data} />
            </section>
        </MainLayout>
    )
}

function EcourseExpand ({ data }) {
    return (
        <div className="container mx-auto hidden md:block">
            <h2 className="text-center mb-[4vw]">Pilih Ecourse Goals untuk <br /><span className="text-primary">Solusi Skripsimu.</span></h2>
            <div className="hidden md:flex justify-between items-center">
                <EcourseCard item={data[0]} className="w-[23.5vw] 3xl:w-[22vw] h-[34vw] 3xl:h-[32vw]" />
                <EcourseCard item={data[1]} className="w-[23.5vw] 3xl:w-[22vw] h-[34vw] 3xl:h-[32vw] scale-105" priority={true} />
                <EcourseCard item={data[2]} className="w-[23.5vw] 3xl:w-[22vw] h-[34vw] 3xl:h-[32vw]" />
            </div>
            {/* <div className="text-end mt-8 md:mt-4 lg:mt-8 3xl:mt-12">
                <ButtonPill isLink={true} href="/produk" className="px-4" target="_self">
                    Lihat Produk Lainnya &nbsp;
                    <i className="bi bi-arrow-right-circle xl:text-16"></i>
                </ButtonPill>
            </div> */}
        </div>
    )
}

function EcourseMobile ({ data }) {
    return (
        <div className="container mx-auto md:hidden overflow-visible">
            <h2 className="text-center mb-[16vw]">Pilih Ecourse Goals <br /><span className="text-primary">untuk Solusi Skripsimu.</span></h2>
            <Swiper
            modules={[Navigation, Pagination, A11y]}
            className='swiper-ecourse'
            slidesPerView={'auto'}
            centeredSlides={true}
            grabCursor={true}
            loop={true}
            initialSlide={1}
            breakpoints={{
                0: {
                    spaceBetween: 32
                },
                400: {
                    spaceBetween: 36
                },
                480: {
                    spaceBetween: 40
                },
                512: {
                    spaceBetween: 48
                },
                640: {
                    spaceBetween: 52
                },
            }}
            >
                {data.map((item, index) => {return (
                    <SwiperSlide key={index} style={{ width: 'fit-content' }} className="items-center duration-300 transition-all">
                        <EcourseCard item={item} className="w-[70vw] h-[100vw] mx-auto" />
                    </SwiperSlide>
                )})}
                {data.map((item, index) => {return (
                    <SwiperSlide key={index} style={{ width: 'fit-content' }} className="items-center duration-300 transition-all">
                        <EcourseCard item={item} className="w-[70vw] h-[100vw] mx-auto" />
                    </SwiperSlide>
                )})}
            </Swiper>
            {/* <div className="text-center mt-[16vw]">
                <ButtonPill isLink={true} href="/produk" className="px-4" target="_self">
                    Lihat Produk Lainnya &nbsp;
                    <i className="bi bi-arrow-right-circle xl:text-16"></i>
                </ButtonPill>
            </div> */}
        </div>
    )
}

function EcourseCard ({ item, priority, className }) {
    const currency = Intl.NumberFormat('id-ID')
    return (
        <div className={`relative flex flex-col text-center bg-white overflow-hidden rounded-xl shadow-centered px-6 3xl:px-8 py-8 xs:py-12 md:py-8 xl:py-12 3xl:py-16 gap-[6vw] md:gap-[2.4vw] 3xl:gap-[2vw]  ${className}`}>
            <p className={`absolute top-[4%] -right-[12%] rotate-[35deg] bg-secondary text-white w-1/2 py-1 ${priority ? '' : 'hidden'}`}>Terlaris</p>
            <CornerWaveVector2 cornerClassName="w-8/12" />
            <h3 className="font-semibold text-[5vw] md:text-[1.5vw]">{item.name}</h3>
            <div className="text-secondary">
                <p className="font-poppins font-bold text-[3vw] md:text-[0.8vw]">Harga Mulai Dari</p>
                <h2 className="text-secondary py-1 text-[6vw] md:text-[2vw]">IDR {currency.format(Number(item.price) - Number(item.promo_price || 0))}</h2>
                <span className="font-semibold text-[3vw] md:text-[0.8vw] bg-red-100 px-1 lg:py-0.5">Diskon Tersedia</span>
            </div>
            <div className="flex flex-col text-start gap-2 md:gap-1 lg:gap-2 3xl:gap-4 text-[3.5vw] md:text-[1.2vw]">
                <p>Layanan :</p>
                <div className="flex items-center gap-2 3xl:gap-4">
                    <i className="fa-regular fa-calendar"></i>
                    <p>{item.total_meet}x Pertemuan</p>
                </div>
                <div className="flex items-center gap-2 3xl:gap-4">
                    <i className="fa-solid fa-clock text-12 md:text-8 lg:text-10 xl:text-12 3xl:text-18"></i>
                    <p>{item.duration} Menit</p>
                </div>
                <div className="flex items-center gap-2 3xl:gap-4">
                    <i className="fa-solid fa-location-dot"></i>
                    <p>{item.category.name}</p>
                </div>
            </div>
            <div className="relative text-start h-full">
                <ButtonPill href={`/produk/${item.slug}`} className="absolute w-full bottom-0 text-[3.5vw] md:text-[1.2vw]">Daftar Sekarang</ButtonPill>
            </div>
        </div>
    )
}
