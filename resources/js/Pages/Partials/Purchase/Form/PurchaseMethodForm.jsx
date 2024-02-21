import GoalsRadio from "@/Components/Form/GoalsRadio";
import ButtonPill from "@/Components/ButtonPill";

export default function PurchaseMethodForm({
    show,
    setShow,
    data,
    setData,
    temp,
    setTemp,
    purchaseMethods,
}) {
    const clickHandler = (item) => {
        let adminFee = 0
        if (parseInt(item.is_price)) {
            adminFee = parseFloat(item.admin_fee)
        } else {
            adminFee = Math.ceil((parseFloat(data.init_price) - parseFloat(data.discount) + parseFloat(data.add_on_price)) * parseFloat(item.admin_fee) / 100)
        }
        const totalPrice = parseFloat(data.init_price) - parseFloat(data.discount) + parseFloat(data.add_on_price) + adminFee
        setData({
            ...data,
            purchase_method: item,
            admin: adminFee,
            total_price: totalPrice
        });
        setShow(false);
    }

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
                } fixed left-0 flex flex-col gap-[4vw] md:gap-[1vw] w-full md:w-[30vw] h-[50vh] md:h-fit transition-all duration-500 bg-white shadow-md rounded-t-[6vw] md:rounded-[.5vw] p-[8vw] md:px-[1.75vw] md:py-[2vw] z-50 md:ms-[35vw] md:mt-[8vh] max-h-[84vh]`}
            >
                <div>
                    <div className="flex justify-between items-center mb-[3vw] md:mb-[1vw]">
                        <h5 className="text-black font-poppins font-medium text-[4.5vw] md:text-[1.2vw]">
                            Pilih Metode
                        </h5>
                        <i
                            role="button"
                            className="fa-solid fa-times text-[5vw] md:text-[1.5vw]"
                            onClick={() => setShow(false)}
                        ></i>
                    </div>
                </div>
                <div className="h-[40vh] md:h-fit flex flex-col gap-[3vw] md:gap-[1.5vw] overflow-auto scrollbar-hidden">
                    <div>
                        <h6 className="font-sans font-normal text-[4vw] md:text-[1vw] mb-[2vw] md:mb-[1vw]">
                            Dompet Digital
                        </h6>
                        <div className="grid gap-[3vw] md:gap-[1vw]">
                            {purchaseMethods.map((item, i) => {
                                if (item.category == "ewallet") {
                                    return (
                                        <GoalsRadio
                                            key={i}
                                            className="spread rounded-sm border-1 text-dark h-[9vw] md:h-[4vw]"
                                            checked={data.purchase_method.name == item.name}
                                            onClick={() => clickHandler(item)}
                                        >
                                            <div className="flex items-center gap-[2vw] md:gap-[1vw]">
                                                <img
                                                    src={`/img/purchase/${item.name.toLowerCase()}.png`}
                                                    alt={item.name}
                                                    className="w-[4vw] md:w-[2vw]"
                                                />
                                                {item.name}
                                            </div>
                                        </GoalsRadio>
                                    );
                                }
                            })}
                        </div>
                    </div>
                    <div>
                        <h6 className="font-sans font-normal text-[4vw] md:text-[1vw] mb-[2vw] md:mb-[1vw]">
                            Transfer Bank
                        </h6>
                        <div className="grid gap-[3vw] md:gap-[1vw]">
                            {purchaseMethods.map((item, i) => {
                                if (item.category == "bank_transfer") {
                                    return (
                                        <GoalsRadio
                                            key={i}
                                            className="spread rounded-sm border-1 text-dark h-[9vw] md:h-[4vw]"
                                            checked={data.purchase_method.name == item.name}
                                            onClick={() => clickHandler(item)}
                                        >
                                            <div className="flex items-center gap-[2vw] md:gap-[1vw]">
                                                <img
                                                    src={`/img/purchase/${item.name.toLowerCase()}.png`}
                                                    alt={item.name}
                                                    className="w-[4vw] md:w-[2vw]"
                                                />
                                                {item.name}
                                            </div>
                                        </GoalsRadio>
                                    );
                                }
                            })}
                        </div>
                    </div>
                </div>
                {/* <div className="flex justify-center md:justify-end mt-[1vw]">
                    <ButtonPill
                        className="w-6/12 md:w-3/12"
                        isActive={temp.purchase_method != ""}
                        onClick={}
                    >
                        Simpan
                    </ButtonPill>
                </div> */}
            </div>
        </>
    );
}
