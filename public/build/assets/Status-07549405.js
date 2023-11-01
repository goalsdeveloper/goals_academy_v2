import{r as d,j as e,d as o}from"./app-10d88dd4.js";import{h as s,E as u}from"./ExpandedButton-76c58e0e.js";import{M as j}from"./MainLayout-448500a7.js";import{M as f}from"./tw-elements-react.es.min-0a546c78.js";import{T as b}from"./goals-3-98a9577b.js";import"./ButtonHoverSlide-65103064.js";import"./CornerWaveVector-d79e4aae.js";import"./CornerWaveVector2-9ca5441e.js";function S({auth:c,data:l}){const[i,m]=d.useState(!1),x=Intl.NumberFormat("id-ID"),h=s("2024-10-24 21:00:00"),[n,t]=d.useState(s().hours(0).minutes(0).seconds(0));setInterval(()=>{const a=h.diff(s());if(a<=1)t(s().hours(0).minutes(0).seconds(0));else{const r=s();r.hours(Math.floor(a/(1e3*60*60))),r.minutes(Math.floor(a%(1e3*60*60)/(1e3*60))),r.seconds(Math.floor(a%(1e3*60*60)%(1e3*60)/1e3)),t(r)}},1e3),s.updateLocale("id",{weekdays:["Minggu","Senin","Selasa","Rabu","Kamis","Jum'at","Sabtu"]});const p=s(l.created_at).locale("id").format("dddd, YYYY-MM-DD");return e.jsx(j,{auth:c,title:"Purchase",children:e.jsx("section",{id:"purchase-form",className:"mb-16 xs:mb-20 md:mb-16 lg:mb-20 xl:mb-24 3xl:mb-32",children:e.jsxs("div",{className:"container mx-auto pt-4 flex flex-col gap-12 items-center",children:[e.jsxs("div",{className:"w-1/2 relative shadow-centered-spread rounded-2xl p-6 flex flex-col items-center gap-4 h-fit",children:[e.jsx("h5",{className:"text-center text-secondary font-bold",children:"Status : Menunggu Pembayaran"}),e.jsx("hr",{className:"w-full border-secondary"}),e.jsx("img",{src:"https://www.researchgate.net/profile/Hafiza-Abas/publication/288303807/figure/fig1/AS:311239419940864@1451216668048/An-example-of-QR-code.png",className:"w-1/2",alt:""}),e.jsx("hr",{className:"w-full border-light-grey"}),e.jsx("table",{className:"w-full text-center font-poppins",children:e.jsxs("tbody",{children:[e.jsxs("tr",{className:"font-bold text-36",children:[e.jsx("td",{className:"w-3/12",children:n.format("HH")}),e.jsx("td",{children:":"}),e.jsx("td",{className:"w-3/12",children:n.format("mm")}),e.jsx("td",{children:":"}),e.jsx("td",{className:"w-3/12",children:n.format("ss")})]}),e.jsxs("tr",{className:"text-16",children:[e.jsx("td",{children:"Jam"}),e.jsx("td",{}),e.jsx("td",{children:"Menit"}),e.jsx("td",{}),e.jsx("td",{children:"Detik"})]})]})}),e.jsx("hr",{className:"w-full border-dark"})]}),e.jsxs("div",{className:"w-1/2 relative shadow-centered-spread rounded-2xl p-6 flex flex-col items-center gap-6 h-fit",children:[e.jsx("hr",{className:"w-full border-light-grey"}),e.jsx("table",{className:"w-full font-poppins border-separate border-spacing-y-4 -my-4",children:e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:"Metode Pembayaran"}),e.jsxs("td",{className:"flex justify-end items-center gap-2 font-semibold",children:["Gopay ",e.jsx("img",{className:"w-[10%]",src:"/img/purchase/gopay.png",alt:""})]})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"ID Transaksi"}),e.jsx("td",{className:"flex justify-end items-center gap-2 font-semibold",children:l.order_code})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"Tanggal Transaksi"}),e.jsx("td",{className:"flex justify-end items-center gap-2 font-semibold",children:p})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"Total Pembelian"}),e.jsxs("td",{className:"flex justify-end items-center gap-2 font-semibold",children:["IDR ",x.format(l.unit_price)]})]})]})}),e.jsx("hr",{className:"w-full border-light-grey"}),e.jsxs("div",{className:"w-full block",children:[e.jsx(u,{borderClassName:"border-1 border-dark",textClassName:"font-medium text-dark",icon:`fa-solid fa-chevron-down duration-500 ${i?"-rotate-180":""}`,onClick:()=>m(!i),children:"Lihat Langkah Pembayaran"}),e.jsx(f,{show:i,className:"relative w-[110%] -ms-[5%] px-[4%] shadow-none -translate-y-2",children:e.jsxs(b,{className:"grid gap-4 px-1",children:[e.jsxs("div",{className:"border-1 border-dark rounded-md p-3",children:[e.jsx("p",{className:"font-bold",children:"1. Transaksi melalui Desktop"}),e.jsx("p",{children:"Berikut langkah pembayaran menggunakan GoPay melalui Desktop:"}),e.jsxs("ul",{children:[e.jsx("li",{children:"Buka aplikasi Gojek pada smarhphone Anda"}),e.jsx("li",{children:'Klik "Pay" dan "Scan" QR Code'}),e.jsx("li",{children:'Periksa detail pembayaran lalu klik "Confirm & Pay"'}),e.jsx("li",{children:'Masukkan "PIN" GoPay Anda'}),e.jsx("li",{children:"Pembayaran selesai"})]})]}),e.jsxs("div",{className:"border-1 border-dark rounded-md p-3",children:[e.jsx("p",{className:"font-bold",children:"2. Transaksi melalui Mobile"}),e.jsx("p",{children:"Berikut langkah pembayaran menggunakan GoPay melalui Mobile:"}),e.jsxs("ul",{children:[e.jsx("li",{children:"Buka aplikasi Gojek pada smarhphone Anda"}),e.jsx("li",{children:'Klik "Pay" dan "Scan" QR Code'}),e.jsx("li",{children:'Periksa detail pembayaran lalu klik "Confirm & Pay"'}),e.jsx("li",{children:'Masukkan "PIN" GoPay Anda'}),e.jsx("li",{children:"Pembayaran selesai"})]})]})]})})]}),e.jsxs("div",{className:"z-10 w-full overflow-hidden grid grid-cols-2 border-1 xl:border-2 border-primary font-poppins rounded-full",children:[e.jsx(o,{href:"/produk",className:"p-1.5 md:p-2 xl:p-2 3xl:p-3 font-medium text-center bg-white text-primary",children:"Belanja Lagi"}),e.jsx(o,{href:"#",className:"p-1.5 md:p-2 xl:p-2 3xl:p-3 font-medium text-center bg-primary text-white",children:"Cek Status Transaksi"})]})]})]})})})}export{S as default};