import wave1 from "/resources/img/vector/wave-1.svg";
import wave2 from "/resources/img/vector/wave-2.svg";

export default function CornerWaveVector ({ className, cornerClassName, rightCornerClassName, leftCornerClassName }) {
    return (
        <div className={`select-none ${className}`}>
            <img className={`absolute bottom-0 left-0 ${cornerClassName} ${rightCornerClassName}`} src={wave1} />
            <img className={`absolute bottom-0 left-0 ${cornerClassName} ${rightCornerClassName}`} src={wave2} />
            <img className={`absolute top-0 right-0 -scale-x-1 -scale-y-1 ${cornerClassName} ${leftCornerClassName}`} src={wave1} />
            <img className={`absolute top-0 right-0 -scale-x-1 -scale-y-1 ${cornerClassName} ${leftCornerClassName}`} src={wave2} />
        </div>
    )
}
