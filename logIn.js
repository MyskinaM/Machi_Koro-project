var urlHref;

const sucRegBtn = document.getElementById('sucReg');
sucRegBtn.addEventListener('click', () => {
    location.href = urlHref;
})

function logIn() {
    var ajax=new XMLHttpRequest();
    var fd=new FormData();
    fd.set("db","2375"); //указываем бд
    fd.set("pname","login"); //указываем процедуру
    console.log(document.getElementsByTagName("input")[0].value, document.getElementsByTagName("input")[1].value);
    fd.set("p1",document.getElementsByTagName("input")[0].value);
    fd.set("p2",document.getElementsByTagName("input")[1].value);
    ajax.open("POST","https://play.lavro.ru/call.php");
    ajax.onload=loginResult;
    ajax.send(fd);
}

function loginResult(p) {
    var res = JSON.parse(p.target.response)
    console.log(res);
    // console.log(res.toString());
    if (res.Error) 
        document.getElementById("erWrLgPs").style.display = "block";
    else
    {
        localStorage.setItem('login_mc', document.getElementsByTagName("input")[0].value);
        localStorage.setItem('pas_mc', document.getElementsByTagName("input")[1].value);
        console.log(urlHref);
        location.href = urlHref;
    }
}