//функция регистрации

function sendlogin() {
    var ajax=new XMLHttpRequest();
    var fd=new FormData();
    fd.set("db","2375"); //указываем бд
    fd.set("pname","login_"); //указываем процедуру
    fd.set("p1",document.log_in[0].login_n.value); //передаем в параметр p1 логин, т.е. данные из name="reg" и name="login_n"
    fd.set("p2",document.log_in[0].pw.value);
    ajax.open("POST","https://play.lavro.ru/call.php"); //вроде как это что-то, что позволяет вызвать процедуру
    ajax.onerror=showError; //а если ошибка, то вот сюда пойдет?
    ajax.onload=getResult;
    ajax.send(fd); //хотя только вот это вот вроде как отправляет о.о
}

function sendreg() {
    var ajax=new XMLHttpRequest();
    var fd=new FormData();
    fd.set("db","2375"); //указываем бд
    fd.set("pname","registration"); //указываем процедуру
    fd.set("p1",document.reg[0].login_n.value); //передаем в параметр p1 логин, т.е. данные из name="reg" и name="login_n"
    fd.set("p2",document.reg[0].mail.value);
    fd.set("p3",document.reg[0].pw1.value);
    fd.set("p4",document.reg[0].pw2.value);
    ajax.open("POST","https://play.lavro.ru/call.php"); //вроде как это что-то, что позволяет вызвать процедуру
    ajax.onerror=showError; //а если ошибка, то вот сюда пойдет?
    ajax.send(fd); //хотя только вот это вот вроде как отправляет о.о
}

function getResult(p){
    var res = JSON.parse(p.target.response);
    console.log(res);
    if (res.toString().substr(1,5)=="Error") alert(res);
    else if (res.Error) alert(p.target.response)
    else if (res.result[0]===1) document.location.href="profile.html";
}

function showError(p) {
    alert(p.target.status);
}