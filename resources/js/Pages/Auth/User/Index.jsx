import UserLayout from "@/Layouts/UserLayout";
import { Link } from "@inertiajs/react";
import moment from "moment";
import ButtonHoverSlide from "@/Components/ButtonHoverSlide";
import figure from "/resources/img/figure/8.svg";
import CornerWaveVector from "@/Components/CornerWaveVector";
import "@/script/momentCustomLocale";

export default function Index({ auth, orderBimbingan }) {
    console.log(orderBimbingan);
    // const data = [
    //     {
    //         id: 1,
    //         products_id: 1,
    //         category_id: 1,
    //         order_id: orderBimbingan[0].order_code,
    //         name: orderBimbingan[0].products.name,
    //         date: '2023-12-01',
    //         time: '18:30',
    //         duration: 45,
    //         ongoing: true,
    //     },
    //     {
    //         id: 2,
    //         products_id: 1,
    //         category_id: 1,
    //         order_id: 'GA87654321',
    //         name: 'Bimbingan Offline 60 Menit',
    //         date: '2023-11-28',
    //         time: '19:00',
    //         duration: 60,
    //         ongoing: false,
    //     },
    //     {
    //         id: 1,
    //         products_id: 7,
    //         category_id: 2,
    //         order_id: 'GA1238064',
    //         name: 'Ebook 1',
    //         date: '2023-12-01',
    //     },
    //     {
    //         id: 2,
    //         products_id: 1,
    //         category_id: 1,
    //         order_id: 'GA7823164',
    //         name: 'Bimbingan Offline 60 Menit',
    //         date: '2023-11-28',
    //         time: '19:00',
    //         duration: 60,
    //         ongoing: false,
    //     },
    //     {
    //         id: 2,
    //         products_id: 10,
    //         category_id: 2,
    //         order_id: 'GA1918263',
    //         name: 'Ebook 2',
    //         date: '2023-12-01',
    //     },
    //     {
    //         id: 1,
    //         products_id: 8,
    //         category_id: 3,
    //         order_id: 'GA1237840',
    //         name: 'Webinar 1',
    //         date: '2023-12-12',
    //         time: '19:00',
    //         duration: 60,
    //     },
    // ]
    const data = orderBimbingan;

    return (
        <UserLayout auth={auth} title="Dashboard">
            {data.length == 0 ? (
                <div className="min-h-[60vh] md:min-h-[22vw] flex flex-col justify-center items-center gap-[4vw] md:gap-[2vw]">
                    <img
                        src={figure}
                        alt=""
                        className="h-[30vw] w-[30vw] md:h-[14vw] md:w-[14vw]"
                    />
                    <p className="text-[3vw] md:text-[1.5vw] md:text-secondary">
                        Anda Belum Memiliki Program
                    </p>
                    <Link
                        href="/produk"
                        className={`inline-block font-medium text-center py-[1.5vw] px-[2.5vw] md:py-[.5vw] md:px-[1vw] mt-[3vw] md:mt-0 border-[.2vw] border-secondary text-secondary hover:text-white rounded-full bg-white hover:bg-secondary cursor-pointer`}
                    >
                        Pilih Paket Program
                    </Link>
                </div>
            ) : (
                <div className="md:min-h-[22vw] flex flex-col gap-[6vw] md:gap-[1vw]">
                    {data.map((item, index) => {
                        if (
                            item.products.features[0].category == "online" ||
                            item.products.features[0].category == "offline"
                        ) {
                            return <BimbinganItem key={index} data={item} />;
                        } else if (item.category_id == 2) {
                            return <EbookItem key={index} data={item} />;
                        } else if (item.category_id == 3) {
                            return <WebinarItem key={index} data={item} />;
                        }
                    })}
                </div>
            )}
        </UserLayout>
    );
}

function BimbinganItem({ data }) {
    const start_time = data.course.time
        ? moment(data.course.time, "HH:mm").format("HH:mm")
        : "N/A";
    const finish_time = data.course.time
        ? moment()
              .hours(data.course.time.split(":")[0])
              .minutes(data.course.time.split(":")[1])
              .add(data.products.features[0].duration, "minutes")
              .format("HH:mm")
        : "N/A";

    return (
        <div className="relative w-full flex flex-wrap md:flex-nowrap justify-center md:justify-between items-center bg-secondary rounded-[1vw] text-white p-[6vw] md:p-[2vw] gap-[4vw] md:gap-0">
            <CornerWaveVector cornerClassName="w-4/12 md:w-3/12" />
            <div className="flex flex-col w-full md:w-8/12 gap-[2vw] md:gap-[1vw]">
                <div className="flex gap-[2vw] md:gap-[1vw] text-[2.75vw] md:text-[.95vw]">
                    <span className="bg-white text-secondary text-center rounded-[1vw] md:rounded-[.3vw] w-4/12 py-[.5vw] md:py-[.1vw]">
                        Bimbingan Skripsi
                    </span>
                    <span
                        className={`${
                            data.course.ongoing ? "bg-green-500" : "bg-red-600"
                        } text-white text-center rounded-[1vw] md:rounded-[.3vw] w-3/12 py-[.5vw] md:py-[.1vw]`}
                    >
                        {data.course.ongoing ? "Berjalan" : "Selesai"}
                    </span>
                </div>
                <h4 className="text-white font-normal font-sans text-[4vw] md:text-[1.75vw]">
                    {data.products.name}
                </h4>
                <div className="text-[2.75vw] md:text-[.95vw]">
                    <p>
                        {moment(data.course.date).format("dddd, DD MMMM YYYY")}
                    </p>
                    <p>
                        {data.course.time
                            ? start_time + "-" + finish_time
                            : "Waktu Belum Ditentukan"}
                    </p>
                </div>
            </div>
            <Link
                href={`/pembelajaran/${data.order_code}`}
                className="w-4/12 h-[6vw] md:w-[30%] md:h-[3vw] cursor-pointer"
            >
                <ButtonHoverSlide className="h-full md:before:p-0.5 lg:before:p-1 xl:before:p-1.5 3xl:before:p-2 before:content-arrow-right-secondary-20 xs:before:content-arrow-right-secondary-32 md:before:content-arrow-right-secondary-20 xl:before:content-arrow-right-secondary-24 3xl:before:content-arrow-right-secondary-32 after:content-detail after:text-white after:text-[2.5vw] md:after:text-[1vw] medium border-1 xl:border-2 border-white rounded-full before:w-[160%] before:-ms-[160%] before:duration-300 after:w-full after:duration-300 hover:before:-ms-[30%] hover:after:-me-[100%] before:bg-sweep-white"></ButtonHoverSlide>
            </Link>
        </div>
    );
}

function EbookItem({ data }) {
    return (
        <div className="relative w-full flex flex-wrap md:flex-nowrap justify-center md:justify-between items-center bg-secondary rounded-[1vw] text-white p-[6vw] md:p-[2vw]">
            <CornerWaveVector cornerClassName="w-4/12 md:w-3/12" />
            <div className="flex flex-col w-full md:w-8/12 gap-[2vw] md:gap-[1vw]">
                <div className="flex gap-[2vw] md:gap-[1vw] text-[2.75vw] md:text-[.95vw]">
                    <span className="bg-white text-secondary text-center rounded-[1vw] md:rounded-[.3vw] w-4/12 py-[.5vw] md:py-[.1vw]">
                        Ebook Skripsi
                    </span>
                </div>
                <h4 className="text-white font-normal font-sans text-[4vw] md:text-[1.75vw]">
                    {data.name}
                </h4>
            </div>
            <Link
                href={`/ebook/${data.id}`}
                className="w-4/12 h-[6vw] md:w-[30%] md:h-[3vw] cursor-pointer"
            >
                <ButtonHoverSlide className="h-full md:before:p-0.5 lg:before:p-1 xl:before:p-1.5 3xl:before:p-2 before:content-arrow-right-secondary-20 xs:before:content-arrow-right-secondary-32 md:before:content-arrow-right-secondary-20 xl:before:content-arrow-right-secondary-24 3xl:before:content-arrow-right-secondary-32 after:content-detail after:text-white after:text-[2.5vw] md:after:text-[1vw] medium border-1 xl:border-2 border-white rounded-full before:w-[160%] before:-ms-[160%] before:duration-300 after:w-full after:duration-300 hover:before:-ms-[30%] hover:after:-me-[100%] before:bg-sweep-white"></ButtonHoverSlide>
            </Link>
        </div>
    );
}

function WebinarItem({ data }) {
    const start_time = data.time;
    const finish_time = moment()
        .hours(data.time.split(":")[0])
        .minutes(data.time.split(":")[1])
        .add(data.duration, "minutes")
        .format("HH:mm");
    return (
        <div className="relative w-full flex flex-wrap md:flex-nowrap justify-center md:justify-between items-center bg-secondary rounded-[1vw] text-white p-[6vw] md:p-[2vw]">
            <CornerWaveVector cornerClassName="w-4/12 md:w-3/12" />
            <div className="flex flex-col w-full md:w-8/12 gap-[2vw] md:gap-[1vw]">
                <div className="flex gap-[2vw] md:gap-[1vw] text-[2.75vw] md:text-[.95vw]">
                    <span className="bg-white text-secondary text-center rounded-[1vw] md:rounded-[.3vw] w-4/12 py-[.5vw] md:py-[.1vw]">
                        Webinar Skripsi
                    </span>
                </div>
                <h4 className="text-white font-normal font-sans text-[4vw] md:text-[1.75vw]">
                    {data.name}
                </h4>
                <div className="text-[.9vw]">
                    <p>{moment(data.date).format("dddd, DD MMMM YYYY")}</p>
                    <p>
                        {start_time} - {finish_time}
                    </p>
                </div>
            </div>
            <Link
                href={`/webinar/${data.id}`}
                className="w-4/12 h-[6vw] md:w-[30%] md:h-[3vw] cursor-pointer"
            >
                <ButtonHoverSlide className="h-full md:before:p-0.5 lg:before:p-1 xl:before:p-1.5 3xl:before:p-2 before:content-arrow-right-secondary-20 xs:before:content-arrow-right-secondary-32 md:before:content-arrow-right-secondary-20 xl:before:content-arrow-right-secondary-24 3xl:before:content-arrow-right-secondary-32 after:content-detail after:text-white after:text-[2.5vw] md:after:text-[1vw] medium border-1 xl:border-2 border-white rounded-full before:w-[160%] before:-ms-[160%] before:duration-300 after:w-full after:duration-300 hover:before:-ms-[30%] hover:after:-me-[100%] before:bg-sweep-white"></ButtonHoverSlide>
            </Link>
        </div>
    );
}
