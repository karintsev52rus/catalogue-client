const touch = ()=>{
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {

        document.body.classList.add('_touch');
    
    } else document.body.classList.add('_pc');
}

export {touch}

