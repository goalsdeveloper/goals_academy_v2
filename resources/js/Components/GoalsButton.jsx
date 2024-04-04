import { Link } from "@inertiajs/react";

export default function GoalsButton({
    method,
    href,
    children,
    target = "_blank",
    onClick,
    className,
    activeClassName = "bg-secondary hover:bg-primary text-white",
    isLink = false,
    isActive = true,
    isLoading = false,
    ...rest
}) {
    isActive = isLoading ? false : isActive;
    href = isActive ? href : null;
    if (isLink) {
        return (
            <Link
                method={method}
                href={href}
                target={target}
                className={`relative flex items-center justify-center font-medium py-[3vw] md:py-[.75vw] select-none ${className} ${isActive ? `${activeClassName} cursor-pointer` : 'text-white bg-light-grey'}`}
                onClick={isActive ? onClick : () => {}}
                {...rest}
            >
                {isLoading ? (
                    <div className="h-full top-0 right-0 flex items-center px-[3vw] md:px-[1vw]">
                        <span className="text-transparent">.</span>
                        <i className="fa-solid fa-circle-notch fa-spin text-inherit"></i>
                        <span className="text-transparent">.</span>
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
                        <span className="text-transparent">.</span>
                        <i className="fa-solid fa-circle-notch fa-spin text-inherit"></i>
                        <span className="text-transparent">.</span>
                    </div>
                ) : (children)}
            </a>
        );
    }
}
