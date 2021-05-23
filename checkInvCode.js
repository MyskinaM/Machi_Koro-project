function checkInvCode() {
    var ajax=new XMLHttpRequest();
    var fd=new FormData();
    fd.set("db","2375"); //указываем бд
    fd.set("pname","enter_close_game_lobby"); //указываем процедуру
    fd.set("p1", localStorage.getItem('login_mc'));
    fd.set("p2", localStorage.getItem('pas_mc'));
	fd.set("p3", document.getElementsByTagName("input")[0].value);
	fd.set('format', 'rows');
    ajax.open("POST","https://play.lavro.ru/call.php");
    ajax.onload=checkICResult;
    ajax.send(fd);
}

function checkICResult(p) {
    var res = JSON.parse(p.target.response)
    console.log(res);
    
    if (res.Error) 
        document.getElementById("wrCode").style.display = "block";
    else
    {
        localStorage.setItem('game_mc', res[0].game_id);
        location.href = '/machikoro/lobby-new.html';
    }
}