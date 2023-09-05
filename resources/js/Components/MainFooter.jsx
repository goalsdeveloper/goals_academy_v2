import logo from '/resources/img/logo-white.svg';
import instagram from '/resources/img/instagram-white.svg';
import tiktok from '/resources/img/tiktok-white.svg';
import twitter from '/resources/img/twitter-white.svg';
import linkedin from '/resources/img/linkedin-white.svg';

export default function MainFooter () {
    return (
        <footer className='bg-grey mt-16 w-full'>
            <div className='container mx-auto flex justify-between py-16'>
                <div className='w-3/12'>
                    <img className='md:h-12 xl:h-24 3xl:h-32' src={logo} alt="Goals Academy" />
                    <p className='my-4 xl:my-6'>
                        Perum Graha Joyo Family B/14 Merjosari, Kec. Lowokwaru, Kota Malang, Jawa Timur 65144
                    </p>
                    <div className='flex md:gap-3 xl:gap-6'>
                        <a href='https://www.instagram.com/goalsacademy_id' target='_blank'><img className='md:h-4 xl:h-6' src={instagram} alt="Instagram" /></a>
                        <a href='https://www.tiktok.com/@goalsacademy_id' target='_blank'><img className='md:h-4 xl:h-6' src={tiktok} alt="TikTok" /></a>
                        <a href='https://www.twitter.com/goalsacademy_id' target='_blank'><img className='md:h-4 xl:h-6' src={twitter} alt="Twitter" /></a>
                        <a href='https://www.linkedin.com/company/goals-academy-id' target='_blank'><img className='md:h-4 xl:h-6' src={linkedin} alt="LinkedIn" /></a>
                    </div>
                </div>
                <div className='w-8/12 grid grid-cols-3'>
                    <div>
                        <h5 className='font-semibold mb-4'>Produk</h5>
                        <div className='grid'>
                            <a>Dibimbing Sekali</a>
                            <a>Dibimbing Tuntas</a>
                            <a>Dibimbing Olah Data</a>
                            <a>E-book</a>
                        </div>
                    </div>
                    <div>
                        <h5 className='font-semibold mb-4'>Perusahaan</h5>
                        <div className='grid'>
                            <a>Profil Perusahaan</a>
                            <a>Profil Tutor</a>
                            <a>Karir</a>
                        </div>
                    </div>
                    <div>
                        <h5 className='font-semibold mb-4'>Hubungi</h5>
                        <div className='grid'>
                            <a href='https://wa.me/6285637564245' target='_blank'>(+62) 856-3756-4245</a>
                            <a href='mailto:cs@goalsacademy.id' target='_blank'>cs@goalsacademy.id</a>
                        </div>
                    </div>
                </div>
            </div>
            <div className='bg-gradient-to-r from-grey via-white to-grey h-0.5'>

            </div>
            <div className='text-center py-6'>
                Copyright 2023 &copy; <span className='font-bold'>PT Sarana Edukasi Nusantara</span>
            </div>
        </footer>
    )
}
