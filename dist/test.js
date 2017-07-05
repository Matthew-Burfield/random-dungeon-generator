'use strict';

var level = NewDungeon({});
console.log(level);
function DrawDungeonTree(div, arr) {
  arr.forEach(function (row) {
    var outerDiv = document.createElement('div');
    row.forEach(function (tile) {
      var innerDiv = document.createElement('div');
      innerDiv.innerText = tile + ',';
      innerDiv.style.display = 'inline-block';
      innerDiv.style.width = '25px';
      innerDiv.style.height = '20px';
      outerDiv.appendChild(innerDiv);
    });
    div.appendChild(outerDiv);
  });
}
DrawDungeonTree(document.getElementById('root'), level);