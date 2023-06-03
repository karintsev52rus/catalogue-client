  window.addEventListener('DOMContentLoaded', function () {
    const menu = document.querySelector('.menu'),
    menuItem = document.querySelectorAll('.menu__item'),
    hamburger = document.querySelector('.hamburger'),
    dropDownButtons = document.querySelectorAll('.drop-down-button');



    hamburger.addEventListener('click', function () {
        hamburger.classList.toggle('hamburger-active');
        menu.classList.toggle('menu-active');
        document.body.classList.toggle('lock');
    });

    menuItem.forEach ( function(item) {
        item.addEventListener('click', function () {
            hamburger.classList.toggle('hamburger-active');
            menu.classList.toggle('menu-active');
        });
    });

    dropDownButtons.forEach(function (item){
        item.addEventListener('click' , function () {
            item.classList.toggle('drop-down-button-active');
            item.parentElement.classList.toggle('sub-menu-open');
        });
    });

});
