const headerScroll = () => {
    // const header = document.querySelector('header');
    const headerContainer = document.querySelector('header .container');

    if (window.scrollY == 0) {
        headerContainer.classList.remove('md:h-16', 'xl:h-24', '3xl:h-36');
        headerContainer.classList.add('md:h-20', 'xl:h-32', '3xl:h-48');
        // header.classList.remove('shadow');
    } else {
        headerContainer.classList.remove('md:h-20', 'xl:h-32', '3xl:h-48');
        headerContainer.classList.add('md:h-20', 'xl:h-24', '3xl:h-36');
        // header.classList.add('shadow');
    }
}

document.addEventListener('scroll', headerScroll)
