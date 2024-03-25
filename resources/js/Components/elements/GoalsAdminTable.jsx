import { Link } from "@inertiajs/react";
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import { FiCheckCircle, FiEdit2, FiEye, FiTrash2 } from "react-icons/fi";
import { RxCaretDown, RxCaretSort, RxCaretUp } from "react-icons/rx";
import GoalsTextInput from "./GoalsTextInput";

const GoalsAdminTable = () => {
    const columnHelper = createColumnHelper();

    const [sorting, setSorting] = useState([]);

    const columns = [
        columnHelper.accessor("checkbox", {
            enableSorting: false,
            header: () => <input type="checkbox" name="" id="" />,
            cell: (info) => <input type="checkbox" name="" id="" />,
        }),
        columnHelper.accessor("gambar", {
            enableSorting: false,
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
            enableSorting: false,
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
            enableSorting: false,
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
        state: {
            sorting,
        },
        debugTable: true,
        getCoreRowModel: getCoreRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
    });
    return (
        <div className="bg-white border w-full rounded-[.8vw] pt-[3.3vw] pb-[5.5vw] md:p-[3.3vw] space-y-[5.5vw] md:space-y-[1.6vw]">
            <GoalsTextInput placeholder="🔍 Search" />

            <table className="w-full">
                <thead>
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

                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <th
                                        key={header.id}
                                        colSpan={header.colSpan}
                                        className="text-start px-[1.2vw] py-[.5vw] bg-[#F8F8FC]"
                                    >
                                        {header.isPlaceholder ? null : (
                                            <div
                                                className={`${
                                                    header.column.getCanSort()
                                                        ? "cursor-pointer select-none"
                                                        : ""
                                                } flex items-center justify-between`}
                                                onClick={header.column.getToggleSortingHandler()}
                                                title={
                                                    header.column.getCanSort()
                                                        ? header.column.getNextSortingOrder() ===
                                                          "asc"
                                                            ? "Sort ascending"
                                                            : header.column.getNextSortingOrder() ===
                                                              "desc"
                                                            ? "Sort descending"
                                                            : "Clear sort"
                                                        : undefined
                                                }
                                            >
                                                {flexRender(
                                                    header.column.columnDef
                                                        .header,
                                                    header.getContext()
                                                )}
                                                {!header.column.getIsSorted() && header.column.getCanSort() && (
                                                    <RxCaretSort />
                                                )}
                                                {{
                                                    asc: <RxCaretUp />,
                                                    desc: <RxCaretDown />,
                                                }[
                                                    header.column.getIsSorted()
                                                ] ?? null}
                                            </div>
                                        )}
                                    </th>
                                );
                            })}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map((row) => (
                        <>
                            {row.id == 0 && (
                                <td
                                    colSpan={99}
                                    className="w-full py-[.5vw] px-[.8vw] bg-primary-10 h6 font-medium"
                                >
                                    Sekali Pertemuan
                                </td>
                            )}

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
                        </>
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
        harga: 100000,
    },
    {
        id: 2,
        gambar: "https://via.placeholder.com/150",
        nama: "Product 2",
        visibilitas: true,
        harga: 200000,
    },
    {
        id: 3,
        gambar: "https://via.placeholder.com/150",
        nama: "Product 3",
        visibilitas: true,
        harga: 300000,
    },
    {
        id: 4,
        gambar: "https://via.placeholder.com/150",
        nama: "Product 4",
        visibilitas: true,
        harga: 400000,
    },
    {
        id: 5,
        gambar: "https://via.placeholder.com/150",
        nama: "Product 5",
        visibilitas: true,
        harga: 500000,
    },
    {
        id: 6,
        gambar: "https://via.placeholder.com/150",
        nama: "Product 6",
        visibilitas: true,
        harga: 600000,
    },
    {
        id: 7,
        gambar: "https://via.placeholder.com/150",
        nama: "Product 7",
        visibilitas: true,
        harga: 700000,
    },
    {
        id: 8,
        gambar: "https://via.placeholder.com/150",
        nama: "Product 8",
        visibilitas: true,
        harga: 800000,
    },
    {
        id: 9,
        gambar: "https://via.placeholder.com/150",
        nama: "Product 9",
        visibilitas: true,
        harga: 900000,
    },
    {
        id: 10,
        gambar: "https://via.placeholder.com/150",
        nama: "Product 10",
        visibilitas: true,
        harga: 1000000,
    },
];
