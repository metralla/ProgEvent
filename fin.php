<?php
	session_start();
	$tableau = $_SESSION['tableau'];
	$nom = $_SESSION['nom'];
	$mode = $_SESSION['mode'];
	$score = $_SESSION['score'];
?>
<html>
<head>
	<script type="text/javascript" src="fin.js"></script>
	<link rel="stylesheet" type="text/css" href="jeu.css"/>
	<title>Pick it up Mario</title>
</head>
<body class="page">
	<center>
		<h1>Essaye encore 
			<?php
				echo $nom;
			?>!
		</h1>
		<h2>Nombre de billes : 
			<?php
				echo $score;
			?>
		</h2>
		<br></br><br></br><br></br>
		<form method="post" action="traitementConnexion.php">
			<input type="button" value="Quitter" onclick="self.location='connexion.html'">
			<input type="button" value="Rejouer" onclick="self.location='jeu.php'">
		</form>
		<div class="classementfinal">
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
</center>
</body>