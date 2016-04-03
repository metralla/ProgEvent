<?php
	session_start();
	$nom = $_POST['nom'];
	$mode = $_POST['mode'];
	$_SESSION['tableau'] = array();
	$i =0;
	$monfichier = fopen('joueurs.txt', 'r');
	while(!feof($monfichier)){
		$tableau[$i] = fgets($monfichier);
		$i++;
	}
	fclose ($monfichier);
	if( $nom == ''){
		$nom = 'Mario';
	}
	
	$_SESSION['tableau'] = $tableau;
	$_SESSION['nom'] = $nom;
	$_SESSION['mode'] = $mode;
	
	header("Location: jeu.php");
?>