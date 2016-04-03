<html>
<head>
	<script type="text/javascript" src="jeu.js"></script>
	<link rel="stylesheet" type="text/css" href="jeu.css" media="screen" />
</head>
  	<body onload="init()" onkeydown="gestionKeyDown(event)" onkeyup="gestionKeyUp(event)">
		<div id="MesImages"> 
			<img src="MurBrick.gif" id="fondJeu" />
			<img src="MarioHat.png" id="ImgBarre" />
			<img src="coin.png" id="ImgPiece" />
		</div>
  		<div class="infos">
  			A toi de jouer 
  			<?php 
  				echo $_REQUEST["nom"];
				echo '<input type="hidden" id="nom" value="'.$_REQUEST['nom'].'"/>';
  			?>
			<div id="nbBille">Nombre de billes : 0</div>
            <div id="nbBilleRamassees">Nombre de billes ramassees: 0</div>
			<div id="nbBillePerdu">Nombre de billes perdues: 0</div>
			<div id="evt">Nombre de billes perdues: 0</div>
			
  		</div>
  		<div class="jeu">
			<canvas id="mon_canvas" width="500" height="700"></canvas>
  		</div>
  	</body>
</html>
