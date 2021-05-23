//Вот этот скрипт отвечает за то, чтобы в том случае, если ты залогинен, т.е. в локал сторендже что-то есть, тебе отображалось что ты в системе залогинен, а иначе - нет.
if (localStorage.getItem('login_mc')) //если localStorage задано, то чел залогинен и надо это отображать
{
    document.getElementById('avaNik').innerHTML = '<div class="status"><svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="18" cy="18" r="16" fill="#61F46F" stroke="#009DC8" stroke-width="4"/></svg></div><div class="nck">' + localStorage.getItem('login_mc') + '</div><img  src="images/ava.png" class="avainmenu">'
}

const avaNikBtn = document.getElementById('avaNik')
avaNikBtn.addEventListener('click', () => {
	if (localStorage.getItem('login_mc')) //если залогинен, то кидает в профиль
        location.href = '/machikoro/profile.html'
    else {
        urlHref = '/machikoro/profile.html'
        location.href = '/machikoro/index.html#login'
    }
})

const inGameBtn = document.getElementById('inGame')
inGameBtn.addEventListener('click', () => {
    console.log(urlHref);
	if (localStorage.getItem('login_mc')) //если залогинен, то кидает в продолжение игры
    {
        location.href = '/machikoro/cont-gam.html'
        console.log(urlHref);
    }  
    else {
        urlHref = '/machikoro/cont-gam.html'
        console.log(urlHref);
        location.href = '/machikoro/index.html#login'
    }
})

const inNewGameBtn = document.getElementById('inNewGame')
inNewGameBtn.addEventListener('click', () => {
	if (localStorage.getItem('login_mc')) //если залогинен, то кидает в начать игру
    {
        console.log('/machikoro/new-gam.html')
        location.href = '/machikoro/new-gam.html'
    }
    else {
        urlHref = '/machikoro/new-gam.html'
        location.href = '/machikoro/index.html#login'
    }
})