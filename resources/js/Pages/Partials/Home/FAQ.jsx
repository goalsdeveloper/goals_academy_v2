import { useState } from "react";
import { TECollapse } from "tw-elements-react";
import figure3 from "/resources/img/figure-3.svg";

function FAQItem ({id, show, toggleShow, question, answer}) {
    const condition = show[id]

    function FAQIcon () {
        if (condition) {
            return <i className="fa-solid fa-minus flex justify-center items-center text-white bg-secondary rounded-full md:text-6 lg:text-10 xl:text-12 w-5 h-5 md:w-3 md:h-3 lg:w-4 lg:h-4 xl:w-5 xl:h-5"></i>
        } else {
            return <i className="fa-solid fa-plus flex justify-center items-center text-white bg-secondary rounded-full md:text-6 lg:text-10 xl:text-12 w-5 h-5 md:w-3 md:h-3 lg:w-4 lg:h-4 xl:w-5 xl:h-5"></i>
        }
    }

    return (
        <>
            <button
            type="button"
            className="w-full flex gap-4 md:gap-2 xl:gap-4 py-6 md:py-3 lg:py-4"
            onClick={() => toggleShow(id)}
            >
                <div>
                    <FAQIcon />
                </div>
                <div className="text-start">
                    <p className="font-medium">{question}</p>
                    <TECollapse show={condition} className="shadow-none">
                        <br />
                        <div>{answer}</div>
                    </TECollapse>
                </div>
            </button>
        </>
    )
}

function FAQContent ({data}) {
    const [show, setShow] = useState(Array(data.length).fill(false))

    const toggleShow = (id) => {
        const temp = Array(data.length).fill(false)
        temp[id] = !show[id]
        setShow(temp)
    }

    return (
        <div className="w-full absolute">
            {data.map(({question, answer}, index) => {
                if (index != data.length - 1) {
                    return (
                        <div key={index}>
                            <FAQItem id={index} show={show} toggleShow={toggleShow} question={question} answer={answer} />
                            <hr className="border-dark" />
                        </div>
                    )
                } else {
                    return (
                        <FAQItem key={index} id={index} show={show} toggleShow={toggleShow} question={question} answer={answer} />
                    )
                }
            })}
        </div>
    )
}

export default function FAQ ({data}) {
    return (
        <section id="faq" className="my-16 xl:my-24 3xl:my-32">
            <div className="container mx-auto flex flex-wrap justify-between">
                <div className="w-5/12 hidden md:block">
                    <img src={figure3} alt="Figure 3" />
                </div>
                <div className="w-full relative md:w-6/12 md:mt-[2%] lg:mt-[3%]">
                    <p className="font-medium md:tracking-[0.2rem] lg:tracking-[0.3rem] xl:tracking-[0.4rem] mb-4 md:mb-2 lg:mb-3 xl:mb-4 text-center md:text-start">PALING SERING DITANYAKAN</p>
                    <h2 className="mb-8 md:mb-4 xl:mb-8 3xl:mb-12 text-center md:text-start">Ada <span className="text-primary">Pertanyaan?</span></h2>
                    <FAQContent data={data} />
                </div>
            </div>
        </section>
    )
}
