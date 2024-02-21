export default function GoalsRadio ({ checked, className, textClassName, circleClassName, onClick, children }) {
    return (
        <button className={`w-full group rounded-[1vw] md:rounded-md flex justify-between items-center cursor-pointer px-[3vw] md:px-[1vw] ${className}`} onClick={onClick}>
            <span className={`font-medium ${textClassName}`}>{children}</span>
            <div className={`w-[1.25vw] h-[1.25vw] rounded-full border-[.2vw] border-secondary ${circleClassName}`}>
                <div className={`w-full h-full rounded-full border-1 border-white ${checked ? `bg-secondary` : ''}`}></div>
            </div>
        </button>
    )
}
