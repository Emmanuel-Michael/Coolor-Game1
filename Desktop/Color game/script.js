


var numOfSquares = 6;
var colors = generateRandomColors(numOfSquares);

var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector("#message");
var pickedColor = pickColor();
var backgroundDisplay = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
colorDisplay.textContent=pickedColor;
var easyButton = document.querySelector("#easy");
var hardButton = document.querySelector("#hard");

easyButton.addEventListener("click", function(){
	hardButton.classList.remove("selected");
	this.classList.add("selected");
	numOfSquares = 3;
	colors = generateRandomColors(numOfSquares);
	pickedColor = pickColor();
	colorDisplay.textContent = pickedColor;
	for(i = 0; i < squares.length; i++){
		if(colors[i]){
			squares[i].style.backgroundColor = colors[i];
		}
		else{
			squares[i].style.display = "none";
		}
	}
	backgroundDisplay.style.backgroundColor = "steelblue"
	
});

hardButton.addEventListener("click", function(){
	easyButton.classList.remove("selected");
	this.classList.add("selected");
	numOfSquares = 6;
	colors = generateRandomColors(numOfSquares);
	pickedColor = pickColor();
	colorDisplay.textContent = pickedColor;
	for(i = 0; i < squares.length; i++){
		squares[i].style.backgroundColor = colors[i];
		squares[i].style.display = "block";
	}
	backgroundDisplay.style.backgroundColor = "steelblue"
	
});

resetButton.addEventListener("click", function(){
	// this is for generating new colors
	colors = generateRandomColors(numOfSquares);
	pickedColor = pickColor();
	colorDisplay.textContent = pickedColor;
	messageDisplay.textContent = "";
	this.textContent = "New colors";
	for(i = 0; i < squares.length;i++){
	squares[i].style.backgroundColor = colors[i];
	}
	backgroundDisplay.style.backgroundColor = "steelblue"
});

for(i = 0;i < squares.length;i++){
	squares[i].style.backgroundColor = colors[i];
	squares[i].addEventListener("click",function(){
		var clickedColor = this.style.backgroundColor;
		if(clickedColor === pickedColor){
			messageDisplay.textContent="Correct";
			changeColors(clickedColor);
			backgroundDisplay.style.backgroundColor = clickedColor;
			resetButton.textContent = "Play again";
		}
		else{
			this.style.backgroundColor="#232323"
			messageDisplay.textContent="Try again";
		}
	});
};

function changeColors(color){
	for(i = 0; i < squares.length;i++){
		squares[i].style.backgroundColor = color;
	}
};

function pickColor(){
	var random = Math.floor(Math.random() * colors.length);
	return colors[random];
};
function generateRandomColors(num){
	// creat an arry
	var arr = [];
	// generate random colors repetitevly
	for(i = 0;i < num; i++){
		arr.push(randomColors());
	}
	return arr;
	// call the array
}

function randomColors(){
	// for manth.floor to work you have to add a plus 1, so 255 which is the total nuber of colors plus 1 is 256 
	// pick red and creat random colors
	var r = Math.floor(Math.random() * 256);
	// pick green and creat random colors
	var g = Math.floor(Math.random() * 256);
	// pick blue and creat random colors
	var b = Math.floor(Math.random() * 256);
	return "rgb(" + r +", " + g + ", " + b +")";
};