function getIncome() {  
    document.querySelector('.getIncome').style.display = 'none'
    document.getElementById('roll').style.display = 'none' //прячет кнопку броска 
    document.getElementById('store').style.display = 'block' //показывает кнопку рынок
	document.getElementById('end_of_turn').style.display = 'block' //показывает кнопку завершить ход

    var ajax=new XMLHttpRequest();
    var fd=new FormData();
    fd.set("db","2375"); //указываем бд
    fd.set("pname","earn_income"); //указываем процедуру
    fd.set("p1",localStorage.getItem('login_mc'));
    fd.set("p2",localStorage.getItem('pas_mc'));
    fd.set("p3",localStorage.getItem('game_mc')); //id игры
    fd.set("format", "rows");
    ajax.open("POST","https://play.lavro.ru/call.php");
    ajax.onload=getIn;
    ajax.send(fd);
}

function getIn(p) 
{ //моя задача изменить состояние игры после броска
    gameState()
}
