export default function Sidebar ({ items, scrollToSection }) {
    return (
        <nav className="sticky top-[7.5vw] w-2/12 h-fit border-r-2 flex flex-col gap-[1.5vw] font-poppins">
            {items.map((item, index) => {
                return <SidebarItem key={index} {...item} onClick={() => scrollToSection(`#${item.href}`)} />
            })}
        </nav>
    )
}

function SidebarItem ({ title, icon, href, isActive, onClick }) {
    return (
        <a className={`${isActive ? "text-secondary border-secondary" : "text-light-grey border-transparent"} border-l-2 flex items-center gap-[.5vw] ps-[.5vw]`} onClick={onClick}>{icon} {title}</a>
    )
}