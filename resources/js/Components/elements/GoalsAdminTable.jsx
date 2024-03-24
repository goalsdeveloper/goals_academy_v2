import { Link } from "@inertiajs/react";
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table";
import {
    FiCheckCircle,
    FiEdit2,
    FiEye,
    FiTrash2
} from "react-icons/fi";
import GoalsTextInput from "./GoalsTextInput";

const GoalsAdminTable = () => {
    const columnHelper = createColumnHelper();

    const columns = [
        columnHelper.accessor("checkbox", {
            header: () => <input type="checkbox" name="" id="" />,
            cell: (info) => <input type="checkbox" name="" id="" />,
        }),
        columnHelper.accessor("gambar", {
            header: () => "Gambar",
            cell: (info) => (
                <img
                    src={info.getValue()}
                    alt="thumbnail-product"
                    className="w-[3.6vw] h-[2.6vw] rounded-[.3vw]"
                />
            ),
        }),
        columnHelper.accessor("nama", {
            header: () => "Nama",
            cell: (info) => info.getValue(),
        }),
        columnHelper.accessor("visibilitas", {
            header: () => "Visibilitas",
            cell: (info) => (
                <FiCheckCircle className="text-success-50 text-[1.2vw]" />
            ),

        }),
        columnHelper.accessor("harga", {
            header: () => "Harga",
            cell: (info) => info.getValue(),
        }),
        columnHelper.accessor("action", {
            header: () => "",
            cell: (info) => (
                <ul className="flex gap-[.8vw]">
                    <li>
                        <Link href="/admin/product/edit">
                            <FiEdit2 className="text-[1.2vw] text-secondary" />
                        </Link>
                    </li>
                    <li>
                        <Link href="/admin/product/delete">
                            <FiTrash2 className="text-[1.2vw] text-danger-40" />
                        </Link>
                    </li>
                    <li>
                        <Link href="/admin/product/view">
                            <FiEye className="text-[1.2vw] text-neutral-60" />
                        </Link>
                    </li>
                </ul>
            ),
        }),
    ];

    const table = useReactTable({
        data,
        columns,
        debugTable: true,
        getCoreRowModel: getCoreRowModel(),
    });
    return (
        <div className="bg-white border w-full rounded-[.8vw] pt-[3.3vw] pb-[5.5vw] md:p-[3.3vw] space-y-[5.5vw] md:space-y-[1.6vw]">
            <GoalsTextInput placeholder="🔍 Search" />

            <table className="w-full">
                <thead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((column) => (
                                <th
                                    key={column.id}
                                    className="text-start px-[1.2vw] py-[.5vw]"
                                >
                                    {flexRender(
                                        column.column.columnDef.header,
                                        column.getContext()
                                    )}
                                </th>
                            ))}
                        </tr>
                    ))}
                    {/* <tr className="bg-[#F8F8FC]">
                        <th className="w-fit p-[.8vw]">
                        <input type="checkbox" name="" id="" />
                    </th>
                    <th className=" text-start px-[1.2vw] py-[.5vw]">
                        Nama Kategori
                    </th>
                    <th className=" text-start px-[1.2vw] py-[.5vw]">Parent</th>
                    <th className=" text-start px-[1.2vw] py-[.5vw]">
                        Visibilitas
                    </th>
                    <th className=" text-start px-[1.2vw] py-[.5vw]">
                        Tanggal Update
                    </th>
                    <th className=" text-start px-[1.2vw] py-[.5vw]"></th>

                        <th className="text-start px-[1.2vw] py-[.5vw]">
                            Nama Kategori
                        </th>
                    </tr> */}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map((row) => (
                        <tr key={row.id}>
                            {row.getVisibleCells().map((cell) => (
                                <td
                                    key={cell.id}
                                    className="border-b px-[1.2vw] py-[.5vw]"
                                >
                                    {flexRender(
                                        cell.column.columnDef.cell,
                                        cell.getContext()
                                    )}
                                </td>
                            ))}
                        </tr>
                    ))}
                    {/* <tr>
                        <td className="w-fit border-b text-center p-[.8vw]">
                        <input type="checkbox" name="" id="" />
                    </td>

                    <td className="border-b px-[1.2vw] py-[.5vw]">
                        Dibimbing Tuntas Offline
                    </td>
                    <td className="border-b px-[1.2vw] py-[.5vw]">
                        Dibimbing Tuntas
                    </td>
                    <td className="border-b px-[1.2vw] py-[.5vw]">
                        <FiCheckCircle className="text-success-50 text-[1.2vw]" />
                    </td>
                    <td className="border-b px-[1.2vw] py-[.5vw]">
                        08/12/2024
                    </td>
                    <td className="border-b px-[1.2vw] py-[.5vw]">
                        <ul className="flex gap-[.8vw]">
                            <li>
                                <FiEdit2 className="text-[1.2vw] text-secondary" />
                            </li>
                            <li>
                                <FiTrash2 className="text-[1.2vw] text-danger-40" />
                            </li>
                            <li>
                                <FiEye className="text-[1.2vw] text-neutral-60" />
                            </li>
                        </ul>
                    </td>
                    </tr> */}
                </tbody>
            </table>
        </div>
    );
};

export default GoalsAdminTable;

export const data = [
    {
        id: 1,
        gambar: "https://via.placeholder.com/150",
        nama: "Product 1",
        visibilitas: true,
        harga: "Rp 100.000",
    },
    {
        id: 2,
        gambar: "https://via.placeholder.com/150",
        nama: "Product 2",
        visibilitas: true,
        harga: "Rp 200.000",
    },
    {
        id: 3,
        gambar: "https://via.placeholder.com/150",
        nama: "Product 3",
        visibilitas: true,
        harga: "Rp 300.000",
    },
    {
        id: 4,
        gambar: "https://via.placeholder.com/150",
        nama: "Product 4",
        visibilitas: true,
        harga: "Rp 400.000",
    },
    {
        id: 5,
        gambar: "https://via.placeholder.com/150",
        nama: "Product 5",
        visibilitas: true,
        harga: "Rp 500.000",
    },
    {
        id: 6,
        gambar: "https://via.placeholder.com/150",
        nama: "Product 6",
        visibilitas: true,
        harga: "Rp 600.000",
    },
    {
        id: 7,
        gambar: "https://via.placeholder.com/150",
        nama: "Product 7",
        visibilitas: true,
        harga: "Rp 700.000",
    },
    {
        id: 8,
        gambar: "https://via.placeholder.com/150",
        nama: "Product 8",
        visibilitas: true,
        harga: "Rp 800.000",
    },
    {
        id: 9,
        gambar: "https://via.placeholder.com/150",
        nama: "Product 9",
        visibilitas: true,
        harga: "Rp 900.000",
    },
    {
        id: 10,
        gambar: "https://via.placeholder.com/150",
        nama: "Product 10",
        visibilitas: true,
        harga: "Rp 1.000.000",
    },
];
