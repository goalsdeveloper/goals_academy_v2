import wave3 from "/resources/img/vector/wave-3.svg";
import wave4 from "/resources/img/vector/wave-4.svg";

export default function CornerWaveVector2 ({ className, cornerClassName, rightCornerClassName, leftCornerClassName, corner2ClassName='hidden', right2CornerClassName, left2CornerClassName }) {
    return (
        <div className={`select-none  absolute top-0 bottom-0 left-0 right-0 ${className}`}>
            <img className={`absolute bottom-0 left-0 ${cornerClassName} ${leftCornerClassName}`} src={wave3} />
            <img className={`absolute bottom-0 left-0 ${cornerClassName} ${leftCornerClassName}`} src={wave4} />
            <img className={`absolute top-0 right-0 -scale-x-1 -scale-y-1 ${cornerClassName} ${rightCornerClassName}`} src={wave3} />
            <img className={`absolute top-0 right-0 -scale-x-1 -scale-y-1 ${cornerClassName} ${rightCornerClassName}`} src={wave4} />
            <img className={`absolute bottom-0 right-0 -scale-x-1 ${corner2ClassName} ${right2CornerClassName}`} src={wave3} />
            <img className={`absolute bottom-0 right-0 -scale-x-1 ${corner2ClassName} ${right2CornerClassName}`} src={wave4} />
            <img className={`absolute top-0 left-0 -scale-y-1 ${corner2ClassName} ${left2CornerClassName}`} src={wave3} />
            <img className={`absolute top-0 left-0 -scale-y-1 ${corner2ClassName} ${left2CornerClassName}`} src={wave4} />
        </div>
    )
}
