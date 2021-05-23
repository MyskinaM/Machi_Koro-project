function createGam() {
    console.log(priv);
    var ajax=new XMLHttpRequest();
    var fd=new FormData();
    fd.set("db","2375"); //указываем бд
    fd.set("pname","create_game"); //указываем процедуру
    fd.set("p1", localStorage.getItem('login_mc'));
    fd.set("p2", localStorage.getItem('pas_mc'));
    fd.set("p3", document.getElementsByTagName("input")[0].value);
    fd.set("p4", 2);
    fd.set("p5", priv);
    console.log(priv);
    fd.set('format', 'rows');
    ajax.open("POST","https://play.lavro.ru/call.php");
    ajax.onload=createGamResult;
    ajax.send(fd);
}

function createGamResult(p) {
    var res = JSON.parse(p.target.response)
    console.log(res)
    if (res[0].Error)
        document.getElementById("errCrtGm").style.display = "block";
    else
    {
        localStorage.setItem('game_mc', res[0].game_id);
        location.href = '/machikoro/lobby-new.html';
    }
        
}