function sendreg() {
    var ajax=new XMLHttpRequest();
    var fd=new FormData();
    fd.set("db","2375"); //указываем бд
    fd.set("pname","registration"); //указываем процедуру
    fd.set("p1",document.reg.login_n.value); //передаем в параметр p1 логин, т.е. данные из name="reg" и name="login_n"
    fd.set("p2",document.reg.mail.value);
    fd.set("p2",document.reg.pw1.value);
    fd.set("p2",document.reg.pw2.value);
    ajax.open("POST","https://play.lavro.ru/call.php"); //вроде как это что-то, что позволяет вызвать процедуру
    ajax.onload=showTxt; //Эээ типа если ответ пришёл, то по этой функции вывод сделает
    ajax.onerror=showError; //а если ошибка, то вот сюда пойдет?
    ajax.send(fd); //хотя только вот это вот вроде как отправляет о.о
}

function showTxt(p){
    var res = JSON.parse(p.target.response);
    console.log(res);
    if (res.toString().substr(1,5)=="Error") alert(res);
    else if (res.Error) alert(p.target.response);
}

function showError(p) {
    alert(p.target.status);
}