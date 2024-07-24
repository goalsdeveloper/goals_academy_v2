const headerScroll = () => {
    const headerContainer = document.querySelector('header .container');

    if (window.scrollY == 0) {
        headerContainer.classList.remove('md:h-[7.5vw]')
        headerContainer.classList.add('md:h-[10vw]')
    } else {
        headerContainer.classList.remove('md:h-[10vw]')
        headerContainer.classList.add('md:h-[7.5vw]')
    }
}

document.addEventListener('scroll', headerScroll)
