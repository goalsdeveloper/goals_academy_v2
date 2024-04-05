export const datepickerStyle = {
    slotProps: {
        toolbar: { hidden: true },
        actionBar: {
            sx: { display: "none" },
        },
        switchViewButton: {
            sx: { display: "none" },
        },
        nextIconButton: {
            sx: { fontSize: "1.75vw" },
        },
        previousIconButton: {
            sx: { fontSize: "1.75vw" },
        },
        calendarHeader: {
            sx: {
                fontSize: "1vw",
                height: "5vw",
                maxHeight: "unset",
                margin: 0,
                padding: "0 0 1vw 1.25vw",
            },
        },
    },
    sx: {
        fontSize: "fontSize.1",
        minWidth: "unset",
        width: "100%",
        height: "24vw",
        padding: "0 1vw 0",
        maxHeight: "unset",
        "& .MuiDateCalendar-root": {
            width: "100%",
            height: "fit-content",
            maxHeight: "unset",
        },
        "& .MuiPickersLayout-contentWrapper": {
            width: "100%",
            height: "100%",
        },
        "& .MuiDayCalendar-monthContainer": {
            width: "100%",
            height: "fit-content",
            position: "relative",
        },
        "& .MuiPickersSlideTransition-root": {
            width: "100%",
            height: "fit-content",
            minHeight: "unset",
        },
        "& .MuiDayCalendar-weekDayLabel": {
            width: "2.5vw",
            height: "2.5vw",
        },
        "& .MuiPickersDay-root": {
            width: "2.5vw",
            height: "2.5vw",
        },
        "& .MuiPickersDay-root.Mui-selected": {
            backgroundColor: "#FF8854",
        },
        "& .MuiPickersDay-root.Mui-selected:hover": {
            backgroundColor: "#FF6420",
        },
        "& .MuiPickersYear-yearButton.Mui-selected": {
            backgroundColor: "#FF8854",
        },
        ".css-sc0lva-MuiButtonBase-root-MuiPickersDay-root.Mui-disabled:not(.Mui-selected)":
            {
                color: "#DDDDDD",
            },
    },
};

export const mobileDatepickerStyle = {
    slotProps: {
        toolbar: { hidden: true },
        actionBar: {
            sx: { display: "none" },
        },
        switchViewButton: {
            sx: { display: "none" },
        },
        nextIconButton: {
            sx: { fontSize: "7vw" },
        },
        previousIconButton: {
            sx: { fontSize: "7vw" },
        },
        calendarHeader: {
            sx: {
                fontSize: "4vw",
                height: "16vw",
                maxHeight: "unset",
                margin: 0,
                padding: "0 0 0 4vw",
            },
        },
    },
    sx: {
        fontSize: "fontSize.4",
        minWidth: "unset",
        width: "100%",
        height: "85vw",
        padding: "0 3vw 0",
        maxHeight: "unset",
        "& .MuiDateCalendar-root": {
            width: "100%",
            height: "fit-content",
            maxHeight: "unset",
        },
        "& .MuiPickersLayout-contentWrapper": {
            width: "100%",
            height: "100%",
        },
        "& .MuiDayCalendar-monthContainer": {
            width: "100%",
            height: "fit-content",
            position: "relative",
        },
        "& .MuiPickersSlideTransition-root": {
            width: "100%",
            height: "fit-content",
            minHeight: "unset",
        },
        "& .MuiDayCalendar-weekDayLabel": {
            width: "10vw",
            height: "10vw",
        },
        "& .MuiPickersDay-root": {
            width: "10vw",
            height: "10vw",
        },
        "& .MuiPickersDay-root.Mui-selected": {
            backgroundColor: "#FF8854",
        },
        "& .MuiPickersDay-root.Mui-selected:hover": {
            backgroundColor: "#FF6420",
        },
        "& .MuiPickersYear-yearButton.Mui-selected": {
            backgroundColor: "#FF8854",
        },
        ".css-sc0lva-MuiButtonBase-root-MuiPickersDay-root.Mui-disabled:not(.Mui-selected)":
            {
                color: "#DDDDDD",
            },
    },
};
