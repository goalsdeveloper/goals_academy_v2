export default function ButtonPill({ href, children, target="_blank", className }) {
    return (
        <a
            href={href}
            target={target}
            className={`inline-block font-medium text-center py-2 md:py-1 xl:py-2 text-white bg-secondary hover:bg-primary rounded-full ${className}`}
        >
            {children}
        </a>
    );
}
