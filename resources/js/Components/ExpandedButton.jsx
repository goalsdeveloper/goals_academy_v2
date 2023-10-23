export default function ExpandedButton ({ className, borderClassName="border-1 border-light-grey", textClassName="font-medium", icon='fa-solid fa-chevron-right', iconClassName, onClick, form, type,  children }) {
    return (
        <button form={form} type={type} className={`w-full rounded-md flex justify-between items-center cursor-pointer py-2 px-3 ${borderClassName} ${className}`} onClick={onClick}>
            <span className={textClassName}>{children}</span>
            <i className={`${icon} ${iconClassName}`}></i>
        </button>
    )
}
