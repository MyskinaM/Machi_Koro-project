var priv;

function lobbyState() {
    var ajax=new XMLHttpRequest();
    var fd=new FormData();
    fd.set("db","2375"); //указываем бд
    fd.set("pname","show_game_lobby"); //указываем процедуру
    fd.set("p1", localStorage.getItem('login_mc'));
    fd.set("p2", localStorage.getItem('pas_mc'));
    fd.set("p3", localStorage.getItem('game_mc'));
    fd.set('format', 'rows');
    ajax.open("POST","https://play.lavro.ru/call.php");
    ajax.onload=lobbyStateResult;
    ajax.send(fd);
}

// lobbyState()

var timerId = setInterval(lobbyState, 5000);

function lobbyStateResult(p) {
    var res = JSON.parse(p.target.response)
    console.log(res)   
    
    document.getElementById("plNam").innerText = localStorage.getItem('login_mc'); //Корректное отображение имени
    document.getElementById("gamNam").innerText = res[0].game_name; //Корректное отображение имени

    //Корректное отображение приватности
    priv = res[0].privacy;
    if (priv == 'открытая')
    {
        document.querySelectorAll(".chngpr")[0].style.color = 'rgb(97, 244, 111)' //зеленый
        document.querySelectorAll(".chngpr")[1].style.color = 'rgb(244, 97, 97)' //красный
    }
    else
    {
        document.querySelectorAll(".chngpr")[1].style.color = 'rgb(97, 244, 111)' //зеленый
        document.querySelectorAll(".chngpr")[0].style.color = 'rgb(244, 97, 97)' //красный
    }

    //Вывод кода приглашения
    document.getElementById("code").innerText = res[0].invitation_code

    //если лобби заполнено, отправляет в игру
    if (res[0].howMPlNeed === 0)
        location.href = '/machikoro/game.html';
}