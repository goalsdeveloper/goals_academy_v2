import { Link } from "@inertiajs/react";
import { useMediaQuery } from "react-responsive";

const ContentLayout = ({ children, className = "", imageUrl, ...rest }) => {
    const isMobile = useMediaQuery({ query: "(max-width: 767px)" });

    return (
        <div
            {...rest}
            className={`${isMobile && 'px-[7.4vw] py-[4vw] border-t-2'} relative w-full flex md:shadow-none md:border border-gray-200 p-[1.2vw] gap-[2.9vw] md:rounded-[.8vw] ${className}`}
        >
            <img
                src={imageUrl}
                alt={"content-image"}
                className="w-[26.7vw] md:w-[13vw] h-[18.6vw] md:h-[9vw] rounded-[1.5vw] md:rounded-[.5vw] object-cover bg-neutral-400 flex-shrink-0"
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
    const isMobile = useMediaQuery({ query: "(max-width: 767px)" });

    return isMobile && isLink ? (
        // TODO make link as child
        <Link href={href}>
            <ContentLayout imageUrl={imageUrl} {...rest}>
                {children}
            </ContentLayout>
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
        <div className="flex items-center justify-between w-full">
            {/* Content */}
            {children}
        </div>
    );
};

export { ProductItemCardLayout, ProductItemCardHeader, ProductItemCardContent };
