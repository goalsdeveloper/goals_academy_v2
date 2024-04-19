import React from 'react';
import { Link } from '@inertiajs/react';
import { FiChevronRight } from 'react-icons/fi';

const Breadcrumb = ({ level = 2, except }) => {
    const pathArray = location.pathname.split("/");
    const pathArrayBr = pathArray.slice(-level);
    const sisaArr = pathArray.slice(0, pathArray.length - level);

    return (
        <div className="flex items-center font-medium text-neutral-50">
            {pathArrayBr.map((path, index) => {
                if (index != except) {
                    return (
                        <React.Fragment key={index}>
                            {index < pathArrayBr.length - 1 ? (
                                <Link
                                    key={index}
                                    className="flex items-center text-[1.25vw]"
                                    href={sisaArr.join("/") + "/" + pathArrayBr[0]}
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
                }
            })}
        </div>
    );
};

export default Breadcrumb
