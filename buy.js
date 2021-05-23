function buy() {    
    var ajax=new XMLHttpRequest();
    var fd=new FormData();
    fd.set("db", "2375"); //указываем бд
    if (localStorage.getItem('sel_ent_mc').charAt(1) === 'l') //проверяет вторую букву в названии
        fd.set("pname", "build_landmark_and_finish_move"); //указываем процедуру
    else
        fd.set("pname", "build_enterprise_and_finish_move"); //указываем процедуру
    fd.set("p1", localStorage.getItem('login_mc'));
    fd.set("p2", localStorage.getItem('pas_mc'));
    fd.set("p3", localStorage.getItem('game_mc')); //id игры
    if (localStorage.getItem('sel_ent_mc').charAt(1) === 'l') //проверяет вторую букву в названии
        fd.set("p4", Number(parseInt(localStorage.getItem('sel_ent_mc'),10))); //id предприятия
    else
        fd.set("p4", Number(localStorage.getItem('sel_ent_mc'))); //id предприятия
    fd.set("format", "rows");
    ajax.open("POST","https://play.lavro.ru/call.php");
    ajax.onload=buy_f;
    ajax.send(fd);
}

function buy_f(p) {
    console.log('купили что-то');
    //добавить предприятие в карты игрока (и у самого игрока, и в картах чужого игрока)
    //отобразить, что ход другого игрока
    res2 = JSON.parse(p.target.response);
    console.log(res2);

    if (res2[0].Error)
    {
        alert('Sorry, something went wrong Т_Т')
    }
    else
    {
        //сначала надо отобразить построенную достопримечательность, если была построена именно она
        var i=0;
        var land;
        var land_id;
        var cntLanPl1 = 0, cntLanPl5 = 0;
        while (i < res2.length)
        {
            console.log('обновление сосотяния карт достопримечательностей');
            if (res2[i].Предприятие.substr(0,7) === "ДОСТОПР")
            {
                if (res2[i].nickname === 'Player1')
                    cntLanPl1++;
                if (res2[i].nickname === 'Player5')
                    cntLanPl5++;
                land = res2[i].id_card; //запомнили id достопримечательности, которая есть у игрока
                land_id = land + "land.png"; // название картинки построенной достопримечательности
                document.getElementById('land' + land).src="images/" + land_id; //по идее, заменяю картинку
            }
            i++;
        }

        if (cntLanPl1 === 4 || cntLanPl5 === 4) //Значит, игра окончена
        {
            let uniquePlayerNames = [...new Set(res2.map(item => item.nickname))] //получаем имена игроков из массива

            let mainCardsArr = res2.filter(item => item["Предприятие"].substr(0, 7) === 'ДОСТОПР') //получаем достопримечательности

            for (let playerName of uniquePlayerNames) {
                playerCards = mainCardsArr.filter(card => card.nickname === playerName) //тута видимо карты достопр конкретного игрока
                if (playerCards.length >= 4) {
                    document.getElementById("game_buttons").style.display = "none";
                    document.getElementById('dice1').style.display = 'none'
                    document.getElementById('dice2').style.display = 'none'

                    document.querySelector('.part-turn').style.display = 'block'
                    //отображает плашку состояния игры
                    if (playerName === localStorage.getItem('login_mc'))
                    {
                        document.querySelector('.part-turn').innerText = 'Вы выиграли! =)'
                    }
                    else
                    {
                        document.querySelector('.part-turn').innerText = playerName + ' победил... =('
                    }
                }
            }
        }
        else {
            document.getElementById("game_buttons").style.display = "none";
            document.getElementById('dice1').style.display = 'none'
            document.getElementById('dice2').style.display = 'none'
            
            document.querySelector('.part-turn').style.display = 'block' //отображение плашки состояния игры
            if (res2[0].can_roll_dice === 1)
                    //если сейчас бросок кубика
                    document.querySelector('.part-turn').innerText =
                        'Игрок ' + res2[0].nickname_AcPl + ' бросает кубик'

            

            var your_crds1 = "";
            var oth_crds1 = "";
            //все достоприм в одном месте
            i=0;
            while (i < res2.length)
            {
                if (res2[i].Предприятие.substr(0,7) != "ДОСТОПР")
                {
                    if (res2[i].nickname === localStorage.getItem('login_mc'))
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
            
            delete localStorage.sel_ent_mc;
        }
    }
    
    gameState()
    
}