var priv = 'открытая';
function name() {
    document.getElementById("creatorName").innerText = localStorage.getItem('login_mc');
}
name()

function changPriv(val) {
    let val2;
    if (val === 1)
        val2 = 0
    else val2 = 1
    if (document.querySelectorAll(".chngpr")[val].style.color === 'rgb(244, 97, 97)') //если нажали на красное
    {
        if (val == 0) // т.е. нажали на открырый
            priv = 'открытая'
        else
            priv = 'закрытая'
        document.querySelectorAll(".chngpr")[val].style.color = 'rgb(97, 244, 111)'
        document.querySelectorAll(".chngpr")[val2].style.color = 'rgb(244, 97, 97)'
    }

    
}