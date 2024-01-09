export default function Input({ type, id, label, value, onChange, className, labelClassName }) {
    return (
        <div className="relative flex">
            <input
                value={value}
                onChange={onChange}
                id={id}
                type={type}
                className={`w-full border-1 xl:border-2 border-secondary placeholder-shown:border-light-grey font-poppins rounded-[1vw] md:rounded-[.8vw] xl:rounded-[.4vw] pt-2 pb-1 px-3 md:pt-[1.75vw] md:pb-[1vw] md:px-[2vw] xl:pt-[.75vw] xl:pb-[.5vw] xl:px-[1vw] focus:outline-none focus:border-secondary peer ${className}`}
                placeholder=" "
            />
            <label
                htmlFor={id}
                className={`absolute px-[1vw] md:px-[.5vw] xl:px-[.5vw] bg-white text-secondary peer-focus:text-secondary peer-placeholder-shown:text-light-grey ms-4 -mt-2 md:ms-4 md:-mt-2 xl:ms-4 xl:-mt-2 ${labelClassName}`}
            >
                {label}
            </label>
        </div>
    );
}
