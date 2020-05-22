<!DOCTYPE html>

<html lang="en">
    <head>
    	<title>Tic Tac Toe</title>
    	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
    	<script src="./script.js" defer></script>
    	<link href="./style.css" rel="stylesheet">
    	<link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@400;600&family=Raleway&display=swap" rel="stylesheet">
    </head>
	<body>
		<div class="container">
			<h1 class="title">Tic Tac Toe</h1>
			<div class="chooseSize">
				<p>Choose the board size to start a new game:</p>
				<div class="flexContainer">
					<button value="3">3x3</button>
					<button value="4">4x4</button>
					<button value="5">5x5</button>
				</div>
			</div>
			<div class="boardContainer">	
			</div>
			<div class="gameInfo">
				<h3 class="info">Player: <span id="currentPlayer">x</span></h3>
				<h3 class="info">Round: <span id="round">1</span></h3>
				<h1 class="info" id="result"></h1>
			</div>
		</div>

		<template>
			<div class="boardRow" data-row-index="">
				<button class="boardField" data-row-index="" data-col-index=""></button>
			</div>
			
		</template>

	</body>
</html>
