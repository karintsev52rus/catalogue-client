window.addEventListener('DOMContentLoaded', function () {

    const sb_menu = document.querySelector('.sidebar-menu__wrapper'),
    sb_menuItemText = document.querySelectorAll('.sidebar__menu__item__text'),
    sb_menuTitle = document.querySelector('.sidebar-menu__title'),
    sb_menuHamburger = document.querySelector('.sidebar-menu__hamburger');
    sb_menuClosed = document.querySelector('.sidebar__menu-closed');
    sb_menuItemClosed = document.querySelectorAll('.sidebar__menu-closed .menu-item');
    

    sb_menuHamburger.addEventListener('click', function () { 
        sb_menu.classList.toggle('sidebar-menu__wrapper-active');
        sb_menuHamburger.classList.toggle('sidebar-menu__hamburger-active');
        sb_menuItemText.forEach (function (item) {
            item.classList.toggle('sidebar__menu__item__text-active');
        });
        sb_menuTitle.classList.toggle('sidebar-menu__title-active');
        sb_menuClosed.classList.toggle('sidebar__menu-closed');
    });

    sb_menuItemClosed.forEach(function (item){
        item.addEventListener('click', function(){
            sb_menu.classList.toggle('sidebar-menu__wrapper-active');
            sb_menuHamburger.classList.toggle('sidebar-menu__hamburger-active');
            sb_menuItemText.forEach (function (item) {
                item.classList.toggle('sidebar__menu__item__text-active');
            });
            sb_menuTitle.classList.toggle('sidebar-menu__title-active');
            sb_menuClosed.classList.toggle('sidebar__menu-closed');
        });
    });
});