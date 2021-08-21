var red = 0;
var blue = 0;
var inputTotal = 21;
var total = inputTotal;
var max = inputTotal + 9;

var score_red = document.getElementById("score_red");
var score_blue = document.getElementById("score_blue");
var winning_text = document.getElementById("winning_text");
var total_score = document.getElementById("total_score");

document.getElementById("plus_red").onclick = increaseRED;
document.getElementById("minus_red").onclick = decreaseRED;
document.getElementById("plus_blue").onclick = increaseBLUE;
document.getElementById("minus_blue").onclick = decreaseBLUE;
document.getElementById("reset").onclick = resetScores;
document.getElementById("score_selector").onchange = changeTotal;
document.getElementById("deuce_selector").onchange = changeMax;

if(localStorage.length == 0)
  setValues();
else
  getValues();

function setValues(){
  localStorage.setItem('red', red.toString());
  localStorage.setItem('blue', blue.toString());
  localStorage.setItem('inputTotal', inputTotal.toString());
  localStorage.setItem('total', total.toString());
  localStorage.setItem('max', max.toString());
  document.getElementById("score_selector").value = "";
  document.getElementById("deuce_selector").value = "";
}

function getValues(){
  red = Number(localStorage.getItem('red'));
  blue = Number(localStorage.getItem('blue'));
  inputTotal = Number(localStorage.getItem('inputTotal'));
  total = Number(localStorage.getItem('total'));
  max = Number(localStorage.getItem('max'));
  document.getElementById("score_selector").value = inputTotal;
  document.getElementById("deuce_selector").value = max - inputTotal;
  updateScores();
}

function updateScores(){
  score_red.innerHTML = red;
  score_blue.innerHTML = blue;
  
  if(red == blue && blue == total - 1){
    if(total < max){
      localStorage.total++;
      total++;
    }
    else
      winning_text.innerHTML = "";
  }
  else{
    if (red >= total && blue >= total){
      if (red > blue){
        winning_text.innerHTML = "RED wins!!!";
        winning_text.style.color = "#FF1744";
      }
      else if (blue > red){
        winning_text.innerHTML = "BLUE wins!!!";
        winning_text.style.color = "#2962FF";
      }
      else{
        winning_text.innerHTML = "Match Tied!";
        winning_text.style.color = "gray";
      }
    }
    else if (red >= total){
      winning_text.innerHTML = "RED wins!!!";
      winning_text.style.color = "#FF1744";
    }
    else if (blue >= total){
      winning_text.innerHTML = "BLUE wins!!!";
      winning_text.style.color = "#2962FF";
    }
    else{
      winning_text.innerHTML = "";
    }
  }
  total_score.innerHTML = total;
} // updateScores() ends

function resetScores(){
  let input = confirm("Are you sure you want to reset the scores?");
  if(input == true){
    red = 0;
    blue = 0;
    inputTotal = 21;
    total = inputTotal;
    max = inputTotal + 9;
    updateScores();
    setValues();
  }
}

function changeTotal(){
  localStorage.inputTotal = document.getElementById("score_selector").value;
  inputTotal = document.getElementById("score_selector").value;
  localStorage.total = inputTotal;
  total = inputTotal;
  if(document.getElementById("deuce_selector").value == "")
    max = parseInt(inputTotal) + 9;
  else
    max = parseInt(inputTotal) + parseInt(document.getElementById("deuce_selector").value);
  localStorage.max = max;
  updateScores();
}

function changeMax(){
  max = parseInt(inputTotal) + parseInt(document.getElementById("deuce_selector").value);
  localStorage.max = max;
  updateScores();
}

function increaseRED() {
  if(red == total || blue == total)
    return;
  localStorage.red++;
  red++;
  updateScores();
}

function decreaseRED() {
  if(red == 0 || blue == total)
    return;
  if(red == blue && total > inputTotal){
    localStorage.total--;
    total--;
  }
  localStorage.red--;
  red--;
  updateScores();
}

function increaseBLUE() {
  if(blue == total || red == total)
    return;
  localStorage.blue++;
  blue++;
  updateScores();
}

function decreaseBLUE() {
  if(blue == 0 || red == total)
    return;
  if(red == blue && total > inputTotal){
    localStorage.total--;
    total--;
  }
  localStorage.blue--;
  blue--;
  updateScores();
}