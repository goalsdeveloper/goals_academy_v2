import GoalsBadge from "@/Components/elements/GoalsBadge";
import GoalsChip from "@/Components/elements/GoalsChip";
import UserLayout from "@/Layouts/UserLayout";
import "@/script/momentCustomLocale";
import { Link } from "@inertiajs/react";
import moment from "moment";
import figure from "/resources/img/figure/8.svg";
import CardImage from "/resources/img/karir/academic-internship.png";
import {
    ProductItemCardContent,
    ProductItemCardHeader,
    ProductItemCardLayout,
} from "@/Components/ProductItemCard";

export default function Index({ auth, orderBimbingan }) {
    // console.log(orderBimbingan);
    // const data = orderBimbingan;
    const data = [
        {
            id: 1,
            products: {
                name: "Bimbingan Sekali Offline 60 Menit",
                features: [
                    {
                        category: "offline",
                        duration: 120,
                    },
                ],
            },
            course: {
                date: "2022-08-12",
                time: "08:00",
                ongoing: true,
            },
        },
        {
            id: 2,
            products: {
                name: "Bimbingan Skripsi",
                features: [
                    {
                        category: "offline",
                        duration: 120,
                    },
                ],
            },
            course: {
                date: "2022-08-12",
                time: "08:00",
                ongoing: false,
            },
        },
        {
            id: 3,
            products: {
                name: "Bimbingan Skripsi",
                features: [
                    {
                        category: "offline",
                        duration: 120,
                    },
                ],
            },
            course: {
                date: "2022-08-12",
                time: "08:00",
                ongoing: true,
            },
        },
        {
            id: 4,
            products: {
                name: "Bimbingan Skripsi",
                features: [
                    {
                        category: "offline",
                        duration: 120,
                    },
                ],
            },
            course: {
                date: "2022-08-12",
                time: "08:00",
                ongoing: false,
            },
        },
    ];

    return (
        <UserLayout auth={auth} title="Bimbingan">
            {data.length == 0 ? (
                <EmptyProductLayout />
            ) : (
                <div className="space-y-[1vw]">
                    <GoalsChip />
                    <div className="md:min-h-[22vw] flex flex-col gap-[6vw] md:gap-[1vw]">
                        {data.map((item, index) => {
                            if (
                                item.products.features[0].category ==
                                    "online" ||
                                item.products.features[0].category == "offline"
                            ) {
                                return (
                                    <BimbinganItem key={index} data={item} />
                                );
                            }
                        })}
                    </div>
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
        <ProductItemCardLayout imageUrl={CardImage}>
            <ProductItemCardHeader>
                <GoalsBadge
                    title="Bimbingan Skripsi"
                    className="text-secondary bg-primary-10"
                />
                <GoalsBadge
                    title="Berjalan"
                    className="bg-success-10 text-success-50"
                />
            </ProductItemCardHeader>
            <ProductItemCardContent>
                {/* Content */}
                <div className="text-[1vw] space-y-[.2vw]">
                    <h2 className="h5 font-medium mb-[.4vw]">
                        {data.products.name}
                    </h2>
                    <p className="text-neutral-60">Selasa, 24 Agustus 2023</p>
                    <p className="text-neutral-60">
                        {data.course.time
                            ? start_time + "-" + finish_time
                            : "Waktu Belum Ditentukan"}
                    </p>
                </div>
                <Link
                    href={`/pembelajaran/${data.id}`}
                    className="bg-secondary hover:bg-primary text-white font-medium text-[1vw] px-[2vw] py-[.8vw] rounded-[.4vw]"
                >
                    Lihat Detail
                </Link>
            </ProductItemCardContent>
        </ProductItemCardLayout>
    );
}

export const EmptyProductLayout = ({
    imgUrl = figure,
    redirectUrl = "/",
    description = "Kamu belum punya program yang aktif nih",
    buttonTxt = "Cari Program",
}) => {
    return (
        <div className="flex flex-col justify-center items-center gap-[4vw] md:gap-[2vw] border border-neutral-20 rounded-[.8vw] w-full p-[2vw]">
            <img
                src={figure}
                alt={`image-${imgUrl}`}
                className="h-[30vw] w-[30vw] md:h-[14vw] md:w-[14vw]"
            />
            <p className="text-[3vw] md:text-[1.5vw] h5 font-medium font-poppins">
                {description}
            </p>
            <Link
                href={redirectUrl}
                className={`bg-secondary text-white px-[2vw] py-[.8vw] rounded-[.4vw] `}
            >
                {buttonTxt}
            </Link>
        </div>
    );
};
