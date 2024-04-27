const StarRating = ({
    totalStars,
    rating,
    setRating,
    size = "",
    className,
}) => {
    const handleStarClick = (starIndex) => {
        setRating(starIndex + 1);
    };

    function getSizeClass(size) {
        switch (size) {
            case "sm":
                return "text-[4vw] md:text-[1.6vw]";
            default:
                return "text-[10vw] md:text-[3.5vw]";
        }
    }

    return (
        <div className={`w-fit text-center ${className}`}>
            {[...Array(totalStars)].map((_, index) => (
                <span
                    key={index}
                    onClick={() => handleStarClick(index)}
                    className={`leading-none cursor-pointer ${getSizeClass(
                        size
                    )}`}
                    style={{
                        color: index < rating ? "gold" : "gray",
                    }}
                >
                    &#9733;
                </span>
            ))}
        </div>
    );
};

export default StarRating;
