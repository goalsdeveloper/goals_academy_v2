export default function TECollapseItem({ breakClassName, className, children }) {
    return (
        <>
            <br className={breakClassName} />
            <div className={`grid ${className}`}>
                {children}
            </div>
        </>
    );
}
