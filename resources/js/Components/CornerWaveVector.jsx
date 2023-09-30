import wave1 from "/resources/img/vector/wave-1.svg";
import wave2 from "/resources/img/vector/wave-2.svg";

export default function CornerWaveVector ({ className, cornerClassName, rightCornerClassName, leftCornerClassName, corner2ClassName='hidden', right2CornerClassName, left2CornerClassName }) {
    return (
        <div className={`select-none ${className}`}>
            <img className={`absolute bottom-0 left-0 ${cornerClassName} ${rightCornerClassName}`} src={wave1} />
            <img className={`absolute bottom-0 left-0 ${cornerClassName} ${rightCornerClassName}`} src={wave2} />
            <img className={`absolute top-0 right-0 -scale-x-1 -scale-y-1 ${cornerClassName} ${leftCornerClassName}`} src={wave1} />
            <img className={`absolute top-0 right-0 -scale-x-1 -scale-y-1 ${cornerClassName} ${leftCornerClassName}`} src={wave2} />
            <img className={`absolute bottom-0 right-0 -scale-x-1 ${corner2ClassName} ${right2CornerClassName}`} src={wave1} />
            <img className={`absolute bottom-0 right-0 -scale-x-1 ${corner2ClassName} ${right2CornerClassName}`} src={wave2} />
            <img className={`absolute top-0 left-0 -scale-y-1 ${corner2ClassName} ${left2CornerClassName}`} src={wave1} />
            <img className={`absolute top-0 left-0 -scale-y-1 ${corner2ClassName} ${left2CornerClassName}`} src={wave2} />
        </div>
    )
}
