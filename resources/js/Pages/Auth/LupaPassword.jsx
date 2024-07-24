import { Head, Link, useForm } from "@inertiajs/react";
import Input from "@/Components/OnBorderLabeledInput";
import SubmitButton from "@/Components/BorderedSubmitButton";
import CornerWaveVector from "@/Components/CornerWaveVector";
import iconMobile from "/resources/img/icon/goals-4.svg";
import iconDesktop from "/resources/img/icon/goals-3.svg";

export default function LupaPassword () {
    const {data, setData, post} = useForm({
        email: ""
    })

    const submit = (e) => {
        e.preventDefault()
        // post("/reset_password")
        alert(data["email"])
    }

    return (
        <>
            <Head title="Lupa Password" />
            <div className="relative flex items-center bg-secondary text-dark py-[8vw] xl:py-[4vw] min-h-screen">
                <CornerWaveVector className="fixed h-screen" position="" cornerClassName="w-8/12 md:w-5/12" />
                <div className="container mx-auto flex flex-col text-[3.3vw] md:text-[2.5vw] xl:text-[1vw] gap-[6vw] xl:gap-[2vw] -translate-y-[2vw] z-10">
                    <img className="hidden xl:inline-block w-[5.5vw] mx-auto" src={iconDesktop} alt="" />
                    <img className="xl:hidden h-[7.2vw] md:h-[5.5vw] mx-auto" src={iconMobile} alt="" />
                    <div className="xl:w-[26vw] mx-auto bg-white rounded-[2vw] xl:rounded-[1vw] p-[7vw] xl:p-[2.6vw] flex flex-col gap-[5vw] md:gap-[3.5vw] xl:gap-[1.5vw]">
                        <div>
                            <h1 className="font-sans font-bold text-center text-[3.3vw] md:text-[2.5vw] xl:text-[1vw] leading-[4.2vw] xl:leading-tight mb-[1vw] ">Lupa Password?</h1>
                            <p className="w-10/12 mx-auto text-center">
                                Masukkan emailmu dan kami akan mengirim link untuk reset password
                            </p>
                        </div>
                        <form
                            onSubmit={submit}
                            className="w-full grid gap-[4vw] md:gap-[3vw] xl:gap-[1.5vw]"
                        >
                            <Input
                                type="email"
                                id="email"
                                label="Email"
                                value={data["email"]}
                                className="pb-[1.5vw] md:pt-[2.6vw] md:pb-[1.7vw] md:px-[3.2vw] md:rounded-[1vw]"
                                labelClassName="md:ms-6 md:-mt-3 md:px-[1vw]"
                                onChange={(e) => setData("email", e.target.value)}
                            />
                            <SubmitButton
                                className="w-full md:w-3/12 xl:w-4/12 mx-auto rounded-full md:p-[1.5vw]"
                                activeClassName="border-secondary bg-secondary text-white hover:border-primary hover:bg-primary"
                                disabled={false}
                            >Kirim</SubmitButton>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
