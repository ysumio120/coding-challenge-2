/* 

	Your task is the following:

	- Dynamically create 100 rectangles that cover and fit within a screen's dimensions.

	- Every rectangle should be numbered, and that number should be in the center of that rectangle.
	  (Color of the number should be black, the rectangle's background should be transparent.);
		Also, the rectangle count has to start with 1.

	- All odd numbered rectangles should have a background color of red with a hover state of yellow.

	- All even numbered rectangles should have a background color of blue with a hover state green.

	- All numbered rectangles that are divisible by 11 should have a background color of white with a hover state of black. 

	- Make three buttons that sit outsite the 100 rectangles.

	- The first button should call a function that removes (deletes the elements) all numbered rectangles divisible by 5.

	- The second button should call a function that uses the "visibility" css attribute to hide all numbered rectangles
	  who's digits add to 11 or more. For example: A rectangle is numbered 28, 2 + 8 = 10, since 10 >= 11 is not true,
	  this rectangle should not be hidden. A rectangle is numbered 39, 3 + 9 = 12, since 12 >= 11 is true, this rectangle
	  should be hidden.

	- The third button should call a function that returns all rectangles to their original state (as if the first or
	  second button had not been clicked)

	You are free to use jQuery.

	Bonus:

	A fourth button that hides all the non-prime numbered rectangles 

*/

function boxState(num) {
	var state;

	if(num % 2 == 0) { // even
		state = "even"; 
	} 
	if (num % 2 == 1) { // odd
		state = "odd";
	} 
	if (num % 11 == 0){ // divisible by 11
		state = "divisible-11";
	}

	return state;
}

function divisibleBy5() { // Button 1 function
	var boxes = $(".box");

	for(var i = 0; i < boxes.length; i++) {
		var box = $(boxes[i]);

		if(box.attr("data-value") % 5 == 0) {
			box.remove();
		}
	}
}

function _11_OrMore() { // Button 2 function
	var boxes = $(".box");

	for(var i = 0; i < boxes.length; i++) {
		var box = $(boxes[i]);

		var digits = box.attr("data-value").split("");

		var sum_digits = digits.reduce(function(acc, digit) {
			return parseInt(acc) + parseInt(digit);
		})

		if(sum_digits >= 11) {
			box.css("visibility", "hidden");
		}
	}
}

function nonPrime() { // Button 4 function
	var boxes = $(".box");

	for(var i = 0; i < boxes.length; i++) {
		var box = $(boxes[i]);

		if(!isPrime(box.attr("data-value"))) {
			box.css("visibility", "hidden");
		}
	}
}

function isPrime(num) {
	if(num == 1) return false; // 1 is not prime

	for(var i = 2; i <= num/2; i++) {
		if(num % i == 0) {
			return false
		}
	}

	return true;
}

function initialLayout() { // Initial Load and Button 3 function
	for(var i = 1; i <= 100; i++) {
		var box = $("<div>" + i + "</div>");

		box.attr("data-value", i);
		box.addClass("box");
		box.addClass(boxState(i));

		$(".box-layout").append(box);
	}
}


$(document).ready(function() {

	initialLayout();

	$("#button-1").click(divisibleBy5);
	$("#button-2").click(_11_OrMore);
	$("#button-3").click(function() {
		$(".box-layout").empty();
		initialLayout();
	});
	$("#button-4").click(nonPrime);



})