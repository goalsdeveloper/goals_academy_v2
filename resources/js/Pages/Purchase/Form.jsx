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
import { ThemeProvider, createTheme } from "@mui/material";
import "@/script/momentCustomLocale";

export default function Form({ auth, date, dataProduct, paymentMethods }) {
    // console.log(paymentMethods);
    const userId = auth.user.id;
    // console.log(dataProduct);
    // Code to input form data
    const { data, setData, post } = useForm({
        schedule: "",
        city: "",
        place: "",
        document: "",
        note: "",
        init_price: dataProduct.price,
        promo: "",
        discount: 0,
        purchase_method: "",
        admin: 0,
        product_id: dataProduct.id,
        add_on: [],
        add_on_price: 0,
        total_price: 0
    });

    // Code to input temp form data
    const { data: temp, setData: setTemp } = useForm({
        schedule: "",
        city: "",
        place: "",
        document: "",
        note: "",
        init_price: dataProduct.price,
        promo: "",
        discount: 0,
        purchase_method: "",
        admin: 0,
        product_id: dataProduct.id,
        add_on: [],
        add_on_price: 0,
    });

    // Initialize product's category
    const categoriesName = dataProduct.categories
        .map((item) => item.name)
        .join(" ")
        .toLowerCase();
    const category = categoriesName.includes("online")
        ? "online"
        : categoriesName.includes("offline")
        ? "offline"
        : categoriesName.includes("tuntas")
        ? "tuntas"
        : categoriesName.includes("review")
        ? "review"
        : "";

    // Initialize form rules
    let rules = {};

    // Initialize available availableAddOn
    let availableAddOn = dataProduct.add_ons;

    if (category == "online") {
        rules = {
            schedule: 1,
            note: 0,
            document: 0,
            add_on: 0,
        };
    } else if (category == "offline") {
        rules = {
            schedule: 1,
            city: 1,
            place: 1,
            note: 0,
            document: 0,
            add_on: 0,
        };
    } else if (category == "tuntas") {
        rules = {
            note: 0,
            document: 0,
            add_on: 0,
        };
        availableAddOn.pop();
    } else if (category == "review") {
        rules = {
            note: 1,
            document: 1,
            add_on: 0,
        };
    }

    // Code to count totalPrice
    const totalPrice =
        data.purchase_method != "" ?
            data.purchase_method.category == "ewallet" ?
                (data.init_price - data.discount + data.add_on_price) + (data.init_price - data.discount + data.add_on_price) * data.purchase_method.admin_fee / 100 :
                data.init_price - data.discount + data.purchase_method.admin_fee + data.add_on_price
        : data.init_price

    // Code to initialize unavailable dates
    const unavailableDate = date.map((i) => i.date);

    // Initialize Cities and Places option
    const cities = ["Malang", "Surabaya", "Jakarta"];
    const places = {
        Malang: ["Kafe 1", "Kafe 2", "Kafe 3", "Kafe 4", "Kafe 5"],
        Surabaya: ["Kafe 6", "Kafe 7", "Kafe 8", "Kafe 9", "Kafe 10"],
        Jakarta: ["Kafe 11", "Kafe 12", "Kafe 13", "Kafe 14", "Kafe 15"],
    };

    // Initialize purchase methods
    const purchaseMethods = paymentMethods;
    // const purchaseMethods = [
    //     { name: "Gopay", admin: 2, purchase_method: "ewallet" },
    //     { name: "QRIS", admin: 0.7, purchase_method: "ewallet" },
    //     { name: "BNI", admin: 4000, purchase_method: "bank_transfer" },
    //     { name: "Mandiri", admin: 4000, purchase_method: "bank_transfer" },
    //     { name: "BRI", admin: 4000, purchase_method: "bank_transfer" },
    //     { name: "Permata", admin: 4000, purchase_method: "bank_transfer" },
    // ];

    // Submit function
    const submit = (e) => {
        e.preventDefault();
        setData("total_price", totalPrice)
        post("/produk");
    };

    // Code to check and input promo
    const promoHandler = (inputCode, successCallback, processCallback) => {
        processCallback(true);
        fetch("/api/coupon-check", {
            method: "post",
            headers: {
                accept: "application.json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ inputCode: inputCode, userId: userId }),
        })
            .then((response) => response.json())
            .then((response) => {
                processCallback(false);
                if ("data" in response) {
                    if (response.data.is_price) {
                        setData({
                            ...data,
                            promo: temp.promo,
                            discount: response.data.value,
                        });
                    } else {
                        setData({
                            ...data,
                            promo: temp.promo,
                            discount:
                                (data.init_price * response.data.value) / 100,
                        });
                    }
                    alert(response.message);
                    successCallback();
                } else {
                    setTemp({ ...temp, promo: data.promo, discount: 0 });
                    alert(response.message);
                }
            });
    };

    return (
        <MainLayout auth={auth} title="Purchase">
            <section
                id="purchase-form"
                className="mb-[12vw] md:mb-16 lg:mb-20 xl:mb-24 3xl:mb-32"
            >
                <div className="md:container mx-auto pt-[12vw] md:pt-[1vw] flex flex-col md:flex-row justify-between text-[3.5vw] md:text-[1vw] gap-[4vw] md:gap-0">
                    <MainCard
                        dataProduct={dataProduct}
                        data={data}
                        setData={setData}
                        temp={temp}
                        setTemp={setTemp}
                        unavailableDate={unavailableDate}
                        availableAddOn={availableAddOn}
                        cities={cities}
                        places={places}
                        rules={rules}
                    />
                    <SummaryCard
                        dataProduct={dataProduct}
                        data={data}
                        setData={setData}
                        temp={temp}
                        setTemp={setTemp}
                        purchaseMethods={purchaseMethods}
                        totalPrice={totalPrice}
                        promoHandler={promoHandler}
                        submit={submit}
                        rules={rules}
                    />
                </div>
            </section>
        </MainLayout>
    );
}

function MainCard({
    dataProduct,
    data,
    setData,
    temp,
    setTemp,
    unavailableDate,
    availableAddOn,
    cities,
    places,
    rules,
}) {
    const [showScheduleForm, setShowScheduleForm] = useState(false);
    const [showNoteForm, setShowNoteForm] = useState(false);
    const [showAddOnForm, setShowAddOnForm] = useState(false);
    const features = dataProduct.features[0];
    return (
        <div className="md:w-[70%] relative md:shadow-centered-spread md:rounded-[1vw] md:p-[1.75vw] h-fit">
            <div className="flex flex-col gap-[4vw] md:gap-0">
                <div className="container md:w-full mx-auto flex flex-col gap-[4vw] md:gap-[1vw] py-[1vw] md:py-0">
                    <p className="text-secondary">Bimbingan Skripsi</p>
                    <hr className="border-secondary" />
                    <h3 className="w-8/12 md:w-full text-secondary text-[5vw] md:text-[1.5vw]">
                        {dataProduct.name}
                    </h3>
                    <p>{dataProduct.description}</p>
                    <div className="flex flex-col gap-[3vw] md:gap-[.5vw] mb-[2vw]">
                        <p>Layanan :</p>
                        <div className="flex items-center gap-[3vw] md:gap-[1vw]">
                            <i className="fa-regular fa-calendar text-primary"></i>
                            <p>{features.times}x Pertemuan</p>
                        </div>
                        <div className="flex items-center gap-[3vw] md:gap-[1vw]">
                            <i className="fa-solid fa-clock text-[3vw] md:text-[.9vw] text-primary"></i>
                            <p>{features.duration} Menit</p>
                        </div>
                        <div className="flex items-center gap-[3vw] md:gap-[1vw]">
                            <i className="fa-solid fa-location-dot text-primary"></i>
                            <p>
                                {features.category.slice(0, 1).toUpperCase() +
                                    features.category.slice(1)}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="md:hidden h-[4vw] bg-slate-100"></div>
                <div className="container md:w-full mx-auto flex flex-col gap-[4vw] md:gap-[1vw] py-[4vw] md:py-0">
                    <div className={"schedule" in rules ? "" : "hidden"}>
                        <p className="font-medium mb-[2vw] md:mb-[.5vw]">
                            Jadwal Bimbingan
                            {"schedule" in rules
                                ? rules.schedule
                                    ? ""
                                    : " (opsional)"
                                : ""}
                            :
                        </p>
                        <ExpandedButton
                            className="rounded-[1vw] md:rounded-[.4vw] hover:border-secondary hover:outline-secondary hover:bg-secondary hover:text-white h-[9vw] md:h-[2.5vw]"
                            borderClassName={`border-1 outline outline-1 ${
                                data.schedule != ""
                                    ? "border-secondary outline-secondary text-secondary"
                                    : "outline-light-grey text-light-grey"
                            }`}
                            iconClassName={`group-hover:text-white ${
                                data.schedule != "" ? "text-grey" : ""
                            }`}
                            onClick={() => setShowScheduleForm(true)}
                        >
                            <i className="fa-regular fa-calendar"></i>
                            &nbsp;&nbsp;
                            {data.schedule != ""
                                ? "Jadwal telah dipilih"
                                : "Pilih Jadwal"}
                        </ExpandedButton>
                        <ScheduleForm
                            show={showScheduleForm}
                            setShow={setShowScheduleForm}
                            data={data}
                            setData={setData}
                            temp={temp}
                            setTemp={setTemp}
                            unavailableDate={unavailableDate}
                            cities={cities}
                            places={places}
                            rules={rules}
                        />
                    </div>
                    <div className={"note" in rules ? "" : "hidden"}>
                        <p className="font-medium mb-[2vw] md:mb-[.5vw]">
                            Catatan untuk Tutor
                            {"note" in rules
                                ? rules.note
                                    ? ""
                                    : " (opsional)"
                                : ""}
                            :
                        </p>
                        <ExpandedButton
                            className="rounded-[1vw] md:rounded-[.4vw] hover:border-secondary hover:outline-secondary hover:bg-secondary hover:text-white h-[9vw] md:h-[2.5vw]"
                            borderClassName={`border-1 outline outline-1 ${
                                data.note != ""
                                    ? "border-secondary outline-secondary text-secondary"
                                    : "outline-light-grey text-light-grey"
                            }`}
                            iconClassName={`group-hover:text-white ${
                                data.note != "" ? "text-grey" : ""
                            }`}
                            onClick={() => setShowNoteForm(true)}
                        >
                            <i className="bi bi-pen"></i>&nbsp;&nbsp;
                            {data.note != ""
                                ? "Catatan telah diisi"
                                : "Isi catatan"}
                        </ExpandedButton>
                        <NoteForm
                            show={showNoteForm}
                            setShow={setShowNoteForm}
                            data={data}
                            setData={setData}
                            temp={temp}
                            setTemp={setTemp}
                        />
                    </div>
                    <div
                        className={`${
                            "document" in rules ? "" : "hidden"
                        } flex flex-col text-light-grey`}
                    >
                        <label htmlFor="file" className="font-medium">
                            <p className="mb-[2vw] md:mb-[.5vw] text-dark">
                                Berkas Pendukung
                                {"document" in rules
                                    ? rules.document
                                        ? ""
                                        : " (opsional)"
                                    : ""}
                                :
                            </p>
                            <div
                                className={`w-full border-1 outline outline-1 rounded-[1vw] md:rounded-[.4vw] flex items-center cursor-pointer overflow-hidden h-[9vw] md:h-[2.5vw] ${
                                    data.document != 0
                                        ? "border-secondary outline-secondary"
                                        : "border-light-grey outline-none"
                                }`}
                            >
                                <div
                                    className={`w-3/12 h-full bg-slate-200 flex justify-center items-center ${
                                        data.document != 0
                                            ? "border-e-2 border-secondary"
                                            : "border-e-1 border-light-grey outline-none"
                                    }`}
                                >
                                    Pilih File
                                </div>
                                <div className="w-9/12 px-[3vw] md:px-[1vw] flex justify-between items-center">
                                    <span
                                        className={
                                            data.document != 0
                                                ? "text-secondary"
                                                : ""
                                        }
                                    >
                                        {data.document != 0
                                            ? "File telah dipilih"
                                            : "Belum ada file yang dipilih"}
                                    </span>
                                    <i className="fa-solid fa-chevron-right"></i>
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
                        <p className="font-medium text-[2.5vw] md:text-[.8vw] text-light-grey mt-[2.25vw] md:mt-[.75vw]">
                            PDF, DOCS
                        </p>
                    </div>
                    <div className={"add_on" in rules ? "" : "hidden"}>
                        <p className="font-medium mb-[2vw] md:mb-[.5vw]">
                            Add-On
                            {"add_on" in rules
                                ? rules.add_on
                                    ? ""
                                    : " (opsional)"
                                : ""}
                            :
                        </p>
                        <ExpandedButton
                            className="rounded-[1vw] md:rounded-[.4vw] hover:border-secondary hover:outline-secondary hover:bg-secondary hover:text-white h-[9vw] md:h-[2.5vw]"
                            borderClassName={`border-1 outline outline-1 ${
                                data.add_on.length
                                    ? "border-secondary outline-secondary text-secondary"
                                    : "outline-light-grey text-light-grey"
                            }`}
                            iconClassName={`group-hover:text-white ${
                                data.add_on.length ? "text-grey" : ""
                            }`}
                            onClick={() => setShowAddOnForm(true)}
                        >
                            <i className="fa-solid fa-plus"></i>&nbsp;&nbsp;
                            {data.add_on.length
                                ? "Add-On telah dipilih"
                                : "Pilih Add-On"}
                        </ExpandedButton>
                        <AddOnForm
                            show={showAddOnForm}
                            setShow={setShowAddOnForm}
                            data={data}
                            setData={setData}
                            temp={temp}
                            setTemp={setTemp}
                            availableAddOn={availableAddOn}
                        />
                    </div>
                </div>
                <div className="md:hidden h-[4vw] bg-slate-100"></div>
            </div>
        </div>
    );
}

function SummaryCard({
    dataProduct,
    data,
    setData,
    temp,
    setTemp,
    purchaseMethods,
    promoHandler,
    totalPrice,
    submit,
    rules,
}) {
    const [showPromoForm, setShowPromoForm] = useState(false);
    const [showPurchaseMethodForm, setShowPurchaseMethodForm] = useState(false);
    const [showNote, setShowNote] = useState(true);
    const [showDocument, setShowDocument] = useState(true);
    const currency = Intl.NumberFormat("id-ID");
    return (
        <div className="md:w-[30%] md:ms-[3vw] flex flex-col gap-[4vw] md:gap-[2vw]">
            <div
                className={`relative md:shadow-centered-spread md:rounded-[1vw] md:p-[1.75vw] text-xs h-fit text-[3.4vw] md:text-[.9vw] ${
                    data.schedule ? "" : "hidden"
                }`}
            >
                <div className="container md:w-full mx-auto">
                    <h5 className="font-bold text-secondary mb-[1vw]">
                        Jadwal Bimbingan
                    </h5>
                    <hr className="border-secondary" />
                    <table className="w-full font-poppins border-separate border-spacing-y-3 my-1">
                        <tbody>
                            <tr>
                                <td>Tanggal</td>
                                <td className="font-bold text-right">
                                    {data.schedule != ""
                                        ? moment(data.schedule).format(
                                              "dddd, DD MMMM YYYY"
                                          )
                                        : "-"}
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
                <div className="md:hidden h-[4vw] bg-slate-100 mt-[5vw]"></div>
            </div>
            <div
                className={`relative md:shadow-centered-spread md:rounded-[1vw] md:p-[1.75vw] text-xs h-fit ${
                    data.note ? "" : "hidden"
                }`}
            >
                <div className="container md:w-full mx-auto">
                    <h5 className="font-bold text-secondary mb-[1vw]">
                        Catatan untuk Tutor
                    </h5>
                    <hr className="border-secondary" />
                    <p
                        className="font-poppins md:font-medium leading-[5vw] md:leading-[1.25vw] my-[4vw] md:my-[1vw] text-[3.4vw] md:text-[.9vw] cursor-pointer"
                        onClick={() => setShowNote(!showNote)}
                    >
                        {showNote
                            ? data.note.split(" ").length > 15
                                ? data.note.split(" ").slice(0, 15).join(" ") +
                                  "..."
                                : data.note
                            : data.note}
                    </p>
                    <hr className="border-black" />
                </div>
                <div className="md:hidden h-[4vw] bg-slate-100 mt-[5vw]"></div>
            </div>
            <div
                className={`relative md:shadow-centered-spread md:rounded-[1vw] md:p-[1.75vw] text-xs h-fit text-[3.4vw] md:text-[.9vw] ${
                    data.document ? "" : "hidden"
                }`}
            >
                <div className="container md:w-full mx-auto">
                    <h5 className="font-bold text-secondary mb-[1vw]">
                        Berkas Pendukung
                    </h5>
                    <hr className="border-secondary" />
                    <table className="w-full font-poppins border-separate border-spacing-y-3 my-[2vw] md:my-1 cursor-pointer">
                        <tbody>
                            <tr>
                                <td>Nama Berkas</td>
                                <td
                                    className="font-bold text-right"
                                    onClick={() =>
                                        setShowDocument(!showDocument)
                                    }
                                >
                                    {data.document != ""
                                        ? showDocument
                                            ? data.document.name.split(" ")
                                                  .length > 5
                                                ? data.document.name
                                                      .split(" ")
                                                      .slice(0, 5)
                                                      .join(" ") + "..."
                                                : data.document.name
                                            : data.document.name
                                        : ""}
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
                <div className="md:hidden h-[4vw] bg-slate-100 mt-[5vw]"></div>
            </div>
            <div
                className={`relative md:shadow-centered-spread md:rounded-[1vw] md:p-[1.75vw] text-xs h-fit text-[3.4vw] md:text-[.9vw] ${
                    data.add_on.length ? "" : "hidden"
                }`}
            >
                <div className="container md:w-full mx-auto">
                    <h5 className="font-bold text-secondary mb-[1vw]">
                        Add-On
                    </h5>
                    <hr className="border-secondary" />
                    {data.add_on
                        .sort((x, y) => x.id - y.id)
                        .map((item, index) => {
                            return (
                                <div key={index}>
                                    <table className="w-full font-poppins border-separate border-spacing-y-3 my-1">
                                        <tbody>
                                            <tr>
                                                <td>{item.name}</td>
                                                <td className="font-bold text-right">
                                                    IDR{" "}
                                                    {currency.format(
                                                        item.price
                                                    )}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <hr className="border-black" />
                                </div>
                            );
                        })}
                </div>
                <div className="md:hidden h-[4vw] bg-slate-100 mt-[5vw]"></div>
            </div>
            <div className="relative md:shadow-centered-spread md:rounded-[1vw] pt-[2vw] md:p-[1.75vw] h-fit">
                <div className="container md:w-full mx-auto">
                    <div className="flex flex-col-reverse md:flex-col gap-[4vw] md:gap-0">
                        <div className="text-[3.25vw] md:text-[.9vw]">
                            <div className="hidden md:block">
                                <h5 className="font-bold text-secondary mb-[2vw] md:mb-[1vw] text-[3vw] md:text-[1.2vw]">
                                    Total Pesanan
                                </h5>
                                <hr className="border-secondary" />
                            </div>
                            <div className="md:hidden">
                                <h5 className="md:hidden font-medium my-[2vw] md:mb-[1vw] text-[3vw] md:text-[1.2vw]">
                                    Ringkasan Transaksi
                                </h5>
                                <hr className="border-dark" />
                            </div>
                            <table className="w-full font-poppins border-separate border-spacing-y-[3vw] md:border-spacing-y-[1vw] my-1">
                                <tbody>
                                    <tr>
                                        <td>Dibimbing Sekali</td>
                                        <td className="font-bold text-right">
                                            {currency.format(data.init_price) >
                                            0
                                                ? `IDR ${currency.format(
                                                      data.init_price
                                                  )}`
                                                : "-"}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Promo</td>
                                        <td className="font-bold text-right">
                                            {currency.format(data.discount) > 0
                                                ? `IDR ${currency.format(
                                                      data.discount
                                                  )}`
                                                : "-"}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Add-On</td>
                                        <td className="font-bold text-right">
                                            {currency.format(
                                                data.add_on_price
                                            ) > 0
                                                ? `IDR ${currency.format(
                                                      data.add_on_price
                                                  )}`
                                                : "-"}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Biaya Admin</td>
                                        <td className="font-bold text-right">
                                            {data.purchase_method != ""
                                                ? (data.purchase_method.category == "ewallet" ? `IDR ${currency.format(
                                                    data.purchase_method.admin_fee * (data.init_price - data.discount + data.add_on_price) / 100
                                                  )}`
                                                  : `IDR ${currency.format(
                                                    data.purchase_method.admin_fee
                                                  )}`)
                                                : "-"}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <hr className="border-black" />
                        </div>
                        <div className="hidden md:block text-center font-poppins my-[1.25vw]">
                            <p className="font-bold mb-[2vw] md:mb-[.5vw]">
                                Total Pembelian
                            </p>
                            <h2 className="text-secondary md:text-[2.25vw]">
                                IDR {currency.format(totalPrice)}
                            </h2>
                        </div>
                        <div className="grid gap-[4vw] md:gap-[1.25vw]">
                            <ExpandedButton
                                className="rounded-[.8vw] md:rounded-[.4vw] hover:border-secondary hover:outline-secondary hover:bg-secondary hover:text-white h-[9vw] md:h-[2.5vw]"
                                borderClassName={`border-1 outline outline-1 ${
                                    data.discount > 0
                                        ? "border-secondary outline-secondary text-secondary"
                                        : "outline-light-grey text-light-grey"
                                }`}
                                iconClassName={`group-hover:text-white ${
                                    data.discount != "" ? "text-grey" : ""
                                }`}
                                onClick={() => setShowPromoForm(!showPromoForm)}
                            >
                                {data.discount > 0
                                    ? "Promo Terpakai"
                                    : "Pakai Promo"}
                            </ExpandedButton>
                            <ExpandedButton
                                className="rounded-[.8vw] md:rounded-[.4vw] hover:border-secondary hover:outline-secondary hover:bg-secondary hover:text-white h-[9vw] md:h-[2.5vw]"
                                borderClassName={`border-1 outline outline-1 ${
                                    data.purchase_method != ""
                                        ? "border-secondary outline-secondary text-secondary"
                                        : "outline-light-grey text-light-grey"
                                }`}
                                iconClassName={`group-hover:text-white ${
                                    data.purchase_method != ""
                                        ? "text-grey"
                                        : ""
                                }`}
                                onClick={() =>
                                    setShowPurchaseMethodForm(
                                        !showPurchaseMethodForm
                                    )
                                }
                            >
                                {data.purchase_method != "" ? (
                                    <div className="flex items-center gap-[2vw] md:gap-[.5vw]">
                                        <img
                                            src={`/img/purchase/${data.purchase_method.name.toLowerCase()}.png`}
                                            alt={data.purchase_method.name}
                                            className="w-[4vw] md:w-[1.5vw]"
                                        />
                                        {data.purchase_method.name}
                                    </div>
                                ) : (
                                    "Pilih Metode Pembayaran"
                                )}
                            </ExpandedButton>
                        </div>
                    </div>
                    <div>
                        <PromoForm
                            show={showPromoForm}
                            setShow={setShowPromoForm}
                            data={data}
                            setData={setData}
                            temp={temp}
                            setTemp={setTemp}
                            promoHandler={promoHandler}
                        />
                        <PurchaseMethodForm
                            show={showPurchaseMethodForm}
                            setShow={setShowPurchaseMethodForm}
                            data={data}
                            setData={setData}
                            temp={temp}
                            setTemp={setTemp}
                            purchaseMethods={purchaseMethods}
                        />
                    </div>
                    <div className="flex justify-between items-center mt-[4vw] md:mt-0">
                        <div className="md:hidden">
                            <p className="mb-[1vw]">Total pembelian</p>
                            <p className="font-poppins text-secondary font-bold text-[5.25vw]">
                                IDR {currency.format(totalPrice)}
                            </p>
                        </div>
                        <ButtonPill
                            className="w-6/12 md:w-full mt-[1.25vw]"
                            isActive={
                                !(
                                    data["purchase_method"] == "" ||
                                    Object.keys(
                                        Object.fromEntries(
                                            Object.entries(rules).filter(
                                                ([key, value]) => value
                                            )
                                        )
                                    )
                                        .map((i) => data[i])
                                        .includes("")
                                )
                            }
                            onClick={submit}
                        >
                            Bayar Sekarang
                        </ButtonPill>
                    </div>
                </div>
            </div>
        </div>
    );
}

function PromoForm({
    show,
    setShow,
    data,
    setData,
    temp,
    setTemp,
    promoHandler,
}) {
    const [isProcess, setIsProcess] = useState(false);
    return (
        <>
            <div
                className={`${
                    show ? "" : "hidden"
                } fixed top-0 bottom-0 left-0 right-0 overflow-hidden bg-dark bg-opacity-50 transition-all duration-300 z-50`}
                onClick={() => {
                    if (data.promo != "") {
                        setTemp({ ...temp, promo: data.promo, discount: 0 });
                    }
                    setShow(false);
                }}
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
                            Pilih Promo
                        </h5>
                        <i
                            role="button"
                            className="fa-solid fa-times text-[5vw] md:text-[1.5vw]"
                            onClick={() => {
                                if (data.promo != "") {
                                    setTemp({
                                        ...temp,
                                        promo: data.promo,
                                        discount: 0,
                                    });
                                }
                                setShow(false);
                            }}
                        ></i>
                    </div>
                    <hr className="border-light-grey" />
                </div>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        if (temp.promo != "") {
                            promoHandler(
                                temp.promo,
                                () => setShow(false),
                                setIsProcess
                            );
                        }
                    }}
                    className="relative"
                >
                    <input
                        className="w-full flex justify-between items-center px-[3vw] md:px-[1vw] shadow-centered-spread rounded-sm border-2 focus:outline-0 text-dark h-[9vw] md:h-[2.5vw]"
                        value={temp.promo}
                        onChange={(e) => {
                            setTemp("promo", e.target.value);
                        }}
                        placeholder="Masukkan kode promo disini"
                    />
                    <div
                        className={`absolute h-full top-0 right-0 flex items-center px-[3vw] md:px-[1vw] ${
                            isProcess ? "" : "hidden"
                        }`}
                    >
                        <i className="fa-solid fa-circle-notch fa-spin"></i>
                    </div>
                </form>
                <div className="flex justify-center md:justify-end mt-[.75vw]">
                    <ButtonPill
                        className="w-6/12 md:w-3/12"
                        isActive={temp.promo != ""}
                        onClick={() => {
                            if (temp.promo != "") {
                                promoHandler(
                                    temp.promo,
                                    () => setShow(false),
                                    setIsProcess
                                );
                            }
                        }}
                    >
                        Pakai
                    </ButtonPill>
                </div>
            </div>
        </>
    );
}

function PurchaseMethodForm({
    show,
    setShow,
    data,
    setData,
    temp,
    setTemp,
    purchaseMethods,
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
                            Pilih Metode Pembayaran
                        </h5>
                        <i
                            role="button"
                            className="fa-solid fa-times text-[5vw] md:text-[1.5vw]"
                            onClick={() => setShow(false)}
                        ></i>
                    </div>
                    <hr className="border-light-grey" />
                </div>
                <div className="h-[40vh] md:h-fit flex flex-col gap-[3vw] md:gap-[1.5vw] overflow-auto scrollbar-hidden">
                    <div>
                        <h6 className="font-medium mb-[2vw] md:mb-[1vw]">
                            Dompet Digital
                        </h6>
                        <div className="grid gap-[3vw] md:gap-[1vw]">
                            {purchaseMethods.map((item, i) => {
                                if (item.category == "ewallet") {
                                    return (
                                        <ExpandedButton
                                            key={i}
                                            className={`spread rounded-sm border-2 hover:border-secondary active:text-white active:border-secondary active:bg-secondary text-dark h-[9vw] md:h-[3vw] ${
                                                temp.purchase_method == item
                                                    ? "border-secondary"
                                                    : ""
                                            }`}
                                            borderClassName="border-0"
                                            onClick={() => {
                                                setTemp('purchase_method', item);
                                            }}
                                        >
                                            <div className="flex items-center gap-[2vw] md:gap-[1vw]">
                                                <img
                                                    src={`/img/purchase/${item.name.toLowerCase()}.png`}
                                                    alt={item.name}
                                                    className="w-[4vw] md:w-[2vw]"
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
                        <h6 className="font-medium mb-[2vw] md:mb-[1vw]">
                            Bank
                        </h6>
                        <div className="grid gap-[3vw] md:gap-[1vw]">
                            {purchaseMethods.map((item, i) => {
                                if (item.category == "bank_transfer") {
                                    return (
                                        <ExpandedButton
                                            key={i}
                                            className={`spread rounded-sm border-2 hover:border-secondary active:text-white active:border-secondary active:bg-secondary text-dark h-[9vw] md:h-[3vw] ${
                                                temp.purchase_method == item
                                                    ? "border-secondary"
                                                    : ""
                                            }`}
                                            borderClassName="border-0"
                                            onClick={() => {
                                                setTemp('purchase_method', item);
                                            }}
                                        >
                                            <div className="flex items-center gap-[2vw] md:gap-[1vw]">
                                                <img
                                                    src={`/img/purchase/${item.name.toLowerCase()}.png`}
                                                    alt={item.name}
                                                    className="w-[4vw] md:w-[2vw]"
                                                />
                                                {item.name}
                                            </div>
                                        </ExpandedButton>
                                    );
                                }
                            })}
                        </div>
                    </div>
                </div>
                <div className="flex justify-center md:justify-end mt-[1vw]">
                    <ButtonPill
                        className="w-6/12 md:w-3/12"
                        isActive={temp.purchase_method != ""}
                        onClick={(e) => {
                            if (temp.purchase_method != "") {
                                setData('purchase_method', temp.purchase_method);
                                setShow(false);
                                console.log(temp.purchase_method)
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
    temp,
    setTemp,
    unavailableDate,
    cities,
    places,
    rules,
}) {
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showCityOptions, setShowCityOptions] = useState(false);
    const [showPlaceOptions, setShowPlaceOptions] = useState(false);
    const theme = createTheme({
        typography: {
            fontSize: {
                1: "1vw",
                4: "4vw",
            },
        },
    });
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
                        ? "md:top-0 bottom-0 md:scale-100"
                        : "md:top-full -bottom-full md:scale-0"
                } fixed left-0 flex flex-col gap-[4vw] md:gap-[1vw] w-full md:w-[30vw] md:h-fit transition-all duration-500 bg-white shadow-md rounded-t-[6vw] md:rounded-[1vw] p-[8vw] md:p-[1.75vw] z-50 md:ms-[35vw] md:mt-[8vh] h-[70vh]`}
            >
                <div
                    className={`${
                        showDatePicker ? "" : "hidden"
                    } absolute top-0 left-0 right-0 bottom-0 bg-dark bg-opacity-25 rounded-xl`}
                    onClick={() => setShowDatePicker(false)}
                ></div>
                <div>
                    <div className="flex justify-between items-center mb-[3vw] md:mb-[1vw]">
                        <h5 className="text-secondary font-poppins font-bold text-[4.5vw] md:text-[1.2vw]">
                            Pilih Jadwal Bimbingan
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
                    <p className="font-medium mb-[3vw] md:mb-[1.25vw]">
                        Pilih Tanggal Bimbingan :
                    </p>
                    <div className="relative w-full">
                        <ExpandedButton
                            className="shadow-centered-spread rounded-sm h-[9vw] md:h-[2.5vw]"
                            borderClassName={
                                temp.schedule != ""
                                    ? "border-2 border-secondary"
                                    : "border-0"
                            }
                            textClassName={`font-medium ${
                                temp.schedule != ""
                                    ? "text-dark"
                                    : "text-gray-400"
                            }`}
                            onClick={() => setShowDatePicker(!showDatePicker)}
                        >
                            {temp.schedule != ""
                                ? moment(temp.schedule).format(
                                      "dddd, DD MMMM YYYY"
                                  )
                                : "Pilih Tanggal"}
                        </ExpandedButton>
                        <div
                            className={`hidden md:block absolute top-0 left-0 right-0 rounded-[.4vw] shadow-centered-spread w-full transition-all duration-500 overflow-visible ${
                                showDatePicker
                                    ? "scale-100"
                                    : "scale-0 -translate-y-[50%] -translate-x-[50%]"
                            }`}
                        >
                            <ThemeProvider theme={theme}>
                                <LocalizationProvider
                                    dateAdapter={AdapterMoment}
                                    dateLibInstance={moment}
                                >
                                    <StaticDatePicker
                                        slotProps={{
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
                                                    fontSize: "1.25vw",
                                                    height: "4vw",
                                                    maxHeight: "unset",
                                                    margin: 0,
                                                    padding: "0 .75vw 0 1.5vw",
                                                },
                                            },
                                        }}
                                        sx={{
                                            fontSize: "fontSize.1",
                                            minWidth: "unset",
                                            width: "100%",
                                            height: "25vw",
                                            padding: "1vw 1vw 2vw",
                                            maxHeight: "unset",
                                            "& .MuiDateCalendar-root": {
                                                width: "100%",
                                                height: "fit-content",
                                                maxHeight: "unset",
                                            },
                                            "& .MuiPickersLayout-contentWrapper":
                                                {
                                                    width: "100%",
                                                    height: "100%",
                                                },
                                            "& .MuiDayCalendar-monthContainer":
                                                {
                                                    width: "100%",
                                                    height: "fit-content",
                                                    position: "relative",
                                                },
                                            "& .MuiPickersSlideTransition-root":
                                                {
                                                    width: "100%",
                                                    height: "fit-content",
                                                    minHeight: "unset",
                                                },
                                            "& .MuiDayCalendar-weekDayLabel": {
                                                width: "3vw",
                                                height: "3vw",
                                            },
                                            "& .MuiPickersDay-root": {
                                                width: "3vw",
                                                height: "3vw",
                                            },
                                            "& .MuiPickersDay-root.Mui-selected":
                                                { backgroundColor: "#FF8854" },
                                            "& .MuiPickersDay-root.Mui-selected:hover":
                                                { backgroundColor: "#FF6420" },
                                            "& .MuiPickersYear-yearButton.Mui-selected":
                                                { backgroundColor: "#FF8854" },
                                        }}
                                        minDate={moment()}
                                        maxDate={moment().add("6", "day")}
                                        shouldDisableDate={(date) => {
                                            return unavailableDate.includes(
                                                date.format("YYYY-MM-DD")
                                            );
                                        }}
                                        onChange={(date) => {
                                            setTemp(
                                                "schedule",
                                                date.format("YYYY-MM-DD")
                                            );
                                            setShowDatePicker(false);
                                        }}
                                    ></StaticDatePicker>
                                </LocalizationProvider>
                            </ThemeProvider>
                        </div>
                    </div>
                </div>
                <div className={"city" in rules ? "" : "hidden"}>
                    <p className="font-medium mb-[3vw] md:mb-[1.25vw]">
                        Pilih Kota Bimbingan{" "}
                        {"city" in rules
                            ? rules.city
                                ? ""
                                : " (opsional)"
                            : ""}
                        :
                    </p>
                    <ExpandedButton
                        className="shadow-centered-spread rounded-sm h-[9vw] md:h-[2.5vw]"
                        borderClassName={
                            temp.city != ""
                                ? "border-2 border-secondary"
                                : "border-0"
                        }
                        textClassName={`font-medium ${
                            temp.city != "" ? "text-dark" : "text-gray-400"
                        }`}
                        icon={`fa-solid fa-chevron-down duration-500 ${
                            showCityOptions ? "-rotate-180 -z-10" : ""
                        }`}
                        onClick={() => {
                            if (showPlaceOptions) {
                                setShowPlaceOptions(false);
                            }
                            setShowCityOptions(!showCityOptions);
                        }}
                    >
                        {temp.city != "" ? temp.city : "Pilih Kota"}
                    </ExpandedButton>
                    <TECollapse
                        show={showCityOptions}
                        className="w-[110%] -ms-[5%] px-[4%] shadow-none"
                    >
                        <TECollapseItem className="grid gap-[5vw] md:gap-[1.75vw] p-[.5vw] pe-[1.5vw] md:pe-[1.5vw] h-[20vw] md:h-[10vw] overflow-y-scroll">
                            {cities.map((item, i) => {
                                return (
                                    <div
                                        key={i}
                                        className="w-full flex justify-between items-center h-[8vw] md:h-[3vw] px-[4vw] md:px-[1vw] font-medium shadow-centered rounded-sm border-0 hover:bg-secondary hover:text-white text-gray-400 cursor-pointer"
                                        onClick={() => {
                                            if (temp.city != item) {
                                                setTemp({
                                                    ...temp,
                                                    city: item,
                                                    place: "",
                                                });
                                            } else {
                                                setTemp("city", item);
                                            }
                                            setShowCityOptions(false);
                                        }}
                                    >
                                        {item}
                                    </div>
                                );
                            })}
                        </TECollapseItem>
                    </TECollapse>
                </div>
                <div className={"place" in rules ? "" : "hidden"}>
                    <p className="font-medium mb-[3vw] md:mb-[1.25vw]">
                        Pilih Lokasi Bimbingan{" "}
                        {"place" in rules
                            ? rules.place
                                ? ""
                                : " (opsional)"
                            : ""}
                        :
                    </p>
                    <ExpandedButton
                        className={`shadow-centered-spread rounded-sm h-[9vw] md:h-[2.5vw] ${
                            temp.city != "" ? "" : "bg-slate-100"
                        }`}
                        borderClassName={
                            temp.place != ""
                                ? "border-2 border-secondary"
                                : "border-0"
                        }
                        textClassName={`font-medium ${
                            temp.place != "" ? "text-dark" : "text-gray-400"
                        }`}
                        icon={`fa-solid fa-chevron-down duration-500 ${
                            showPlaceOptions ? "-rotate-180 -z-10" : ""
                        }`}
                        onClick={() => {
                            if (temp.city != "") {
                                if (showCityOptions) {
                                    setShowCityOptions(false);
                                }
                                setShowPlaceOptions(!showPlaceOptions);
                            }
                        }}
                    >
                        {temp.place != "" ? temp.place : "Pilih Lokasi"}
                    </ExpandedButton>
                    <TECollapse
                        show={showPlaceOptions}
                        className="w-[110%] -ms-[5%] px-[4%] shadow-none"
                    >
                        <TECollapseItem className="grid gap-[5vw] md:gap-[1.75vw] p-[.5vw] pe-[1.5vw] md:pe-[1.5vw] h-[20vw] md:h-[10vw] overflow-y-scroll">
                            {temp.city != "" ? (
                                places[temp.city].map((item, i) => {
                                    return (
                                        <div
                                            key={i}
                                            className="w-full flex justify-between items-center h-[8vw] md:h-[3vw] px-[4vw] md:px-[1vw] font-medium shadow-centered rounded-sm border-0 hover:bg-secondary hover:text-white text-gray-400 cursor-pointer"
                                            onClick={() => {
                                                setTemp("place", item);
                                                setShowPlaceOptions(false);
                                            }}
                                        >
                                            {item}
                                        </div>
                                    );
                                })
                            ) : (
                                <div
                                    className="w-full flex justify-between items-center h-[8vw] md:h-[3vw] px-[4vw] md:px-[1vw] font-medium shadow-centered rounded-sm border-0 hover:bg-secondary hover:text-white text-gray-400 cursor-pointer"
                                    onClick={() => setShowPlaceOptions(false)}
                                >
                                    Kosong
                                </div>
                            )}
                        </TECollapseItem>
                    </TECollapse>
                </div>
                <div className="flex justify-center md:justify-end mt-[1vw]">
                    <ButtonPill
                        className="w-6/12 md:w-3/12"
                        isActive={
                            "place" in rules
                                ? temp.schedule != "" && temp.place != ""
                                : temp.schedule != ""
                        }
                        onClick={(e) => {
                            if (
                                "place" in rules
                                    ? temp.schedule != "" && temp.place != ""
                                    : temp.schedule != ""
                            ) {
                                setData({
                                    ...data,
                                    schedule: temp.schedule,
                                    city: temp.city,
                                    place: temp.place,
                                });
                                setShow(false);
                            }
                        }}
                    >
                        Simpan
                    </ButtonPill>
                </div>
            </div>
            <div
                className={`${
                    showDatePicker
                        ? "md:top-0 bottom-0 md:scale-100"
                        : "md:top-full -bottom-full md:scale-0"
                } md:hidden fixed left-0 flex justify-center items-center gap-[4vw] md:gap-[1vw] w-full md:w-[30vw] md:h-fit transition-all duration-500 bg-white shadow-md rounded-t-[6vw] md:rounded-[1vw] p-[8vw] md:p-[1.75vw] z-50 md:ms-[35vw] md:mt-[8vh] h-[70vh]`}
            >
                <div
                    className={`rounded-[1vw] flex md:rounded-[.4vw] shadow-centered-spread w-full h-[50vh] transition-all duration-500 overflow-visible`}
                >
                    <ThemeProvider theme={theme}>
                        <LocalizationProvider
                            dateAdapter={AdapterMoment}
                            dateLibInstance={moment}
                        >
                            <StaticDatePicker
                                slotProps={{
                                    toolbar: { hidden: true },
                                    actionBar: { sx: { display: "none" } },
                                    switchViewButton: {
                                        sx: { display: "none" },
                                    },
                                    nextIconButton: { sx: { fontSize: "6vw" } },
                                    previousIconButton: {
                                        sx: { fontSize: "6vw" },
                                    },
                                    calendarHeader: {
                                        sx: {
                                            fontSize: "5vw",
                                            height: "10vw",
                                            maxHeight: "unset",
                                            margin: 0,
                                            padding: "1vw 0 6vw 4vw",
                                        },
                                    },
                                }}
                                sx={{
                                    fontSize: "fontSize.4",
                                    minWidth: "unset",
                                    width: "100%",
                                    height: "50vh",
                                    padding: "6vw 3vw 6vw",
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
                                    "& .MuiPickersYear-yearButton.Mui-selected":
                                        { backgroundColor: "#FF8854" },
                                }}
                                minDate={moment()}
                                maxDate={moment().add("6", "day")}
                                shouldDisableDate={(date) => {
                                    return unavailableDate.includes(
                                        date.format("YYYY-MM-DD")
                                    );
                                }}
                                onChange={(date) => {
                                    setTemp(
                                        "schedule",
                                        date.format("YYYY-MM-DD")
                                    );
                                    setShowDatePicker(false);
                                }}
                            ></StaticDatePicker>
                        </LocalizationProvider>
                    </ThemeProvider>
                </div>
            </div>
        </>
    );
}

function NoteForm({ show, setShow, data, setData, temp, setTemp }) {
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

function AddOnForm({
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
                                if (temp.add_on.length) {
                                    setData({
                                        ...data,
                                        add_on: temp.add_on,
                                        add_on_price: temp.add_on
                                            .map((i) => i.price)
                                            .reduce((total, i) => total + i),
                                    });
                                } else {
                                    setData({
                                        ...data,
                                        add_on: temp.add_on,
                                        add_on_price: 0,
                                    });
                                }
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
