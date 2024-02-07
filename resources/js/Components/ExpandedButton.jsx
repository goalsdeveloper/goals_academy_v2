export default function ExpandedButton ({ className, textClassName, icon='fa-solid fa-chevron-right', iconClassName, onClick, form, type,  children }) {
    return (
        <button form={form} type={type} className={`w-full group rounded-[1vw] md:rounded-md flex justify-between items-center cursor-pointer text-[3.5vw] md:text-[.95vw] px-[3vw] md:px-[1vw] border-1 border-light-grey ${className}`} onClick={onClick}>
            <span className={`font-medium ${textClassName}`}>{children}</span>
            <i className={`text-inherit ${icon} ${iconClassName}`}></i>
        </button>
    )
}
