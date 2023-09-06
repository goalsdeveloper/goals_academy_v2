export default function ButtonHoverSlide ({className, children}) {
    return (
        <div
            className={`
                relative
                overflow-hidden
                before:absolute
                before:top-0
                before:left-0
                before:grid
                before:items-center
                before:justify-center
                before:h-full
                after:absolute
                after:top-0
                after:right-0
                after:grid
                after:h-full
                after:items-center
                after:justify-center
                ${className}
            `}
        >
            {children}
        </div>
    )
}
