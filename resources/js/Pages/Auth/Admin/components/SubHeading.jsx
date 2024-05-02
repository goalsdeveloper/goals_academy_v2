const SubHeading = ({ title, className, titleClassName, children }) => {
    return (
        <div className={`flex w-full justify-between items-center ${className}`}>
            <span className={`text-[1.2vw] font-medium ${titleClassName}`}>{title}</span>
            {children}
        </div>
    );
};

export default SubHeading;
