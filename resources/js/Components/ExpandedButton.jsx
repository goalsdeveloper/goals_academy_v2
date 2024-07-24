export default function ExpandedButton ({ className, textClassName, icon='fa-solid fa-chevron-right', iconClassName, form, type, children, ...rest }) {
    return (
        <button form={form} type={type} className={`w-full group rounded-[1vw] md:rounded-md flex justify-between items-center cursor-pointer px-[3vw] md:px-[1vw] ${className}`} {...rest} >
            <span className={`font-medium ${textClassName}`}>{children}</span>
            <i className={`${icon} ${iconClassName}`}></i>
        </button>
    )
}
