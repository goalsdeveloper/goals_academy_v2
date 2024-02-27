const ProductItemCardLayout = ({ children, imageUrl }) => {
    return (
        <div className="relative w-full flex border border-neutral-20 p-[1.2vw] gap-[2.9vw] rounded-[.8vw] ">
            <img
                src={imageUrl}
                alt={imageUrl}
                className="w-[13vw] h-[9vw] rounded-[.5vw] object-contain"
            />
            <div className="w-full py-[.5vw] flex flex-col gap-[1.6vw] justify-center pr-[1vw]">
                {children}
            </div>
        </div>
    );
};

const ProductItemCardHeader = ({ children, className }) => {
    return <div className={`flex gap-[.5vw] items-center ${className}`}>{children}</div>;
};

const ProductItemCardContent = ({ children }) => {
    return (
        <div className="flex w-full justify-between items-center">
            {/* Content */}
            {children}
        </div>
    );
};

export {
    ProductItemCardLayout,
    ProductItemCardHeader,
    ProductItemCardContent,
};
