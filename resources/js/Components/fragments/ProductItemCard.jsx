import { Link } from "@inertiajs/react";
import { useMediaQuery } from "react-responsive";

const ContentLayout = ({ children, className = "", imageUrl, ...rest }) => {
    return (
        <div
            {...rest}
            className={`relative w-full flex shadow md:border border-neutral-20 py-[3.7vw] px-[1.2vw] md:p-[1.2vw] gap-[2.9vw] rounded-[1.6vw] md:rounded-[.8vw] ${className}`}
        >
            <img
                src={imageUrl}
                alt={imageUrl}
                className="w-[26.7vw] md:w-[13vw] rounded-[1.5vw] md:rounded-[.5vw] object-cover"
            />
            <div className="w-full py-[.5vw] flex flex-col gap-[1.6vw] justify-center pr-[1vw]">
                {children}
            </div>
        </div>
    );
};

const ProductItemCardLayout = ({
    children,
    imageUrl,
    href = "",
    isLink = false,
    ...rest
}) => {
    const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

    return isMobile & isLink ? (
        <Link href={href}>
            <ContentLayout imageUrl={imageUrl} {...rest}>{children}</ContentLayout>
        </Link>
    ) : (
        <ContentLayout imageUrl={imageUrl} {...rest}>
            {children}
        </ContentLayout>
    );
};

const ProductItemCardHeader = ({ children, className }) => {
    return (
        <div className={`flex gap-[.5vw] items-center ${className}`}>
            {children}
        </div>
    );
};

const ProductItemCardContent = ({ children }) => {
    return (
        <div className="flex w-full justify-between items-center">
            {/* Content */}
            {children}
        </div>
    );
};

export { ProductItemCardLayout, ProductItemCardHeader, ProductItemCardContent };
