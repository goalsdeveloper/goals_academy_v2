const DateTimeComp = ({ date, time }) => {
    if (date == null && time == null) return "-";
    return (
        <div className="flex items-center justify-between w-full gap-2">
            <p>{new Date(date).toLocaleDateString("id-ID")}</p>
            {/* {time} */}
            <p>{time ?? "-"}</p>
        </div>
    );
};

export default DateTimeComp;
