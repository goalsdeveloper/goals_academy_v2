export default function SubmitButton({ className, disabled, activeClassName="border-secondary text-secondary hover:text-white hover:bg-secondary", children }) {
    return (
        <button
            type="submit"
            disabled={disabled}
            className={`border-1 xl:border-2 font-poppins font-medium p-[2vw] md:p-[1.5vw] xl:p-[.75vw] ${disabled ? "border-light-grey text-white bg-light-grey" : activeClassName} ${className}`}
        >
            {children}
        </button>
    );
}
