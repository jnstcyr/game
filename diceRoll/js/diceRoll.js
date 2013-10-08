$(document).on('click', '#toggleRules', function(){
	$('.rules').toggleClass('hide');
});
var rollDice = function(){
	var dice = document.getElementById('dice').value,
		sides = document.getElementById('sides').value,
		rolls = getRoll(dice, sides),
		scores = sortResults(rolls.rolls, rolls.notPrime, rolls.primeNumbers);

		displayResults(rolls.rolls, rolls.primeNumbers, scores.score, scores.bonus, scores.penalty, scores.finalScore);
};
var getRoll = function (dice, sides) {
	var notPrime = [], primeNumbers = [], rolls = [];
	var Rolls = {},
		min = 1;

		for(var d=0; d < dice; d++){
			var roll = Math.floor(Math.random() * (sides - min + 1) + min);
			rolls.push(roll);
		}
		for (var i = 0; i < rolls.length; i++){
			if(isPrime(rolls[i])){
				primeNumbers.push(rolls[i]);
			}else{
				notPrime.push(rolls[i]);
			}
		}
		Rolls.rolls = rolls,
		Rolls.notPrime = notPrime,
		Rolls.primeNumbers = primeNumbers;
		return Rolls;
}

var isPrime = function(i){
	return (i > 1) && Array.apply(0, Array(1 + ~~Math.sqrt(i))).
    every(function (x, y) { return (y < 2) || (i % y !== 0) });
}
var sortResults = function (rolls, notPrime, primeNumbers){
	var score = 0, bonus = 0, penalty = 0, finalScore = 0, scores = {},
		rollTotal = _(rolls).reduce(
            function( memo, x) { return memo + x }, 0),
		primeTotal =  _(primeNumbers).reduce(
            function( memo, x) { return memo + x }, 0);
	penalty = totalPenalty(notPrime);

	if(isPrime(rollTotal)){
		bonus = rollTotal;
	}
	
	finalScore = ((primeTotal + bonus) - penalty);

	scores.score = primeTotal, 
	scores.bonus = bonus,
	scores.penalty = penalty,
	scores.finalScore = finalScore;

	return scores;
}
var totalPenalty = function(notPrime){
	var thisPenalty = 0;
	for(var z=0; z < notPrime.length; z++){
		if(notPrime[z] === 1){
			thisPenalty++;
		}
	}
	return thisPenalty;
}
var displayResults = function(rolls, primeNumbers, score, bonus, penalty, finalScore){
	$('.results').removeClass('hide');
	$('#rolls').empty().html(rolls.join(","));
	$('#primes').empty().html(primeNumbers.join(","));
	$('#primesTotal').empty().html(score);
	$('#bonus').empty().html('+ '+bonus);
	$('#displayOnes').empty().html('- '+penalty);
	$('#finalScore').empty().html(finalScore);
}
