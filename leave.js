function leave(gameId) {
    console.log('Удаляем игру ',gameId)
    var ajax=new XMLHttpRequest();
    var fd=new FormData();
    fd.set("db","2375"); //указываем бд
    fd.set("pname","leave_lobby"); //указываем процедуру
    fd.set("p1", localStorage.getItem('login_mc'));
    fd.set("p2", localStorage.getItem('pas_mc'));
    fd.set('format', 'rows');
    fd.set("p3", gameId);
    ajax.open("POST","https://play.lavro.ru/call.php");
    ajax.onload=contGamResult;
    ajax.send(fd);
}



