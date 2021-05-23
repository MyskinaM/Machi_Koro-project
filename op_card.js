function op_card() {
    document.getElementById('opCard').src=event.target.src;
    var imageBall = document.getElementById("opCard");
    var src = imageBall.src;
    var li = src.lastIndexOf("/");
    var fileName = src.substring(li + 1); //тут название картинки лежит
    if (fileName.charAt(1) === 'l') //проверяет вторую букву в названии
        localStorage.setItem('sel_ent_mc', fileName,10); //закинули название landmark
    else
        localStorage.setItem('sel_ent_mc', parseInt(fileName,10)); //закинули сюда id предприятия
};