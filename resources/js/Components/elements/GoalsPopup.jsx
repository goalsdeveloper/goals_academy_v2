import React from "react";

const GoalsPopup = ({
    children,
    show,
    setShow,
    className,
    isBgClickDisabled = false,
    ...rest
}) => {
    return (
        <>
            <div
                className={`${
                    show ? "" : "hidden"
                } fixed top-0 bottom-0 left-0 right-0 w-full h-screen overflow-hidden bg-dark bg-opacity-50 transition-all duration-300 z-50`}
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
                } fixed md:absolute md:inset-0 mx-auto flex flex-col gap-[2vw] w-full md:w-[30vw] h-[50vh] md:h-fit transition-all duration-500 bg-white shadow-md rounded-t-[6vw] md:rounded-[1vw] p-[8vw] md:p-[1.75vw] z-50  md:mt-[8vh] ${className}`}
            >
                {children}
            </div>
        </>
    );
};

export default GoalsPopup;
