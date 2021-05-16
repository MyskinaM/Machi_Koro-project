function roll() {  
    document.getElementById("roll").style.display = "none;"; //прячет кнопку броска  
    var ajax=new XMLHttpRequest();
    var fd=new FormData();
    fd.set("db","2375"); //указываем бд
    fd.set("pname","roll_dice"); //указываем процедуру
    fd.set("p1",localStorage.getItem('login'));
    fd.set("p2",localStorage.getItem('pas'));
    fd.set("p3",localStorage.getItem('game')); //id игры
    fd.set("p4",1); //кол-во кубиков
    fd.set("format", "rows");
    ajax.open("POST","https://play.lavro.ru/call.php");
    ajax.onload=roll_f;
    ajax.send(fd);
}

function roll_f(p) { //моя задача изменить состояние игры после броска
    res3 = JSON.parse(p.target.response);
        document.getElementById("roll").style = "none;"; //прячет кнопку броска  

        document.getElementById("dice1").style.display = "block"; 
        document.getElementById("dote1").style = "opacity:0;"; 
        document.getElementById("dote2").style = "opacity:0;"; 
        document.getElementById("dote3").style = "opacity:0;"; 
        document.getElementById("dote4").style = "opacity:0;";
        document.getElementById("dote5").style = "opacity:0;";  
        document.getElementById("dote6").style = "opacity:0;"; 
        document.getElementById("dote7").style = "opacity:0;"; 
        document.getElementById("dote8").style = "opacity:0;"; 
        document.getElementById("dote9").style = "opacity:0;"; 
        // прячу все точки на кубике
    
        //получаем, сколько выпало на кубиках
        var dice1 = res3[0].dice_1;
        // console.log(dice1);
        //далее соответственно отображается то, что выпало
        switch(dice1) {
            case 1: 
                document.getElementById("dote5").style = "opacity:100;";
                break;
            case 2:
                document.getElementById("dote2").style = "opacity:100;";
                document.getElementById("dote8").style = "opacity:100;";
                break;
            case 3:
                document.getElementById("dote1").style = "opacity:100;";
                document.getElementById("dote5").style = "opacity:100;";
                document.getElementById("dote9").style = "opacity:100;";
                break;
            case 4:
                document.getElementById("dote1").style = "opacity:100;";
                document.getElementById("dote3").style = "opacity:100;";
                document.getElementById("dote7").style = "opacity:100;";
                document.getElementById("dote9").style = "opacity:100;";
                break;
            case 5:
                document.getElementById("dote1").style= "opacity:100;";
                document.getElementById("dote3").style = "opacity:100;";
                document.getElementById("dote5").style = "opacity:100;";
                document.getElementById("dote7").style = "opacity:100;";
                document.getElementById("dote9").style = "opacity:100;";
                break;
            case 6:
                document.getElementById("dote1").style = "opacity:100;";
                document.getElementById("dote3").style = "opacity:100;";
                document.getElementById("dote4").style = "opacity:100;";
                document.getElementById("dote6").style = "opacity:100;";
                document.getElementById("dote7").style = "opacity:100;";
                document.getElementById("dote9").style = "opacity:100;";
                break;
        }

        
        //и последнее - надо изменить сколько у кого монеток
        if (res3[0].nickname === localStorage.getItem('login')) { //если совпадает имя первого игрока в таблице и того, кто в браузере сейчас
            document.querySelector('.gc-you').innerText=res3[0].coins; //изменяет состояние ваше
            document.querySelector('.gc-oth').innerText=res3[1].coins; //изменяет состояние второго игрока
            
        }
        else {
            document.querySelector('.gc-you').innerText=res3[1].coins; //изменяет состояние ваше
            document.querySelector('.gc-oth').innerText=res3[0].coins; //изменяет состояние второго игрока
        }
    
        //также должен исчезнуть бросок и появиться возможность построить или завершить ход у активного игрока
        document.getElementById("roll").style.display = "none;"; //прячет кнопку броска
        document.getElementById("store").style.display = "block;"; //показывает кнопку рынок
        document.getElementById("end_of_turn").style.display = "block;"; //показывает кнопку завершить ход
    
        //а у неактивного новый статус должен начать отображаться
    var k = 0;
    while (res3[k].nickname != localStorage.getItem('login')) //ищем строку с данными по активному игроку
        k++;
    var pl_coins = res3[k].coins; // записали, сколько денег у активного игрока
    var crdsInStore = document.getElementsByClassName("store-card"); // записали типа массив с картами в магазине
    
    k = 0;
    
    while (k < crdsInStore.length)
    {
        if (pl_coins < crdsInStore[k].dataset.item) 
        {
            crdsInStore[k].style.filter = 'grayscale(1)';
            crdsInStore[k].style = "pointer-events: none;";
        }
        else
        {
            crdsInStore[k].style = 'grayscale(0)';
            crdsInStore[k].href = "#buy";
        }
        k++;
    }
}
