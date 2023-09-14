const headerScroll = () => {
    const headerContainer = document.querySelector('header .container');

    if (window.scrollY == 0) {
        headerContainer.classList.remove('xl:h-24', '3xl:h-36')
        headerContainer.classList.add('xl:h-32', '3xl:h-48')
    } else {
        headerContainer.classList.remove('xl:h-32', '3xl:h-48')
        headerContainer.classList.add('xl:h-24', '3xl:h-36')
    }
}

document.addEventListener('scroll', headerScroll)
