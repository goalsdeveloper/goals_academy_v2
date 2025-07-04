import { useState } from "react";
import { useForm, Link } from "@inertiajs/react";
import moment from "moment";
import MainLayout from "@/Layouts/MainLayout";
import GoalsButton from "@/Components/GoalsButton";
import ExpandedButton from "@/Components/ExpandedButton";
import PromoForm from "@/Pages/Partials/Purchase/Form/PromoForm";
import PurchaseMethodForm from "@/Pages/Partials/Purchase/Form/PurchaseMethodForm";
import LengkapiProfilForm from "@/Pages/Partials/Purchase/Form/LengkapiProfilForm";
import { createTheme } from "@mui/material";
import "@/script/momentCustomLocale";
import { FiChevronLeft, FiInfo } from "react-icons/fi";
import { BiSolidDiscount } from "react-icons/bi";
import { FaChevronRight } from "react-icons/fa6";
import GoalsDatePicker from "@/Components/elements/GoalsDatePicker";
import {
    GoalsSelectInput,
    GoalsSelectInputItem,
} from "@/Components/elements/GoalsSelectInput";
import {
    GoalsSelectMultipleInput,
    GoalsSelectMultipleInputItem,
} from "@/Components/elements/GoalsSelectMultipleInput";
import GoalsUploadFile from "@/Components/elements/GoalsUploadFile";
import toast, { Toaster } from "react-hot-toast";
import { createPortal } from "react-dom";

export default function Form({
    auth,
    date,
    addOns,
    cities,
    topics,
    paymentMethods,
    dataProduct,
}) {
    const userId = auth.user ? auth.user.id : "";
    const [isProcessed, setIsProcessed] = useState(false);
    const [showMobileSummaryCard, setShowMobileSummaryCard] = useState(false);

    let requiredProfile = {};
    if (!userId) {
        requiredProfile = {
            email: "",
            name: "",
            phone_number: "",
            university: "",
            faculty: "",
            major: "",
            rumpun: "",
        };
    } else {
        requiredProfile = {
            email: auth.user.email || "",
            name: auth.user.name || "",
            phone_number: auth.user.profile.phone_number || "",
            university: auth.user.profile.university || "",
            faculty: auth.user.profile.faculty || "",
            major: auth.user.profile.major || "",
            rumpun: auth.user.profile.rumpun || "",
        };
    }

    const [userProfile, setUserProfile] = useState({
        ...requiredProfile,
        id: userId,
    });


    // Code to input form data
    const { data, setData, errors, setError, post } = useForm({
        id: userId,
        schedule: "",
        city: "",
        place: "",
        document: [],
        topic: "",
        init_price:
            parseFloat(dataProduct.price) -
            parseFloat(dataProduct.promo_price || 0),
        promo: "",
        discount: 0,
        purchase_method: "",
        admin: 0,
        product_id: dataProduct.id,
        add_on: [],
        add_on_price: 0,
        total_price:
            parseFloat(dataProduct.price) -
            parseFloat(dataProduct.promo_price || 0),
    });

    // Code to input temp form data
    const { data: temp, setData: setTemp } = useForm({
        id: userId,
        schedule: "",
        city: "",
        place: "",
        document: "",
        topic: "",
        init_price:
            parseFloat(dataProduct.price) -
            parseFloat(dataProduct.promo_price || 0),
        promo: "",
        discount: 0,
        purchase_method: "",
        admin: 0,
        product_id: dataProduct.id,
        add_on: [],
        add_on_price: 0,
    });

    // Initialize product's category
    const category = "offline";

    // Initialize form rules
    const rules = dataProduct.form_config;

    // Initialize available availableAddOn
    let availableAddOn = addOns;

    // Code to initialize unavailable dates
    const unavailableDate = date.map((i) => i.date);

    // Initialize purchase methods
    const purchaseMethods = paymentMethods;

    // Submit function
    const submit = (e) => {
        e.preventDefault();
        if (
            Object.keys(userProfile)
                .map((i) => userProfile[i])
                .includes("") ||
            Object.keys(userProfile)
                .map((i) => userProfile[i])
                .includes(null)
        ) {
            toast("Lengkapi profil terlebih dahulu!", {
                position: "top-center",
                icon: "⚠️",
            });
            window.scrollTo(0, 0);
        } else {
            setIsProcessed(true);
            post("/produk", {
                onFinish: () => setIsProcessed(false),
                onError: () => setIsProcessed(false),
            });
            // if (dataProduct.product_type_id == 4) {
            //     post(route("produk.ecourse.store"), {
            //         onFinish: () => setIsProcessed(false),
            //         onError: () => setIsProcessed(false),
            //     });
            // } else {
            //     post("/produk", {
            //         onFinish: () => setIsProcessed(false),
            //         onError: () => setIsProcessed(false),
            //     });
            // }
        }
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
            body: JSON.stringify({ inputCode: inputCode, userId: data.id, productId: dataProduct.id }),
        })
            .then((response) => response.json())
            .then((response) => {
                processCallback(false);
                if ("data" in response) {
                    let promoDiscount = 0;
                    if (parseInt(response.data.is_price)) {
                        promoDiscount = parseFloat(response.data.value);
                    } else {
                        promoDiscount =
                            (parseFloat(data.init_price) *
                                parseFloat(response.data.value)) /
                            100;
                    }
                    let adminFee = 0;
                    if (data.purchase_method != "") {
                        if (parseInt(data.purchase_method.is_price)) {
                            adminFee = parseFloat(
                                data.purchase_method.admin_fee
                            );
                        } else {
                            adminFee = Math.ceil(
                                ((parseFloat(data.init_price) -
                                    parseFloat(promoDiscount) +
                                    parseFloat(data.add_on_price)) *
                                    parseFloat(
                                        data.purchase_method.admin_fee
                                    )) /
                                    100
                            );
                        }
                    }
                    const totalPrice =
                        parseFloat(data.init_price) -
                        parseFloat(promoDiscount) +
                        parseFloat(data.add_on_price) +
                        adminFee;
                    setData({
                        ...data,
                        promo: temp.promo,
                        discount: promoDiscount,
                        admin: adminFee,
                        total_price: totalPrice,
                    });
                    console.log(response)
                    // toast.success(response.message, { position: "top-center" });
                    successCallback();
                } else {
                    setTemp({ ...temp, promo: data.promo, discount: 0 });
                    toast.error(response.message, { position: "top-center" });
                }
            });
    };

    return (
        <MainLayout
            auth={auth}
            title={dataProduct.name}
            headerClassName="shadow-md md:shadow-none"
            footerClassName="hidden md:block"
        >
            <Toaster />
            <section
                id="purchase-form"
                className="md:mb-16 lg:mb-20 xl:mb-24 3xl:mb-32"
            >
                <div className="relative md:container mx-auto pt-[4.5vw] md:pt-[1vw] flex flex-col justify-between md:flex-row text-[3.7vw] md:text-[1vw] gap-[4vw] md:gap-0">
                    <MainCard
                        userId={userId}
                        userProfile={userProfile}
                        setUserProfile={setUserProfile}
                        setShowMobileSummaryCard={setShowMobileSummaryCard}
                        dataProduct={dataProduct}
                        data={data}
                        setData={setData}
                        temp={temp}
                        setTemp={setTemp}
                        unavailableDate={unavailableDate}
                        availableAddOn={availableAddOn}
                        cities={cities}
                        topics={topics}
                        rules={rules}
                    />
                    <SummaryCard
                        userProfile={userProfile}
                        setUserProfile={setUserProfile}
                        showMobile={showMobileSummaryCard}
                        setShowMobile={setShowMobileSummaryCard}
                        dataProduct={dataProduct}
                        data={data}
                        setData={setData}
                        temp={temp}
                        setTemp={setTemp}
                        purchaseMethods={purchaseMethods}
                        totalPrice={data.total_price}
                        promoHandler={promoHandler}
                        submit={submit}
                        isProcessed={isProcessed}
                        rules={rules}
                    />
                </div>
            </section>
        </MainLayout>
    );
}

function MainCard({
    userId,
    userProfile,
    setUserProfile,
    setShowMobileSummaryCard,
    dataProduct,
    data,
    setData,
    temp,
    setTemp,
    unavailableDate,
    availableAddOn,
    cities,
    topics,
    rules,
}) {
    const [showForm, setShowForm] = useState({
        schedule: false,
        city: false,
        place: false,
        topic: false,
        addOn: false,
        document: false,
    });
    const theme = createTheme({
        typography: {
            fontSize: {
                1: "1vw",
                4: "4vw",
            },
        },
    });

    const showFormHandler = (key, value) => {
        const tempShowForm = { ...showForm };
        Object.keys(tempShowForm).forEach((i) => {
            i == key ? (tempShowForm[i] = value) : (tempShowForm[i] = false);
        });
        setShowForm(tempShowForm);
    };

    const currency = Intl.NumberFormat("id-ID");
    return (
        <div className="md:w-[72%] flex flex-col gap-[1vw]">
            {!userId ||
            Object.keys(userProfile)
                .map((i) => userProfile[i])
                .includes("") ||
            Object.keys(userProfile)
                .map((i) => userProfile[i])
                .includes(null) ? (
                <LengkapiProfilAlert
                    isLogin={!!userId}
                    userProfile={userProfile}
                    setUserProfile={setUserProfile}
                    setPurchaseData={setData}
                />
            ) : (
                <></>
            )}
            <div className="md:border-1 md:rounded-[.8vw] md:p-[1.75vw] h-fit">
                <div className="flex flex-col gap-[4vw] md:gap-0">
                    <div className="md:hidden flex flex-col gap-[4vw]">
                        <Link
                            href="/produk"
                            className="container mx-auto flex items-center gap-[2vw] font-medium font-poppins"
                        >
                            <FiChevronLeft className="text-[5vw]" /> Kembali
                        </Link>
                        <img
                            className="w-full h-[73vw] object-cover"
                            src={"/storage/" + dataProduct.product_image}
                            alt=""
                        />
                    </div>
                    <div className="container md:w-full mx-auto flex flex-col gap-[4vw] md:gap-[1vw]">
                        <h3 className="w-full text-secondary font-semibold text-[5.5vw] md:text-[1.8vw]">
                            {dataProduct.name}
                        </h3>
                        <p className="leading-normal">{dataProduct.description}</p>
                        {dataProduct?.facilities?.length ? (
                            // <div className="flex flex-col md:flex-row flex-wrap items-start gap-[3vw] md:gap-[1vw] multi-column">
                            <div className="grid items-start gap-[3vw] md:gap-[.5vw] multi-column md:max-h-[11vw] md:overflow-auto">
                                {dataProduct?.facilities?.map((item, index) => {
                                    return (
                                        <div
                                            key={index}
                                            className="flex gap-[3vw] md:gap-[1vw] md:px-[.5vw] md:py-[.25vw] md:rounded-full"
                                        >
                                            <i
                                                className={`${item.icon} text-primary text-center w-[4vw] md:w-[1vw] translate-y-[.2vw]`}
                                            ></i>
                                            <p>{item.text}</p>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : <></>}
                        <hr className="md:hidden mt-[3vw]" />
                    </div>
                    {Object.keys(rules).length ? <hr className="hidden md:block mt-[2vw] mb-[2.5vw]" /> : <></>}
                    <div
                        className="container md:w-full mx-auto md:flex md:gap-[1vw] md:text-[.9vw] mb-[20vw] md:mb-0"
                    >
                        {Object.keys(rules).length == 1 &&
                        "document" in rules ? (
                            availableAddOn.length ? (
                                <div className="w-full flex flex-col gap-[4vw] md:gap-[1vw] py-[4vw] md:py-0">
                                    <GoalsSelectMultipleInput
                                        show={showForm.addOn}
                                        setShow={(i) => {
                                            if (
                                                !(
                                                    data.add_on.every(
                                                        (i) =>
                                                            temp.add_on.filter(
                                                                (j) =>
                                                                    j.id == i.id
                                                            ).length
                                                    ) &&
                                                    temp.add_on.every(
                                                        (i) =>
                                                            data.add_on.filter(
                                                                (j) =>
                                                                    j.id == i.id
                                                            ).length
                                                    )
                                                )
                                            ) {
                                                setTemp("add_on", data.add_on);
                                            }
                                            showFormHandler("addOn", i);
                                        }}
                                        label="Add-On"
                                        placeholder="Tambah Add-On"
                                        data={data.add_on}
                                        onSubmit={() => {
                                            if (
                                                !(
                                                    data.add_on.length == 0 &&
                                                    temp.add_on.length == 0
                                                ) &&
                                                !(
                                                    data.add_on.every(
                                                        (i) =>
                                                            temp.add_on.filter(
                                                                (j) =>
                                                                    j.id == i.id
                                                            ).length
                                                    ) &&
                                                    temp.add_on.every(
                                                        (i) =>
                                                            data.add_on.filter(
                                                                (j) =>
                                                                    j.id == i.id
                                                            ).length
                                                    )
                                                )
                                            ) {
                                                let addOnPrice = 0;
                                                if (temp.add_on.length) {
                                                    addOnPrice = temp.add_on
                                                        .map((i) =>
                                                            parseFloat(i.price)
                                                        )
                                                        .reduce(
                                                            (total, i) =>
                                                                parseFloat(
                                                                    total
                                                                ) +
                                                                parseFloat(i)
                                                        );
                                                } else {
                                                    addOnPrice = 0;
                                                }
                                                let adminFee = 0;
                                                if (
                                                    data.purchase_method != ""
                                                ) {
                                                    if (
                                                        parseInt(
                                                            data.purchase_method
                                                                .is_price
                                                        )
                                                    ) {
                                                        adminFee = parseFloat(
                                                            data.purchase_method
                                                                .admin_fee
                                                        );
                                                    } else {
                                                        adminFee = Math.ceil(
                                                            ((parseFloat(
                                                                data.init_price
                                                            ) -
                                                                parseFloat(
                                                                    data.discount
                                                                ) +
                                                                addOnPrice) *
                                                                parseFloat(
                                                                    data
                                                                        .purchase_method
                                                                        .admin_fee
                                                                )) /
                                                                100
                                                        );
                                                    }
                                                }
                                                const totalPrice =
                                                    parseFloat(
                                                        data.init_price
                                                    ) -
                                                    parseFloat(data.discount) +
                                                    addOnPrice +
                                                    adminFee;
                                                setData({
                                                    ...data,
                                                    add_on: temp.add_on,
                                                    add_on_price: addOnPrice,
                                                    admin: adminFee,
                                                    total_price: totalPrice,
                                                });
                                            }
                                        }}
                                    >
                                        {availableAddOn.map((item, index) => {
                                            return (
                                                <GoalsSelectMultipleInputItem
                                                    key={index}
                                                    checked={
                                                        temp.add_on.filter(
                                                            (i) =>
                                                                i.id == item.id
                                                        ).length
                                                    }
                                                    onClick={() => {
                                                        if (
                                                            temp.add_on.filter(
                                                                (i) =>
                                                                    i.id ==
                                                                    item.id
                                                            ).length
                                                        ) {
                                                            setTemp(
                                                                "add_on",
                                                                temp.add_on.filter(
                                                                    (i) =>
                                                                        i.id !=
                                                                        item.id
                                                                )
                                                            );
                                                        } else {
                                                            const tempAddOn =
                                                                temp.add_on.slice();
                                                            tempAddOn.push(
                                                                item
                                                            );
                                                            setTemp(
                                                                "add_on",
                                                                tempAddOn
                                                            );
                                                        }
                                                    }}
                                                >
                                                    {item.name +
                                                        " - IDR " +
                                                        currency.format(
                                                            item.price
                                                        )}
                                                </GoalsSelectMultipleInputItem>
                                            );
                                        })}
                                    </GoalsSelectMultipleInput>
                                </div>
                            ) : (
                                <></>
                            )
                        ) : (
                            <div className="w-full flex flex-col gap-[4vw] md:gap-[1vw] py-[4vw] md:py-0">
                                {"schedule" in rules ? (
                                    <>
                                        <GoalsDatePicker
                                            required={rules["schedule"]}
                                            show={showForm.schedule}
                                            setShow={(i) =>
                                                showFormHandler("schedule", i)
                                            }
                                            wrapperClassName="hidden md:block"
                                            label="Pilih Jadwal Bimbinganmu"
                                            data={data.schedule}
                                            setData={(i) =>
                                                setData("schedule", i)
                                            }
                                            minDate={moment().add(1, "days")}
                                            maxDate={moment().add(8, "days")}
                                            shouldDisableDate={unavailableDate}
                                            theme={theme}
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
                                                        fontSize: "1vw",
                                                        height: "5vw",
                                                        maxHeight: "unset",
                                                        margin: 0,
                                                        padding:
                                                            "0 0 1vw 1.25vw",
                                                    },
                                                },
                                            }}
                                            sx={{
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
                                                "& .MuiDayCalendar-weekDayLabel":
                                                    {
                                                        width: "2.5vw",
                                                        height: "2.5vw",
                                                    },
                                                "& .MuiPickersDay-root": {
                                                    width: "2.5vw",
                                                    height: "2.5vw",
                                                },
                                                "& .MuiPickersDay-root.Mui-selected":
                                                    {
                                                        backgroundColor:
                                                            "#FF8854",
                                                    },
                                                "& .MuiPickersDay-root.Mui-selected:hover":
                                                    {
                                                        backgroundColor:
                                                            "#FF6420",
                                                    },
                                                "& .MuiPickersYear-yearButton.Mui-selected":
                                                    {
                                                        backgroundColor:
                                                            "#FF8854",
                                                    },
                                                ".css-sc0lva-MuiButtonBase-root-MuiPickersDay-root.Mui-disabled:not(.Mui-selected)":
                                                    {
                                                        color: "#DDDDDD",
                                                    },
                                            }}
                                        />
                                        <GoalsDatePicker
                                            required={rules["schedule"]}
                                            show={showForm.schedule}
                                            setShow={(i) =>
                                                showFormHandler("schedule", i)
                                            }
                                            wrapperClassName="md:hidden"
                                            label="Pilih Jadwal Bimbinganmu"
                                            data={data.schedule}
                                            setData={(i) =>
                                                setData("schedule", i)
                                            }
                                            minDate={moment()}
                                            maxDate={moment().add(6, "days")}
                                            shouldDisableDate={unavailableDate}
                                            theme={theme}
                                            slotProps={{
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
                                            }}
                                            sx={{
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
                                                "& .MuiDayCalendar-weekDayLabel":
                                                    {
                                                        width: "10vw",
                                                        height: "10vw",
                                                    },
                                                "& .MuiPickersDay-root": {
                                                    width: "10vw",
                                                    height: "10vw",
                                                },
                                                "& .MuiPickersDay-root.Mui-selected":
                                                    {
                                                        backgroundColor:
                                                            "#FF8854",
                                                    },
                                                "& .MuiPickersDay-root.Mui-selected:hover":
                                                    {
                                                        backgroundColor:
                                                            "#FF6420",
                                                    },
                                                "& .MuiPickersYear-yearButton.Mui-selected":
                                                    {
                                                        backgroundColor:
                                                            "#FF8854",
                                                    },
                                                ".css-sc0lva-MuiButtonBase-root-MuiPickersDay-root.Mui-disabled:not(.Mui-selected)":
                                                    {
                                                        color: "#DDDDDD",
                                                    },
                                            }}
                                        />
                                    </>
                                ) : (
                                    <></>
                                )}
                                {"city" in rules ? (
                                    <>
                                        <GoalsSelectInput
                                            required={rules["city"]}
                                            show={showForm.city}
                                            setShow={(i) =>
                                                showFormHandler("city", i)
                                            }
                                            label="Kota Bimbingan"
                                            placeholder="Pilih Kota"
                                            data={
                                                data.city != ""
                                                    ? cities.filter(
                                                          (item) =>
                                                              item.id ==
                                                              data.city
                                                      )[0].city
                                                    : ""
                                            }
                                        >
                                            {cities.map((item, index) => {
                                                return (
                                                    <GoalsSelectInputItem
                                                        key={index}
                                                        onClick={() => {
                                                            if (
                                                                data.place == ""
                                                            ) {
                                                                setData(
                                                                    "city",
                                                                    item.id
                                                                );
                                                            } else {
                                                                setData({
                                                                    ...data,
                                                                    city: item.id,
                                                                    place: "",
                                                                });
                                                            }
                                                        }}
                                                    >
                                                        {item.city}
                                                    </GoalsSelectInputItem>
                                                );
                                            })}
                                        </GoalsSelectInput>
                                        <GoalsSelectInput
                                            required={rules["place"]}
                                            show={showForm.place}
                                            setShow={(i) =>
                                                showFormHandler("place", i)
                                            }
                                            label="Lokasi Bimbingan"
                                            placeholder="Pilih Lokasi Bimbingan"
                                            data={
                                                data.place != ""
                                                    ? cities
                                                          .filter(
                                                              (item) =>
                                                                  item.id ==
                                                                  data.city
                                                          )[0]
                                                          .places.filter(
                                                              (item) =>
                                                                  item.id ==
                                                                  data.place
                                                          )[0].place
                                                    : ""
                                            }
                                        >
                                            {data.city != "" ? (
                                                cities
                                                    .filter(
                                                        (item) =>
                                                            item.id == data.city
                                                    )[0]
                                                    .places.map(
                                                        (item, index) => {
                                                            return (
                                                                <GoalsSelectInputItem
                                                                    key={index}
                                                                    onClick={() =>
                                                                        setData(
                                                                            "place",
                                                                            item.id
                                                                        )
                                                                    }
                                                                >
                                                                    {item.place}
                                                                </GoalsSelectInputItem>
                                                            );
                                                        }
                                                    )
                                            ) : (
                                                <GoalsSelectInputItem>
                                                    Pilih kota terlebih dahulu
                                                </GoalsSelectInputItem>
                                            )}
                                        </GoalsSelectInput>
                                    </>
                                ) : (
                                    <></>
                                )}
                                {"topic" in rules ? (
                                    topics.length ? (
                                        <GoalsSelectInput
                                            required={rules["topic"]}
                                            show={showForm.topic}
                                            setShow={(i) =>
                                                showFormHandler("topic", i)
                                            }
                                            label="Topik Bimbingan"
                                            placeholder="Pilih Topik Bimbingan"
                                            data={
                                                data.topic != ""
                                                    ? topics.filter(
                                                          (item) =>
                                                              item.id ==
                                                              data.topic
                                                      )[0].topic
                                                    : ""
                                            }
                                        >
                                            {topics.map((item, index) => {
                                                return (
                                                    <GoalsSelectInputItem
                                                        key={index}
                                                        onClick={() =>
                                                            setData(
                                                                "topic",
                                                                item.id
                                                            )
                                                        }
                                                    >
                                                        {item.topic}
                                                    </GoalsSelectInputItem>
                                                );
                                            })}
                                        </GoalsSelectInput>
                                    ) : (
                                        <></>
                                    )
                                ) : (
                                    <></>
                                )}
                                {availableAddOn.length ? (
                                    <GoalsSelectMultipleInput
                                        show={showForm.addOn}
                                        setShow={(i) => {
                                            if (
                                                !(
                                                    data.add_on.every(
                                                        (i) =>
                                                            temp.add_on.filter(
                                                                (j) =>
                                                                    j.id == i.id
                                                            ).length
                                                    ) &&
                                                    temp.add_on.every(
                                                        (i) =>
                                                            data.add_on.filter(
                                                                (j) =>
                                                                    j.id == i.id
                                                            ).length
                                                    )
                                                )
                                            ) {
                                                setTemp("add_on", data.add_on);
                                            }
                                            showFormHandler("addOn", i);
                                        }}
                                        label="Add-On"
                                        placeholder="Tambah Add-On"
                                        data={data.add_on}
                                        onSubmit={() => {
                                            if (
                                                !(
                                                    data.add_on.length == 0 &&
                                                    temp.add_on.length == 0
                                                ) &&
                                                !(
                                                    data.add_on.every(
                                                        (i) =>
                                                            temp.add_on.filter(
                                                                (j) =>
                                                                    j.id == i.id
                                                            ).length
                                                    ) &&
                                                    temp.add_on.every(
                                                        (i) =>
                                                            data.add_on.filter(
                                                                (j) =>
                                                                    j.id == i.id
                                                            ).length
                                                    )
                                                )
                                            ) {
                                                let addOnPrice = 0;
                                                if (temp.add_on.length) {
                                                    addOnPrice = temp.add_on
                                                        .map((i) =>
                                                            parseFloat(i.price)
                                                        )
                                                        .reduce(
                                                            (total, i) =>
                                                                parseFloat(
                                                                    total
                                                                ) +
                                                                parseFloat(i)
                                                        );
                                                } else {
                                                    addOnPrice = 0;
                                                }
                                                let adminFee = 0;
                                                if (
                                                    data.purchase_method != ""
                                                ) {
                                                    if (
                                                        parseInt(
                                                            data.purchase_method
                                                                .is_price
                                                        )
                                                    ) {
                                                        adminFee = parseFloat(
                                                            data.purchase_method
                                                                .admin_fee
                                                        );
                                                    } else {
                                                        adminFee = Math.ceil(
                                                            ((parseFloat(
                                                                data.init_price
                                                            ) -
                                                                parseFloat(
                                                                    data.discount
                                                                ) +
                                                                addOnPrice) *
                                                                parseFloat(
                                                                    data
                                                                        .purchase_method
                                                                        .admin_fee
                                                                )) /
                                                                100
                                                        );
                                                    }
                                                }
                                                const totalPrice =
                                                    parseFloat(
                                                        data.init_price
                                                    ) -
                                                    parseFloat(data.discount) +
                                                    addOnPrice +
                                                    adminFee;
                                                setData({
                                                    ...data,
                                                    add_on: temp.add_on,
                                                    add_on_price: addOnPrice,
                                                    admin: adminFee,
                                                    total_price: totalPrice,
                                                });
                                            }
                                        }}
                                    >
                                        {availableAddOn.map((item, index) => {
                                            return (
                                                <GoalsSelectMultipleInputItem
                                                    key={index}
                                                    checked={
                                                        temp.add_on.filter(
                                                            (i) =>
                                                                i.id == item.id
                                                        ).length
                                                    }
                                                    onClick={() => {
                                                        if (
                                                            temp.add_on.filter(
                                                                (i) =>
                                                                    i.id ==
                                                                    item.id
                                                            ).length
                                                        ) {
                                                            setTemp(
                                                                "add_on",
                                                                temp.add_on.filter(
                                                                    (i) =>
                                                                        i.id !=
                                                                        item.id
                                                                )
                                                            );
                                                        } else {
                                                            const tempAddOn =
                                                                temp.add_on.slice();
                                                            tempAddOn.push(
                                                                item
                                                            );
                                                            setTemp(
                                                                "add_on",
                                                                tempAddOn
                                                            );
                                                        }
                                                    }}
                                                >
                                                    {item.name +
                                                        " - IDR " +
                                                        currency.format(
                                                            item.price
                                                        )}
                                                </GoalsSelectMultipleInputItem>
                                            );
                                        })}
                                    </GoalsSelectMultipleInput>
                                ) : (
                                    <></>
                                )}
                            </div>
                        )}
                        {"document" in rules ? (
                            <div className="w-full">
                                <GoalsUploadFile
                                    required={rules.document}
                                    label="Berkas Pendukung"
                                    data={data.document}
                                    fileLimit={
                                        dataProduct.contact_type == "other"
                                            ? 1
                                            : 3
                                    }
                                    removeFile={(i) => {
                                        setData({
                                            ...data,
                                            document: data.document.filter(
                                                (j) => j != i
                                            ),
                                        });
                                    }}
                                    setData={(i) => {
                                        setData({
                                            ...data,
                                            document: data.document.concat(i),
                                        });
                                    }}
                                    placeholder={
                                        <p className="text-black">
                                            Pilih file skripsi mu atau <br />{" "}
                                            seret dan lepas di sini
                                        </p>
                                    }
                                />
                            </div>
                        ) : (
                            <></>
                        )}
                    </div>
                    <div className="fixed bottom-0 w-full bg-white md:hidden rounded-t-[4vw] border-t-1 border-gray-300 py-[4vw]">
                        <div className="container mx-auto flex justify-between">
                            <div className="flex flex-col justify-center gap-[1vw]">
                                <p className="text-[3vw] font-medium">Total</p>
                                <span className="text-[4.5vw] text-secondary font-bold">
                                    IDR {currency.format(data.total_price)}
                                </span>
                            </div>
                            <GoalsButton
                                className="rounded-[2vw] w-4/12"
                                isActive={
                                    "document" in rules
                                        ? rules["document"]
                                            ? !(
                                                  data["document"].length ==
                                                      0 ||
                                                  Object.keys(
                                                      Object.fromEntries(
                                                          Object.entries(
                                                              rules
                                                          ).filter(
                                                              ([, value]) =>
                                                                  value
                                                          )
                                                      )
                                                  )
                                                      .map((i) => data[i])
                                                      .includes("")
                                              )
                                            : !Object.keys(
                                                  Object.fromEntries(
                                                      Object.entries(
                                                          rules
                                                      ).filter(
                                                          ([, value]) => value
                                                      )
                                                  )
                                              )
                                                  .map((i) => data[i])
                                                  .includes("")
                                        : !Object.keys(
                                              Object.fromEntries(
                                                  Object.entries(rules).filter(
                                                      ([, value]) => value
                                                  )
                                              )
                                          )
                                              .map((i) => data[i])
                                              .includes("")
                                }
                                onClick={() => setShowMobileSummaryCard(true)}
                            >
                                Beli
                            </GoalsButton>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function SummaryCard({
    userProfile,
    setUserProfile,
    showMobile,
    setShowMobile,
    dataProduct,
    data,
    setData,
    temp,
    setTemp,
    purchaseMethods,
    promoHandler,
    totalPrice,
    submit,
    isProcessed,
    rules,
}) {
    const [showPromoForm, setShowPromoForm] = useState(false);
    const [showPurchaseMethodForm, setShowPurchaseMethodForm] = useState(false);
    const [showLengkapiProfilForm, setShowLengkapiProfilForm] = useState(false);
    const currency = Intl.NumberFormat("id-ID");
    return (
        <>
            <div
                className={`fixed top-0 bottom-0 right-0 md:static w-full h-screen md:h-fit md:w-[30%] flex flex-col bg-white md:ms-[2vw] gap-[4vw] md:gap-[2vw] duration-500 ${
                    showMobile ? "" : "translate-x-full"
                } md:translate-x-0 md:text-[.9vw] overflow-auto`}
            >
                <div className="relative h-screen md:h-fit border-1 md:rounded-[1vw] pt-[20vw] md:p-[1.75vw] overflow-auto md:overflow-hidden">
                    <div className="md:hidden shadow-md">
                        <span
                            className="container mx-auto flex items-center gap-[2vw] font-medium font-poppins py-[4vw]"
                            onClick={() => setShowMobile(false)}
                        >
                            <FiChevronLeft className="text-[5vw]" /> Kembali
                        </span>
                    </div>
                    <div className="md:hidden shadow-md py-[4vw]">
                        <div className="container mx-auto space-y-[4vw]">
                            <div className="flex items-center gap-[4vw]">
                                <div className="w-5/12 rounded-[2vw] overflow-hidden">
                                    <img
                                        className="w-full h-full object-cover"
                                        src={
                                            "/storage/" +
                                            dataProduct.product_image
                                        }
                                        alt=""
                                    />
                                </div>
                                <div className="w-full">
                                    <p className="font-semibold text-secondary text-[3vw]">
                                        Bimbingan Skripsi
                                    </p>
                                    <p className="font-semibold pt-[3vw]">
                                        {dataProduct.name}
                                    </p>
                                    <p className="font-medium text-gray-400 text-[3.5vw]">
                                        IDR {currency.format(dataProduct.price)}
                                    </p>
                                </div>
                            </div>
                            {Object.keys(userProfile)
                                .map((i) => userProfile[i])
                                .includes("") ||
                            Object.keys(userProfile)
                                .map((i) => userProfile[i])
                                .includes(null) ? (
                                <ExpandedButton
                                    className="rounded-[2vw] border-1 border-blue-500 p-[4vw]"
                                    textClassName="text-[3vw]"
                                    iconClassName="text-blue-500"
                                    onClick={() =>
                                        setShowLengkapiProfilForm(true)
                                    }
                                >
                                    Yuk, lengkapin profilnya agar bisa
                                    transaksi!
                                </ExpandedButton>
                            ) : (
                                <></>
                            )}
                        </div>
                    </div>
                    <div className="container md:w-full mx-auto overflow-auto pb-[24vw] md:pb-0">
                        <div className="flex flex-col-reverse md:flex-col gap-[4vw] md:gap-0">
                            <ExpandedButton
                                className={`md:hidden rounded-[2vw] md:rounded-[.4vw] h-[12.5vw] md:h-[3.1vw] border-1 border-light-grey`}
                                textClassName="font-normal"
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
                            <GoalsButton
                                className={`justify-center md:justify-between gap-[4vw] md:gap-0 rounded-[2vw] md:rounded-[.4vw] h-[12.5vw] md:h-[3.1vw] mb-[1.5vw] px-[1vw]`}
                                activeClassName="bg-green-50 text-green-500"
                                textClassName="font-normal"
                                onClick={
                                    () => {
                                        if (
                                            Object.keys(userProfile)
                                                .map((i) => userProfile[i])
                                                .includes("") ||
                                            Object.keys(userProfile)
                                                .map((i) => userProfile[i])
                                                .includes(null)
                                        ) {
                                            toast("Lengkapi profil terlebih dahulu!", {
                                                position: "top-center",
                                                icon: "⚠️",
                                            });
                                            window.scrollTo(0, 0);
                                        } else {
                                            setShowPromoForm(!showPromoForm)
                                        }
                                    }
                                }
                            >
                                <BiSolidDiscount className="text-[4.8vw] md:text-[1.2vw]" />
                                <span>
                                    {data.discount > 0
                                        ? "Promo Terpakai"
                                        : "Masukkan Kode Promo"}
                                </span>
                                <FaChevronRight className="hidden md:inline-block" />
                            </GoalsButton>
                            <div>
                                <h5 className="font-semibold my-[1.5vw] md:mb-[.5vw] text-[3.7vw] md:text-[1vw]">
                                    Deskripsi Pesanan
                                </h5>
                                <table className="w-full border-separate border-spacing-y-[3vw] md:border-spacing-y-[.5vw] text-gray-500 my-1">
                                    <tbody>
                                        <tr>
                                            <td className="w-1/2">
                                                {dataProduct.name}
                                            </td>
                                            <td className="font-bold text-right">
                                                {data.init_price > 0
                                                    ? `IDR ${currency.format(
                                                          data.init_price
                                                      )}`
                                                    : "IDR 0"}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Promo</td>
                                            <td className="font-bold text-right">
                                                {currency.format(
                                                    data.discount
                                                ) > 0
                                                    ? `IDR -${currency.format(
                                                          data.discount
                                                      )}`
                                                    : "IDR 0"}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Biaya Admin</td>
                                            <td className="font-bold text-right">
                                                {currency.format(data.admin) > 0
                                                    ? `IDR ${currency.format(
                                                          data.admin
                                                      )}`
                                                    : "IDR 0"}
                                            </td>
                                        </tr>
                                        {data.add_on.map((item, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>{item.name}</td>
                                                    <td className="font-bold text-right">
                                                        IDR{" "}
                                                        {currency.format(
                                                            item.price
                                                        )}
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                            <hr className="mt-[.5vw] mb-[1vw]" />
                            <div className="hidden md:flex justify-between items-center font-poppins mb-[1.25vw]">
                                <p className="font-semibold text-[3vw] md:text-[1vw] text-black">
                                    Total
                                </p>
                                <h2 className="font-semibold text-secondary md:text-[1.3vw] text-right">
                                    IDR {currency.format(totalPrice)}
                                </h2>
                            </div>
                            <div className="hidden md:grid gap-[4vw] md:gap-[1.25vw]">
                                <ExpandedButton
                                    className={`rounded-[.8vw] md:rounded-[.4vw] h-[9vw] md:h-[3.1vw] border-1 border-light-grey`}
                                    textClassName="font-normal"
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
                        <div className="hidden md:flex justify-between items-center mt-[4vw] md:mt-0">
                            <div className="md:hidden">
                                <p className="mb-[1vw]">Total pembelian</p>
                                <p className="font-poppins text-secondary font-bold text-[5.25vw]">
                                    IDR {currency.format(totalPrice)}
                                </p>
                            </div>
                            <GoalsButton
                                className="w-6/12 md:w-full mt-[1.25vw] xl:py-[1vw] rounded-[.5vw]"
                                isActive={
                                    "document" in rules
                                        ? rules["document"]
                                            ? !(
                                                  data["purchase_method"] ==
                                                      "" ||
                                                  data["document"].length ==
                                                      0 ||
                                                  Object.keys(
                                                      Object.fromEntries(
                                                          Object.entries(
                                                              rules
                                                          ).filter(
                                                              ([, value]) =>
                                                                  value
                                                          )
                                                      )
                                                  )
                                                      .map((i) => data[i])
                                                      .includes("")
                                              )
                                            : !(
                                                  data["purchase_method"] ==
                                                      "" ||
                                                  Object.keys(
                                                      Object.fromEntries(
                                                          Object.entries(
                                                              rules
                                                          ).filter(
                                                              ([, value]) =>
                                                                  value
                                                          )
                                                      )
                                                  )
                                                      .map((i) => data[i])
                                                      .includes("")
                                              )
                                        : !(
                                              data["purchase_method"] == "" ||
                                              Object.keys(
                                                  Object.fromEntries(
                                                      Object.entries(
                                                          rules
                                                      ).filter(
                                                          ([, value]) => value
                                                      )
                                                  )
                                              )
                                                  .map((i) => data[i])
                                                  .includes("")
                                          )
                                }
                                isLoading={isProcessed}
                                onClick={submit}
                            >
                                Bayar Sekarang
                            </GoalsButton>
                        </div>
                    </div>
                    <div className="fixed w-full bottom-0 md:hidden rounded-t-[4vw] border-t-1 bg-white border-gray-300 py-[4vw]">
                        <div className="container mx-auto flex justify-between">
                            <div className="flex flex-col justify-center gap-[1vw]">
                                <p className="text-[3vw] font-medium">Total</p>
                                <span className="text-[4.5vw] text-secondary font-bold">
                                    IDR {currency.format(totalPrice)}
                                </span>
                            </div>
                            <GoalsButton
                                className="rounded-[2vw] w-4/12"
                                isActive={data.purchase_method != ""}
                                isLoading={isProcessed}
                                onClick={submit}
                            >
                                Beli
                            </GoalsButton>
                        </div>
                    </div>
                </div>
            </div>
            {createPortal(
                <>
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
                    {Object.keys(userProfile)
                        .map((i) => userProfile[i])
                        .includes("") ||
                    Object.keys(userProfile)
                        .map((i) => userProfile[i])
                        .includes(null) ? (
                        <LengkapiProfilForm
                            userProfile={userProfile}
                            setUserProfile={setUserProfile}
                            show={showLengkapiProfilForm}
                            setShow={setShowLengkapiProfilForm}
                            data={data}
                            setData={setData}
                            toast={toast}
                        />
                    ) : (
                        <></>
                    )}
                </>, document.body
            )}
        </>
    );
}

const LengkapiProfilAlert = ({
    isLogin,
    userProfile,
    setUserProfile,
    setPurchaseData,
}) => {
    const [showLengkapiProfilForm, setShowLengkapiProfilForm] = useState(false);
    return (
        <div className="hidden md:block">
            <LengkapiProfilForm
                isLogin={isLogin}
                userProfile={userProfile}
                setUserProfile={setUserProfile}
                setPurchaseData={setPurchaseData}
                show={showLengkapiProfilForm}
                setShow={setShowLengkapiProfilForm}
                toast={toast}
            />

            <div className="border-1 md:rounded-[1vw] md:p-[1.75vw] h-fit bg-info-10 flex justify-between items-center animate-bounce-sm">
                <div className="flex items-center gap-[1vw]">
                    <FiInfo className="text-[2vw] text-info-50" />
                    <span className="font-semibold md:text-[.83vw]">
                        Yuk, lengkapin profilnya agar bisa transaksi !
                    </span>
                </div>
                <button
                    className="flex items-center bg-info-50 hover:bg-info-30 rounded-[0.4vw] px-[1.6vw] py-[0.6vw] text-[.8vw] text-white"
                    onClick={() => setShowLengkapiProfilForm(true)}
                >
                    Lengkapi Profil
                </button>
            </div>
        </div>
    );
};
