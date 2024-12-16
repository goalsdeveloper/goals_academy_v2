import { useMediaQuery } from "react-responsive";
import image from "/resources/img/vector/gradient-bg-6.svg";
import imageMobile from "/resources/img/vector/gradient-bg-6-mobile.svg";

export default function TopBackground () {
    const isMobile = useMediaQuery({ query: "(max-width: 767px)" });

    return (
        <div className="absolute top-0 w-full -z-10">
            <img className="w-full" src={isMobile ? imageMobile : image} alt="Top Background" />
        </div>
    )
}