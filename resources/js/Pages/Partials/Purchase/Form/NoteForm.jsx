import ButtonPill from "@/Components/ButtonPill";

export default function NoteForm({ show, setShow, data, setData, temp, setTemp }) {
    return (
        <>
            <div
                className={`${
                    show ? "" : "hidden"
                } fixed top-0 bottom-0 left-0 right-0 overflow-hidden bg-dark bg-opacity-50 transition-all duration-300 z-50`}
                onClick={() => setShow(false)}
            ></div>
            <div
                className={`${
                    show
                        ? "md:top-0 bottom-0 md:scale-100"
                        : "md:top-full -bottom-full md:scale-0"
                } fixed left-0 flex flex-col gap-[4vw] md:gap-[1vw] w-full md:w-[30vw] h-[50vh] md:h-fit transition-all duration-500 bg-white shadow-md rounded-t-[6vw] md:rounded-[1vw] p-[8vw] md:p-[1.75vw] z-50 md:ms-[35vw] md:mt-[8vh]`}
            >
                <div>
                    <div className="flex justify-between items-center mb-[3vw] md:mb-[1vw]">
                        <h5 className="text-secondary font-poppins font-bold text-[4.5vw] md:text-[1.2vw]">
                            Catatan untuk Tutor
                        </h5>
                        <i
                            role="button"
                            className={
                                "fa-solid fa-times text-[5vw] md:text-[1.5vw]"
                            }
                            onClick={() => setShow(false)}
                        ></i>
                    </div>
                    <hr className="border-light-grey" />
                </div>
                <div>
                    <textarea
                        className="w-full shadow-centered-spread rounded-md md:rounded-sm focus:outline-none p-[3vw] md:p-[1vw]"
                        rows="10"
                        draggable={false}
                        placeholder="Isi catatan disini..."
                        onChange={(e) => setTemp("note", e.target.value)}
                    ></textarea>
                </div>
                <div className="flex justify-center md:justify-end mt-[1vw]">
                    <ButtonPill
                        className="w-6/12 md:w-3/12"
                        isActive={temp.note != ""}
                        onClick={(e) => {
                            if (temp.note != "") {
                                setData("note", temp.note);
                                setShow(false);
                            }
                        }}
                    >
                        Simpan
                    </ButtonPill>
                </div>
            </div>
        </>
    );
}
