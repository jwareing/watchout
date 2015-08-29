// start slingin' some d3 here.
var score = 0;
var collisions = 0;
var highScore = 0;

var enemyMove = function(){
  var coords = generateMultipleCoords(10);
  d3.select('svg').selectAll('.enemy')
    .data(coords)
    .transition().duration(5000)
    .attr('x', function(d) {return d[0]})
    .attr('y', function(d) {return d[1]})
    .attr('radius', 25);


  // CODE BELOW ADDS SOME ENEMIES WITH NEW TYPE - REVISIT LATER
  d3.select('svg').selectAll('.enemy')
    .data(coords)
    .enter()
    .append('image')
    .attr('class','enemy')
    .attr({'xlink:href':"redball.png"})
    .attr('x', function(d) {return d[0]})
    .attr('y', function(d) {return d[1]})
    .attr('width','50px')
    .attr('height','50px')
    .attr('radius', 25);


}

var generateRandomCoords = function() {
  var x = (Math.random() * 1000);
  var y = (Math.random() * 600);
  return [x, y];
}

var generateMultipleCoords = function(n) {
  var results = [];
  for (var i = 0; i < n; i++) {
    results.push(generateRandomCoords());
  }
  return results;
};

var drag = d3.behavior.drag()
  .on('drag',function(){ player.attr('x', d3.event.x)
    .attr('y', d3.event.y);});

var player = d3.select('svg').selectAll('.player')
  .attr('radius', 15)
  .call(drag);

//var playerDrag = function(){}

// var collide = function(oneEnemy){
//   var radiusSum = oneEnemy.radius + player.radius;
//   var xDiff = oneEnemy.x - player.x;
//   var yDiff = oneEnemy.y - player.y;
//   var separation = Math.sqrt(Math.pow(xDiff,2) + Math.pow(yDiff,2));
//   if (separation>radiusSum){
//     console.log('COLLISION');
//   }
// };

var updateBoard = function() {
  score++;
  d3.select('.current').select('span')
    .text(score);

  d3.select('.current').select('span')

}

var collisionCheck = function(){
  d3.select('svg').selectAll('.enemy').each (function(d, i) {
    var radiusSum = Number(d3.select(this).attr("radius"))+Number(d3.select('.player').attr("radius"));
    var enemyX = d3.select(this).attr("x");
    var enemyY = d3.select(this).attr("y");
    var playerX = d3.select('.player').attr("x");
    var playerY = d3.select('.player').attr("y");
    var xDiff = enemyX - playerX;
    var yDiff = enemyY - playerY;
    var separation = Math.sqrt(Math.pow(xDiff,2) + Math.pow(yDiff,2));
    if (separation<radiusSum){
      collisions++;
      score = 0;
    }
  })
  var oneEnemyX = d3.select('svg').select('.enemy').attr('radius');
  console.log(oneEnemyX);
};

enemyMove();

setInterval(function(){return collisionCheck()},500);

setInterval(function(){return enemyMove()},5000);

setInterval(function(){return updateBoard()}, 100);