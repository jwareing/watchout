// start slingin' some d3 here.
var score = 0;
var collisions = 0;
var highScore = 0;
var invincibilityTimer = 0;

var enemyMove = function(){
  var coords = generateMultipleCoords(10);
  d3.select('svg').selectAll('.enemy')
    .data(coords)
    .transition().duration(2000)
    .attr('x', function(d) {return d[0]-25})
    .attr('y', function(d) {return d[1]-25})
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
};

var generateRandomCoords = function() {
  var x = (Math.random() * 1000);
  var y = (Math.random() * 600);
  return [x, y];
};

var generateMultipleCoords = function(n) {
  var results = [];
  for (var i = 0; i < n; i++) {
    results.push(generateRandomCoords());
  }
  return results;
};

var drag = d3.behavior.drag()
  .on('drag',function(){ player.attr('x', (d3.event.x)-15)
    .attr('y', (d3.event.y)-15)});

var player = d3.select('svg').selectAll('.player')
  .attr('radius', 15)
  .call(drag);

var playerKeeper = function(){
  if (Number(player.attr('x'))<=0){
    player.attr('x',0);
  }

  if (Number(player.attr('x'))>=1000-Number(player.attr('radius'))){
    player.attr('x',970);
  }

  if (Number(player.attr('y'))<=0){
    player.attr('y',0);
  }

  if (Number(player.attr('y'))>=600-Number(player.attr('radius'))){
    player.attr('y',570);
  }
}
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

  d3.select('.collisions').select('span')
    .text(collisions);

  if (score>highScore){
    highScore = score;
    d3.select('.high').select('span')
    .text(highScore);
  }

};

var collisionCheck = function(){
  var radiusSum, enemyX, enemyY, playerX, playerY, xDiff, yDiff, separation;
  invincibilityTimer--;
  d3.select('svg').selectAll('.enemy').each (function(d, i) {
    radiusSum = Number(d3.select(this).attr("radius"))+Number(d3.select('.player').attr("radius"));
    enemyX = d3.select(this).attr("x");
    enemyY = d3.select(this).attr("y");
    playerX = d3.select('.player').attr("x");
    playerY = d3.select('.player').attr("y");
    xDiff = enemyX - playerX;
    yDiff = enemyY - playerY;
    separation = Math.sqrt(Math.pow(xDiff,2) + Math.pow(yDiff,2));
    if (separation<radiusSum && invincibilityTimer <= 0){
      collisions++;
      score = 0;
      invincibilityTimer = 10;
      return true;
    }
  })
};


// var countCollisions = _throttle(function() {
//   collisions++;
// }, 1000);

enemyMove();

setInterval(function(){playerKeeper()});

setInterval(function(){ collisionCheck()},100);

setInterval(function(){ enemyMove()},2000);

setInterval(function(){ updateBoard()}, 100);