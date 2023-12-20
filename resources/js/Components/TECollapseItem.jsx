export default function TECollapseItem({ className, children }) {
    return (
        <>
            <br />
            <div className={`grid ${className}`}>
                {children}
            </div>
        </>
    );
}
