// обновление и установка состояния игры

function gameState() {
	//запоминает, какой игрок в этом браузере
	const currentPlayerName = localStorage.getItem('login_mc')
	
	var ajax = new XMLHttpRequest()
	var fd = new FormData()
	fd.set('db', '2375') //указываем бд
	fd.set('pname', 'game_state') //указываем процедуру
	fd.set('p1', currentPlayerName)
	fd.set('p2', localStorage.getItem('pas_mc'))
	fd.set('p3', localStorage.getItem('game_mc')) //id игры
	fd.set('format', 'rows')
	ajax.open('POST', 'https://play.lavro.ru/call.php')
	ajax.onload = getResult
	ajax.send(fd)
}

// gameState()

var timerId = setInterval(gameState, 4000);

function getResult(p) {
	

	//снова запоминает ник текущего игрока в браузере
	const currentPlayerName = localStorage.getItem('login_mc')

	//записывает ответ из бд
	var res1 = JSON.parse(p.target.response)
	console.log(res1);

	//Отображение названия игры
	if (!res1[0].Error)
		document.getElementById("GamNam").innerText = res1[0].game_name;

	//отображение ников и аватарок
	document.getElementById('your_name').innerHTML = currentPlayerName
	if (!res1[0].Error)
		if (currentPlayerName === res1[0].nickname) {
			document.getElementById('oth_name').innerHTML = res1[0].next_player
			document.getElementById('oth_name2').innerHTML = res1[0].next_player
			document.getElementById('you_src').src = 'images/ava.png'
			document.getElementById('oth_src').src = 'images/ava2.png'
			document.getElementById('oth_src2').src = 'images/ava2.png'
		} else {
			document.getElementById('oth_name').innerHTML = res1[0].nickname
			document.getElementById('oth_name2').innerHTML = res1[0].nickname
			document.getElementById('you_src').src = 'images/ava2.png'
			document.getElementById('oth_src').src = 'images/ava.png'
			document.getElementById('oth_src2').src = 'images/ava.png'
		}

	//Обработка достопримечательностей
	i = 0
	var land
	var land_id
	let hasVokzal,hasTC, hasTelebashnya, hasPR, hasStad = false
	var cntLanPl1 = 0, cntLanPl5 = 0;
	// console.log('Стадион', hasStad)
	while (i < res1.length) {
		// console.log('обработка достопримечательностей');
		//проход по всем картам всех игроков
		//console.log(res1[i].Предприятие);
		if (res1[i].Предприятие === 'Стадион' && res1[i].nickname === currentPlayerName)
		{
			hasStad = true; //обрабатываем стадион, чтобы в магазине он стал не кликабельным
		}
		if (res1[i].Предприятие.substr(0, 7) === 'ДОСТОПР') {
			if (res1[i].nickname === currentPlayerName)
                cntLanPl1++;
            if (res1[i].nickname != currentPlayerName)
                cntLanPl5++;
			//достопримечательность построена
			//надо отобразить, что она построена
			land = res1[i].id_card //запомнили id достопримечательности, которая есть у игрока
			land_id = land + 'land.png' // название картинки построенной достопримечательности
			if (res1[i].nickname === currentPlayerName) {
				document.getElementById('myland' + land).src =
					'images/' + land_id //заменяю картинку
				if (land === 1)
					hasVokzal = true;
				if (land === 2)
					hasTC = true;
				if (land === 3)
					hasTelebashnya = true;	
				if (land === 4)
					hasPR = true;
			} else
				document.getElementById('othland' + land).src =
					'images/' + land_id //заменяю картинку
			//а если построенная достопримечательность - это вокзал, то надо чтобы при броске кубика, прежде чем был совершен бросок, игрока спросили, сколько кубиков он хочет бросить
		}
		i++
	}
	// console.log('cntLanPl1',cntLanPl1);
	// console.log('cntLanPl5', cntLanPl5);

	//Отображение предприятий
	var your_crds = ''
	var oth_crds = ''
	i = 0
	while (i < res1.length) {
		if (res1[i].Предприятие.substr(0, 7) != 'ДОСТОПР') {
			if (res1[i].nickname === currentPlayerName) {
				//console.log(res1[i].Предприятие);
				your_crds +=
					'<div class="ent"><img class="buy-card card-size" src="images/' +
					res1[i].id_card +
					'entrpr.png"> <div class="num">x' +
					res1[i].Количество +
					'</div></div>'
			} else {
				oth_crds +=
					'<div class="help ent"><img class="buy-card card-size" src="images/' +
					res1[i].id_card +
					'entrpr.png"> <div class="num">x' +
					res1[i].Количество +
					'</div></div>'
			}
		}
		i++
	}
	document.getElementById('enterprices_you').innerHTML = your_crds
	document.getElementById('enterprices_oth').innerHTML = oth_crds

	//выводит кол-во монет
	var i = 0
		while (res1[i].nickname != currentPlayerName) i++
		document.getElementById('your_coins').innerText = res1[i].coins //находит первый элемент с заданным классом
		document.getElementById('yourr_coins').innerText = res1[i].coins //находит первый элемент с заданным классом
		var j = 0
		while (res1[j].nickname == currentPlayerName) j++
		document.getElementById('oth_coins').innerText = res1[j].coins //находит первый элемент с заданным классом
		document.getElementById('oth_coins2').innerText = res1[j].coins //находит первый элемент с заданным классом
	
	//Обработка победил/проиграл
	let uniquePlayerNames = [...new Set(res1.map(item => item.nickname))] //получаем имена игроков из массива
	if (cntLanPl1 === 4 || cntLanPl5 === 4 || uniquePlayerNames.length === 1) //Значит, игра окончена
    {
        
		// console.log(cntLanPl1, cntLanPl5)
        let mainCardsArr = res1.filter(item => item["Предприятие"].substr(0, 7) === 'ДОСТОПР') //получаем достопримечательности

        for (let playerName of uniquePlayerNames) 
		{
            playerCards = mainCardsArr.filter(card => card.nickname === playerName) //тута видимо карты достопр конкретного игрока
            if (playerCards.length >= 4) 
			{
                document.getElementById("game_buttons").style.display = "none";
                document.getElementById('dice1').style.display = 'none'
                document.getElementById('dice2').style.display = 'none'
				document.getElementById('sur').style.display = "none";

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
	else
	{
		if (res1[0].dice_1 != 0) {
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
			var dice_1 = res1[0].dice_1
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

		if (res1[0].dice_2 != 0) {
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
			var dice_2 = res1[0].dice_2
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

		//проверяет, является ли игрок в браузере текущим
		if (res1[0].nickname_AcPl != currentPlayerName) { //игрок в браузере не является текущим
			//проверяет, является ли игрок неактивным
			//если да, то...
			document.querySelector('.part-turn').style.display = 'block' //отображение плашки состояния игры
			if (res1[0].can_roll_dice === 1)
				//если сейчас бросок кубика
				document.querySelector('.part-turn').innerText =
					'Игрок ' + res1[0].nickname_AcPl + ' бросает кубик'
			//находит первый элемент с заданным классом
			//значит фаза строительства
			else
				document.querySelector('.part-turn').innerText =
					'Игрок ' + res1[0].nickname_AcPl + ' строит' //находит первый элемент с заданным классом

			//если вы активный игрок, то у вас тень появится
			document.getElementById('you').style.boxShadow =
				'none'	
			//а у второго игрока исчезнет
			document.getElementById('other').style.boxShadow =
				'rgb(32 33 36 / 60%) 6px 7px'

			//я решила, что рынок должен быть виден всегда.
			document.getElementById('game_buttons').style.display = "block";
			document.getElementById('store').style.display = 'block'
			document.getElementById('roll').style.display = "none";
			document.getElementById('end_of_turn').style.display = "none";
			
		}

		//проверяет, является ли игрок в браузере текущим
		if (res1[0].nickname_AcPl === currentPlayerName) { //игрок в браузере является текущим
			document.querySelector('.part-turn').style.display = 'none' //отображение плашки состояния игры
			//если вы активный игрок, то у вас тень появится
			document.getElementById('you').style.boxShadow =
				'rgb(32 33 36 / 60%) 6px 7px'
			//а у второго игрока исчезнет
			document.getElementById('other').style.boxShadow =
				'none'

			document.getElementById('game_buttons').style.display = 'block'
				//отображение кнопок действий
			if (res1[0].can_roll_dice === 1) { //если это стадия броска
				
				document.getElementById('roll').style.display = 'block' //прячет кнопку броска
				document.getElementById('store').style.display = 'block' //показывает кнопку рынок
				document.getElementById('end_of_turn').style.display = 'none' //показывает кнопку завершить ход
				
			} else {
				document.getElementById('roll').style.display = 'none' //прячет кнопку броска
				document.getElementById('store').style.display = 'block' //показывает кнопку рынок
				document.getElementById('end_of_turn').style.display = 'block' //показывает кнопку завершить ход
			}
		} else {
			document.getElementById('other').style.boxShadow =
				'rgb(32 33 36 / 60%) 6px 7px' //иначе - у вашего соперника
			// а еще для вас скроют блоки, которые отвечают за возможность ходить
		}

		//Для отображения рынка 
		var k = 0
		while (res1[k].nickname != currentPlayerName)
			//ищем строку с данными по активному игроку
			k++
		var pl_coins = res1[k].coins // записали, сколько денег у активного игрока
		var crdsInStore = document.querySelectorAll('.store-card') // записали типа массив с картами в магазине

			//обработка карт рынка
		crdsInStore.forEach((item,i) => {
			console.log('обработка карт рынка');
			if (res1[0].can_roll_dice === 1 || currentPlayerName != res1[0].nickname_AcPl) //если сейчас бросок кубика или в браузере не текущий игрок
				item.classList.add('disabledSpecial')
			else
			{
				item.classList.remove('disabledSpecial')
				if (pl_coins < item.dataset.item) 
				{
					console.log(pl_coins, item.dataset.item);
					item.classList.add('disabled')
				}
				else {
					if (hasVokzal === true && i === 0)
					{
						item.classList.add('disabled')
					}
					else if (hasTC === true && i === 1) {
						item.classList.add('disabled')
					} else if (hasTelebashnya === true && i === 2) {
						item.classList.add('disabled')
					}
					else if (hasPR === true && i === 3)
					{
						item.classList.add('disabled')
					}
					else if (hasStad === true && i === 10)
					{
						item.classList.add('disabled')
					}
					else
					{
						item.classList.remove('disabled')
						item.href = '#buy';
					}
						
				}
			}
				
		})
		
		var rollBtn = document.getElementById('roll')
		rollBtn.replaceWith(rollBtn.cloneNode(true));
		rollBtn = document.getElementById('roll')
		rollBtn.addEventListener('click', () => {
			hasVokzal ? location.href = '/machikoro/game.html#how_many_dices' : roll(1)
		})

		// var div = document.getElementById('roll');
		// var listener = function () {
		// hasVokzal ? location.href = '/machikoro/game.html#how_many_dices' : roll(1)
		// };
		// div.removeEventListener('click', listener, false);
		// div.addEventListener('click', listener, false);

		//Для переброса
		if (res1[0].dice_1 !=0 && res1[0].can_roll_dice === 1 && res1[0].nickname_AcPl === currentPlayerName)
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
	
	}

}
