import { router } from "@inertiajs/react";
import { MenuItem, Select } from "@mui/material";

const BottomPaginationTable = ({
    from,
    to,
    total,
    pages,
    per_page,
    current_page,
    keyword,
}) => {
    return (
        <div className="flex items-center justify-between mt-8 text-[.8vw]">
            <p className="text-[.8vw] text-neutral-50">
                Showing {from} to {to} of {total} results
            </p>
            <div className="flex items-center gap-[1.6vw]">
                {console.log(pages)}
                {pages?.map((link, index) => (
                    <button
                        key={index}
                        className="text-[.8vw] text-neutral-60 "
                        disabled={link.url == null}
                        onClick={() =>
                            router.get(
                                link.url +
                                    (keyword != null
                                        ? `&search=${keyword}`
                                        : "") +
                                    "&perPage=" +
                                    new URLSearchParams(
                                        window.location.search
                                    ).get("perPage") ?? ""
                            )
                        }
                    >
                        <div
                            dangerouslySetInnerHTML={{
                                __html: link.label,
                            }}
                            className={`
                                            ${
                                                link.label == current_page &&
                                                "font-semibold text-secondary"
                                            }`}
                        />
                    </button>
                ))}
            </div>
            <div className="text-neutral-50">
                Items per page&emsp;
                <Select value={per_page}>
                    {[10, 15, 20, 25, 50].map((item) => (
                        <MenuItem
                            key={item}
                            value={item}
                            onClick={() => {
                                router.get(
                                    route(
                                        "moderator.bimbingan.progress.index"
                                    ) +
                                        (`?perPage=${item}` ||
                                            new URLSearchParams(
                                                window.location.search
                                            ).get("perPage"))
                                );
                            }}
                        >
                            {item}
                        </MenuItem>
                    ))}
                </Select>
            </div>
        </div>
    );
};

export default BottomPaginationTable;
