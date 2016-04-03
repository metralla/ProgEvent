var listeBalle = new Array;
var nbBalles = 0;
var nbBallePerdu = 0;
var nbBalleRamasees = 0;
var b;
var c;
var mouseX;
var keyPress;
var keyB;
var gauche = 37;
var droite = 39;
var musique = new Audio('marioSong.mp3');
var son = new Audio('piece.wav');
//var sonperdu = new Audio('game-over.wav');


var pause = 32;
var Alert = new CustomAlert();
var ALERT_TITLE = "Jeu en pause";

var isPaused = 0;
var t1;
var t2;
var timerAccelere;
var acceleration = 0;
var timingFall = 1000;  // Intervalle de génération d'une nouvelle balle

function gestionMouse(event){
    mouseX = event.clientX - c.offsetLeft;
}

function gestionKeyDown(evt){
	//document.getElementById("evt").innerHTML = "keycode: "+evt.keyCode;
	if(evt.keyCode == droite){
		keyPress = 2;
	}
	else if(evt.keyCode == gauche){
		keyPress = 1;
	}

    pauseGame(evt);

}

function pauseGame(event){
    if(event.keyCode == pause){
        if(isPaused == 0 ){
            Alert.render("APPUYEZ SUR ESPACE POUR REPRENDRE");
        }else{
            Alert.ok();
        }
    }
}

function gestionKeyUp(evt){
	//document.getElementById("evt").innerHTML = "keycode: "+evt.keyCode;
	keyPress = 0;
}


/* Source ayant servi pour la custom alert : http://www.developphp.com/view.php?tid=1384  */
function CustomAlert(){
    this.render = function(dialog){
        var winW = window.innerWidth;
        var winH = window.innerHeight;
        var dialogoverlay = document.getElementById('dialogoverlay');
        var dialogbox = document.getElementById('dialogbox');
        dialogoverlay.style.display = "block";
        dialogoverlay.style.height = winH+"px";
        dialogbox.style.left = (winW/2) - (550 * .5)+"px";
        dialogbox.style.top = (winH/2) - 200 +"px";
        dialogbox.style.display = "block";
        document.getElementById('dialogboxhead').innerHTML = ALERT_TITLE;
        document.getElementById('dialogboxbody').innerHTML = dialog;
        document.getElementById('dialogboxfoot').innerHTML = '<input type="button" value="Reprendre" onclick="Alert.ok()"/>';
        clearInterval(t1);
        clearInterval(t2);
        clearInterval(timerAccelere);
        isPaused = 1;

    }
    this.ok = function(){
        document.getElementById('dialogbox').style.display = "none";
        document.getElementById('dialogoverlay').style.display = "none";
        initTimer();
        isPaused = 0;
    }
}


function CreerBalle(x,y,vitesse,couleur,rayon) {
	this.x=x;
	this.y=y;
	this.vitesse=vitesse;
	this.couleur=couleur;
    this.rayon = rayon;
}

function CreerBarre(taille)
{
	this.xBarre=200;
	this.y=625;
    this.taille = taille;
	this.couleur='rgb(0,0,0)';


	this.Draw = function()
	{
    var ctx = c.getContext("2d");

	ctx.drawImage(document.getElementById("ImgBarre"),this.xBarre,this.y,taille+20,taille/2);
	/*ctx.beginPath();
    ctx.strokeStyle=this.couleur;
	ctx.moveTo(this.xBarre,this.y);
	ctx.lineTo(this.xBarre+ this.taille,this.y);
	ctx.lineWidth = 3;
	ctx.stroke();
	ctx.closePath();*/
	}

    this.GoLeft = function(){
        if(this.xBarre - 15 >= 0){
            this.xBarre -= 15;
        }
    }

    this.GoRight = function(){
        if(this.xBarre + 15 <= c.width - this.taille){
            this.xBarre += 15;
        }

    }

    this.catch = function(balle){
    if(  balle.y <= this.y &&   this.y <=  balle.y + balle.rayon){
        if( this.xBarre <= balle.x - (balle.rayon * 2) && balle.x - (balle.rayon * 2) <= this.xBarre + this.taille ){
            nbBalleRamasees++;
			son.pause();
			son.currentTime = 2;
			son.play();			
            return true;
        }

        if(this.xBarre <= balle.x  + (balle.rayon*2) && balle.x + (balle.rayon*2) <= this.xBarre + this.taille){
            nbBalleRamasees++;
			son.pause();
			son.currentTime = 2;
			son.play();	
            return true;
        }
    }
}
}

function AjouterBalle()
{
	var x = Math.floor((Math.random()*(c.width-80))+40);
	var y = 0;
	var vitesse = Math.floor((Math.random()*5)+5);
	listeBalle[listeBalle.length] = new CreerBalle(x,y,vitesse,'rgb(255,255,255)', 20);
}

function gestion()
{
    if((mouseX < b.xBarre + (b.taille/2)) || (keyPress == 1)){
        b.GoLeft();
    }
    if((mouseX > b.xBarre + (b.taille/2)) || (keyPress == 2)){
        b.GoRight();
    }
    for(var i=0;i<listeBalle.length;i++)
	{
		listeBalle[i].y = listeBalle[i].y + listeBalle[i].vitesse;
        if(b.catch(listeBalle[i])){
            document.getElementById("nbBilleRamassees").innerHTML = "Score: "+nbBalleRamasees;
            listeBalle.splice(i,1);
            i--;
        }
		if(listeBalle[i].y + listeBalle[i].rayon >= c.height)
		{
			listeBalle.splice(i,1);
			i--;
			nbBallePerdu++;
			document.getElementById("nbBillePerdu").innerHTML = "Nombre de pi&egrave;ces manqu&eacute;es: "+nbBallePerdu;
			if(nbBallePerdu >= 10)
			{
				//sonperdu.play();
				fin();
			}
		}
	}
	dessin();
}

function fin(){
	var nom = document.getElementById("nom").value;
	var type = '?nom='+nom+"&nb="+nbBalleRamasees;
	var adresse = "./traitementFin.php"+type;
	window.location.replace(adresse);
}

function tomberBalle()
{
	AjouterBalle();
	nbBalles++;
	document.getElementById("nbBille").innerHTML = "Nombre de pi&egrave;ces : "+nbBalles;
}

function init()
{
	musique.play();
	c = document.getElementById("mon_canvas");
	b = new CreerBarre(100);
    initTimer();
}

function initTimer(){
    t1 = setInterval("gestion()",30);
    t2 = setInterval("tomberBalle()",timingFall);
    timerAccelere = setInterval("vitesseUp()",5000);
}

function vitesseUp(){
    acceleration += 1;
    if(timingFall > 300){
        timingFall -= 100;
        clearInterval(t2);
        t2 = setInterval("tomberBalle()",timingFall);
    }
}

function dessin()
{
	var ctx = c.getContext("2d");
	ctx.drawImage(document.getElementById("fondJeu"),0,0,1581,1577);
	
	for(var i=0;i<listeBalle.length;i++)
	{
		ctx.drawImage(document.getElementById("ImgPiece"),listeBalle[i].x,listeBalle[i].y,listeBalle[i].rayon*2,listeBalle[i].rayon*2);
	}
    b.Draw();
}

