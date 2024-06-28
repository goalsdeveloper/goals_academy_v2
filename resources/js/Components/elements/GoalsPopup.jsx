import useScrollBlock from "@/Hooks/useScrollBlock";
import React from "react";

const GoalsPopup = ({
    children,
    show,
    setShow,
    className,
    isBgClickDisabled = false,
    header = "",
    ...rest
}) => {
    const [blockScroll, allowScroll] = useScrollBlock();

    React.useEffect(() => {
        if (show) {
            blockScroll();
        } else {
            allowScroll();
        }
    });

    return (
        <>
            <div
                className={`${
                    show ? "" : "hidden"
                } fixed top-0 bottom-0 left-0 right-0 w-full h-screen overflow-hidden bg-dark bg-opacity-50 transition-all duration-300 z-[100]`}
                onClick={() => {
                    if (!isBgClickDisabled) {
                        setShow(false);
                    }
                }}
            />
            <div
                className={`${
                    show
                        ? "md:top-0 bottom-0 md:scale-100"
                        : "md:top-full -bottom-full md:scale-0"
                } fixed md:inset-0 mx-auto flex flex-col gap-[2vw] w-full md:w-[30vw] md:h-fit transition-all duration-500 bg-white shadow-md rounded-t-[6vw] md:rounded-[1vw] p-[8vw] md:p-[1.75vw] z-[100] md:mt-[8vh] ${className}`}
            >
                {header && (
                    <h2 className="text-[1.25vw] text-center">{header}</h2>
                )}
                {children}
            </div>
        </>
    );
};

export default GoalsPopup;
