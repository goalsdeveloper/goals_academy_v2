export default function GoalsStarRating ({ totalStars, data, setData, disabled=false, className, starClassName }) {
    return (
        <div className={`w-full text-center ${className}`}>
            {[...Array(totalStars)].map((_, index) => (
                <span
                    key={index}
                    onClick={() => !disabled && setData(index + 1)}
                    className={`leading-none text-[10vw] md:text-[3.5vw] select-none ${disabled ? 'cursor-default' : 'cursor-pointer'} ${starClassName}`}
                    style={{
                        color: index < data ? "gold" : "gray",
                    }}
                >
                    &#9733;
                </span>
            ))}
        </div>
    );
};
