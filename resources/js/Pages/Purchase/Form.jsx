import { useState } from "react";
import MainLayout from "@/Layouts/MainLayout";
import ButtonPill from "@/Components/ButtonPill";
import ExpandedButton from "@/Components/ExpandedButton";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker, DesktopDatePicker, StaticDatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

export default function Form({ auth }) {
    return (
        <MainLayout auth={auth} title="Purchase">
            <section id="purchase-form" className="mb-16 xs:mb-20 md:mb-16 lg:mb-20 xl:mb-24 3xl:mb-32">
                <div className="container mx-auto pt-6 flex justify-between">
                    <MainCard />
                    <SummaryCard />
                </div>
            </section>
        </MainLayout>
    );
}

function FormModal ({ show, setShow }) {
    return (
        <>
            <div className={`${show ? '' : 'hidden'} fixed top-0 bottom-0 left-0 right-0 overflow-hidden bg-dark bg-opacity-50 transition-all duration-300 z-50`} onClick={() => setShow(false)}>
            </div>
            <div className={`${show ? 'top-0 bottom-0 scale-100' : 'top-full -bottom-full scale-0'} fixed left-0 flex flex-col gap-4 w-[30vw] h-[24vw] transition-all duration-500 bg-white shadow-md rounded-xl p-6 z-50 ms-[35vw] mt-[10vw]`}>
                <div>
                    <div className="flex justify-between items-center mb-4">
                        <h5 className="text-secondary font-poppins font-bold">Pilih Jadwal Bimbingan</h5>
                        <i role="button" className="fa-solid fa-times text-20" onClick={() => setShow(false)}></i>
                    </div>
                    <hr className="border-light-grey" />
                </div>
                <div>
                    <p className="font-medium mb-3">Pilih Tanggal Bimbingan :</p>
                    <ExpandedButton className="shadow-centered-spread rounded-sm text-gray-400" borderClassName="border-0">Pilih Tanggal</ExpandedButton>
                </div>
                <div>
                    <p className="font-medium mb-3">Pilih Lokasi Bimbingan :</p>
                    <ExpandedButton className="shadow-centered-spread rounded-sm text-gray-400" borderClassName="border-0" icon="fa-solid fa-chevron-down">Pilih Lokasi</ExpandedButton>
                </div>
                <div className="flex justify-end">
                    <ButtonPill className="fixed bottom-6 w-3/12" isActive={false}>Simpan</ButtonPill>
                </div>
            </div>
        </>
    )
}

function MainCard () {
    const [showFormModal, setShowFormModal] = useState(false)
    return (
        <div className="w-[70%] relative shadow-centered-spread rounded-2xl p-6 flex flex-col gap-4">
            <p>Bimbingan Skripsi</p>
            <hr className="border-black" />
            <h3 className="text-secondary">Dibimbing Offline 60 Menit</h3>
            <p>Capai kesuksesan skripsimu melalui bimbingan personal secara 1-on-1, sesuai dengan permasalahan pada skripsimu.</p>
            <div className="flex flex-col gap-2 md:gap-1 lg:gap-2 3xl:gap-3">
                <p>Layanan :</p>
                <div className="flex items-center gap-2">
                    <i className="fa-regular fa-calendar text-primary"></i>
                    <p>1x Pertemuan</p>
                </div>
                <div className="flex items-center gap-2">
                    <i className="fa-solid fa-clock text-12 md:text-6 lg:text-10 xl:text-12 3xl:text-18 text-primary"></i>
                    <p>60 Menit</p>
                </div>
                <div className="flex items-center gap-2">
                    <i className="fa-solid fa-location-dot text-primary"></i>
                    <p>Offline</p>
                </div>
            </div>
            <div>
                <ExpandedButton onClick={() => setShowFormModal(true)}>
                    <i className="fa-regular fa-calendar"></i>&nbsp;&nbsp;Pilih Jadwal Bimbingan
                </ExpandedButton>
                <FormModal show={showFormModal} setShow={setShowFormModal} />
            </div>
            <div className="flex flex-col">
                <label htmlFor="file" className="font-medium">
                    <p className="mb-2">Berkas Pendukung (opsional)</p>
                    <div className="w-full border-1 border-light-grey rounded-md flex items-center cursor-pointer overflow-hidden">
                        <div className="w-3/12 bg-slate-200 text-center p-2 border-e-1 border-light-grey">Pilih File</div>
                        <div className="p-2 px-3">Belum ada file yang dipilih</div>
                    </div>
                </label>
                <input type="file" name="file" id="file" accept=".doc, .docx, .pdf" className="hidden" />
                <p className="font-medium text-xs text-light-grey mt-2">PDF, DOCS</p>
            </div>
        </div>
    )
}

function SummaryCard () {
    return (
        <div className="w-[30%] relative shadow-centered-spread rounded-2xl p-6 text-xs ms-[3vw] h-fit">
            <h5 className="font-sans font-bold text-secondary mb-4">Total Pesanan</h5>
            <hr className="border-black" />
            <table className="w-full font-poppins border-separate border-spacing-y-3 my-1">
                <tbody>
                    <tr>
                        <td>Dibimbing Sekali</td>
                        <td className="font-bold text-right">IDR 47.000</td>
                    </tr>
                    <tr>
                        <td>Promo</td>
                        <td className="font-bold text-right">-</td>
                    </tr>
                    <tr>
                        <td>Biaya Admin</td>
                        <td className="font-bold text-right">-</td>
                    </tr>
                </tbody>
            </table>
            <hr className="border-black" />
            <div className="text-center font-poppins my-4">
                <p className="font-bold mb-2">Total Pembelian</p>
                <h2 className="text-secondary">IDR 47.000</h2>
            </div>
            <div className="grid gap-4">
                <ExpandedButton>Pakai Promo</ExpandedButton>
                <ExpandedButton>Pilih Metode Pembayaran</ExpandedButton>
            </div>
            <ButtonPill className="w-full mt-4" isActive={false}>Bayar Sekarang</ButtonPill>
        </div>
    )
}