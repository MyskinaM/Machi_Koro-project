function registration() {
    if (document.getElementsByTagName("input")[5].value === document.getElementsByTagName("input")[6].value)
    {
        var mail = ''
        var pas = ''
        var log =''

        mail=document.getElementsByTagName("input")[5].value
        console.log(mail)
        console.log(pas)
        console.log(log)
        pas = document.getElementsByTagName("input")[4].value
        log = document.getElementsByTagName("input")[3].value
        var ajax=new XMLHttpRequest();
        var fd=new FormData();
        fd.set("db","2375"); //указываем бд
        fd.set("pname","registration"); //указываем процедуру
        fd.set("p1",log);
        fd.set("p2",pas);
        fd.set("p3",mail);
        fd.set('format', 'rows')
        ajax.open("POST","https://play.lavro.ru/call.php");
        ajax.onload=regResult;
        ajax.send(fd);
    }
    else
        document.getElementById("errReg").innerText = "Введённые пароли не совпадают"
}

function regResult(p) {
    var res = JSON.parse(p.target.response)
    if (res[0].Error)
        document.getElementById("errReg").innerText = res[0].txt
    else
    {
        location.href = '/machikoro/index.html#check-email';
        localStorage.setItem('login_mc', document.getElementsByTagName("input")[3].value);
        localStorage.setItem('pas_mc',document.getElementsByTagName("input")[5].value);
    }
        
}