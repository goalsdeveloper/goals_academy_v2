import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y } from 'swiper/modules';
import ButtonSwiper from '@/Components/ButtonSwiper';
import karir1 from '/resources/img/karir-tutor-skripsi.png';
import karir2 from '/resources/img/karir-brand-ambassador.png';
import karir3 from '/resources/img/karir-tutor-olah-data.png';
import karir4 from '/resources/img/karir-academic-internship.png';

export default function CareerList () {
    const data = [
        {
            title: 'Tutor Skripsi',
            image: karir1,
            requirements: [
                'Pendidikan Minimal S1 Semua Jurusan',
                'IPK Minimum 3.5 untuk Jurusan Soshum/3.25 untuk Jurusan Saintek',
                'Mempunyai Komunikasi yang Baik',
                'Berpengalaman dalam Penulisan dan Penelitian Karya Tulis',
            ],
            link: 'https://www.google.com/'
        },
        {
            title: 'Brand Ambassador',
            image: karir2,
            requirements: [
                'Aktif Sosial Media',
                'Usia Minimal 18 Tahun',
                'Minimal 5K Followers di Media Sosial',
                'Memiliki Kemauan untuk Mencari Jaringan Pemasaran Affiliasi',
            ],
            link: 'https://www.google.com/'
        },
        {
            title: 'Tutor Olah Data',
            image: karir3,
            requirements: [
                'Memahami Tools Olah Data Penelitian',
                'Pendidikan Minimal S1 Semua Jurusan',
                'IPK Minimum 3.25',
                'Memiliki Kemampuan Komunikasi yang Baik',
            ],
            link: 'https://www.google.com/'
        },
        {
            title: 'Academic Internship',
            image: karir4,
            requirements: [
                'Minimal S1 Jurusan Pendidikan',
                'IPK Minimum 3.5',
                'Fresh graduate welcome',
                'Berpengalaman dalam Penulisan dan Penelitian Karya Tulis',
                'Memahami Penyusunan Skripsi Jurusan Pendidikan',
                'Bersedia untuk work from office',
            ],
            link: 'https://www.google.com/'
        },
    ]

    return (
        <section id="career_list" className="my-8 xl:my-12 3xl:my-16">
            <div className="container mx-auto">
                <div className="flex justify-between mb-8">
                    <div className="md:w-6/12">
                        <h2>Lowongan <span className="text-primary">Tersedia.</span></h2>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                        <ButtonSwiper name="career-prev" direction="left" />
                        <ButtonSwiper name="career-next" direction="right" />
                    </div>
                </div>
                <Swiper
                modules={[Navigation, Pagination, A11y]}
                className='swiper-custom'
                wrapperClass="swiper-wrapper -ms-2"
                slidesPerView={"auto"}
                grabCursor={true}
                navigation={{ nextEl: ".career-next", prevEl: ".career-prev" }}
                >
                    {data.map(({title, image, requirements, link}, index) => {
                        return (
                            <SwiperSlide key={index} style={{ width: "fit-content" }} className="p-4 md:p-2 lg:p-3 xl:p-4">
                                <CareerCard title={title} image={image} requirements={requirements} link={link} />
                            </SwiperSlide>
                        )
                    })}
                </Swiper>
            </div>
        </section>
    )
}

function CareerCard ({title, image, requirements, link}) {
    return (
        <div className="w-72 md:w-40 lg:w-60 xl:w-72 3xl:w-96 shadow-lg md:shadow-bottom-right lg:shadow-lg rounded-3xl md:rounded-lg xl:rounded-3xl overflow-hidden">
            <div className='w-full h-56 md:h-32 lg:h-40 xl:h-52 3xl:h-72 overflow-hidden'>
                <img className='w-full' src={image} alt={title} />
            </div>
            <div className="p-6 md:p-2 lg:p-4 xl:p-6 3xl:p-8">
                <h4 className="text-center">{title}</h4>
                <div className="my-8 md:my-2 lg:my-4 xl:my-8 md:h-28 lg:h-52 xl:h-56 3xl:h-72">
                    <p className="md:mb-2 lg:mb-4">Kualifikasi :</p>
                    <ul className="list-disc grid md:gap-0 lg:gap-1 ms-4">
                        {requirements.map((item, index) => {return <li key={index}>{item}</li>})}
                    </ul>
                </div>
                <a href={link} target="_blank" className="inline-block font-medium text-center py-2 md:py-1 xl:py-2 text-white bg-secondary hover:bg-primary w-full rounded-full">Lamar Sekarang</a>
            </div>
        </div>
    )
}
