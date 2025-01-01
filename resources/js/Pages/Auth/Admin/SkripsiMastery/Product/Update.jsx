import DashboardLayout from "@/Layouts/DashboardLayout";
import React from "react";
import GoalsButton from "@/Components/elements/GoalsButton";
import GoalsTextInput from "@/Components/elements/GoalsTextInput";
import Breadcrumb from "../../components/Breadcrumb";
import FormSection from "../../components/layouts/FormSection";
import { useState } from "react";
import FacilityModal from "./Components/FacilityModal";
import SliderButton from "./Components/SliderButton";
import { SelectInput, SelectInputItem } from "./Components/SelectInput";
import {
    SelectMultiTag,
    SelectMultiTagItem,
} from "./Components/SelectMultiTag";
import { router, useForm } from "@inertiajs/react";
import toast from "react-hot-toast";
import { toSlug } from "@/script/utils";
import sampleImage from "/resources/img/program/sample image.png";

const Update = ({ auth, categories, topics, addons, products }) => {
    const [show, setShow] = useState(false);
    const currency = Intl.NumberFormat("id-ID");

    const { data, setData, post, transform } = useForm({
        name: products.name,
        product_image: products.product_image,
        slug: products.slug,
        category_id: categories.find((item) => item.id == products.category_id),
        description: products.description,
        excerpt: products.excerpt,
        price: products.price,
        promo_price: products.promo_price ?? "",
        add_on: products.add_ons ?? [],
        topics: products.topics ?? [],
        facilities:
            typeof products.facilities == "string"
                ? JSON.parse(products.facilities)
                : products.facilities,
        is_visible: products.is_visible == 1 ? true : false
    });

    function handleSubmit() {
        transform((data) => ({
            _method: "put",
            name: data.name,
            product_image: data.product_image.file ?? undefined,
            slug: data.slug,
            category_id: Number(data.category_id.id),
            description: data.description,
            price: Number(data.price),
            promo_price: Number(data.promo_price),
            total_meet: data.total_meet,
            active_period: data.active_period,
            duration: data.duration,
            addons: JSON.stringify(data.add_on.map((item) => item.id)),
            topics: JSON.stringify(data.topics.map((item) => item.id)),
            facilities: JSON.stringify(data.facilities),
            is_visible: data.is_visible ? 1 : 0,
            is_facilities: 0,
            excerpt: data.description.substring(0, 128),
            form_config: JSON.stringify(data.form_config),
        }));

        post(route("admin.skripsi_mastery.product.update", products), {
            onSuccess: () => {
                toast.success("Product berhasil ditambahkan");
            },
            onError: (error) => {
                toast.error(error.message);
            },
        });
    }

    const formConfigList = [
        { key: "city", label: "Kota" },
        { key: "document", label: "Dokumen / Berkas" },
        { key: "place", label: "Lokasi" },
        { key: "schedule", label: "Jadwal" },
        { key: "topic", label: "Topik" },
    ];

    return (
        <DashboardLayout
            title="Skripsi Mastery"
            subtitle="Product"
            role="admin"
            auth={auth}
        >
            <FacilityModal
                show={show}
                setShow={setShow}
                data={data}
                setData={setData}
            />

            <form
                className="space-y-[1.6vw]"
                onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit();
                }}
            >
                <div className="flex justify-between">
                    <Breadcrumb isSlug />

                    <div className="space-x-[.8vw]">
                        <GoalsButton
                            onClick={() =>
                                router.visit(
                                    route("admin.skripsi_mastery.product.index")
                                )
                            }
                            size="sm"
                            variant="success-bordered"
                        >
                            Batal
                        </GoalsButton>
                        <GoalsButton
                            size="sm"
                            variant="success"
                            onClick={() => {}}
                            type="submit"
                            disabled={
                                !data.name ||
                                !data.category_id ||
                                !data.description ||
                                !data.price
                            }
                        >
                            Perbarui
                        </GoalsButton>
                    </div>
                </div>

                <div className="flex gap-[1.2vw]">
                    <div className="flex flex-col w-full gap-[.8vw]">
                        <FormSection
                            title="Details"
                            titleAction={
                                <SliderButton
                                    label="Visibilitas"
                                    onClick={() =>
                                        setData({
                                            ...data,
                                            is_visible: !data.is_visible,
                                        })
                                    }
                                    isOn={data.is_visible}
                                />
                            }
                        >
                            <input
                                type="file"
                                id="picture"
                                onChange={(e) => {
                                    setData({
                                        ...data,
                                        product_image: {
                                            url: e.target.value,
                                            file: e.target.files[0],
                                        },
                                    });
                                }}
                            />
                            <div className="flex gap-[1.2vw]">
                                <div className="w-[29vw]">
                                    <div className="flex items-center justify-center w-full h-[11vw] aspect-square shadow-md rounded-[.5vw] overflow-hidden">
                                        {typeof data.product_image ==
                                        "string" ? (
                                            <img
                                                src={
                                                    data.product_image
                                                        ? `/storage/${data.product_image}`
                                                        : sampleImage
                                                }
                                                className={`w-full h-full object-cover ${
                                                    data.product_image
                                                        ? ""
                                                        : "grayscale"
                                                }`}
                                                alt={data.product_image}
                                            />
                                        ) : (
                                            <img
                                                src={URL.createObjectURL(
                                                    data.product_image.file
                                                )}
                                                className={`w-full h-full object-cover ${
                                                    data.product_image
                                                        ? ""
                                                        : "grayscale"
                                                }`}
                                                alt={data.product_image.url}
                                            />
                                        )}
                                    </div>
                                    <small
                                        htmlFor="picture"
                                        className="text-red-500 text-[.83vw]"
                                    >
                                        *Ukuran foto (402 x 295 px)
                                    </small>
                                </div>
                                <div className="w-full space-y-[1.2vw]">
                                    <GoalsTextInput
                                        label="Nama"
                                        data={data.name}
                                        setData={(e) =>
                                            setData({
                                                ...data,
                                                name: e,
                                                slug: toSlug(e),
                                            })
                                        }
                                        required
                                    />
                                    <GoalsTextInput
                                        label="Slug"
                                        data={data.slug}
                                        disabled
                                        // setData={(e) =>
                                        //     setData({ ...data, slug: e })
                                        // }
                                    />
                                </div>
                            </div>

                            <SelectInput
                                value={data.category_id.name}
                                label="Kategori"
                                required
                            >
                                {categories.map((option, i) => (
                                    <SelectInputItem
                                        key={i}
                                        onClick={() =>
                                            setData({
                                                ...data,
                                                category_id: option,
                                            })
                                        }
                                    >
                                        {option.name}
                                    </SelectInputItem>
                                ))}
                            </SelectInput>

                            <div className="space-y-[.5vw]">
                                <label htmlFor="deskripsi">
                                    Deskripsi
                                    <sup className="text-danger text-[1vw] top-0">
                                        *
                                    </sup>
                                </label>
                                <textarea
                                    id="deskripsi"
                                    placeholder="Deskripsi singkat tentang program ini"
                                    value={data.description}
                                    required
                                    onChange={(e) => {
                                        setData({
                                            ...data,
                                            description: e.target.value,
                                        });
                                    }}
                                    className=" w-full h-[7.8vw] border border-neutral-50 text-[.83vw] rounded-[.4vw] px-[1.2vw] md:py-[1vw] resize-none "
                                ></textarea>
                            </div>
                        </FormSection>

                        <FormSection title="Harga">
                            <div className="flex gap-[1.2vw]">
                                <GoalsTextInput
                                    label="Harga"
                                    required
                                    grow
                                    data={data.price}
                                    setData={(e) =>
                                        setData({ ...data, price: e })
                                    }
                                />
                                <GoalsTextInput
                                    label="Diskon Gimmick (Opsional)"
                                    grow
                                    data={data.promo_price}
                                    setData={(e) =>
                                        setData({ ...data, promo_price: e })
                                    }
                                />
                            </div>
                        </FormSection>
                    </div>

                    <div className="flex flex-col w-full gap-[.8vw]">

                        <FormSection
                            title="Fasilitas Program"
                            titleAction={
                                <GoalsButton
                                    size="sm"
                                    onClick={() => setShow(!show)}
                                >
                                    Tambah
                                </GoalsButton>
                            }
                        >
                            <div className="flex flex-wrap gap-x-[.5vw] gap-y-[1vw]">
                                {data.facilities.length == 0 ? (
                                    <p className="text-[.83vw] w-full text-center">
                                        Belum diatur
                                    </p>
                                ) : (
                                    data.facilities.map((item) => (
                                        <div
                                            key={item.icon}
                                            className="flex gap-[.6vw] items-center group hover:bg-neutral-20 cursor-pointer border border-secondary rounded-full py-[.25vw] px-[.5vw]"
                                        >
                                            <i
                                                className={`${item.icon} text-secondary text-center w-[1vw]`}
                                            ></i>
                                            <p>{item.text}</p>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setData({
                                                        ...data,
                                                        facilities:
                                                            data.facilities.filter(
                                                                (i) => i != item
                                                            ),
                                                    });
                                                }}
                                            >
                                                <i className="transition-all opacity-0 fa-solid fa-xmark group-hover:opacity-100"></i>
                                            </button>
                                        </div>
                                    ))
                                )}
                            </div>
                        </FormSection>
                    </div>
                </div>
            </form>
        </DashboardLayout>
    );
};

export default Update;
