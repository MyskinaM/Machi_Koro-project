function finish_move() {  
    document.getElementById("game_buttons").style.display = "none";
    var ajax=new XMLHttpRequest();
    var fd=new FormData();
    fd.set("db","2375"); //указываем бд
    fd.set("pname","finish_move"); //указываем процедуру
    fd.set("p1",localStorage.getItem('login_mc'));
    fd.set("p2",localStorage.getItem('pas_mc'));
    fd.set("p3",localStorage.getItem('game_mc')); //id игры
    fd.set("format", "rows");
    ajax.open("POST","https://play.lavro.ru/call.php");
    ajax.onload=finish_move_f;
    ajax.send(fd);
}

function finish_move_f(p) { //моя задача изменить состояние игры после броска
    res4 = JSON.parse(p.target.response);
    
    document.getElementById('dice1').style.display = 'none'
    document.getElementById('dice2').style.display = 'none'
    
    document.querySelector('.part-turn').style.display = 'block' //отображение плашки состояния игры
    if (res4[0].can_roll_dice === 1)
			//если сейчас бросок кубика
			document.querySelector('.part-turn').innerText =
				'Игрок ' + res4[0].nickname_AcPl + ' бросает кубик'
}
