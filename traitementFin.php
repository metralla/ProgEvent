<?php
	session_start();
	$taille = sizeof($_SESSION['tableau']);
	$nom = $_SESSION['nom'];
	$mode = $_SESSION['mode'];
	$score = $_REQUEST['nb'];
	$i = 0;
	$out = true;
	$joueur = $nom.' '.$score;
	$joueur .= "\r\n";
	echo $joueur;
	/*$monfichier = fopen('joueurs.txt', 'r');
	while(!feof($monfichier)){
		$tableau[$i] = fgets($monfichier);		
		$i++;
	}
	fclose ($monfichier);*/
	$monfichier = fopen('joueurs.txt', 'r');
	while(!feof($monfichier)){
		$joueurfichier = fgets($monfichier);
		if($joueurfichier == "")
		{
			break;
		}
		//echo 'joueur recupere'.$joueurfichier.'<br>';
		$explodejoueur = explode(" ", $joueurfichier);
		//echo 'score recupere'.$explodejoueur[1].'<br>';
		if(intval($score) > intval($explodejoueur[1]) && $out)
		{
			$tableau[$i] = $joueur;
			$i++;
			$tableau[$i] = $joueurfichier;
			$i++;
			$out = false;
		}
		else {
			$tableau[$i] = $joueurfichier;
			$i++;
		}		
	}
	if($out){
		$tableau[$i] = $joueur;
		$i++;
	}
	fclose ($monfichier);
	
	//echo "mon i".$i;
	$monfichier = fopen('joueurs.txt', 'w');
	for($j = 0; $j < $i; $j++){
		//echo $tableau[$j].'<br>';
		$joueurajoute = $tableau[$j];
		fputs($monfichier,$joueurajoute);
	}
	fclose ($monfichier);
		
	$_SESSION['tableau'] = $tableau;
	$_SESSION['nom'] = $nom;
	$_SESSION['mode'] = $mode;
	$_SESSION['score'] = $score;
	
	header("Location: fin.php");
?>