export default function BorderedChevronButton ({ className="border-1 border-light-grey py-2 px-3", textClassName="font-medium", chevronClassName, onClick, form, type,  children }) {
    return (
        <button form={form} type={type} className={`w-full rounded-md flex justify-between items-center ${className}`} onClick={onClick}>
            <span className={textClassName}>{children}</span>
            <i className={`fa-solid fa-chevron-right ${chevronClassName}`}></i>
        </button>
    )
}
