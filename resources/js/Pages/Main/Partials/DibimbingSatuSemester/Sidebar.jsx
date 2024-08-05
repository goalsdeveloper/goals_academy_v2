import { FaRegCalendar } from "react-icons/fa6";
import { FiCreditCard, FiUser } from "react-icons/fi";
import { PiGraduationCap } from "react-icons/pi";
import { RiComputerFill, RiQuestionLine, RiThumbUpFill } from "react-icons/ri";
import { TbTag } from "react-icons/tb";

export default function Sidebar () {
    const items = [
        {
            title: "Benefit",
            icon: <RiThumbUpFill />,
            href: "#benefit",
            isActive: true,
        },
        {
            title: "Lini Waktu",
            icon: <FaRegCalendar />,
            href: "#lini-waktu",
            isActive: false,
        },
        {
            title: "Tools",
            icon: <RiComputerFill />,
            href: "#tools",
            isActive: false,
        },
        {
            title: "Tutor",
            icon: <PiGraduationCap />,
            href: "#tutor       ",
            isActive: false,
        },
        {
            title: "Testimoni",
            icon: <FiUser />,
            href: "#testimoni",
            isActive: false,
        },
        {
            title: "Harga",
            icon: <TbTag className="-scale-x-100" />,
            href: "#harga",
            isActive: false,
        },
        {
            title: "Pembayaran",
            icon: <FiCreditCard />,
            href: "#pembayaran",
            isActive: false,
        },
        {
            title: "FAQ",
            icon: <RiQuestionLine />,
            href: "#faq",
            isActive: false,
        },
    ]

    return (
        <nav className="sticky top-[7.5vw] w-2/12 h-fit border-r-2 flex flex-col gap-[1.5vw] font-poppins">
            {items.map((item, index) => {
                return <SidebarItem key={index} {...item} />
            })}
        </nav>
    )
}

function SidebarItem ({ title, icon, href, isActive}) {
    return (
        <a className={`${isActive ? "text-secondary border-secondary" : "text-light-grey border-transparent"} border-l-2 flex items-center gap-[.5vw] ps-[.5vw]`} href={href}>{icon} {title}</a>
    )
}