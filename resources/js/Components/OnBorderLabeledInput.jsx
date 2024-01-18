export default function Input({ type, id, label, value, error="", onChange, className, labelClassName }) {
    return (
        <div className="relative flex">
            <input
                value={value}
                onChange={onChange}
                id={id}
                type={type}
                className={`w-full border-1 xl:border-2 placeholder-shown:border-light-grey font-poppins rounded-[1vw] md:rounded-[.8vw] xl:rounded-[.4vw] pt-2 pb-1 px-3 md:pt-[1.75vw] md:pb-[1vw] md:px-[2vw] xl:pt-[.75vw] xl:pb-[.5vw] xl:px-[1vw] focus:outline-none peer/input ${error != "" ? "border-red-500" : "border-secondary focus:border-secondary"} ${className}`}
                placeholder=" "
            />
            {error != "" ? (
                <>
                    <div className="absolute flex items-center text-red-500 text-[3.5vw] xl:text-[1.5vw] h-full right-[3%] peer/error">
                        <i className="fa-solid fa-exclamation-circle cursor-pointer"></i>
                    </div>
                    <div className="absolute hidden peer-hover/error:block rounded-[.5vw] bg-dark bg-opacity-80 text-white p-1 px-2 top-[110%] right-[3%] z-50">
                        {error}
                    </div>
                </>
            ) : (<></>)}
            <label
                htmlFor={id}
                className={`absolute px-[1vw] md:px-[.5vw] xl:px-[.5vw] bg-white peer-placeholder-shown/input:text-light-grey ms-4 -mt-2 md:ms-4 md:-mt-2 xl:ms-4 xl:-mt-2 ${error != "" ? "text-red-500" : "text-secondary peer-focus/input:text-secondary"} ${labelClassName}`}
            >
                {label}
            </label>
        </div>
    );
}
