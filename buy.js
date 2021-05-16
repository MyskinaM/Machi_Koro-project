function buy() {    
    var ajax=new XMLHttpRequest();
    var fd=new FormData();
    fd.set("db", "2375"); //указываем бд
    if (localStorage.getItem('sel_ent').charAt(1) === 'l') //проверяет вторую букву в названии
        fd.set("pname", "build_landmark_and_finish_move"); //указываем процедуру
    else
        fd.set("pname", "build_enterprise_and_finish_move"); //указываем процедуру
    fd.set("p1", localStorage.getItem('login'));
    fd.set("p2", localStorage.getItem('pas'));
    fd.set("p3", localStorage.getItem('game')); //id игры
    if (localStorage.getItem('sel_ent').charAt(1) === 'l') //проверяет вторую букву в названии
        fd.set("p4", Number(parseInt(localStorage.getItem('sel_ent'),10))); //id предприятия
    else
        fd.set("p4", Number(localStorage.getItem('sel_ent'))); //id предприятия
    fd.set("format", "rows");
    ajax.open("POST","https://play.lavro.ru/call.php");
    ajax.onload=buy_f;
    ajax.send(fd);
}

function buy_f(p) {
    //добавить предприятие в карты игрока (и у самого игрока, и в картах чужого игрока)
    //отобразить, что ход другого игрока
    res2 = JSON.parse(p.target.response);
    
    var i=0;
    var land;
    var land_id;
    while (i < res2.length)
    {
        if (res2[i].Предприятие.substr(0,7) === "ДОСТОПР")
        {
            land = res2[i].id_card; //запомнили id достопримечательности, которая есть у игрока
            land_id = land + "land.png"; // название картинки построенной достопримечательности
            document.getElementById('land' + land).src="images/" + land_id; //по идее, заменяю картинку
        }
        i++;
    }

    var your_crds1 = "";
    var oth_crds1 = "";
    //все достоприм в одном месте
    i=0;
    while (i < res2.length)
    {
        if (res2[i].Предприятие.substr(0,7) != "ДОСТОПР")
        {
            if (res2[i].nickname === localStorage.getItem('login'))
            {
                your_crds1 += '<div class="ent"><img class="buy-card card-size" src="images/' + res2[i].id_card + 'entrpr.png"> <div class="num">x' + res2[i].Количество + '</div></div>';
            }
            else
            {
                oth_crds1 += '<div class="help ent"><img class="buy-card card-size" src="images/' + res2[i].id_card + 'entrpr.png"> <div class="num">x' + res2[i].Количество + '</div></div>';
            }
        }
        i++;
    }
    document.getElementById("enterprices_you").innerHTML = your_crds1;
    document.getElementById("enterprices_oth").innerHTML = oth_crds1;
    
    delete localStorage.sel_ent;
}