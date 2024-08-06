import { FaInstagram, FaLinkedinIn } from "react-icons/fa6";

export default function Tutor ({ items }) {
    return (
        <section id="tutor" className="mb-[3.4vw]">
            <h2 className="text-[2.5vw] text-black leading-[4vw] mb-[2.5vw]">Tutor yang Siap<br /><span className="text-primary">Membantu Kelulusanmu</span></h2>
            <div className="w-[60vw] flex gap-[1.67vw]">
                {items.map((item, index) => (
                    <Card key={index} {...item} />
                ))}
            </div>
        </section>
    )
}

function Card ({ name, title, img, linkedin, instagram, text }) {
    return (
        <div className="w-[18.75vw] border rounded-[1vw] bg-primary-10 py-[1.25vw] px-[1vw] space-y-[1.25vw]">
            {img 
                ? <img src={img} className="w-full h-[12.65vw] object-cover border rounded-[1vw] overflow-hidden" /> 
                : <div className="w-full h-[12.65vw] border rounded-[1vw] bg-white"></div>
            }
            <div>
                <h4 className="text-[1.04vw] mb-[.25vw]">{name}</h4>
                <p className="font-poppins text-[1.04vw]">{title}</p>
            </div>
            <div className="flex gap-[.5vw]">
                <a href={linkedin} className="border border-neutral-20 rounded-full p-[.5vw]"><FaLinkedinIn className="text-[1.25vw]" /></a>
                <a href={instagram} className="border border-neutral-20 rounded-full p-[.5vw]"><FaInstagram className="text-[1.25vw]" /></a>
            </div>
            <p className="text-[1.04vw]">{text}</p>
        </div>
    )
}