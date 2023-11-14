import UserLayout from "@/Layouts/UserLayout";
import { Link } from "@inertiajs/react";
import moment from "moment";
import ButtonHoverSlide from "@/Components/ButtonHoverSlide";
import figure from "/resources/img/user/empty-program.png";
import CornerWaveVector from "@/Components/CornerWaveVector";
import "@/script/momentCustomLocale";

export default function Index ({ auth }) {
    const data = [
        {
            id: 1,
            products_id: 1,
            category_id: 1,
            order_id: 'GA1234578',
            name: 'Bimbingan Online 45 Menit',
            date: '2023-12-01',
            time: '18:30',
            duration: 45,
            ongoing: true,
        },
        {
            id: 2,
            products_id: 1,
            category_id: 1,
            order_id: 'GA87654321',
            name: 'Bimbingan Offline 60 Menit',
            date: '2023-11-28',
            time: '19:00',
            duration: 60,
            ongoing: false,
        },
        {
            id: 1,
            products_id: 7,
            category_id: 2,
            order_id: 'GA1238064',
            name: 'Ebook 1',
            date: '2023-12-01',
        },
        {
            id: 2,
            products_id: 1,
            category_id: 1,
            order_id: 'GA7823164',
            name: 'Bimbingan Offline 60 Menit',
            date: '2023-11-28',
            time: '19:00',
            duration: 60,
            ongoing: false,
        },
        {
            id: 2,
            products_id: 10,
            category_id: 2,
            order_id: 'GA1918263',
            name: 'Ebook 2',
            date: '2023-12-01',
        },
        {
            id: 1,
            products_id: 8,
            category_id: 3,
            order_id: 'GA1237840',
            name: 'Webinar 1',
            date: '2023-12-12',
            time: '19:00',
            duration: 60,
        },
    ]

    return (
        <UserLayout auth={auth} title="Dashboard">
            {data.length == 0 ? (
                <div className="min-h-[21vw] flex flex-col justify-center items-center gap-[2vw]">
                    <img src={figure} alt="" className="h-[10vw] w-[10vw]" />
                    <p className="text-[1.5vw] text-secondary">Anda Belum Memiliki Program</p>
                    <Link
                        href="/produk"
                        className={`inline-block font-medium text-center py-[.5vw] px-[1vw] border-[.2vw] border-secondary text-secondary hover:text-white rounded-full bg-white hover:bg-secondary cursor-pointer`}
                    >
                        Pilih Paket Program
                    </Link>
                </div>
            ) : (
                <div className="min-h-[21vw] flex flex-col gap-[2vw]">
                    <div className="flex flex-col gap-[1vw]">
                        {data.map((item, index) => {
                            if (item.category_id == 1) {
                                return (
                                    <BimbinganItem key={index} data={item} />
                                )
                            } else if (item.category_id == 2) {
                                return (
                                    <EbookItem key={index} data={item} />
                                )
                            } else if (item.category_id == 3) {
                                return (
                                    <WebinarItem key={index} data={item} />
                                )
                            }
                        })}
                    </div>
                </div>
            )}
        </UserLayout>
    )
}

function BimbinganItem ({ data }) {
    const start_time = data.time
    const finish_time = moment().hours(data.time.split(':')[0]).minutes(data.time.split(':')[1]).add(data.duration, 'minutes').format('HH:mm')
    return (
        <div className="relative w-full flex justify-between items-center bg-secondary rounded-[1vw] text-white p-[2vw]">
            <CornerWaveVector cornerClassName="w-3/12" />
            <div className="flex flex-col w-8/12 gap-[1vw]">
                <div className="flex gap-[1vw] text-[.95vw]">
                    <span className="bg-white text-secondary text-center rounded-[.3vw] w-4/12 py-[.1vw]">Bimbingan Skripsi</span>
                    <span className={`${data.ongoing ? 'bg-green-500' : 'bg-red-600'} text-white text-center rounded-[.3vw] w-3/12 py-[.1vw]`}>{data.ongoing ? 'Berjalan' : 'Selesai'}</span>
                </div>
                <h4 className="text-white font-normal font-sans text-[1.75vw]">{data.name}</h4>
                <div className="text-[.95vw]">
                    <p>{moment(data.date).format('dddd, DD MMMM YYYY')}</p>
                    <p>{start_time} - {finish_time}</p>
                </div>
            </div>
            <Link href={`/pembelajaran/${data.order_id}`} className="w-[30%] h-[3vw] cursor-pointer">
                <ButtonHoverSlide className="h-full md:before:p-0.5 lg:before:p-1 xl:before:p-1.5 3xl:before:p-2 before:content-arrow-right-secondary-20 xs:before:content-arrow-right-secondary-32 md:before:content-arrow-right-secondary-20 xl:before:content-arrow-right-secondary-24 3xl:before:content-arrow-right-secondary-32 after:content-detail after:text-white medium border-1 xl:border-2 border-white rounded-full before:w-[160%] before:-ms-[160%] before:duration-300 after:w-full after:duration-300 hover:before:-ms-[30%] hover:after:-me-[100%] before:bg-sweep-white"></ButtonHoverSlide>
            </Link>
        </div>
    )
}

function EbookItem ({ data }) {
    return (
        <div className="relative w-full flex justify-between items-center bg-secondary rounded-[1vw] text-white p-[2vw]">
            <CornerWaveVector cornerClassName="w-3/12" />
            <div className="flex flex-col w-8/12 gap-[1vw]">
                <div className="flex gap-[1vw] text-[.95vw]">
                    <span className="bg-white text-secondary text-center rounded-[.3vw] w-4/12 py-[.1vw]">Ebook Skripsi</span>
                </div>
                <h4 className="text-white font-normal font-sans text-[1.75vw]">{data.name}</h4>
            </div>
            <Link href={`/ebook/${data.id}`} className="w-[30%] h-[3vw] cursor-pointer">
                <ButtonHoverSlide className="h-full md:before:p-0.5 lg:before:p-1 xl:before:p-1.5 3xl:before:p-2 before:content-arrow-right-secondary-20 xs:before:content-arrow-right-secondary-32 md:before:content-arrow-right-secondary-20 xl:before:content-arrow-right-secondary-24 3xl:before:content-arrow-right-secondary-32 after:content-detail after:text-white medium border-1 xl:border-2 border-white rounded-full before:w-[160%] before:-ms-[160%] before:duration-300 after:w-full after:duration-300 hover:before:-ms-[30%] hover:after:-me-[100%] before:bg-sweep-white"></ButtonHoverSlide>
            </Link>
        </div>
    )
}

function WebinarItem ({ data }) {
    const start_time = data.time
    const finish_time = moment().hours(data.time.split(':')[0]).minutes(data.time.split(':')[1]).add(data.duration, 'minutes').format('HH:mm')
    return (
        <div className="relative w-full flex justify-between items-center bg-secondary rounded-[1vw] text-white p-[2vw]">
            <CornerWaveVector cornerClassName="w-3/12" />
            <div className="flex flex-col w-8/12 gap-[1vw]">
                <div className="flex gap-[1vw] text-[.95vw]">
                    <span className="bg-white text-secondary text-center rounded-[.3vw] w-4/12 py-[.1vw]">Webinar Skripsi</span>
                </div>
                <h4 className="text-white font-normal font-sans text-[1.75vw]">{data.name}</h4>
                <div className="text-[.9vw]">
                    <p>{moment(data.date).format('dddd, DD MMMM YYYY')}</p>
                    <p>{start_time} - {finish_time}</p>
                </div>
            </div>
            <Link href={`/webinar/${data.id}`} className="w-[30%] h-[3vw] cursor-pointer">
                <ButtonHoverSlide className="h-full md:before:p-0.5 lg:before:p-1 xl:before:p-1.5 3xl:before:p-2 before:content-arrow-right-secondary-20 xs:before:content-arrow-right-secondary-32 md:before:content-arrow-right-secondary-20 xl:before:content-arrow-right-secondary-24 3xl:before:content-arrow-right-secondary-32 after:content-detail after:text-white medium border-1 xl:border-2 border-white rounded-full before:w-[160%] before:-ms-[160%] before:duration-300 after:w-full after:duration-300 hover:before:-ms-[30%] hover:after:-me-[100%] before:bg-sweep-white"></ButtonHoverSlide>
            </Link>
        </div>
    )
}
