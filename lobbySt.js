function lobbySt() {
    var ajax=new XMLHttpRequest();
    var fd=new FormData();
    fd.set("db","2375"); //указываем бд
    fd.set("pname","show_game_lobby"); //указываем процедуру
    fd.set("p1", localStorage.getItem('login_mc'));
    fd.set("p2", localStorage.getItem('pas_mc'));
    fd.set("p3", localStorage.getItem('game_mc'));
    fd.set('format', 'rows');
    ajax.open("POST","https://play.lavro.ru/call.php");
    ajax.onload=lobbyStResult;
    ajax.send(fd);
}

// lobbySt()

var timerId = setInterval(lobbySt, 5000);

function lobbyStResult(p) {
    var res = JSON.parse(p.target.response)
    // console.log(res)
    // console.log(res[0].howMPlNeed)
    if (res[0].howMPlNeed === 0)
        location.href = '/machikoro/game.html';
    
}