export default function SubmitButton({ className, disabled, isLoading=false, activeClassName="border-secondary text-secondary hover:text-white hover:bg-secondary", children }) {
    return (
        <button
            type="submit"
            disabled={disabled}
            className={`relative flex justify-center items-center border-1 xl:border-2 font-poppins font-medium p-[2vw] md:p-[1.5vw] xl:p-[.75vw] ${disabled ? "border-light-grey text-white bg-light-grey" : activeClassName} ${className}`}
        >
            {children}
            <div className={`${isLoading ? "" : "hidden"} absolute h-full top-0 right-0 flex items-center px-[3vw] md:px-[1vw]`}>
                <i className="fa-solid fa-circle-notch fa-spin"></i>
            </div>
        </button>
    );
}
