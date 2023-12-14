export default function ExpandedButton ({ className, borderClassName="border-1 border-light-grey", textClassName="font-medium", icon='fa-solid fa-chevron-right', iconClassName, onClick, form, type,  children }) {
    return (
        <button form={form} type={type} className={`w-full group rounded-[1vw] md:rounded-md flex justify-between items-center cursor-pointer text-[3.5vw] md:text-[.95vw] px-[3vw] md:px-[1vw] ${borderClassName} ${className}`} onClick={onClick}>
            <span className={textClassName}>{children}</span>
            <i className={`${icon} ${iconClassName}`}></i>
        </button>
    )
}
