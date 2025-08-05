import { Link } from "@inertiajs/react";
import logo from "/resources/img/icon/goals-3.svg";

export default function MainFooter({ className }) {
    return (
        <footer className={`bg-grey w-full text-white ${className}`}>
            <div className="container mx-auto flex flex-col md:flex-row flex-wrap justify-between py-12 xs:py-16 md:py-8 lg:py-16 gap-12 xs:gap-16 md:gap-0">
                <div className="w-8/12 md:w-3/12">
                    <div className="w-6/12 md:w-5/12">
                        <img
                            className="w-full"
                            src={logo}
                            alt="Goals Academy"
                        />
                    </div>
                    <p className="mt-4 mb-8 xs:mt-6 xs:mb-12 sm:my-4 xl:my-6">
                        Perum Graha Joyo Family B/14 Merjosari, Kec. Lowokwaru,
                        Kota Malang, Jawa Timur 65144
                    </p>
                    <div className="flex gap-4 xl:gap-6">
                        <a
                            href="https://www.instagram.com/goalsacademy_id"
                            target="_blank"
                        >
                            <i className="fa-brands fa-instagram text-20 xs:text-24 sm:text-20 md:text-16 lg:text-20 xl:text-24 2xl:text-28"></i>
                        </a>
                        <a
                            href="https://www.tiktok.com/@goalsacademy_id"
                            target="_blank"
                        >
                            <i className="fa-brands fa-tiktok text-20 xs:text-24 sm:text-20 md:text-16 lg:text-20 xl:text-24 2xl:text-28"></i>
                        </a>
                        <a
                            href="https://www.twitter.com/goalsacademy_id"
                            target="_blank"
                        >
                            <i className="fa-brands fa-twitter text-20 xs:text-24 sm:text-20 md:text-16 lg:text-20 xl:text-24 2xl:text-28"></i>
                        </a>
                        <a
                            href="https://www.linkedin.com/company/goals-academy-id"
                            target="_blank"
                        >
                            <i className="fa-brands fa-linkedin text-20 xs:text-24 sm:text-20 md:text-16 lg:text-20 xl:text-24 2xl:text-28"></i>
                        </a>
                    </div>
                </div>
                <div className="w-6/12 md:w-8/12 grid md:grid-cols-3 gap-8">
                    <div>
                        <h5 className="font-semibold text-white mb-4">
                            Produk
                        </h5>
                        <div className="grid gap-2">
                            <a href="/produk" target="_blank">Bimbingan Skripsi</a>
                            <a href="/produk" target="_blank">Webinar Skripsi</a>
                            <a href="/produk" target="_blank">Produk Digital Skripsi</a>
                            <a href="" target="">Video Pembelajaran</a>
                        </div>
                    </div>
                    <div>
                        <h5 className="font-semibold text-white mb-4">
                            Perusahaan
                        </h5>
                        <div className="grid gap-2">
                            <Link href="/profil-perusahaan">Profil Perusahaan</Link>
                            <Link href="/profil-tutor">Profil Tutor</Link>
                            <Link href="/karir">Karir</Link>
                        </div>
                    </div>
                    <div>
                        <h5 className="font-semibold text-white mb-4">
                            Hubungi
                        </h5>
                        <div className="grid gap-2">
                            <a
                                href="https://wa.me/6282147638286"
                                target="_blank"
                            >
                                (+62) 821-4763-8286
                            </a>
                            <a href="mailto:cs@goalsacademy.id" target="_blank">
                                cs@goalsacademy.id
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-gradient-to-r from-grey via-white to-grey h-0.5"></div>
            <div className="text-center py-6">
                Copyright 2023 <i className="fa-regular fa-copyright"></i>{" "}
                <span className="font-bold">PT Sarana Edukasi Nusantara</span>
            </div>
        </footer>
    );
}
