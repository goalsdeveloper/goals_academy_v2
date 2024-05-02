import GoalsPopup from "@/Components/elements/GoalsPopup";
import StarRating from "./StarRating";
import GoalsButton from "@/Components/elements/GoalsButton";

const UlasanProgram = ({ show, setShow, data, setData, handleSubmit }) => {
    function checkFieldRequired() {
        if (
            data.rate_product == 0 ||
            data.note_product == "" ||
            data.note_product == null ||
            data.note_product == undefined
        ) {
            return true;
        }

        return false;
    }

    return (
        <GoalsPopup show={show} setShow={setShow} className="md:max-w-[23.5vw]">
            <div className="flex flex-col items-center gap-[4vw] md:gap-[2vw]">
                <h3 className="h4 font-semibold">Beri Ulasan Program</h3>

                <p className="text-[3.7vw] md:text-[1vw] text-black text-center">
                    Bagaimana perasaan kamu setelah <br />
                    melakukan bimbingan?
                </p>

                <div className="grid space-y-[4vw] md:space-y-[.8vw] w-full">
                    <StarRating
                        totalStars={5}
                        rating={data.rate_product}
                        setRating={(x) => setData({ ...data, rate_product: x })}
                    />
                    <textarea
                        className="h-[37vw] md:h-[8.3vw] px-[4vw] py-[2.5vw] md:px-[.8vw] md:py-[.5vw]  rounded-md border border-neutral-50 focus:outline-0 text-dark text-[4.6vw] md:text-[1vw]"
                        placeholder="Ketik ulasan kamu disini"
                        style={{ resize: "none" }}
                        value={data.note_product}
                        onChange={(e) =>
                            setData("note_product", e.target.value)
                        }
                    />
                    <GoalsButton
                        disabled={checkFieldRequired()}
                        onClick={() => {
                            handleSubmit();
                            setShow();
                        }}
                        className="w-full"
                    >
                        Simpan
                    </GoalsButton>
                </div>
            </div>
        </GoalsPopup>
    );
};

export default UlasanProgram;
