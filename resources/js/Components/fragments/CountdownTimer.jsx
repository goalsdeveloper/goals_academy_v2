import React, { useState, useEffect } from "react";

const CountdownTimer = ({ targetDateTime }) => {
    const [timeRemaining, setTimeRemaining] = useState(
        calculateTimeRemaining()
    );

    function calculateTimeRemaining() {
        const targetDate = new Date(targetDateTime);
        const currentDate = new Date();
        const difference = targetDate - currentDate;

        if (difference <= 0) {
            return `00${" "}:${" "}00${" "}:${" "}00`;
        }

        const hours = Math.floor(
            (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
            (difference % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        return `${formatTwoDigits(hours)}${" "}:${" "}${formatTwoDigits(
            minutes
        )}${" "}:${" "}${formatTwoDigits(seconds)}`;
    }

    function formatTwoDigits(value) {
        return value < 10 ? `0${value}` : value;
    }

    useEffect(() => {
        const timerInterval = setInterval(() => {
            setTimeRemaining(calculateTimeRemaining());
        }, 1000);

        return () => clearInterval(timerInterval);
    }, [targetDateTime]);

    return (
        // <div className="flex items-center">
            <p className="text-[2.3vw] md:text-[0.8vw] font-semibold font-work-sans">{timeRemaining}</p>
        // </div>
    );
};

export default CountdownTimer;
