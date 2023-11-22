import { Link } from "@inertiajs/react";

export default function ButtonPill({
    href,
    children,
    target = "_blank",
    onClick,
    className,
    isLink = false,
    isActive = true,
    activeStyle = 'bg-secondary hover:bg-primary text-white'
}) {
    href = isActive ? href : null;
    if (isLink) {
        return (
            <Link
                href={href}
                target={target}
                className={`inline-block font-medium text-center py-2 md:py-1 xl:py-2 rounded-full ${isActive ? `${activeStyle} cursor-pointer` : 'text-white bg-light-grey'} ${className}`}
                onClick={isActive ? onClick : () => {}}
            >
                {children}
            </Link>
        );
    } else {
        return (
            <a
                href={href}
                target={target}
                className={`inline-block font-medium text-center py-2 md:py-1 xl:py-2 rounded-full ${isActive ? `${activeStyle} cursor-pointer` : 'text-white bg-light-grey'} ${className}`}
                onClick={isActive ? onClick : () => {}}
            >
                {children}
            </a>
        );
    }
}
