import { Link } from "@inertiajs/react";

export default function ButtonPill({ href, children, target="_blank", onClick, className, isLink=false, isActive=true }) {
    href = isActive ? href : null
    if (isLink) {
        return (
            <Link
                href={href}
                target={target}
                className={`inline-block font-medium text-center py-2 md:py-1 xl:py-2 text-white rounded-full ${isActive ? 'bg-secondary hover:bg-primary' : 'bg-light-grey'} ${className}`}
                disabled={!isActive}
                onClick={onClick}
            >
                {children}
            </Link>
        )
    } else {
        return (
            <a
                href={href}
                target={target}
                className={`inline-block font-medium text-center py-2 md:py-1 xl:py-2 text-white rounded-full ${isActive ? 'bg-secondary hover:bg-primary' : 'bg-light-grey'} ${className}`}
                disabled={!isActive}
                onClick={onClick}
            >
                {children}
            </a>
        );
    }
}
