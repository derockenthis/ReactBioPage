var tobe = document.querySelector(".toBe")
var user = document.querySelector(".userName")
var sent = "to be continued...";
var uname = "Derockenthis"
var i = 0;
var j = 0
function cont(){
    // tobe.innerHTML="HELL"
    if(j<sent.length){
        tobe.innerHTML+=sent.charAt(j);
        j++;
        setTimeout(cont, 93);
    }

}
function contName(){
    // tobe.innerHTML="HELL"
    if(i<uname.length){
        user.innerHTML+=uname.charAt(i);
        i++;
        setTimeout(contName, 93);
    }
    else{
        setTimeout(cont, 100);
    }

}
setTimeout(contName, 800);