import{j as s,d as n}from"./app-7c3879b2.js";import{r as i}from"./react-responsive-4ac5f018.js";const d=({children:e,className:r="",imageUrl:t,...a})=>s.jsxs("div",{...a,className:`relative w-full flex shadow md:shadow-none md:border border-neutral-20 p-[1.2vw] gap-[2.9vw] rounded-[1.6vw] md:rounded-[.8vw] ${r}`,children:[s.jsx("img",{src:"/resources/img/program/dibimbing-lah-data.png",alt:t,className:"w-[26.7vw] md:w-[13vw] rounded-[1.5vw] md:rounded-[.5vw] object-cover"}),s.jsx("div",{className:"w-full py-[.5vw] flex flex-col gap-[1.6vw] justify-center pr-[1vw]",children:e})]}),c=({children:e,imageUrl:r,href:t="",isLink:a=!1,...o})=>i.useMediaQuery({query:"(max-width: 768px)"})&a?s.jsx(n,{href:t,children:s.jsx(d,{imageUrl:r,...o,children:e})}):s.jsx(d,{imageUrl:r,...o,children:e}),w=({children:e,className:r})=>s.jsx("div",{className:`flex gap-[.5vw] items-center ${r}`,children:e}),v=({children:e})=>s.jsx("div",{className:"flex w-full justify-between items-center",children:e});export{c as P,w as a,v as b};