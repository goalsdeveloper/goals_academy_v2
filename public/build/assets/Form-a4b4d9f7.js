import{r as p,W as h,j as e,a as k,d as o}from"./app-c4f207a7.js";import{T as C}from"./TECollapseItem-b808e5f5.js";import{C as i}from"./CornerWaveVector-b7c7ee9a.js";import{C as b}from"./CornerWaveVector2-a59db1f6.js";import{l as D}from"./goals-3-7cc004cd.js";import{w as P}from"./tw-elements-react.es.min-1738ed7d.js";const $="/build/assets/7-27b65934.svg",m="/build/assets/rectangle-1-39a24194.svg",S="/build/assets/goals-4-2f9e347c.svg";function B({title:r,message:l}){const[a,t]=p.useState(r);console.log(l);const{data:n,setData:f,post:j}=h({email:"",password:""}),{data:x,setData:c,post:v}=h({username:"",email:"",password:"",confirmation_password:""}),u=s=>{s=="login"?(t("login"),history.replaceState({},"","/login")):(t("register"),history.replaceState({},"","/register"))},N=s=>{s.preventDefault(),j(route("auth.login"))},y=s=>{s.preventDefault(),v(route("auth.register"))};return e.jsxs("div",{id:"form",className:"relative flex flex-wrap min-h-screen xl:h-screen bg-secondary pb-20 xs:pb-24 xl:p-0 overflow-hidden",children:[e.jsx(k,{title:a=="register"?"Register":"Login"}),e.jsx(z,{title:r}),e.jsx(i,{className:"xl:hidden",cornerClassName:"w-8/12"}),e.jsxs("div",{id:"form-left",className:"w-8/12 relative hidden xl:flex items-end justify-center select-none",children:[e.jsx(i,{rightCornerClassName:"w-6/12",leftCornerClassName:"w-10/12"}),e.jsxs("div",{className:"w-full flex flex-col justify-center items-center gap-4 3xl:gap-6 z-10 text-white",children:[e.jsx("img",{className:"w-2/12",src:D,alt:"Goals Academy"}),e.jsxs("div",{className:"text-center mb-[8vh]",children:[e.jsx("h2",{className:"text-white",children:"Selamat Datang"}),e.jsxs("p",{className:"tracking-wider xl:text-16 3xl:text-24",children:["di"," ",e.jsx("span",{className:"font-semibold",children:"Platform Bimbingan Skripsi Pertama"})," ","di Indonesia"]})]}),e.jsx("img",{className:"w-5/12",src:$,alt:"Figure 7"})]})]}),e.jsx("div",{id:"form-right",className:"container mx-auto xl:w-4/12 h-fit xl:h-screen rounded-lg xl:rounded-none bg-white flex flex-col items-center p-6 xl:p-16 py-20 xl:py-[15vh] relative",children:e.jsxs("div",{className:"grid gap-6 xl:gap-8 w-full",children:[e.jsxs("div",{className:"z-10 w-full overflow-hidden grid grid-cols-2 border-1 xl:border-2 border-primary font-poppins rounded-md xl:rounded-lg 3xl:rounded-xl",children:[e.jsx(g,{switchForm:u,target:"login",active:a}),e.jsx(g,{switchForm:u,target:"register",active:a})]}),e.jsxs("div",{className:`${a=="register"?"grid":"hidden"} gap-3 xl:gap-4 z-10`,children:[e.jsxs("form",{onSubmit:y,className:"w-full grid gap-4 md:gap-6 3xl:gap-8",children:[e.jsx(d,{value:x.username,onChange:s=>c("username",s.target.value),type:"text",id:"username",label:"Username"}),e.jsx(d,{value:x.email,onChange:s=>c("email",s.target.value),type:"email",id:"email",label:"Email"}),e.jsx(d,{value:x.password,onChange:s=>c("password",s.target.value),type:"password",id:"password",label:"Password"}),e.jsx(d,{value:x.confirmation_password,onChange:s=>c("confirmation_password",s.target.value),type:"password",id:"confirmation_password",label:"Ulangi Password"}),e.jsx(w,{children:"Daftar"})]}),e.jsx("p",{className:"text-center",children:"atau"}),e.jsxs("div",{className:"w-full grid gap-4 3xl:gap-6 text-dark",children:[e.jsx("a",{as:"button",className:"w-full relative overflow-hidden border-1 xl:border-2 border-primary bg-white hover:bg-skin text-center font-medium before:absolute before:left-0 before:top-0 before:bg-google before:bg-no-repeat before:w-2/12 before:h-full rounded-md xl:rounded-lg 3xl:rounded-xl p-2 md:p-3 xl:p-2 3xl:p-3",href:"/auth/google",children:"Daftar dengan Google"}),e.jsx("a",{as:"button",className:"w-full relative overflow-hidden border-1 xl:border-2 border-primary bg-white hover:bg-skin text-center font-medium before:absolute before:left-0 before:top-0 before:bg-facebook before:bg-no-repeat before:w-2/12 before:h-full rounded-md xl:rounded-lg 3xl:rounded-xl p-2 md:p-3 xl:p-2 3xl:p-3",href:"/auth/facebook",children:"Daftar dengan Facebook"})]})]}),e.jsxs("div",{className:`${a=="login"?"grid":"hidden"} gap-3 xl:gap-4 z-10`,children:[e.jsxs("form",{onSubmit:N,className:"w-full grid gap-4 md:gap-6 3xl:gap-8",children:[e.jsx(d,{value:n.email,onChange:s=>f("email",s.target.value),type:"email",id:"login_email",label:"Email"}),e.jsxs("div",{className:"relative pb-2",children:[e.jsx(d,{value:n.password,onChange:s=>f("password",s.target.value),type:"password",id:"login_password",label:"Password"}),e.jsx(o,{className:"absolute -bottom-4 right-0 text-blue-500 text-12 3xl:text-16",children:"Lupa password?"})]}),e.jsx(w,{children:"Masuk"})]}),e.jsx("p",{className:"text-center",children:"atau"}),e.jsxs("div",{className:"w-full grid gap-4 3xl:gap-6 text-dark",children:[e.jsx("a",{as:"button",className:"w-full relative overflow-hidden border-1 xl:border-2 border-primary bg-white hover:bg-skin text-center font-medium before:absolute before:left-0 before:top-0 before:bg-google before:bg-no-repeat before:w-2/12 before:h-full rounded-md xl:rounded-lg 3xl:rounded-xl p-2 md:p-3 xl:p-2 3xl:p-3",href:"/auth/google",children:"Masuk dengan Google"}),e.jsx("a",{as:"button",className:"w-full relative overflow-hidden border-1 xl:border-2 border-primary bg-white hover:bg-skin text-center font-medium before:absolute before:left-0 before:top-0 before:bg-facebook before:bg-no-repeat before:w-2/12 before:h-full rounded-md xl:rounded-lg 3xl:rounded-xl p-2 md:p-3 xl:p-2 3xl:p-3",href:"/auth/facebook",children:"Masuk dengan Facebook"})]})]}),e.jsxs("div",{className:"absolute w-full h-full top-0 left-0 z-0 select-none",children:[e.jsx("div",{className:"absolute w-12 xl:w-16 h-4 xl:h-5 3xl:w-24 3xl:h-8 bg-secondary rounded-sm 3xl:rounded-lg top-6 left-6"}),e.jsx("div",{className:"absolute w-12 xl:w-16 h-4 xl:h-5 3xl:w-24 3xl:h-8 bg-secondary rounded-sm 3xl:rounded-lg top-6 right-3"}),e.jsx("div",{className:"absolute w-12 xl:w-16 h-4 xl:h-5 3xl:w-24 3xl:h-8 bg-secondary rounded-sm 3xl:rounded-lg bottom-6 left-6"}),e.jsx("div",{className:"absolute w-12 xl:w-16 h-4 xl:h-5 3xl:w-24 3xl:h-8 bg-secondary rounded-sm 3xl:rounded-lg bottom-4 right-5"}),e.jsx("img",{className:"absolute w-12 xl:w-16 3xl:w-24 top-11 right-12 3xl:top-14",src:m,alt:"vector"}),e.jsx("img",{className:"absolute w-12 xl:w-16 3xl:w-24 bottom-11 left-12 3xl:bottom-14",src:m,alt:"vector"}),e.jsx("img",{className:"absolute w-12 xl:w-16 3xl:w-24 bottom-12 right-8 3xl:bottom-20",src:m,alt:"vector"})]})]})})]})}function g({switchForm:r,target:l,active:a}){return e.jsx("button",{onClick:()=>r(l),className:`p-1.5 md:p-2 xl:p-2 3xl:p-3 font-medium ${a==l?"bg-primary text-white":"bg-white text-primary"}`,children:l=="login"?"Masuk":"Daftar"})}function d({type:r,id:l,label:a,value:t,onChange:n}){return e.jsxs("div",{className:"relative flex",children:[e.jsx("input",{value:t,onChange:n,id:l,type:r,className:"w-full border-1 xl:border-2 border-primary placeholder-shown:border-light-grey font-poppins rounded-md xl:rounded-lg 3xl:rounded-xl pt-2 pb-1 md:pt-3 md:pb-2 3xl:pt-5 3xl:pb-3 px-3 md:px-4 xl:px-5 3xl:px-6 focus:outline-none focus:border-primary peer",placeholder:" "}),e.jsx("label",{htmlFor:l,className:"absolute px-2 3xl:px-4 bg-white text-primary peer-focus:text-primary peer-placeholder-shown:text-light-grey ms-4 -mt-2",children:a})]})}function w({children:r}){return e.jsx("button",{type:"submit",className:"w-4/12 mx-auto border-1 xl:border-2 border-primary text-primary hover:text-white hover:bg-primary font-poppins font-medium rounded-md xl:rounded-lg 3xl:rounded-xl p-2 md:p-3 xl:p-2",children:r})}function z({title:r}){const[l,a]=p.useState(!1);return e.jsxs("header",{className:"xl:hidden w-screen text-dark lg:text-base z-50",children:[e.jsx("div",{className:"hidden xl:h-24 3xl:h-36"})," ",e.jsxs("nav",{className:"container flex flex-wrap justify-between items-center mx-auto h-20 xs:h-24 duration-500",children:[e.jsx("div",{className:"w-6/12 md:w-5/12 lg:w-4/12 xl:w-auto",children:e.jsx(o,{href:"/",children:e.jsx("img",{className:"w-full 3xl:h-10 mb-1 xl:mb-2",src:S,alt:"Goals Academy"})})}),e.jsx("div",{children:e.jsx("button",{onClick:()=>a(!0),children:e.jsx("i",{className:`fa-solid fa-bars icon text-28 duration-300 text-white ${l?"opacity-0 rotate-180":""}`})})}),e.jsx(_,{title:r,mobileNavbar:l,setMobileNavbar:a})]})]})}function _({title:r,mobileNavbar:l,setMobileNavbar:a}){const[t,n]=p.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx("div",{className:`xl:hidden w-full absolute z-50 top-0 bottom-0 right-0 bg-white font-bold text-white py-6 xs:py-8 duration-500 ${l?"":"opacity-0 translate-x-[110%]"}`,children:e.jsxs("div",{className:"container mx-auto md:text-16 xl:text-14 3xl:text-20;",children:[e.jsx("div",{className:"flex justify-end mb-6 xs:mb-8",children:e.jsx("button",{onClick:()=>a(!1),children:e.jsx("i",{className:"fa-solid fa-xmark icon text-dark text-36"})})}),e.jsxs("div",{className:"grid gap-8",children:[e.jsxs(o,{href:"/produk",className:`relative font-poppins flex justify-between items-center rounded-lg bg-secondary hover:bg-primary p-4 ${r=="Produk"?"font":""}`,children:["Produk",e.jsx(i,{cornerClassName:"w-4/12"}),e.jsx("i",{className:"fa-solid fa-arrow-up rotate-45 text-20 xs:text-24"})]}),e.jsxs(o,{href:"/artikel",className:`relative font-poppins flex justify-between items-center rounded-lg bg-secondary hover:bg-primary p-4 ${r=="Artikel"?"font":""}`,children:["Artikel",e.jsx(i,{cornerClassName:"w-4/12"}),e.jsx("i",{className:"fa-solid fa-arrow-up rotate-45 text-20 xs:text-24"})]}),e.jsxs(o,{href:"/diskusi",className:`relative font-poppins flex justify-between items-center rounded-lg bg-secondary hover:bg-primary p-4 ${r=="Diskusi"?"font":""}`,children:["Diskusi",e.jsx(i,{cornerClassName:"w-4/12"}),e.jsx("i",{className:"fa-solid fa-arrow-up rotate-45 text-20 xs:text-24"})]}),e.jsxs(o,{href:"/karir",className:`relative font-poppins flex justify-between items-center rounded-lg bg-secondary hover:bg-primary p-4 ${r=="Karir"?"font":""}`,children:["Karir",e.jsx(i,{cornerClassName:"w-4/12"}),e.jsx("i",{className:"fa-solid fa-arrow-up rotate-45 text-20 xs:text-24"})]}),e.jsxs("button",{className:"w-full relative font-poppins flex flex-col justify-center",children:[e.jsxs("span",{className:`relative font-poppins flex justify-between items-center rounded-lg shadow-centered bg-secondary hover:bg-primary p-4 w-full ${r=="Profil Perusahaan"||r=="Profil Tutor"?"font":""}`,onClick:()=>n(!t),children:["Profil",e.jsx(i,{cornerClassName:"w-4/12"}),e.jsx("i",{className:`fa-solid fa-chevron-down text-20 xs:text-24 duration-300 ${t?"rotate-180":""}`})]}),e.jsx(P,{show:t,className:"shadow-none text-secondary w-full",children:e.jsxs(C,{className:"gap-8",children:[e.jsxs(o,{href:"/profil_perusahaan",className:`relative font-poppins flex justify-between items-center rounded-lg shadow-centered bg-white hover:bg-skin p-4 overflow-hidden ${r=="Produk"?"font":""}`,children:["Profil Perusahaan",e.jsx(b,{cornerClassName:"w-4/12"}),e.jsx("i",{className:"fa-solid fa-arrow-up rotate-45 text-20 xs:text-24"})]}),e.jsxs(o,{href:"/profil_tutor",className:`relative font-poppins flex justify-between items-center rounded-lg shadow-centered bg-white hover:bg-skin p-4 overflow-hidden ${r=="Produk"?"font":""}`,children:["Profil Tutor",e.jsx(b,{cornerClassName:"w-4/12"}),e.jsx("i",{className:"fa-solid fa-arrow-up rotate-45 text-20 xs:text-24"})]})]})})]})]})]})}),e.jsx("div",{className:`absolute z-30 top-0 left-0 h-screen w-screen bg-dark bg-opacity-50 xl:hidden ${l?"":"hidden"}`,onClick:()=>a(!1)})]})}export{B as default};