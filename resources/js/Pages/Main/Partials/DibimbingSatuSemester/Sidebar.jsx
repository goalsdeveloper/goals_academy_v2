import GoalsButton from "@/Components/GoalsButton"

export default function Sidebar ({ items, scrollToSection }) {
    return (
        <nav className="w-[14.3vw] sticky top-[7.5vw] h-fit flex flex-col gap-[1.5vw] font-poppins">
            {items.map((item, index) => {
                return <SidebarItem key={index} {...item} onClick={() => scrollToSection(`#${item.href}`)} />
            })}
            <GoalsButton className="w-fit px-[2vw] font-sans text-[1.04vw] rounded-[.5vw]">Daftar Sekarang</GoalsButton>
        </nav>
    )
}

function SidebarItem ({ title, icon, isActive, onClick }) {
    return (
        <a role="button" className={`${isActive ? "text-primary border-primary" : "text-light-grey border-transparent"} border-l-2 flex items-center gap-[.5vw] ps-[.5vw] text-[1.04vw]`} onClick={onClick}>{icon} {title}</a>
    )
}