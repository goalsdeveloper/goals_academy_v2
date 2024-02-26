import { Link } from "@inertiajs/react";

export default function GoalsButton({
    href,
    children,
    target = "_blank",
    onClick,
    className,
    activeClassName = "bg-secondary hover:bg-primary text-white",
    isLink = false,
    isActive = true,
    isLoading = false,
}) {
    isActive = isLoading ? false : isActive;
    href = isActive ? href : null;
    if (isLink) {
        return (
            <Link
                href={href}
                target={target}
                className={`relative flex items-center justify-center font-medium py-[3vw] md:py-[.75vw] select-none ${className} ${isActive ? `${activeClassName} cursor-pointer` : 'text-white bg-light-grey'}`}
                onClick={isActive ? onClick : () => {}}
            >
                {isLoading ? (
                    <div className="h-full top-0 right-0 flex items-center px-[3vw] md:px-[1vw]">
                        <span className="text-light-grey">.</span>
                        <i className="fa-solid fa-circle-notch fa-spin text-inherit"></i>
                        <span className="text-light-grey">.</span>
                    </div>
                ) : (children)}
            </Link>
        );
    } else {
        return (
            <a
                href={href}
                target={target}
                className={`relative flex items-center justify-center font-medium py-[3vw] md:py-[.75vw] select-none ${className} ${isActive ? `${activeClassName} cursor-pointer` : 'text-white bg-light-grey'}`}
                onClick={isActive ? onClick : () => {}}
            >
                {isLoading ? (
                    <div className="h-full top-0 right-0 flex items-center px-[3vw] md:px-[1vw]">
                        <span className="text-light-grey">.</span>
                        <i className="fa-solid fa-circle-notch fa-spin text-inherit"></i>
                        <span className="text-light-grey">.</span>
                    </div>
                ) : (children)}
            </a>
        );
    }
}
