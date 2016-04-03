<?php
	session_start();
	$tableau = $_SESSION['tableau'];
	$nom = $_SESSION['nom'];
	$mode = $_SESSION['mode'];
?>
<html>
<head>
	<script type="text/javascript" src="jeu.js"></script>
	<link rel="stylesheet" type="text/css" href="jeu.css" media="screen" />
	<title>Pick it up Mario</title>
</head>
  	<?php
		if ($mode == 'clavier'){
			echo '<body onload="init()" onkeydown="gestionKeyDown(event)" onkeyup="gestionKeyUp(event)">';
		}
		else {
			echo '<body onload="init()" onmousemove="gestionMouse(event)" onkeydown="pauseGame(event)" >';
		}
	?>


        <div id="dialogoverlay"></div>
        <div id="dialogbox">
            <div>
                <div id="dialogboxhead"></div>
                <div id="dialogboxbody"></div>
                <div id="dialogboxfoot"></div>
            </div>
        </div>

		<div class = "titre">
			<center><img /></center>
		</div>
		<div id="MesImages"> 
			<img src="MurBrick.gif" id="fondJeu" />
			<img src="MarioHat.png" id="ImgBarre" />
			<img src="coin.png" id="ImgPiece" />
		</div>
		<br></br><br></br><br></br><br></br><br></br>
  		<div class="infos">
  			<h4>A toi de jouer 
  			<?php 
  				echo $nom;
				echo '<input type="hidden" id="nom" value="'.$nom.'"/>';
  			?></h4>
			<div id="nbBille">Nombre de pi&egrave;ces : 0</div>
            <div id="nbBilleRamassees">Score: 0</div>
			<div id="nbBillePerdu">Nombre de pi&egrave;ces loupées NOOB: 0</div>
			
  		</div>
  		<div class="jeu">
			<canvas id="mon_canvas" width="500" height="700"></canvas>
  		</div>
		<div class="classement">
			<h4>TOP TEN</h4>
			<?php
				for($i = 0; $i<10; $i++){
					echo $_SESSION['tableau'][$i].'<br>';
				}
				
				$_SESSION['tableau'] = $tableau;
				$_SESSION['nom'] = $nom;
				$_SESSION['mode'] = $mode;
			?>
		</div>
  	</body>
</html>
