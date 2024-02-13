import { Link } from "@inertiajs/react"
import ExpandedButton from "./ExpandedButton"

export default function DashboardNavbarItem ({ href, method, active, className, children }) {
    return (
        <Link className={className} href={href} method={method}>
            <ExpandedButton
            className={`h-[12vw] md:h-[3.5vw] border-transparent shadow-centered-spread px-[8vw] md:px-[1.5vw] md:rounded-xl ${active ? 'bg-secondary' : 'bg-white hover:bg-soft'}`}
            textClassName={`font-medium text-[4vw] md:text-[1.15vw] ${active ? 'text-white' : 'text-secondary'}`}
            iconClassName={active ? 'text-white' : 'text-secondary'}
            >
                <div className="flex items-center gap-[4vw] md:gap-[1vw]">
                    {children}
                </div>
            </ExpandedButton>
        </Link>
    )
}
