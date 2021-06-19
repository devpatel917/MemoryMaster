var a;
var c;
var seconds=60;
seconds=parseInt(seconds);
var sampArray=[];//array for user selection of numbers
var randList=[];//array for random numbers given to user at the start
var blackImage = new Image();
blackImage.src="Pictures/blackImage.jpg";
var pictX=510;
var pictY=535;
var vertical=50;
var horizontal=10;
var randNumTwoArray=[];//array for the entire number search
var amountToMemorize=5;//amount of numbers user is given to memorize
var wordSearchAmount=10;//amount of rows and coloumns in the word search
var currentMoney=0;
currentMoney=parseInt(currentMoney);
wordSearchAmount=parseInt(wordSearchAmount);
amountToMemorize=parseInt(amountToMemorize);
var debt;
function startAnimation(){
    animate();
}
function animate(){
    a=requestAnimationFrame(animate);
    drawBackground();
    drawNumberSearch();
    drawSearcher();
}
function drawNumberSearch() {
    vertical = parseInt(vertical);
    horizontal = parseInt(horizontal);
    var ctx = document.getElementById("myCanvas").getContext("2d");
    ctx.fillStyle = "red";
    ctx.font = "15px Courier Arial";
    //draws number search using nested for loop
    for (x=0;x<wordSearchAmount;x++){
        for (i=(wordSearchAmount*x);i<(wordSearchAmount*(x+1));i++){
            ctx.fillText(randNumTwoArray[i], horizontal, vertical);
            horizontal=horizontal+50;
        }
        horizontal=10;
        vertical=vertical+50;
    }
    horizontal=10;
    vertical=50;
}
function drawBackground(){
    var ctx = document.getElementById("myCanvas").getContext("2d");
    ctx.fillStyle="#33FFAF";
    ctx.fillRect(0,0,1075,1075);
}
function drawSearcher(){
    var ctx = document.getElementById("myCanvas").getContext("2d");
    ctx.drawImage(blackImage,pictX,pictY,35,30);
}
function OnePlayer(){
    makeNumbers();
    c=seconds;
    timer_is_on=0;
    startCount();
}
function makeNumbers(){
    document.getElementById("p1").innerHTML="";
    document.getElementById("OnePlayer").style.visibility = "hidden";

    document.getElementById("MakeSelection").style.visibility = "hidden";
    document.getElementById("FinishSearch").style.visibility = "hidden";
    //makes random numbers for user to memorize
    for (i = 0; i < amountToMemorize; i++) {
        randList.push(Math.floor(Math.random() * 1000 + 1));
    }
    document.getElementById("p2").innerHTML=randList;
    document.getElementById("p2").style.color = "green";
    document.getElementById("p2").style.fontSize = "xx-large";
}
function startCount() {
    if (!timer_is_on) {
        timer_is_on = 1;
        timedCount();
    }
}
function stopCount() {
    clearTimeout(t);
    timer_is_on = 0;
}
function timedCount() {
    document.getElementById("p8").style.color = "red";
    document.getElementById("p8").style.fontSize = "xx-large";
    document.getElementById("p3").innerHTML = c;
    document.getElementById("p3").style.color = "red";
    document.getElementById("p3").style.fontSize = "xx-large";
    c = c - 1;
    t = setTimeout(function(){ timedCount() }, 1000);
    if (c==-1) {
        stopCount();
        c=seconds;
        document.getElementById("p2").innerHTML="";
        document.getElementById("p3").innerHTML="";
        document.getElementById("MakeSelection").style.visibility = "visible";
        document.getElementById("FinishSearch").style.visibility = "visible";
        makeNumberSearch();
    }
}
//javascipt timing functions from https://www.w3schools.com/jsref/met_win_cleartimeout.asp
function makeNumberSearch() {
    for (i=0;i<(wordSearchAmount*wordSearchAmount);i++){
        randNumTwoArray.push(Math.floor(Math.random() * 1000 + 1));
    }
    //above for loop creates the other numbers for the number search
    for (x=0;x<randList.length;x++){
        randNumTwoArray[Math.floor(Math.random() * (wordSearchAmount*wordSearchAmount))]=randList[x]
    }
    //above for loop puts the random numbers given to memorize randomly in the number search
    startAnimation();
}
//above function makes the actual array of all the numbers in the search
function MakeSelection(){
    //by using a pattern I found out, the line below converts the coordinates of the searcher item to the number and appends that number
    sampArray.push(randNumTwoArray[((10*(((pictY+15)/50)-1))+((pictX+40)/50))-1]);
    //checks for duplicates
    for (i=0;i<(sampArray.length-1);i++){
        for (x=i+1;x<sampArray.length;x++){
            if (sampArray[i]==sampArray[x]){
                alert("You picked a Duplicate. Pick again");
                sampArray.splice((sampArray.indexOf(sampArray[x])),1);
            }
        }
    }
    document.getElementById("p7").innerHTML="Selected Numbers: " + sampArray;
    document.getElementById("p7").style.color = "#B19CEA";
    document.getElementById("p7").style.fontSize = "xx-large";
}
function stopAnimation() {
    cancelAnimationFrame(a);
}
function FinishSearch(){
    stopAnimation();
    //checks if all the numbers that the user inputed are correct - comparing them to randList
    var count=0;
    var userInput;
    count=parseInt(count);
    for (i=0;i<randList.length;i++){
        for (x=0;x<sampArray.length;x++){
            if (randList[i]==sampArray[x]){
                count=count+1
            }
        }
    }
    if (count==randList.length){
        if (randList.length==sampArray.length){
            currentMoney=currentMoney+100;
            userInput=prompt("You win this level. Do you want to move on? Remember that if you don't complete the next level, you lose half of your money, but at the same time remember that you don't know your debt amount");
            if (userInput=="yes"){
                sampArray=[];
                document.getElementById("p7").innerHTML="";
                //reseting variables for next level
                randList=[];
                pictX=510;
                pictY=535;
                vertical=50;
                horizontal=10;
                randNumTwoArray=[];
                //changing variables for the next level
                amountToMemorize=amountToMemorize+1;
                seconds=seconds-5;
                wordSearchAmount=wordSearchAmount+1;
                OnePlayer();
            }
            if (userInput=="no"){//user doesn't want to play another level and quits the game
                document.getElementById("p1").innerHTML="";
                document.getElementById("p2").innerHTML="";
                document.getElementById("p3").innerHTML="";
                document.getElementById("p4").innerHTML="";
                document.getElementById("p5").innerHTML="";
                document.getElementById("p6").innerHTML="";
                document.getElementById("p7").innerHTML="";
                document.getElementById("p8").innerHTML="";
                document.getElementById("p1").innerHTML=currentMoney;
                debt=Math.floor(Math.random() * 900 + 100);
                document.getElementById("p2").innerHTML="Your debt was "+ debt;
                if (debt>currentMoney){
                    document.getElementById("p3").innerHTML="YOU LOST THE GAME. YOU WEREN'T ABLE TO PAY BACK YOUR DEBT";
                }
                if (debt<currentMoney){
                    document.getElementById("p4").innerHTML="CONGRATS! YOU WON THE GAME. YOU PAID YOUR DEBT";
                }
            }
        }

    }
    else{
        currentMoney=(currentMoney/2);
        debt=Math.floor(Math.random() * 900 + 100);
        document.getElementById("p1").innerHTML="";
        document.getElementById("p2").innerHTML="Your debt was "+debt;
        if (debt>currentMoney){
            document.getElementById("p3").innerHTML="YOU LOST THE GAME. YOU WEREN'T ABLE TO PAY BACK YOUR DEBT";
        }
        if (debt<currentMoney){
            document.getElementById("p4").innerHTML="CONGRATS! YOU WON THE GAME. YOU PAID YOUR DEBT";
        }
        document.getElementById("p5").innerHTML="";
        document.getElementById("p6").innerHTML="";
        document.getElementById("p7").innerHTML="";
        document.getElementById("p8").innerHTML="";
        document.getElementById("p1").innerHTML="Money " + currentMoney;
    }
}
$(document).keydown(function(event){
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if  (keycode==87){
        pictY-=50;
    }
    if (keycode==65){
        pictX-=50;
    }
    if (keycode==68){
        pictX+=50;
    }
    if (keycode==83){
        pictY+=50;
    }
    //cheat code for time
    if (keycode==49){//1
        c=3;
    }
    //cheat code for doing the number search correctly
    if (keycode==50) {//2
        sampArray = randList;
        document.getElementById("p7").innerHTML = "Selected Numbers: " + sampArray;
        document.getElementById("p7").style.color = "#B19CEA";
        document.getElementById("p7").style.fontSize = "xx-large";
    }
});


