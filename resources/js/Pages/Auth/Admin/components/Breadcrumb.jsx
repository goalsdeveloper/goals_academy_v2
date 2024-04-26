import { Link } from "@inertiajs/react";
import React from "react";
import { FiChevronRight } from "react-icons/fi";

const Breadcrumb = ({ level = 2, except, isLastHidden = false }) => {
    const pathArray = location.pathname.split("/");
    const pathArrayBr = isSlug
        ? pathArray.slice(-level - 1, -2).concat(pathArray.slice(-1))
        : isLastHidden
        ? pathArray.slice(-level, -1)
        : pathArray.slice(-level);
    const sisaArr = pathArray.slice(0, pathArray.length - level);

    const linkUrl = isSlug ? sisaArr.join("/") + "/" + pathArrayBr.slice(2) : sisaArr.join("/") + "/" + pathArrayBr[0]


    return (
        <div className="flex items-center font-medium text-neutral-50">
            {pathArrayBr.map((path, index) => {
                return (
                    <React.Fragment key={index}>
                        {index < pathArrayBr.length - 1 ? (
                            <Link
                                key={index}
                                className="flex items-center text-[1.25vw]"
                                href={linkUrl}
                            >
                                {path.charAt(0).toUpperCase() + path.slice(1)}
                                {index < pathArrayBr.length - 1 && (
                                    <span>
                                        <FiChevronRight />
                                    </span>
                                )}
                            </Link>
                        ) : (
                            <span className="flex items-center text-[1.25vw] text-black">
                                {path.charAt(0).toUpperCase() + path.slice(1)}
                                {index < pathArrayBr.length - 1 && (
                                    <FiChevronRight />
                                )}
                            </span>
                        )}
                    </React.Fragment>
                );
            })}
        </div>
    );
};

export default Breadcrumb;
