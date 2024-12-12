import image from "/resources/img/vector/gradient-bg-6.svg";

export default function TopBackground () {
    return (
        <div className="absolute top-0 w-full -z-10">
            <img src={image} alt="Top Background" />
        </div>
    )
}