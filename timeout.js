// обновление и установка состояния игры

function gameState() {
	const currentPlayerName = localStorage.getItem('login')
	document.getElementById('your_name').innerHTML = currentPlayerName
	if (currentPlayerName === 'Player1') {
		document.getElementById('oth_name').innerHTML = 'Player5'
		document.getElementById('oth_name2').innerHTML = 'Player5'
		document.getElementById('you_src').src = 'images/ava.png'
		document.getElementById('oth_src').src = 'images/ava2.png'
		document.getElementById('oth_src2').src = 'images/ava2.png'
	} else {
		document.getElementById('oth_name').innerHTML = 'Player1'
		document.getElementById('oth_name2').innerHTML = 'Player1'
		document.getElementById('you_src').src = 'images/ava2.png'
		document.getElementById('oth_src').src = 'images/ava.png'
		document.getElementById('oth_src2').src = 'images/ava.png'
	}

	var ajax = new XMLHttpRequest()
	var fd = new FormData()
	fd.set('db', '2375') //указываем бд
	fd.set('pname', 'game_state') //указываем процедуру
	fd.set('p1', currentPlayerName)
	fd.set('p2', localStorage.getItem('pas'))
	fd.set('p3', localStorage.getItem('game')) //id игры
	fd.set('format', 'rows')
	ajax.open('POST', 'https://play.lavro.ru/call.php')
	ajax.onload = getResult
	ajax.send(fd)
}

gameState()
//var timerId = setInterval(gameState, 5000);

function getResult(p) {
	var res1 = JSON.parse(p.target.response)
	console.log(res1)
	//Состояние игры
	if (res1[0].nickname_AcPl != currentPlayerName) {
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
	}

	if (res1[0].nickname_AcPl === currentPlayerName) {
		//если вы активный игрок, то у вас тень появится
		document.getElementById('you').style.boxShadow =
			'rgb(32 33 36 / 60%) 6px 7px'
		//отображение кнопок действий
		if (res1[0].can_roll_dice === 1) {
			document.getElementById('roll').style.display = 'block' //прячет кнопку броска
			document.getElementById('store').style.display = 'none' //показывает кнопку рынок
			document.getElementById('end_of_turn').style.display = 'none' //показывает кнопку завершить ход
		} else {
			document.getElementById('roll').style.display = 'none' //прячет кнопку броска
			document.getElementById('store').style.display = 'block' //показывает кнопку рынок
			document.getElementById('end_of_turn').style.display = 'block' //показывает кнопку завершить ход
		}
	} else {
		document.getElementById('other').style.boxShadow =
			'rgb(32 33 36 / 60%) 6px 7px' //иначе - у вашего соперника
		document.getElementById('game_buttons').style.display = 'none' //иначе - у вашего соперника
		// а еще для вас скроют блоки, которые отвечают за возможность ходить
	}

	var i = 0
	while (res1[i].nickname != currentPlayerName) i++
	document.getElementById('your_coins').innerText = res1[i].coins //находит первый элемент с заданным классом
	document.getElementById('yourr_coins').innerText = res1[i].coins //находит первый элемент с заданным классом
	var j = 0
	while (res1[j].nickname == currentPlayerName) j++
	document.getElementById('oth_coins').innerText = res1[j].coins //находит первый элемент с заданным классом

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

	//Обработка достопримечательностей
	i = 0
	var land
	var land_id
	let hazVokzal = false
	while (i < res1.length) {
		//проход по всем картам всех игроков
		//console.log(res1[i].Предприятие);
		if (res1[i].Предприятие.substr(0, 7) === 'ДОСТОПР') {
			//достопримечательность построена
			//надо отобразить, что она построена
			land = res1[i].id_card //запомнили id достопримечательности, которая есть у игрока
			land_id = land + 'land.png' // название картинки построенной достопримечательности
			if (res1[i].nickname === currentPlayerName) {
				document.getElementById('myland' + land).src =
					'images/' + land_id //заменяю картинку
				hazVokzal = true
			} else
				document.getElementById('othland' + land).src =
					'images/' + land_id //заменяю картинку
			//а если построенная достопримечательность - это вокзал, то надо чтобы при броске кубика, прежде чем был совершен бросок, игрока спросили, сколько кубиков он хочет бросить
		}
		i++
	}

	var your_crds = ''
	var oth_crds = ''
	//все достоприм в одном месте
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

	var k = 0
	while (res1[k].nickname != currentPlayerName)
		//ищем строку с данными по активному игроку
		k++
	var pl_coins = res1[k].coins // записали, сколько денег у активного игрока
	var crdsInStore = document.querySelectorAll('.store-card') // записали типа массив с картами в магазине

	crdsInStore.forEach(item => {
		if (pl_coins < item.dataset.item) {
			item.classList.add('disabled')
		} else {
			item.href = '#buy'
		}
	})
	// k = 0;

	// while (k < crdsInStore.length)
	// {
	//     if (pl_coins < crdsInStore[k].dataset.item)
	//     {
	//         document.getElementsByClassName("store-card")[k].style.filter = 'grayscale(1)';
	//         crdsInStore[k].style = "pointer-events: none;";
	//     }
	//     else
	//     {
	//         crdsInStore[k].style = 'grayscale(0)';
	//         crdsInStore[k].href = "#buy";
	//     }
	//     k++;
	// }

	document.addEventListener('DOMContentLoaded', e => {
		const rollBtn = document.getElementById('roll')
		rollBtn.addEventListener('click', () => {
			hasVokzal ? (location.href = '/game#how_many_dices') : roll()
		})
	})
}
