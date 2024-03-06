import { Link } from "@inertiajs/react";

export default function DashboardNavbarItem({
    href,
    method,
    active,
    className,
    children,
}) {
    return (
        <Link className={` ${className}`} href={href} method={method}>
            <button
                className={`relative flex items-center h-[12vw] md:h-[3.5vw] w-full border-transparent px-[8vw] md:px-[1vw] rounded-none ${
                    active ? "bg-primary-20 scale-[1.005]" : "bg-white hover:bg-soft"
                }`}
                textClassName={`font-medium text-[4vw] md:text-[1.15vw] ${
                    active ? "text-white" : "text-secondary"
                }`}
                iconClassName={active ? "text-white" : "text-secondary"}
            >
                <div className="flex items-center gap-[4vw] md:gap-[1vw]">
                    {children}
                </div>

                <div
                    className={`absolute right-0 top-0 ${
                        active ? "bg-secondary" : "bg-white hover:bg-soft"
                    } w-[.2vw] h-full`}
                />
            </button>
        </Link>
    );
}
