

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
    
    var ajax=new XMLHttpRequest();
    var fd=new FormData();
    fd.set("db","2375"); //указываем бд
    fd.set("pname","change_privacy_of_game"); //указываем процедуру
    fd.set("p1", localStorage.getItem('login_mc'));
    fd.set("p2", localStorage.getItem('pas_mc'));
    fd.set("p3", localStorage.getItem('game_mc'));
    fd.set("p4", priv);
    // fd.set('format', 'rows');
    ajax.open("POST","https://play.lavro.ru/call.php");
    // ajax.onload=lobbyStateResult;
    ajax.send(fd);
}