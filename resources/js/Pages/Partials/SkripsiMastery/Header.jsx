import { Link } from "@inertiajs/react";
import logo from "/resources/img/icon/goals-1.svg";
import { useMediaQuery } from "react-responsive";
import GoalsButton from "@/Components/elements/GoalsButton";

export default function Header () {
    const isMobile = useMediaQuery({ query: "(max-width: 767px)" });

    return (
        <header 
            className={`${
                isMobile ? "shadow" : ""
            } overflow-y-visible w-full top-0 right-0 bg-transparent text-dark lg:text-base z-50`}
        >
            <nav className="w-[84.375%] mx-auto overflow-y-visible flex flex-nowrap items-center justify-between duration-500 h-[24.76vw] md:h-[7.7vw]">
                <div>
                    <Link href="/">
                        <img
                            className="w-full h-[6.31vw] md:h-[2vw] mb-1 md:mb-2"
                            src={logo}
                            alt="Goals Academy"
                        />
                    </Link>
                </div>
                <div>
                    <a href="#pricelist"><GoalsButton className="w-[30.9vw] md:w-auto text-[3.4vw] md:text-[1.04vw]">Amankan Harga</GoalsButton></a>
                </div>
            </nav>
        </header>
    )
}