import GoalsTextInput from "@/Components/elements/GoalsTextInput";
import FormSection from "../../components/layouts/FormSection";
import { SelectInput } from "./Components/SelectInput";
import { SelectMultiTag } from "./Components/SelectMultiTag";
import SliderButton from "./Components/SliderButton";
import sampleImage from "/resources/img/program/sample image.png";

const View = ({ products, categories }) => {
    const currency = Intl.NumberFormat("id-ID");

    const data = {
        name: products.name,
        product_image: products.product_image,
        slug: products.slug,
        category_id: categories.find((item) => item.id == products.category_id),
        description: products.description,
        excerpt: products.excerpt,
        price: products.price,
        promo_price: products.promo_price ?? "",
        total_meet: products.total_meet,
        active_period: products.active_period,
        duration: products.duration,
        add_on: products.add_ons ?? [],
        topics: products.topics ?? [],
        facilities:
            typeof products.facilities == "string"
                ? JSON.parse(products.facilities)
                : products.facilities,
        is_visible: products.is_visible == 1 ? true : false,
        form_config:
            typeof products.form_config == "object"
                ? products.form_config
                : products.form_config && JSON.parse(products.form_config),
        contact_type: products.contact_type,
    };

    const formConfigList = [
        { key: "city", label: "Kota" },
        // { key: "document", label: "Dokumen / Berkas" },
        { key: "place", label: "Lokasi" },
        { key: "schedule", label: "Jadwal" },
        { key: "topic", label: "Topik" },
    ];

    return (
        <>
            <form
                className="space-y-[1.6vw]"
                onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit();
                }}
            >
                <div className="flex gap-[1.2vw]">
                    <div className="flex flex-col w-full gap-[.8vw]">
                        <FormSection
                            className="border"
                            title="Details"
                            titleAction={
                                <SliderButton
                                    disabled
                                    label="Visibilitas"
                                    isOn={data.is_visible}
                                />
                            }
                        >
                            <div className="flex gap-[1.2vw]">
                                <div className="flex items-center justify-center w-[29vw] h-[11vw] aspect-square shadow-md rounded-[.5vw] overflow-hidden">
                                    <img src={data.product_image ? `/storage/${data.product_image}` : sampleImage} className={`w-full h-full object-cover ${data.product_image ? "" : "grayscale"}`} alt={data.product_image} />
                                </div>
                                <div className="w-full space-y-[1.2vw]">
                                    <GoalsTextInput
                                        label="Nama"
                                        data={data.name}
                                        setData={(e) =>
                                            setData({ ...data, name: e })
                                        }
                                        disabled
                                    />
                                    <GoalsTextInput
                                        label="Slug"
                                        data={data.slug}
                                        setData={(e) =>
                                            setData({ ...data, slug: e })
                                        }
                                        disabled
                                    />
                                </div>
                            </div>

                            <SelectInput
                                value={data.category_id.name}
                                label="Kategori"
                                disabled
                            ></SelectInput>

                            <SelectInput
                                value={data.contact_type}
                                filledClassName="capitalize"
                                label="Tipe kontak"
                                disabled
                            ></SelectInput>

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
                                    disabled
                                    onChange={(e) =>
                                        setData({
                                            ...data,
                                            description: e.target.value,
                                        })
                                    }
                                    className="disabled:bg-gray-100 disabled:border-gray-300 w-full h-[7.8vw] border border-neutral-50 text-[.83vw] rounded-[.4vw] px-[1.2vw] md:py-[1vw] resize-none "
                                ></textarea>
                            </div>
                        </FormSection>

                        <FormSection className="border" title="Harga">
                            <div className="flex gap-[1.2vw]">
                                <GoalsTextInput
                                    label="Harga"
                                    disabled
                                    grow
                                    data={data.price}
                                />
                                <GoalsTextInput
                                    label="Diskon Gimmick (Opsional)"
                                    disabled
                                    grow
                                    data={data.promo_price}
                                />
                            </div>
                        </FormSection>
                    </div>

                    <div className="flex flex-col w-full gap-[.8vw]">
                        <FormSection className="border" title="Informasi">
                            <div className="grid grid-cols-2 gap-[1.2vw]">
                                <GoalsTextInput
                                    label="Total Pertemuan"
                                    disabled
                                    data={data.total_meet}
                                />
                                <GoalsTextInput
                                    label="Durasi Pertemuan"
                                    disabled
                                    data={data.duration}
                                />
                            </div>
                            <GoalsTextInput
                                label="Durasi Private Chat"
                                disabled
                                data={data.active_period}
                            />
                            <SelectMultiTag
                                disabled
                                value={data.add_on}
                                label="Add on"
                            ></SelectMultiTag>

                            <SelectMultiTag
                                value={data.topics}
                                label="Topik"
                                disabled
                            ></SelectMultiTag>
                        </FormSection>

                        <FormSection
                            className="border"
                            title="Fasilitas Program"
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
                                            className="flex gap-[.4vw] items-center group cursor-pointer border border-secondary rounded-full py-[.25vw] px-[.5vw]"
                                        >
                                            <i
                                                className={`${item.icon} text-secondary text-center w-[1vw]`}
                                            ></i>
                                            <p>{item.text}</p>
                                        </div>
                                    ))
                                )}
                            </div>
                        </FormSection>
                        <FormSection
                            className="border"
                            title="Opsi Formulir User"
                        >
                            <table className="">
                                <thead>
                                    <tr className="bg-[#F8F8FC]">
                                        <th className="w-full  py-[.5vw] px-[1.2vw] text-start font-semibold">
                                            Nama
                                        </th>
                                        <th className=" py-[.5vw] px-[1.2vw] font-semibold">
                                            Visibilitas
                                        </th>
                                        <th className=" py-[.5vw] px-[1.2vw] font-semibold">
                                            Wajib
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {formConfigList.map((item, i) => (
                                        <tr
                                            className="border-b border-neutral-20"
                                            key={i}
                                        >
                                            <td className="py-[.5vw] px-[1.2vw]">
                                                {item.label}
                                            </td>
                                            <td className="text-center">
                                                <input
                                                    disabled
                                                    type="checkbox"
                                                    name={item.key + "-visible"}
                                                    checked={data.form_config.hasOwnProperty(
                                                        item.key
                                                    )}
                                                />
                                            </td>
                                            <td className="text-center">
                                                <input
                                                    disabled
                                                    type="checkbox"
                                                    name={
                                                        item.key + "-required"
                                                    }
                                                    checked={
                                                        data.form_config[
                                                            item.key
                                                        ] == 1
                                                    }
                                                    onChange={(e) => {
                                                        setData({
                                                            ...data,
                                                            form_config: {
                                                                ...data.form_config,
                                                                [item.key]: e
                                                                    .target
                                                                    .checked
                                                                    ? 1
                                                                    : 0,
                                                            },
                                                        });
                                                    }}
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </FormSection>
                    </div>
                </div>
            </form>
        </>
    );
};

export default View;
