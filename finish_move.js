function finish_move() {  
    document.getElementById("roll").style = "none;"; //прячет кнопку броска  
    var ajax=new XMLHttpRequest();
    var fd=new FormData();
    fd.set("db","2375"); //указываем бд
    fd.set("pname","finish_move"); //указываем процедуру
    fd.set("p1",localStorage.getItem('login'));
    fd.set("p2",localStorage.getItem('pas'));
    fd.set("p3",localStorage.getItem('game')); //id игры
    fd.set("format", "rows");
    ajax.open("POST","https://play.lavro.ru/call.php");
    ajax.onload=finish_move_f;
    ajax.send(fd);
}

function finish_move_f(p) { //моя задача изменить состояние игры после броска
    res4 = JSON.parse(p.target.response);
    document.getElementById("game_buttons").style.display = "none";  //иначе - у вашего соперника
}
