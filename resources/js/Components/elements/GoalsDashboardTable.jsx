import React from "react";
import {
    MaterialReactTable,
    useMaterialReactTable,
} from "material-react-table";
import GoalsTextInput from "./GoalsTextInput";
import { useState } from "react";
import { router } from "@inertiajs/react";

const GoalsDashboardTable = ({
    data,
    columns,
    isSortable = false,
    isDraggable = false,
    isPaginated = false,
    isHeadVisible = false,
    isSplitByCategory = false,
    isSearchable = true,
    className = "",
    keyword,
    setKeyword,
    onSearch,
}) => {
    const [tableData, setTableData] = useState(
        isSplitByCategory ? splitTableByCategory(data) : data
    );

    function splitTableByCategory(data) {
        if (isSplitByCategory) {
            return Object.entries(
                data.reduce((acc, item) => {
                    const { category: catData, ...rest } = item;
                    const category = catData?.name;

                    if (!acc[category]) {
                        acc[category] = [];
                    }
                    acc[category].push(item);
                    return acc;
                }, {})
            ).map(([kategori, items]) => ({
                kategori,
                items,
            }));
        }
    }

    function getOptionalConfig() {
        return {
            enableSorting: isSortable,
            enablePagination: isPaginated,
            enableBottomToolbar: isPaginated,
            enableRowDragging: isDraggable,
            enableRowOrdering: isDraggable,
            enableTableHead: isHeadVisible,
        };
    }

    const dummyTOptions = useMaterialReactTable(
        dummyTOptionsConfig({ columns, getOptionalConfig })
    );

    return (
        <div
            className={`bg-white border min-w-full rounded-[.8vw] p-[3.3vw] space-y-[5.5vw] md:space-y-[1.6vw] ${className}`}
        >
            {isSearchable && (
                <GoalsTextInput
                    placeholder="🔍 Search"
                    className=" md:max-w-[10.4vw] md:max-h-[2.4vw]"
                    data={keyword}
                    setData={(i) => {
                        setKeyword(i);
                        onSearch(i);
                    }}
                />
            )}
            <div className="text-[.8vw]">
                {isSplitByCategory && (
                    <MaterialReactTable table={dummyTOptions} />
                )}
                {isSplitByCategory ? (
                    tableData.map((data, i) => {
                        const dynamicTableOptions = useMaterialReactTable(
                            dataTableOptionsConfig({
                                columns,
                                getOptionalConfig,
                                data: data.items,
                                setData: (item) =>
                                    setTableData((prev) => {
                                        const existingIndex = prev.findIndex(
                                            (entry) =>
                                                entry.kategori === data.kategori
                                        );
                                        if (existingIndex !== -1) {
                                            const updatedData = [...prev];
                                            updatedData[existingIndex] = {
                                                kategori: data.kategori,
                                                items: item,
                                            };
                                            return updatedData;
                                        } else {
                                            return [
                                                {
                                                    kategori: data.kategori,
                                                    items: item,
                                                },
                                                ...prev,
                                            ];
                                        }
                                    }),
                            })
                        );
                        return (
                            <div key={i}>
                                {isSplitByCategory && (
                                    <div className="w-full py-[.5vw] px-[.8vw] bg-primary-10 h6 font-medium">
                                        {data.kategori}
                                    </div>
                                )}
                                <MaterialReactTable
                                    table={dynamicTableOptions}
                                />
                            </div>
                        );
                    })
                ) : (
                    <MaterialReactTable
                        table={useMaterialReactTable(
                            dataTableOptionsConfig({
                                columns,
                                data: tableData,
                                setData: (x) => setTableData([...x]),
                                getOptionalConfig,
                            })
                        )}
                    />
                )}
            </div>
        </div>
    );
};

export default GoalsDashboardTable;

const dummyTOptionsConfig = ({ columns, getOptionalConfig }) => {
    return {
        data: [],
        columns,
        ...getOptionalConfig(),
        enableTableHead: true,
        enableTopToolbar: false,
        enableColumnActions: false,
        enableBottomToolbar: false,
        muiTablePaperProps: {
            sx: {
                boxShadow: "none",
            },
        },
        muiTableBodyProps: {
            sx: {
                display: "none",
            },
        },
        muiTableHeadRowProps: {
            sx: {
                background: "#F8F8FC",
                borderRadius: ".4vw",
            },
        },
    };
};

const dataTableOptionsConfig = ({
    columns,
    data,
    setData,
    getOptionalConfig,
}) => {
    return {
        data,
        columns,
        ...getOptionalConfig(),
        enableTopToolbar: false,
        enableColumnActions: false,
        muiTablePaperProps: {
            sx: {
                boxShadow: "none",
            },
        },
        muiTableHeadRowProps: {
            sx: {
                background: "#F8F8FC",
                borderRadius: ".4vw",
            },
        },
        muiRowDragHandleProps: ({ table }) => ({
            onDragEnd: () => {
                const { draggingRow, hoveredRow } = table.getState();
                const dataPrevious = data;
                if (hoveredRow && draggingRow) {
                    const originItem = data[draggingRow.index];
                    const destinationItem = data[hoveredRow.index];
                    console.log(originItem, destinationItem)
                    // data.splice(
                    //     hoveredRow.index,
                    //     0,
                    //     data.splice(draggingRow.index, 1)[0]
                    // );
                    router.post(
                        route("admin.bimbingan.product.updateOrderNumber"),
                        {
                            origin_id: originItem.number_list,
                            destination_id: destinationItem.number_list,
                            category_id: originItem.category_id,
                        },
                        {
                            onSuccess: () => {
                                router.visit(
                                    route("admin.bimbingan.product.index"),
                                    {
                                        only: ["bimbingan"],
                                    }
                                );
                            },
                        }
                    );
                }
            },
        }),
    };
};
