const StarRating = ({ totalStars, rating, setRating }) => {
    const handleStarClick = (starIndex) => {
        setRating(starIndex + 1);
    };

    return (
        <div className="w-full text-center">
            {[...Array(totalStars)].map((_, index) => (
                <span
                    key={index}
                    onClick={() => handleStarClick(index)}
                    className="leading-none text-[10vw] md:text-[3.5vw] cursor-pointer"
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
