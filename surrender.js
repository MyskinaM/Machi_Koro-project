function surrender() {
	var ajax = new XMLHttpRequest()
	var fd = new FormData()
	fd.set('db', '2375') //указываем бд
	fd.set('pname', 'leave_lobby') //указываем процедуру
	fd.set('p1', currentPlayerName)
	fd.set('p2', localStorage.getItem('pas_mc'))
	fd.set('p3', localStorage.getItem('game_mc')) //id игры
	fd.set('format', 'rows')
	ajax.open('POST', 'https://play.lavro.ru/call.php')
	// ajax.onload = surrender_f
	ajax.send(fd)
}

// function surrender_f(p) {
// 	var res = JSON.parse(p.target.response)
	
// }
