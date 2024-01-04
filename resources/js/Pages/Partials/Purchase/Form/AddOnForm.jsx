import ButtonPill from "@/Components/ButtonPill";

export default function AddOnForm({
    show,
    setShow,
    data,
    setData,
    temp,
    setTemp,
    availableAddOn,
}) {
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
                            Pilih Add-On
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
                <div className="grid gap-[3vw] md:gap-[1vw]">
                    {availableAddOn.map((item, index) => {
                        return (
                            <AddOnOption
                                key={index}
                                item={item}
                                checked={
                                    temp.add_on.filter((i) => i.id == item.id)
                                        .length
                                }
                                onClick={() => {
                                    if (
                                        temp.add_on.filter(
                                            (i) => i.id == item.id
                                        ).length
                                    ) {
                                        setTemp(
                                            "add_on",
                                            temp.add_on.filter(
                                                (i) => i.id != item.id
                                            )
                                        );
                                    } else {
                                        const tempAddOn = temp.add_on.slice();
                                        tempAddOn.push(item);
                                        setTemp("add_on", tempAddOn);
                                    }
                                }}
                            />
                        );
                    })}
                </div>
                <div className="flex justify-center md:justify-end mt-[1vw]">
                    <ButtonPill
                        className="w-6/12 md:w-3/12"
                        isActive={
                            !(
                                data.add_on.length == 0 &&
                                temp.add_on.length == 0
                            ) &&
                            !(
                                data.add_on.every(
                                    (i) =>
                                        temp.add_on.filter((j) => j.id == i.id)
                                            .length
                                ) &&
                                temp.add_on.every(
                                    (i) =>
                                        data.add_on.filter((j) => j.id == i.id)
                                            .length
                                )
                            )
                        }
                        onClick={(e) => {
                            if (
                                !(
                                    data.add_on.length == 0 &&
                                    temp.add_on.length == 0
                                ) &&
                                !(
                                    data.add_on.every(
                                        (i) =>
                                            temp.add_on.filter(
                                                (j) => j.id == i.id
                                            ).length
                                    ) &&
                                    temp.add_on.every(
                                        (i) =>
                                            data.add_on.filter(
                                                (j) => j.id == i.id
                                            ).length
                                    )
                                )
                            ) {
                                let addOnPrice = 0
                                if (temp.add_on.length) {
                                    addOnPrice = temp.add_on
                                        .map((i) => parseInt(i.price))
                                        .reduce((total, i) => parseInt(total) + parseInt(i))
                                } else {
                                    addOnPrice = 0
                                }
                                let adminFee = 0
                                if (temp.purchase_method != "") {
                                    if (data.purchase_method.is_price) {
                                        adminFee = parseInt(data.purchase_method.admin_fee)
                                    } else {
                                        adminFee = Math.ceil((parseInt(data.init_price) - parseInt(data.discount) + addOnPrice) * parseInt(data.purchase_method.admin_fee) / 100)
                                    }
                                }
                                const totalPrice = parseInt(data.init_price) - parseInt(data.discount) + addOnPrice + adminFee
                                setData({
                                    ...data,
                                    add_on: temp.add_on,
                                    add_on_price: addOnPrice,
                                    admin: adminFee,
                                    total_price: totalPrice
                                });
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

function AddOnOption({ item, onClick, checked = false }) {
    const currency = Intl.NumberFormat("id-ID");
    return (
        <div
            onClick={onClick}
            className="flex items-center px-[3vw] md:px-[1vw] shadow-centered md:rounded-[.2vw] h-[9vw] md:h-[3vw] cursor-pointer"
        >
            <div className="w-[90%] flex items-center justify-between font-medium md:text-[.95vw]">
                <span>{item.name}</span>
                <span>IDR {currency.format(item.price)}</span>
            </div>
            <div className="w-[10%] flex items-center justify-end">
                <i
                    className={`fa-solid fa-square-check text-[6vw] md:text-[2vw] ${
                        checked ? "text-secondary" : "text-light-grey"
                    }`}
                ></i>
            </div>
        </div>
    );
}
