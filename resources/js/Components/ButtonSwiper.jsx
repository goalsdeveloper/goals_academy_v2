import ButtonHoverSlide from "./ButtonHoverSlide";

export default function ButtonSwiper ({name, direction}) {
    return (
        <button className={name}>
            <ButtonHoverSlide className="flex justify-center text-secondary before:-z-10 hover:text-white border-2 border-secondary hover:border-primary my-auto py-2 px-4 md:px-3 xl:px-3 rounded-lg before:w-[500%] before:-ms-[500%] before:duration-300 hover:before:-ms-[200%] before:bg-sweep-primary">
                <i className={`fa ${direction == 'left' ? 'fa-chevron-left' : 'fa-chevron-right'} text-inherit text-20 md:text-14 xl:text-20`}></i>
            </ButtonHoverSlide>
        </button>
    )
}
