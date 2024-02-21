import { Link } from "@inertiajs/react";

export default function ButtonPill({
    href,
    children,
    target = "_blank",
    onClick,
    className,
    isLink = false,
    isActive = true,
    isLoading = false,
    activeStyle = 'bg-secondary hover:bg-primary text-white'
}) {
    isActive = isLoading ? false : isActive;
    href = isActive ? href : null;
    if (isLink) {
        return (
            <Link
                href={href}
                target={target}
                className={`relative flex items-center justify-center font-medium text-inherit py-2 md:py-1 xl:py-2 select-none ${isActive ? `${activeStyle} cursor-pointer` : 'text-white bg-light-grey'} ${className}`}
                onClick={isActive ? onClick : () => {}}
            >
                {children}
                <div className={`${isLoading ? "" : "hidden"} absolute h-full top-0 right-0 flex items-center px-[3vw] md:px-[1vw]`}>
                    <i className="fa-solid fa-circle-notch fa-spin"></i>
                </div>
            </Link>
        );
    } else {
        return (
            <a
                href={href}
                target={target}
                className={`relative flex items-center justify-center font-medium text-inherit py-2 md:py-1 xl:py-2 select-none ${isActive ? `${activeStyle} cursor-pointer` : 'text-white bg-light-grey'} ${className}`}
                onClick={isActive ? onClick : () => {}}
            >
                {children}
                <div className={`${isLoading ? "" : "hidden"} absolute h-full top-0 right-0 flex items-center px-[3vw] md:px-[1vw]`}>
                    <i className="fa-solid fa-circle-notch fa-spin"></i>
                </div>
            </a>
        );
    }
}
