const slotsBtn = document.getElementById('slots')
slotsBtn.addEventListener('click', (e) => {
    // console.log(e.target);
    if (e.target.classList.contains('button-delete')) {
        // console.log( e.target.dataset.item)
        leave(e.target.dataset.item);
    }
    if (e.target.classList.contains('button-play')) {
        // console.log( e.target.dataset.item)
        localStorage.setItem('game_mc', e.target.dataset.item);
        location.href = '/machikoro/game.html';
    }
})

function contGam() {
    console.log('Обновление состояния списка игр');
    var ajax=new XMLHttpRequest();
    var fd=new FormData();
    fd.set("db","2375"); //указываем бд
    fd.set("pname","contGam"); //указываем процедуру
    fd.set("p1", localStorage.getItem('login_mc'));
    fd.set("p2", localStorage.getItem('pas_mc'));
    fd.set('format', 'rows');
    ajax.open("POST","https://play.lavro.ru/call.php");
    ajax.onload=contGamResult;
    ajax.send(fd);
}

contGam()   

function contGamResult(p) {
    var res = JSON.parse(p.target.response)
    console.log('res',res);
    // console.log(res.length);
    // console.log(res[0].game_name);
    
    
    
    if (res[0].sorry) 
        document.getElementById("center").style.display = "block";
    else
    {
        let BigHtml = ''
        let win=''
        
        let i = 0;
        // console.log(i,res.length);
        while (i < res.length)
        {
            // console.log(i);
            // win=''
            // console.log(res[i].nickname)
            if (res[i].nickname) // если оно не нул на всякий
            {
                // console.log('☀');
                win='☀'
            }
            else
            {
                win=''
            }
            BigHtml+= '<div  class="game-slot"> <div class="game-slot_content"> <div class="game-name">' + res[i].game_name + '</div>  <svg width="4" height="65" viewBox="0 0 4 65" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M2 0V65" stroke="white" stroke-width="3" /> </svg> <svg width="29" height="52" viewBox="0 0 29 52" fill="none" xmlns="http://www.w3.org/2000/svg"> <circle cx="14" cy="8" r="8" fill="white" /> <path d="M28 27C27.178 20.8537 22.7768 17.7724 20.6789 17C18.4344 18.729 16.1128 19.3297 14 19.3161V52C14 52 28.822 33.1463 28 27Z" fill="white" /> <path d="M0.032959 27C0.854978 20.8537 5.2562 17.7724 7.35406 17C9.59859 18.729 11.9202 19.3297 14.033 19.3161V52C14.033 52 -0.78906 33.1463 0.032959 27Z" fill="white" /> </svg> <svg width="4" height="65" viewBox="0 0 4 65" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M2 0V65" stroke="white" stroke-width="3" /> </svg> <div class="game-num">2</div> <svg width="4" height="65" viewBox="0 0 4 65" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M2 0V65" stroke="white" stroke-width="3" /> </svg>  <a data-item=' + res[i].game_id + ' class="button-delete">покинуть</a>' + win + ' <a data-item=' + res[i].game_id + ' class="button-play">играть</a> </div> </div>'
            i++;
        }
        // console.log('BL',BigHtml);
        document.getElementById('slots').innerHTML = BigHtml;
    
    }
}