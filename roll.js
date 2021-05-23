function roll( diceNum ) {  
    console.log('Бросок кубика')
    document.getElementById('roll').style.display = 'none' //прячет кнопку броска 
    document.getElementById('store').style.display = 'block' //показывает кнопку рынок
	document.getElementById('end_of_turn').style.display = 'block' //показывает кнопку завершить ход
    // console.log(diceNum);
    var ajax=new XMLHttpRequest();
    var fd=new FormData();
    fd.set("db","2375"); //указываем бд
    fd.set("pname","roll_dice"); //указываем процедуру
    fd.set("p1",localStorage.getItem('login_mc'));
    fd.set("p2",localStorage.getItem('pas_mc'));
    fd.set("p3",localStorage.getItem('game_mc')); //id игры
    fd.set("p4",diceNum); //кол-во кубиков
    fd.set("format", "rows");
    ajax.open("POST","https://play.lavro.ru/call.php");
    ajax.onload=roll_f;
    // ajax.onload = getResult
    ajax.send(fd);
}

function roll_f(p) 
{ //моя задача изменить состояние игры после броска
    // gameState()
	// console.log('Бросок кубика')
    res = JSON.parse(p.target.response);
    console.log(res);

    if (res[0].dice_1 !=0 && res[0].can_roll_dice === 1)
		{
            document.getElementById('roll').style.display = 'block' //прячет кнопку броска 
			document.getElementById('roll').innerText = 'переброс'
			document.querySelector('.getIncome').style.display = 'block'
            document.getElementById('end_of_turn').style.display = 'none' //показывает кнопку завершить ход
		}
		else
		{
			document.getElementById('roll').innerText = 'бросок'
			document.querySelector('.getIncome').style.display = 'none'
		}

        if (res[0].dice_1 != 0) {
			document.getElementById('dice1').style.display = 'block'
			document.getElementById('dote1').style = 'opacity:0;'
			document.getElementById('dote2').style = 'opacity:0;'
			document.getElementById('dote3').style = 'opacity:0;'
			document.getElementById('dote4').style = 'opacity:0;'
			document.getElementById('dote5').style = 'opacity:0;'
			document.getElementById('dote6').style = 'opacity:0;'
			document.getElementById('dote7').style = 'opacity:0;'
			document.getElementById('dote8').style = 'opacity:0;'
			document.getElementById('dote9').style = 'opacity:0;'
			var dice_1 = res[0].dice_1
			switch (dice_1) {
				case 1:
					document.getElementById('dote5').style = 'opacity:100;'
					break
				case 2:
					document.getElementById('dote2').style = 'opacity:100;'
					document.getElementById('dote8').style = 'opacity:100;'
					break
				case 3:
					document.getElementById('dote1').style = 'opacity:100;'
					document.getElementById('dote5').style = 'opacity:100;'
					document.getElementById('dote9').style = 'opacity:100;'
					break
				case 4:
					document.getElementById('dote1').style = 'opacity:100;'
					document.getElementById('dote3').style = 'opacity:100;'
					document.getElementById('dote7').style = 'opacity:100;'
					document.getElementById('dote9').style = 'opacity:100;'
					break
				case 5:
					document.getElementById('dote1').style = 'opacity:100;'
					document.getElementById('dote3').style = 'opacity:100;'
					document.getElementById('dote5').style = 'opacity:100;'
					document.getElementById('dote7').style = 'opacity:100;'
					document.getElementById('dote9').style = 'opacity:100;'
					break
				case 6:
					document.getElementById('dote1').style = 'opacity:100;'
					document.getElementById('dote3').style = 'opacity:100;'
					document.getElementById('dote4').style = 'opacity:100;'
					document.getElementById('dote6').style = 'opacity:100;'
					document.getElementById('dote7').style = 'opacity:100;'
					document.getElementById('dote9').style = 'opacity:100;'
					break
			}
		} else document.getElementById('dice1').style.display = 'none'

		if (res[0].dice_2 != 0) {
			document.getElementById('dice2').style.display = 'block'
			document.getElementById("dote1_2").style = "opacity:0;"; 
			document.getElementById("dote2_2").style = "opacity:0;"; 
			document.getElementById("dote3_2").style = "opacity:0;"; 
			document.getElementById("dote4_2").style = "opacity:0;";
			document.getElementById("dote5_2").style = "opacity:0;";  
			document.getElementById("dote6_2").style = "opacity:0;"; 
			document.getElementById("dote7_2").style = "opacity:0;"; 
			document.getElementById("dote8_2").style = "opacity:0;"; 
			document.getElementById("dote9_2").style = "opacity:0;"; 
			var dice_2 = res[0].dice_2
			switch (dice_2) {
				case 1: 
						document.getElementById("dote5_2").style = "opacity:100;";
						break;
					case 2:
						document.getElementById("dote2_2").style = "opacity:100;";
						document.getElementById("dote8_2").style = "opacity:100;";
						break;
					case 3:
						document.getElementById("dote1_2").style = "opacity:100;";
						document.getElementById("dote5_2").style = "opacity:100;";
						document.getElementById("dote9_2").style = "opacity:100;";
						break;
					case 4:
						document.getElementById("dote1_2").style = "opacity:100;";
						document.getElementById("dote3_2").style = "opacity:100;";
						document.getElementById("dote7_2").style = "opacity:100;";
						document.getElementById("dote9_2").style = "opacity:100;";
						break;
					case 5:
						document.getElementById("dote1_2").style= "opacity:100;";
						document.getElementById("dote3_2").style = "opacity:100;";
						document.getElementById("dote5_2").style = "opacity:100;";
						document.getElementById("dote7_2").style = "opacity:100;";
						document.getElementById("dote9_2").style = "opacity:100;";
						break;
					case 6:
						document.getElementById("dote1_2").style = "opacity:100;";
						document.getElementById("dote3_2").style = "opacity:100;";
						document.getElementById("dote4_2").style = "opacity:100;";
						document.getElementById("dote6_2").style = "opacity:100;";
						document.getElementById("dote7_2").style = "opacity:100;";
						document.getElementById("dote9_2").style = "opacity:100;";
						break;
			}
		} else document.getElementById('dice2').style.display = 'none'

        gameState()
}
