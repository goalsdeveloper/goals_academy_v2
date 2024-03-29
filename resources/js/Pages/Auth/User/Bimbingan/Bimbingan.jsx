import GoalsBadge from "@/Components/elements/GoalsBadge";
import GoalsButton from "@/Components/elements/GoalsButton";
import {
    ProductItemCardContent,
    ProductItemCardHeader,
    ProductItemCardLayout,
} from "@/Components/fragments/ProductItemCard";
import UserLayout from "@/Layouts/UserLayout";
import "@/script/momentCustomLocale";
import { Link } from "@inertiajs/react";
import moment from "moment";
import { useState } from "react";
import { FiChevronRight } from "react-icons/fi";
import ProductListFilter from "../ProductListFilter";
import figure from "/resources/img/figure/8.svg";
import { ProductFilter } from "../constants";

export default function Index({ auth, orderBimbingan }) {
    console.log(orderBimbingan);
    const [data, setData] = useState(orderBimbingan);

    return (
        <UserLayout auth={auth} title="Bimbingan">
            <div className="flex md:block justify-between items-center space-y-[1.2vw]">
                <h1 className="font-medium text-black text-[3.7vw] md:text-[1.8vw] leading-[12vw] md:leading-normal">
                    {/* {title == "Dashboard" ? "Pembelajaran Saya" : title} */}
                    Bimbingan
                </h1>
                <ProductListFilter
                    data={data}
                    setData={setData}
                    filterList={ProductFilter}
                />
            </div>
            {data.length == 0 ? (
                <EmptyProductLayout />
            ) : (
                <div className="space-y-[1vw]">
                    {/* <ProductListFilter /> */}
                    <div className="md:min-h-[22vw] flex flex-col gap-[2vw] md:gap-[1vw]">
                        {data.map((item, index) => {
                            // if (
                            //     item.products.features[0].category ==
                            //         "online" ||
                            //     item.products.features[0].category == "offline"
                            // ) {
                            //     return (
                            //     );
                            // }
                            return <BimbinganItem key={index} data={item} />;
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
        <ProductItemCardLayout
            isLink
            imageUrl={data.products.product_image}
            href={`/bimbingan/${data.order_code}`}
        >
            <div className="flex justify-between items-center">
                <div className="space-y-[1.8vw] w-full">
                    <ProductItemCardHeader>
                        <GoalsBadge
                            title={data.products.category.name}
                            className="text-secondary bg-primary-10"
                        />
                        <GoalsBadge
                            title={
                                data.course.ongoing.charAt(0).toUpperCase() +
                                data.course.ongoing.slice(1)
                            }
                            className="hidden md:block bg-success-10 text-success-50"
                        />
                    </ProductItemCardHeader>
                    <ProductItemCardContent>
                        {/* Content */}
                        <div className="text-[2.7vw] md:text-[1vw] space-y-[.2vw]">
                            <h2 className="text-[3.2vw] md:text-[1vw] font-medium mb-[.4vw] line-clamp-1">
                                {data.products.name}
                            </h2>
                            <p className="text-neutral-40 md:text-neutral-60">
                                {moment(data.form_result.schedule).format(
                                    "dddd, DD MMMM YYYY"
                                )}
                            </p>
                            <p className="hidden md:block text-neutral-60">
                                {data.course.time
                                    ? start_time + "-" + finish_time
                                    : "Waktu Belum Ditentukan"}
                            </p>
                        </div>
                        <Link
                            href={`/bimbingan/${data.order_code}`}
                            className="hidden md:block bg-secondary hover:bg-primary text-white font-medium text-[1vw] px-[2vw] py-[.8vw] rounded-[.4vw]"
                        >
                            Lihat Detail
                        </Link>
                    </ProductItemCardContent>
                </div>
                <FiChevronRight className="md:hidden text-[4.5vw] text-secondary" />
            </div>
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
        <div className="text-center flex flex-col justify-center items-center gap-[4vw] md:gap-[2vw] md:border border-neutral-20 rounded-[.8vw] w-full p-[2vw]">
            <img
                src={figure}
                alt={`image-${imgUrl}`}
                className="h-[30vw] w-[30vw] md:h-[14vw] md:w-[14vw]"
            />
            <p className="text-[3vw] md:text-[1.5vw] h5 font-medium font-poppins">
                {description}
            </p>
            <Link href={redirectUrl}>
                <GoalsButton variant="primary-inverse">{buttonTxt}</GoalsButton>
            </Link>
        </div>
    );
};
