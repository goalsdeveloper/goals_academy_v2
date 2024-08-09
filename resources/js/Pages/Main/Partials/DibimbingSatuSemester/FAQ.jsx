import { useState } from "react";
import { TECollapse } from "tw-elements-react";
import { useMediaQuery } from "react-responsive";
import figure from "/resources/img/figure/11.svg";
import { FaChevronDown } from "react-icons/fa6";

export default function FAQ ({ items }) {
    const [show, setShow] = useState(Array(items.length).fill(false))

    const toggleShow = (id) => {
        const temp = Array(items.length).fill(false)
        temp[id] = !show[id]
        setShow(temp)
    }

    const isMobile = useMediaQuery({ query: "(max-width: 767px)" });

    return (
        <section id="faq" className="container mx-auto md:w-auto mb-[9vw] md:mb-[3.4vw]">
            <div className="flex flex-col md:flex-row items-center md:justify-end md:gap-[6.25vw] md:pe-[4.64vw] mb-[9vw] md:mb-[3.4vw]">
                <h2 className="text-[5vw] md:text-[2.5vw] text-black md:leading-[4vw] mb-[2.5vw] text-center md:text-right">Ada{isMobile ? " " : <br />}<span className="text-primary">Pertanyaan?</span></h2>
                <img src={figure} alt="Figure 11" className="w-[46.51vw] md:w-[20.83vw]" />
            </div>
            <div className="w-full space-y-[2.5vw] md:space-y-[1vw]">
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
            className="w-full flex justify-between py-[4vw] px-[4vw] md:py-[1vw] md:px-[2vw] shadow-thin rounded-[2.5vw] md:rounded-[.75vw]"
            onClick={() => toggleShow(id)}
            >
                <div className="text-start">
                    <p className="font-medium text-[2.79vw] md:text-[1.04vw]">{question}</p>
                    <TECollapse show={isExpanded} className="shadow-none text-[2.79vw] md:text-[1.04vw]">
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