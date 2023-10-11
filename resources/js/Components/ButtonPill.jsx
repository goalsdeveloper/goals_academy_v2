import { Link } from "@inertiajs/react";

export default function ButtonPill({ href, children, target="_blank", className, isLink=false, isActive=true }) {
    if (isLink) {
        return (
            <Link
                role="button"
                href={href}
                target={target}
                className={`inline-block font-medium text-center py-2 md:py-1 xl:py-2 text-white rounded-full ${isActive ? 'bg-secondary hover:bg-primary' : 'bg-light-grey'} ${className}`}
                disabled={!isActive}
            >
                {children}
            </Link>
        )
    } else {
        return (
            <a
                role="button"
                href={href}
                target={target}
                className={`inline-block font-medium text-center py-2 md:py-1 xl:py-2 text-white rounded-full ${isActive ? 'bg-secondary hover:bg-primary' : 'bg-light-grey'} ${className}`}
                disabled={!isActive}
            >
                {children}
            </a>
        );
    }
}
