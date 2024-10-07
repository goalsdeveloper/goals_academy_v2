import React, { useState } from "react";
import { useForm } from "@inertiajs/react";
import { FiX } from "react-icons/fi";
import GoalsButton from "@/Components/GoalsButton";
import GoalsTextInput from "@/Components/elements/GoalsTextInput";
import { Autocomplete } from "@mui/material";
import { universities, majorFamilies } from "@/data";

const LengkapiProfilForm = ({ userProfile, setUserProfile, show, setShow, toast }) => {
    console.log(userProfile)
    const { data, setData, errors, setError, post } = useForm({
        id: userProfile.id,
        phone_number: userProfile.phone_number ? userProfile.phone_number : "",
        university: userProfile.university ? userProfile.university : "",
        faculty: userProfile.faculty ? userProfile.faculty : "",
        major: userProfile.major ? userProfile.major : "",
        rumpun: userProfile.rumpun ? userProfile.rumpun : "",
    });

    const [university, setUniversity] = React.useState(data.university);
    const [rumpun, setRumpun] = React.useState(data.rumpun);

    const [isLoading, setIsLoading] = useState(false);

    const submitHandler = (e) => {
        e.preventDefault();
        const keys = Object.keys(data)
        const values = keys.map(i => data[i])

        keys.map(i => {
            if (data[i] == '' || data[i] == null) {
                setError(i, `This field is required!`)
            } else if (String(data[i])[0] == ' ') {
                setError(i, `This field can't started with space!`)
            } else {
                setError(i, '')
            }
        })

        if (!(values.includes('') || values.includes(null) || values.map(i => String(i)[0] == ' ').includes(true))) {
            setIsLoading(true)
            fetch("/api/lengkapi_profil", {
                method: "post",
                headers: {
                    accept: "application.json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data)
            })
                .then(response => response.json())
                .then(response => {
                    if (response.message == 'success') {
                        toast.success('Profil berhasil dilengkapi!', { position: 'top-center' })
                        setUserProfile(data)
                        setIsLoading(false)
                    }
                })
        }
    }
    return (
        <div>
            <div
                className={`${
                    show ? "" : "hidden"
                } fixed top-0 bottom-0 left-0 right-0 overflow-hidden bg-dark bg-opacity-50 transition-all duration-300 z-50`}
                onClick={() => isLoading ? () => {} : setShow(false)}
            ></div>
            <div
                className={`${
                    show
                        ? "md:top-0 bottom-0 md:scale-100"
                        : "md:top-full -bottom-full md:scale-0"
                } fixed left-0 flex flex-col gap-[2vw] w-full md:w-[30vw] h-[55vh] md:h-fit transition-all duration-500 bg-white shadow-md rounded-t-[6vw] md:rounded-[.5vw] p-[8vw] md:p-[1.75vw] z-50 md:ms-[35vw] md:mt-[8vh] overflow-auto`}
            >
                <div className="flex justify-between">
                    <p className="font-poppins font-semibold text-[4.5vw] md:text-[1.2vw]">Data Diri</p>
                    <button onClick={() => isLoading ? () => {} : setShow(false)}>
                        <FiX className="text-[6vw] md:text-[1.8vw]" />
                    </button>
                </div>
                <form
                    className="space-y-[8vw] md:space-y-[2vw]"
                    onSubmit={submitHandler}
                >
                    <div className="space-y-[3.2vw] md:space-y-[.8vw]">
                        <GoalsTextInput
                            type="number"
                            label="Nomor Whatsapp"
                            placeholder="Masukkan nomor whatsapp disini"
                            value={data.phone_number}
                            error={errors.phone_number}
                            cancelButton={data.phone_number != ""}
                            data={data.phone_number}
                            setData={i => setData("phone_number", i)}
                            onChange={(e) => setData("phone_number", e.target.value)}
                        />
                        <label
                            htmlFor="university"
                            className="w-full grid items-center gap-[.4vw]"
                        >
                            Universitas
                            <Autocomplete
                                disableClearable
                                id="university"
                                options={universities}
                                renderInput={(params) => {
                                    const { className, ...props } =
                                        params.inputProps;
                                    return (
                                        <div ref={params.InputProps.ref}>
                                            <input
                                                className={
                                                    "w-full flex justify-between items-center text-[3.7vw] md:text-[.8vw] focus:ring-0 px-[3vw] md:px-[1vw] rounded-md text-dark h-[12vw] md:h-[3vw] border placeholder:text-light-grey"
                                                }
                                                type="text"
                                                {...props}
                                            />
                                        </div>
                                    );
                                }}
                                getOptionLabel={(option) => option}
                                inputValue={university}
                                onInputChange={(event, newInputValue) => {
                                    if (event != null) {
                                        setUniversity(newInputValue);
                                    }
                                }}
                                onBlur={() => setUniversity(data.university)}
                                onChange={(e, value) => {
                                    setData({
                                        ...data,
                                        university: value
                                    });
                                }}
                            />
                            {errors.university !== "" && (
                                <p className={`text-red-500 text-[3.6vw] md:text-[.9vw]`}>
                                    {errors.university}
                                </p>
                            )}
                        </label>
                        {/* <GoalsTextInput
                            type="text"
                            label="Universitas"
                            placeholder="Masukkan universitas disini"
                            value={data.university}
                            error={errors.university}
                            cancelButton={data.university != ""}
                            data={data.university}
                            setData={i => setData("university", i)}
                            onChange={(e) => setData("university", e.target.value)}
                        /> */}
                        <GoalsTextInput
                            type="text"
                            label="Fakultas"
                            placeholder="Masukkan fakultas disini"
                            value={data.faculty}
                            error={errors.faculty}
                            cancelButton={data.faculty != ""}
                            data={data.faculty}
                            setData={i => setData("faculty", i)}
                            onChange={(e) => setData("faculty", e.target.value)}
                        />
                        <GoalsTextInput
                            type="text"
                            label="Jurusan"
                            placeholder="Masukkan jurusan disini"
                            value={data.major}
                            error={errors.major}
                            cancelButton={data.major != ""}
                            data={data.major}
                            setData={i => setData("major", i)}
                            onChange={(e) => setData("major", e.target.value)}
                        />
                        <label
                            htmlFor="major_family"
                            className="w-full grid items-center gap-[.4vw]"
                        >
                            Rumpun Jurusan
                            <Autocomplete
                                disableClearable
                                id="major_family"
                                options={majorFamilies}
                                renderInput={(params) => {
                                    const { className, ...props } =
                                        params.inputProps;
                                    return (
                                        <div ref={params.InputProps.ref}>
                                            <input
                                                className={
                                                    "w-full flex justify-between items-center text-[3.7vw] md:text-[.8vw] focus:ring-0 px-[3vw] md:px-[1vw] rounded-md text-dark h-[12vw] md:h-[3vw] border placeholder:text-light-grey"
                                                }
                                                type="text"
                                                {...props}
                                            />
                                        </div>
                                    );
                                }}
                                getOptionLabel={(option) => option}
                                inputValue={rumpun}
                                onInputChange={(event, newInputValue) => {
                                    if (event != null) {
                                        setRumpun(newInputValue);
                                    }
                                }}
                                onBlur={() => setRumpun(data.rumpun)}
                                onChange={(e, value) => {
                                    setData({
                                        ...data,
                                        rumpun: value
                                    });
                                }}
                            />
                            {errors.rumpun !== "" && (
                                <p className={`text-red-500 text-[3.6vw] md:text-[.9vw]`}>
                                    {errors.rumpun}
                                </p>
                            )}
                        </label>
                    </div>
                    <GoalsButton className="rounded-md" onClick={submitHandler} isLoading={isLoading}>
                        Simpan
                    </GoalsButton>
                    <button type="submit" className="hidden"></button>
                </form>
            </div>
        </div>
    );
};

export default LengkapiProfilForm;
