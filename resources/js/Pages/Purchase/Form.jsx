import { useEffect, useState } from "react";
import moment from "moment";
import MainLayout from "@/Layouts/MainLayout";
import ButtonPill from "@/Components/ButtonPill";
import ExpandedButton from "@/Components/ExpandedButton";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers";
import { TECollapse } from "tw-elements-react";
import TECollapseItem from "@/Components/TECollapseItem";
import { useForm } from "@inertiajs/react";

export default function Form({ auth, date, dataProduct }) {
    const { data, setData, post } = useForm({
        schedule: "",
        place: "",
        document: "",
        note: "",
        init_price: 47000,
        promo: "",
        discount: 0,
        purchase_method: "",
        admin: 0,
    });

    const totalPrice = data.init_price - data.discount + data.admin;
    const availablePromos = [
        { code: "123456", percentage: 10 },
        { code: "654321", percentage: 15 },
    ];
    const unavailableDate = ["2023-10-20", "2023-10-22"];
    const availablePlaces = ["Kafe 1", "Kafe 2", "Kafe 3", "Kafe 4", "Kafe 5"];
    const purchaseMethods = [
        { name: "Gopay", admin: 2, payment_method: "ewallet" },
        { name: "QRIS", admin: 0.7, payment_method: "ewallet" },
        { name: "BNI", admin: 4000, payment_method: "bank_transfer" },
        { name: "Mandiri", admin: 4000, payment_method: "bank_transfer" },
        { name: "BRI", admin: 4000, payment_method: "bank_transfer" },
        { name: "Permata", admin: 4000, payment_method: "bank_transfer" },
    ];

    const submit = (e) => {
        e.preventDefault();
        post("/purchase");
    };

    const checkPromo = (inputCode) => {
        return availablePromos.find((item) => item.code == inputCode);
    };

    return (
        <MainLayout auth={auth} title="Purchase">
            <section
                id="purchase-form"
                className="mb-16 xs:mb-20 md:mb-16 lg:mb-20 xl:mb-24 3xl:mb-32"
            >
                <div className="container mx-auto pt-6 flex justify-between">
                    <MainCard
                        data={data}
                        setData={setData}
                        unavailableDate={unavailableDate}
                        availablePlaces={availablePlaces}
                    />
                    <SummaryCard
                        data={data}
                        setData={setData}
                        purchaseMethods={purchaseMethods}
                        totalPrice={totalPrice}
                        checkPromo={checkPromo}
                        submit={submit}
                    />
                </div>
            </section>
        </MainLayout>
    );
}

function MainCard({ data, setData, unavailableDate, availablePlaces }) {
    const [showScheduleForm, setShowScheduleForm] = useState(false);
    const [showNoteForm, setShowNoteForm] = useState(false);
    return (
        <div className="w-[70%] relative shadow-centered-spread rounded-2xl p-6 flex flex-col gap-4 h-fit">
            <p>Bimbingan Skripsi</p>
            <hr className="border-black" />
            <h3 className="text-secondary">Dibimbing Offline 60 Menit</h3>
            <p>
                Capai kesuksesan skripsimu melalui bimbingan personal secara
                1-on-1, sesuai dengan permasalahan pada skripsimu.
            </p>
            <div className="flex flex-col gap-2 md:gap-1 lg:gap-2 3xl:gap-3">
                <p>Layanan :</p>
                <div className="flex items-center gap-2">
                    <i className="fa-regular fa-calendar text-primary"></i>
                    <p>1x Pertemuan</p>
                </div>
                <div className="flex items-center gap-2">
                    <i className="fa-solid fa-clock text-12 md:text-6 lg:text-10 xl:text-12 3xl:text-18 text-primary"></i>
                    <p>60 Menit</p>
                </div>
                <div className="flex items-center gap-2">
                    <i className="fa-solid fa-location-dot text-primary"></i>
                    <p>Offline</p>
                </div>
            </div>
            <div>
                <ExpandedButton
                    className="rounded-md hover:border-secondary hover:outline-secondary hover:bg-secondary hover:text-white text-dark h-8"
                    borderClassName={`border-1 outline outline-1 ${
                        data.schedule != ""
                            ? "border-secondary outline-secondary"
                            : "outline-light-grey"
                    }`}
                    onClick={() => setShowScheduleForm(true)}
                >
                    <i className="fa-regular fa-calendar"></i>&nbsp;&nbsp;Pilih
                    Jadwal Bimbingan
                </ExpandedButton>
                <ScheduleForm
                    show={showScheduleForm}
                    setShow={setShowScheduleForm}
                    data={data}
                    setData={setData}
                    unavailableDate={unavailableDate}
                    availablePlaces={availablePlaces}
                />
            </div>
            <div className="flex flex-col">
                <label htmlFor="file" className="font-medium">
                    <p className="mb-2">Berkas Pendukung (opsional)</p>
                    <div
                        className={`w-full border-1 outline outline-1 rounded-md flex items-center cursor-pointer overflow-hidden ${
                            data.document != 0
                                ? "border-secondary outline-secondary"
                                : "border-light-grey outline-none"
                        }`}
                    >
                        <div
                            className={`w-3/12 bg-slate-200 text-center p-2 ${
                                data.document != 0
                                    ? "border-e-2 border-secondary"
                                    : "border-e-1 border-light-grey outline-none"
                            }`}
                        >
                            Pilih File
                        </div>
                        <div className="p-2 px-3">
                            {data.document != 0
                                ? data.document.name
                                : "Belum ada file yang dipilih"}
                        </div>
                    </div>
                </label>
                <input
                    type="file"
                    name="file"
                    id="file"
                    accept=".doc, .docx, .pdf"
                    className="hidden"
                    onChange={(e) => {
                        setData("document", e.target.files[0]);
                    }}
                />
                <p className="font-medium text-xs text-light-grey mt-2">
                    PDF, DOCS
                </p>
            </div>
            <div>
                <ExpandedButton
                    className="rounded-md hover:border-secondary hover:outline-secondary hover:bg-secondary hover:text-white text-dark h-8"
                    borderClassName={`border-1 outline outline-1 ${
                        data.note != ""
                            ? "border-secondary outline-secondary"
                            : "outline-light-grey"
                    }`}
                    onClick={() => setShowNoteForm(true)}
                >
                    <i className="bi bi-pen"></i>&nbsp;&nbsp;Catatan untuk Tutor
                </ExpandedButton>
                <NoteForm
                    show={showNoteForm}
                    setShow={setShowNoteForm}
                    data={data}
                    setData={setData}
                />
            </div>
        </div>
    );
}

function SummaryCard({
    data,
    setData,
    purchaseMethods,
    checkPromo,
    totalPrice,
    submit,
}) {
    const [showPromoForm, setShowPromoForm] = useState(false);
    const [showPurchaseMethodForm, setShowPurchaseMethodForm] = useState(false);
    const currency = Intl.NumberFormat("id-ID");
    return (
        <div className="w-[30%] ms-[3vw] flex flex-col gap-8">
            <div
                className={`relative shadow-centered-spread rounded-2xl p-6 text-xs h-fit ${
                    data.schedule ? "" : "hidden"
                }`}
            >
                <h5 className="font-sans font-bold text-secondary mb-4">
                    Jadwal Bimbingan
                </h5>
                <hr className="border-black" />
                <table className="w-full font-poppins border-separate border-spacing-y-3 my-1">
                    <tbody>
                        <tr>
                            <td>Tanggal</td>
                            <td className="font-bold text-right">
                                {data.schedule != "" ? data.schedule : "-"}
                            </td>
                        </tr>
                    </tbody>
                </table>
                <hr className="border-black" />
                <table
                    className={`w-full font-poppins border-separate border-spacing-y-3 my-1 ${
                        data.place != "" ? "" : "hidden"
                    }`}
                >
                    <tbody>
                        <tr>
                            <td>Lokasi</td>
                            <td className="font-bold text-right">
                                {data.place != "" ? data.place : "-"}
                            </td>
                        </tr>
                    </tbody>
                </table>
                <hr
                    className={`border-black ${
                        data.place != "" ? "" : "hidden"
                    }`}
                />
            </div>
            <div
                className={`relative shadow-centered-spread rounded-2xl p-6 text-xs h-fit ${
                    data.document ? "" : "hidden"
                }`}
            >
                <h5 className="font-sans font-bold text-secondary mb-4">
                    Berkas Pendukung
                </h5>
                <hr className="border-black" />
                <table className="w-full font-poppins border-separate border-spacing-y-3 my-1">
                    <tbody>
                        <tr>
                            <td>Nama Berkas</td>
                            <td className="font-bold text-right">
                                {data.document != "" ? data.document.name : "-"}
                            </td>
                        </tr>
                    </tbody>
                </table>
                <hr className="border-black" />
                <table className="w-full font-poppins border-separate border-spacing-y-3 my-1">
                    <tbody>
                        <tr>
                            <td>Ukuran Berkas</td>
                            <td className="font-bold text-right">
                                {data.document != ""
                                    ? `${Math.ceil(
                                          data.document.size / 1024
                                      )} KB`
                                    : "-"}
                            </td>
                        </tr>
                    </tbody>
                </table>
                <hr className="border-black" />
            </div>
            <div className="relative shadow-centered-spread rounded-2xl p-6 text-xs h-fit">
                <h5 className="font-sans font-bold text-secondary mb-4">
                    Total Pesanan
                </h5>
                <hr className="border-black" />
                <table className="w-full font-poppins border-separate border-spacing-y-3 my-1">
                    <tbody>
                        <tr>
                            <td>Dibimbing Sekali</td>
                            <td className="font-bold text-right">
                                {currency.format(data.init_price) > 0
                                    ? `IDR ${currency.format(data.init_price)}`
                                    : "-"}
                            </td>
                        </tr>
                        <tr>
                            <td>Promo</td>
                            <td className="font-bold text-right">
                                {currency.format(data.discount) > 0
                                    ? `IDR ${currency.format(data.discount)}`
                                    : "-"}
                            </td>
                        </tr>
                        <tr>
                            <td>Biaya Admin</td>
                            <td className="font-bold text-right">
                                {currency.format(data.admin) > 0
                                    ? `IDR ${currency.format(data.admin)}`
                                    : "-"}
                            </td>
                        </tr>
                    </tbody>
                </table>
                <hr className="border-black" />
                <div className="text-center font-poppins my-4">
                    <p className="font-bold mb-2">Total Pembelian</p>
                    <h2 className="text-secondary">
                        IDR {currency.format(totalPrice)}
                    </h2>
                </div>
                <div className="grid gap-4">
                    <ExpandedButton
                        className="rounded-md hover:border-secondary hover:outline-secondary hover:bg-secondary hover:text-white text-dark h-8"
                        borderClassName={`border-1 outline outline-1 ${
                            data.discount > 0
                                ? "border-secondary outline-secondary"
                                : "outline-light-grey"
                        }`}
                        onClick={() => setShowPromoForm(!showPromoForm)}
                    >
                        {data.discount > 0 ? "Promo Dipakai" : "Pakai Promo"}
                    </ExpandedButton>
                    <ExpandedButton
                        className="rounded-md hover:border-secondary hover:outline-secondary hover:bg-secondary hover:text-white text-dark h-8"
                        borderClassName={`border-1 outline outline-1 ${
                            data.purchase_method != ""
                                ? "border-secondary outline-secondary"
                                : "outline-light-grey"
                        }`}
                        onClick={() =>
                            setShowPurchaseMethodForm(!showPurchaseMethodForm)
                        }
                    >
                        {data.purchase_method != "" ? (
                            <div className="flex items-center gap-2">
                                <img
                                    src={`/img/purchase/${data.purchase_method.toLowerCase()}.png`}
                                    alt={data.purchase_method}
                                    className="w-6"
                                />
                                {data.purchase_method}
                            </div>
                        ) : (
                            "Pilih Metode Pembayaran"
                        )}
                    </ExpandedButton>
                </div>
                <div>
                    <PromoForm
                        show={showPromoForm}
                        setShow={setShowPromoForm}
                        data={data}
                        setData={setData}
                        checkPromo={checkPromo}
                    />
                    <PurchaseMethodForm
                        show={showPurchaseMethodForm}
                        setShow={setShowPurchaseMethodForm}
                        data={data}
                        setData={setData}
                        purchaseMethods={purchaseMethods}
                    />
                </div>
                <ButtonPill
                    className="w-full mt-4"
                    isActive={
                        ![
                            data.schedule,
                            data.place,
                            data.purchase_method,
                        ].includes("")
                    }
                    onClick={submit}
                >
                    Bayar Sekarang
                </ButtonPill>
            </div>
        </div>
    );
}

function PromoForm({ show, setShow, data, setData, checkPromo }) {
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
                        ? "top-0 bottom-0 scale-100"
                        : "top-full -bottom-full scale-0"
                } fixed left-0 flex flex-col gap-4 w-[30vw] h-fit transition-all duration-500 bg-white shadow-md rounded-xl p-6 z-50 ms-[35vw] mt-[8vw]`}
            >
                <div>
                    <div className="flex justify-between items-center mb-4">
                        <h5 className="text-secondary font-poppins font-bold">
                            Pilih Promo
                        </h5>
                        <i
                            role="button"
                            className="fa-solid fa-times text-20"
                            onClick={() => setShow(false)}
                        ></i>
                    </div>
                    <hr className="border-light-grey" />
                </div>
                <form
                    onSubmit={() => {
                        if (data.promo != "") {
                            const promoInfo = checkPromo(data.promo);
                            if (!promoInfo) {
                                setData({ ...data, promo: "", discount: 0 });
                                alert("Promo tidak tersedia!");
                            } else {
                                setData(
                                    "discount",
                                    (data.init_price * promoInfo.percentage) /
                                        100
                                );
                                alert("Promo berhasil dipakai!");
                                setShow(false);
                            }
                        }
                    }}
                >
                    <input
                        className="w-full flex justify-between items-center py-2 px-3 shadow-centered-spread rounded-sm border-2 focus:outline-0 text-dark h-10"
                        value={data.promo}
                        onChange={(e) => setData("promo", e.target.value)}
                        placeholder="Masukkan kode promo disini"
                    ></input>
                </form>
                <div className="flex justify-end mt-3">
                    <ButtonPill
                        className="w-3/12"
                        isActive={data.promo != ""}
                        onClick={() => {
                            if (data.promo != "") {
                                const promoInfo = checkPromo(data.promo);
                                if (!promoInfo) {
                                    setData({
                                        ...data,
                                        promo: "",
                                        discount: 0,
                                    });
                                    alert("Promo tidak tersedia!");
                                } else {
                                    setData(
                                        "discount",
                                        (data.init_price *
                                            promoInfo.percentage) /
                                            100
                                    );
                                    alert("Promo berhasil dipakai!");
                                    setShow(false);
                                }
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

function PurchaseMethodForm({ show, setShow, data, setData, purchaseMethods }) {
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
                        ? "top-0 bottom-0 scale-100"
                        : "top-full -bottom-full scale-0"
                } fixed left-0 flex flex-col gap-4 w-[30vw] h-fit transition-all duration-500 bg-white shadow-md rounded-xl p-6 z-50 ms-[35vw] mt-[8vw]`}
            >
                <div>
                    <div className="flex justify-between items-center mb-4">
                        <h5 className="text-secondary font-poppins font-bold">
                            Pilih Metode Pembayaran
                        </h5>
                        <i
                            role="button"
                            className="fa-solid fa-times text-20"
                            onClick={() => setShow(false)}
                        ></i>
                    </div>
                    <hr className="border-light-grey" />
                </div>
                <div>
                    <h6 className="font-medium mb-4">Dompet Digital</h6>
                    <div className="grid gap-2">
                        {purchaseMethods.map((item, i) => {
                            if (item.payment_method == "ewallet") {
                                return (
                                    <ExpandedButton
                                        key={i}
                                        className="spread rounded-sm border-2 hover:border-secondary hover:bg-secondary hover:text-white text-dark h-10"
                                        borderClassName="border-0"
                                        onClick={() => {
                                            setData({
                                                ...data,
                                                admin:
                                                    (item.admin *
                                                        data.init_price) /
                                                    100,
                                                purchase_method: item.name,
                                            });
                                        }}
                                    >
                                        <div className="flex items-center gap-2">
                                            <img
                                                src={`/img/purchase/${item.name.toLowerCase()}.png`}
                                                alt={item.name}
                                                className="w-6"
                                            />
                                            {item.name}
                                        </div>
                                    </ExpandedButton>
                                );
                            }
                        })}
                    </div>
                </div>
                <div>
                    <h6 className="font-medium mb-4">Bank</h6>
                    <div className="grid gap-2">
                        {purchaseMethods.map((item, i) => {
                            if (item.payment_method == "bank_transfer") {
                                return (
                                    <ExpandedButton
                                        key={i}
                                        className="spread rounded-sm border-2 hover:border-secondary hover:bg-secondary hover:text-white text-dark h-10"
                                        borderClassName="border-0"
                                        onClick={() => {
                                            setData({
                                                ...data,
                                                admin: item.admin,
                                                purchase_method: item.name,
                                            });
                                        }}
                                    >
                                        <div className="flex items-center gap-2">
                                            <img
                                                src={`/img/purchase/${item.name.toLowerCase()}.png`}
                                                alt={item.name}
                                                className="w-6"
                                            />
                                            {item.name}
                                        </div>
                                    </ExpandedButton>
                                );
                            }
                        })}
                    </div>
                </div>
                <div className="flex justify-end mt-3">
                    <ButtonPill
                        className="w-3/12"
                        isActive={data.purchase_method != ""}
                        onClick={(e) => {
                            if (data.purchase_method != "") {
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

function ScheduleForm({
    show,
    setShow,
    data,
    setData,
    unavailableDate,
    availablePlaces,
}) {
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showPlaceOptions, setShowPlaceOptions] = useState(false);
    return (
        <>
            <div
                className={`${
                    show ? "" : "hidden"
                } fixed top-0 bottom-0 left-0 right-0 overflow-hidden bg-dark bg-opacity-50 transition-all duration-300 z-50`}
                onClick={() =>
                    showDatePicker ? setShowDatePicker(false) : setShow(false)
                }
            ></div>
            <div
                className={`${
                    show
                        ? "top-0 bottom-0 scale-100"
                        : "top-full -bottom-full scale-0"
                } fixed left-0 flex flex-col gap-4 w-[30vw] h-fit transition-all duration-500 bg-white shadow-md rounded-xl p-6 z-50 ms-[35vw] mt-[8vw]`}
            >
                <div
                    className={`${
                        showDatePicker ? "" : "hidden"
                    } absolute top-0 left-0 right-0 bottom-0 bg-dark bg-opacity-25 rounded-xl`}
                    onClick={() => setShowDatePicker(false)}
                ></div>
                <div>
                    <div className="flex justify-between items-center mb-4">
                        <h5 className="text-secondary font-poppins font-bold">
                            Pilih Jadwal Bimbingan
                        </h5>
                        <i
                            role="button"
                            className={"fa-solid fa-times text-20"}
                            onClick={() => setShow(false)}
                        ></i>
                    </div>
                    <hr className="border-light-grey" />
                </div>
                <div>
                    <p className="font-medium mb-3">
                        Pilih Tanggal Bimbingan :
                    </p>
                    <div className="relative w-full">
                        <ExpandedButton
                            className="shadow-centered-spread rounded-sm"
                            borderClassName={
                                data.schedule != ""
                                    ? "border-2 border-secondary"
                                    : "border-0"
                            }
                            textClassName={`font-medium ${
                                data.schedule != ""
                                    ? "text-dark"
                                    : "text-gray-400"
                            }`}
                            onClick={() => setShowDatePicker(!showDatePicker)}
                        >
                            {data.schedule != ""
                                ? data.schedule
                                : "Pilih Tanggal"}
                        </ExpandedButton>
                        <div
                            className={`absolute top-0 left-0 right-0 rounded-md shadow-centered-spread w-full transition-all duration-500 overflow-hidden ${
                                showDatePicker
                                    ? "scale-100"
                                    : "scale-0 -translate-y-[50%] -translate-x-[50%]"
                            }`}
                        >
                            <LocalizationProvider
                                dateAdapter={AdapterMoment}
                                dateLibInstance={moment}
                            >
                                <StaticDatePicker
                                    slotProps={{
                                        toolbar: { hidden: true },
                                        actionBar: { sx: { display: "none" } },
                                    }}
                                    minDate={moment()}
                                    maxDate={moment().add("6", "day")}
                                    shouldDisableDate={(date) => {
                                        return unavailableDate.includes(
                                            date.format("YYYY-MM-DD")
                                        );
                                    }}
                                    onChange={(date) => {
                                        setData(
                                            "schedule",
                                            date.format("YYYY-MM-DD")
                                        );
                                        setShowDatePicker(false);
                                    }}
                                ></StaticDatePicker>
                            </LocalizationProvider>
                        </div>
                    </div>
                </div>
                <div>
                    <p className="font-medium mb-3">Pilih Lokasi Bimbingan :</p>
                    <ExpandedButton
                        className="shadow-centered-spread rounded-sm"
                        borderClassName={
                            data.place != ""
                                ? "border-2 border-secondary"
                                : "border-0"
                        }
                        textClassName={`font-medium ${
                            data.place != "" ? "text-dark" : "text-gray-400"
                        }`}
                        icon={`fa-solid fa-chevron-down duration-500 ${
                            showPlaceOptions ? "-rotate-180" : ""
                        }`}
                        onClick={() => setShowPlaceOptions(!showPlaceOptions)}
                    >
                        {data.place != "" ? data.place : "Pilih Tempat"}
                    </ExpandedButton>
                    <TECollapse
                        show={showPlaceOptions}
                        className="w-[110%] -ms-[5%] px-[4%] shadow-none"
                    >
                        <TECollapseItem className="grid gap-4 p-1 pe-3 h-[10vw] overflow-y-scroll">
                            {availablePlaces.map((item, i) => {
                                return (
                                    <div
                                        key={i}
                                        className="w-full flex justify-between items-center py-2 px-3 font-medium shadow-centered-spread rounded-sm border-2 hover:border-secondary hover:bg-secondary hover:text-white text-gray-400 cursor-pointer"
                                        onClick={() => {
                                            setData("place", item);
                                            setShowPlaceOptions(false);
                                        }}
                                    >
                                        {item}
                                    </div>
                                );
                            })}
                        </TECollapseItem>
                    </TECollapse>
                </div>
                <div className="flex justify-end mt-3">
                    <ButtonPill
                        className="w-3/12"
                        isActive={data.schedule != "" && data.place != ""}
                        onClick={(e) => {
                            if (data.schedule != "" && data.place != "") {
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

function NoteForm({ show, setShow, data, setData }) {
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
                        ? "top-0 bottom-0 scale-100"
                        : "top-full -bottom-full scale-0"
                } fixed left-0 flex flex-col gap-4 w-[30vw] h-fit transition-all duration-500 bg-white shadow-md rounded-xl p-6 z-50 ms-[35vw] mt-[8vw]`}
            >
                <div>
                    <div className="flex justify-between items-center mb-4">
                        <h5 className="text-secondary font-poppins font-bold">
                            Catatan untuk Tutor{" "}
                        </h5>
                        <i
                            role="button"
                            className={"fa-solid fa-times text-20"}
                            onClick={() => setShow(false)}
                        ></i>
                    </div>
                    <hr className="border-light-grey" />
                </div>
                <div>
                    <textarea
                        className="w-full shadow-centered-spread rounded-sm focus:outline-none p-4"
                        rows="10"
                        draggable={false}
                        placeholder="Isi catatan disini..."
                        onChange={(e) => setData("note", e.target.value)}
                    ></textarea>
                </div>
                <div className="flex justify-end mt-3">
                    <ButtonPill
                        className="w-3/12"
                        isActive={data.note != ""}
                        onClick={(e) => {
                            if (data.note != "") {
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
