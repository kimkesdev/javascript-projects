var canvas;

var fps;

var winScore;

var pWidth;
var pHeight;

var p1;
var p1X;
var p1Y;
var p1Col;
var p1Score;


var p2;
var p2X;
var p2Y;
var p2Col;
var p2Score;

var ball;
var bSize;
var bX;
var bY;
var bCol;

var ySpeed;
var xSpeed;
var padSpeed;

var wPress;
var sPress;
var oPress;
var lPress;



function finit(){
	canvas=document.getElementById("canvas1");
	
	pWidth=10;
	pHeight=50;
	
	fps=60;
	
	winScore=5;
	
	p1=canvas.getContext("2d");
	p1X=0;
	p1Y=100;
	p1Col="red";
	
	p2=canvas.getContext("2d");
	p2X=490;
	p2Y=100;
	p2Col="blue";
	
	ball=canvas.getContext("2d");
	bSize=10;
	bX=240;
	bY=140;
	bCol="white";
	
    xSpeed=5;
    ySpeed=-5;
    
	padSpeed=5;
	
    p1Score=0;
    p2Score=0;
	
    wPress=false;
    sPress=false;
    oPress=false;
    lPress=false;
}
function f1(){
drawB();
}
function f2(){
setInterval(function(){
    if(bY>=290){ySpeed=-ySpeed;}
    if(bY<=0){ySpeed=-ySpeed;}
    if(bX>=(480)){
        if(bY>=p2Y&&bY<=p2Y+pHeight){xSpeed=-xSpeed;
			ySpeed=(((bY+bSize/2)-(p2Y+pHeight/2))/6);}
        else{p1Score++;eraseB();bX=240;bY=140;xSpeed=-xSpeed;
			document.getElementById("d3").innerHTML=p1Score;}
    }
    if(bX<=(10)){
        if(bY>=p1Y&&bY<=p1Y+pHeight){xSpeed=-xSpeed;
			ySpeed=(((bY+bSize/2)-(p1Y+pHeight/2))/6);}
        else{p2Score++;eraseB();bX=240;bY=140;xSpeed=-xSpeed;
        document.getElementById("d5").innerHTML=p2Score;}
    }
    if(p1Score<winScore&&p2Score<winScore){moveB();}
    else if(p1Score==winScore){document.getElementById("d1").innerHTML="p1 wins";}
    else if(p2Score==winScore){document.getElementById("d1").innerHTML="p2 wins";}
	
    
    if(wPress==true){moveP1Up();}
	 if(sPress==true){moveP1Down();}
	  if(oPress==true){moveP2Up();}
	   if(lPress==true){moveP2Down();}
    
},1000/fps);
	
}
function moveB(){
    eraseB();
    bX=bX+xSpeed;
    bY=bY+ySpeed;
    drawB();
}
function drawB(){
	ball.fillStyle=bCol;
	ball.fillRect(bX,bY,bSize,bSize);
}
function eraseB(){
	ball.fillStyle="black";
	ball.fillRect(bX,bY,bSize,bSize);
}
function drawP1(){
	p1.fillStyle=p1Col;
	p1.fillRect(p1X,p1Y,pWidth,pHeight);
}
function eraseP1(){
	p1.fillStyle="black";
	p1.fillRect(p1X,p1Y,pWidth,pHeight);
}
function drawP2(){
	p2.fillStyle=p2Col;
	p2.fillRect(p2X,p2Y,pWidth,pHeight);
}
function eraseP2(){
		p2.fillStyle="black";
	p2.fillRect(p2X,p2Y,pWidth,pHeight);
}
function moveP1Up(){
	eraseP1();
	p1Y=p1Y-(padSpeed);
	drawP1();
}
function moveP1Down(){
	eraseP1();
	p1Y=p1Y+(padSpeed);
	drawP1();
}
function moveP2Up(){
	eraseP2();
	p2Y=p2Y-(padSpeed);
	drawP2();
}
function moveP2Down(){
	eraseP2();
	p2Y=p2Y+(padSpeed);
	drawP2();
}
window.addEventListener('keypress',function(event){
var x=event.key;
if(x=="w"){wPress=true;}
 if(x=="s"){sPress=true;}

    
if(x=="o"){oPress=true;}
else if(x=="l"){lPress=true;}

},false);
window.addEventListener('keyup',function(event){
var x=event.key;
if(x=="w"){wPress=false;}
 if(x=="s"){sPress=false;}

    
if(x=="o"){oPress=false;}
else if(x=="l"){lPress=false;}

},false);
