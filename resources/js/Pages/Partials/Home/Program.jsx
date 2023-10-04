import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y, FreeMode } from 'swiper/modules';
import ButtonSwiper from '@/Components/ButtonSwiper';
import ButtonPill from '@/Components/ButtonPill';
import CornerWaveVector2 from '@/Components/CornerWaveVector2';
import vector from '/resources/img/vector/tree-3.svg';

export default function Program ({ data }) {
    return (
        <section id="program" className="my-16 xs:my-20 md:my-16 lg:my-20 xl:my-24 3xl:my-32 md:pb-10 lg:pb-20 relative overflow-hidden">
            <img src={vector} className="absolute bottom-0 w-screen h-[95%] -z-10 hidden md:block" />
            <div className="container mx-auto hidden md:block">
                <h2 className="text-center mb-6 xs:mb-8 3xl:mb-12">Pilih Program Goals untuk <br /><span className="text-primary">Solusi Skripsimu.</span></h2>
                <ProgramExpand data={data} />
                <div className="text-end mt-8 md:mt-4 lg:mt-8 3xl:mt-12">
                    <ButtonPill href="/produk" className="px-4" target="_self">
                        Lihat Produk Lainnya &nbsp;
                        <i className="bi bi-arrow-right-circle xl:text-16"></i>
                    </ButtonPill>
                </div>
            </div>
        </section>
    )
}

function ProgramExpand ({ data }) {
    return (
        <div className="hidden md:flex justify-between items-center">
            <ProgramCard item={data[0]} className="w-[23.5vw] 3xl:w-[22.5vw] h-[34vw] 3xl:h-[30vw]" />
            <ProgramCard item={data[1]} className="w-[23.5vw] 3xl:w-[22.5vw] h-[36vw] 3xl:h-[32vw]" priority={true} />
            <ProgramCard item={data[2]} className="w-[23.5vw] 3xl:w-[22.5vw] h-[34vw] 3xl:h-[30vw]" />
        </div>
    )
}

function ProgramCard ({ item, priority, className }) {
    return (
        <div className={`relative flex flex-col text-center bg-white overflow-hidden rounded-xl shadow-centered px-6 3xl:px-8 md:py-8 xl:py-12 3xl:py-16 gap-[2vw]  ${className}`}>
            <p className={`absolute top-[4%] -right-[12%] rotate-[35deg] bg-secondary text-white w-1/2 py-1 ${priority ? '' : 'hidden'}`}>Terlaris</p>
            <CornerWaveVector2 cornerClassName="w-8/12" />
            <h3 className="font-semibold md:text-12 lg:text-18 xl:text-24 3xl:text-32">{item.title}</h3>
            <div className="text-secondary">
                <p className="font-poppins font-bold md:text-8 xl:text-12 3xl:text-16">Harga Mulai Dari</p>
                <h2 className="text-secondary py-1 3xl:text-36">IDR {item.price}</h2>
                <span className="font-semibold md:text-8 xl:text-12 3xl:text-16 bg-red-100 px-1 lg:py-0.5">Diskon Tersedia</span>
            </div>
            <div className="flex flex-col text-start gap-2 md:gap-1 lg:gap-2 3xl:gap-4 md:text-10 lg:text-14 xl:text-16 3xl:text-20">
                <p>Layanan :</p>
                <div className="flex items-center gap-2 3xl:gap-4">
                    <i className="fa-regular fa-calendar"></i>
                    <p>{item.features.times}x Pertemuan</p>
                </div>
                <div className="flex items-center gap-2 3xl:gap-4">
                    <i className="fa-solid fa-clock text-12 md:text-8 lg:text-10 xl:text-12 3xl:text-18"></i>
                    <p>{item.features.duration} Menit</p>
                </div>
                <div className="flex items-center gap-2 3xl:gap-4">
                    <i className="fa-solid fa-location-dot"></i>
                    <p>{item.features.category}</p>
                </div>
            </div>
            <div className="relative text-start h-full">
                <ButtonPill href={item.link} className="absolute w-full bottom-0">Daftar Sekarang</ButtonPill>
            </div>
        </div>
    )
}
