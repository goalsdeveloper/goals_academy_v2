import { MaterialReactTable, useMaterialReactTable } from "material-react-table";

export default function GoalsDataTable ({
    data,
    columns,
    options,
}) {
    const tableOptions = useMaterialReactTable({
        columns,
        data,
        enablePagination: false,
        muiTablePaperProps: {
            className: 'border-none rounded-[.625vw]',
            elevation: 0,
        },
        muiTableHeadCellProps: {
            sx: {
                fontFamily: "Poppins",
                fontWeight: 600,
                backgroundColor: "#F8F8FC",
            }
        },
        muiTableContainerProps: {
            className: "scrollbar-hidden",
        },
        ...options
    })

    return <MaterialReactTable table={tableOptions} />;
};
