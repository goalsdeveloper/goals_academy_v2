import { useState } from "react";
import { TECollapse } from "tw-elements-react";
import figure from "/resources/img/figure/11.svg";
import { FaChevronDown } from "react-icons/fa6";

export default function FAQ ({ items }) {
    const [show, setShow] = useState(Array(items.length).fill(false))

    const toggleShow = (id) => {
        const temp = Array(items.length).fill(false)
        temp[id] = !show[id]
        setShow(temp)
    }

    return (
        <section id="faq" className="mb-[3.4vw]">
            <div className="flex items-center justify-end gap-[6.25vw] pe-[4.64vw] mb-[3.4vw]">
                <h2 className="text-[2.5vw] text-black leading-[4vw] mb-[2.5vw] text-right">Ada<br /><span className="text-primary">Pertanyaan?</span></h2>
                <img src={figure} alt="Figure 11" className="w-[20.83vw]" />
            </div>
            <div className="w-full space-y-[1vw]">
                {items.map((item, index) => {
                    if (index != items.length - 1) {
                        return (
                            <Item key={index} id={index} {...item} {...{show, toggleShow}} />
                        )
                    } else {
                        return (
                            <Item key={index} id={index} {...item} {...{show, toggleShow}} />
                        )
                    }
                })}
            </div>
        </section>
    )
}

function Item ({id, show, toggleShow, question, answer}) {
    const isExpanded = show[id]

    return (
        <>
            <button
            type="button"
            className="w-full flex justify-between py-[4vw] md:py-[1vw] md:px-[2vw] shadow-thin rounded-[.75vw]"
            onClick={() => toggleShow(id)}
            >
                <div className="text-start">
                    <p className="font-medium text-[1.04vw]">{question}</p>
                    <TECollapse show={isExpanded} className="shadow-none">
                        {answer}
                    </TECollapse>
                </div>
                <div>
                    <FaChevronDown className={`${isExpanded ? "-rotate-180" : "" } duration-300 text-secondary stroke-[2vw]`} />
                </div>
            </button>
        </>
    )
}